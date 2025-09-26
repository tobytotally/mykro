import { useParams } from 'react-router-dom';
import { useBrand } from '../../contexts/BrandContext';

export function useBrandNavigation() {
  const params = useParams<{ brandSlug?: string }>();
  const { brandSlug } = useBrand();
  
  // Get brand slug from either params or context
  const currentBrandSlug = params.brandSlug || brandSlug;
  
  // Helper function to create brand-aware paths
  const getBrandPath = (path: string) => {
    if (!currentBrandSlug) {
      return path;
    }
    
    // If path already contains the brand slug, return as is
    if (path.includes(currentBrandSlug)) {
      return path;
    }
    
    // Add brand slug to the end of the path
    return `${path}/${currentBrandSlug}`;
  };
  
  return {
    brandSlug: currentBrandSlug,
    getBrandPath,
  };
}