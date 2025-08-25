import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <section id="privacy" className="py-32 bg-gradient-to-b from-orange-25 to-orange-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-orange-200/30 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-orange-300/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Privacy Policy
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Privacy Policy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50">
            <div className="flex items-center mb-6">
              <Eye className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Information We Collect</h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>We collect information you provide directly to us, such as:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name and contact information when you register as a volunteer or NGO</li>
                <li>Skills, interests, and availability for volunteer matching</li>
                <li>Communication preferences and feedback</li>
                <li>Service hours and volunteer activities for certification</li>
              </ul>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50">
            <div className="flex items-center mb-6">
              <Lock className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">How We Use Your Information</h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Match volunteers with suitable NGO opportunities</li>
                <li>Provide service hour tracking and certification</li>
                <li>Communicate about volunteer opportunities and updates</li>
                <li>Improve our platform and services</li>
                <li>Ensure the safety and security of our community</li>
              </ul>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Information Sharing</h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Partner NGOs when you volunteer with them</li>
                <li>Other volunteers for collaborative projects (with your consent)</li>
                <li>Service providers who help us operate our platform</li>
                <li>Legal authorities when required by law</li>
              </ul>
              <p className="font-semibold text-gray-900">We never sell your personal information to third parties.</p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Your Rights</h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Opt out of non-essential communications</li>
                <li>Request a copy of your data</li>
                <li>Report privacy concerns to our team</li>
              </ul>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h3>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:mgupta1@jpischool.com" className="text-orange-600 hover:text-orange-700 font-semibold">
                mgupta1@jpischool.com
              </a>
            </p>
            <p className="text-gray-500 text-sm mt-4">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;