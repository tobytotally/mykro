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
  venue?: string;
  status: string;
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
  match: Match;
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
  isActive?: boolean;
  totalDonated?: number;
  monthlyDonation?: number;
  allocationPercentage?: number;
  currentGoal?: number;
  currentProgress?: number;
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

// API Response Types
export interface ApiFootballFixture {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string;
    };
    venue: {
      name: string;
    };
  };
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  league: {
    name: string;
    logo: string;
  };
}

export interface ApiFootballOdds {
  fixture: {
    id: number;
  };
  bookmakers: {
    name: string;
    bets: {
      name: string;
      values: {
        value: string;
        odd: string;
      }[];
    }[];
  }[];
}

// Store Types
export interface BettingState {
  selections: BetSelection[];
  stake: number;
  mykroEnabled: boolean;
  mykroPercentage: number;
  selectedCharityId: string;
  addSelection: (selection: BetSelection) => void;
  removeSelection: (matchId: string) => void;
  updateStake: (stake: number) => void;
  toggleMykro: () => void;
  updateMykroPercentage: (percentage: number) => void;
  setSelectedCharity: (charityId: string) => void;
  clearSlip: () => void;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export interface CharityState {
  charities: Charity[];
  selectedCharities: string[];
  featuredCharity: Charity | null;
  setCharities: (charities: Charity[]) => void;
  selectCharity: (charityId: string) => void;
  deselectCharity: (charityId: string) => void;
  setFeaturedCharity: (charity: Charity) => void;
}
