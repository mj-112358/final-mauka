const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const axios = require('axios');
require('dotenv').config();

const app = express();

// More explicit CORS configuration
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3001', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'];
  const origin = req.headers.origin;
  
  console.log(`🌐 CORS request from origin: ${origin}, method: ${req.method}`);
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    console.log(`✅ Origin ${origin} allowed`);
  } else {
    console.log(`❌ Origin ${origin} not in allowed list: ${allowedOrigins.join(', ')}`);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    console.log(`🔄 Handling OPTIONS preflight request for ${req.url}`);
    res.status(200).end();
    return;
  }
  
  next();
});

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));

app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
let db, profiles;

// Build text to embed
function buildVolunteerText(doc) {
  const parts = [
    'Type: volunteer',
    doc.name || '',
    `Skills: ${(doc.skills || []).join(', ')}`,
    `Interests: ${(doc.interests || []).join(', ')}`,
    `Availability: ${doc.availability || ''}`,
    `City: ${doc.city || ''}`,
    `Languages: ${(doc.languages || []).join(', ')}`,
    doc.bio || ''
  ];
  return parts.filter(Boolean).join('\n');
}

function buildNgoText(doc) {
  const parts = [
    'Type: ngo',
    doc.name || '',
    `Needs: ${(doc.needs || []).join(', ')}`,
    `Cause: ${doc.cause || ''}`,
    `Schedule: ${doc.schedule || ''}`,
    `City: ${doc.city || ''}`,
    `Requirements: ${(doc.requirements || []).join(', ')}`,
    doc.description || ''
  ];
  return parts.filter(Boolean).join('\n');
}

// Choose ONE of these embedding functions:

// A) Azure OpenAI embeddings (recommended for your Azure setup)
// async function embedText(text) {
//   const endpoint = process.env.AZURE_OAI_ENDPOINT;
//   const deployment = process.env.AZURE_EMBED_DEPLOYMENT; // embeddings deployment name (not gpt-4o)
//   const url = `${endpoint}/openai/deployments/${deployment}/embeddings?api-version=2024-02-15-preview`;
  
//   const res = await axios.post(
//     url,
//     { input: text },
//     { headers: { 'api-key': process.env.AZURE_OAI_API_KEY, 'Content-Type': 'application/json' } }
//   );
//   // Azure returns { data: [ { embedding: [...] } ] }
//   return res.data.data[0].embedding;
// }

// B) OpenAI embeddings (switch to this since you have OpenAI key)
async function embedText(text) {
  const url = 'https://api.openai.com/v1/embeddings';
  const res = await axios.post(
    url,
    { model: 'text-embedding-3-small', input: text },
    { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' } }
  );
  return res.data.data[0].embedding;
}

// Upsert profile: generate embedding and save
app.post('/api/profile/upsert', async (req, res) => {
  console.log('📝 Profile upsert request received');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  try {
    const doc = req.body; // { type: 'volunteer'|'ngo', ...fields }
    if (!doc.type) {
      console.log('❌ No type provided');
      return res.status(400).json({ ok: false, error: 'type is required' });
    }

    console.log(`👤 Processing ${doc.type} profile for: ${doc.name}`);

    // Check for duplicate phone number
    if (doc.phone) {
      console.log(`📞 Checking for duplicate phone: ${doc.phone}`);
      const existingProfile = await profiles.findOne({ 
        phone: doc.phone,
        type: doc.type
      });
      
      if (existingProfile && (!doc._id || existingProfile._id.toString() !== doc._id)) {
        console.log(`❌ Duplicate phone number found for ${doc.type}`);
        return res.status(400).json({ 
          ok: false, 
          error: `A ${doc.type} with this phone number already exists` 
        });
      }
      console.log('✅ Phone number is unique');
    }

    // Build text
    const text = doc.type === 'ngo' ? buildNgoText(doc) : buildVolunteerText(doc);
    console.log('🔤 Generated text for embedding:', text.substring(0, 100) + '...');
    
    console.log('🤖 Generating OpenAI embedding...');
    const embedding = await embedText(text); // length must match index dimensions (e.g., 1536)
    console.log(`✅ Embedding generated successfully (length: ${embedding.length})`);

    doc.embedding = embedding;
    doc.updatedAt = new Date();

    if (doc._id) {
      console.log('🔄 Updating existing profile...');
      const id = new ObjectId(doc._id);
      delete doc._id;
      await profiles.updateOne({ _id: id }, { $set: doc }, { upsert: true });
      console.log(`✅ Profile updated successfully with ID: ${id.toString()}`);
      return res.json({ ok: true, id: id.toString() });
    } else {
      console.log('➕ Inserting new profile...');
      const result = await profiles.insertOne(doc);
      console.log(`✅ Profile inserted successfully with ID: ${result.insertedId.toString()}`);
      return res.json({ ok: true, id: result.insertedId.toString() });
    }
  } catch (e) {
    console.error('❌ Error in profile upsert:', e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Add debugging endpoint to check what's in the database
app.get('/api/debug/profiles', async (req, res) => {
  try {
    const volunteers = await profiles.find({ type: 'volunteer' }).limit(5).toArray();
    const ngos = await profiles.find({ type: 'ngo' }).limit(5).toArray();
    const total = await profiles.countDocuments();
    
    res.json({
      ok: true,
      total,
      volunteers: volunteers.length,
      ngos: ngos.length,
      sampleVolunteer: volunteers[0] ? {
        name: volunteers[0].name,
        city: volunteers[0].city,
        hasEmbedding: !!volunteers[0].embedding
      } : null,
      sampleNgo: ngos[0] ? {
        name: ngos[0].name,
        city: ngos[0].city,
        hasEmbedding: !!ngos[0].embedding
      } : null
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Cosine similarity function for fallback
function cosineSimilarity(a, b) {
  if (a.length !== b.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Volunteer -> NGOs recommendations (with better debugging and fallback)
app.post('/api/recommend/ngos', async (req, res) => {
  try {
    const { volunteerId, city } = req.body;
    console.log('🔍 Finding volunteer:', volunteerId);
    
    const vol = await profiles.findOne({ _id: new ObjectId(volunteerId), type: 'volunteer' });
    if (!vol) return res.status(404).json({ ok: false, error: 'Volunteer not found' });
    
    console.log('✅ Found volunteer:', vol.name, 'in', vol.city);

    // Build text and ensure embedding exists
    let embedding = vol.embedding;
    if (!embedding) {
      console.log('🔮 Generating embedding for volunteer...');
      const text = buildVolunteerText(vol);
      console.log('📝 Text to embed:', text.substring(0, 200) + '...');
      embedding = await embedText(text);
      await profiles.updateOne({ _id: vol._id }, { $set: { embedding } });
      console.log('✅ Embedding generated and saved');
    } else {
      console.log('✅ Using existing embedding');
    }

    // Check how many NGOs exist
    const ngoCount = await profiles.countDocuments({ type: 'ngo' });
    console.log('📊 Total NGOs in database:', ngoCount);
    
    if (ngoCount === 0) {
      return res.json({ ok: true, results: [], message: 'No NGOs in database' });
    }

    let results = [];
    
    try {
      console.log('🔍 Attempting vector search...');
      
      // Try vector search first
      const pipeline = [
        {
          $vectorSearch: {
            index: 'vector_index',
            path: 'embedding',
            queryVector: embedding,
            numCandidates: Math.min(100, ngoCount * 2),
            limit: 50
          }
        },
        {
          $match: {
            type: 'ngo'
          }
        },
        {
          $limit: 10
        },
        {
          $project: {
            name: 1,
            cause: 1,
            city: 1,
            needs: 1,
            email: 1,
            phone: 1,
            score: { $meta: 'vectorSearchScore' }
          }
        }
      ];

      results = await profiles.aggregate(pipeline).toArray();
      console.log('✅ Vector search successful, found:', results.length, 'results');
      
    } catch (vectorError) {
      console.log('⚠️ Vector search failed, using fallback method:', vectorError.message);
      
      // Fallback: Manual cosine similarity calculation
      const ngos = await profiles.find({ 
        type: 'ngo',
        embedding: { $exists: true, $ne: null }
      }).toArray();
      
      console.log('🔄 Computing similarity for', ngos.length, 'NGOs manually');
      
      const similarities = ngos.map(ngo => ({
        ...ngo,
        score: cosineSimilarity(embedding, ngo.embedding)
      }))
      .filter(ngo => ngo.score > 0.1) // Minimum similarity threshold
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(ngo => ({
        _id: ngo._id,
        name: ngo.name,
        cause: ngo.cause,
        city: ngo.city,
        needs: ngo.needs,
        email: ngo.email,
        phone: ngo.phone,
        score: ngo.score
      }));
      
      results = similarities;
      console.log('✅ Fallback similarity search completed, found:', results.length, 'results');
    }
    
    if (results.length > 0) {
      console.log('🏆 Top result:', {
        name: results[0].name,
        score: results[0].score,
        city: results[0].city
      });
    }

    // Apply smart city filtering - prefer same city, but don't exclude if no matches
    let filteredResults = results;
    if (city) {
      const sameCityResults = results.filter(r => r.city && r.city.toLowerCase() === city.toLowerCase());
      if (sameCityResults.length > 0) {
        // Found matches in same city, use those
        filteredResults = sameCityResults;
        console.log('📊 After city filter (same city):', filteredResults.length);
      } else {
        // No matches in same city, show all results but boost by relevance
        console.log('📊 No matches in same city, showing all results:', filteredResults.length);
        console.log('💡 Consider expanding search to nearby cities or different criteria');
      }
    }

    res.json({ ok: true, results: filteredResults });
  } catch (e) {
    console.error('❌ Recommendation error:', e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// NGO -> Volunteers recommendations (with fallback)
app.post('/api/recommend/volunteers', async (req, res) => {
  try {
    const { ngoId, city } = req.body;
    console.log('🔍 Finding NGO:', ngoId);
    
    const ngo = await profiles.findOne({ _id: new ObjectId(ngoId), type: 'ngo' });
    if (!ngo) return res.status(404).json({ ok: false, error: 'NGO not found' });
    
    console.log('✅ Found NGO:', ngo.name, 'in', ngo.city);

    // Build text and ensure embedding exists
    let embedding = ngo.embedding;
    if (!embedding) {
      console.log('🔮 Generating embedding for NGO...');
      const text = buildNgoText(ngo);
      console.log('📝 Text to embed:', text.substring(0, 200) + '...');
      embedding = await embedText(text);
      await profiles.updateOne({ _id: ngo._id }, { $set: { embedding } });
      console.log('✅ Embedding generated and saved');
    } else {
      console.log('✅ Using existing embedding');
    }

    // Check how many volunteers exist
    const volunteerCount = await profiles.countDocuments({ type: 'volunteer' });
    console.log('📊 Total volunteers in database:', volunteerCount);
    
    if (volunteerCount === 0) {
      return res.json({ ok: true, results: [], message: 'No volunteers in database' });
    }

    let results = [];
    
    try {
      console.log('🔍 Attempting vector search...');
      
      // Try vector search first
      const pipeline = [
        {
          $vectorSearch: {
            index: 'vector_index',
            path: 'embedding',
            queryVector: embedding,
            numCandidates: Math.min(100, volunteerCount * 2),
            limit: 50
          }
        },
        {
          $match: {
            type: 'volunteer'
          }
        },
        {
          $limit: 10
        },
        {
          $project: {
            name: 1,
            city: 1,
            skills: 1,
            interests: 1,
            availability: 1,
            email: 1,
            phone: 1,
            score: { $meta: 'vectorSearchScore' }
          }
        }
      ];

      results = await profiles.aggregate(pipeline).toArray();
      console.log('✅ Vector search successful, found:', results.length, 'results');
      
    } catch (vectorError) {
      console.log('⚠️ Vector search failed, using fallback method:', vectorError.message);
      
      // Fallback: Manual cosine similarity calculation
      const volunteers = await profiles.find({ 
        type: 'volunteer',
        embedding: { $exists: true, $ne: null }
      }).toArray();
      
      console.log('🔄 Computing similarity for', volunteers.length, 'volunteers manually');
      
      const similarities = volunteers.map(volunteer => ({
        ...volunteer,
        score: cosineSimilarity(embedding, volunteer.embedding)
      }))
      .filter(volunteer => volunteer.score > 0.1) // Minimum similarity threshold
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(volunteer => ({
        _id: volunteer._id,
        name: volunteer.name,
        city: volunteer.city,
        skills: volunteer.skills,
        interests: volunteer.interests,
        availability: volunteer.availability,
        email: volunteer.email,
        phone: volunteer.phone,
        score: volunteer.score
      }));
      
      results = similarities;
      console.log('✅ Fallback similarity search completed, found:', results.length, 'results');
    }
    
    if (results.length > 0) {
      console.log('🏆 Top result:', {
        name: results[0].name,
        score: results[0].score,
        city: results[0].city
      });
    }

    // Apply smart city filtering - prefer same city, but don't exclude if no matches
    let filteredResults = results;
    if (city) {
      const sameCityResults = results.filter(r => r.city && r.city.toLowerCase() === city.toLowerCase());
      if (sameCityResults.length > 0) {
        // Found matches in same city, use those
        filteredResults = sameCityResults;
        console.log('📊 After city filter (same city):', filteredResults.length);
      } else {
        // No matches in same city, show all results but boost by relevance
        console.log('📊 No matches in same city, showing all results:', filteredResults.length);
        console.log('💡 Consider expanding search to nearby cities or different criteria');
      }
    }

    // Save recommendations
    await profiles.updateOne(
      { _id: ngo._id },
      { $set: { recommendations: filteredResults.map(r => ({ id: r._id, score: r.score, savedAt: new Date() })) } }
    );

    res.json({ ok: true, results: filteredResults });
  } catch (e) {
    console.error('❌ Recommendation error:', e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Add a list all profiles endpoint for debugging
app.get('/api/profiles', async (req, res) => {
  try {
    const { type, limit = 10 } = req.query;
    const filter = type ? { type } : {};
    const results = await profiles.find(filter)
      .limit(parseInt(limit))
      .project({ embedding: 0 }) // Don't return embeddings in list
      .toArray();
    res.json({ ok: true, results, count: results.length });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ ok: true, message: 'Server is running', timestamp: new Date() });
});

// CORS test endpoint
app.post('/api/cors-test', (req, res) => {
  console.log('🧪 CORS test endpoint hit');
  res.json({ ok: true, message: 'CORS is working', data: req.body });
});

// REMOVED FOR PRODUCTION: Add GET endpoint for seed data (for easy browser access)
/*
app.get('/api/seed', async (req, res) => {
  try {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Seed Database</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
            .button { background: #007bff; color: white; padding: 15px 30px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; margin: 10px 0; }
            .button:hover { background: #0056b3; }
            .result { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
          </style>
        </head>
        <body>
          <h1>🌱 Seed Database with Sample Data</h1>
          <p>Click the button below to add sample volunteers and NGOs to your database:</p>
          <button class="button" onclick="seedDatabase()">Add Sample Data</button>
          <div id="result"></div>
          
          <script>
            async function seedDatabase() {
              const resultDiv = document.getElementById('result');
              resultDiv.innerHTML = '<div class="result">⏳ Adding sample data...</div>';
              
              try {
                const response = await fetch('/api/seed', { 
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' }
                });
                const data = await response.json();
                
                if (data.ok) {
                  resultDiv.innerHTML = \`
                    <div class="result" style="background: #d4edda; border-color: #c3e6cb;">
                      ✅ Success! Added \${data.inserted} profiles:<br>
                      📊 \${data.ngos} NGOs<br>
                      👥 \${data.volunteers} Volunteers<br><br>
                      You can now test the AI matching on your website!
                    </div>
                  \`;
                } else {
                  resultDiv.innerHTML = \`<div class="result" style="background: #f8d7da; border-color: #f5c6cb;">❌ Error: \${data.error}</div>\`;
                }
              } catch (error) {
                resultDiv.innerHTML = \`<div class="result" style="background: #f8d7da; border-color: #f5c6cb;">❌ Error: \${error.message}</div>\`;
              }
            }
          </script>
        </body>
      </html>
    `);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});
*/

// REMOVED FOR PRODUCTION: Add seed data endpoint
/*
app.post('/api/seed', async (req, res) => {
  try {
    // Sample NGOs
    const sampleNGOs = [
      {
        type: 'ngo',
        name: 'Tech for Education',
        city: 'Mumbai',
        cause: 'education',
        needs: ['web developers', 'teachers', 'content creators'],
        schedule: 'flexible, remote work available',
        description: 'We build educational apps and platforms for underprivileged children. Looking for passionate developers and educators to help bridge the digital divide.',
        updatedAt: new Date()
      },
      {
        type: 'ngo',
        name: 'Green Future Foundation',
        city: 'Delhi',
        cause: 'environment',
        needs: ['environmental scientists', 'social media managers', 'event coordinators'],
        schedule: 'weekends and evenings',
        description: 'Dedicated to environmental conservation and awareness. We organize tree planting drives, clean-up campaigns, and educational workshops.',
        updatedAt: new Date()
      },
      {
        type: 'ngo',
        name: 'HealthCare for All',
        city: 'Bangalore',
        cause: 'healthcare',
        needs: ['doctors', 'nurses', 'health awareness volunteers'],
        schedule: 'flexible timing',
        description: 'Providing free healthcare services to rural and urban poor communities. We run mobile clinics and health awareness programs.',
        updatedAt: new Date()
      },
      {
        type: 'ngo',
        name: 'Skills Development Hub',
        city: 'Pune',
        cause: 'skill development',
        needs: ['trainers', 'career counselors', 'industry mentors'],
        schedule: 'weekends',
        description: 'Empowering youth with technical and soft skills training. We focus on job readiness and entrepreneurship development.',
        updatedAt: new Date()
      }
    ];

    // Sample Volunteers
    const sampleVolunteers = [
      {
        type: 'volunteer',
        name: 'Priya Sharma',
        city: 'Mumbai',
        skills: ['web development', 'react', 'javascript'],
        interests: ['education', 'technology', 'teaching'],
        availability: 'weekends, 10 hours/week',
        bio: 'Software engineer passionate about using technology for social good. Love teaching kids coding.',
        updatedAt: new Date()
      },
      {
        type: 'volunteer',
        name: 'Arjun Patel',
        city: 'Delhi',
        skills: ['environmental science', 'project management', 'public speaking'],
        interests: ['environment', 'sustainability', 'climate change'],
        availability: 'evenings and weekends',
        bio: 'Environmental activist with 5 years experience in conservation projects. Passionate about creating awareness.',
        updatedAt: new Date()
      },
      {
        type: 'volunteer',
        name: 'Dr. Meera Reddy',
        city: 'Bangalore',
        skills: ['medical practice', 'health education', 'community outreach'],
        interests: ['healthcare', 'rural development', 'women health'],
        availability: 'flexible, 15 hours/week',
        bio: 'Medical doctor with experience in rural healthcare. Committed to making healthcare accessible to all.',
        updatedAt: new Date()
      },
      {
        type: 'volunteer',
        name: 'Rohit Kumar',
        city: 'Pune',
        skills: ['digital marketing', 'content creation', 'photography'],
        interests: ['youth development', 'skill training', 'social media'],
        availability: 'weekends',
        bio: 'Marketing professional who loves mentoring young people and creating engaging content for social causes.',
        updatedAt: new Date()
      }
    ];

    // Generate embeddings for all profiles
    const allProfiles = [...sampleNGOs, ...sampleVolunteers];
    
    for (let profile of allProfiles) {
      const text = profile.type === 'ngo' ? buildNgoText(profile) : buildVolunteerText(profile);
      profile.embedding = await embedText(text);
    }

    // Insert into database
    await profiles.deleteMany({}); // Clear existing data
    const result = await profiles.insertMany(allProfiles);
    
    console.log('✅ Seed data inserted successfully');
    res.json({ 
      ok: true, 
      message: 'Seed data inserted', 
      inserted: result.insertedIds.length,
      ngos: sampleNGOs.length,
      volunteers: sampleVolunteers.length
    });
  } catch (e) {
    console.error('Seed error:', e);
    res.status(500).json({ ok: false, error: e.message });
  }
});
*/

// REMOVED FOR PRODUCTION: Test semantic search endpoint
/*
app.post('/api/test/semantic', async (req, res) => {
  try {
    const { query } = req.body;
    
    // Create a test volunteer profile with the query
    const testProfile = {
      type: 'volunteer',
      name: 'Test User',
      city: 'Mumbai',
      skills: [query],
      interests: [query],
      availability: 'flexible',
      bio: `I am passionate about ${query}`
    };
    
    const text = buildVolunteerText(testProfile);
    const embedding = await embedText(text);
    
    // Search for similar NGOs
    const pipeline = [
      {
        $vectorSearch: {
          index: 'vector_index',
          path: 'embedding',
          queryVector: embedding,
          numCandidates: 100,
          limit: 10
        }
      },
      {
        $match: {
          type: 'ngo'
        }
      },
      {
        $project: {
          name: 1,
          cause: 1,
          needs: 1,
          description: 1,
          score: { $meta: 'vectorSearchScore' }
        }
      }
    ];
    
    const results = await profiles.aggregate(pipeline).toArray();
    
    res.json({
      ok: true,
      query,
      testText: text,
      results: results.map(r => ({
        name: r.name,
        cause: r.cause,
        score: Math.round(r.score * 100) + '%',
        matchReason: `Matches "${query}" with their focus on ${r.cause}`
      }))
    });
    
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});
*/

// Semantic search endpoint (with fallback)
app.post('/api/semantic-search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ ok: false, error: 'Query is required' });
    }

    console.log(`🔍 Semantic search for: "${query}"`);
    
    // Get embedding for the search query
    const queryEmbedding = await embedText(query);
    
    let searchResults = [];
    
    try {
      console.log('🔍 Attempting vector search...');
      
      // Try vector search first
      const pipeline = [
        {
          $vectorSearch: {
            index: 'vector_index',
            path: 'embedding',
            queryVector: queryEmbedding,
            numCandidates: 100,
            limit: 20
          }
        },
        {
          $project: {
            name: 1,
            type: 1,
            cause: 1,
            city: 1,
            skills: 1,
            interests: 1,
            needs: 1,
            score: { $meta: 'vectorSearchScore' }
          }
        }
      ];

      searchResults = await profiles.aggregate(pipeline).toArray();
      console.log('✅ Vector search successful, found:', searchResults.length, 'results');
      
    } catch (vectorError) {
      console.log('⚠️ Vector search failed, using fallback method:', vectorError.message);
      
      // Fallback: Manual cosine similarity calculation
      const allProfiles = await profiles.find({ 
        embedding: { $exists: true, $ne: null }
      }).toArray();
      
      console.log('🔄 Computing similarity for', allProfiles.length, 'profiles manually');
      
      const similarities = allProfiles.map(profile => ({
        ...profile,
        score: cosineSimilarity(queryEmbedding, profile.embedding)
      }))
      .filter(profile => profile.score > 0.1) // Minimum similarity threshold
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map(profile => ({
        name: profile.name,
        type: profile.type,
        cause: profile.cause,
        city: profile.city,
        skills: profile.skills,
        interests: profile.interests,
        needs: profile.needs,
        score: profile.score
      }));
      
      searchResults = similarities;
      console.log('✅ Fallback similarity search completed, found:', searchResults.length, 'results');
    }
    
    // Format results with match explanations
    const formattedResults = searchResults.map(result => ({
      name: result.name,
      cause: result.cause || (result.skills ? result.skills.join(', ') : 'Various interests'),
      score: `${Math.round(result.score * 100)}% match`,
      matchReason: generateMatchReason(query, result)
    }));

    console.log(`📊 Found ${formattedResults.length} semantic matches`);
    
    res.json({
      ok: true,
      results: formattedResults
    });
    
  } catch (err) {
    console.error('Error in semantic search:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

function generateMatchReason(query, result) {
  const reasons = [];
  
  if (result.skills && result.skills.some(skill => 
    skill.toLowerCase().includes(query.toLowerCase()) || 
    query.toLowerCase().includes(skill.toLowerCase())
  )) {
    reasons.push(`Skills match: ${result.skills.join(', ')}`);
  }
  
  if (result.interests && result.interests.some(interest => 
    interest.toLowerCase().includes(query.toLowerCase()) || 
    query.toLowerCase().includes(interest.toLowerCase())
  )) {
    reasons.push(`Interests align: ${result.interests.join(', ')}`);
  }
  
  if (result.cause && (
    result.cause.toLowerCase().includes(query.toLowerCase()) || 
    query.toLowerCase().includes(result.cause.toLowerCase())
  )) {
    reasons.push(`Cause related: ${result.cause}`);
  }
  
  if (reasons.length === 0) {
    reasons.push(`AI detected semantic similarity with "${query}"`);
  }
  
  return reasons.join(' • ');
}

// Clear all profiles endpoint
app.delete('/api/profiles/clear', async (req, res) => {
  try {
    const result = await profiles.deleteMany({});
    console.log(`🗑️ Cleared ${result.deletedCount} profiles from database`);
    res.json({ 
      ok: true, 
      message: `Cleared ${result.deletedCount} profiles`,
      deletedCount: result.deletedCount 
    });
  } catch (err) {
    console.error('Error clearing profiles:', err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
(async () => {
  try {
    console.log('🔗 Attempting to connect to MongoDB...');
    console.log('📍 Connection string:', process.env.MONGODB_URI ? process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@') : 'NOT SET');
    
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    
    db = client.db(process.env.DATABASE_NAME || 'MAUKA');
    profiles = db.collection('profiles');
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log(`📁 Database: ${process.env.DATABASE_NAME || 'MAUKA'}`);
    console.log('📄 Collection: profiles');
    
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`🚀 API running on http://localhost:${port}`);
      console.log('📋 Production API endpoints:');
      console.log('  POST /api/profile/upsert');
      console.log('  POST /api/recommend/ngos');
      console.log('  POST /api/recommend/volunteers');
      console.log('  POST /api/semantic-search');
      console.log('  GET  /health');
      console.log('');
      console.log('⚡ AI Vector Recommendations are ready!');
      console.log('   - Vector search will be attempted first');
      console.log('   - Fallback to cosine similarity if vector search fails');
      console.log('   - OpenAI embeddings are being used');
      });
    } catch (e) {
      console.error('❌ Failed to connect to MongoDB Atlas!');
      console.error('Error details:', e.message);
      console.log('');
      console.log('🔧 Troubleshooting steps:');
      console.log('1. Check your MongoDB Atlas credentials');
      console.log('2. Verify your IP address is whitelisted');
      console.log('3. Ensure your cluster is active');
      console.log('4. Check if the database user has proper permissions');
      console.log('');
      console.log('💡 Alternative: Use a local MongoDB instance:');
      console.log('   - Install MongoDB locally');
      console.log('   - Update MONGODB_URI to: mongodb://localhost:27017/MAUKA');
      process.exit(1);
    }
  })();
