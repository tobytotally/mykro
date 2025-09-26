# Mykro Prototype - Starter Components & Layouts

## Layout Components

### src/shared/components/Layout/FrontendLayout.tsx
```typescript
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useBettingStore } from '../../../stores/bettingStore';

export function FrontendLayout() {
  const location = useLocation();
  const selections = useBettingStore((state) => state.selections);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-900">
                BETCO
              </Link>
              <nav className="ml-10 flex space-x-8">
                <Link
                  to="/sports/football"
                  className={`text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium ${
                    location.pathname.includes('/sports') ? 'border-b-2 border-black' : ''
                  }`}
                >
                  Sports
                </Link>
                <Link
                  to="/live"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Live
                </Link>
                <Link
                  to="/casino"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Casino
                </Link>
                <Link
                  to="/promotions"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Promotions
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Balance: $500</span>
              <Link
                to="/bet-slip"
                className="relative p-2 text-gray-700 hover:text-gray-900"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {selections.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {selections.length}
                  </span>
                )}
              </Link>
              <Link to="/account" className="p-2 text-gray-700 hover:text-gray-900">
                <UserIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mykro Banner */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        className="bg-gradient-to-r from-mykro-green to-mykro-blue text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-center text-sm">
          ✨ Betting with Purpose - Every bet can make a difference with Mykro | 
          <Link to="/learn-more" className="ml-2 underline">Learn More →</Link>
        </div>
      </motion.div>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

### src/shared/components/Layout/BackendLayout.tsx
```typescript
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  CogIcon,
  HeartIcon,
  LinkIcon,
  ChartPieIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: ChartBarIcon },
  { name: 'Donations', href: '/admin/donations', icon: CurrencyDollarIcon },
  { name: 'Configuration', href: '/admin/configuration', icon: CogIcon },
  { name: 'Charities', href: '/admin/charities', icon: HeartIcon },
  { name: 'Integrations', href: '/admin/integrations', icon: LinkIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartPieIcon },
  { name: 'Impact Stories', href: '/admin/impact-stories', icon: SparklesIcon },
];

export function BackendLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold">MYKRO ADMIN</h1>
          <p className="text-sm text-gray-600 mt-1">Operator: BetCo</p>
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
                    ? 'bg-mykro-green text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {navigation.find(n => n.href === location.pathname)?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin User</span>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

### src/shared/components/Layout/DonorLayout.tsx
```typescript
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  CogIcon,
  BellIcon
} from '@heroicons/react/24/outline';

export function DonorLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/donor" className="text-2xl font-bold bg-gradient-to-r from-mykro-green to-mykro-blue bg-clip-text text-transparent">
                MYKRO
              </Link>
              
              <nav className="ml-10 flex space-x-6">
                <NavLink to="/donor" icon={HomeIcon} isActive={location.pathname === '/donor'}>
                  Dashboard
                </NavLink>
                <NavLink to="/donor/charities" icon={HeartIcon} isActive={location.pathname.includes('/charities')}>
                  My Charities
                </NavLink>
                <NavLink to="/donor/discover" icon={MagnifyingGlassIcon} isActive={location.pathname.includes('/discover')}>
                  Discover
                </NavLink>
                <NavLink to="/donor/impact" icon={ChartBarIcon} isActive={location.pathname.includes('/impact')}>
                  Impact
                </NavLink>
                <NavLink to="/donor/settings" icon={CogIcon} isActive={location.pathname.includes('/settings')}>
                  Settings
                </NavLink>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-mykro-green to-mykro-blue rounded-full"></div>
                <span className="text-sm font-medium">John D.</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function NavLink({ to, icon: Icon, isActive, children }: any) {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? 'text-mykro-green border-b-2 border-mykro-green'
          : 'text-gray-700 hover:text-gray-900'
      }`}
    >
      {children}
    </Link>
  );
}
```

## Core Page Components

### src/apps/frontend/pages/HomePage.tsx
```typescript
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ApiFootballService } from '../../../shared/services/apiFootball.service';
import { generateMockMatches } from '../../../shared/utils/mockData';
import { Match } from '../../../shared/types';

export function HomePage() {
  const [featuredMatches, setFeaturedMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      if (import.meta.env.VITE_DEMO_MODE === 'true') {
        setFeaturedMatches(generateMockMatches(3));
      } else {
        const apiService = ApiFootballService.getInstance();
        const matches = await apiService.getFixtures();
        setFeaturedMatches(matches.slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to load matches:', error);
      setFeaturedMatches(generateMockMatches(3));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 mb-8 text-white overflow-hidden"
      >
        <div className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-lg font-bold">
          MYKRO Enabled ✓
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Tonight's Big Matches</h1>
          <p className="text-xl mb-6">Place your bets and make a difference</p>
          <Link
            to="/sports/football"
            className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View All Matches →
          </Link>
        </div>
      </motion.div>

      {/* Featured Matches */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Matches</h2>
        {loading ? (
          <div className="text-center py-8">Loading matches...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>

      {/* Charity Spotlight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-mykro-green/10 to-mykro-blue/10 rounded-lg p-6 text-center"
      >
        <h3 className="text-xl font-bold mb-2">🎯 Today's Charity Spotlight: Red Cross</h3>
        <p className="text-gray-700">BetCo users have raised $12,456 this month!</p>
        <Link to="/learn-more" className="text-mykro-blue hover:underline mt-2 inline-block">
          Learn how you can contribute →
        </Link>
      </motion.div>
    </div>
  );
}

function MatchCard({ match }: { match: Match }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
    >
      <div className="text-sm text-gray-600 mb-2">{match.league}</div>
      <div className="font-semibold mb-4">
        <div>{match.homeTeam}</div>
        <div className="text-gray-500 text-sm">vs</div>
        <div>{match.awayTeam}</div>
      </div>
      <div className="flex justify-between text-sm mb-4">
        <span>Home: {match.odds.home}</span>
        <span>Draw: {match.odds.draw}</span>
        <span>Away: {match.odds.away}</span>
      </div>
      <Link
        to={`/matches/${match.id}`}
        className="block w-full bg-black text-white text-center py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Place Bet
      </Link>
    </motion.div>
  );
}
```

### src/apps/frontend/pages/BettingPage.tsx
```typescript
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MykroBettingSlip } from '../../../shared/components/MykroBettingSlip';
import { MatchList } from '../components/MatchList';
import { ApiFootballService } from '../../../shared/services/apiFootball.service';
import { generateMockMatches } from '../../../shared/utils/mockData';
import { Match } from '../../../shared/types';

export function BettingPage() {
  const { sport } = useParams();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBettingSlip, setShowBettingSlip] = useState(false);

  useEffect(() => {
    loadMatches();
  }, [sport]);

  const loadMatches = async () => {
    setLoading(true);
    try {
      if (import.meta.env.VITE_DEMO_MODE === 'true') {
        setMatches(generateMockMatches(10));
      } else {
        const apiService = ApiFootballService.getInstance();
        const data = await apiService.getFixtures();
        setMatches(data);
      }
    } catch (error) {
      console.error('Failed to load matches:', error);
      setMatches(generateMockMatches(10));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Main Content */}
        <div className={showBettingSlip ? 'flex-1 mr-96' : 'flex-1'}>
          <h1 className="text-3xl font-bold mb-6">
            {sport === 'football' ? 'Football' : 'All Sports'} - Today's Matches
          </h1>
          
          <p className="text-gray-600 mb-6">
            All times in EST | 🤝 Mykro donations active on all bets
          </p>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2">Loading matches...</p>
            </div>
          ) : (
            <MatchList matches={matches} onSelectMatch={() => setShowBettingSlip(true)} />
          )}
        </div>

        {/* Betting Slip */}
        <AnimatePresence>
          {showBettingSlip && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <MykroBettingSlip />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

## Modals and Overlays

### src/apps/frontend/components/MykroOnboardingModal.tsx
```typescript
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface MykroOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function MykroOnboardingModal({ isOpen, onClose, onComplete }: MykroOnboardingModalProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                  >
                    <div className="mx-auto h-24 w-24 bg-gradient-to-br from-mykro-green to-mykro-blue rounded-full flex items-center justify-center mb-4">
                      <span className="text-white text-4xl">🤝</span>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-2">Welcome to Mykro! 🎉</h2>
                    <p className="text-gray-600 mb-6">
                      Join thousands making a difference while betting
                    </p>

                    {/* Steps */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-mykro-green/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-mykro-green font-bold">1</span>
                        </div>
                        <p className="text-sm">Win or lose, charity wins</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-mykro-blue/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-mykro-blue font-bold">2</span>
                        </div>
                        <p className="text-sm">Track your impact</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-mykro-purple/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-mykro-purple font-bold">3</span>
                        </div>
                        <p className="text-sm">Choose your cause</p>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                      <div className="flex items-center mb-2">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="font-medium">BetCo covers all fees</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="font-medium">100% goes to charity</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="font-medium">Cancel anytime</span>
                      </div>
                    </div>

                    {/* Social Login */}
                    <h3 className="font-semibold mb-3">Create Your Mykro Account</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                        Continue with Google
                      </button>
                      <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <img src="/facebook-icon.svg" alt="Facebook" className="w-5 h-5" />
                        Continue with Facebook
                      </button>
                      <button
                        onClick={onComplete}
                        className="w-full px-4 py-3 bg-gradient-to-r from-mykro-green to-mykro-blue text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Continue with Email
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-4">
                      By continuing, you agree to Mykro's Terms & Privacy Policy
                    </p>
                  </motion.div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
```

## Utility Functions

### src/shared/utils/formatters.ts
```typescript
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(d);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}
```

### src/shared/utils/api.ts
```typescript
const API_CACHE = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function fetchWithCache<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const cacheKey = `${url}${JSON.stringify(options)}`;
  const cached = API_CACHE.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    API_CACHE.set(cacheKey, { data, timestamp: Date.now() });
    
    return data;
  } catch (error) {
    // If we have cached data, return it even if expired
    if (cached) return cached.data;
    throw error;
  }
}

export function clearCache() {
  API_CACHE.clear();
}
```

## Vite Configuration

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@frontend': path.resolve(__dirname, './src/apps/frontend'),
      '@backend': path.resolve(__dirname, './src/apps/backend'),
      '@donor': path.resolve(__dirname, './src/apps/donor-portal'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
```

## TypeScript Configuration

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@shared/*": ["src/shared/*"],
      "@frontend/*": ["src/apps/frontend/*"],
      "@backend/*": ["src/apps/backend/*"],
      "@donor/*": ["src/apps/donor-portal/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```