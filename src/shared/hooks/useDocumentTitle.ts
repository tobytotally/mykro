import { useEffect } from 'react';

/**
 * Custom hook to update document title with section name prefix
 * @param title - The page title
 * @param section - Optional section name (defaults to 'Mykro')
 */
export function useDocumentTitle(title: string, section?: string) {
  useEffect(() => {
    const sectionPrefix = section || 'Mykro';
    const fullTitle = `${title} - ${sectionPrefix}`;
    
    // Store the original title to restore it when component unmounts
    const originalTitle = document.title;
    
    document.title = fullTitle;
    
    // Cleanup function to restore original title
    return () => {
      document.title = originalTitle;
    };
  }, [title, section]);
}