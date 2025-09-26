import { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useBettingStore } from '../../../stores/bettingStore';
import { useOperatorTheme } from '../../hooks/useOperatorTheme';
import { useBrandNavigation } from '../../hooks/useBrandNavigation';

export function FrontendLayout() {
  const location = useLocation();
  const selections = useBettingStore((state) => state.selections);
  const { theme, getThemeClasses } = useOperatorTheme();
  const { getBrandPath } = useBrandNavigation();

  // Listen for theme updates and highlight messages from branding page
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('Message received in iframe:', event.data);
      
      if (event.data.type === 'THEME_UPDATE') {
        // Apply the theme directly to document
        const theme = event.data.theme;
        console.log('Received theme update in iframe:', theme.name, 'headerBg:', theme.colors.headerBg);
        
        const root = document.documentElement;
        
        // Apply colors
        Object.entries(theme.colors).forEach(([key, value]) => {
          root.style.setProperty(`--theme-${key}`, String(value));
          console.log(`Set CSS variable: --theme-${key} = ${value}`);
        });
        
        // Apply typography
        root.style.setProperty('--theme-font-family', theme.typography.fontFamily);
        if (theme.typography.headingFont) {
          root.style.setProperty('--theme-heading-font', theme.typography.headingFont);
        }
        
        // Apply layout
        root.style.setProperty('--theme-border-radius', theme.layout.borderRadius);
        
        // Apply spacing scale
        const spacingScale: Record<string, number> = {
          compact: 0.75,
          normal: 1,
          spacious: 1.25,
        };
        root.style.setProperty('--theme-spacing-scale', spacingScale[theme.layout.spacing]?.toString() || '1');
      }
      
      if (event.data.type === 'HIGHLIGHT_ELEMENT') {
        const elementType = event.data.elementType;
        console.log('Highlighting element type:', elementType);
        
        // Remove previous highlights
        document.querySelectorAll('[data-theme-highlighted]').forEach(el => {
          el.removeAttribute('data-theme-highlighted');
        });
        
        // Add highlight to matching elements
        if (elementType) {
          document.querySelectorAll(`[data-theme-debug="${elementType}"]`).forEach(el => {
            el.setAttribute('data-theme-highlighted', 'true');
          });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
  
  // Check if we're in an iframe (branding preview)
  const isInIframe = window.self !== window.top;
  
  return (
    <div className="min-h-screen bg-white relative">
      {/* Visual debugging overlays - only show in iframe preview */}
      {isInIframe && <style>{`
        [data-theme-debug="headerBg"]:hover::after {
          content: "headerBg";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 192, 203, 0.3);
          pointer-events: none;
          font-size: 12px;
          color: #000;
          padding: 4px;
          z-index: 1000;
        }
        [data-theme-debug="navBg"]:hover::after {
          content: "navBg";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 192, 203, 0.3);
          pointer-events: none;
          font-size: 12px;
          color: #000;
          padding: 4px;
          z-index: 1000;
        }
        [data-theme-debug="navText"]:hover::after {
          content: "navText";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 192, 203, 0.3);
          pointer-events: none;
          font-size: 12px;
          color: #000;
          padding: 4px;
          z-index: 1000;
        }
        [data-theme-debug="primary"]:hover::after {
          content: "primary";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 192, 203, 0.3);
          pointer-events: none;
          font-size: 12px;
          color: #000;
          padding: 4px;
          z-index: 1000;
        }
        [data-theme-debug="surface"]:hover::after {
          content: "surface";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 192, 203, 0.3);
          pointer-events: none;
          font-size: 12px;
          color: #000;
          padding: 4px;
          z-index: 1000;
        }
        [data-theme-debug="background"]:hover::after {
          content: "background";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 192, 203, 0.3);
          pointer-events: none;
          font-size: 12px;
          color: #000;
          padding: 4px;
          z-index: 1000;
        }
        [data-theme-debug="border"]:hover::after {
          content: "border";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 192, 203, 0.3);
          pointer-events: none;
          font-size: 12px;
          color: #000;
          padding: 4px;
          z-index: 1000;
        }
        [data-theme-debug="text"]:hover::after {
          content: "text";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 192, 203, 0.3);
          pointer-events: none;
          font-size: 12px;
          color: #000;
          padding: 4px;
          z-index: 1000;
        }
        [data-theme-debug="slipBg"]:hover::after {
          content: "slipBg";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 192, 203, 0.3);
          pointer-events: none;
          font-size: 12px;
          color: #000;
          padding: 4px;
          z-index: 1000;
        }
        [data-theme-debug="slipHeader"]:hover::after {
          content: "slipHeader";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 192, 203, 0.3);
          pointer-events: none;
          font-size: 12px;
          color: #000;
          padding: 4px;
          z-index: 1000;
        }
        
        /* Highlight style for elements when hovering over config labels */
        [data-theme-highlighted="true"] {
          position: relative;
          animation: pulse-highlight 1.5s ease-in-out;
        }
        [data-theme-highlighted="true"]::after {
          content: attr(data-theme-debug);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 105, 180, 0.4);
          pointer-events: none;
          font-size: 14px;
          font-weight: bold;
          color: #000;
          padding: 8px;
          z-index: 1001;
          border: 2px solid #ff69b4;
          box-shadow: 0 0 20px rgba(255, 105, 180, 0.6);
        }
        
        @keyframes pulse-highlight {
          0% { box-shadow: 0 0 0 0 rgba(255, 105, 180, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(255, 105, 180, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 105, 180, 0); }
        }
      `}</style>}
      {/* Header */}
      <header className={`border-b border-[var(--theme-border)] ${getThemeClasses('header')}`} data-theme-debug="headerBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {theme.logo ? (
                <Link to={getBrandPath("/betco")} className="flex items-center">
                  <img src={theme.logo} alt="Logo" className="h-8 w-auto" />
                </Link>
              ) : (
                <Link to={getBrandPath("/betco")} className="text-xl font-medium">
                  BETCO
                </Link>
              )}
              <nav className="ml-10 flex space-x-1 bg-[var(--theme-navBg)] rounded-md px-2 py-1" data-theme-debug="navBg">
                {(theme.navigation?.structure || ['Sports', 'In-Play', 'Virtuals', 'Lotteries', 'Games', 'Live Casino', 'Bingo', 'Poker', 'Safer Gambling']).map((item, index) => {
                  const path = item.toLowerCase().replace(/\s+/g, '-');
                  const isActive = location.pathname.includes(path);
                  return (
                    <Link
                      key={item}
                      to={getBrandPath(`/betco/${path}`)}
                      className={`px-4 py-2 text-sm transition-colors text-[var(--theme-navText)] hover:text-[var(--theme-navActive)] ${
                        isActive ? 'font-medium bg-[var(--theme-navHover)] rounded' : ''
                      }`}
                      data-theme-debug="navText"
                    >
                      {item}
                    </Link>
                  );
                })}
              </nav>
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-sm opacity-75">Balance: $500</span>
              <Link to={getBrandPath("/betco/bet-slip")} className="relative">
                <ShoppingCartIcon className="h-5 w-5 opacity-75 hover:opacity-100 transition-opacity" />
                {selections.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                    {selections.length}
                  </span>
                )}
              </Link>
              <Link to={getBrandPath("/betco/account")} className="opacity-75 hover:opacity-100 transition-opacity">
                <UserIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mykro Banner - Removed from here, now shown in individual pages */}

      {/* Main Content */}
      <main className="relative bg-[var(--theme-background)]" data-theme-debug="background">
        <Outlet />
      </main>
    </div>
  );
}
