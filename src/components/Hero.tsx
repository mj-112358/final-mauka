import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Users, Target } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && textRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        const opacity = 1 - scrolled / (window.innerHeight * 0.8);
        
        textRef.current.style.transform = `translateY(${rate}px)`;
        textRef.current.style.opacity = Math.max(0, opacity).toString();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-orange-25/30 to-amber-25/20 pt-20">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-orange-200/40 to-amber-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-orange-300/20 to-amber-300/15 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-orange-100/10 to-amber-100/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div ref={textRef} className="space-y-8">
            {/* Main Headline */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100/80 backdrop-blur-sm border border-orange-200/50 text-orange-700 text-sm font-medium shadow-lg shadow-orange-500/10">
                <Sparkles className="w-4 h-4 mr-2 animate-spin-slow" />
                Creating Opportunities for Youth
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[0.85] tracking-tighter">
                <span className="inline-block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 cursor-default">
                  Mauka
                </span>
              </h1>
              
              <h2 className="text-3xl md:text-4xl text-gray-900 font-bold leading-tight">
                Seize your opportunity. Seize your Mauka.
              </h2>
            </div>
          
            {/* Engaging Content */}
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <div className="text-xl font-bold text-gray-900 leading-relaxed">
                Mauka isn't just a platform. It's a revolution of young hearts who refuse to wait for tomorrow.
              </div>
            </div>
          
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button 
                onClick={() => {
                  const element = document.getElementById('volunteer-matching');
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.offsetTop - offset;
                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                  }
                }}
                className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/50 transform overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center justify-center">
                  Become a Volunteer
                  <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                </span>
              </button>
              
              <button 
                onClick={() => {
                  const element = document.getElementById('volunteer-matching');
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.offsetTop - offset;
                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                  }
                }}
                className="group relative bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/30 transform overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center justify-center">
                  Partner as an NGO
                  <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                </span>
              </button>
              
              <button 
                onClick={() => navigateToPage('donate')}
                className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-amber-500/50 transform overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center justify-center">
                  Support with a Donation
                  <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                </span>
              </button>
            </div>
          </div>
        
          {/* Right Side - Spline Animation */}
          <div className="relative h-[600px] w-full">
            <div className="w-full h-full bg-gradient-to-br from-white/50 to-orange-50/30 rounded-3xl overflow-hidden backdrop-blur-sm border border-orange-100/30 shadow-2xl shadow-orange-500/10">
              <Spline
                scene="https://prod.spline.design/AcYRTcXVvLwcRDdr/scene.splinecode"
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'transparent'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-orange-400/60 rounded-full flex justify-center backdrop-blur-sm bg-white/20">
          <div className="w-1 h-3 bg-orange-500 rounded-full mt-2 animate-scroll-indicator"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;