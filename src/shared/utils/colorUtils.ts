// Utility functions for color manipulation and calculation

// Convert hex to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Calculate relative luminance
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Determine if text should be light or dark based on background
export function getContrastText(backgroundColor: string): string {
  const rgb = hexToRgb(backgroundColor);
  if (!rgb) return '#000000';
  
  const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

// Generate a darker shade of a color for hover states
export function darken(color: string, amount: number = 0.1): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const factor = 1 - amount;
  const r = Math.round(rgb.r * factor);
  const g = Math.round(rgb.g * factor);
  const b = Math.round(rgb.b * factor);
  
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

// Generate a lighter shade of a color
export function lighten(color: string, amount: number = 0.1): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const factor = amount;
  const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * factor));
  const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * factor));
  const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * factor));
  
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

// Generate a complete theme from just a few base colors
export interface SimpleThemeColors {
  primary: string;      // Main brand color for buttons/CTAs
  navigation: string;   // Navigation bar background
  accent: string;       // Odds selections, highlights
}

export function generateFullTheme(simpleColors: SimpleThemeColors) {
  return {
    // Header & Navigation
    headerBg: simpleColors.navigation,
    headerText: getContrastText(simpleColors.navigation),
    navBg: lighten(simpleColors.navigation, 0.05),
    navText: getContrastText(simpleColors.navigation),
    navHover: lighten(simpleColors.navigation, 0.1),
    navActive: simpleColors.primary,
    
    // Primary Colors
    primary: simpleColors.primary,
    primaryHover: darken(simpleColors.primary, 0.1),
    primaryText: getContrastText(simpleColors.primary),
    
    // Secondary Colors (use accent)
    secondary: simpleColors.accent,
    secondaryHover: darken(simpleColors.accent, 0.1),
    secondaryText: getContrastText(simpleColors.accent),
    
    // UI Elements
    background: '#f9fafb',
    surface: '#ffffff',
    border: '#e5e7eb',
    text: '#111827',
    textMuted: '#6b7280',
    
    // Betting Slip
    slipBg: '#ffffff',
    slipBorder: lighten(simpleColors.primary, 0.7),
    slipHeader: lighten(simpleColors.primary, 0.9),
    
    // Status Colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  };
}