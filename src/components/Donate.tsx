import React from 'react';
import { Heart, Laptop, Book, Palette, Calculator, Music, ArrowRight } from 'lucide-react';

const Donate: React.FC = () => {
  const donationItems = [
    {
      icon: Laptop,
      title: 'Laptop for Coding Enthusiast',
      description: 'Enable a young programmer to build their first app and explore the world of technology.',
      amount: '₹25,000',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Book,
      title: 'Set of Educational Books',
      description: 'Provide a complete library of books for eager readers and learners.',
      amount: '₹2,500',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Palette,
      title: 'Art Supplies Kit',
      description: 'Give a creative child the tools to express themselves through art and design.',
      amount: '₹1,500',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Calculator,
      title: 'Arduino Set for Young Engineer',
      description: 'Spark innovation in a budding engineer with hands-on electronics learning.',
      amount: '₹3,500',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: Book,
      title: 'Set of Pencils & Stationery',
      description: 'Basic learning supplies for children who dream of education.',
      amount: '₹500',
      gradient: 'from-teal-500 to-cyan-600'
    }
  ];

  const bankDetails = {
    accountName: 'Mauka Foundation',
    accountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    bankName: 'State Bank of India',
    branch: 'JPIS Branch'
  };

  return (
    <section id="donate" className="py-32 bg-gradient-to-b from-orange-25 to-orange-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-orange-200/30 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-orange-300/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
            <Heart className="w-4 h-4 mr-2" />
            Make a Difference
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Support a Dream
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your donation directly translates into opportunity. Choose what resonates with you and help a child pursue their passion.
          </p>
        </div>

        {/* Donation Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {donationItems.map((item, index) => (
            <div key={index} className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 transform">
              <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between pt-4">
                  <span className="text-2xl font-bold text-orange-600">{item.amount}</span>
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105">
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bank Details Section */}
        <div className="max-w-4xl mx-auto">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-white/90 to-orange-50/80 backdrop-blur-sm border border-orange-200/50">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Bank Account Details
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="p-4 bg-white/60 rounded-2xl border border-orange-100/50">
                  <label className="text-sm font-medium text-gray-600">Account Name</label>
                  <p className="text-lg font-semibold text-gray-900">{bankDetails.accountName}</p>
                </div>
                
                <div className="p-4 bg-white/60 rounded-2xl border border-orange-100/50">
                  <label className="text-sm font-medium text-gray-600">Account Number</label>
                  <p className="text-lg font-semibold text-gray-900 font-mono">{bankDetails.accountNumber}</p>
                </div>
                
                <div className="p-4 bg-white/60 rounded-2xl border border-orange-100/50">
                  <label className="text-sm font-medium text-gray-600">IFSC Code</label>
                  <p className="text-lg font-semibold text-gray-900 font-mono">{bankDetails.ifscCode}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/60 rounded-2xl border border-orange-100/50">
                  <label className="text-sm font-medium text-gray-600">Bank Name</label>
                  <p className="text-lg font-semibold text-gray-900">{bankDetails.bankName}</p>
                </div>
                
                <div className="p-4 bg-white/60 rounded-2xl border border-orange-100/50">
                  <label className="text-sm font-medium text-gray-600">Branch</label>
                  <p className="text-lg font-semibold text-gray-900">{bankDetails.branch}</p>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white text-center">
                  <p className="text-sm mb-2">After donating, please email us at:</p>
                  <a href="mailto:mgupta1@jpischool.com" className="font-semibold underline">
                    mgupta1@jpischool.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-6">
                Every donation, no matter the size, creates a ripple of change. Thank you for believing in the power of opportunity.
              </p>
              <button className="inline-flex items-center text-orange-600 hover:text-orange-700 font-bold text-lg transition-all duration-300 hover:scale-105">
                Contact Us for More Information
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;