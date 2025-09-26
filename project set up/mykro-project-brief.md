# Mykro Prototype - Complete Project Brief

## Project Overview

Build a functional prototype for Mykro, a platform that integrates charitable giving into sports betting. The prototype consists of three main applications:
1. **Frontend Integration** - Bettor's journey on operator website
2. **Operator Backend** - Admin dashboard for betting operators
3. **Donor Portal** - B2C portal for managing charitable giving

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **API Integration**: API-Football for real sports data
- **Storage**: localStorage (development), Supabase (production ready)
- **Build Tool**: Vite
- **UI Components**: Headless UI + Custom components
- **Charts**: Recharts
- **Animation**: Framer Motion

## Project Structure

```
mykro-prototype/
├── src/
│   ├── apps/
│   │   ├── frontend/          # Betting operator frontend
│   │   ├── backend/           # Operator admin dashboard
│   │   └── donor-portal/      # Donor B2C portal
│   ├── shared/
│   │   ├── components/        # Shared UI components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Utility functions
│   │   ├── types/            # TypeScript types
│   │   └── services/         # API services
│   ├── config/
│   │   ├── api.config.ts     # API configuration
│   │   └── routes.config.ts  # Route definitions
│   └── styles/
│       └── globals.css       # Global Tailwind styles
├── public/
├── .env.example
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Environment Configuration

### .env.example
```env
# API Configuration
VITE_API_FOOTBALL_KEY=your_api_key_here
VITE_API_FOOTBALL_HOST=https://v3.football.api-sports.io

# App URLs (for routing)
VITE_FRONTEND_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:5173/admin
VITE_DONOR_PORTAL_URL=http://localhost:5173/donor

# Storage Configuration
VITE_STORAGE_TYPE=local # or 'supabase' for production
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Feature Flags
VITE_ENABLE_REAL_ODDS=true
VITE_ENABLE_LIVE_UPDATES=true
VITE_DEMO_MODE=false
```

## Core Data Models

### types/index.ts
```typescript
// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'bettor' | 'operator' | 'admin';
  mykroAccount?: MykroAccount;
}

export interface MykroAccount {
  id: string;
  userId: string;
  totalDonated: number;
  activeCharities: Charity[];
  connectedOperators: Operator[];
  givingStreak: number;
  createdAt: Date;
}

// Betting Types
export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  startTime: Date;
  league: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  apiFootballId?: number;
}

export interface Bet {
  id: string;
  userId: string;
  matches: BetSelection[];
  stake: number;
  mykroDonation: {
    enabled: boolean;
    percentage: number;
    amount: number;
    charityId: string;
  };
  status: 'pending' | 'won' | 'lost';
  potentialReturn: number;
  createdAt: Date;
}

export interface BetSelection {
  matchId: string;
  selection: 'home' | 'draw' | 'away';
  odds: number;
}

// Charity Types
export interface Charity {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  impactMetrics: {
    metric: string;
    value: number;
    unit: string;
  }[];
  totalRaised: number;
  rating: number;
}

// Operator Types
export interface Operator {
  id: string;
  name: string;
  logo: string;
  mykroSettings: {
    enabled: boolean;
    defaultPercentage: number;
    percentageOptions: number[];
    defaultCharities: string[];
    minDonation: number;
    maxDonation: number;
  };
}
```

## API Service Layer

### services/apiFootball.service.ts
```typescript
const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY;
const API_HOST = import.meta.env.VITE_API_FOOTBALL_HOST;

export class ApiFootballService {
  private static instance: ApiFootballService;
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new ApiFootballService();
    }
    return this.instance;
  }

  async getFixtures(date?: string): Promise<Match[]> {
    const response = await fetch(`${API_HOST}/fixtures?date=${date || new Date().toISOString().split('T')[0]}`, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    });
    
    const data = await response.json();
    return this.transformFixtures(data.response);
  }

  async getOdds(fixtureId: number) {
    const response = await fetch(`${API_HOST}/odds?fixture=${fixtureId}`, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    });
    
    const data = await response.json();
    return this.transformOdds(data.response);
  }

  private transformFixtures(apiFixtures: any[]): Match[] {
    return apiFixtures.map(fixture => ({
      id: `match-${fixture.fixture.id}`,
      homeTeam: fixture.teams.home.name,
      awayTeam: fixture.teams.away.name,
      startTime: new Date(fixture.fixture.date),
      league: fixture.league.name,
      odds: {
        home: 0, // Will be updated with odds API
        draw: 0,
        away: 0
      },
      apiFootballId: fixture.fixture.id
    }));
  }

  private transformOdds(apiOdds: any[]) {
    // Transform API odds to our format
    const bookmaker = apiOdds[0]?.bookmakers[0];
    const market = bookmaker?.bets?.find((bet: any) => bet.name === 'Match Winner');
    
    return {
      home: parseFloat(market?.values[0]?.odd || 0),
      draw: parseFloat(market?.values[1]?.odd || 0),
      away: parseFloat(market?.values[2]?.odd || 0)
    };
  }
}
```

## Storage Service

### services/storage.service.ts
```typescript
interface StorageAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}

class LocalStorageAdapter implements StorageAdapter {
  async get<T>(key: string): Promise<T | null> {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    localStorage.clear();
  }
}

// Supabase adapter skeleton (implement when ready)
class SupabaseAdapter implements StorageAdapter {
  // Implementation for production
  async get<T>(key: string): Promise<T | null> {
    // Supabase implementation
    return null;
  }
  
  async set<T>(key: string, value: T): Promise<void> {
    // Supabase implementation
  }
  
  async remove(key: string): Promise<void> {
    // Supabase implementation
  }
  
  async clear(): Promise<void> {
    // Supabase implementation
  }
}

export class StorageService {
  private adapter: StorageAdapter;

  constructor() {
    const storageType = import.meta.env.VITE_STORAGE_TYPE;
    this.adapter = storageType === 'supabase' 
      ? new SupabaseAdapter() 
      : new LocalStorageAdapter();
  }

  // User data
  async getCurrentUser(): Promise<User | null> {
    return this.adapter.get<User>('currentUser');
  }

  async setCurrentUser(user: User): Promise<void> {
    return this.adapter.set('currentUser', user);
  }

  // Betting slip
  async getBettingSlip(): Promise<Bet | null> {
    return this.adapter.get<Bet>('currentBettingSlip');
  }

  async saveBettingSlip(bet: Bet): Promise<void> {
    return this.adapter.set('currentBettingSlip', bet);
  }

  // Mykro settings
  async getMykroSettings(): Promise<any> {
    return this.adapter.get('mykroSettings');
  }

  async saveMykroSettings(settings: any): Promise<void> {
    return this.adapter.set('mykroSettings', settings);
  }
}
```

## Route Configuration

### config/routes.config.ts
```typescript
export const ROUTES = {
  // Frontend (Betting Operator)
  frontend: {
    home: '/',
    sports: '/sports/:sport',
    matches: '/matches',
    betSlip: '/bet-slip',
    myBets: '/my-bets',
    results: '/results/:betId'
  },
  
  // Backend (Operator Admin)
  backend: {
    dashboard: '/admin',
    donations: '/admin/donations',
    configuration: '/admin/configuration',
    charities: '/admin/charities',
    integrations: '/admin/integrations',
    analytics: '/admin/analytics',
    impact: '/admin/impact-stories'
  },
  
  // Donor Portal
  donor: {
    dashboard: '/donor',
    charities: '/donor/charities',
    discover: '/donor/discover',
    impact: '/donor/impact',
    settings: '/donor/settings',
    platforms: '/donor/platforms'
  }
};
```

## Main App Router

### src/App.tsx
```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FrontendApp } from './apps/frontend/FrontendApp';
import { BackendApp } from './apps/backend/BackendApp';
import { DonorPortalApp } from './apps/donor-portal/DonorPortalApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Frontend Routes */}
        <Route path="/*" element={<FrontendApp />} />
        
        {/* Backend Routes */}
        <Route path="/admin/*" element={<BackendApp />} />
        
        {/* Donor Portal Routes */}
        <Route path="/donor/*" element={<DonorPortalApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## State Management

### stores/bettingStore.ts
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BettingState {
  currentBet: Bet | null;
  selections: BetSelection[];
  mykroEnabled: boolean;
  donationPercentage: number;
  selectedCharity: Charity | null;
  
  // Actions
  addSelection: (selection: BetSelection) => void;
  removeSelection: (matchId: string) => void;
  setMykroEnabled: (enabled: boolean) => void;
  setDonationPercentage: (percentage: number) => void;
  setSelectedCharity: (charity: Charity) => void;
  calculateDonation: () => number;
  placeBet: () => Promise<void>;
  clearBet: () => void;
}

export const useBettingStore = create<BettingState>()(
  persist(
    (set, get) => ({
      currentBet: null,
      selections: [],
      mykroEnabled: true,
      donationPercentage: 3,
      selectedCharity: null,

      addSelection: (selection) => 
        set((state) => ({
          selections: [...state.selections, selection]
        })),

      removeSelection: (matchId) =>
        set((state) => ({
          selections: state.selections.filter(s => s.matchId !== matchId)
        })),

      setMykroEnabled: (enabled) => set({ mykroEnabled: enabled }),
      
      setDonationPercentage: (percentage) => set({ donationPercentage: percentage }),
      
      setSelectedCharity: (charity) => set({ selectedCharity: charity }),

      calculateDonation: () => {
        const state = get();
        const stake = state.currentBet?.stake || 0;
        return (stake * state.donationPercentage) / 100;
      },

      placeBet: async () => {
        // Implementation for placing bet
      },

      clearBet: () => set({
        currentBet: null,
        selections: [],
        mykroEnabled: true,
        donationPercentage: 3
      })
    }),
    {
      name: 'betting-storage'
    }
  )
);
```

## Tailwind Configuration

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mykro': {
          'green': '#00C853',
          'blue': '#2196F3',
          'dark': '#1A1A1A',
          'gold': '#FFB300',
          'orange': '#FF6B35',
          'purple': '#7C4DFF'
        },
        'operator': {
          'primary': '#1976D2',
          'secondary': '#FFA726',
          'accent': '#00C853'
        }
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      animation: {
        'confetti': 'confetti 3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-in'
      },
      keyframes: {
        confetti: {
          '0%': { transform: 'translateY(-100%) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: 0 }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@headlessui/tailwindcss')
  ],
}
```

## Package.json

```json
{
  "name": "mykro-prototype",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "zustand": "^4.4.7",
    "axios": "^1.6.2",
    "@headlessui/react": "^1.7.17",
    "@heroicons/react": "^2.0.18",
    "recharts": "^2.10.3",
    "framer-motion": "^10.16.16",
    "date-fns": "^2.30.0",
    "clsx": "^2.0.0",
    "@supabase/supabase-js": "^2.39.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
```

## Sample Component Structure

### shared/components/MykroBettingSlip.tsx
```typescript
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBettingStore } from '../../stores/bettingStore';
import { formatCurrency } from '../utils/formatters';

export function MykroBettingSlip() {
  const {
    selections,
    mykroEnabled,
    donationPercentage,
    selectedCharity,
    setMykroEnabled,
    setDonationPercentage,
    calculateDonation
  } = useBettingStore();

  const [stake, setStake] = useState(50);
  const donationAmount = calculateDonation();

  return (
    <div className="fixed right-4 top-20 w-96 bg-white rounded-lg shadow-xl border-2 border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-bold">Betting Slip ({selections.length})</h3>
      </div>

      <div className="p-4 space-y-3">
        {selections.map((selection) => (
          <div key={selection.matchId} className="border border-gray-200 rounded p-3">
            <p className="font-medium">{selection.selection}</p>
            <p className="text-sm text-gray-600">Odds: {selection.odds}</p>
          </div>
        ))}

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Stake Amount</label>
          <input
            type="number"
            value={stake}
            onChange={(e) => setStake(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Mykro Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-mykro-green/10 to-mykro-blue/10 rounded-lg p-4 border-2 border-mykro-green"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤝</span>
              <div>
                <h4 className="font-bold">Mykro Donation</h4>
                <p className="text-xs text-gray-600">Support charity with your bet</p>
              </div>
            </div>
            <button
              onClick={() => setMykroEnabled(!mykroEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                mykroEnabled ? 'bg-mykro-green' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  mykroEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {mykroEnabled && (
            <>
              <div className="mb-3">
                <label className="text-sm font-medium">Donation: {donationPercentage}%</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={donationPercentage}
                  onChange={(e) => setDonationPercentage(Number(e.target.value))}
                  className="w-full mt-1"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1%</span>
                  <span>5%</span>
                  <span>10%</span>
                </div>
              </div>

              <div className="bg-white rounded p-3">
                <p className="font-bold text-mykro-green">
                  Your donation: {formatCurrency(donationAmount)}
                </p>
                <p className="text-sm text-gray-600">
                  Going to: {selectedCharity?.name || 'Red Cross'}
                </p>
                <button className="text-xs text-mykro-blue hover:underline">
                  Change charity
                </button>
              </div>
            </>
          )}
        </motion.div>

        <div className="border-t pt-3 mt-3">
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Stake:</span>
              <span>{formatCurrency(stake)}</span>
            </div>
            {mykroEnabled && (
              <div className="flex justify-between text-mykro-green">
                <span>Mykro Donation:</span>
                <span>{formatCurrency(donationAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg">
              <span>Potential Return:</span>
              <span>{formatCurrency(stake * 2.5)}</span>
            </div>
          </div>
        </div>

        <button className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
          Place Bet {mykroEnabled && 'with Mykro'}
        </button>
      </div>
    </div>
  );
}
```

## Mock Data Generator

### utils/mockData.ts
```typescript
import { addDays, setHours, setMinutes } from 'date-fns';

export function generateMockMatches(count: number = 10): Match[] {
  const teams = [
    'Manchester United', 'Liverpool', 'Chelsea', 'Arsenal',
    'Manchester City', 'Tottenham', 'Leicester', 'West Ham',
    'Everton', 'Newcastle', 'Aston Villa', 'Leeds United'
  ];

  const matches: Match[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const homeIndex = (i * 2) % teams.length;
    const awayIndex = (i * 2 + 1) % teams.length;
    
    const matchDate = addDays(now, Math.floor(i / 3));
    const matchTime = setMinutes(setHours(matchDate, 15 + (i % 3) * 2), 0);

    matches.push({
      id: `match-${i}`,
      homeTeam: teams[homeIndex],
      awayTeam: teams[awayIndex],
      startTime: matchTime,
      league: 'Premier League',
      odds: {
        home: Number((1.5 + Math.random() * 3).toFixed(2)),
        draw: Number((2.8 + Math.random() * 1).toFixed(2)),
        away: Number((1.8 + Math.random() * 2.5).toFixed(2))
      }
    });
  }

  return matches;
}

export const mockCharities: Charity[] = [
  {
    id: 'charity-1',
    name: 'Red Cross',
    category: 'Emergency Relief',
    description: 'Providing emergency assistance, disaster relief, and disaster preparedness education.',
    logo: '/logos/red-cross.png',
    impactMetrics: [
      { metric: 'Meals Provided', value: 50000, unit: 'meals' },
      { metric: 'Families Helped', value: 1200, unit: 'families' }
    ],
    totalRaised: 125000,
    rating: 4.8
  },
  {
    id: 'charity-2',
    name: 'UNICEF',
    category: 'Children & Education',
    description: 'Working in over 190 countries for the rights of every child.',
    logo: '/logos/unicef.png',
    impactMetrics: [
      { metric: 'Children Educated', value: 3000, unit: 'children' },
      { metric: 'Vaccines Delivered', value: 25000, unit: 'doses' }
    ],
    totalRaised: 98000,
    rating: 4.9
  },
  // Add more charities...
];
```

## Prompt for Claude Code

```markdown
# Build Mykro Prototype

Please build a React TypeScript application for the Mykro charitable betting platform prototype using the provided specifications.

## Key Requirements:

1. **Three Applications in One**:
   - Frontend (Betting Interface) at `/`
   - Backend (Admin Dashboard) at `/admin`
   - Donor Portal (B2C) at `/donor`

2. **API Integration**:
   - Integrate with API-Football (credentials provided in .env)
   - Fall back to mock data when API is unavailable
   - Cache API responses to minimize requests

3. **Core Features to Implement**:

   **Frontend**:
   - Browse live matches with real odds
   - Build betting slips with Mykro donation toggle
   - First-time user onboarding modal
   - Existing user authentication flow
   - Win/Loss result screens with impact messaging

   **Backend Admin**:
   - Dashboard with donation metrics
   - Charity management interface
   - Financial transaction tables
   - Configuration settings
   - Basic analytics charts

   **Donor Portal**:
   - Personal impact dashboard
   - Charity portfolio management
   - Connected platforms view
   - Impact stories feed
   - Allocation settings

4. **Technical Requirements**:
   - Use Tailwind CSS for all styling
   - Implement smooth page transitions with Framer Motion
   - Store data in localStorage (with Supabase-ready structure)
   - Make all interfaces responsive
   - Use Zustand for state management

5. **Design Guidelines**:
   - Follow the Mykro color scheme (green: #00C853, blue: #2196F3)
   - Clean, modern interface with subtle animations
   - Card-based layouts
   - Clear CTAs and user feedback

Please start by setting up the project structure, implementing the routing system, and creating the basic layouts for each application. Then progressively build out the features, starting with the Frontend betting journey.

Make sure to:
- Handle loading and error states
- Implement proper TypeScript types
- Create reusable components
- Add helpful comments
- Make the demo data feel realistic and current
```

## Additional Setup Instructions

1. **Create Project**:
   ```bash
   npm create vite@latest mykro-prototype -- --template react-ts
   cd mykro-prototype
   npm install
   ```

2. **Install Dependencies**:
   ```bash
   npm install react-router-dom zustand axios @headlessui/react @heroicons/react recharts framer-motion date-fns clsx @supabase/supabase-js
   npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography
   npx tailwindcss init -p
   ```

3. **Set Up Environment**:
   - Copy `.env.example` to `.env`
   - Add your API-Football key
   - Configure other settings as needed

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## Demo Data Management

The app should:
1. Try to fetch real data from API-Football
2. Cache successful responses for 10 minutes
3. Fall back to mock data if API fails
4. Allow switching between demo/live mode via env variable

## Deployment Notes

For demo purposes:
- Use Vercel or Netlify for quick deployment
- Environment variables can be set in deployment platform
- For production, implement Supabase adapter
- Add proper error tracking and analytics