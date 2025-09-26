import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export function PersistentNavigation() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  
  // Determine if we're in an app section
  const isInApp = location.pathname.startsWith('/betco') || 
                  location.pathname.startsWith('/operator-admin') || 
                  location.pathname.startsWith('/donor');
  
  // Determine active section for highlighting
  const getActiveSection = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname.startsWith('/industries')) return 'industries';
    if (location.pathname.startsWith('/impact')) return 'impact';
    if (location.pathname.startsWith('/partners')) return 'partners';
    if (location.pathname.startsWith('/about')) return 'about';
    if (location.pathname.startsWith('/technology')) return 'technology';
    if (location.pathname.startsWith('/betco')) return 'betco';
    if (location.pathname.startsWith('/donor')) return 'donor';
    if (location.pathname.startsWith('/operator-admin')) return 'admin';
    return '';
  };
  
  const activeSection = getActiveSection();

  return (
    <nav className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Bottom left square */}
                <rect x="4" y="16" width="16" height="16" fill="currentColor" opacity="0.8"/>
                
                {/* Top right square with purple fill where it overlaps */}
                <rect x="16" y="4" width="16" height="16" fill="currentColor" opacity="0.8"/>
                
                {/* Purple overlap area */}
                <rect x="16" y="16" width="4" height="4" fill="#7C4DFF"/>
              </svg>
            </div>
            <span className="font-display text-2xl font-medium tracking-tight">mykro</span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-12">
          <ul className="flex gap-12 list-none">
            <li>
              <Link 
                to="/" 
                className={`text-sm transition-colors ${
                  activeSection === 'home' 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/industries" 
                className={`text-sm transition-colors ${
                  activeSection === 'industries' 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Industries
              </Link>
            </li>
            <li>
              <Link 
                to="/impact" 
                className={`text-sm transition-colors ${
                  activeSection === 'impact' 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Impact
              </Link>
            </li>
            <li>
              <Link 
                to="/partners" 
                className={`text-sm transition-colors ${
                  activeSection === 'partners' 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Partners
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`text-sm transition-colors ${
                  activeSection === 'about' 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/technology" 
                className={`text-sm transition-colors ${
                  activeSection === 'technology' 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Technology
              </Link>
            </li>
          </ul>
          
          {/* App Quick Links - Show when in app sections */}
          {isInApp && (
            <>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <ul className="flex gap-8 list-none">
                <li>
                  <Link 
                    to="/betco" 
                    className={`text-sm transition-colors ${
                      activeSection === 'betco' 
                        ? 'text-purple-600 dark:text-purple-400 font-medium' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    BETCO
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/donor" 
                    className={`text-sm transition-colors ${
                      activeSection === 'donor' 
                        ? 'text-purple-600 dark:text-purple-400 font-medium' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Donor Portal
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/operator-admin" 
                    className={`text-sm transition-colors ${
                      activeSection === 'admin' 
                        ? 'text-purple-600 dark:text-purple-400 font-medium' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Admin
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>

        <div className="flex items-center gap-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
          
          {!isInApp && (
            <>
              <Link 
                to="/betco" 
                className="hidden sm:inline-block px-6 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Sign in
              </Link>
              <Link 
                to="/donor" 
                className="px-6 py-2 text-sm font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}