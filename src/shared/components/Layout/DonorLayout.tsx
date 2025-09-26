import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/donor', icon: HomeIcon },
  { name: 'My Charities', href: '/donor/charities', icon: HeartIcon },
  { name: 'Discover', href: '/donor/discover', icon: MagnifyingGlassIcon },
  { name: 'Impact', href: '/donor/stories', icon: ChartBarIcon },
  { name: 'Settings', href: '/donor/settings', icon: Cog6ToothIcon },
];

export function DonorLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6">
            <Link to="/donor" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-light text-gray-900">MYKRO</span>
            </Link>
          </div>
          
          {/* Navigation */}
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {/* User Profile */}
          <div className="flex-shrink-0 p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">John D.</p>
                <p className="text-xs text-gray-500">Donor</p>
              </div>
            </div>
            <a 
              href="/wireframes/donor.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-3 text-xs text-gray-400 hover:text-gray-600 underline block"
            >
              View Wireframe
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <nav className="flex">
          {navigation.slice(0, 4).map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex-1 flex flex-col items-center py-2 text-xs ${
                  isActive
                    ? 'text-gray-900'
                    : 'text-gray-600'
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
