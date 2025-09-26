import React from 'react';
import { motion } from 'framer-motion';
import { useDocumentTitle } from './shared/hooks/useDocumentTitle';

export function ImpactPage() {
  useDocumentTitle('Impact');
  
  const stories = [
    {
      category: 'Healthcare',
      charity: 'Doctors Without Borders',
      excerpt: 'Player contributions funded mobile clinics reaching 5,000 patients in remote areas this quarter.',
      raised: '$125K',
      goal: '89%',
      image: '/knowledge/images/website/pexels-julia-m-cameron-6995106.jpg',
      impact: '5,000 patients treated',
      location: 'Sub-Saharan Africa'
    },
    {
      category: 'Education',
      charity: 'Room to Read',
      excerpt: 'Your contributions helped establish 3 new libraries, providing books to 1,200 children in underserved communities.',
      raised: '$98K',
      goal: '72%',
      image: '/knowledge/images/website/pexels-ahmed-akacha-3313934-12102732.jpg',
      impact: '1,200 children reached',
      location: 'Southeast Asia'
    },
    {
      category: 'Environment',
      charity: 'Ocean Conservancy',
      excerpt: 'Together we\'ve removed 50,000 pounds of plastic from oceans and protected critical marine habitats.',
      raised: '$142K',
      goal: '95%',
      image: '/knowledge/images/website/pexels-b-aristotle-guweh-jr-1643208950-32230250.jpg',
      impact: '50,000 lbs plastic removed',
      location: 'Pacific Ocean'
    },
    {
      category: 'Animal Welfare',
      charity: 'Wildlife Conservation Society',
      excerpt: 'Protected 100,000 acres of critical habitat and supported anti-poaching efforts across three continents.',
      raised: '$87K',
      goal: '68%',
      image: '/knowledge/images/website/pexels-julia-m-cameron-6995106.jpg',
      impact: '100,000 acres protected',
      location: 'Global'
    },
    {
      category: 'Hunger Relief',
      charity: 'World Food Programme',
      excerpt: 'Provided 250,000 meals to families facing food insecurity in conflict-affected regions.',
      raised: '$156K',
      goal: '91%',
      image: '/knowledge/images/website/pexels-ahmed-akacha-3313934-12102732.jpg',
      impact: '250,000 meals provided',
      location: 'Middle East'
    },
    {
      category: 'Disaster Relief',
      charity: 'Red Cross',
      excerpt: 'Rapid response teams assisted 10,000 people affected by natural disasters with emergency supplies.',
      raised: '$203K',
      goal: '97%',
      image: '/knowledge/images/website/pexels-b-aristotle-guweh-jr-1643208950-32230250.jpg',
      impact: '10,000 people assisted',
      location: 'Various'
    }
  ];

  const stats = [
    { value: '$2.5M', label: 'Total donated', trend: '+23%' },
    { value: '150+', label: 'Partner charities', trend: '+15' },
    { value: '50K', label: 'Active contributors', trend: '+18%' },
    { value: '85%', label: 'Funds to cause', trend: 'Industry leading' }
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
              Real impact, <span className="text-purple-500">real change</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 font-light max-w-3xl mx-auto">
              Every transaction on our platform creates tangible impact. 
              See how your contributions are changing lives around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl lg:text-4xl font-light mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  {stat.trend}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories Grid */}
      <section className="py-20 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-4">
              Stories of change
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              Real impact from real people making a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <motion.div
                key={index}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={`${story.charity} impact`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-5 left-5 bg-white dark:bg-gray-900 px-3 py-1 text-xs font-medium uppercase tracking-wider">
                    {story.category}
                  </span>
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-sm font-medium mb-1">{story.location}</p>
                    <p className="text-2xl font-light">{story.impact}</p>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-medium mb-3">{story.charity}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="text-2xl font-light text-purple-600 dark:text-purple-400">{story.raised}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">raised this quarter</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium">{story.goal}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">to goal</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 dark:bg-purple-700">
        <div className="max-w-4xl mx-auto px-8 text-center text-white">
          <h2 className="font-display text-3xl lg:text-5xl font-light mb-6">
            Be part of the change
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands making a difference with every transaction.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="/donor" 
              className="px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 transition-colors font-medium"
            >
              Choose Your Cause
            </a>
            <a 
              href="/industries" 
              className="px-8 py-4 border border-white/50 hover:bg-white/10 transition-colors font-medium"
            >
              Partner With Us
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