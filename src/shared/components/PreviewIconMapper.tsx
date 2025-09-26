import React from 'react';
import { useBrand } from '../../contexts/BrandContext';
import { useThemeConfigStore } from '../../stores/themeConfigStore';

interface PreviewIconMapperProps {
  sportName: string;
  className?: string;
}

export function PreviewIconMapper({ sportName, className = "text-lg mr-2" }: PreviewIconMapperProps) {
  const { previewIcons, currentBrand } = useBrand();
  const { currentTheme } = useThemeConfigStore();
  
  // Check both preview icons and brand-specific navigation icons
  const icons = previewIcons || currentTheme.navigation?.icons || currentBrand?.theme?.navigation?.icons;
  
  
  if (!icons) return null;
  
  // Map sport names to the icon keys used in the preview data
  const sportKeyMap: Record<string, string> = {
    'football': 'football',
    'tennis': 'tennis', 
    'basketball': 'basketball',
    'cricket': 'cricket',
    'rugby': 'rugby',
    'golf': 'golf',
    'american football': 'american_football',
    'baseball': 'baseball',
    'boxing': 'boxing',
    'darts': 'darts',
    'esports': 'esports',
    'formula 1': 'formula_1',
    'horse racing': 'horse_racing',
    'ice hockey': 'ice_hockey',
    'mma': 'mma', // MMA has its own icon in the brand config
    'snooker': 'snooker',
    'cycling': 'cycling',
    // Quick Links mappings
    'today\'s specials': 'specials',
    'live now': 'in_play',
    'starting soon': 'in_play',
    'outright betting': 'specials',
    // Additional sports from preview data
    'greyhound': 'greyhound',
    'lotteries': 'lotteries',
    'virtuals': 'virtuals',
    'politics': 'politics',
    'entertainment': 'entertainment',
    // Additional mappings for brand icons
    'formula 1': 'formula_1',
    'formula_1': 'formula_1'
  };
  
  const sportKey = sportKeyMap[sportName.toLowerCase()];
  const icon = sportKey ? icons[sportKey] : null;
  
  if (!icon) return null;
  
  return <span className={className}>{icon}</span>;
}