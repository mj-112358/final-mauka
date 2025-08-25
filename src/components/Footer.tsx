import React from 'react';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-orange-25 to-orange-50 border-t border-orange-200/50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6 group">
              <div className="w-20 h-20 mr-4 overflow-hidden rounded-full transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-orange-500/20">
                <img 
                  src="/op-image.jpg" 
                  alt="Mauka Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-md mb-8 text-lg">
              Creating access, impact and equity—one opportunity at a time. 
              Empowering youth to reach their full potential through education, 
              mentorship, and community support.
            </p>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Support</h4>
            <ul className="space-y-4">
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); window.location.hash = 'faq'; window.location.reload(); }} className="text-gray-600 hover:text-orange-600 transition-all duration-300 hover:translate-x-1 inline-block">FAQ</a></li>
              <li><a href="#donate" onClick={(e) => { e.preventDefault(); window.location.hash = 'donate'; window.location.reload(); }} className="text-gray-600 hover:text-orange-600 transition-all duration-300 hover:translate-x-1 inline-block">Donate</a></li>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); window.location.hash = 'privacy'; window.location.reload(); }} className="text-gray-600 hover:text-orange-600 transition-all duration-300 hover:translate-x-1 inline-block">Privacy</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); window.location.hash = 'terms'; window.location.reload(); }} className="text-gray-600 hover:text-orange-600 transition-all duration-300 hover:translate-x-1 inline-block">Terms</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-orange-100/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0 flex items-center">
            © 2025 Mauka. All rights reserved.
          </p>
          <p className="text-gray-500 flex items-center">
            Built with <Heart className="w-4 h-4 mx-2 text-orange-500 animate-pulse" /> and passion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;