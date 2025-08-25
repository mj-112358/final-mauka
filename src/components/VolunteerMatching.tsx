import React, { useState } from 'react';
import { Users, Building2, Sparkles, ArrowRight, Loader2, X, Mail, Phone, Brain, Zap } from 'lucide-react';

const API_BASE = 'http://localhost:4000';

interface MatchResult {
	_id: string;
	name: string;
	city: string;
	cause?: string;
	needs?: string[];
	skills?: string[];
	interests?: string[];
	availability?: string;
	score: number;
	email?: string;
	phone?: string;
}

const VolunteerMatching: React.FC = () => {
	const [activeTab, setActiveTab] = useState<'volunteer' | 'ngo' | 'semantic'>('volunteer');
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState<MatchResult[]>([]);
	const [semanticQuery, setSemanticQuery] = useState('');
	const [semanticResults, setSemanticResults] = useState<any[]>([]);
	const [showContactModal, setShowContactModal] = useState(false);
	const [selectedContact, setSelectedContact] = useState<MatchResult | null>(null);
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<string>('');

	const handleVolunteerSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');
    
		const formData = new FormData(e.target as HTMLFormElement);
		const volunteerData = {
			type: 'volunteer',
			name: formData.get('name') as string,
			city: formData.get('city') as string,
			email: formData.get('email') as string,
			phone: formData.get('phone') as string,
			skills: (formData.get('skills') as string).split(',').map(s => s.trim()).filter(Boolean),
			interests: (formData.get('interests') as string).split(',').map(s => s.trim()).filter(Boolean),
			availability: formData.get('availability') as string,
			bio: formData.get('bio') as string
		};

		try {
			const registerResponse = await fetch(`${API_BASE}/api/profile/upsert`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(volunteerData)
			});
      
			const registerResult = await registerResponse.json();
			if (!registerResult.ok) {
				setError(registerResult.error || 'Failed to register volunteer');
				return;
			}

			const recommendResponse = await fetch(`${API_BASE}/api/recommend/ngos`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					volunteerId: registerResult.id,
					city: volunteerData.city 
				})
			});

			const recommendResult = await recommendResponse.json();
			if (!recommendResult.ok) {
				setError(recommendResult.error || 'Failed to get recommendations');
				return;
			}

			if (recommendResult.results.length === 0) {
				setError('No suitable NGOs found in your area. Try expanding your search or check back later!');
				return;
			}

			setResults(recommendResult.results);
			
			// Check if any results are in the same city
			const sameCityCount = recommendResult.results.filter(r => 
				r.city && r.city.toLowerCase() === volunteerData.city.toLowerCase()
			).length;
			
			if (sameCityCount > 0) {
				setSuccess(`Found ${recommendResult.results.length} matches! ${sameCityCount} in ${volunteerData.city} and ${recommendResult.results.length - sameCityCount} in nearby areas.`);
			} else {
				setSuccess(`Found ${recommendResult.results.length} great matches! These NGOs are in nearby cities and welcome remote volunteers.`);
			}
		} catch (error) {
			console.error('Error:', error);
			setError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleNgoSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');
    
		const formData = new FormData(e.target as HTMLFormElement);
		const ngoData = {
			type: 'ngo',
			name: formData.get('name') as string,
			city: formData.get('city') as string,
			email: formData.get('email') as string,
			phone: formData.get('phone') as string,
			cause: formData.get('cause') as string,
			needs: (formData.get('needs') as string).split(',').map(s => s.trim()).filter(Boolean),
			schedule: formData.get('schedule') as string,
			description: formData.get('description') as string
		};

		try {
			const registerResponse = await fetch(`${API_BASE}/api/profile/upsert`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(ngoData)
			});
      
			const registerResult = await registerResponse.json();
			if (!registerResult.ok) throw new Error(registerResult.error);

			const recommendResponse = await fetch(`${API_BASE}/api/recommend/volunteers`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					ngoId: registerResult.id,
					city: ngoData.city 
				})
			});

			const recommendResult = await recommendResponse.json();
			if (!recommendResult.ok) throw new Error(recommendResult.error);

			if (recommendResult.results.length === 0) {
				setError('No suitable volunteers found. Try broadening your search criteria.');
				return;
			}
			setResults(recommendResult.results);
			
			// Check if any results are in the same city
			const sameCityCount = recommendResult.results.filter(r => 
				r.city && r.city.toLowerCase() === ngoData.city.toLowerCase()
			).length;
			
			if (sameCityCount > 0) {
				setSuccess(`Found ${recommendResult.results.length} volunteer matches! ${sameCityCount} in ${ngoData.city} and ${recommendResult.results.length - sameCityCount} in nearby areas.`);
			} else {
				setSuccess(`Found ${recommendResult.results.length} great volunteers! These are from nearby cities and available for remote work.`);
			}
		} catch (error) {
			console.error('Error:', error);
			setError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleConnectNow = (result: MatchResult) => {
		setSelectedContact(result);
		setShowContactModal(true);
	};

	const handleSemanticSearch = async (query: string) => {
		if (!query.trim()) return;
		
		setLoading(true);
		setError('');
		setSuccess('');
		try {
			const response = await fetch(`${API_BASE}/api/semantic-search`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query })
			});
			
			const result = await response.json();
			if (result.ok) {
				if (result.results.length === 0) {
					setError('No matches found for your search. Try different keywords.');
					return;
				}
				setSemanticResults(result.results || []);
				setSuccess(`Found ${result.results.length} matches for your search!`);
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			console.error('Semantic search error:', error);
			setError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};


	const closeContactModal = () => {
		setShowContactModal(false);
		setSelectedContact(null);
	};

	return (
		<section id="volunteer-matching" className="py-24 bg-gradient-to-br from-white via-orange-25/20 to-amber-50/30 relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0">
				<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
				<div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-100/15 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
			</div>

			<div className="relative max-w-7xl mx-auto px-6">
				{/* Error and Success Messages */}
				{error && (
					<div className="mb-8 p-6 bg-red-50/90 backdrop-blur-sm border border-red-200/50 rounded-2xl text-red-700 shadow-lg shadow-red-500/10">
						<div className="flex items-center">
							<span className="text-red-500 mr-3 text-xl">⚠️</span>
							<span className="font-medium">{error}</span>
						</div>
					</div>
				)}
				{success && (
					<div className="mb-8 p-6 bg-green-50/90 backdrop-blur-sm border border-green-200/50 rounded-2xl text-green-700 shadow-lg shadow-green-500/10">
						<div className="flex items-center">
							<span className="text-green-500 mr-3 text-xl">✅</span>
							<span className="font-medium">{success}</span>
						</div>
					</div>
				)}

				{/* Header */}
				<div className="text-center mb-20">
					<div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-100/80 to-amber-100/60 backdrop-blur-sm border border-orange-200/50 text-orange-700 text-sm font-semibold mb-8 shadow-lg shadow-orange-500/10">
						<Sparkles className="w-4 h-4 mr-2 animate-spin-slow" />
						AI-Powered Matching
					</div>
          
					<h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9]">
						Find Your Perfect
						<span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
							Volunteer Match
						</span>
					</h2>
          
					<p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
						Our AI understands your passions and connects you with meaningful opportunities that align with your values and skills
					</p>

				</div>

				{/* Navigation Tabs */}
				<div className="flex justify-center mb-16">
					<div className="bg-white/90 backdrop-blur-sm rounded-3xl p-3 border border-gray-200/50 shadow-xl shadow-gray-200/20">
						<button
							onClick={() => setActiveTab('volunteer')}
							className={`inline-flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
								activeTab === 'volunteer'
									? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/30'
									: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
							}`}
						>
							<Users className="w-5 h-5 mr-3" />
							I'm a Volunteer
						</button>
            
						<button
							onClick={() => setActiveTab('ngo')}
							className={`inline-flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
								activeTab === 'ngo'
									? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/30'
									: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
							}`}
						>
							<Building2 className="w-5 h-5 mr-3" />
							I'm an NGO
						</button>
            
						<button
							onClick={() => setActiveTab('semantic')}
							className={`inline-flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
								activeTab === 'semantic'
									? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/30'
									: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
							}`}
						>
							<Brain className="w-5 h-5 mr-3" />
							AI Search Test
						</button>
					</div>
				</div>

				{/* Content */}
				<div className="max-w-5xl mx-auto">
					{/* Volunteer Form */}
					{activeTab === 'volunteer' && (
						<div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/50 shadow-2xl shadow-gray-200/20">
							<div className="text-center mb-10">
								<h3 className="text-3xl font-bold text-gray-900 mb-4">
									Find NGOs That Need Your Skills
								</h3>
								<p className="text-gray-600 text-lg">Connect with organizations that align with your passions and expertise</p>
							</div>
              
							<form onSubmit={handleVolunteerSubmit} className="space-y-8">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
										<input
											type="text"
											name="name"
											required
											className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
											placeholder="Enter your name"
										/>
									</div>
                  
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-3">City</label>
										<input
											type="text"
											name="city"
											required
											className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
											placeholder="Your city"
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-3">Email</label>
										<input
											type="email"
											name="email"
											required
											className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
											placeholder="your.email@example.com"
										/>
									</div>
                  
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number</label>
										<input
											type="tel"
											name="phone"
											required
											className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
											placeholder="+1 (555) 123-4567"
										/>
									</div>
								</div>
                
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-3">Skills</label>
									<textarea
										name="skills"
										rows={3}
										className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
										placeholder="web development, teaching, marketing, design, photography..."
									/>
								</div>
                
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-3">Interests</label>
									<textarea
										name="interests"
										rows={3}
										className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
										placeholder="education, environment, healthcare, technology, arts..."
									/>
								</div>
                
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-3">Availability</label>
									<input
										type="text"
										name="availability"
										className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
										placeholder="weekends, 10 hours/week, flexible, evenings..."
									/>
								</div>
                
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-3">About You</label>
									<textarea
										name="bio"
										rows={4}
										className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
										placeholder="Tell us about your passion for volunteering and what drives you to make a difference..."
									/>
								</div>
                
								<button
									type="submit"
									disabled={loading}
									className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
								>
									{loading ? (
										<Loader2 className="w-6 h-6 animate-spin mr-3" />
									) : (
										<Sparkles className="w-6 h-6 mr-3" />
									)}
									Find My Perfect NGO Match
								</button>
							</form>
						</div>
					)}

					{/* NGO Form */}
					{activeTab === 'ngo' && (
						<div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/50 shadow-2xl shadow-gray-200/20">
							<div className="text-center mb-10">
								<h3 className="text-3xl font-bold text-gray-900 mb-4">
									Find Volunteers Who Share Your Mission
								</h3>
								<p className="text-gray-600 text-lg">Connect with passionate young people ready to support your cause</p>
							</div>
              
							<form onSubmit={handleNgoSubmit} className="space-y-8">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-3">Organization Name</label>
										<input
											type="text"
											name="name"
											required
											className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
											placeholder="Your organization name"
										/>
									</div>
                  
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-3">City</label>
										<input
											type="text"
											name="city"
											required
											className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
											placeholder="Your city"
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-3">Email</label>
										<input
											type="email"
											name="email"
											required
											className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
											placeholder="contact@yourorg.com"
										/>
									</div>
                  
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number</label>
										<input
											type="tel"
											name="phone"
											required
											className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
											placeholder="+1 (555) 123-4567"
										/>
									</div>
								</div>
                
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-3">Cause/Focus Area</label>
									<input
										type="text"
										name="cause"
										className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
										placeholder="education, environment, healthcare, poverty alleviation..."
									/>
								</div>
                
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-3">What Volunteers Do You Need?</label>
									<textarea
										name="needs"
										rows={3}
										className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
										placeholder="teachers, developers, marketers, event coordinators, content creators..."
									/>
								</div>
                
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-3">Schedule</label>
									<input
										type="text"
										name="schedule"
										className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
										placeholder="flexible, weekends only, remote work, evenings..."
									/>
								</div>
                
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-3">About Your Organization</label>
									<textarea
										name="description"
										rows={4}
										className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
										placeholder="Describe your mission, volunteer opportunities, and what makes your organization special..."
									/>
								</div>
                
								<button
									type="submit"
									disabled={loading}
									className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
								>
									{loading ? (
										<Loader2 className="w-6 h-6 animate-spin mr-3" />
									) : (
										<Sparkles className="w-6 h-6 mr-3" />
									)}
									Find Perfect Volunteers
								</button>
							</form>
						</div>
					)}

					{/* Semantic Search */}
					{activeTab === 'semantic' && (
						<div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/50 shadow-2xl shadow-gray-200/20">
							<div className="text-center mb-10">
								<h3 className="text-3xl font-bold text-gray-900 mb-4">
									Test AI Semantic Understanding
								</h3>
								<p className="text-gray-600 text-lg">Discover how our AI interprets meaning beyond keywords</p>
							</div>
              
							<div className="space-y-8">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-6">
										Try different keywords to see how AI understands meaning:
									</label>
                  
									<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
										{['programming', 'teaching', 'environment', 'healthcare', 'coding', 'mentoring', 'sustainability', 'medical'].map((keyword) => (
											<button
												key={keyword}
												onClick={() => {
													setSemanticQuery(keyword);
													handleSemanticSearch(keyword);
												}}
												className="px-6 py-3 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 text-orange-700 rounded-2xl transition-all duration-300 text-sm font-semibold border border-orange-200 hover:scale-105 shadow-lg shadow-orange-500/10"
											>
												{keyword}
											</button>
										))}
									</div>
								</div>
                
								<div className="flex gap-4">
									<input
										type="text"
										value={semanticQuery}
										onChange={(e) => setSemanticQuery(e.target.value)}
										onKeyPress={(e) => e.key === 'Enter' && handleSemanticSearch(semanticQuery)}
										className="flex-1 px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
										placeholder="Or type your own keyword..."
									/>
									<button
										onClick={() => handleSemanticSearch(semanticQuery)}
										disabled={loading || !semanticQuery.trim()}
										className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center hover:scale-105 shadow-lg shadow-orange-500/20"
									>
										{loading ? (
											<Loader2 className="w-6 h-6 animate-spin" />
										) : (
											<Brain className="w-6 h-6" />
										)}
									</button>
								</div>
							</div>
						</div>
					)}

				</div>

				{/* Results */}
				{(results.length > 0 || semanticResults.length > 0) && (
					<div className="mt-20 max-w-5xl mx-auto">
						<div className="text-center mb-12">
							<h3 className="text-4xl font-bold text-gray-900 mb-4">
								{activeTab === 'semantic' ? 'AI Semantic Matches' : 'Your Perfect Matches'}
							</h3>
							<p className="text-gray-600 text-lg">
								{activeTab === 'semantic' 
									? 'See how our AI understands context and meaning' 
									: 'These organizations align perfectly with your profile'
								}
							</p>
						</div>
            
						<div className="grid gap-8">
							{activeTab === 'semantic' ? (
								semanticResults.map((result, index) => (
									<div key={index} className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 hover:shadow-xl hover:shadow-gray-200/20 transition-all duration-300 hover:scale-[1.01]">
										<div className="flex justify-between items-start mb-6">
											<h4 className="text-2xl font-bold text-gray-900">{result.name}</h4>
											<span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 rounded-full text-sm font-bold">
												{result.score}
											</span>
										</div>
										<p className="text-gray-600 mb-3 text-lg">
											<strong>Focus:</strong> {result.cause}
										</p>
										<p className="text-gray-500">
											{result.matchReason}
										</p>
									</div>
								))
							) : (
								results.map((result) => (
									<div key={result._id} className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 hover:shadow-xl hover:shadow-gray-200/20 transition-all duration-300 hover:scale-[1.01]">
										<div className="flex justify-between items-start mb-6">
											<h4 className="text-2xl font-bold text-gray-900">{result.name}</h4>
											<span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 rounded-full text-sm font-bold">
												{Math.round(result.score * 100)}% match
											</span>
										</div>
                    
										<div className="space-y-3 text-gray-600 mb-6 text-lg">
											<p><strong>Location:</strong> {result.city}</p>
											{result.cause && <p><strong>Cause:</strong> {result.cause}</p>}
											{result.needs && <p><strong>Looking for:</strong> {result.needs.join(', ')}</p>}
											{result.skills && <p><strong>Skills:</strong> {result.skills.join(', ')}</p>}
											{result.interests && <p><strong>Interests:</strong> {result.interests.join(', ')}</p>}
											{result.availability && <p><strong>Available:</strong> {result.availability}</p>}
										</div>
                    
										<button 
											onClick={() => handleConnectNow(result)}
											className="inline-flex items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
										>
											Connect Now
											<ArrowRight className="w-5 h-5 ml-2" />
										</button>
									</div>
								))
							)}
						</div>
					</div>
				)}

				{/* Contact Modal */}
				{showContactModal && selectedContact && (
					<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
						<div className="bg-white rounded-3xl p-10 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
							<div className="flex justify-between items-start mb-8">
								<h3 className="text-3xl font-bold text-gray-900">Contact Information</h3>
								<button
									onClick={closeContactModal}
									className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
								>
									<X className="w-6 h-6" />
								</button>
							</div>
              
							<div className="space-y-6">
								<div>
									<h4 className="text-2xl font-bold text-gray-900 mb-4">{selectedContact.name}</h4>
									<p className="text-gray-600 text-lg"><strong>Location:</strong> {selectedContact.city}</p>
									{selectedContact.cause && <p className="text-gray-600 text-lg"><strong>Cause:</strong> {selectedContact.cause}</p>}
								</div>
                
								<div className="border-t pt-6">
									<h5 className="font-bold text-gray-900 mb-4 text-lg">Contact Details:</h5>
									<div className="space-y-4">
										{selectedContact.email && (
											<div className="flex items-center text-gray-600 text-lg">
												<Mail className="w-6 h-6 mr-4 text-orange-500" />
												<span>{selectedContact.email}</span>
											</div>
										)}
										{selectedContact.phone && (
											<div className="flex items-center text-gray-600 text-lg">
												<Phone className="w-6 h-6 mr-4 text-orange-500" />
												<span>{selectedContact.phone}</span>
											</div>
										)}
									</div>
								</div>
                
								<div className="flex gap-4 pt-6">
									{selectedContact.email && (
										<a
											href={`mailto:${selectedContact.email}`}
											className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-200 text-center hover:scale-105 shadow-lg shadow-orange-500/20"
										>
											Send Email
										</a>
									)}
									{selectedContact.phone && (
										<a
											href={`tel:${selectedContact.phone}`}
											className="flex-1 bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 py-4 px-6 rounded-2xl font-semibold transition-all duration-200 text-center hover:scale-105"
										>
											Call Now
										</a>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default VolunteerMatching;