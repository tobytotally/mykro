import React from 'react';
import { motion } from 'framer-motion';

export function TechnologyPage() {
  const techStack = [
    {
      category: 'Frontend',
      technologies: [
        { name: 'React 18', description: 'Modern UI framework' },
        { name: 'TypeScript', description: 'Type-safe development' },
        { name: 'Tailwind CSS', description: 'Utility-first styling' },
        { name: 'Framer Motion', description: 'Smooth animations' }
      ]
    },
    {
      category: 'Backend',
      technologies: [
        { name: 'Node.js', description: 'Scalable runtime' },
        { name: 'PostgreSQL', description: 'Reliable database' },
        { name: 'Redis', description: 'High-speed caching' },
        { name: 'GraphQL', description: 'Flexible API layer' }
      ]
    },
    {
      category: 'Infrastructure',
      technologies: [
        { name: 'AWS', description: 'Cloud platform' },
        { name: 'Kubernetes', description: 'Container orchestration' },
        { name: 'CloudFlare', description: 'CDN & security' },
        { name: 'DataDog', description: 'Monitoring & analytics' }
      ]
    },
    {
      category: 'Security',
      technologies: [
        { name: 'OAuth 2.0', description: 'Secure authentication' },
        { name: 'PCI DSS', description: 'Payment compliance' },
        { name: 'AES-256', description: 'Data encryption' },
        { name: 'SOC2', description: 'Security certification' }
      ]
    }
  ];

  const features = [
    {
      title: 'Real-time Processing',
      description: 'Sub-100ms transaction processing with instant donation calculations',
      icon: '⚡',
      stats: ['<100ms latency', '99.99% uptime', '10M+ transactions/day']
    },
    {
      title: 'Smart Routing',
      description: 'Intelligent donation distribution based on user preferences and charity needs',
      icon: '🧠',
      stats: ['ML-powered matching', 'Dynamic allocation', 'Impact optimization']
    },
    {
      title: 'Blockchain Integration',
      description: 'Transparent, immutable donation tracking on distributed ledger',
      icon: '🔗',
      stats: ['Full transparency', 'Audit trail', 'Smart contracts']
    },
    {
      title: 'API-First Design',
      description: 'Comprehensive APIs for seamless integration with any platform',
      icon: '🔌',
      stats: ['RESTful & GraphQL', 'Webhooks', 'Real-time events']
    }
  ];

  const integrations = [
    { name: 'Stripe', type: 'Payments' },
    { name: 'Plaid', type: 'Banking' },
    { name: 'Twilio', type: 'Communications' },
    { name: 'Salesforce', type: 'CRM' },
    { name: 'QuickBooks', type: 'Accounting' },
    { name: 'Slack', type: 'Notifications' }
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
              Built for <span className="text-purple-500">scale</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 font-light max-w-3xl mx-auto">
              Enterprise-grade technology powering millions of charitable transactions 
              with speed, security, and reliability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-4">
              Core capabilities
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              Advanced technology delivering exceptional performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-6">
                  <div className="text-4xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {feature.stats.map((stat) => (
                        <span key={stat} className="text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-4">
              Technology stack
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              Best-in-class tools for reliability and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((stack, index) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-medium mb-4 text-purple-600 dark:text-purple-400">
                  {stack.category}
                </h3>
                <div className="space-y-3">
                  {stack.technologies.map((tech) => (
                    <div key={tech.name} className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
                      <p className="font-medium text-sm">{tech.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="bg-gray-900 dark:bg-black text-white p-12 lg:p-16">
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl lg:text-4xl font-light mb-6">
                Developer-friendly APIs
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Integrate charitable giving into your platform with our comprehensive APIs. 
                Simple integration, powerful features, complete documentation.
              </p>
              
              <div className="bg-gray-800 p-6 rounded-lg font-mono text-sm mb-8">
                <div className="text-purple-400">// Create a donation with every transaction</div>
                <div className="text-gray-300">
                  <span className="text-blue-400">const</span> donation = <span className="text-blue-400">await</span> mykro.<span className="text-yellow-400">createDonation</span>({`{`}
                </div>
                <div className="text-gray-300 ml-4">
                  <span className="text-green-400">amount</span>: transaction.amount * <span className="text-purple-400">0.01</span>,
                </div>
                <div className="text-gray-300 ml-4">
                  <span className="text-green-400">charityId</span>: user.selectedCharity,
                </div>
                <div className="text-gray-300 ml-4">
                  <span className="text-green-400">transactionId</span>: transaction.id
                </div>
                <div className="text-gray-300">{`}`});</div>
              </div>

              <div className="flex gap-4">
                <a href="#" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 transition-colors">
                  View Documentation
                </a>
                <a href="#" className="px-6 py-3 border border-gray-600 hover:bg-gray-800 transition-colors">
                  API Reference
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-4">
              Seamless integrations
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              Connect with your existing tools and platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-700 text-center hover:border-purple-500 dark:hover:border-purple-400 transition-colors cursor-pointer"
              >
                <h3 className="font-medium text-sm mb-1">{integration.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{integration.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 dark:bg-purple-700">
        <div className="max-w-4xl mx-auto px-8 text-center text-white">
          <h2 className="font-display text-3xl lg:text-5xl font-light mb-6">
            Ready to integrate?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Start building purpose-driven features today.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="#" 
              className="px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 transition-colors font-medium"
            >
              Get API Access
            </a>
            <a 
              href="#" 
              className="px-8 py-4 border border-white/50 hover:bg-white/10 transition-colors font-medium"
            >
              Schedule Demo
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