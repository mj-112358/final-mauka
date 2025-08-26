import React from 'react';
import { Mail, User, Briefcase } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

const Contact: React.FC = () => {
  const teamMembers = [
    {
      name: 'Aadarsh Tripathy',
      role: 'President',
      email: 'atripathy@jpischool.com',
      grade: '12F',
      photo: '/images/team/aadarsh pic.png'
    },
    {
      name: 'Arsh Choudhary',
      role: 'President',
      email: 'arshchoudhary009@gmail.com',
      photo: '/images/team/arsh pic .jpeg'
    },
    {
      name: 'Siddharth Sharma',
      role: 'Head of Operations',
      email: 'ssharma28@jpischool.com',
      photo: '/images/team/siddharth pic.jpeg'
    },
    {
      name: 'Yashvi Singh',
      role: 'Head of Operations',
      email: 'ysingh4@jpischool.com',
      photo: '/images/team/yashvi pic .jpeg'
    },
    {
      name: 'Mrityunjay Gupta',
      role: 'Head of Technology',
      email: 'mgupta1@jpischool.com',
      photo: '/images/team/mj pic.jpeg'
    },
    {
      name: 'Aarush Gupta',
      role: 'Head of Finance',
      email: 'agupta41@jpischool.com',
      photo: '/images/team/aarush pic.jpeg'
    },
    {
      name: 'Vivaan Patni',
      role: 'Head of Outreach',
      email: 'vpatni@jpischool.com',
      photo: '/images/team/vivaan pic .jpeg'
    },
    {
      name: 'Deeva Choudhary',
      role: 'Head of Outreach',
      email: 'dchoudhary2@jpischool.com',
      photo: '/images/team/deeva pic.jpeg'
    },
    {
      name: 'Aahvana Kapuria',
      role: 'Head of Outreach',
      email: 'akapuria@jpischool.com',
      photo: '/images/team/aahvana pic .jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <section id="contact" className="py-24 bg-gradient-to-b from-orange-25/30 via-white to-orange-50/40 relative overflow-hidden pt-32">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-orange-200/25 to-transparent rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-orange-300/15 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-100/80 to-amber-100/60 backdrop-blur-sm border border-orange-200/50 text-orange-700 text-sm font-semibold mb-8 shadow-lg shadow-orange-500/10">
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch
            </div>
            
            <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9]">
              Meet Our Team
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              Connect with the passionate leaders driving Mauka's mission across India
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-20">
            {teamMembers.map((member, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 transform">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <User className="w-8 h-8 text-white" />
                </div>
              <div key={index} className="group p-10 rounded-3xl bg-white/95 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 transform">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-orange-200 group-hover:border-orange-300 transition-all duration-300 shadow-lg shadow-orange-500/10 group-hover:scale-110">
                    <img 
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">{member.name}</h3>
                  
                  <div className="flex items-center justify-center text-orange-600 mb-4">
                    <Briefcase className="w-5 h-5 mr-3" />
                    <span className="text-base font-semibold">{member.role}</span>
                  </div>
                  
                  {member.grade && (
                    <p className="text-base text-gray-500 mb-4 font-medium">Grade: {member.grade}</p>
                  )}
                  
                  <a 
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center text-gray-600 hover:text-orange-600 transition-all duration-300 text-base font-medium hover:scale-105 bg-orange-50/50 hover:bg-orange-100/50 px-4 py-2 rounded-xl"
                  >
                    <Mail className="w-5 h-5 mr-3" />
                    {member.email}
                  </a>
                </div>
              </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <div className="p-12 rounded-3xl bg-gradient-to-br from-white/95 to-orange-50/80 backdrop-blur-sm border border-orange-200/50 max-w-5xl mx-auto shadow-xl shadow-orange-500/10">
              <h3 className="text-4xl font-bold text-gray-900 mb-8">
                Ready to Make a Difference?
              </h3>
              <p className="text-2xl text-gray-600 mb-10 leading-relaxed font-light">
                Whether you're a student looking to volunteer, an NGO seeking support, or someone who wants to contribute to our mission, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="#volunteer-matching"
                  onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.reload(); setTimeout(() => { const element = document.getElementById('volunteer-matching'); if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100); }}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30"
                >
                  Start Volunteering
                </a>
                <a 
                  href="#volunteer-matching"
                  onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.reload(); setTimeout(() => { const element = document.getElementById('volunteer-matching'); if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100); }}
                  className="bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Partner with Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;