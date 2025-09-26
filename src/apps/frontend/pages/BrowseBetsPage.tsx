import { useState } from 'react';
import { useBettingStore } from '../../../stores/bettingStore';
import { MykroDonation } from '../components/MykroDonation';
import { HandshakeIcon, InfoIcon } from 'lucide-react';
import { MykroOnboardingPanel } from '../../../shared/components/MykroOnboardingPanel';
import { PreviewIconMapper } from '../../../shared/components/PreviewIconMapper';
import { SportIcon } from '../../../shared/components/SportIcon';
import { useThemeConfigStore } from '../../../stores/themeConfigStore';
import { useDocumentTitle } from '../../../shared/hooks/useDocumentTitle';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  time: string;
  venue: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
}

type MykroUserState = 'new' | 'existing' | 'connected';

export function BrowseBetsPage() {
  const { currentTheme } = useThemeConfigStore();
  useDocumentTitle('Sports Betting', currentTheme?.brand?.name || 'Mykro');
  
  const { selections, addSelection, removeSelection } = useBettingStore();
  const [stakeAmount, setStakeAmount] = useState('50.00');
  const [donationEnabled, setDonationEnabled] = useState(true);
  const [donationPercentage, setDonationPercentage] = useState(3);
  const [mykroExpanded, setMykroExpanded] = useState(false);
  const [mykroUserState, setMykroUserState] = useState<MykroUserState>('new');
  const [slipFocused, setSlipFocused] = useState(false);
  const [showMykroPanel, setShowMykroPanel] = useState(false);
  const [mykroPanelPathway, setMykroPanelPathway] = useState<MykroUserState>('new');

  // Mock data for demonstration - expanded with more matches
  const matches: Match[] = [
    {
      id: '1',
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      time: '3:00 PM',
      venue: 'Old Trafford',
      odds: { home: 2.50, draw: 3.20, away: 2.80 }
    },
    {
      id: '2',
      homeTeam: 'Chelsea',
      awayTeam: 'Arsenal',
      time: '5:30 PM',
      venue: 'Stamford Bridge',
      odds: { home: 2.10, draw: 3.40, away: 3.50 }
    },
    {
      id: '3',
      homeTeam: 'Tottenham',
      awayTeam: 'Manchester City',
      time: '8:00 PM',
      venue: 'Tottenham Stadium',
      odds: { home: 4.50, draw: 3.80, away: 1.75 }
    },
    {
      id: '4',
      homeTeam: 'Leicester City',
      awayTeam: 'West Ham',
      time: '3:00 PM',
      venue: 'King Power Stadium',
      odds: { home: 2.30, draw: 3.30, away: 3.10 }
    },
    {
      id: '5',
      homeTeam: 'Newcastle',
      awayTeam: 'Everton',
      time: '5:30 PM',
      venue: 'St James\' Park',
      odds: { home: 1.95, draw: 3.60, away: 3.90 }
    },
    {
      id: '6',
      homeTeam: 'Brighton',
      awayTeam: 'Aston Villa',
      time: '8:00 PM',
      venue: 'Amex Stadium',
      odds: { home: 2.60, draw: 3.20, away: 2.70 }
    },
    {
      id: '7',
      homeTeam: 'Wolves',
      awayTeam: 'Crystal Palace',
      time: '3:00 PM',
      venue: 'Molineux Stadium',
      odds: { home: 2.40, draw: 3.10, away: 3.00 }
    },
    {
      id: '8',
      homeTeam: 'Brentford',
      awayTeam: 'Fulham',
      time: '5:30 PM',
      venue: 'Brentford Community Stadium',
      odds: { home: 2.20, draw: 3.40, away: 3.20 }
    }
  ];

  const handleOddsClick = (matchId: string, selection: 'home' | 'draw' | 'away', odds: number, teamName: string) => {
    const existing = selections.find(s => s.matchId === matchId);
    
    if (existing && existing.selection === selection) {
      removeSelection(matchId);
    } else {
      const match = matches.find(m => m.id === matchId)!;
      addSelection({
        matchId,
        match: {
          id: matchId,
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          league: 'Premier League',
          startTime: new Date(),
          venue: match.venue,
          odds: match.odds
        },
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

  const renderMykroSection = () => {
    return (
      <div className="border border-[var(--theme-border)] rounded-lg mb-4 overflow-hidden">
        {mykroUserState === 'new' && (
          <>
            <div 
              className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setMykroExpanded(!mykroExpanded)}
            >
              <div className="flex items-center gap-2">
                <HandshakeIcon className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">Discover Mykro</span>
              </div>
              <svg 
                className={`w-4 h-4 text-gray-400 transition-transform ${mykroExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {mykroExpanded && (
              <div className="p-4 border-t border-purple-100 bg-purple-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <HandshakeIcon className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Welcome to Mykro!</h3>
                    <p className="text-xs text-gray-600">Turn your bets into charity donations</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  With Mykro, every bet supports charity. Choose to donate a percentage of your winnings, 
                  and if you don't win, we'll still donate 20% of your pledge to charity. Win or lose, charity always wins!
                </p>
                <button 
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors mb-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMykroPanelPathway('new');
                    setShowMykroPanel(true);
                  }}
                >
                  Learn More
                </button>
                <button 
                  className="w-full text-purple-600 py-2 px-4 text-sm hover:bg-purple-50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMykroUserState('connected');
                  }}
                >
                  Skip for now
                </button>
              </div>
            )}
          </>
        )}

        {mykroUserState === 'existing' && (
          <>
            <div 
              className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setMykroExpanded(!mykroExpanded)}
            >
              <div className="flex items-center gap-2">
                <HandshakeIcon className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">Connect Mykro Account</span>
              </div>
              <svg 
                className={`w-4 h-4 text-gray-400 transition-transform ${mykroExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {mykroExpanded && (
              <div className="p-4 border-t border-purple-100 bg-purple-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <HandshakeIcon className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Welcome back!</h3>
                    <p className="text-xs text-gray-600">Continue your charitable impact</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  We found your Mykro account! Connect it to continue donating with your bets.
                </p>
                <button 
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors mb-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMykroPanelPathway('existing');
                    setShowMykroPanel(true);
                  }}
                >
                  Connect Account
                </button>
                <button 
                  className="w-full text-purple-600 py-2 px-4 text-sm hover:bg-purple-50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMykroUserState('connected');
                  }}
                >
                  Bet without Mykro
                </button>
              </div>
            )}
          </>
        )}

        {mykroUserState === 'connected' && (
          <>
            <div 
              className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setMykroExpanded(!mykroExpanded)}
            >
              <div className="flex items-center gap-2">
                <HandshakeIcon className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">Mykro Donation</span>
                {donationEnabled && (
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                    {donationPercentage}% • ${calculateDonation().toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={donationEnabled}
                    onChange={(e) => setDonationEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
                <svg 
                  className={`w-4 h-4 text-gray-400 transition-transform ${mykroExpanded ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {mykroExpanded && donationEnabled && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-start gap-2 mb-3">
                  <InfoIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    Win or lose, charity always wins! If you don't win, BetCo will donate 20% of your pledge.
                  </p>
                </div>
                
                <div className="mb-3">
                  <label className="text-sm">Donation amount: {donationPercentage}%</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={donationPercentage}
                    onChange={(e) => setDonationPercentage(Number(e.target.value))}
                    className="w-full mt-1"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>1%</span>
                    <span>3%</span>
                    <span>5%</span>
                    <span>10%</span>
                  </div>
                </div>
                
                <div className="bg-white p-3 border border-gray-300 rounded">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-semibold">If you win:</p>
                      <p className="font-bold text-green-600">${calculateDonation().toFixed(2)} donation</p>
                    </div>
                    <div className="border-t pt-2">
                      <p className="text-sm font-semibold">If you don't win:</p>
                      <p className="font-bold text-blue-600">${calculateOperatorDonation().toFixed(2)} donation</p>
                      <p className="text-xs text-gray-600 mt-1">Paid by BetCo</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-gray-600">Going to: Red Cross</p>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setMykroPanelPathway('connected');
                        setShowMykroPanel(true);
                      }}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Change charity
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
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
                    className="px-8 py-4 rounded-lg text-base font-semibold transition-all transform whitespace-nowrap bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white hover:border-green-500"
                  >
                    🎉 You Win
                  </button>
                  <button
                    className="px-8 py-4 rounded-lg text-base font-semibold transition-all transform whitespace-nowrap bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white hover:border-blue-500"
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
        <div className={`bg-gradient-to-r from-black to-gray-800 text-white px-4 py-3 text-center transition-all duration-300 ${slipFocused ? 'blur-sm brightness-75' : ''}`}>
          <span className="text-sm">
            <strong>MYKRO IMPACT:</strong> Join 12,543 bettors who've donated $487,234 to charity this month!
          </span>
        </div>

        <div className="flex">
          <aside className={`w-64 bg-white border-r border-gray-200 min-h-screen transition-all duration-300 ${slipFocused ? 'blur-sm brightness-75' : ''}`}>
            <div className="p-4">
              <h3 className="font-bold text-sm uppercase text-gray-500 mb-4">Sports</h3>
              
              <div className="space-y-1 mb-6">
                <div className="flex items-center justify-between py-2 px-3 bg-gray-100 rounded cursor-pointer">
                  <div className="flex items-center">
                    <SportIcon sport="Football" />
                    <span className="font-medium">Football</span>
                  </div>
                  <span className="text-sm text-gray-600">28</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center">
                    <SportIcon sport="Tennis" />
                    <span>Tennis</span>
                  </div>
                  <span className="text-sm text-gray-600">14</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center">
                    <SportIcon sport="Basketball" />
                    <span>Basketball</span>
                  </div>
                  <span className="text-sm text-gray-600">19</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center">
                    <SportIcon sport="Cricket" />
                    <span>Cricket</span>
                  </div>
                  <span className="text-sm text-gray-600">7</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center">
                    <SportIcon sport="Rugby" />
                    <span>Rugby</span>
                  </div>
                  <span className="text-sm text-gray-600">12</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center">
                    <SportIcon sport="Golf" />
                    <span>Golf</span>
                  </div>
                  <span className="text-sm text-gray-600">5</span>
                </div>
              </div>

              <h3 className="font-bold text-sm uppercase text-gray-500 mb-4">Quick Links</h3>
              <div className="space-y-1 mb-6">
                <div className="py-2 px-3 hover:bg-gray-50 rounded cursor-pointer text-purple-600 font-medium flex items-center">
                  <SportIcon sport="Today's Specials" />
                  Today's Specials
                </div>
                <div className="py-2 px-3 hover:bg-gray-50 rounded cursor-pointer flex items-center">
                  <SportIcon sport="Live Now" />
                  Live Now
                </div>
                <div className="py-2 px-3 hover:bg-gray-50 rounded cursor-pointer flex items-center">
                  <SportIcon sport="Starting Soon" />
                  Starting Soon
                </div>
                <div className="py-2 px-3 hover:bg-gray-50 rounded cursor-pointer flex items-center">
                  <SportIcon sport="Outright Betting" />
                  Outright Betting
                </div>
              </div>

              <h3 className="font-bold text-sm uppercase text-gray-500 mb-4">All Sports</h3>
              <div className="space-y-1">
                <div className="py-2 px-3 hover:bg-gray-50 rounded cursor-pointer text-sm flex items-center">
                  <SportIcon sport="American Football" />
                  American Football
                </div>
                <div className="py-2 px-3 hover:bg-gray-50 rounded cursor-pointer text-sm flex items-center">
                  <SportIcon sport="Baseball" />
                  Baseball
                </div>
                <div className="py-2 px-3 hover:bg-gray-50 rounded cursor-pointer text-sm flex items-center">
                  <SportIcon sport="Boxing" />
                  Boxing
                </div>
                <div className="py-2 px-3 hover:bg-gray-50 rounded cursor-pointer text-sm flex items-center">
                  <SportIcon sport="Darts" />
                  Darts
                </div>
                <div className="py-2 px-3 hover:bg-gray-50 rounded cursor-pointer text-sm flex items-center">
                  <SportIcon sport="eSports" />
                  eSports
                </div>
                <div className="py-2 px-3 hover:bg-gray-50 rounded cursor-pointer text-sm flex items-center">
                  <SportIcon sport="Formula 1" />
                  Formula 1
                </div>
                <div className="py-2 px-3 hover:bg-gray-50 rounded cursor-pointer text-sm flex items-center">
                  <SportIcon sport="Horse Racing" />
                  Horse Racing
                </div>
                <div className="py-2 px-3 hover:bg-gray-50 rounded cursor-pointer text-sm flex items-center">
                  <SportIcon sport="Ice Hockey" />
                  Ice Hockey
                </div>
                <div className="py-2 px-3 hover:bg-gray-50 rounded cursor-pointer text-sm flex items-center">
                  <SportIcon sport="MMA" />
                  MMA
                </div>
                <div className="py-2 px-3 hover:bg-gray-50 rounded cursor-pointer text-sm flex items-center">
                  <SportIcon sport="Snooker" />
                  Snooker
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 px-6 py-8">
            <div className="w-full px-4">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className={`lg:col-span-3 transition-all duration-300 ${slipFocused ? 'blur-sm brightness-75 pointer-events-none' : ''}`}>
                  {/* Promotional Banner - Horizontal above main content */}
                  {currentTheme.banner && (
                    <div className="relative overflow-hidden mb-6 rounded-lg">
                      <img 
                        src={currentTheme.banner} 
                        alt="Promotional Banner" 
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  
                  <h1 className="text-3xl font-bold mb-2">Football - Today's Matches</h1>
                  <p className="text-gray-600 mb-6">Premier League</p>

                  <div className="space-y-4">
                    {matches.map((match) => (
                      <div key={match.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">{match.homeTeam} vs {match.awayTeam}</h3>
                              <p className="text-gray-600">{match.time} - {match.venue}</p>
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleOddsClick(match.id, 'home', match.odds.home, match.homeTeam)}
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
                                onClick={() => handleOddsClick(match.id, 'draw', match.odds.draw, 'Draw')}
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
                                onClick={() => handleOddsClick(match.id, 'away', match.odds.away, match.awayTeam)}
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

                <div className={`lg:col-span-1 ${slipFocused ? 'z-50' : ''}`}>
                  <div className="relative">
                    {/* Betting Slip */}
                    <div className={`bg-[var(--theme-slipBg)] border border-[var(--theme-slipBorder)] sticky top-4 transition-all duration-300 ${slipFocused ? 'z-50 relative shadow-2xl ring-4 ring-purple-500 ring-opacity-50' : ''} ${showMykroPanel ? 'rounded-r-lg rounded-l-none border-l-0' : 'rounded-lg'}`}>
                    <div className="border-b border-[var(--theme-slipBorder)]">
                      <div className="flex justify-between items-center p-4 pb-2">
                        <h2 className="font-bold text-lg text-[var(--theme-text)]">Betting Slip ({selections.length})</h2>
                        <button
                          onClick={() => setSlipFocused(!slipFocused)}
                          className={`p-2 rounded-lg transition-colors ${
                            slipFocused 
                              ? 'bg-[var(--theme-primary)] bg-opacity-10 text-[var(--theme-primary)] hover:bg-opacity-20' 
                              : 'bg-[var(--theme-surface)] text-[var(--theme-textMuted)] hover:bg-[var(--theme-primary)] hover:bg-opacity-10'
                          }`}
                          title={slipFocused ? 'Exit focus mode' : 'Focus on betting slip'}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {slipFocused ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            )}
                          </svg>
                        </button>
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
                    
                    {/* Mykro Panel - positioned absolutely to overlay content */}
                    {showMykroPanel && (
                      <div 
                        className="absolute top-0 right-full z-50" 
                        style={{ 
                          width: '50rem', // Twice the width of betting slip
                          height: '700px'
                        }}
                      >
                        <div className="sticky top-4 h-full">
                          <MykroOnboardingPanel 
                            isOpen={showMykroPanel} 
                            onClose={() => setShowMykroPanel(false)} 
                            initialPathway={mykroPanelPathway}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}