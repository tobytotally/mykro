import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../shared/components/UI/Card';
import { Button } from '../../../shared/components/UI/Button';
import { mockDataService } from '../../../shared/utils/mockData';
import { useCharityStore } from '../../../stores/charityStore';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUpIcon,
  CalendarIcon,
  HeartIcon,
  FireIcon,
  CurrencyDollarIcon,
  ClockIcon,
  TrophyIcon,
  ChartBarIcon,
  BellIcon,
  UserIcon
} from '@heroicons/react/24/outline';

export function DonorDashboard() {
  const { charities, setCharities } = useCharityStore();
  const navigate = useNavigate();
  
  // Mock data for dashboard stats
  const [totalImpact] = useState(2847);
  const [thisMonth] = useState(124);
  const [activeCharities] = useState(6);
  const [givingStreak] = useState(45);
  const [pendingAllocation] = useState(38.50);
  
  // Recent activity data
  const [recentActivity] = useState([
    {
      id: 1,
      type: 'donation',
      icon: CurrencyDollarIcon,
      description: 'Won $50 on BetCo - $2.50 donated to Red Cross',
      title: 'Won $50 on BetCo',
      subtitle: '$2.50 donated to Red Cross',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'impact',
      icon: HeartIcon,
      description: 'Impact Update - Your donations helped fund 3 school lunches',
      title: 'Impact Update',
      subtitle: 'Your donations helped fund 3 school lunches',
      time: 'Yesterday'
    },
    {
      id: 3,
      type: 'achievement',
      icon: TrophyIcon,
      description: 'New Achievement - "Consistent Giver" badge earned!',
      title: 'New Achievement',
      subtitle: '"Consistent Giver" badge earned!',
      time: '3 days ago'
    }
  ]);

  useEffect(() => {
    if (charities.length === 0) {
      setCharities(mockDataService.getCharities());
    }
  }, [charities.length, setCharities]);

  const topCharities = [
    { name: 'Red Cross', allocation: 30, donated: 847, color: 'bg-red-500' },
    { name: 'UNICEF', allocation: 25, donated: 712, color: 'bg-blue-500' },
    { name: 'Local Food Bank', allocation: 20, donated: 568, color: 'bg-green-500' },
    { name: 'WWF', allocation: 15, donated: 425, color: 'bg-orange-500' },
    { name: 'Others', allocation: 10, donated: 295, color: 'bg-gray-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, John!
        </h1>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="relative overflow-hidden bg-white border border-gray-200 p-6 text-center h-full">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"
              style={{
                backgroundImage: 'url(/knowledge/images/website/pexels-julia-m-cameron-6994963.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px) brightness(1.2)'
              }}
            />
            <div className="relative z-10">
              <h2 className="text-sm font-semibold text-gray-700 tracking-wider uppercase mb-4">
                YOUR TOTAL IMPACT
              </h2>
              <div className="text-5xl font-bold text-gray-900 mb-2">
                ${totalImpact.toLocaleString()}
              </div>
              <p className="text-gray-700 mb-6 font-medium">
                That's 1,423 meals provided to families in need!
              </p>
              <Button variant="primary" className="w-full bg-gray-900 hover:bg-gray-800">
                Share Your Impact
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Right Column - My Charities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="h-full border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">My Charities</h3>
              <div className="flex gap-2 text-xs">
                <button className="px-3 py-1 bg-gray-900 text-white rounded-full">
                  Active (6)
                </button>
                <button className="px-3 py-1 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50">
                  Following (12)
                </button>
                <button className="px-3 py-1 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50">
                  Recommended
                </button>
              </div>
            </div>
            
            {/* Charity Allocation Visual */}
            <div className="flex h-12 border border-gray-200 mb-4 overflow-hidden rounded">
              {topCharities.map((charity, index) => (
                <div
                  key={charity.name}
                  className={`flex items-center justify-center text-white font-medium text-sm ${charity.color}`}
                  style={{ width: `${charity.allocation}%` }}
                >
                  {charity.allocation}%
                </div>
              ))}
            </div>
            
            {/* Charity List with Images */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              {topCharities.map((charity, index) => {
                const charityImages = [
                  '/knowledge/images/website/pexels-julia-m-cameron-6995106.jpg',
                  '/knowledge/images/website/pexels-b-aristotle-guweh-jr-1643208950-32230250.jpg',
                  '/knowledge/images/website/pexels-kublackphotography-10858387.jpg',
                  '/knowledge/images/website/pexels-ahmed-akacha-3313934-12102732.jpg',
                  '/knowledge/images/website/pexels-fotoboy-1662051319-33018683.jpg'
                ];
                return (
                  <div key={charity.name} className="text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full border border-gray-200 mx-auto mb-2 overflow-hidden">
                      <img 
                        src={charityImages[index]} 
                        alt={charity.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full hidden items-center justify-center bg-gray-100">
                        <HeartIcon className="w-6 h-6 text-gray-500" />
                      </div>
                    </div>
                    <p className="text-xs font-medium text-gray-900">{charity.name}</p>
                    <p className="text-xs text-gray-600">{charity.allocation}%</p>
                  </div>
                );
              })}
            </div>
            
            <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50" onClick={() => navigate('/donor/charities')}>
              Manage Charities
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* This Month */}
        <Card className="p-4 border border-gray-200">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <CalendarIcon className="h-6 w-6 text-gray-600" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-700 mb-1">This Month</h3>
            <div className="text-2xl font-bold text-gray-900">
              ${thisMonth}
            </div>
            <div className="flex items-center justify-center text-gray-600 text-sm mt-1">
              <ArrowUpIcon className="h-3 w-3 mr-1" />
              <span>15% vs last month</span>
            </div>
          </div>
        </Card>

        {/* Active Charities */}
        <Card className="p-4 border border-gray-200">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <HeartIcon className="h-6 w-6 text-gray-600" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-700 mb-1">Active Charities</h3>
            <div className="text-2xl font-bold text-gray-900">
              {activeCharities}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              2 new this month
            </p>
          </div>
        </Card>

        {/* Giving Streak */}
        <Card className="p-4 border border-gray-200">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <FireIcon className="h-6 w-6 text-gray-600" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-700 mb-1">Giving Streak</h3>
            <div className="text-2xl font-bold text-gray-900">
              {givingStreak} days
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Personal best!
            </p>
          </div>
        </Card>

        {/* Pending Allocation */}
        <Card className="p-4 bg-gray-50 border border-gray-200">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <ClockIcon className="h-6 w-6 text-gray-600" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-700 mb-1">Pending Allocation</h3>
            <div className="text-2xl font-bold text-gray-900">
              ${pendingAllocation.toFixed(2)}
            </div>
            <Button size="sm" className="mt-2 bg-gray-900 hover:bg-gray-800">
              Allocate Now
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.subtitle}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-6 pt-4 border-t border-gray-100">
            <Button variant="outline" size="sm">
              View All Activity
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
