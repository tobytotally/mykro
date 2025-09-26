import React, { createContext, useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useThemeConfigStore, Brand } from '../stores/themeConfigStore';

interface BrandContextType {
  currentBrand: Brand | null;
  brandSlug: string | null;
  previewTheme: Record<string, string> | null;
  previewIcons: Record<string, string> | null;
}

const BrandContext = createContext<BrandContextType>({
  currentBrand: null,
  brandSlug: null,
  previewTheme: null,
  previewIcons: null,
});

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};

interface BrandProviderProps {
  children: React.ReactNode;
}

export function BrandProvider({ children }: BrandProviderProps) {
  const location = useLocation();
  const { brands, selectBrand, currentBrandId } = useThemeConfigStore();
  const [brandSlug, setBrandSlug] = useState<string | null>(null);
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
  const [previewTheme, setPreviewTheme] = useState<Record<string, string> | null>(null);
  const [previewIcons, setPreviewIcons] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    // Check for preview theme parameters
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('preview') === 'true') {
      const previewColors: Record<string, string> = {};
      
      // Extract theme parameters
      const primary = searchParams.get('primary');
      const secondary = searchParams.get('secondary');
      const font = searchParams.get('font');
      
      if (primary) previewColors['--theme-primary'] = primary;
      if (secondary) previewColors['--theme-secondary'] = secondary;
      if (font) previewColors['--theme-font-family'] = font;
      
      if (Object.keys(previewColors).length > 0) {
        console.log('BrandContext: Preview theme detected:', previewColors);
        setPreviewTheme(previewColors);
      }
      
      // Extract icons parameters
      const iconsParam = searchParams.get('icons');
      if (iconsParam) {
        try {
          const icons = JSON.parse(decodeURIComponent(iconsParam));
          console.log('BrandContext: Preview icons detected:', icons);
          setPreviewIcons(icons);
        } catch (error) {
          console.warn('BrandContext: Failed to parse icons parameter:', error);
          setPreviewIcons(null);
        }
      } else {
        setPreviewIcons(null);
      }
    } else {
      setPreviewTheme(null);
      setPreviewIcons(null);
    }

    // Don't interfere with brand selection on the branding page
    if (location.pathname === '/betco/branding') {
      console.log('BrandContext: On branding page, not changing brand based on URL');
      const currentBrandFromStore = brands.find(b => b.id === currentBrandId);
      setCurrentBrand(currentBrandFromStore || null);
      setBrandSlug(currentBrandFromStore ? currentBrandFromStore.name.toLowerCase().replace(/\s+/g, '-') : null);
      return;
    }
    
    // Extract brand slug from URL
    const pathParts = location.pathname.split('/').filter(part => part !== '');
    
    // Check if we're in a betco route (not branding)
    const isBetcoRoute = pathParts.includes('betco') && !location.pathname.includes('/betco/branding');
    
    if (isBetcoRoute && pathParts.length >= 3) {
      // For paths like /betco/browse-bets/paddy-power
      const potentialBrandSlug = pathParts[pathParts.length - 1];
      
      // Check if this could be a brand (not a known page)
      const knownPages = ['browse-bets', 'sports', 'live', 'casino', 'promotions', 'bet-slip', 'account', 'mykro'];
      if (!knownPages.includes(potentialBrandSlug)) {
        // Check if it matches a brand
        const matchingBrand = brands.find(b => 
          b.name.toLowerCase().replace(/\s+/g, '-') === potentialBrandSlug
        );
        
        if (matchingBrand) {
          console.log('BrandContext: Found matching brand:', matchingBrand.name, 'from URL:', location.pathname);
          setBrandSlug(potentialBrandSlug);
          setCurrentBrand(matchingBrand);
          
          // Select the brand in the theme store if it's not already selected
          if (matchingBrand.id !== currentBrandId) {
            console.log('BrandContext: Selecting brand:', matchingBrand.id);
            selectBrand(matchingBrand.id);
          }
          return;
        }
      }
    }
    
    // For betco routes without a brand, always use default
    if (isBetcoRoute) {
      console.log('BrandContext: Betco route without brand, using default. Path:', location.pathname);
      setBrandSlug(null);
      const defaultBrand = brands.find(b => b.id === 'default');
      
      if (defaultBrand) {
        setCurrentBrand(defaultBrand);
        // Only select if not already selected to avoid loops
        if (currentBrandId !== defaultBrand.id) {
          console.log('BrandContext: Selecting default brand');
          selectBrand(defaultBrand.id);
        }
      }
    }
  }, [location.pathname, location.search, brands, selectBrand, currentBrandId]);

  return (
    <BrandContext.Provider value={{ currentBrand, brandSlug, previewTheme, previewIcons }}>
      {children}
    </BrandContext.Provider>
  );
}