import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OperatorTheme {
  id: string;
  name: string;
  logo?: string;
  banner?: string;
  colors: {
    // Header & Navigation
    headerBg: string;
    headerText: string;
    navBg: string;
    navText: string;
    navHover: string;
    navActive: string;
    
    // Primary Colors
    primary: string;
    primaryHover: string;
    primaryText: string;
    
    // Secondary Colors
    secondary: string;
    secondaryHover: string;
    secondaryText: string;
    
    // UI Elements
    background: string;
    surface: string;
    border: string;
    text: string;
    textMuted: string;
    
    // Betting Slip
    slipBg: string;
    slipBorder: string;
    slipHeader: string;
    
    // Status Colors
    success: string;
    warning: string;
    error: string;
    
    // Odds Selection Colors
    oddsDefaultBg: string;
    oddsDefaultText: string;
    oddsDefaultBorder: string;
    oddsSelectionBg: string;
    oddsSelectionText: string;
    oddsSelectionBorder: string;
    oddsSelectionHoverBg: string;
    oddsSelectionHoverText: string;
    oddsSelectionHoverBorder: string;
  };
  typography: {
    fontFamily: string;
    headingFont?: string;
    fontSize: {
      base: string;
      sm: string;
      lg: string;
      xl: string;
    };
  };
  layout: {
    borderRadius: string;
    spacing: 'compact' | 'normal' | 'spacious';
    sidebarPosition: 'left' | 'right';
    slipStyle: 'minimal' | 'detailed' | 'compact';
  };
  components: {
    buttons: {
      style: 'rounded' | 'square' | 'pill';
      shadow: boolean;
    };
    cards: {
      shadow: 'none' | 'sm' | 'md' | 'lg';
      border: boolean;
    };
    inputs: {
      style: 'outlined' | 'filled' | 'underlined';
    };
  };
  navigation?: {
    icons?: { [key: string]: string };
    structure?: string[];
    style?: 'sidebar' | 'top' | 'tabs';
  };
}

export const defaultTheme: OperatorTheme = {
  id: 'default',
  name: 'Default Theme',
  colors: {
    // Header & Navigation
    headerBg: '#ffffff',
    headerText: '#111827',
    navBg: '#f9fafb',
    navText: '#4b5563',
    navHover: '#e5e7eb',
    navActive: '#111827',
    
    // Primary Colors
    primary: '#111827',
    primaryHover: '#374151',
    primaryText: '#ffffff',
    
    // Secondary Colors
    secondary: '#8b5cf6',
    secondaryHover: '#7c3aed',
    secondaryText: '#ffffff',
    
    // UI Elements
    background: '#f9fafb',
    surface: '#ffffff',
    border: '#e5e7eb',
    text: '#111827',
    textMuted: '#6b7280',
    
    // Betting Slip
    slipBg: '#ffffff',
    slipBorder: '#d1d5db',
    slipHeader: '#f3f4f6',
    
    // Status Colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    
    // Odds Selection Colors
    oddsDefaultBg: '#ffffff',
    oddsDefaultText: '#111827',
    oddsDefaultBorder: '#d1d5db',
    oddsSelectionBg: '#000000',
    oddsSelectionText: '#ffffff',
    oddsSelectionBorder: '#000000',
    oddsSelectionHoverBg: '#1f2937',
    oddsSelectionHoverText: '#ffffff',
    oddsSelectionHoverBorder: '#1f2937',
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      base: '16px',
      sm: '14px',
      lg: '18px',
      xl: '20px',
    },
  },
  layout: {
    borderRadius: '0.5rem',
    spacing: 'normal',
    sidebarPosition: 'left',
    slipStyle: 'detailed',
  },
  components: {
    buttons: {
      style: 'rounded',
      shadow: false,
    },
    cards: {
      shadow: 'sm',
      border: true,
    },
    inputs: {
      style: 'outlined',
    },
  },
};

export const paddyPowerTheme: OperatorTheme = {
  id: 'paddy-power',
  name: 'Paddy Power Style',
  logo: '/knowledge/images/logos/paddy power/paddypower-seeklogo.png',
  colors: {
    // Header & Navigation - matching screenshot
    headerBg: '#ffffff',
    headerText: '#000000',
    navBg: '#f8f8f8',
    navText: '#333333',
    navHover: '#e8e8e8',
    navActive: '#10a958',
    
    // Primary Colors - Paddy Power green
    primary: '#10a958',
    primaryHover: '#0e8e49',
    primaryText: '#ffffff',
    
    // Secondary Colors
    secondary: '#ffc61e',
    secondaryHover: '#ffb800',
    secondaryText: '#000000',
    
    // UI Elements
    background: '#f8f8f8',
    surface: '#ffffff',
    border: '#e0e0e0',
    text: '#000000',
    textMuted: '#666666',
    
    // Betting Slip
    slipBg: '#ffffff',
    slipBorder: '#e0e0e0',
    slipHeader: '#10a958',
    
    // Status Colors
    success: '#10a958',
    warning: '#ffc61e',
    error: '#ff0000',
    
    // Odds Selection Colors
    oddsDefaultBg: '#ffffff',
    oddsDefaultText: '#000000',
    oddsDefaultBorder: '#e0e0e0',
    oddsSelectionBg: '#000000',
    oddsSelectionText: '#ffc61e',
    oddsSelectionBorder: '#000000',
    oddsSelectionHoverBg: '#333333',
    oddsSelectionHoverText: '#ffc61e',
    oddsSelectionHoverBorder: '#333333',
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    headingFont: 'Arial Black, sans-serif',
    fontSize: {
      base: '14px',
      sm: '12px',
      lg: '16px',
      xl: '18px',
    },
  },
  layout: {
    borderRadius: '4px',
    spacing: 'compact',
    sidebarPosition: 'left',
    slipStyle: 'compact',
  },
  components: {
    buttons: {
      style: 'square',
      shadow: false,
    },
    cards: {
      shadow: 'none',
      border: true,
    },
    inputs: {
      style: 'outlined',
    },
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
      entertainment: '🎬',
      darts: '🎯',
      formula_1: '🏎️',
      mma: '🥊',
      snooker: '🎱'
    },
    structure: ['Sports', 'In-Play', 'Virtuals', 'Lotteries', 'Games', 'Live Casino', 'Bingo', 'Poker'],
    style: 'sidebar'
  },
};

export interface Brand {
  id: string;
  name: string;
  theme: OperatorTheme;
  createdAt: string;
  updatedAt: string;
  extractionUrl?: string; // Store the last extraction URL per brand
  websiteUrl?: string; // Store the brand's website URL
}

interface ThemeConfigState {
  brands: Brand[];
  currentBrandId: string | null;
  currentTheme: OperatorTheme;
  createBrand: (name: string, theme?: OperatorTheme) => Brand;
  updateBrand: (brandId: string, updates: Partial<Brand>) => void;
  deleteBrand: (brandId: string) => void;
  selectBrand: (brandId: string) => void;
  updateCurrentTheme: (updates: Partial<OperatorTheme>) => void;
  saveCurrentTheme: () => void;
  loadPreset: (preset: 'default' | 'paddy-power') => void;
}

// Default brands
const defaultBrand: Brand = {
  id: 'default',
  name: 'BETCO',
  theme: defaultTheme,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const paddyPowerBrand: Brand = {
  id: 'paddy-power',
  name: 'Paddy Power',
  theme: paddyPowerTheme,
  createdAt: new Date().toISOString(),
  updatedAt: new Date('2024-01-15T12:00:00Z').toISOString(), // Updated timestamp to force refresh
  websiteUrl: 'https://www.paddypower.com',
  extractionUrl: 'https://www.paddypower.com/football'
};

export const useThemeConfigStore = create<ThemeConfigState>()(
  persist(
    (set, get) => ({
      brands: [], // Start empty, let persist rehydrate saved brands
      currentBrandId: 'default',
      currentTheme: defaultTheme,
      
      createBrand: (name: string, theme?: OperatorTheme) => {
        const newBrand: Brand = {
          id: `brand-${Date.now()}`,
          name,
          theme: theme || { ...defaultTheme, id: `theme-${Date.now()}`, name },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set({ brands: [...get().brands, newBrand] });
        return newBrand;
      },
      
      updateBrand: (brandId: string, updates: Partial<Brand>) => {
        const { brands } = get();
        const brandIndex = brands.findIndex(b => b.id === brandId);
        
        if (brandIndex >= 0) {
          const updatedBrands = [...brands];
          updatedBrands[brandIndex] = {
            ...updatedBrands[brandIndex],
            ...updates,
            updatedAt: new Date().toISOString(),
          };
          set({ brands: updatedBrands });
          
          // If updating current brand, update current theme too
          if (brandId === get().currentBrandId && updates.theme) {
            set({ currentTheme: updates.theme });
            applyThemeToDocument(updates.theme);
          }
        }
      },
      
      deleteBrand: (brandId: string) => {
        const { brands, currentBrandId } = get();
        if (brands.length <= 1) return; // Don't delete last brand
        
        const newBrands = brands.filter(b => b.id !== brandId);
        set({ brands: newBrands });
        
        // If deleting current brand, switch to first available
        if (brandId === currentBrandId && newBrands.length > 0) {
          get().selectBrand(newBrands[0].id);
        }
      },
      
      selectBrand: (brandId: string) => {
        const brand = get().brands.find(b => b.id === brandId);
        if (brand) {
          // Create a deep copy of the brand's theme to avoid reference issues
          const themeCopy = JSON.parse(JSON.stringify(brand.theme));
          set({ 
            currentBrandId: brandId,
            currentTheme: themeCopy 
          });
          applyThemeToDocument(themeCopy);
          console.log('Selected brand:', brand.name, 'Theme:', themeCopy);
        }
      },
      
      updateCurrentTheme: (updates: Partial<OperatorTheme>) => {
        const newTheme = { ...get().currentTheme, ...updates };
        set({ currentTheme: newTheme });
        applyThemeToDocument(newTheme);
      },
      
      saveCurrentTheme: () => {
        const { currentBrandId, currentTheme } = get();
        if (currentBrandId) {
          get().updateBrand(currentBrandId, { theme: currentTheme });
          // Ensure theme is applied after saving
          applyThemeToDocument(currentTheme);
        }
      },
      
      loadPreset: (preset: 'default' | 'paddy-power') => {
        const theme = preset === 'default' ? defaultTheme : paddyPowerTheme;
        set({ currentTheme: theme });
        applyThemeToDocument(theme);
      },
    }),
    {
      name: 'mykro-theme-config',
      onRehydrateStorage: () => (state) => {
        if (state) {
          // If no brands were loaded from storage, initialize with defaults
          if (!state.brands || state.brands.length === 0) {
            console.log('No brands found in storage, initializing with defaults');
            state.brands = [defaultBrand, paddyPowerBrand];
          } else {
            console.log(`Loaded ${state.brands.length} brands from storage:`, state.brands.map(b => b.name));
            
            // Ensure default brand exists
            const hasDefault = state.brands.some(b => b.id === 'default');
            if (!hasDefault) {
              state.brands.unshift(defaultBrand);
            }
            
            // Merge updated Paddy Power brand if it exists in storage but lacks navigation
            const paddyPowerIndex = state.brands.findIndex(b => b.id === 'paddy-power');
            if (paddyPowerIndex >= 0 && !state.brands[paddyPowerIndex].theme.navigation?.icons) {
              console.log('Updating Paddy Power brand with navigation icons...');
              state.brands[paddyPowerIndex] = {
                ...state.brands[paddyPowerIndex],
                theme: paddyPowerTheme,
                updatedAt: new Date('2024-01-15T12:00:00Z').toISOString()
              };
            }
          }
          
          // Apply the current theme after rehydration
          const currentBrand = state.brands.find(b => b.id === state.currentBrandId);
          if (currentBrand) {
            applyThemeToDocument(currentBrand.theme);
          } else {
            applyThemeToDocument(state.currentTheme);
          }
        }
      },
    }
  )
);

// Helper function to apply theme CSS variables to document
function applyThemeToDocument(theme: OperatorTheme) {
  console.log('Applying theme to document:', theme.name, theme.colors); // Debug log
  const root = document.documentElement;
  
  // Apply colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--theme-${key}`, value);
  });
  
  // Apply typography
  root.style.setProperty('--theme-font-family', theme.typography.fontFamily);
  if (theme.typography.headingFont) {
    root.style.setProperty('--theme-heading-font', theme.typography.headingFont);
  }
  
  // Apply layout
  root.style.setProperty('--theme-border-radius', theme.layout.borderRadius);
  
  // Apply spacing scale
  const spacingScale = {
    compact: 0.75,
    normal: 1,
    spacious: 1.25,
  };
  root.style.setProperty('--theme-spacing-scale', spacingScale[theme.layout.spacing].toString());
}