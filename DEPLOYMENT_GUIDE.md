# 🌊 DigitalOcean Deployment Guide

## 🎯 Your Repository is Ready!

✅ **GitHub Repository**: https://github.com/mj-112358/final-mauka  
✅ **Code Pushed**: Production-ready AI platform  
✅ **Secrets Secured**: Environment variables templated  
✅ **Configuration**: DigitalOcean App Platform ready  

## 🚀 Deploy to DigitalOcean (5 Minutes)

### Step 1: Create DigitalOcean App
1. **Go to**: https://cloud.digitalocean.com/apps
2. **Click**: "Create App"
3. **Connect GitHub**: Authorize DigitalOcean to access your repositories
4. **Select Repository**: `mj-112358/final-mauka`
5. **Branch**: `main`

### Step 2: DigitalOcean Auto-Detection
DigitalOcean will automatically detect:
- ✅ **React Frontend** (from `package.json` and `vite.config.ts`)
- ✅ **Node.js Backend** (from `server.cjs`)
- ✅ **Build Scripts** (npm run build, npm start)

### Step 3: Configure Environment Variables
In the DigitalOcean dashboard, add these environment variables:

**For the Backend Service:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/MAUKA
OPENAI_API_KEY=sk-proj-your-openai-api-key-here
DATABASE_NAME=MAUKA
PORT=4000
NODE_ENV=production
```

**For the Frontend:**
```
NODE_ENV=production
```

### Step 4: Database Options

**Option A: Use Your Existing MongoDB Atlas**
- Use your current `MONGODB_URI` from local development
- No additional setup needed

**Option B: DigitalOcean Managed MongoDB**
- DigitalOcean can provision MongoDB for you
- Updates `MONGODB_URI` automatically
- Cost: ~$15/month additional

### Step 5: Deploy!
1. **Review Configuration**: Check all settings
2. **Click**: "Create Resources"
3. **Wait**: 5-10 minutes for build and deployment
4. **Success**: Your app will be live at `https://your-app-name.ondigitalocean.app`

## 💰 Cost Breakdown
- **Starter Tier**: ~$12/month
  - Frontend (Static Site): $0
  - Backend (Basic): $5/month  
  - MongoDB Atlas: $0 (free tier) or $9/month
- **Production Tier**: ~$25/month
  - Frontend: $0
  - Backend: $12/month
  - Database: $15/month

## 🔧 Post-Deployment Configuration

### Update API URLs
If frontend and backend have different URLs, update:
```typescript
// src/components/VolunteerMatching.tsx
const API_BASE = 'https://your-backend-url.ondigitalocean.app';
```

### SSL & Domain
- ✅ **Free SSL**: Automatically provided
- 🌐 **Custom Domain**: Add your domain in settings
- 🔒 **HTTPS**: Enforced by default

### Monitoring
- 📊 **Logs**: Available in DigitalOcean dashboard
- 🚨 **Alerts**: Set up for downtime/errors
- 📈 **Metrics**: CPU, memory, requests per minute

## 🧪 Testing Your Deployment

### Health Check
```bash
curl https://your-app-url/health
# Should return: {"ok": true, "message": "Server is running"}
```

### Test API Endpoints
```bash
# Test semantic search
curl -X POST https://your-app-url/api/semantic-search \
  -H "Content-Type: application/json" \
  -d '{"query": "programming"}'
```

### Test Frontend
1. Visit your app URL
2. Go to "Volunteer Matching" section
3. Create a test volunteer profile
4. Create a test NGO profile  
5. Verify AI matching works

## 🔄 Continuous Deployment

✅ **Auto-Deploy**: Enabled on push to `main` branch  
✅ **Build Logs**: Available in dashboard  
✅ **Rollback**: One-click rollback to previous version  

### Making Updates
```bash
# Make changes to your code
git add .
git commit -m "Update: your changes"
git push origin main
# DigitalOcean automatically rebuilds and deploys!
```

## 🆘 Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check Node.js version compatibility
   - Verify all dependencies in `package.json`
   - Check build logs in DigitalOcean dashboard

2. **Environment Variables**:
   - Ensure all required variables are set
   - Check for typos in variable names
   - Restart the app after changing variables

3. **Database Connection**:
   - Verify MongoDB URI is correct
   - Check MongoDB Atlas IP whitelist (allow all: 0.0.0.0/0)
   - Test connection locally first

4. **API Not Working**:
   - Check CORS settings in server.cjs
   - Verify API endpoints are accessible
   - Check server logs for errors

### Getting Help:
- **DigitalOcean Docs**: https://docs.digitalocean.com/products/app-platform/
- **Community**: https://www.digitalocean.com/community/
- **Support**: Available in your DigitalOcean dashboard

## 🎉 You're Live!

Once deployed, your AI Volunteer Matching Platform will be:
- ✅ **Globally accessible** via HTTPS
- ✅ **Automatically scaling** based on usage
- ✅ **Continuously deployed** on every git push
- ✅ **Production monitoring** and alerting
- ✅ **Professional domain** (optional)

**Your AI platform is ready to connect volunteers with meaningful opportunities worldwide!** 🌍✨