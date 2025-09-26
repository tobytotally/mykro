import React from 'react';
import { motion } from 'framer-motion';
import { useDocumentTitle } from './shared/hooks/useDocumentTitle';

export function AboutPage() {
  useDocumentTitle('About');
  
  const values = [
    {
      title: 'Purpose-Driven',
      description: 'Every feature we build starts with the question: How does this create more impact?',
      icon: '💜'
    },
    {
      title: 'Transparent',
      description: 'Complete visibility into donation flows, from transaction to impact.',
      icon: '🔍'
    },
    {
      title: 'Innovative',
      description: 'Leveraging cutting-edge technology to maximize charitable giving.',
      icon: '🚀'
    },
    {
      title: 'Inclusive',
      description: 'Making philanthropy accessible to everyone, regardless of contribution size.',
      icon: '🤝'
    }
  ];

  const team = [
    { name: 'Sarah Chen', role: 'CEO & Co-founder', bio: 'Former fintech executive passionate about social impact' },
    { name: 'Marcus Johnson', role: 'CTO & Co-founder', bio: 'Engineering leader with 15 years in payment systems' },
    { name: 'Elena Rodriguez', role: 'Head of Partnerships', bio: 'Nonprofit veteran connecting causes with technology' },
    { name: 'David Kim', role: 'Head of Product', bio: 'Product innovator focused on user-centric design' }
  ];

  const milestones = [
    { year: '2021', event: 'Founded with a vision to transform transactions into impact' },
    { year: '2022', event: 'Launched platform with 10 charity partners' },
    { year: '2023', event: 'Reached $1M in donations and 50K active users' },
    { year: '2024', event: 'Expanded to 150+ charities and multiple industries' }
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
              About <span className="text-purple-500">Mykro</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 font-light max-w-3xl mx-auto">
              We believe every transaction has the power to create positive change. 
              Our mission is to make charitable giving seamless, transparent, and impactful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-display text-3xl lg:text-4xl font-light mb-8">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              To revolutionize how businesses and consumers engage with charitable giving by 
              seamlessly integrating donations into everyday transactions. We envision a world 
              where every payment creates positive impact, making philanthropy a natural part 
              of commerce rather than an afterthought.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-4">
              Our values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-4">
              Our journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              Building the future of purpose-driven payments
            </p>
          </div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="text-3xl font-light text-purple-600 dark:text-purple-400">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300">
                    {milestone.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-4">
              Leadership team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              Passionate about payments with purpose
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full" />
                <h3 className="text-lg font-medium mb-1">{member.name}</h3>
                <p className="text-sm text-purple-600 dark:text-purple-400 mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 dark:bg-purple-700">
        <div className="max-w-4xl mx-auto px-8 text-center text-white">
          <h2 className="font-display text-3xl lg:text-5xl font-light mb-6">
            Join our mission
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Help us build a world where every transaction creates positive impact.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="/careers" 
              className="px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 transition-colors font-medium"
            >
              View Careers
            </a>
            <a 
              href="/contact" 
              className="px-8 py-4 border border-white/50 hover:bg-white/10 transition-colors font-medium"
            >
              Get in Touch
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