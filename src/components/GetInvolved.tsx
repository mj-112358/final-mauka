import React, { useEffect, useRef } from 'react';
import { Heart, Users, ArrowRight, Zap, Sparkles } from 'lucide-react';

const GetInvolved: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const navigateToPage = (page: string) => {
    window.location.hash = page;
    window.location.reload();
  };

  return (
    <section id="get-involved" ref={sectionRef} className="py-24 bg-gradient-to-b from-orange-50/40 via-white to-orange-25/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-gradient-to-l from-orange-300/30 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-gradient-to-r from-orange-400/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20 opacity-0 translate-y-20 transition-all duration-1000 animate-in-trigger">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-100/80 to-amber-100/60 backdrop-blur-sm border border-orange-200/50 text-orange-700 text-sm font-semibold mb-8 shadow-lg shadow-orange-500/10">
            <Zap className="w-4 h-4 mr-2" />
            Join Our Mission
          </div>
          
          <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9]">
            Your Moment
            <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Starts Now
            </span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            The world doesn't need another bystander. It needs you. Your skills. Your passion. Your mauka to change everything.
          </p>
        </div>
        
        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-20">
          <div className="group p-12 rounded-3xl bg-gradient-to-br from-white/95 to-orange-50/80 backdrop-blur-sm border border-orange-200/50 hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 text-center transform opacity-0 translate-y-20 animate-volunteer-card">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl shadow-orange-500/30">
              <Users className="w-12 h-12 text-white" />
            </div>
            
            <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-orange-600 transition-colors duration-300">
              Volunteer
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-10 text-lg font-light">
              Share your skills, time, and passion to mentor young people and help them discover their potential.
            </p>
            
            <button 
              onClick={() => {
                const element = document.getElementById('volunteer-matching');
                if (element) {
                  const offset = 80;
                  const elementPosition = element.offsetTop - offset;
                  window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                }
              }}
              className="group/btn w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 transform inline-flex items-center justify-center"
            >
              <span className="flex items-center justify-center">
                Start Volunteering
                <ArrowRight className="ml-3 w-5 h-5 transform group-hover/btn:translate-x-2 group-hover/btn:scale-110 transition-all duration-300" />
              </span>
            </button>
          </div>
          
          <div className="group p-12 rounded-3xl bg-gradient-to-br from-white/95 to-orange-50/80 backdrop-blur-sm border border-orange-200/50 hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 text-center transform opacity-0 translate-y-20 animate-donate-card">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-600 to-orange-700 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl shadow-orange-500/30">
              <Heart className="w-12 h-12 text-white" />
            </div>
            
            <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-orange-600 transition-colors duration-300">
              Donate
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-10 text-lg font-light">
              Your contribution directly funds scholarships, programs, and resources that transform lives.
            </p>
            
            <button 
              onClick={() => navigateToPage('donate')}
              className="group/btn w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 transform inline-flex items-center justify-center"
            >
              <span className="flex items-center justify-center">
                Make a Donation
                <ArrowRight className="ml-3 w-5 h-5 transform group-hover/btn:translate-x-2 group-hover/btn:scale-110 transition-all duration-300" />
              </span>
            </button>
          </div>

          <div className="group p-12 rounded-3xl bg-gradient-to-br from-white/95 to-orange-50/80 backdrop-blur-sm border border-orange-200/50 hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 text-center transform opacity-0 translate-y-20 animate-volunteer-card" style={{ animationDelay: '0.4s' }}>
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl shadow-orange-500/30">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            
            <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-orange-600 transition-colors duration-300">
              Partner
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-10 text-lg font-light">
              Join our network of NGOs and access passionate volunteers ready to support your mission.
            </p>
            
            <button 
              onClick={() => {
                const element = document.getElementById('volunteer-matching');
                if (element) {
                  const offset = 80;
                  const elementPosition = element.offsetTop - offset;
                  window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                }
              }}
              className="group/btn w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 transform inline-flex items-center justify-center"
            >
              <span className="flex items-center justify-center">
                Become a Partner
                <ArrowRight className="ml-3 w-5 h-5 transform group-hover/btn:translate-x-2 group-hover/btn:scale-110 transition-all duration-300" />
              </span>
            </button>
          </div>
        </div>
        
        {/* Contact CTA */}
        <div className="text-center opacity-0 translate-y-20 transition-all duration-1000 delay-700 animate-in-trigger">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-white/90 to-orange-50/80 backdrop-blur-sm border border-orange-200/50 max-w-4xl mx-auto shadow-xl shadow-orange-500/10">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Have questions or want to learn more?
            </h3>
            <p className="text-gray-600 mb-8 text-xl font-light">
              We're here to help you start your journey of impact
            </p>
            <button 
              onClick={() => navigateToPage('contact')}
              className="group inline-flex items-center text-orange-600 hover:text-orange-700 font-bold text-xl transition-all duration-300 hover:scale-105"
            >
              Contact Our Team
              <ArrowRight className="ml-3 w-6 h-6 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;