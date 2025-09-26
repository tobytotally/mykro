import { useEffect } from 'react';
import { useThemeConfigStore } from '../../stores/themeConfigStore';

export function useOperatorTheme() {
  const { currentTheme } = useThemeConfigStore();

  useEffect(() => {
    // Apply theme CSS variables when theme changes
    applyThemeToDocument();
  }, [currentTheme]);

  const applyThemeToDocument = () => {
    const root = document.documentElement;
    
    // Apply colors
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
    
    // Apply typography
    root.style.setProperty('--theme-font-family', currentTheme.typography.fontFamily);
    if (currentTheme.typography.headingFont) {
      root.style.setProperty('--theme-heading-font', currentTheme.typography.headingFont);
    }
    
    // Apply font sizes
    Object.entries(currentTheme.typography.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--theme-font-${key}`, value);
    });
    
    // Apply layout
    root.style.setProperty('--theme-border-radius', currentTheme.layout.borderRadius);
    
    // Apply spacing scale
    const spacingScale = {
      compact: 0.75,
      normal: 1,
      spacious: 1.25,
    };
    root.style.setProperty('--theme-spacing-scale', spacingScale[currentTheme.layout.spacing].toString());
    
    // Apply component styles
    root.style.setProperty('--theme-button-radius', getButtonRadius());
    root.style.setProperty('--theme-card-shadow', getCardShadow());
  };

  const getButtonRadius = () => {
    switch (currentTheme.components.buttons.style) {
      case 'square': return '0';
      case 'rounded': return currentTheme.layout.borderRadius;
      case 'pill': return '9999px';
      default: return currentTheme.layout.borderRadius;
    }
  };

  const getCardShadow = () => {
    switch (currentTheme.components.cards.shadow) {
      case 'none': return 'none';
      case 'sm': return '0 1px 2px 0 rgb(0 0 0 / 0.05)';
      case 'md': return '0 4px 6px -1px rgb(0 0 0 / 0.1)';
      case 'lg': return '0 10px 15px -3px rgb(0 0 0 / 0.1)';
      default: return '0 1px 2px 0 rgb(0 0 0 / 0.05)';
    }
  };

  // Helper function to get theme-aware classes
  const getThemeClasses = (element: 'button' | 'card' | 'input' | 'header' | 'nav') => {
    switch (element) {
      case 'button':
        return {
          primary: `bg-[var(--theme-primary)] hover:bg-[var(--theme-primaryHover)] text-[var(--theme-primaryText)] rounded-[var(--theme-button-radius)]`,
          secondary: `bg-[var(--theme-secondary)] hover:bg-[var(--theme-secondaryHover)] text-[var(--theme-secondaryText)] rounded-[var(--theme-button-radius)]`,
          outline: `border border-[var(--theme-border)] text-[var(--theme-text)] hover:bg-[var(--theme-surface)] rounded-[var(--theme-button-radius)]`,
        };
      
      case 'card':
        return `bg-[var(--theme-surface)] border-[var(--theme-border)] rounded-[var(--theme-border-radius)] shadow-[var(--theme-card-shadow)]`;
      
      case 'input':
        const inputStyles = {
          outlined: `border border-[var(--theme-border)] bg-[var(--theme-surface)] rounded-[var(--theme-border-radius)]`,
          filled: `bg-[var(--theme-surface)] border-b-2 border-[var(--theme-border)]`,
          underlined: `bg-transparent border-b border-[var(--theme-border)]`,
        };
        return inputStyles[currentTheme.components.inputs.style];
      
      case 'header':
        return `bg-[var(--theme-headerBg)] text-[var(--theme-headerText)]`;
      
      case 'nav':
        return {
          bg: `bg-[var(--theme-navBg)]`,
          text: `text-[var(--theme-navText)]`,
          hover: `hover:bg-[var(--theme-navHover)]`,
          active: `text-[var(--theme-navActive)]`,
        };
      
      default:
        return '';
    }
  };

  return {
    theme: currentTheme,
    getThemeClasses,
    applyThemeToDocument,
  };
}