import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBagIcon, 
  BuildingOfficeIcon, 
  HeartIcon, 
  AcademicCapIcon,
  TrophyIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  ShoppingCartIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { useDocumentTitle } from './shared/hooks/useDocumentTitle';

export function IndustriesPage() {
  useDocumentTitle('Industries');
  
  const industries = [
    {
      name: 'Gaming',
      icon: TrophyIcon,
      description: 'Turn player engagement into social impact',
      keyFeature: 'Real-time donation tracking',
      metric: '€2.3M donated'
    },
    {
      name: 'E-commerce',
      icon: ShoppingCartIcon,
      description: 'Add purpose to every purchase',
      keyFeature: 'Checkout integration',
      metric: '1M+ transactions'
    },
    {
      name: 'Finance',
      icon: CurrencyDollarIcon,
      description: 'Banking with built-in giving',
      keyFeature: 'Micro-donations',
      metric: '0.5% per transaction'
    },
    {
      name: 'Telecom',
      icon: DevicePhoneMobileIcon,
      description: 'Bills that build communities',
      keyFeature: 'Monthly giving',
      metric: '50K subscribers'
    },
    {
      name: 'Travel',
      icon: GlobeAltIcon,
      description: 'Journeys that give back',
      keyFeature: 'Booking donations',
      metric: '€500K raised'
    },
    {
      name: 'Healthcare',
      icon: HeartIcon,
      description: 'Wellness meets philanthropy',
      keyFeature: 'Health rewards',
      metric: '200+ partners'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 dark:from-purple-600/10 dark:to-blue-600/10" />
        
        <div className="relative max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-5xl lg:text-7xl font-light leading-tight mb-6">
              Purpose-driven payments for <span className="text-purple-500">every industry</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto">
              Our platform seamlessly integrates charitable giving into any transaction flow, 
              helping businesses across all sectors create meaningful impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <industry.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-medium mb-2">{industry.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {industry.description}
                  </p>
                  
                  {/* Key feature */}
                  <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400 mb-4">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>{industry.keyFeature}</span>
                  </div>
                  
                  {/* Metric */}
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-2xl font-light text-gray-900 dark:text-white">
                      {industry.metric}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="font-display text-3xl lg:text-5xl font-light mb-6">
            Ready to add purpose to your platform?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Join leading companies transforming transactions into positive impact.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="mailto:partnerships@mykro.com" 
              className="px-8 py-4 bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              Get Started
            </a>
            <a 
              href="#" 
              className="px-8 py-4 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              View Documentation
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