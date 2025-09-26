# API-Football Integration Guide

## API Setup & Authentication

### 1. Get Your API Key
You've registered at https://www.api-football.com/
- Login to your dashboard
- Copy your API key from the account section
- Add it to your `.env` file

### 2. API Endpoints

Base URL: `https://v3.football.api-sports.io`

Key endpoints we'll use:
- `/fixtures` - Get matches/fixtures
- `/odds` - Get betting odds
- `/leagues` - Get available leagues
- `/teams` - Get team information

### 3. Headers Required
```javascript
headers: {
  'x-rapidapi-key': 'YOUR_API_KEY',
  'x-rapidapi-host': 'v3.football.api-sports.io'
}
```

## Implementation Examples

### Get Today's Matches with Odds
```typescript
// services/apiFootball.service.ts
export class ApiFootballService {
  private apiKey = import.meta.env.VITE_API_FOOTBALL_KEY;
  private baseUrl = 'https://v3.football.api-sports.io';
  
  async getTodayMatches(): Promise<Match[]> {
    const today = new Date().toISOString().split('T')[0];
    
    // Get fixtures
    const fixturesResponse = await fetch(
      `${this.baseUrl}/fixtures?date=${today}`,
      {
        headers: {
          'x-rapidapi-key': this.apiKey,
          'x-rapidapi-host': 'v3.football.api-sports.io'
        }
      }
    );
    
    const fixturesData = await fixturesResponse.json();
    const fixtures = fixturesData.response;
    
    // Get odds for each fixture
    const matchesWithOdds = await Promise.all(
      fixtures.slice(0, 20).map(async (fixture: any) => {
        try {
          const oddsResponse = await fetch(
            `${this.baseUrl}/odds?fixture=${fixture.fixture.id}`,
            {
              headers: {
                'x-rapidapi-key': this.apiKey,
                'x-rapidapi-host': 'v3.football.api-sports.io'
              }
            }
          );
          
          const oddsData = await oddsResponse.json();
          const odds = this.extractOdds(oddsData.response);
          
          return {
            id: `match-${fixture.fixture.id}`,
            homeTeam: fixture.teams.home.name,
            awayTeam: fixture.teams.away.name,
            startTime: new Date(fixture.fixture.date),
            league: fixture.league.name,
            venue: fixture.fixture.venue.name,
            status: fixture.fixture.status.short,
            odds: odds || { home: 0, draw: 0, away: 0 },
            apiData: fixture // Keep original data for reference
          };
        } catch (error) {
          console.error(`Failed to get odds for fixture ${fixture.fixture.id}`);
          return null;
        }
      })
    );
    
    return matchesWithOdds.filter(Boolean);
  }
  
  private extractOdds(oddsResponse: any[]): { home: number; draw: number; away: number } | null {
    if (!oddsResponse || oddsResponse.length === 0) return null;
    
    // Find a bookmaker (prefer bet365 or similar major bookmaker)
    const bookmaker = oddsResponse[0]?.bookmakers?.find(
      (b: any) => b.name === 'Bet365'
    ) || oddsResponse[0]?.bookmakers?.[0];
    
    if (!bookmaker) return null;
    
    // Find Match Winner market
    const matchWinnerMarket = bookmaker.bets?.find(
      (bet: any) => bet.name === 'Match Winner'
    );
    
    if (!matchWinnerMarket) return null;
    
    return {
      home: parseFloat(matchWinnerMarket.values[0]?.odd || '0'),
      draw: parseFloat(matchWinnerMarket.values[1]?.odd || '0'),
      away: parseFloat(matchWinnerMarket.values[2]?.odd || '0')
    };
  }
}
```

### Rate Limiting & Caching
```typescript
// utils/rateLimiter.ts
class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests = 100; // API-Football free tier limit
  private readonly timeWindow = 24 * 60 * 60 * 1000; // 24 hours
  
  canMakeRequest(): boolean {
    const now = Date.now();
    // Remove requests older than 24 hours
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    if (this.requests.length >= this.maxRequests) {
      return false;
    }
    
    this.requests.push(now);
    return true;
  }
  
  getRemainingRequests(): number {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    return this.maxRequests - this.requests.length;
  }
}

export const apiRateLimiter = new RateLimiter();
```

### Smart Caching Strategy
```typescript
// services/cacheService.ts
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class CacheService {
  private cache = new Map<string, CacheEntry<any>>();
  
  set<T>(key: string, data: T, ttlMinutes: number = 10): void {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + (ttlMinutes * 60 * 1000)
    });
  }
  
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }
  
  // Cache fixtures for 10 minutes (they don't change often)
  cacheFixtures(date: string, fixtures: any[]): void {
    this.set(`fixtures-${date}`, fixtures, 10);
  }
  
  // Cache odds for 5 minutes (they change more frequently)
  cacheOdds(fixtureId: number, odds: any): void {
    this.set(`odds-${fixtureId}`, odds, 5);
  }
}

export const cacheService = new CacheService();
```

## Handling Different Sports

API-Football supports multiple sports. Here's how to handle them:

```typescript
// config/sports.config.ts
export const SPORTS_CONFIG = {
  football: {
    apiEndpoint: '/fixtures',
    defaultLeague: 39, // Premier League
    leagues: {
      39: 'Premier League',
      140: 'La Liga',
      78: 'Bundesliga',
      135: 'Serie A',
      61: 'Ligue 1'
    }
  },
  basketball: {
    apiEndpoint: '/games', // Different endpoint for basketball
    defaultLeague: 12, // NBA
    leagues: {
      12: 'NBA',
      120: 'NCAA'
    }
  }
};

// Endpoint switching based on sport
export function getApiEndpoint(sport: string, action: string): string {
  const baseUrl = 'https://v3.football.api-sports.io';
  
  switch (sport) {
    case 'football':
      return `${baseUrl}/fixtures`;
    case 'basketball':
      return `${baseUrl}/games`;
    default:
      return `${baseUrl}/fixtures`;
  }
}
```

## Error Handling & Fallbacks

```typescript
// services/matchService.ts
export class MatchService {
  async getMatches(sport: string = 'football'): Promise<Match[]> {
    try {
      // Check rate limit
      if (!apiRateLimiter.canMakeRequest()) {
        console.warn('Rate limit reached, using cached/mock data');
        return this.getCachedOrMockData(sport);
      }
      
      // Try cache first
      const cached = cacheService.get<Match[]>(`matches-${sport}-today`);
      if (cached) return cached;
      
      // Fetch from API
      const matches = await this.fetchFromApi(sport);
      
      // Cache the results
      cacheService.set(`matches-${sport}-today`, matches, 10);
      
      return matches;
    } catch (error) {
      console.error('Failed to fetch matches:', error);
      
      // Fallback strategy
      return this.getCachedOrMockData(sport);
    }
  }
  
  private async getCachedOrMockData(sport: string): Promise<Match[]> {
    // Try to get any cached data, even if expired
    const expiredCache = this.getExpiredCache(`matches-${sport}-today`);
    if (expiredCache) return expiredCache;
    
    // Generate mock data as last resort
    return generateMockMatches(10);
  }
  
  private getExpiredCache<T>(key: string): T | null {
    // Direct localStorage access for expired cache
    const stored = localStorage.getItem(`cache-${key}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.data;
      } catch {
        return null;
      }
    }
    return null;
  }
}
```

## Live Updates Implementation

```typescript
// hooks/useLiveMatches.ts
export function useLiveMatches(sport: string = 'football') {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const loadMatches = async () => {
      try {
        const matchService = new MatchService();
        const data = await matchService.getMatches(sport);
        setMatches(data);
        setError(null);
      } catch (err) {
        setError('Failed to load matches');
      } finally {
        setLoading(false);
      }
    };
    
    // Initial load
    loadMatches();
    
    // Set up polling for live updates (every 30 seconds for odds)
    if (import.meta.env.VITE_ENABLE_LIVE_UPDATES === 'true') {
      interval = setInterval(loadMatches, 30000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [sport]);
  
  return { matches, loading, error };
}
```

## Data Transformation

```typescript
// utils/transformers.ts
export function transformApiFootballFixture(fixture: any): Match {
  return {
    id: `match-${fixture.fixture.id}`,
    homeTeam: fixture.teams.home.name,
    homeTeamLogo: fixture.teams.home.logo,
    awayTeam: fixture.teams.away.name,
    awayTeamLogo: fixture.teams.away.logo,
    startTime: new Date(fixture.fixture.date),
    league: fixture.league.name,
    leagueLogo: fixture.league.logo,
    venue: fixture.fixture.venue.name,
    status: getMatchStatus(fixture.fixture.status),
    score: fixture.goals ? {
      home: fixture.goals.home,
      away: fixture.goals.away
    } : null,
    odds: { home: 0, draw: 0, away: 0 }, // Will be populated separately
    apiFootballId: fixture.fixture.id
  };
}

function getMatchStatus(status: any): 'scheduled' | 'live' | 'finished' {
  const liveStatuses = ['1H', '2H', 'HT', 'ET', 'P', 'LIVE'];
  const finishedStatuses = ['FT', 'AET', 'PEN'];
  
  if (liveStatuses.includes(status.short)) return 'live';
  if (finishedStatuses.includes(status.short)) return 'finished';
  return 'scheduled';
}
```

## Environment Variables Setup

```env
# API Configuration
VITE_API_FOOTBALL_KEY=your_actual_api_key_here
VITE_API_FOOTBALL_HOST=v3.football.api-sports.io

# Feature Flags
VITE_ENABLE_REAL_ODDS=true
VITE_ENABLE_LIVE_UPDATES=true
VITE_DEMO_MODE=false # Set to true to use only mock data
VITE_CACHE_DURATION=600000 # 10 minutes in milliseconds

# Rate Limiting
VITE_API_RATE_LIMIT=100 # Requests per day for free tier
VITE_API_RATE_WINDOW=86400000 # 24 hours in milliseconds
```

## Testing API Integration

```typescript
// test/apiFootball.test.ts
async function testApiConnection() {
  console.log('Testing API-Football connection...');
  
  try {
    const response = await fetch('https://v3.football.api-sports.io/status', {
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_FOOTBALL_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    });
    
    const data = await response.json();
    console.log('API Status:', data);
    
    if (data.errors && Object.keys(data.errors).length > 0) {
      console.error('API Errors:', data.errors);
      return false;
    }
    
    console.log('✅ API connection successful');
    console.log(`Subscription: ${data.response.subscription.plan}`);
    console.log(`Requests remaining today: ${data.response.requests.limit_day - data.response.requests.current}`);
    
    return true;
  } catch (error) {
    console.error('❌ API connection failed:', error);
    return false;
  }
}

// Run this on app startup in development
if (import.meta.env.DEV) {
  testApiConnection();
}
```

## Important Notes for Claude Code:

1. **API Limits**: The free tier has 100 requests/day. Cache aggressively!
2. **Odds Endpoint**: Not all fixtures have odds. Handle null cases.
3. **Time Zones**: API returns UTC times. Convert to user's timezone.
4. **Status Codes**: Check `fixture.status.short` for live matches.
5. **Error Handling**: Always have fallback data ready.
6. **Performance**: Don't fetch odds for all matches at once - lazy load or batch.

## Quick Start Commands:

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your API-Football key to .env

# Run development server
npm run dev

# Test API connection
# Check console for API status on startup
```