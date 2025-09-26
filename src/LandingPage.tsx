import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  HeartIcon, 
  CurrencyDollarIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export function LandingPage() {
  const apps = [
    {
      id: 'betco',
      title: 'BETCO Sports',
      description: 'Experience sports betting with purpose. Every winning bet contributes to charitable causes.',
      icon: CurrencyDollarIcon,
      href: '/betco',
      color: 'from-blue-500 to-blue-600',
      features: ['Live Sports Betting', 'Real-time Odds', 'Charitable Donations', 'Instant Payouts']
    },
    {
      id: 'donor',
      title: 'Donor Portal',
      description: 'Track your charitable impact, manage charity allocations, and see how your donations make a difference.',
      icon: HeartIcon,
      href: '/donor',
      color: 'from-green-500 to-green-600',
      features: ['Impact Tracking', 'Charity Management', 'Donation History', 'Impact Stories']
    },
    {
      id: 'operator-admin',
      title: 'Admin Dashboard',
      description: 'Comprehensive platform management for operators. Monitor donations, manage charities, and analyze performance.',
      icon: ChartBarIcon,
      href: '/operator-admin',
      color: 'from-purple-500 to-purple-600',
      features: ['Platform Analytics', 'Charity Management', 'Donation Processing', 'User Management']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <SparklesIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Mykro Platform</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="/wireframes/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 underline"
              >
                View Wireframes
              </a>
              <div className="text-sm text-gray-600">
                Betting with Purpose
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Mykro
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the future of responsible gaming where every bet contributes to charitable causes. 
              Choose your journey below to get started.
            </p>
          </motion.div>
        </div>
      </section>

      {/* App Cards Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={app.href} className="block group">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
                    {/* Card Header */}
                    <div className={`h-24 bg-gradient-to-r ${app.color} relative`}>
                      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                      <div className="relative h-full flex items-center justify-center">
                        <app.icon className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{app.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{app.description}</p>
                      
                      {/* Features List */}
                      <ul className="space-y-2 mb-6">
                        {app.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      {/* CTA Button */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">Get Started</span>
                        <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Revolutionizing Charitable Giving
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform seamlessly integrates sports betting with charitable donations, 
              creating a positive impact with every bet placed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Automatic Donations</h4>
              <p className="text-gray-600">A percentage of every winning bet is automatically donated to your chosen charities.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Impact Tracking</h4>
              <p className="text-gray-600">See exactly how your donations are making a difference with detailed impact reports.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Transparent Process</h4>
              <p className="text-gray-600">Full transparency on where donations go and how they're used by partner charities.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
