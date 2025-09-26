import { useState, useEffect } from 'react';
import { useBettingStore } from '../../../stores/bettingStore';
import { useThemeConfigStore } from '../../../stores/themeConfigStore';
import { ApiFootballService } from '../../../shared/services/apiFootball.service';
import { Match } from '../../../shared/types';
import { SportIcon } from '../../../shared/components/SportIcon';
import { MykroOnboardingPanel } from '../../../shared/components/MykroOnboardingPanel';
import { HandshakeIcon, InfoIcon, RefreshCw, Wifi, WifiOff, Clock } from 'lucide-react';
import { format } from 'date-fns';

type MykroUserState = 'new' | 'existing' | 'connected';

export function BrowseBetsLivePage() {
  const { selections, addSelection, removeSelection } = useBettingStore();
  const { currentTheme } = useThemeConfigStore();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(refreshInterval);
  const [useRealData, setUseRealData] = useState(true);
  const [showDebug, setShowDebug] = useState(false);
  const [apiCalls, setApiCalls] = useState<{ time: Date; type: string; status: string }[]>([]);
  
  // Betting slip state
  const [stakeAmount, setStakeAmount] = useState('50.00');
  const [donationEnabled, setDonationEnabled] = useState(true);
  const [donationPercentage, setDonationPercentage] = useState(3);
  const [mykroExpanded, setMykroExpanded] = useState(false);
  const [mykroUserState, setMykroUserState] = useState<MykroUserState>('new');
  const [slipFocused, setSlipFocused] = useState(false);
  const [showMykroPanel, setShowMykroPanel] = useState(false);
  const [mykroPanelPathway, setMykroPanelPathway] = useState<MykroUserState>('new');
  const [betOutcome, setBetOutcome] = useState<'pending' | 'won' | 'lost'>('pending');

  const apiService = ApiFootballService.getInstance();

  // Fetch matches
  const fetchMatches = async () => {
    const startTime = new Date();
    setLoading(true);
    setError(null);

    try {
      let fetchedMatches: Match[];
      
      if (useRealData) {
        fetchedMatches = await apiService.getFixtures();
        // Show both live and upcoming matches
        fetchedMatches = fetchedMatches.filter(match => 
          match.status === 'LIVE' || 
          match.status === '1H' || 
          match.status === '2H' || 
          match.status === 'HT' ||
          match.status === 'NS' || // Not started
          match.status === 'PST' || // Postponed
          match.status === 'FT' // Finished (recent)
        ).slice(0, 20); // Show up to 20 matches
      } else {
        // Generate mock live data
        fetchedMatches = generateMockLiveMatches();
      }

      setMatches(fetchedMatches);
      setLastUpdated(new Date());
      
      // Log API call
      setApiCalls(prev => [...prev, {
        time: startTime,
        type: useRealData ? 'Real API' : 'Mock Data',
        status: 'Success'
      }].slice(-10)); // Keep last 10 calls
    } catch (err) {
      setError('Failed to fetch live matches');
      setApiCalls(prev => [...prev, {
        time: startTime,
        type: useRealData ? 'Real API' : 'Mock Data',
        status: 'Error'
      }].slice(-10));
    } finally {
      setLoading(false);
    }
  };

  // Generate mock live matches with more realistic data
  const generateMockLiveMatches = (): Match[] => {
    // Today's actual matches based on typical football schedule
    const currentHour = new Date().getHours();
    const todayMatches = [
      // UEFA Women's Euro 2025 Qualifiers
      { home: 'England Women', away: 'France Women', league: "UEFA Women's Euro 2025", time: '19:45', status: currentHour >= 20 ? 'LIVE' : 'NS' },
      { home: 'Spain Women', away: 'Italy Women', league: "UEFA Women's Euro 2025", time: '20:00', status: currentHour >= 20 ? 'LIVE' : 'NS' },
      
      // Premier League
      { home: 'Manchester United', away: 'Liverpool', league: 'Premier League', time: '20:00', status: currentHour >= 20 ? '2H' : 'NS' },
      { home: 'Arsenal', away: 'Chelsea', league: 'Premier League', time: '17:30', status: currentHour >= 18 ? 'FT' : currentHour >= 17 ? 'LIVE' : 'NS' },
      
      // Championship
      { home: 'Leeds United', away: 'Sheffield United', league: 'Championship', time: '19:45', status: currentHour >= 20 ? '1H' : 'NS' },
      { home: 'Leicester City', away: 'West Brom', league: 'Championship', time: '20:00', status: currentHour >= 20 ? 'LIVE' : 'NS' },
      
      // La Liga
      { home: 'Real Madrid', away: 'Barcelona', league: 'La Liga', time: '21:00', status: currentHour >= 21 ? 'LIVE' : 'NS' },
      { home: 'Atletico Madrid', away: 'Sevilla', league: 'La Liga', time: '19:00', status: currentHour >= 19 ? 'FT' : 'NS' },
      
      // Serie A
      { home: 'Juventus', away: 'AC Milan', league: 'Serie A', time: '20:45', status: currentHour >= 21 ? '1H' : 'NS' },
      { home: 'Inter Milan', away: 'Napoli', league: 'Serie A', time: '18:00', status: currentHour >= 18 ? 'FT' : 'NS' },
      
      // Bundesliga
      { home: 'Bayern Munich', away: 'Borussia Dortmund', league: 'Bundesliga', time: '18:30', status: currentHour >= 19 ? '2H' : currentHour >= 18 ? '1H' : 'NS' },
      { home: 'RB Leipzig', away: 'Bayer Leverkusen', league: 'Bundesliga', time: '15:30', status: 'FT' },
    ];

    return todayMatches.map((match, index) => ({
      id: `match-${index}`,
      homeTeam: match.home,
      awayTeam: match.away,
      startTime: new Date(`${new Date().toDateString()} ${match.time}`),
      league: match.league,
      venue: `${match.home.split(' ')[0]} Stadium`,
      status: match.status,
      odds: {
        home: 1.5 + (Math.random() * 2),
        draw: 3.0 + (Math.random() * 1),
        away: 2.0 + (Math.random() * 2.5)
      },
      apiFootballId: 2000000 + index,
    }));
  };

  // Auto-refresh timer
  useEffect(() => {
    if (!autoRefresh) return;

    const timer = setInterval(() => {
      setTimeUntilRefresh(prev => {
        if (prev <= 1) {
          fetchMatches();
          return refreshInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoRefresh, refreshInterval]);

  // Initial fetch
  useEffect(() => {
    fetchMatches();
  }, []);

  const handleOddsClick = (matchId: string, selection: 'home' | 'draw' | 'away', odds: number) => {
    const existing = selections.find(s => s.matchId === matchId);
    
    if (existing && existing.selection === selection) {
      removeSelection(matchId);
    } else {
      const match = matches.find(m => m.id === matchId)!;
      addSelection({
        matchId,
        match,
        selection,
        odds
      });
    }
  };

  const isSelected = (matchId: string, selection: 'home' | 'draw' | 'away') => {
    const existing = selections.find(s => s.matchId === matchId);
    return existing?.selection === selection;
  };

  const calculatePotentialReturn = () => {
    const stake = parseFloat(stakeAmount) || 0;
    const totalOdds = selections.reduce((acc, sel) => acc * sel.odds, 1);
    return stake * totalOdds;
  };

  const calculateDonation = () => {
    const stake = parseFloat(stakeAmount) || 0;
    const potentialReturn = calculatePotentialReturn();
    return (potentialReturn * donationPercentage) / 100;
  };

  const calculateOperatorDonation = () => {
    return calculateDonation() * 0.2;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'LIVE':
      case '1H':
      case '2H':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>
            LIVE
          </span>
        );
      case 'HT':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            HT
          </span>
        );
      case 'NS':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Coming Up
          </span>
        );
      default:
        return null;
    }
  };

  const renderMykroSection = () => {
    // Simplified Mykro section for brevity
    return (
      <div className="border border-gray-200 rounded-lg mb-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HandshakeIcon className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium">Mykro Donation</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={donationEnabled}
              onChange={(e) => setDonationEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
        {donationEnabled && (
          <div className="mt-3 text-sm text-gray-600">
            Donating {donationPercentage}% (${calculateDonation().toFixed(2)}) to charity
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <style>{`
        .odds-selection {
          background-color: var(--theme-oddsDefaultBg);
          color: var(--theme-oddsDefaultText);
          border-color: var(--theme-oddsDefaultBorder);
        }
        .odds-selection:hover {
          background-color: var(--theme-oddsSelectionHoverBg) !important;
          color: var(--theme-oddsSelectionHoverText) !important;
          border-color: var(--theme-oddsSelectionHoverBorder) !important;
        }
        .odds-selection-active {
          background-color: var(--theme-oddsSelectionBg) !important;
          color: var(--theme-oddsSelectionText) !important;
          border-color: var(--theme-oddsSelectionBorder) !important;
        }
      `}</style>
      <div className="min-h-screen bg-gray-50 relative">
      {/* Focused Betting Slip Overlay - Vertical State Buttons Only */}
      {slipFocused && (
        <div className="fixed inset-0 z-30">
          {/* Background blur overlay - only blur the main content, not the betting slip */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setSlipFocused(false)}
          />
        </div>
      )}
      
      {slipFocused && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div className="absolute inset-0">
            {/* Vertical State Buttons - Left Side, Full Height */}
            <div className="absolute left-0 top-0 h-full pointer-events-auto">
              <div className="bg-black h-full p-6 shadow-2xl flex flex-col justify-start" style={{ minWidth: '200px' }}>
                <div className="flex flex-col gap-4 pt-8">
                  <button 
                    onClick={() => setMykroUserState('new')}
                    className={`px-8 py-4 rounded-lg text-base font-semibold transition-all transform whitespace-nowrap ${
                      mykroUserState === 'new' 
                        ? 'bg-purple-600 text-white scale-105 shadow-lg ring-2 ring-purple-400' 
                        : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white hover:border-purple-500'
                    }`}
                  >
                    New to Mykro
                  </button>
                  <button 
                    onClick={() => setMykroUserState('existing')}
                    className={`px-8 py-4 rounded-lg text-base font-semibold transition-all transform whitespace-nowrap ${
                      mykroUserState === 'existing' 
                        ? 'bg-purple-600 text-white scale-105 shadow-lg ring-2 ring-purple-400' 
                        : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white hover:border-purple-500'
                    }`}
                  >
                    Existing User
                  </button>
                  <button 
                    onClick={() => setMykroUserState('connected')}
                    className={`px-8 py-4 rounded-lg text-base font-semibold transition-all transform whitespace-nowrap ${
                      mykroUserState === 'connected' 
                        ? 'bg-purple-600 text-white scale-105 shadow-lg ring-2 ring-purple-400' 
                        : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white hover:border-purple-500'
                    }`}
                  >
                    Connected Account
                  </button>
                  
                  {/* Win/Lost Visualization Buttons */}
                  <button
                    onClick={() => setBetOutcome('won')}
                    className={`px-8 py-4 rounded-lg text-base font-semibold transition-all transform whitespace-nowrap ${
                      betOutcome === 'won'
                        ? 'bg-green-600 text-white scale-105 shadow-lg ring-2 ring-green-400'
                        : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white hover:border-green-500'
                    }`}
                  >
                    🎉 You Win
                  </button>
                  <button
                    onClick={() => setBetOutcome('lost')}
                    className={`px-8 py-4 rounded-lg text-base font-semibold transition-all transform whitespace-nowrap ${
                      betOutcome === 'lost'
                        ? 'bg-blue-600 text-white scale-105 shadow-lg ring-2 ring-blue-400'
                        : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white hover:border-blue-500'
                    }`}
                  >
                    💙 You Don't Win
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Page Content */}
      <div className="relative">
        {/* Mykro Impact Banner */}
        <div className="bg-gradient-to-r from-black to-gray-800 text-white px-4 py-3 text-center">
          <span className="text-sm">
            <strong>MYKRO IMPACT:</strong> Join 12,543 bettors who've donated $487,234 to charity this month!
          </span>
        </div>

        {/* Header with controls */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Live Betting</h1>
              <div className="flex items-center gap-2">
                {autoRefresh ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-gray-400" />
                )}
                <span className="text-sm text-gray-600">
                  Last updated: {format(lastUpdated, 'HH:mm:ss')}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Auto-refresh toggle */}
              <div className="flex items-center gap-2">
                <label className="text-sm">Auto-refresh</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                {autoRefresh && (
                  <span className="text-xs text-gray-500">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {timeUntilRefresh}s
                  </span>
                )}
              </div>

              {/* Refresh interval */}
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value={10}>10s</option>
                <option value={30}>30s</option>
                <option value={60}>60s</option>
              </select>

              {/* Manual refresh */}
              <button
                onClick={fetchMatches}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>

              {/* Data source toggle */}
              <div className="flex items-center gap-2">
                <label className="text-sm">Real API</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useRealData}
                    onChange={(e) => {
                      setUseRealData(e.target.checked);
                      fetchMatches();
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              {/* Debug toggle */}
              <button
                onClick={() => setShowDebug(!showDebug)}
                className={`px-3 py-1 text-sm rounded ${showDebug ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Debug
              </button>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
            <div className="p-4">
              <h3 className="font-bold text-sm uppercase text-gray-500 mb-4">Live Betting</h3>
              
              <div className="space-y-1 mb-6">
                <div className="flex items-center justify-between py-2 px-3 bg-red-50 rounded cursor-pointer">
                  <div className="flex items-center">
                    <SportIcon sport="Live Now" />
                    <span className="font-medium text-red-600">Live Now</span>
                  </div>
                  <span className="text-sm text-red-600">{matches.filter(m => ['LIVE', '1H', '2H', 'HT'].includes(m.status)).length}</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center">
                    <SportIcon sport="Starting Soon" />
                    <span>Starting Soon</span>
                  </div>
                  <span className="text-sm text-gray-600">{matches.filter(m => m.status === 'NS').length}</span>
                </div>
              </div>

              <h3 className="font-bold text-sm uppercase text-gray-500 mb-4">Sports</h3>
              <div className="space-y-1 mb-6">
                <div className="flex items-center justify-between py-2 px-3 bg-gray-100 rounded cursor-pointer">
                  <div className="flex items-center">
                    <SportIcon sport="Football" />
                    <span className="font-medium">Football</span>
                  </div>
                  <span className="text-sm text-gray-600">{matches.length}</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center">
                    <SportIcon sport="Tennis" />
                    <span>Tennis</span>
                  </div>
                  <span className="text-sm text-gray-600">0</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center">
                    <SportIcon sport="Basketball" />
                    <span>Basketball</span>
                  </div>
                  <span className="text-sm text-gray-600">0</span>
                </div>
              </div>

              <h3 className="font-bold text-sm uppercase text-gray-500 mb-4">Filters</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm">Live Matches</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm">Upcoming</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Finished</span>
                </label>
              </div>
            </div>
          </aside>

          <div className="flex-1 px-6 py-8">
            <div className="w-full px-4">
              {loading && matches.length === 0 ? (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Loading live matches...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchMatches}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : matches.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No live matches at the moment</p>
              {useRealData && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> To see real matches, configure your API key in the .env file:
                  </p>
                  <code className="block mt-2 text-xs bg-yellow-100 p-2 rounded">
                    VITE_API_FOOTBALL_KEY=your_actual_api_key
                  </code>
                  <p className="text-sm text-yellow-800 mt-2">
                    Or toggle off "Real API" to see mock data
                  </p>
                </div>
              )}
            </div>
          ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <h1 className="text-3xl font-bold mb-2">Live Football Matches</h1>
                  <p className="text-gray-600 mb-6">All Leagues - Live & Upcoming</p>

                  <div className="space-y-4">
                    {matches.map((match) => (
                      <div key={match.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {getStatusBadge(match.status)}
                                <span className="text-sm text-gray-500">{match.league}</span>
                              </div>
                              <h3 className="font-bold text-lg">{match.homeTeam} vs {match.awayTeam}</h3>
                              <p className="text-sm text-gray-600">
                                {format(match.startTime, 'HH:mm')} - {match.venue}
                              </p>
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleOddsClick(match.id, 'home', match.odds.home)}
                                className={`border px-4 py-3 rounded-lg transition-all ${
                                  isSelected(match.id, 'home') 
                                    ? 'odds-selection-active' 
                                    : 'odds-selection'
                                }`}
                                style={
                                  isSelected(match.id, 'home')
                                    ? {
                                        backgroundColor: 'var(--theme-oddsSelectionBg)',
                                        color: 'var(--theme-oddsSelectionText)',
                                        borderColor: 'var(--theme-oddsSelectionBorder)'
                                      }
                                    : {}
                                }
                              >
                                <div className="text-sm">Home</div>
                                <div className="font-bold">{match.odds.home.toFixed(2)}</div>
                              </button>
                              <button
                                onClick={() => handleOddsClick(match.id, 'draw', match.odds.draw)}
                                className={`border px-4 py-3 rounded-lg transition-all ${
                                  isSelected(match.id, 'draw') 
                                    ? 'odds-selection-active' 
                                    : 'odds-selection'
                                }`}
                                style={
                                  isSelected(match.id, 'draw')
                                    ? {
                                        backgroundColor: 'var(--theme-oddsSelectionBg)',
                                        color: 'var(--theme-oddsSelectionText)',
                                        borderColor: 'var(--theme-oddsSelectionBorder)'
                                      }
                                    : {}
                                }
                              >
                                <div className="text-sm">Draw</div>
                                <div className="font-bold">{match.odds.draw.toFixed(2)}</div>
                              </button>
                              <button
                                onClick={() => handleOddsClick(match.id, 'away', match.odds.away)}
                                className={`border px-4 py-3 rounded-lg transition-all ${
                                  isSelected(match.id, 'away') 
                                    ? 'odds-selection-active' 
                                    : 'odds-selection'
                                }`}
                                style={
                                  isSelected(match.id, 'away')
                                    ? {
                                        backgroundColor: 'var(--theme-oddsSelectionBg)',
                                        color: 'var(--theme-oddsSelectionText)',
                                        borderColor: 'var(--theme-oddsSelectionBorder)'
                                      }
                                    : {}
                                }
                              >
                                <div className="text-sm">Away</div>
                                <div className="font-bold">{match.odds.away.toFixed(2)}</div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Betting Slip */}
                <div className="lg:col-span-1">
                  <div className="bg-[var(--theme-slipBg)] border border-[var(--theme-slipBorder)] rounded-lg sticky top-4">
                    <div className="border-b border-[var(--theme-slipBorder)] p-4">
                      <div className="flex justify-between items-center">
                        <h2 className="font-bold text-lg text-[var(--theme-text)]">Betting Slip ({selections.length})</h2>
                        {selections.length > 0 && (
                          <button
                            onClick={() => setSlipFocused(true)}
                            className="p-2 rounded-lg transition-colors bg-[var(--theme-surface)] text-[var(--theme-textMuted)] hover:bg-[var(--theme-primary)] hover:bg-opacity-10"
                            title="Visualize your impact"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  
                  <div className="p-4">
                    {selections.length === 0 ? (
                      <p className="text-[var(--theme-textMuted)] text-center py-8">No selections yet</p>
                    ) : (
                      <>
                        <div className="space-y-3 mb-4">
                          {selections.map((selection) => (
                            <div key={selection.matchId} className="border border-[var(--theme-border)] rounded p-3 bg-[var(--theme-surface)]">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-bold text-[var(--theme-text)]">
                                    {selection.selection === 'home' ? selection.match.homeTeam : 
                                     selection.selection === 'away' ? selection.match.awayTeam : 'Draw'}
                                  </p>
                                  <p className="text-sm text-[var(--theme-textMuted)]">
                                    {selection.match.homeTeam} vs {selection.match.awayTeam}
                                  </p>
                                  <p className="text-sm text-[var(--theme-text)]">Odds: {selection.odds.toFixed(2)}</p>
                                </div>
                                <button
                                  onClick={() => removeSelection(selection.matchId)}
                                  className="text-[var(--theme-textMuted)] hover:text-[var(--theme-error)]"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-[var(--theme-text)] mb-1">Stake Amount</label>
                          <input
                            type="text"
                            value={`$${stakeAmount}`}
                            onChange={(e) => setStakeAmount(e.target.value.replace('$', ''))}
                            className="w-full px-3 py-2 border border-[var(--theme-border)] rounded bg-[var(--theme-surface)] text-[var(--theme-text)] focus:border-[var(--theme-primary)] focus:outline-none"
                          />
                        </div>

                        {renderMykroSection()}

                        {/* Impact Visualization */}
                        {betOutcome !== 'pending' && (
                          <div className="mb-4 p-4 rounded-lg border-2 border-dashed" style={{
                            backgroundColor: betOutcome === 'won' ? '#f0fdf4' : '#eff6ff',
                            borderColor: betOutcome === 'won' ? '#22c55e' : '#3b82f6'
                          }}>
                            <div className="text-center">
                              <div className="text-3xl mb-2">
                                {betOutcome === 'won' ? '🎉' : '💙'}
                              </div>
                              <h3 className="font-bold mb-2" style={{
                                color: betOutcome === 'won' ? '#059669' : '#1d4ed8'
                              }}>
                                {betOutcome === 'won' ? 'You Won!' : 'Charity Still Wins!'}
                              </h3>
                              
                              {betOutcome === 'won' && donationEnabled && (
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">Your donation from winnings:</p>
                                  <p className="text-lg font-bold text-purple-600">
                                    ${calculateDonation().toFixed(2)}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {donationPercentage}% of ${calculatePotentialReturn().toFixed(2)}
                                  </p>
                                </div>
                              )}
                              
                              {betOutcome === 'lost' && donationEnabled && (
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">BetCo donates for you:</p>
                                  <p className="text-lg font-bold text-blue-600">
                                    ${calculateOperatorDonation().toFixed(2)}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    20% of your ${calculateDonation().toFixed(2)} pledge
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="border-t border-[var(--theme-border)] pt-4 mb-4">
                          <div className="flex justify-between mb-1 text-[var(--theme-text)]">
                            <span>Stake:</span>
                            <span>${stakeAmount}</span>
                          </div>
                          {donationEnabled && (
                            <div className="flex justify-between mb-1">
                              <span className="text-[var(--theme-primary)]">Mykro Donation:</span>
                              <span className="text-[var(--theme-primary)]">${calculateDonation().toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between font-bold text-[var(--theme-text)]">
                            <span>Potential Return:</span>
                            <span className="text-[var(--theme-primary)]">${calculatePotentialReturn().toFixed(2)}</span>
                          </div>
                        </div>

                        <button 
                          className="w-full py-3 rounded font-bold transition-colors"
                          style={{
                            backgroundColor: 'var(--theme-primary)',
                            color: 'var(--theme-primaryText)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--theme-primaryHover)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--theme-primary)';
                          }}
                        >
                          Place Bet
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Debug Panel */}
      {showDebug && (
        <div className="fixed right-0 top-0 h-full w-80 bg-gray-900 text-white p-4 overflow-y-auto z-50">
          <h3 className="font-bold mb-4">Debug Panel</h3>
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2 text-gray-400">Settings</h4>
              <div className="space-y-2 text-sm">
                <div>Data Source: {useRealData ? 'Real API' : 'Mock Data'}</div>
                <div>Auto Refresh: {autoRefresh ? 'ON' : 'OFF'}</div>
                <div>Interval: {refreshInterval}s</div>
                <div>Matches Loaded: {matches.length}</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2 text-gray-400">API Calls</h4>
              <div className="space-y-1 text-xs">
                {apiCalls.map((call, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{format(call.time, 'HH:mm:ss')}</span>
                    <span className={call.status === 'Success' ? 'text-green-400' : 'text-red-400'}>
                      {call.type} - {call.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2 text-gray-400">Live Matches</h4>
              <div className="space-y-1 text-xs">
                {matches.filter(m => m.status !== 'NS').map(match => (
                  <div key={match.id}>
                    {match.homeTeam} vs {match.awayTeam} - {match.status}
                  </div>
                ))}
              </div>
            </div>
          </div>
      )}
    </div>
    </>
  );
}