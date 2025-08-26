import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is Mauka?',
      answer: 'Mauka is a student-led initiative born at JPIS that connects volunteers with NGOs across India. With over 3,000 volunteers, 7,200 service hours, and 78 partner NGOs, Mauka empowers students to create real social impact through teaching, skill-sharing, and community service.'
    },
    {
      question: 'Who can volunteer with Mauka?',
      answer: 'Mauka is open to students of all schools and universities, both in India and abroad. Whether you want to teach, mentor, or simply give time to a cause you believe in — Mauka gives you the platform to contribute meaningfully.'
    },
    {
      question: 'Do I need prior experience to volunteer?',
      answer: 'Not at all. Mauka is built on the belief that every student has something to offer. From art to coding, dance to debating, or simply spending time with children in need — there\'s always a way to give back.'
    },
    {
      question: 'What makes Mauka different from other volunteer platforms?',
      answer: 'Unlike generic portals, Mauka is youth-driven. It was built by students, for students. We focus on service + skill, ensuring that every hour logged contributes to both personal growth and social impact. NGOs trust us because we deliver consistent, passionate volunteers.'
    },
    {
      question: 'How do I log my service hours?',
      answer: 'Once you sign up, Mauka provides a dashboard where your volunteering hours are tracked, verified, and certified by the NGOs you work with. These certifications can be used for school CAS requirements, university applications, or simply to reflect your impact journey.'
    },
    {
      question: 'Can NGOs partner with Mauka?',
      answer: 'Yes! NGOs can join our network to access a pool of talented, motivated young volunteers across India. Fill out the NGO registration form on our website, and our team will connect with you to onboard your organisation.'
    },
    {
      question: 'Is Mauka free?',
      answer: 'Absolutely. Mauka is a non-profit platform. Students volunteer without charge, and NGOs receive support without a fee. We only request donations from those who want to support our growth and empower more children.'
    },
    {
      question: 'How can I support Mauka beyond volunteering?',
      answer: 'You can support Mauka by donating resources that enable underprivileged children to pursue their passions — laptops for coding enthusiasts, arduino sets for young engineers, or books for eager readers. Every donation translates directly into opportunity.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 bg-gradient-to-b from-orange-25 to-orange-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-orange-200/30 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-orange-300/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Got Questions?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to the most common questions about Mauka and how you can get involved
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="group">
              <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300 pr-4">
                    Q{index + 1}. {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-6 h-6 text-orange-600 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-orange-600 transition-all duration-300" />
                    )}
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
                }`}>
                  <div className="border-t border-orange-100/50 pt-6">
                    <p className="text-gray-600 leading-relaxed text-lg">
                      <strong className="text-orange-600">A:</strong> {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        
      </div>
    </section>
  );
};

export default FAQ;