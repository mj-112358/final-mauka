import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Clock, Award, Globe } from 'lucide-react';

const Impact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);

  const stats = [
    { 
      number: 3000, 
      suffix: '+',
      label: 'Active Volunteers', 
      description: 'Students creating change across India',
      color: 'text-orange-600',
      delay: 'animate-stat-1',
      icon: Users
    },
    { 
      number: 7200, 
      suffix: '',
      label: 'Service Hours', 
      description: 'Hours of dedicated community service',
      color: 'text-orange-700',
      delay: 'animate-stat-2',
      icon: Clock
    },
    { 
      number: 78, 
      suffix: '',
      label: 'Partner NGOs', 
      description: 'Organizations we collaborate with',
      color: 'text-orange-600',
      delay: 'animate-stat-3',
      icon: Award
    },
    { 
      number: 25, 
      suffix: '',
      label: 'States Reached', 
      description: 'Across India and beyond',
      color: 'text-orange-700',
      delay: 'animate-stat-4',
      icon: Globe
    }
  ];

  const [displayNumbers, setDisplayNumbers] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted) {
            setCountersStarted(true);
            entry.target.classList.add('animate-in');
            
            // Animate counters
            stats.forEach((stat, index) => {
              let current = 0;
              const increment = stat.number / 100;
              const timer = setInterval(() => {
                current += increment;
                if (current >= stat.number) {
                  current = stat.number;
                  clearInterval(timer);
                }
                setDisplayNumbers(prev => {
                  const newNumbers = [...prev];
                  newNumbers[index] = Math.floor(current);
                  return newNumbers;
                });
              }, 20);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [countersStarted]);

  return (
    <section id="impact" ref={sectionRef} className="py-24 bg-gradient-to-b from-orange-25/30 via-white to-orange-50/40 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-orange-200/30 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-l from-orange-300/25 to-transparent rounded-full blur-3xl animate-float"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 opacity-0 translate-y-20 transition-all duration-1000 animate-in-trigger">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-100/80 to-amber-100/60 backdrop-blur-sm border border-orange-200/50 text-orange-700 text-sm font-semibold mb-8 shadow-lg shadow-orange-500/10">
            <TrendingUp className="w-4 h-4 mr-2" />
            Measuring Success
          </div>
          
          <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9]">
            Measuring
            <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Real Impact
            </span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Every number tells a story. Every story changes a life. Every life transforms a community.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <div key={index} className="group text-center p-10 rounded-3xl bg-white/90 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105">
              <div className={`w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-orange-500/10`}>
                <stat.icon className="w-8 h-8 text-orange-600" />
              </div>
              
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
                {displayNumbers[index].toLocaleString()}{stat.suffix}
              </div>
              <div className="text-lg font-bold text-gray-900 mb-3">
                {stat.label}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Impact Stories */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-white/90 to-orange-50/60 border border-orange-200/50 shadow-xl shadow-orange-500/10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Student Impact</h3>
            <blockquote className="text-xl text-gray-700 font-light leading-relaxed mb-6 italic">
              "Mauka didn't just give me a scholarship—they gave me hope, mentorship, and a community that believed in my potential. Now I'm studying computer science and building apps to help other students like me."
            </blockquote>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                <span className="text-white text-sm font-bold">SC</span>
              </div>
              <div>
                <cite className="text-lg font-bold text-gray-900 not-italic">Sarah Chen</cite>
                <p className="text-sm text-orange-600 font-medium">Program Graduate, Now Software Engineer</p>
              </div>
            </div>
          </div>

          <div className="p-10 rounded-3xl bg-gradient-to-br from-white/90 to-orange-50/60 border border-orange-200/50 shadow-xl shadow-orange-500/10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">NGO Impact</h3>
            <blockquote className="text-xl text-gray-700 font-light leading-relaxed mb-6 italic">
              "The volunteers from Mauka are exceptional. They bring energy, dedication, and fresh ideas that have transformed our environmental programs. They're not just helping—they're leading."
            </blockquote>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                <span className="text-white text-sm font-bold">GF</span>
              </div>
              <div>
                <cite className="text-lg font-bold text-gray-900 not-italic">Green Future Foundation</cite>
                <p className="text-sm text-orange-600 font-medium">Partner NGO</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Founder Quote */}
        <div className="max-w-5xl mx-auto">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-2xl shadow-orange-500/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <blockquote className="text-3xl md:text-4xl font-light leading-relaxed mb-10 tracking-tight italic text-center">
                "The real impact isn't in our numbers — it's in the spark we see in a child's eyes when they realize someone believes in them. It's in the confidence of a volunteer who discovers they can actually change the world."
              </blockquote>
              <div className="flex items-center justify-center space-x-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-orange-100 text-xl font-bold">PJ</span>
                </div>
                <div className="text-left">
                  <cite className="text-2xl font-bold text-white not-italic">
                    Parth Jain
                  </cite>
                  <p className="text-orange-100 font-medium text-lg">Founder, Mauka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;