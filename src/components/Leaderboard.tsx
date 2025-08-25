import React, { useState } from 'react';
import { Trophy, Star, TrendingUp, Clock, Award, ChevronDown, Quote } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  const topPerformers = [
    {
      rank: 1,
      name: 'Priya Sharma',
      school: 'Delhi Public School',
      totalPoints: 2850,
      hoursWorked: 145,
      rating: 4.9,
      growthPercentage: 85,
      avatar: 'PS',
      badge: 'Gold'
    },
    {
      rank: 2,
      name: 'Arjun Patel',
      school: 'Kendriya Vidyalaya',
      totalPoints: 2720,
      hoursWorked: 138,
      rating: 4.8,
      growthPercentage: 78,
      avatar: 'AP',
      badge: 'Silver'
    },
    {
      rank: 3,
      name: 'Meera Reddy',
      school: 'St. Xavier\'s School',
      totalPoints: 2650,
      hoursWorked: 132,
      rating: 4.8,
      growthPercentage: 82,
      avatar: 'MR',
      badge: 'Bronze'
    }
  ];

  const otherPerformers = [
    {
      rank: 4,
      name: 'Rohit Kumar',
      school: 'Modern School',
      totalPoints: 2480,
      hoursWorked: 125,
      rating: 4.7,
      growthPercentage: 75,
      avatar: 'RK'
    },
    {
      rank: 5,
      name: 'Ananya Singh',
      school: 'Ryan International',
      totalPoints: 2350,
      hoursWorked: 118,
      rating: 4.6,
      growthPercentage: 70,
      avatar: 'AS'
    },
    {
      rank: 6,
      name: 'Karan Mehta',
      school: 'DAV Public School',
      totalPoints: 2280,
      hoursWorked: 115,
      rating: 4.6,
      growthPercentage: 68,
      avatar: 'KM'
    },
    {
      rank: 7,
      name: 'Sneha Gupta',
      school: 'Amity International',
      totalPoints: 2150,
      hoursWorked: 108,
      rating: 4.5,
      growthPercentage: 65,
      avatar: 'SG'
    },
    {
      rank: 8,
      name: 'Vikram Joshi',
      school: 'The Heritage School',
      totalPoints: 2080,
      hoursWorked: 105,
      rating: 4.5,
      growthPercentage: 62,
      avatar: 'VJ'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Top Performer',
      quote: 'Mauka gave me the platform to turn my passion for teaching into real impact. Working with underprivileged children has taught me more than any textbook ever could.',
      type: 'student'
    },
    {
      name: 'Green Future Foundation',
      role: 'Partner NGO',
      quote: 'The volunteers from Mauka are exceptional. They bring energy, dedication, and fresh ideas that have transformed our environmental programs.',
      type: 'ngo'
    },
    {
      name: 'Arjun Patel',
      role: 'Top Performer',
      quote: 'Through Mauka, I discovered that leadership isn\'t about age—it\'s about commitment. Every hour I volunteer makes me a better person and leader.',
      type: 'student'
    },
    {
      name: 'HealthCare for All',
      role: 'Partner NGO',
      quote: 'Mauka volunteers have been instrumental in our health awareness campaigns. Their enthusiasm and reliability make them invaluable partners.',
      type: 'ngo'
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Gold': return 'from-yellow-400 to-yellow-600';
      case 'Silver': return 'from-gray-300 to-gray-500';
      case 'Bronze': return 'from-orange-400 to-orange-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Award className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-orange-500" />;
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  };

  return (
    <section id="leaderboard" className="py-12 bg-gradient-to-b from-orange-25 to-orange-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-orange-200/30 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-orange-300/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
            <Trophy className="w-4 h-4 mr-2" />
            Top Performers
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Champions of Impact
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            These extraordinary young leaders prove that age is just a number when it comes to changing the world
          </p>
        </div>

        {/* Top 3 Performers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {topPerformers.map((performer, index) => (
            <div key={index} className={`group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 transform ${
              performer.rank === 1 ? 'ring-2 ring-yellow-400/50' : 
              performer.rank === 2 ? 'ring-2 ring-gray-400/50' : 
              'ring-2 ring-orange-400/50'
            }`}>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {getRankIcon(performer.rank)}
                </div>
                
                <div className={`w-20 h-20 bg-gradient-to-br ${getBadgeColor(performer.badge)} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300`}>
                  {performer.avatar}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{performer.name}</h3>
                <p className="text-gray-600 mb-6">{performer.school}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-orange-50 rounded-xl">
                    <div className="font-semibold text-orange-600">{performer.totalPoints}</div>
                    <div className="text-gray-600">Total Points</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-xl">
                    <div className="font-semibold text-orange-600">{performer.hoursWorked}h</div>
                    <div className="text-gray-600">Hours Worked</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-xl">
                    <div className="font-semibold text-orange-600 flex items-center justify-center">
                      <Star className="w-4 h-4 mr-1" />
                      {performer.rating}
                    </div>
                    <div className="text-gray-600">Rating</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-xl">
                    <div className="font-semibold text-orange-600 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {performer.growthPercentage}%
                    </div>
                    <div className="text-gray-600">Growth</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Performers */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-orange-100/50 p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Other Top Performers</h3>
          
          <div className="space-y-4">
            {(showMore ? otherPerformers : otherPerformers.slice(0, 3)).map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-6 bg-orange-50/50 rounded-2xl hover:bg-orange-50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full font-bold text-gray-600">
                    #{performer.rank}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                    {performer.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{performer.name}</h4>
                    <p className="text-sm text-gray-600">{performer.school}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-orange-600">{performer.totalPoints}</div>
                    <div className="text-gray-500">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-orange-600">{performer.hoursWorked}h</div>
                    <div className="text-gray-500">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-orange-600 flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      {performer.rating}
                    </div>
                    <div className="text-gray-500">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-orange-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {performer.growthPercentage}%
                    </div>
                    <div className="text-gray-500">Growth</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {!showMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowMore(true)}
                className="inline-flex items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Show More
                <ChevronDown className="ml-2 w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">What Our Community Says</h3>
          <p className="text-gray-600">Hear from our top performers and partner NGOs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`p-8 rounded-3xl border transition-all duration-500 hover:scale-105 ${
              testimonial.type === 'student' 
                ? 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200/50 hover:border-orange-300' 
                : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50 hover:border-blue-300'
            }`}>
              <div className="flex items-center mb-6">
                <Quote className={`w-8 h-8 mr-3 ${
                  testimonial.type === 'student' ? 'text-orange-500' : 'text-blue-500'
                }`} />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className={`text-sm ${
                    testimonial.type === 'student' ? 'text-orange-600' : 'text-blue-600'
                  }`}>{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;