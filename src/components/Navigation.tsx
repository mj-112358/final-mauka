import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navigateToPage = (page: string) => {
    if (page === '') {
      // Going to home page
      window.location.hash = '';
      window.location.reload();
    } else {
      // Going to other pages
      window.location.hash = page;
      window.location.reload();
    }
    setMobileMenuOpen(false);
  };

  const scrollToSectionFromAnyPage = (sectionId: string) => {
    // If we're on a different page, go to home first then scroll
    if (window.location.hash && window.location.hash !== '') {
      window.location.hash = '';
      window.location.reload();
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.offsetTop - offset;
          window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're already on home page, just scroll
      scrollToSection(sectionId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-orange-100/50 shadow-lg shadow-orange-500/5' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center group cursor-pointer" onClick={scrollToTop}>
            <div 
              className="w-16 h-16 mr-4 overflow-hidden rounded-full transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/20"
              onClick={() => navigateToPage('')}
            >
              <img 
                src="/op-image.jpg" 
                alt="Mauka Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span 
              className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300"
              onClick={() => navigateToPage('')}
            >
              Mauka
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigateToPage('')}
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-all duration-300 hover:scale-105"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSectionFromAnyPage('about')}
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-all duration-300 hover:scale-105"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSectionFromAnyPage('programs')}
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-all duration-300 hover:scale-105"
            >
              Programs
            </button>
            <button 
              onClick={() => scrollToSectionFromAnyPage('leaderboard')}
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-all duration-300 hover:scale-105"
            >
              Leaderboard
            </button>
            <button 
              onClick={() => scrollToSectionFromAnyPage('impact')}
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-all duration-300 hover:scale-105"
            >
              Impact
            </button>
            <button 
              onClick={() => scrollToSectionFromAnyPage('volunteer-matching')}
              className="text-sm font-medium text-violet-700 hover:text-violet-900 transition-all duration-300 hover:scale-105"
            >
              AI Matching
            </button>
            <button 
              onClick={() => navigateToPage('contact')}
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-all duration-300 hover:scale-105"
            >
              Contact
            </button>
            <button 
              onClick={() => navigateToPage('donate')}
              className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-medium px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 transform"
            >
              <span className="group-hover:scale-105 transition-transform duration-200 inline-block">
                Donate
              </span>
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-orange-50 rounded-lg transition-all duration-200"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-orange-100/50 shadow-lg">
            <div className="px-6 py-4 space-y-4">
              <button onClick={() => navigateToPage('')} className="block w-full text-left text-gray-700 hover:text-orange-600 transition-colors duration-200">Home</button>
              <button onClick={() => scrollToSectionFromAnyPage('about')} className="block w-full text-left text-gray-700 hover:text-orange-600 transition-colors duration-200">About</button>
              <button onClick={() => scrollToSectionFromAnyPage('programs')} className="block w-full text-left text-gray-700 hover:text-orange-600 transition-colors duration-200">Programs</button>
              <button onClick={() => scrollToSectionFromAnyPage('leaderboard')} className="block w-full text-left text-gray-700 hover:text-orange-600 transition-colors duration-200">Leaderboard</button>
              <button onClick={() => scrollToSectionFromAnyPage('impact')} className="block w-full text-left text-gray-700 hover:text-orange-600 transition-colors duration-200">Impact</button>
              <button onClick={() => scrollToSectionFromAnyPage('volunteer-matching')} className="block w-full text-left text-gray-700 hover:text-orange-600 transition-colors duration-200">AI Matching</button>
              <button onClick={() => navigateToPage('contact')} className="block w-full text-left text-gray-700 hover:text-orange-600 transition-colors duration-200">Contact</button>
              <button onClick={() => navigateToPage('donate')} className="block w-full text-left bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg">Donate</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;