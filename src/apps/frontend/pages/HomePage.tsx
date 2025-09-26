import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ApiFootballService } from '../../../shared/services/apiFootball.service';
import { useCharityStore } from '../../../stores/charityStore';
import { mockDataService } from '../../../shared/utils/mockData';
import { Card } from '../../../shared/components/UI/Card';
import { Button } from '../../../shared/components/UI/Button';
import { Match } from '../../../shared/types';

export function HomePage() {
  const [featuredMatches, setFeaturedMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const { setCharities, setFeaturedCharity } = useCharityStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load charities
        const charities = mockDataService.getCharities();
        setCharities(charities);
        setFeaturedCharity(charities[0]);

        // Load featured matches
        const apiService = ApiFootballService.getInstance();
        const matches = await apiService.getFixtures();
        setFeaturedMatches(matches.slice(0, 6));
      } catch (error) {
        console.error('Error loading homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setCharities, setFeaturedCharity]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to BetCo
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The best odds, the biggest wins, now with Mykro charitable giving
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/sports">
            <Button size="lg">
              Start Betting
            </Button>
          </Link>
          <Link to="/mykro">
            <Button variant="outline" size="lg">
              Learn About Mykro
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Mykro Feature Highlight */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <Card className="mykro-gradient text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">🌟 Introducing Mykro</h2>
              <p className="text-green-100 mb-4">
                Turn every bet into a force for good. Donate a percentage of your stake to charity automatically.
              </p>
              <div className="flex space-x-6 text-sm">
                <div>
                  <span className="font-semibold">$125,000</span>
                  <p className="text-green-100">Total Donated</p>
                </div>
                <div>
                  <span className="font-semibold">8,500</span>
                  <p className="text-green-100">Active Donors</p>
                </div>
                <div>
                  <span className="font-semibold">12</span>
                  <p className="text-green-100">Partner Charities</p>
                </div>
              </div>
            </div>
            <div className="text-6xl">
              ✨
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Sports Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Sports</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Football', icon: '⚽', path: '/sports/football' },
            { name: 'Basketball', icon: '🏀', path: '/sports/basketball' },
            { name: 'Tennis', icon: '🎾', path: '/sports/tennis' },
            { name: 'Baseball', icon: '⚾', path: '/sports/baseball' },
          ].map((sport) => (
            <Link key={sport.name} to={sport.path}>
              <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-4xl mb-2">{sport.icon}</div>
                <h3 className="font-medium">{sport.name}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Featured Matches */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Today's Featured Matches</h2>
          <Link to="/sports">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        
        <div className="grid gap-4">
          {featuredMatches.map((match) => (
            <Card key={match.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="font-medium">{match.homeTeam}</p>
                      <p className="text-sm text-gray-600">vs</p>
                      <p className="font-medium">{match.awayTeam}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>{match.league}</p>
                      <p>{match.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    {match.odds.home.toFixed(2)}
                  </Button>
                  <Button variant="outline" size="sm">
                    {match.odds.draw.toFixed(2)}
                  </Button>
                  <Button variant="outline" size="sm">
                    {match.odds.away.toFixed(2)}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

