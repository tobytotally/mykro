import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ApiFootballService } from '../../../shared/services/apiFootball.service';
import { useBettingStore } from '../../../stores/bettingStore';
import { Match, BetSelection } from '../../../shared/types';
import { Card } from '../../../shared/components/UI/Card';
import { Button } from '../../../shared/components/UI/Button';

export function SportsPage() {
  const { sport = 'football' } = useParams();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const { selections, addSelection, removeSelection } = useBettingStore();

  useEffect(() => {
    const loadMatches = async () => {
      setLoading(true);
      try {
        const apiService = ApiFootballService.getInstance();
        const matchData = await apiService.getFixtures();
        setMatches(matchData);
      } catch (error) {
        console.error('Error loading matches:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, [sport]);

  const handleBetSelection = (match: Match, selection: 'home' | 'draw' | 'away') => {
    const betSelection: BetSelection = {
      matchId: match.id,
      match,
      selection,
      odds: match.odds[selection],
    };

    // Check if this match is already selected
    const existingSelection = selections.find(s => s.matchId === match.id);
    
    if (existingSelection) {
      if (existingSelection.selection === selection) {
        // Remove if clicking the same selection
        removeSelection(match.id);
      } else {
        // Update selection
        addSelection(betSelection);
      }
    } else {
      // Add new selection
      addSelection(betSelection);
    }
  };

  const isSelected = (matchId: string, selection: 'home' | 'draw' | 'away') => {
    const existingSelection = selections.find(s => s.matchId === matchId);
    return existingSelection?.selection === selection;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
          {sport} Betting
        </h1>
        <p className="text-gray-600">
          Choose your bets and add a Mykro donation to make a difference
        </p>
      </motion.div>

      {/* Sport Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        {['football', 'basketball', 'tennis', 'baseball'].map((sportName) => (
          <button
            key={sportName}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
              sport === sportName
                ? 'bg-white text-gray-500 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {sportName}
          </button>
        ))}
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {matches.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                {/* Match Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between lg:justify-start lg:space-x-4">
                    <div className="text-center lg:text-left">
                      <p className="font-semibold text-lg">{match.homeTeam}</p>
                      <p className="text-gray-600 text-sm">vs</p>
                      <p className="font-semibold text-lg">{match.awayTeam}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{match.league}</p>
                    <p>{match.startTime.toLocaleDateString()} at {match.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p>{match.venue}</p>
                  </div>
                </div>

                {/* Betting Odds */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Home Win</p>
                      <Button
                        variant={isSelected(match.id, 'home') ? 'primary' : 'outline'}
                        size="lg"
                        className="w-full"
                        onClick={() => handleBetSelection(match, 'home')}
                      >
                        <div>
                          <div className="font-semibold">{match.homeTeam}</div>
                          <div className="text-lg">{match.odds.home.toFixed(2)}</div>
                        </div>
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Draw</p>
                      <Button
                        variant={isSelected(match.id, 'draw') ? 'primary' : 'outline'}
                        size="lg"
                        className="w-full"
                        onClick={() => handleBetSelection(match, 'draw')}
                      >
                        <div>
                          <div className="font-semibold">Draw</div>
                          <div className="text-lg">{match.odds.draw.toFixed(2)}</div>
                        </div>
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Away Win</p>
                      <Button
                        variant={isSelected(match.id, 'away') ? 'primary' : 'outline'}
                        size="lg"
                        className="w-full"
                        onClick={() => handleBetSelection(match, 'away')}
                      >
                        <div>
                          <div className="font-semibold">{match.awayTeam}</div>
                          <div className="text-lg">{match.odds.away.toFixed(2)}</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {matches.length === 0 && !loading && (
        <Card className="text-center py-12">
          <p className="text-gray-600">No matches available for {sport} today.</p>
          <p className="text-sm text-gray-500 mt-2">Check back later for more betting opportunities!</p>
        </Card>
      )}
    </div>
  );
}

