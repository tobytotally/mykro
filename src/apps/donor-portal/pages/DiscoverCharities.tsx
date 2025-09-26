import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../shared/components/UI/Card';
import { Button } from '../../../shared/components/UI/Button';
import { useCharityStore } from '../../../stores/charityStore';
import { mockDataService } from '../../../shared/utils/mockData';
import { 
  MagnifyingGlassIcon,
  HeartIcon,
  MapPinIcon,
  UserGroupIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  BeakerIcon,
  HomeIcon,
  SparklesIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const categories = [
  { id: 'all', name: 'All Causes', icon: SparklesIcon },
  { id: 'health', name: 'Health', icon: HeartIcon },
  { id: 'education', name: 'Education', icon: AcademicCapIcon },
  { id: 'environment', name: 'Environment', icon: GlobeAltIcon },
  { id: 'community', name: 'Community', icon: UserGroupIcon },
  { id: 'research', name: 'Research', icon: BeakerIcon },
  { id: 'housing', name: 'Housing', icon: HomeIcon },
  { id: 'local', name: 'Local', icon: MapPinIcon }
];

export function DiscoverCharities() {
  const { charities, setCharities } = useCharityStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    if (charities.length === 0) {
      setCharities(mockDataService.getCharities());
    }
  }, [charities.length, setCharities]);

  // Filter charities based on search and category
  const filteredCharities = charities.filter(charity => {
    const matchesSearch = charity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         charity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           charity.category?.toLowerCase() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Featured charities (mock data)
  const featuredCharities = charities.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Charities</h1>
          <p className="text-gray-600">Find causes that matter to you</p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search charities, causes, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-2.5 p-1 text-gray-600 hover:text-gray-900"
            >
              <FunnelIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Section */}
        {searchQuery === '' && selectedCategory === 'all' && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Featured Charities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCharities.map((charity, index) => (
                <motion.div
                  key={charity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-yellow-400">
                    <div className="h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 relative">
                      <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded">
                        FEATURED
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                          <HeartIcon className="w-12 h-12 text-yellow-500" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{charity.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{charity.description}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {charity.location || 'Global'}
                      </div>
                      <Button variant="primary" className="w-full">
                        Learn More
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Charities Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedCategory === 'all' ? 'All Charities' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-sm text-gray-600">{filteredCharities.length} charities found</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCharities.map((charity, index) => (
              <motion.div
                key={charity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                        <HeartIcon className="w-10 h-10 text-gray-400" />
                      </div>
                    </div>
                    {charity.badge && (
                      <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        {charity.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-2">{charity.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">{charity.description}</p>
                    
                    <div className="space-y-3">
                      {/* Location and Category */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {charity.location || 'Global'}
                        </div>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {charity.category || 'General'}
                        </span>
                      </div>

                      {/* Impact Stats */}
                      <div className="flex justify-between text-sm">
                        <div>
                          <p className="text-gray-600">Total Raised</p>
                          <p className="font-semibold">${charity.totalRaised || '0'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">Supporters</p>
                          <p className="font-semibold">{charity.supporters || '0'}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <HeartIcon className="h-4 w-4 mr-1" />
                          Follow
                        </Button>
                        <Button variant="primary" size="sm" className="flex-1">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCharities.length === 0 && (
            <div className="text-center py-12">
              <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No charities found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filters to find more charities
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}