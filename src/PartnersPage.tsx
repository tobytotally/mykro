import React from 'react';
import { motion } from 'framer-motion';

export function PartnersPage() {
  const charities = [
    { name: 'Doctors Without Borders', logo: '🏥', category: 'Healthcare', raised: '$1.2M' },
    { name: 'Room to Read', logo: '📚', category: 'Education', raised: '$890K' },
    { name: 'Ocean Conservancy', logo: '🌊', category: 'Environment', raised: '$756K' },
    { name: 'Wildlife Conservation Society', logo: '🦁', category: 'Wildlife', raised: '$623K' },
    { name: 'World Food Programme', logo: '🌾', category: 'Hunger Relief', raised: '$1.1M' },
    { name: 'Red Cross', logo: '❤️', category: 'Disaster Relief', raised: '$980K' },
    { name: 'UNICEF', logo: '🧸', category: 'Children', raised: '$845K' },
    { name: 'Habitat for Humanity', logo: '🏠', category: 'Housing', raised: '$567K' }
  ];

  const operators = [
    { name: 'BetMGM', type: 'Sports Betting', transactions: '2.3M/month' },
    { name: 'DraftKings', type: 'Daily Fantasy', transactions: '1.8M/month' },
    { name: 'FanDuel', type: 'Sports & Casino', transactions: '2.1M/month' },
    { name: 'Caesars', type: 'Online Casino', transactions: '950K/month' }
  ];

  const benefits = [
    {
      title: 'For Charities',
      items: [
        'Sustainable funding stream',
        'Zero platform fees',
        'Real-time donation tracking',
        'Direct bank transfers',
        'Monthly detailed reports',
        'Marketing support'
      ]
    },
    {
      title: 'For Operators',
      items: [
        'Enhanced player loyalty',
        'Positive brand association',
        'Regulatory compliance tools',
        'Turnkey integration',
        'Customer insights',
        'CSR reporting'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gray-900 dark:bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20" />
        
        <div className="relative max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-5xl lg:text-7xl font-light leading-tight mb-6 text-white">
              Partners in <span className="text-purple-500">purpose</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 font-light max-w-3xl mx-auto">
              We work with leading charities and forward-thinking operators 
              to create meaningful impact through every transaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-4">
              Partnership benefits
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              Creating value for all stakeholders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-900 p-8 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-2xl font-medium mb-6">{benefit.title}</h3>
                <div className="grid grid-cols-1 gap-4">
                  {benefit.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charity Partners */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-4">
              Charity partners
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              150+ verified charities across all causes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {charities.map((charity, index) => (
              <motion.div
                key={charity.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-colors text-center group cursor-pointer"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {charity.logo}
                </div>
                <h3 className="font-medium text-sm mb-1">{charity.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{charity.category}</p>
                <p className="text-lg font-light text-purple-600 dark:text-purple-400">{charity.raised}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a href="#" className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline">
              View all charity partners
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Operator Partners */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-4">
              Operator partners
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              Industry leaders choosing purpose-driven payments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {operators.map((operator, index) => (
              <motion.div
                key={operator.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-medium mb-2">{operator.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{operator.type}</p>
                <p className="text-2xl font-light text-purple-600 dark:text-purple-400">{operator.transactions}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 dark:bg-purple-700">
        <div className="max-w-4xl mx-auto px-8 text-center text-white">
          <h2 className="font-display text-3xl lg:text-5xl font-light mb-6">
            Ready to partner with us?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join the movement towards purpose-driven business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:charities@mykro.com" 
              className="px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 transition-colors font-medium"
            >
              Charity Partnerships
            </a>
            <a 
              href="mailto:operators@mykro.com" 
              className="px-8 py-4 border border-white/50 hover:bg-white/10 transition-colors font-medium"
            >
              Operator Partnerships
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="16" width="16" height="16" fill="currentColor" opacity="0.8"/>
                  <rect x="16" y="4" width="16" height="16" fill="currentColor" opacity="0.8"/>
                  <rect x="16" y="16" width="4" height="4" fill="#7C4DFF"/>
                </svg>
              </div>
              <span className="font-display text-xl font-medium tracking-tight">mykro</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 Mykro. Payments with purpose.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}