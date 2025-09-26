import { useEffect } from 'react';
import { useOperatorTheme } from '../shared/hooks/useOperatorTheme';
import { useBrand } from '../contexts/BrandContext';

export function ThemeApplier({ children }: { children: React.ReactNode }) {
  const { currentBrand, previewTheme } = useBrand();
  const { applyThemeToDocument, theme } = useOperatorTheme();
  
  useEffect(() => {
    // Apply theme whenever brand changes
    console.log('ThemeApplier: Applying theme for brand:', currentBrand?.name);
    console.log('ThemeApplier: Current theme colors:', theme.colors);
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      applyThemeToDocument();
      
      // Apply preview theme overrides if present
      if (previewTheme) {
        console.log('ThemeApplier: Applying preview theme overrides:', previewTheme);
        Object.entries(previewTheme).forEach(([property, value]) => {
          document.documentElement.style.setProperty(property, value);
        });
      }
    }, 10);
    
    return () => clearTimeout(timer);
  }, [currentBrand, previewTheme, applyThemeToDocument, theme]);
  
  return <>{children}</>;
}