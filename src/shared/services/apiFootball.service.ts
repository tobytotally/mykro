import { Match, ApiFootballFixture, ApiFootballOdds } from '../types';

const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY;
const API_HOST = import.meta.env.VITE_API_FOOTBALL_HOST || 'https://v3.football.api-sports.io';

export class ApiFootballService {
  private static instance: ApiFootballService;
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  static getInstance() {
    if (!this.instance) {
      this.instance = new ApiFootballService();
    }
    return this.instance;
  }

  private getCacheKey(endpoint: string, params: Record<string, any> = {}): string {
    const paramString = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    return `${endpoint}?${paramString}`;
  }

  private getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private setCache(key: string, data: any, ttlMinutes: number = 10): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000,
    });
  }

  async getFixtures(date?: string): Promise<Match[]> {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const cacheKey = this.getCacheKey('/fixtures', { date: targetDate });
    
    // Check cache first
    const cached = this.getFromCache<Match[]>(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${API_HOST}/fixtures?date=${targetDate}`, {
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io'
        }
      });

      if (!response.ok) {
        throw new Error(`API response not ok: ${response.status}`);
      }

      const data = await response.json();
      const fixtures = this.transformFixtures(data.response || []);
      
      // Cache for 10 minutes
      this.setCache(cacheKey, fixtures, 10);
      
      return fixtures;
    } catch (error) {
      console.error('Error fetching fixtures:', error);
      return this.getMockMatches();
    }
  }

  async getOdds(fixtureId: number) {
    const cacheKey = this.getCacheKey('/odds', { fixture: fixtureId });
    
    // Check cache first
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${API_HOST}/odds?fixture=${fixtureId}`, {
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io'
        }
      });

      if (!response.ok) {
        throw new Error(`API response not ok: ${response.status}`);
      }

      const data = await response.json();
      const odds = this.extractOdds(data.response);
      
      // Cache for 5 minutes (odds change more frequently)
      this.setCache(cacheKey, odds, 5);
      
      return odds;
    } catch (error) {
      console.error(`Error fetching odds for fixture ${fixtureId}:`, error);
      return { home: 2.5, draw: 3.2, away: 2.8 }; // Default odds
    }
  }

  private transformFixtures(fixtures: ApiFootballFixture[]): Match[] {
    return fixtures.slice(0, 20).map((fixture, index) => ({
      id: `match-${fixture.fixture.id}`,
      homeTeam: fixture.teams.home.name,
      awayTeam: fixture.teams.away.name,
      startTime: new Date(fixture.fixture.date),
      league: fixture.league.name,
      venue: fixture.fixture.venue.name,
      status: fixture.fixture.status.short,
      odds: {
        home: 2.1 + (Math.random() * 0.8),
        draw: 3.1 + (Math.random() * 0.6),
        away: 2.3 + (Math.random() * 0.9)
      },
      apiFootballId: fixture.fixture.id,
    }));
  }

  private extractOdds(oddsResponse: ApiFootballOdds[]): { home: number; draw: number; away: number } {
    if (!oddsResponse || oddsResponse.length === 0) {
      return { home: 2.5, draw: 3.2, away: 2.8 };
    }

    // Find a reliable bookmaker
    const bookmaker = oddsResponse[0]?.bookmakers?.find(
      (b: any) => b.name === 'Bet365' || b.name === 'William Hill'
    ) || oddsResponse[0]?.bookmakers?.[0];

    if (!bookmaker) {
      return { home: 2.5, draw: 3.2, away: 2.8 };
    }

    // Find Match Winner market
    const matchWinnerMarket = bookmaker.bets?.find(
      (bet: any) => bet.name === 'Match Winner'
    );

    if (!matchWinnerMarket || !matchWinnerMarket.values) {
      return { home: 2.5, draw: 3.2, away: 2.8 };
    }

    return {
      home: parseFloat(matchWinnerMarket.values[0]?.odd || '2.5'),
      draw: parseFloat(matchWinnerMarket.values[1]?.odd || '3.2'),
      away: parseFloat(matchWinnerMarket.values[2]?.odd || '2.8')
    };
  }

  private getMockMatches(): Match[] {
    const teams = [
      { home: 'Manchester United', away: 'Liverpool' },
      { home: 'Chelsea', away: 'Arsenal' },
      { home: 'Manchester City', away: 'Tottenham' },
      { home: 'Newcastle', away: 'Brighton' },
      { home: 'West Ham', away: 'Everton' },
      { home: 'Aston Villa', away: 'Crystal Palace' },
      { home: 'Wolves', away: 'Brentford' },
      { home: 'Nottingham Forest', away: 'Fulham' },
    ];

    return teams.map((match, index) => ({
      id: `mock-match-${index}`,
      homeTeam: match.home,
      awayTeam: match.away,
      startTime: new Date(Date.now() + (index * 2 * 60 * 60 * 1000)), // Spread over hours
      league: 'Premier League',
      venue: 'Stadium',
      status: 'NS',
      odds: {
        home: 1.8 + (Math.random() * 1.2),
        draw: 3.0 + (Math.random() * 0.8),
        away: 2.1 + (Math.random() * 1.1)
      },
      apiFootballId: 1000000 + index,
    }));
  }
}
