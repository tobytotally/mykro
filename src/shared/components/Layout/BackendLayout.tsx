import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  CogIcon,
  HeartIcon,
  ChartPieIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/backend', icon: ChartBarIcon },
  { name: 'Donations', href: '/backend/donations', icon: CurrencyDollarIcon },
  { name: 'Configuration', href: '/backend/configuration', icon: CogIcon },
  { name: 'Charities', href: '/backend/charities', icon: HeartIcon },
  { name: 'Analytics', href: '/backend/analytics', icon: ChartPieIcon },
  { name: 'Impact Stories', href: '/backend/impact-stories', icon: SparklesIcon },
];

export function BackendLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-green-600">MYKRO ADMIN</h1>
          <p className="text-sm text-gray-600 mt-1">Operator: BetCo</p>
          <a 
            href="/wireframes/backend.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-700 underline mt-2 block"
          >
            View Wireframe
          </a>
        </div>
        
        <nav className="p-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-green-800 font-medium">Mykro Impact Score</p>
            <p className="text-2xl font-bold text-green-600">92/100</p>
            <p className="text-xs text-green-600">Great work! 🌟</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-purple-600 shadow-sm border-b border-purple-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">
                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-purple-100">Welcome back, Admin</span>
                <div className="w-8 h-8 bg-purple-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
