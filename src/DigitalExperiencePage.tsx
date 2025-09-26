import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRightIcon,
  ChartBarIcon,
  HeartIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { UKOperatorLogos } from './components/UKOperatorLogos';
import { useDocumentTitle } from './shared/hooks/useDocumentTitle';

export function DigitalExperiencePage() {
  useDocumentTitle('Digital Experience');
  
  const impactStats = [
    { value: '$2.5M', label: 'Total donated' },
    { value: '50K+', label: 'Active players' },
    { value: '150', label: 'Partner charities' }
  ];

  const stories = [
    {
      category: 'Healthcare',
      charity: 'Doctors Without Borders',
      excerpt: 'Player contributions funded mobile clinics reaching 5,000 patients in remote areas this quarter.',
      raised: '$125K',
      goal: '89%',
      image: '/knowledge/images/website/pexels-julia-m-cameron-6995106.jpg'
    },
    {
      category: 'Education',
      charity: 'Room to Read',
      excerpt: 'Your contributions helped establish 3 new libraries, providing books to 1,200 children in underserved communities.',
      raised: '$98K',
      goal: '72%',
      image: '/knowledge/images/website/pexels-ahmed-akacha-3313934-12102732.jpg'
    },
    {
      category: 'Environment',
      charity: 'Ocean Conservancy',
      excerpt: 'Together we\'ve removed 50,000 pounds of plastic from oceans and protected critical marine habitats.',
      raised: '$142K',
      goal: '95%',
      image: '/knowledge/images/website/pexels-b-aristotle-guweh-jr-1643208950-32230250.jpg'
    }
  ];

  const apps = [
    {
      id: 'betco',
      title: 'BETCO Sports',
      description: 'Experience transactions with purpose',
      icon: CurrencyDollarIcon,
      href: '/betco',
    },
    {
      id: 'donor',
      title: 'Donor Portal',
      description: 'Track your charitable impact',
      icon: HeartIcon,
      href: '/donor',
    },
    {
      id: 'operator-admin',
      title: 'Admin Dashboard',
      description: 'Manage platform operations',
      icon: ChartBarIcon,
      href: '/operator-admin',
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gray-900 dark:bg-black">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24 lg:py-32 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl lg:text-7xl xl:text-8xl font-light leading-none tracking-tight mb-8 text-white">
              Payments with<br /><span className="text-purple-500">purpose</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 font-light max-w-2xl mb-12">
              Transform every transaction into meaningful impact. 
              Your platform donates to your chosen charity with each payment.
            </p>
            <div className="flex gap-4">
              <Link 
                to="/donor" 
                className="px-8 py-4 text-sm font-medium bg-white text-gray-900 hover:bg-gray-100 transition-all hover:scale-105"
              >
                Choose your charity
              </Link>
              <a 
                href="#how" 
                className="px-8 py-4 text-sm font-medium border border-gray-600 text-white hover:bg-gray-800 transition-all hover:scale-105"
              >
                See how it works
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Bar */}
      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 text-center">
          {impactStats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </section>

      {/* Campaign Banner */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <motion.div 
          className="bg-gray-900 dark:bg-black text-white p-12 lg:p-20 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative z-10 max-w-4xl">
            <h2 className="font-display text-4xl lg:text-6xl font-light leading-tight mb-6">
              Every payment creates <span className="text-purple-500">impact.</span>
            </h2>
            <p className="text-lg font-light opacity-80 mb-8 max-w-2xl">
              Join 50,000 users transforming transactions into giving. Your platform donates with every payment.
            </p>
            <Link 
              to="/donor" 
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 text-sm font-medium hover:bg-gray-100 transition-all hover:translate-x-1"
            >
              SELECT YOUR CAUSE
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
            <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
              <circle cx="250" cy="250" r="100" stroke="white" strokeWidth="1"/>
              <circle cx="250" cy="250" r="150" stroke="white" strokeWidth="1"/>
              <circle cx="250" cy="250" r="200" stroke="white" strokeWidth="1"/>
              <circle cx="250" cy="250" r="250" stroke="white" strokeWidth="1"/>
            </svg>
          </div>
        </motion.div>
        </div>
      </section>

      {/* Impact Stories */}
      <section id="impact" className="py-24">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-4">
            Impact stories
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
            Real change, powered by your play
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              className="group border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={story.image} 
                  alt={`${story.charity} impact`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-5 left-5 bg-white dark:bg-gray-900 px-3 py-1 text-xs font-medium uppercase tracking-wider">
                  {story.category}
                </span>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium mb-3">{story.charity}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {story.excerpt}
                </p>
                <div className="flex gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <div className="text-sm">
                    <span className="font-semibold">{story.raised}</span>
                    <span className="text-gray-500 dark:text-gray-500"> raised</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">{story.goal}</span>
                    <span className="text-gray-500 dark:text-gray-500"> to goal</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-gray-900 dark:bg-black text-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-4">
              Built for the future
            </h2>
            <p className="text-lg text-gray-400 font-light">
              Modern technology powering charitable gaming
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="group border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer bg-gray-800/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-8">
                <div className="w-12 h-12 mb-6 text-purple-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Real-time Processing</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Lightning-fast payment processing with instant charity allocation. Every transaction triggers immediate donation calculations.
                </p>
                <div className="text-xs text-purple-400 font-mono">
                  &lt;100ms latency • 99.9% uptime
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer bg-gray-800/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="p-8">
                <div className="w-12 h-12 mb-6 text-purple-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Bank-grade Security</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  End-to-end encryption and PCI-compliant infrastructure protect every transaction and donation.
                </p>
                <div className="text-xs text-purple-400 font-mono">
                  256-bit SSL • SOC2 certified
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer bg-gray-800/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-8">
                <div className="w-12 h-12 mb-6 text-purple-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Transparent Analytics</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Real-time dashboards track every donation, impact metric, and charitable contribution with full transparency.
                </p>
                <div className="text-xs text-purple-400 font-mono">
                  Live data • Open API • Audit trails
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-sm text-gray-500 mb-4">Powered by</p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <span className="text-sm font-mono">React</span>
              <span className="text-sm font-mono">TypeScript</span>
              <span className="text-sm font-mono">Cloud Infrastructure</span>
              <span className="text-sm font-mono">Blockchain</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* UK Operators Section */}
      <UKOperatorLogos 
        title="Trusted by Leading UK Operators"
        subtitle="The biggest names in UK online betting are partnering with Mykro"
        variant="grid"
        showLinks={false}
      />

      {/* Apps Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-4">
            Choose your experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
            Access the platform that fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link 
                to={app.href} 
                className="block group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <app.icon className="w-12 h-12 mb-6 text-purple-500" />
                <h3 className="text-xl font-medium mb-3">{app.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {app.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-purple-500 group-hover:translate-x-1 transition-transform">
                  Get started
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
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
                {/* Bottom left square */}
                <rect x="4" y="16" width="16" height="16" fill="currentColor" opacity="0.8"/>
                
                {/* Top right square with purple fill where it overlaps */}
                <rect x="16" y="4" width="16" height="16" fill="currentColor" opacity="0.8"/>
                
                {/* Purple overlap area */}
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