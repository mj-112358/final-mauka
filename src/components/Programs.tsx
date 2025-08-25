import React, { useEffect, useRef } from 'react';
import { GraduationCap, Briefcase, Users, BookOpen, ArrowUpRight, Sparkles, Target, Lightbulb, ArrowRight } from 'lucide-react';

const Programs: React.FC = () => {
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

  const programs = [
    {
      icon: GraduationCap,
      title: 'Education Access',
      description: 'Breaking barriers to quality education through scholarships, tutoring, and academic mentorship that transforms potential into achievement.',
      gradient: 'from-orange-400 to-orange-600',
      bgGradient: 'from-orange-50/80 to-orange-100/40',
      borderColor: 'border-orange-200/50 hover:border-orange-300',
      delay: 'animate-program-1',
      stats: '500+ students supported'
    },
    {
      icon: Target,
      title: 'Skill Development',
      description: 'Hands-on workshops in technology, entrepreneurship, and life skills that prepare youth for the modern economy.',
      gradient: 'from-orange-500 to-orange-700',
      bgGradient: 'from-orange-100/60 to-orange-50/80',
      borderColor: 'border-orange-200/50 hover:border-orange-300',
      delay: 'animate-program-2',
      stats: '200+ workshops conducted'
    },
    {
      icon: Users,
      title: 'Leadership Training',
      description: 'Comprehensive leadership development that turns passionate students into confident changemakers and community leaders.',
      gradient: 'from-orange-600 to-orange-800',
      bgGradient: 'from-orange-50/80 to-orange-100/40',
      borderColor: 'border-orange-200/50 hover:border-orange-300',
      delay: 'animate-program-3',
      stats: '150+ leaders trained'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Labs',
      description: 'Creative spaces where young minds collaborate on solutions to real-world problems, turning ideas into impact.',
      gradient: 'from-orange-500 to-orange-700',
      bgGradient: 'from-orange-100/60 to-orange-50/80',
      borderColor: 'border-orange-200/50 hover:border-orange-300',
      delay: 'animate-program-4',
      stats: '50+ projects launched'
    }
  ];

  return (
    <section id="programs" className="py-12 bg-gradient-to-b from-orange-50/40 via-white to-orange-25/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-orange-200/25 to-orange-300/15 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-orange-300/15 to-orange-400/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-12 opacity-0 translate-y-20 transition-all duration-1000 animate-in-trigger">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-100/80 to-amber-100/60 backdrop-blur-sm border border-orange-200/50 text-orange-700 text-sm font-semibold mb-8 shadow-lg shadow-orange-500/10">
            <Sparkles className="w-4 h-4 mr-2 animate-spin-slow" />
            What We Offer
          </div>
          
          <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9]">
            Transformative
            <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Programs
            </span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Revolutionary initiatives that don't just open doors — they build entirely new pathways to success
          </p>
        </div>
        
        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {programs.map((program, index) => (
            <div 
              key={index} 
              className={`group p-12 rounded-3xl bg-gradient-to-br ${program.bgGradient} border ${program.borderColor} hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-[1.02] cursor-pointer transform opacity-0 translate-y-20 ${program.delay} relative overflow-hidden`}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon */}
              <div className={`w-20 h-20 bg-gradient-to-br ${program.gradient} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl shadow-orange-500/20 relative z-10`}>
                <program.icon className="w-10 h-10 text-white" />
              </div>
              
              {/* Content */}
              <div className="space-y-6 relative z-10">
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  {program.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-xl font-light">
                  {program.description}
                </p>

                <div className="text-sm font-semibold text-orange-600 bg-orange-100/50 px-4 py-2 rounded-full inline-block">
                  {program.stats}
                </div>
                
                {/* CTA */}
                <div className="flex items-center text-orange-600 group-hover:text-orange-700 transition-colors duration-200 pt-4">
                  <span className="text-lg font-semibold mr-3">Learn More</span>
                  <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-white/90 to-orange-50/80 backdrop-blur-sm border border-orange-200/50 max-w-4xl mx-auto shadow-xl shadow-orange-500/10">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Lives?
            </h3>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
              Every program starts with one passionate volunteer. Your journey of impact begins with a single step.
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
              className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 inline-flex items-center"
            >
              Join Our Programs
              <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;