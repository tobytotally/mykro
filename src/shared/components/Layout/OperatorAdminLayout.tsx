import { Outlet, Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/operator-admin' },
  { name: 'Donations', href: '/operator-admin/donations' },
  { name: 'Configuration', href: '/operator-admin/configuration' },
  { name: 'Charities', href: '/operator-admin/charities' },
  { name: 'Analytics', href: '/operator-admin/analytics' },
  { name: 'Payment', href: '/operator-admin/payment' },
  { name: 'Impact Stories', href: '/operator-admin/impact-stories' },
];

export function OperatorAdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className="relative w-64 bg-gray-50 border-r border-gray-300">
        <div className="p-6 border-b border-gray-300">
          <h1 className="text-xl font-semibold text-black">MYKRO</h1>
          <p className="text-sm text-gray-600 mt-1">Operator Admin</p>
        </div>
        
        <nav className="p-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 mb-1 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 border border-gray-300 bg-white">
            <p className="text-xs text-gray-600 font-medium">Revenue Impact</p>
            <p className="text-2xl font-bold text-black">£24,832</p>
            <p className="text-xs text-gray-500">This month</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-300">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-black">
                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">BetCo Operator</span>
                <div className="w-8 h-8 border border-gray-300 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 text-sm font-medium">OP</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}