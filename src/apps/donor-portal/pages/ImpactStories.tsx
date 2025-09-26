import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../shared/components/UI/Card';
import { Button } from '../../../shared/components/UI/Button';
import { mockDataService } from '../../../shared/utils/mockData';
import { 
  HeartIcon,
  ClockIcon,
  ShareIcon,
  BookmarkIcon,
  PlayIcon,
  PhotoIcon,
  DocumentTextIcon,
  CalendarIcon,
  UserGroupIcon,
  TrophyIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

type StoryType = 'all' | 'my-charities' | 'updates' | 'milestones' | 'videos';

interface Story {
  id: string;
  title: string;
  description: string;
  charity: string;
  date: Date;
  type: 'update' | 'milestone' | 'video' | 'story';
  image: string;
  liked: boolean;
  likes: number;
  impact: string;
  metrics?: {
    peopleHelped?: number;
    projectDuration?: string;
    waterAccess?: string;
    patientsHelped?: number;
    surgeries?: number;
    medicinesDelivered?: string;
    mealsProvided?: number;
    schoolsReached?: number;
    attendanceIncrease?: string;
    plasticRemoved?: string;
    areaCleared?: string;
    marineLifeSaved?: string;
    acresProtected?: number;
    tigerIncrease?: string;
    speciesProtected?: number;
    childrenEducated?: number;
    teachersHired?: number;
    booksProvided?: number;
  };
}

const formatDate = (date: Date) => {
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return `${Math.floor(diffInDays / 30)} months ago`;
};

export function ImpactStories() {
  const [activeFilter, setActiveFilter] = useState<StoryType>('all');
  const [stories, setStories] = useState<Story[]>([]);
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set(['story-1', 'story-3', 'story-5']));

  useEffect(() => {
    const impactStories = mockDataService.generateImpactStories();
    const formattedStories: Story[] = impactStories.map((story: any, index: number) => ({
      ...story,
      type: index % 3 === 0 ? 'milestone' : index % 3 === 1 ? 'update' : 'story',
      liked: likedStories.has(story.id),
      likes: Math.floor(Math.random() * 500) + 100
    }));
    setStories(formattedStories);
  }, []);

  const filters: { id: StoryType; label: string; icon: any }[] = [
    { id: 'all', label: 'All Stories', icon: DocumentTextIcon },
    { id: 'my-charities', label: 'My Charities', icon: HeartIcon },
    { id: 'updates', label: 'Updates', icon: CalendarIcon },
    { id: 'milestones', label: 'Milestones', icon: TrophyIcon },
    { id: 'videos', label: 'Videos', icon: PlayIcon }
  ];

  const toggleLike = (storyId: string) => {
    setLikedStories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(storyId)) {
        newSet.delete(storyId);
      } else {
        newSet.add(storyId);
      }
      return newSet;
    });
    
    setStories(stories.map(story => 
      story.id === storyId 
        ? { ...story, liked: !story.liked, likes: story.liked ? story.likes - 1 : story.likes + 1 }
        : story
    ));
  };

  const getFilteredStories = () => {
    if (activeFilter === 'all') return stories;
    if (activeFilter === 'my-charities') return stories.filter(s => s.liked);
    if (activeFilter === 'updates') return stories.filter(s => s.type === 'update');
    if (activeFilter === 'milestones') return stories.filter(s => s.type === 'milestone');
    if (activeFilter === 'videos') return stories.filter(s => s.type === 'video');
    return stories;
  };

  const filteredStories = getFilteredStories();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayIcon className="h-5 w-5" />;
      case 'milestone': return <TrophyIcon className="h-5 w-5" />;
      case 'update': return <CalendarIcon className="h-5 w-5" />;
      default: return <DocumentTextIcon className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-gray-100 text-gray-700';
      case 'milestone': return 'bg-gray-100 text-gray-700';
      case 'update': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Impact Stories</h1>
          <p className="text-gray-600">See how your donations are making a difference around the world</p>
        </motion.div>

        {/* Impact Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">$12,847</p>
                <p className="text-sm text-gray-600">Total Donated</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-full">
                <CurrencyDollarIcon className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </Card>
          <Card className="p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">142,543</p>
                <p className="text-sm text-gray-600">Lives Impacted</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-full">
                <UserGroupIcon className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </Card>
          <Card className="p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-gray-600">Active Charities</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-full">
                <HeartIcon className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </Card>
          <Card className="p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">29</p>
                <p className="text-sm text-gray-600">Countries Reached</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-full">
                <GlobeAltIcon className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    activeFilter === filter.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stories Feed */}
        <div className="space-y-6">
          {filteredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Image/Media Section */}
                  <div className="md:col-span-1">
                    <div className="h-48 md:h-full relative overflow-hidden">
                      <img 
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="hidden absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 items-center justify-center">
                        {story.type === 'video' ? (
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <PlayIcon className="h-8 w-8 text-gray-700" />
                          </div>
                        ) : (
                          <PhotoIcon className="h-12 w-12 text-gray-400" />
                        )}
                      </div>
                      {story.type === 'video' && (
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <PlayIcon className="h-8 w-8 text-gray-700" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:col-span-2 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(story.type)}`}>
                            {getTypeIcon(story.type)}
                            <span className="ml-1 capitalize">{story.type}</span>
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {formatDate(story.date)}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-1">{story.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{story.charity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{story.impact}</p>
                        <p className="text-xs text-gray-600">raised</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{story.description}</p>

                    {/* Metrics Grid */}
                    {story.metrics && Object.keys(story.metrics).length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                        {Object.entries(story.metrics).slice(0, 3).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <p className="text-xl font-bold text-gray-900">{value}</p>
                            <p className="text-xs text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleLike(story.id)}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                        >
                          {story.liked ? (
                            <HeartSolidIcon className="h-5 w-5 text-red-600" />
                          ) : (
                            <HeartIcon className="h-5 w-5" />
                          )}
                          <span>{story.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                          <ShareIcon className="h-5 w-5" />
                          Share
                        </button>
                        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                          <BookmarkIcon className="h-5 w-5" />
                          Save
                        </button>
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        Read Full Story
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No stories found</h3>
            <p className="text-gray-600 mb-4">
              Check back later for more impact updates
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredStories.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Load More Stories
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}