import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../shared/components/UI/Card';
import { Button } from '../../../shared/components/UI/Button';
import { useCharityStore } from '../../../stores/charityStore';
import { mockDataService } from '../../../shared/utils/mockData';
import { 
  HeartIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

type TabType = 'active' | 'following' | 'recommended';

export function MyCharities() {
  const { charities, setCharities } = useCharityStore();
  const [activeTab, setActiveTab] = useState<TabType>('active');
  
  useEffect(() => {
    if (charities.length === 0) {
      setCharities(mockDataService.getCharities());
    }
  }, [charities.length, setCharities]);

  // Filter charities based on tab
  const activeCharities = charities.filter(c => c.isActive).slice(0, 6);
  const followingCharities = charities.filter(c => !c.isActive).slice(0, 12);
  const recommendedCharities = charities.slice(0, 8);

  const getCharitiesByTab = () => {
    switch (activeTab) {
      case 'active':
        return activeCharities;
      case 'following':
        return followingCharities;
      case 'recommended':
        return recommendedCharities;
      default:
        return activeCharities;
    }
  };

  const displayCharities = getCharitiesByTab();

  return (
    <div className="space-y-6">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Charities</h1>
          <p className="text-gray-600">Manage your charitable giving portfolio</p>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Donated</p>
                <p className="text-2xl font-bold">$2,847</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <CurrencyDollarIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Charities</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <HeartIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold">$124</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <CalendarIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Monthly</p>
                <p className="text-2xl font-bold">$158</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <ArrowTrendingUpIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 mb-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('active')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'active'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Active ({activeCharities.length})
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'following'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Following ({followingCharities.length})
            </button>
            <button
              onClick={() => setActiveTab('recommended')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'recommended'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Recommended
            </button>
          </div>
        </div>

        {/* Charity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCharities.map((charity, index) => (
            <motion.div
              key={charity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
                <div className="h-40 relative overflow-hidden">
                  {/* Background Image */}
                  <img 
                    src={`/knowledge/images/website/${[
                      'pexels-julia-m-cameron-6994963.jpg',
                      'pexels-b-aristotle-guweh-jr-1643208950-32230250.jpg',
                      'pexels-kublackphotography-10858387.jpg',
                      'pexels-ahmed-akacha-3313934-12102732.jpg',
                      'pexels-fotoboy-1662051319-33018683.jpg',
                      'pexels-julia-m-cameron-6995106.jpg',
                      'pexels-king-shooter-664873673-31095001.jpg',
                      'pexels-oliver-wagenblatt-238537059-14894380.jpg'
                    ][index % 8]}`}
                    alt={charity.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback */}
                  <div className="hidden w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                      <HeartIcon className="w-10 h-10 text-gray-400" />
                    </div>
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-20" />
                  {activeTab === 'active' && (
                    <div className="absolute top-4 right-4 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                      Active
                    </div>
                  )}
                  {/* Logo overlay */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <HeartIcon className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{charity.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{charity.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Your Impact</span>
                      <span className="font-medium">${charity.totalDonated || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">This Month</span>
                      <span className="font-medium">${charity.monthlyDonation || 0}</span>
                    </div>
                    {activeTab === 'active' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Allocation</span>
                        <span className="font-medium">{charity.allocationPercentage || 0}%</span>
                      </div>
                    )}
                  </div>

                  {/* Progress bar for active charities */}
                  {activeTab === 'active' && charity.currentGoal && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Goal Progress</span>
                        <span>{Math.round((charity.currentProgress / charity.currentGoal) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gray-900 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((charity.currentProgress / charity.currentGoal) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {activeTab === 'active' ? (
                      <>
                        <Button variant="outline" size="sm" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50">
                          <AdjustmentsHorizontalIcon className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50">
                          View Impact
                        </Button>
                      </>
                    ) : activeTab === 'following' ? (
                      <>
                        <Button variant="primary" size="sm" className="flex-1 bg-gray-900 hover:bg-gray-800">
                          Activate
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50">
                          Unfollow
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="primary" size="sm" className="flex-1 bg-gray-900 hover:bg-gray-800">
                          Follow
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50">
                          Learn More
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {displayCharities.length === 0 && (
          <div className="text-center py-12">
            <HeartIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'active' && 'No active charities'}
              {activeTab === 'following' && 'No charities followed'}
              {activeTab === 'recommended' && 'No recommendations available'}
            </h3>
            <p className="text-gray-600 mb-4">
              {activeTab === 'active' && 'Start supporting charities to see them here'}
              {activeTab === 'following' && 'Follow charities to keep track of their impact'}
              {activeTab === 'recommended' && 'Check back later for personalized recommendations'}
            </p>
            <Button variant="primary" className="bg-gray-900 hover:bg-gray-800">
              Discover Charities
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}