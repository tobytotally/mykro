import React from 'react';
import { useThemeConfigStore } from '../../stores/themeConfigStore';
import * as Icons from './PaddyPowerIcons';

interface SportIconProps {
  sport: string;
  className?: string;
}

// Map sport names to icon components
const sportIconMap: Record<string, React.FC<{ className?: string; color?: string }>> = {
  // Main sports
  'football': Icons.FootballIcon,
  'horse_racing': Icons.HorseRacingIcon,
  'horse racing': Icons.HorseRacingIcon,
  'tennis': Icons.TennisIcon,
  'basketball': Icons.BasketballIcon,
  'cricket': Icons.CricketIcon,
  'rugby': Icons.RugbyIcon,
  'golf': Icons.GolfIcon,
  
  // Quick Links
  'today\'s specials': Icons.SpecialsIcon,
  'live now': Icons.LiveIcon,
  'starting soon': Icons.ClockIcon,
  'outright betting': Icons.TrophyIcon,
  
  // All Sports
  'american football': Icons.AmericanFootballIcon,
  'american_football': Icons.AmericanFootballIcon,
  'baseball': Icons.BaseballIcon,
  'boxing': Icons.BoxingIcon,
  'darts': Icons.DartsIcon,
  'esports': Icons.EsportsIcon,
  'formula 1': Icons.FormulaOneIcon,
  'formula_1': Icons.FormulaOneIcon,
  'ice hockey': Icons.IceHockeyIcon,
  'ice_hockey': Icons.IceHockeyIcon,
  'mma': Icons.MMAIcon,
  'snooker': Icons.SnookerIcon,
  
  // Additional
  'greyhound': Icons.GreyhoundIcon,
  'greyhound racing': Icons.GreyhoundIcon,
  'lotteries': Icons.LotteriesIcon,
  'virtuals': Icons.VirtualsIcon,
  'in-play': Icons.LiveIcon,
  'in_play': Icons.LiveIcon,
  'promotions': Icons.PromotionsIcon,
  'racing results': Icons.RacingIcon,
  'shop exclusives': Icons.ShopIcon,
  'games': Icons.GamesIcon,
};

// Emoji fallbacks for icons not in the SVG set
const emojiFallbacks: Record<string, string> = {
  'live_streaming': '📺',
  'politics': '🗳️',
  'entertainment': '🎬',
  'specials': '🌟',
  'cycling': '🚴',
  'motorsports': '🏎️',
};

export function SportIcon({ sport, className = "w-5 h-5 mr-2" }: SportIconProps) {
  const { currentTheme } = useThemeConfigStore();
  const sportKey = sport.toLowerCase().replace(/\s+/g, '_');
  
  // Use dark green color for Paddy Power theme
  const isPaddyPower = currentTheme.id === 'paddy-power' || currentTheme.name.toLowerCase().includes('paddy');
  const iconColor = isPaddyPower ? '#004833' : '#666666';
  
  // Try to find SVG icon component
  const IconComponent = sportIconMap[sport.toLowerCase()] || sportIconMap[sportKey];
  
  if (IconComponent) {
    return <IconComponent className={className} color={iconColor} />;
  }
  
  // Fallback to emoji with CSS filter for Paddy Power
  const emojiIcon = emojiFallbacks[sportKey] || emojiFallbacks[sport.toLowerCase()] || '⚽';
  
  if (isPaddyPower) {
    return (
      <span 
        className={`inline-flex items-center justify-center ${className}`}
        style={{ 
          fontSize: '1.25rem',
          fontWeight: 'bold',
          filter: 'grayscale(100%) sepia(100%) hue-rotate(120deg) saturate(2) brightness(0.4)'
        }}
      >
        {emojiIcon}
      </span>
    );
  }
  
  return (
    <span 
      className={`inline-flex items-center justify-center ${className}`}
      style={{ 
        fontSize: '1.25rem',
        fontWeight: 'bold'
      }}
    >
      {emojiIcon}
    </span>
  );
}