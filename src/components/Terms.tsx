import React from 'react';
import { FileText, Users, AlertTriangle, Scale } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <section id="terms" className="py-32 bg-gradient-to-b from-orange-25 to-orange-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-orange-200/30 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-orange-300/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
            <Scale className="w-4 h-4 mr-2" />
            Terms of Service
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Terms of Service
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using the Mauka platform.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                By accessing and using the Mauka platform, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">User Responsibilities</h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>As a user of Mauka, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and truthful information in your profile</li>
                <li>Respect all volunteers, NGOs, and beneficiaries</li>
                <li>Complete committed volunteer hours and activities</li>
                <li>Follow safety guidelines and protocols</li>
                <li>Report any inappropriate behavior or safety concerns</li>
                <li>Use the platform only for its intended purpose of volunteering and social service</li>
              </ul>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Prohibited Activities</h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>You may not use Mauka to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Engage in any illegal or harmful activities</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Share false or misleading information</li>
                <li>Use the platform for commercial purposes without permission</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50">
            <div className="flex items-center mb-6">
              <Scale className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Liability and Disclaimers</h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                Mauka is a platform that connects volunteers with NGOs. We are not responsible for the actions of volunteers or NGOs, 
                and users participate in activities at their own risk. We encourage all users to exercise caution and good judgment.
              </p>
              <p>
                While we strive to verify our partner NGOs, users should conduct their own due diligence before participating in any activities.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Service Modifications</h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                Mauka reserves the right to modify or discontinue the service at any time, with or without notice. 
                We also reserve the right to refuse service to anyone for any reason at any time.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h3>
            <p className="text-gray-600">
              If you have any questions about these Terms of Service, please contact us at{' '}
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

export default Terms;