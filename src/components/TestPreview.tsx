import React, { useEffect, useRef } from 'react';
import { ExtractedCustomization } from '../TestBranding';

interface TestPreviewProps {
  extractedCustomization: ExtractedCustomization;
}

export function TestPreview({ extractedCustomization }: TestPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      // Just load the actual betting app with extracted theme applied via URL parameters
      const baseUrl = '/betco/browse-bets';
      const themeParams = new URLSearchParams({
        'preview': 'true',
        'primary': extractedCustomization.colors.primary || '#6366f1',
        'secondary': extractedCustomization.colors.secondary || '#8b5cf6',
        'font': extractedCustomization.typography.fontFamily || 'system-ui'
      });
      
      // Add navigation icons if available
      if (extractedCustomization.navigation.icons) {
        themeParams.set('icons', JSON.stringify(extractedCustomization.navigation.icons));
      }
      
      // Create a unique URL to force iframe reload when customization changes
      const previewUrl = `${baseUrl}?${themeParams.toString()}&t=${Date.now()}`;
      iframeRef.current.src = previewUrl;
    }
  }, [extractedCustomization]);

  return (
    <div className="w-full h-full relative">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Betting App with Applied Theme"
        sandbox="allow-same-origin allow-scripts"
      />
      
      {/* Overlay showing what's being applied */}
      <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs p-2 rounded max-w-xs">
        <div>Primary: {extractedCustomization.colors.primary}</div>
        <div>Font: {extractedCustomization.typography.fontFamily}</div>
        {extractedCustomization.navigation.icons && Object.keys(extractedCustomization.navigation.icons).length > 0 && (
          <div className="mt-2">
            Icons: {Object.keys(extractedCustomization.navigation.icons).length} sports
          </div>
        )}
      </div>
    </div>
  );
}