import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUpIcon, PaintBrushIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

const apps = [
  { name: 'Home', href: '/home' },
  { name: 'BETCO', href: '/betco' },
  { name: 'Donor', href: '/donor' },
  { name: 'Admin', href: '/operator-admin' },
  { name: 'Tasks', href: '/tasks', icon: ClipboardDocumentListIcon },
  { name: 'Branding', href: '/betco/branding', icon: PaintBrushIcon },
  { name: 'mykro.giving', href: '/mykro/giving' },
  { name: 'mykro.solutions', href: '/mykro/solutions' }
];

export function FloatingAppNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-3 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
          >
            {apps.map((app) => {
              const isActive = location.pathname.startsWith(app.href) && app.href !== '/home' ||
                              (app.href === '/home' && location.pathname === '/home');
              
              return (
                <Link
                  key={app.name}
                  to={app.href}
                  className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors border-b border-gray-100 last:border-b-0 ${
                    isActive 
                      ? 'bg-green-50 text-green-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsExpanded(false)}
                >
                  {app.icon && <app.icon className="h-4 w-4" />}
                  {app.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={toggleExpanded}
        className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
        whileTap={{ scale: 0.95 }}
      >
        <span>Apps</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronUpIcon className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </div>
  );
}
