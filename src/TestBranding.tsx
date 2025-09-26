import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LinkIcon, 
  EyeIcon, 
  BeakerIcon, 
  ChartBarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { TestPreview } from './components/TestPreview';

export interface ExtractedCustomization {
  colors: {
    primary?: string;
    secondary?: string;
    background?: string;
    navigation?: string;
    accent?: string;
  };
  navigation: {
    icons?: { [key: string]: string };
    structure?: string[];
    style?: 'sidebar' | 'top' | 'tabs';
  };
  layout: {
    spacing?: 'compact' | 'normal' | 'spacious';
    cardStyle?: 'flat' | 'elevated' | 'bordered';
    buttonStyle?: 'rounded' | 'square' | 'pill';
  };
  typography: {
    fontFamily?: string;
    headingFont?: string;
    fontSize?: 'small' | 'medium' | 'large';
  };
  branding: {
    logo?: string;
    favicon?: string;
    brandName?: string;
  };
  uniqueFeatures: string[];
}

interface AnalysisResult {
  success: boolean;
  url: string;
  extractedCustomization?: ExtractedCustomization;
  error?: string;
  analysisTime: number;
  confidence: number;
}

export function TestBranding() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const analyzeUrl = async () => {
    if (!url.trim()) return;
    
    setIsAnalyzing(true);
    const startTime = Date.now();
    
    try {
      // Simulate analysis for now - we'll implement the real logic next
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result based on URL patterns for demo
      const mockResult = generateMockAnalysis(url);
      
      setResult({
        success: true,
        url,
        extractedCustomization: mockResult,
        analysisTime: Date.now() - startTime,
        confidence: 0.85
      });
    } catch (error) {
      setResult({
        success: false,
        url,
        error: error instanceof Error ? error.message : 'Analysis failed',
        analysisTime: Date.now() - startTime,
        confidence: 0
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateMockAnalysis = (url: string): ExtractedCustomization => {
    const urlLower = url.toLowerCase();
    
    if (urlLower.includes('paddypower') || urlLower.includes('paddy-power')) {
      return {
        colors: {
          primary: '#004833',
          secondary: '#00A651',
          background: '#ffffff',
          navigation: '#f8f9fa',
          accent: '#28a745'
        },
        navigation: {
          icons: {
            football: '⚽',
            horse_racing: '🐎',
            tennis: '🎾',
            basketball: '🏀',
            cricket: '🏏',
            rugby: '🏈',
            golf: '⛳',
            boxing: '🥊',
            ice_hockey: '🏒',
            baseball: '⚾',
            american_football: '🏈',
            cycling: '🚴',
            motorsports: '🏎️',
            in_play: '🔴',
            live_streaming: '📺',
            lotteries: '🎲',
            greyhound: '🐕',
            virtuals: '🎮',
            esports: '🎯',
            specials: '🌟',
            politics: '🗳️',
            entertainment: '🎬'
          },
          structure: ['Sports', 'In-Play', 'Virtuals', 'Lotteries', 'Games', 'Live Casino', 'Bingo', 'Poker'],
          style: 'sidebar'
        },
        layout: {
          spacing: 'compact',
          cardStyle: 'bordered',
          buttonStyle: 'rounded'
        },
        typography: {
          fontFamily: 'Arial, sans-serif',
          headingFont: 'Arial, sans-serif',
          fontSize: 'medium'
        },
        branding: {
          brandName: 'Paddy Power',
          logo: 'https://www.paddypower.com/logo.png'
        },
        uniqueFeatures: [
          '22 sport-specific navigation icons detected',
          'Emoji-based icon system for instant recognition',
          'Comprehensive sports coverage including niche markets',
          'Special sections: Politics, Entertainment, Specials',
          'Live streaming and in-play emphasis',
          'Compact sidebar layout with visual hierarchy',
          'Green accent colors throughout interface',
          'Clear section dividers and promotional integration'
        ]
      };
    }
    
    if (urlLower.includes('bet365')) {
      return {
        colors: {
          primary: '#365314',
          secondary: '#ffd700',
          background: '#ffffff',
          navigation: '#365314',
          accent: '#ffd700'
        },
        navigation: {
          icons: {
            football: '⚽',
            tennis: '🎾',
            basketball: '🏀',
            horse_racing: '🐎'
          },
          structure: ['Sports', 'In-Play', 'Casino', 'Games', 'Poker'],
          style: 'top'
        },
        layout: {
          spacing: 'compact',
          cardStyle: 'flat',
          buttonStyle: 'square'
        },
        typography: {
          fontFamily: 'Arial, sans-serif',
          fontSize: 'small'
        },
        branding: {
          brandName: 'bet365'
        },
        uniqueFeatures: [
          'Dense information layout',
          'Yellow accent highlights',
          'Horizontal navigation tabs',
          'Minimal card styling'
        ]
      };
    }
    
    // Default analysis for unknown URLs
    return {
      colors: {
        primary: '#1a73e8',
        secondary: '#34a853',
        background: '#ffffff',
        navigation: '#f8f9fa',
        accent: '#ea4335'
      },
      navigation: {
        icons: {},
        structure: ['Sports', 'Live', 'Casino', 'Promotions'],
        style: 'top'
      },
      layout: {
        spacing: 'normal',
        cardStyle: 'elevated',
        buttonStyle: 'rounded'
      },
      typography: {
        fontFamily: 'system-ui, sans-serif',
        fontSize: 'medium'
      },
      branding: {
        brandName: 'Generic Brand'
      },
      uniqueFeatures: [
        'Standard navigation structure',
        'Clean modern design',
        'Responsive layout'
      ]
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-3">
            <BeakerIcon className="w-8 h-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-light text-gray-900 dark:text-white">Brand Customization Test Lab</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Safe testing environment - analyze any URL for advanced customization possibilities
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* URL Input Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              URL Analysis
            </h2>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter any betting site URL (e.g., https://www.paddypower.com)"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  disabled={isAnalyzing}
                />
              </div>
              <button
                onClick={analyzeUrl}
                disabled={!url.trim() || isAnalyzing}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </div>
                ) : (
                  'Analyze Site'
                )}
              </button>
            </div>

            {/* Quick Test URLs */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick test with these URLs:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'https://www.paddypower.com',
                  'https://www.bet365.com',
                  'https://www.williamhill.com',
                  'https://www.skybet.com'
                ].map((testUrl) => (
                  <button
                    key={testUrl}
                    onClick={() => setUrl(testUrl)}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    disabled={isAnalyzing}
                  >
                    {testUrl.replace('https://www.', '').replace('.com', '')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Result Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <ChartBarIcon className="w-5 h-5" />
                  Analysis Results for: {new URL(result.url).hostname}
                </h2>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    Analysis time: {result.analysisTime}ms
                  </span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    result.confidence > 0.8 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      : result.confidence > 0.6
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                  }`}>
                    {Math.round(result.confidence * 100)}% confidence
                  </span>
                </div>
              </div>

              {result.success && result.extractedCustomization ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Colors */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Colors</h3>
                      <div className="space-y-2">
                        {Object.entries(result.extractedCustomization.colors).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded border border-gray-300"
                              style={{ backgroundColor: value }}
                            ></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                              {key}: {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Navigation</h3>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Style: {result.extractedCustomization.navigation.style}
                        </div>
                        {result.extractedCustomization.navigation.icons && 
                         Object.keys(result.extractedCustomization.navigation.icons).length > 0 && (
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Icons detected:</div>
                            <div className="flex flex-wrap gap-1">
                              {Object.entries(result.extractedCustomization.navigation.icons).map(([sport, icon]) => (
                                <span key={sport} className="text-xs bg-white dark:bg-gray-600 px-2 py-1 rounded">
                                  {icon} {sport.replace('_', ' ')}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Layout */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Layout</h3>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <div>Spacing: {result.extractedCustomization.layout.spacing}</div>
                        <div>Cards: {result.extractedCustomization.layout.cardStyle}</div>
                        <div>Buttons: {result.extractedCustomization.layout.buttonStyle}</div>
                      </div>
                    </div>

                    {/* Typography */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Typography</h3>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <div>Font: {result.extractedCustomization.typography.fontFamily}</div>
                        <div>Size: {result.extractedCustomization.typography.fontSize}</div>
                      </div>
                    </div>
                  </div>

                  {/* Unique Features */}
                  {result.extractedCustomization.uniqueFeatures.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Unique Features Detected</h3>
                      <ul className="space-y-1">
                        {result.extractedCustomization.uniqueFeatures.map((feature, index) => (
                          <li key={index} className="text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Preview Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <EyeIcon className="w-5 h-5" />
                      {showPreview ? 'Hide Preview' : 'Show Live Preview'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <ExclamationTriangleIcon className="w-5 h-5" />
                  <span>Analysis failed: {result.error}</span>
                </div>
              )}
            </div>

            {/* Live Preview */}
            {showPreview && result.success && result.extractedCustomization && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white flex items-center justify-between">
                    Live Preview - {result.extractedCustomization.branding?.brandName || 'Custom Theme'}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Powered by extracted theme</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    This shows how your betting app would look with the extracted customization applied
                  </p>
                </div>
                
                <div className="h-[600px] bg-gray-50 dark:bg-gray-900">
                  <TestPreview extractedCustomization={result.extractedCustomization} />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Instructions */}
        {!result && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">How This Works</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Enter any betting site URL to analyze its design and features</li>
              <li>• We'll extract colors, typography, navigation structure, and unique elements</li>
              <li>• See how these customizations would look applied to our betting app</li>
              <li>• This is completely safe - no changes to your existing system</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}