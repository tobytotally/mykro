import React, { useState, useEffect } from 'react';
import { Card } from '../../../../shared/components/UI/Card';
import { Button } from '../../../../shared/components/UI/Button';
import { useThemeConfigStore, OperatorTheme, Brand } from '../../../../stores/themeConfigStore';
import { PhotoIcon, SwatchIcon, PlusIcon, TrashIcon, CheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { themeExtractorService, ThemeExtractionResult } from '../../../../shared/services/themeExtractor.service';
import { aiDesignAnalyzerService, AIDesignResult } from '../../../../shared/services/aiDesignAnalyzer.service';
import { generateFullTheme, SimpleThemeColors } from '../../../../shared/utils/colorUtils';
import { LogoEditor } from '../../components/LogoEditor';
import { useDocumentTitle } from '../../../../shared/hooks/useDocumentTitle';

// Color input component with hex code input
const ColorInput: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}> = ({ label, value, onChange, placeholder = "#000000" }) => {
  return (
    <div>
      <label className="text-xs text-gray-600">{label}</label>
      <div className="flex items-center gap-2 mt-1">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-10 border-2 border-gray-300 rounded cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            if (/^#[0-9A-Fa-f]{0,6}$/.test(newValue)) {
              onChange(newValue);
            }
          }}
          className="w-20 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-purple-500"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export function BrandingPage() {
  useDocumentTitle('Branding');
  
  const { 
    brands, 
    currentBrandId, 
    currentTheme, 
    createBrand, 
    updateBrand, 
    deleteBrand, 
    selectBrand, 
    updateCurrentTheme, 
    saveCurrentTheme, 
    loadPreset 
  } = useThemeConfigStore();
  
  const [activeTab, setActiveTab] = useState<'identity' | 'colors' | 'typography' | 'layout' | 'navigation'>('identity');
  const [showPreview, setShowPreview] = useState(true);
  const [showNewBrandDialog, setShowNewBrandDialog] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // URL extraction state
  const [extractionUrl, setExtractionUrl] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionResult, setExtractionResult] = useState<ThemeExtractionResult | null>(null);
  const [showExtractionPreview, setShowExtractionPreview] = useState(false);
  const [highlightedElement, setHighlightedElement] = useState<string | null>(null);
  
  // AI Design state
  const [aiDesignUrl, setAiDesignUrl] = useState('');
  const [isGeneratingDesign, setIsGeneratingDesign] = useState(false);
  const [aiDesignResult, setAiDesignResult] = useState<AIDesignResult | null>(null);
  const [showAiDesignPreview, setShowAiDesignPreview] = useState(false);
  
  // Simplified color state
  const [simpleColors, setSimpleColors] = useState<SimpleThemeColors>({
    primary: currentTheme.colors.primary,
    navigation: currentTheme.colors.headerBg,
    accent: currentTheme.colors.secondary,
  });
  
  // Logo editor state
  const [showLogoEditor, setShowLogoEditor] = useState(false);
  const [tempLogoUrl, setTempLogoUrl] = useState<string>('');
  
  const currentBrand = brands.find(b => b.id === currentBrandId);

  // Reset unsaved changes and load brand-specific extraction URL when switching brands
  useEffect(() => {
    setHasUnsavedChanges(false);
    // Load the brand's last extraction URL if it exists
    setExtractionUrl(currentBrand?.extractionUrl || '');
    // Clear any previous extraction results
    setExtractionResult(null);
    // Update simple colors from current theme
    setSimpleColors({
      primary: currentTheme.colors.primary,
      navigation: currentTheme.colors.headerBg,
      accent: currentTheme.colors.secondary,
    });
  }, [currentBrandId, currentBrand, currentTheme]);

  // Send current theme to iframe when it loads or brand changes
  useEffect(() => {
    // Send theme after a short delay to ensure iframe is ready
    const timer = setTimeout(() => {
      updatePreviewTheme(currentTheme);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [currentBrandId, currentTheme]);

  // Function to highlight elements in preview
  const highlightPreviewElement = (elementType: string | null) => {
    const iframe = document.querySelector('iframe[title="Theme Preview"]') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage({ type: 'HIGHLIGHT_ELEMENT', elementType }, '*');
      } catch (error) {
        console.error('Failed to send highlight message to iframe:', error);
      }
    }
  };

  // Function to update preview iframe with new theme
  const updatePreviewTheme = (theme: OperatorTheme) => {
    console.log('Sending theme update to iframe:', theme.name, theme.colors.headerBg);
    const iframe = document.querySelector('iframe[title="Theme Preview"]') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      // Wait a bit if iframe is still loading
      const sendMessage = () => {
        try {
          iframe.contentWindow!.postMessage({ type: 'THEME_UPDATE', theme }, '*');
          console.log('PostMessage sent to iframe');
        } catch (error) {
          console.error('Failed to send message to iframe:', error);
        }
      };
      
      // Try to send immediately, then retry after a delay
      sendMessage();
      setTimeout(sendMessage, 100);
    } else {
      console.log('Iframe not found or contentWindow not available');
    }
  };

  // Helper function to update theme and preview
  const handleThemeChange = (updates: Partial<OperatorTheme>) => {
    console.log('handleThemeChange called with:', updates);
    
    // Merge the updates properly
    const newTheme = {
      ...currentTheme,
      ...updates,
      colors: {
        ...currentTheme.colors,
        ...(updates.colors || {})
      }
    };
    
    console.log('Current theme headerBg:', currentTheme.colors.headerBg);
    console.log('Updates:', updates);
    console.log('New theme after merge:', newTheme.colors.headerBg);
    
    updateCurrentTheme(updates);
    setHasUnsavedChanges(true);
    
    // Apply changes immediately to preview
    updatePreviewTheme(newTheme);
  };

  const handleColorChange = (colorKey: keyof OperatorTheme['colors'], value: string) => {
    handleThemeChange({
      colors: {
        ...currentTheme.colors,
        [colorKey]: value,
      },
    });
  };

  // Handle simplified color changes
  const handleSimpleColorChange = (colorKey: keyof SimpleThemeColors, value: string) => {
    const newSimpleColors = { ...simpleColors, [colorKey]: value };
    setSimpleColors(newSimpleColors);
    
    // Generate full theme from simple colors
    const fullColors = generateFullTheme(newSimpleColors);
    
    handleThemeChange({
      colors: {
        ...currentTheme.colors,
        ...fullColors,
      },
    });
  };

  const handleSaveTheme = () => {
    console.log('Saving theme:', currentTheme.colors); // Debug log
    saveCurrentTheme();
    setHasUnsavedChanges(false);
    
    // Small delay to ensure theme is applied before iframe reload
    setTimeout(() => {
      const iframe = document.querySelector('iframe[title="Theme Preview"]') as HTMLIFrameElement;
      if (iframe) {
        // Add a timestamp to force reload
        const url = new URL(iframe.src);
        url.searchParams.set('t', Date.now().toString());
        iframe.src = url.toString();
      }
    }, 100);
  };

  const handleCreateBrand = () => {
    if (newBrandName.trim()) {
      const newBrand = createBrand(newBrandName);
      selectBrand(newBrand.id);
      setNewBrandName('');
      setShowNewBrandDialog(false);
    }
  };

  const handleDeleteBrand = (brandId: string) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      deleteBrand(brandId);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File validation
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      e.target.value = '';
      return;
    }
    
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    
    reader.onloadend = () => {
      const logoData = reader.result as string;
      setTempLogoUrl(logoData);
      setShowLogoEditor(true);
    };
    
    reader.onerror = () => {
      alert('Error reading file. Please try again.');
      e.target.value = '';
    };
    
    reader.readAsDataURL(file);
    
    // Reset the input so the same file can be selected again
    e.target.value = '';
  };

  const handleLogoSave = (croppedLogoUrl: string) => {
    // Update current theme with cropped logo
    const updatedTheme = { ...currentTheme, logo: croppedLogoUrl };
    updateCurrentTheme({ logo: croppedLogoUrl });
    
    // Immediately save to the current brand
    if (currentBrandId) {
      updateBrand(currentBrandId, { 
        theme: updatedTheme,
        updatedAt: new Date().toISOString()
      });
    }
    
    // Update preview
    updatePreviewTheme(updatedTheme);
    setHasUnsavedChanges(false); // Already saved
    setShowLogoEditor(false);
    setTempLogoUrl('');
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const bannerData = reader.result as string;
        // Update current theme with banner
        const updatedTheme = { ...currentTheme, banner: bannerData };
        updateCurrentTheme({ banner: bannerData });
        
        // Immediately save to the current brand
        if (currentBrandId) {
          updateBrand(currentBrandId, { 
            theme: updatedTheme,
            updatedAt: new Date().toISOString()
          });
        }
        
        // Update preview
        updatePreviewTheme(updatedTheme);
        setHasUnsavedChanges(false); // Already saved
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExtractTheme = async () => {
    if (!extractionUrl.trim()) return;
    
    setIsExtracting(true);
    try {
      const result = await themeExtractorService.extractThemeFromUrl(extractionUrl);
      console.log('Extraction result:', result);
      setExtractionResult(result);
      if (result.success) {
        setShowExtractionPreview(true);
      }
    } catch (error) {
      console.error('Theme extraction failed:', error);
      setExtractionResult({
        success: false,
        error: 'Failed to extract theme from URL'
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleApplyExtractedTheme = () => {
    if (extractionResult?.suggestedTheme) {
      console.log('Applying extracted theme:', extractionResult.suggestedTheme);
      
      // Extract the main colors from the suggested theme
      const extractedColors = extractionResult.suggestedTheme.colors;
      if (extractedColors) {
        const newSimpleColors: SimpleThemeColors = {
          primary: extractedColors.primary || simpleColors.primary,
          navigation: extractedColors.headerBg || simpleColors.navigation,
          accent: extractedColors.secondary || simpleColors.accent,
        };
        
        console.log('New simple colors:', newSimpleColors);
        
        // Update state with new simple colors
        setSimpleColors(newSimpleColors);
        
        // Generate full theme from simple colors
        const fullColors = generateFullTheme(newSimpleColors);
        
        // Apply all colors and other properties at once
        const fullUpdate = {
          ...extractionResult.suggestedTheme,
          colors: {
            ...currentTheme.colors,
            ...fullColors,
          },
        };
        
        console.log('Full theme update:', fullUpdate);
        
        // Apply the complete theme update
        handleThemeChange(fullUpdate);
      }
      
      setShowExtractionPreview(false);
      setExtractionResult(null);
    }
  };

  const handleGenerateAiDesign = async () => {
    if (!aiDesignUrl.trim()) return;
    
    setIsGeneratingDesign(true);
    try {
      const result = await aiDesignAnalyzerService.analyzeAndGenerateDesign(aiDesignUrl);
      console.log('AI Design result:', result);
      setAiDesignResult(result);
      if (result.success) {
        setShowAiDesignPreview(true);
      }
    } catch (error) {
      console.error('AI design generation failed:', error);
      setAiDesignResult({
        success: false,
        error: 'Failed to generate design'
      });
    } finally {
      setIsGeneratingDesign(false);
    }
  };

  return (
    <div>
      {/* Logo Editor Modal */}
      {showLogoEditor && tempLogoUrl && (
        <LogoEditor
          imageUrl={tempLogoUrl}
          onSave={handleLogoSave}
          onCancel={() => {
            setShowLogoEditor(false);
            setTempLogoUrl('');
          }}
          aspectRatio={16/9} // You can adjust this for logo requirements
        />
      )}
      
      <div className="min-h-screen bg-gray-50 flex">
        {/* Brand List Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Brands</h2>
            <p className="text-sm text-gray-600 mt-1">Manage operator brands</p>
          </div>
          
          <div className="p-4">
            <button
            onClick={() => setShowNewBrandDialog(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
          >
            <PlusIcon className="h-4 w-4" />
            New Brand
          </button>
          
          {showNewBrandDialog && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="text"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                placeholder="Brand name"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateBrand()}
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleCreateBrand}
                  className="flex-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setNewBrandName('');
                    setShowNewBrandDialog(false);
                  }}
                  className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          <div className="mt-4 space-y-2">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
                  brand.id === currentBrandId
                    ? 'bg-green-50 border border-green-200'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
                onClick={() => {
                  console.log('Selecting brand:', brand.id, brand.name);
                  selectBrand(brand.id);
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium text-sm ${
                      brand.id === currentBrandId ? 'text-green-700' : 'text-gray-900'
                    }`}>
                      {brand.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Updated {new Date(brand.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {brand.id === currentBrandId && (
                      <CheckIcon className="h-4 w-4 text-green-600" />
                    )}
                    {brands.length > 1 && brand.id !== 'default' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBrand(brand.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-opacity"
                      >
                        <TrashIcon className="h-4 w-4 text-red-600" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Configuration Panel */}
        <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {currentBrand?.name} Configuration
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Customize the appearance
              </p>
            </div>

            {/* Tab Navigation with Save Button */}
            <div className="border-b border-gray-200">
              <div className="flex items-center justify-between">
                <nav className="-mb-px flex space-x-6">
                  {(['identity', 'colors', 'typography', 'layout', 'navigation'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                        activeTab === tab
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
                <Button 
                  onClick={handleSaveTheme} 
                  className={`text-sm px-4 py-1.5 mb-2 ${hasUnsavedChanges ? 'bg-green-600 hover:bg-green-700' : ''}`}
                >
                  {hasUnsavedChanges ? 'Save Changes*' : 'Save Changes'}
                </Button>
              </div>
            </div>

          {/* Tab Content */}
          {activeTab === 'identity' && (
            <div className="space-y-6">
              {/* URL Theme Extraction */}
              <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <GlobeAltIcon className="w-5 h-5" />
                  Extract Theme from URL
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={extractionUrl}
                        onChange={(e) => {
                          setExtractionUrl(e.target.value);
                          // Save the URL to the current brand
                          if (currentBrandId) {
                            updateBrand(currentBrandId, { extractionUrl: e.target.value });
                          }
                        }}
                        placeholder="https://betway.com/en/sports/cpn/soccer/10"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <Button 
                        onClick={handleExtractTheme}
                        disabled={isExtracting || !extractionUrl.trim()}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {isExtracting ? 'Extracting...' : 'Extract Theme'}
                      </Button>
                    </div>
                    
                    {extractionResult && !extractionResult.success && (
                      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-700">{extractionResult.error}</p>
                      </div>
                    )}
                    
                    {extractionResult?.success && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-sm text-green-700">
                          Theme extracted successfully! 
                          {extractionResult.warnings && extractionResult.warnings.length > 0 && (
                            <span className="block mt-1 text-yellow-600">
                              Warnings: {extractionResult.warnings.join(', ')}
                            </span>
                          )}
                        </p>
                        <div className="mt-2 flex gap-2">
                          <Button 
                            onClick={handleApplyExtractedTheme}
                            className="text-sm px-3 py-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            Apply Theme
                          </Button>
                          <Button 
                            onClick={() => setShowExtractionPreview(true)}
                            className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Preview
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <p>Enter a betting site URL to automatically extract colors, fonts, and layout styles.</p>
                    <p>Examples: betway.com, paddypower.com, bet365.com</p>
                  </div>
                </div>
              </Card>

              {/* AI Design Generation */}
              <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <GlobeAltIcon className="w-5 h-5" />
                  AI-Powered Page Design
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Generate Full Page Design from URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={aiDesignUrl}
                        onChange={(e) => setAiDesignUrl(e.target.value)}
                        placeholder="https://ladbrokes.com"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <Button 
                        onClick={handleGenerateAiDesign}
                        disabled={isGeneratingDesign || !aiDesignUrl.trim()}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {isGeneratingDesign ? 'Generating...' : 'Generate Design'}
                      </Button>
                    </div>
                    
                    {aiDesignResult && !aiDesignResult.success && (
                      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-700">{aiDesignResult.error}</p>
                      </div>
                    )}
                    
                    {aiDesignResult?.success && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-sm text-green-700">
                          AI design generated successfully!
                        </p>
                        <Button 
                          onClick={() => setShowAiDesignPreview(true)}
                          className="mt-2 text-sm px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          View Generated Design
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <p>This AI-powered feature analyzes the URL and generates a complete page design.</p>
                    <p>The design is created independently of your theme settings for maximum creativity.</p>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold mb-4">Brand Identity</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      value={currentBrand?.name || ''}
                      onChange={(e) => {
                        if (currentBrandId) {
                          updateBrand(currentBrandId, { name: e.target.value });
                          setHasUnsavedChanges(true);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website URL
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={currentBrand?.websiteUrl || ''}
                        onChange={(e) => {
                          if (currentBrandId) {
                            updateBrand(currentBrandId, { websiteUrl: e.target.value });
                            setHasUnsavedChanges(true);
                          }
                        }}
                        placeholder="https://example.com"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      {currentBrand?.websiteUrl && (
                        <a 
                          href={currentBrand.websiteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                          title="Open in new tab"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand Logo
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Upload an image file (max 5MB). Supported formats: JPEG, PNG, GIF, WebP
                    </p>
                    
                    {/* Logo Preview and Upload */}
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        {currentTheme.logo ? (
                          <div className="flex items-center justify-center">
                            <img 
                              src={currentTheme.logo} 
                              alt="Brand Logo" 
                              className="h-16 w-auto max-w-xs object-contain"
                              onError={(e) => {
                                console.error('Logo failed to load');
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        ) : (
                          <div className="h-16 flex items-center justify-center">
                            <PhotoIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      {/* Upload Options */}
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-colors text-sm font-medium text-gray-700 text-center"
                        >
                          <PhotoIcon className="w-4 h-4 inline-block mr-2" />
                          {currentTheme.logo ? 'Replace' : 'Upload'}
                        </label>
                        
                        <button
                          onClick={() => {
                            // Quick access to Paddy Power logo
                            const paddyPowerLogo = '/knowledge/images/logos/paddy power/paddypower-seeklogo.png';
                            handleThemeChange({ logo: paddyPowerLogo });
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
                        >
                          Use Paddy Power
                        </button>
                      </div>
                      
                      {currentTheme.logo && (
                        <button
                          onClick={() => {
                            handleThemeChange({ logo: undefined });
                          }}
                          className="w-full text-red-600 hover:text-red-700 text-sm"
                        >
                          Remove Logo
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Promotional Banner
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Upload a banner image for promotions (recommended: 1200x300px)
                    </p>
                    <div className="space-y-4">
                      <div className="relative bg-gray-50 rounded-lg overflow-hidden" style={{ paddingBottom: '25%' }}>
                        {currentTheme.banner ? (
                          <img 
                            src={currentTheme.banner} 
                            alt="Banner" 
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">No banner uploaded</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBannerUpload}
                          className="hidden"
                          id="banner-upload"
                        />
                        <label
                          htmlFor="banner-upload"
                          className="cursor-pointer flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-center text-sm font-medium"
                        >
                          <PhotoIcon className="w-4 h-4 inline-block mr-2" />
                          {currentTheme.banner ? 'Replace Banner' : 'Upload Banner'}
                        </label>
                        {currentTheme.banner && (
                          <button
                            onClick={() => {
                              handleThemeChange({ banner: undefined });
                            }}
                            className="px-4 py-2 text-red-600 hover:text-red-700 border border-red-300 rounded-md hover:bg-red-50"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <SwatchIcon className="w-5 h-5" />
                  Simple Color Scheme
                </h3>
                
                <p className="text-sm text-gray-600 mb-6">
                  Choose just 3 main colors. All other colors will be automatically calculated for optimal contrast and consistency.
                </p>
                
                <div className="space-y-6">
                  {/* Primary Brand Color */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <label 
                          className="text-base font-medium cursor-pointer hover:text-blue-600 transition-colors"
                          onMouseEnter={() => highlightPreviewElement('primary')}
                          onMouseLeave={() => highlightPreviewElement(null)}
                        >
                          Primary Brand Color
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Used for buttons, CTAs, and key actions</p>
                      </div>
                      <input
                        type="color"
                        value={simpleColors.primary}
                        onChange={(e) => handleSimpleColorChange('primary', e.target.value)}
                        className="w-24 h-12 border-2 border-gray-300 rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Navigation Color */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <label 
                          className="text-base font-medium cursor-pointer hover:text-blue-600 transition-colors"
                          onMouseEnter={() => highlightPreviewElement('headerBg')}
                          onMouseLeave={() => highlightPreviewElement(null)}
                        >
                          Navigation Color
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Header and navigation background (text color auto-calculated)</p>
                      </div>
                      <input
                        type="color"
                        value={simpleColors.navigation}
                        onChange={(e) => handleSimpleColorChange('navigation', e.target.value)}
                        className="w-24 h-12 border-2 border-gray-300 rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <label 
                          className="text-base font-medium cursor-pointer hover:text-blue-600 transition-colors"
                          onMouseEnter={() => highlightPreviewElement('secondary')}
                          onMouseLeave={() => highlightPreviewElement(null)}
                        >
                          Accent Color
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Secondary highlights and interactive elements</p>
                      </div>
                      <input
                        type="color"
                        value={simpleColors.accent}
                        onChange={(e) => handleSimpleColorChange('accent', e.target.value)}
                        className="w-24 h-12 border-2 border-gray-300 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Preview of auto-generated colors */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Auto-Generated Colors Preview</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border" style={{ backgroundColor: currentTheme.colors.primaryHover }} />
                      <span>Primary Hover</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border" style={{ backgroundColor: currentTheme.colors.headerText }} />
                      <span>Navigation Text</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border" style={{ backgroundColor: currentTheme.colors.navBg }} />
                      <span>Nav Menu Background</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border" style={{ backgroundColor: currentTheme.colors.slipHeader }} />
                      <span>Betting Slip Header</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Odds Selection Colors */}
              <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Odds Selection Colors
                </h3>
                
                <p className="text-sm text-gray-600 mb-6">
                  Customize the appearance of selected odds buttons and their hover states.
                </p>
                
                <div className="space-y-6">
                  {/* Default State */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="text-sm font-medium mb-4">Default State (Non-selected)</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <ColorInput
                        label="Background"
                        value={currentTheme.colors.oddsDefaultBg}
                        onChange={(value) => {
                          handleThemeChange({
                            colors: { ...currentTheme.colors, oddsDefaultBg: value }
                          });
                        }}
                        placeholder="#ffffff"
                      />
                      <ColorInput
                        label="Text"
                        value={currentTheme.colors.oddsDefaultText}
                        onChange={(value) => {
                          handleThemeChange({
                            colors: { ...currentTheme.colors, oddsDefaultText: value }
                          });
                        }}
                        placeholder="#000000"
                      />
                      <ColorInput
                        label="Border"
                        value={currentTheme.colors.oddsDefaultBorder}
                        onChange={(value) => {
                          handleThemeChange({
                            colors: { ...currentTheme.colors, oddsDefaultBorder: value }
                          });
                        }}
                        placeholder="#d1d5db"
                      />
                    </div>
                  </div>

                  {/* Selected State */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="text-sm font-medium mb-4">Selected State</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <ColorInput
                        label="Background"
                        value={currentTheme.colors.oddsSelectionBg}
                        onChange={(value) => {
                          handleThemeChange({
                            colors: { ...currentTheme.colors, oddsSelectionBg: value }
                          });
                        }}
                        placeholder="#000000"
                      />
                      <ColorInput
                        label="Text"
                        value={currentTheme.colors.oddsSelectionText}
                        onChange={(value) => {
                          handleThemeChange({
                            colors: { ...currentTheme.colors, oddsSelectionText: value }
                          });
                        }}
                        placeholder="#ffffff"
                      />
                      <ColorInput
                        label="Border"
                        value={currentTheme.colors.oddsSelectionBorder}
                        onChange={(value) => {
                          handleThemeChange({
                            colors: { ...currentTheme.colors, oddsSelectionBorder: value }
                          });
                        }}
                        placeholder="#000000"
                      />
                    </div>
                  </div>

                  {/* Hover State */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="text-sm font-medium mb-4">Hover State</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <ColorInput
                        label="Background"
                        value={currentTheme.colors.oddsSelectionHoverBg}
                        onChange={(value) => {
                          handleThemeChange({
                            colors: { ...currentTheme.colors, oddsSelectionHoverBg: value }
                          });
                        }}
                        placeholder="#1f2937"
                      />
                      <ColorInput
                        label="Text"
                        value={currentTheme.colors.oddsSelectionHoverText}
                        onChange={(value) => {
                          handleThemeChange({
                            colors: { ...currentTheme.colors, oddsSelectionHoverText: value }
                          });
                        }}
                        placeholder="#ffffff"
                      />
                      <ColorInput
                        label="Border"
                        value={currentTheme.colors.oddsSelectionHoverBorder}
                        onChange={(value) => {
                          handleThemeChange({
                            colors: { ...currentTheme.colors, oddsSelectionHoverBorder: value }
                          });
                        }}
                        placeholder="#1f2937"
                      />
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
                    <div className="flex gap-3">
                      <button
                        className="px-4 py-2 rounded-lg border-2 transition-all"
                        style={{
                          backgroundColor: currentTheme.colors.oddsDefaultBg,
                          color: currentTheme.colors.oddsDefaultText,
                          borderColor: currentTheme.colors.oddsDefaultBorder
                        }}
                      >
                        Default: 1.85
                      </button>
                      <button
                        className="px-4 py-2 rounded-lg border-2 transition-all"
                        style={{
                          backgroundColor: currentTheme.colors.oddsSelectionBg,
                          color: currentTheme.colors.oddsSelectionText,
                          borderColor: currentTheme.colors.oddsSelectionBorder
                        }}
                      >
                        Selected: 2.50
                      </button>
                      <button
                        className="px-4 py-2 rounded-lg border-2 transition-all hover:opacity-90"
                        style={{
                          backgroundColor: currentTheme.colors.oddsSelectionHoverBg,
                          color: currentTheme.colors.oddsSelectionHoverText,
                          borderColor: currentTheme.colors.oddsSelectionHoverBorder
                        }}
                      >
                        Hover: 3.25
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'typography' && (
            <Card>
              <h3 className="text-lg font-semibold mb-4">Typography Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Family
                  </label>
                  <select
                    value={currentTheme.typography.fontFamily}
                    onChange={(e) => {
                      handleThemeChange({
                        typography: { ...currentTheme.typography, fontFamily: e.target.value }
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Inter, system-ui, sans-serif">Inter (Default)</option>
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="Roboto, sans-serif">Roboto</option>
                    <option value="Open Sans, sans-serif">Open Sans</option>
                    <option value="system-ui, sans-serif">System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heading Font (Optional)
                  </label>
                  <select
                    value={currentTheme.typography.headingFont || ''}
                    onChange={(e) => {
                      handleThemeChange({
                        typography: { ...currentTheme.typography, headingFont: e.target.value || undefined }
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Same as body</option>
                    <option value="Arial Black, sans-serif">Arial Black</option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="Playfair Display, serif">Playfair Display</option>
                  </select>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold mb-4">Layout Options</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Border Radius
                    </label>
                    <select
                      value={currentTheme.layout.borderRadius}
                      onChange={(e) => {
                        handleThemeChange({
                          layout: { ...currentTheme.layout, borderRadius: e.target.value }
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="0">Square (0px)</option>
                      <option value="4px">Small (4px)</option>
                      <option value="0.5rem">Medium (8px)</option>
                      <option value="1rem">Large (16px)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Spacing
                    </label>
                    <select
                      value={currentTheme.layout.spacing}
                      onChange={(e) => {
                        handleThemeChange({
                          layout: { ...currentTheme.layout, spacing: e.target.value as 'compact' | 'normal' | 'spacious' }
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="compact">Compact</option>
                      <option value="normal">Normal</option>
                      <option value="spacious">Spacious</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sidebar Position
                    </label>
                    <select
                      value={currentTheme.layout.sidebarPosition}
                      onChange={(e) => {
                        handleThemeChange({
                          layout: { ...currentTheme.layout, sidebarPosition: e.target.value as 'left' | 'right' }
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Betting Slip Style
                    </label>
                    <select
                      value={currentTheme.layout.slipStyle}
                      onChange={(e) => {
                        handleThemeChange({
                          layout: { ...currentTheme.layout, slipStyle: e.target.value as 'minimal' | 'detailed' | 'compact' }
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="minimal">Minimal</option>
                      <option value="detailed">Detailed</option>
                      <option value="compact">Compact</option>
                    </select>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold mb-4">Component Styles</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button Style
                    </label>
                    <select
                      value={currentTheme.components.buttons.style}
                      onChange={(e) => {
                        handleThemeChange({
                          components: {
                            ...currentTheme.components,
                            buttons: { ...currentTheme.components.buttons, style: e.target.value as 'rounded' | 'square' | 'pill' }
                          }
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="square">Square</option>
                      <option value="rounded">Rounded</option>
                      <option value="pill">Pill</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Shadow
                    </label>
                    <select
                      value={currentTheme.components.cards.shadow}
                      onChange={(e) => {
                        handleThemeChange({
                          components: {
                            ...currentTheme.components,
                            cards: { ...currentTheme.components.cards, shadow: e.target.value as 'none' | 'sm' | 'md' | 'lg' }
                          }
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="none">None</option>
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input Style
                    </label>
                    <select
                      value={currentTheme.components.inputs.style}
                      onChange={(e) => {
                        handleThemeChange({
                          components: {
                            ...currentTheme.components,
                            inputs: { style: e.target.value as 'outlined' | 'filled' | 'underlined' }
                          }
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="outlined">Outlined</option>
                      <option value="filled">Filled</option>
                      <option value="underlined">Underlined</option>
                    </select>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'navigation' && (
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold mb-4">Navigation Icons</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Customize icons for vertical navigation items
                </p>
                
                <div className="space-y-4">
                  {/* Common Navigation Items */}
                  {[
                    { key: 'football', label: 'Football', default: '⚽' },
                    { key: 'horse_racing', label: 'Horse Racing', default: '🐎' },
                    { key: 'tennis', label: 'Tennis', default: '🎾' },
                    { key: 'basketball', label: 'Basketball', default: '🏀' },
                    { key: 'cricket', label: 'Cricket', default: '🏏' },
                    { key: 'rugby', label: 'Rugby', default: '🏈' },
                    { key: 'golf', label: 'Golf', default: '⛳' },
                    { key: 'boxing', label: 'Boxing', default: '🥊' },
                    { key: 'in_play', label: 'In-Play', default: '🔴' },
                    { key: 'live_streaming', label: 'Live Streaming', default: '📺' },
                    { key: 'lotteries', label: 'Lotteries', default: '🎲' },
                    { key: 'virtuals', label: 'Virtuals', default: '🎮' },
                  ].map(({ key, label, default: defaultIcon }) => (
                    <div key={key} className="flex items-center gap-4">
                      <div className="w-32">
                        <label className="text-sm font-medium text-gray-700">{label}</label>
                      </div>
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={currentTheme.navigation?.icons?.[key] || defaultIcon}
                          onChange={(e) => {
                            handleThemeChange({
                              navigation: {
                                ...currentTheme.navigation,
                                icons: {
                                  ...currentTheme.navigation?.icons,
                                  [key]: e.target.value
                                }
                              }
                            });
                          }}
                          className="w-16 px-2 py-1 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-500">Preview: {currentTheme.navigation?.icons?.[key] || defaultIcon}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold mb-4">Navigation Structure</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Navigation Style
                    </label>
                    <select
                      value={currentTheme.navigation?.style || 'sidebar'}
                      onChange={(e) => {
                        handleThemeChange({
                          navigation: {
                            ...currentTheme.navigation,
                            style: e.target.value as 'sidebar' | 'top' | 'tabs'
                          }
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="sidebar">Sidebar (Vertical)</option>
                      <option value="top">Top Bar (Horizontal)</option>
                      <option value="tabs">Tabs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Menu Items (comma-separated)
                    </label>
                    <textarea
                      value={currentTheme.navigation?.structure?.join(', ') || 'Sports, In-Play, Virtuals, Lotteries, Games, Live Casino, Bingo, Poker'}
                      onChange={(e) => {
                        const items = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
                        handleThemeChange({
                          navigation: {
                            ...currentTheme.navigation,
                            structure: items
                          }
                        });
                      }}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Sports, In-Play, Virtuals, Lotteries..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Define the main navigation menu items in order
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          </div>
        </div>

        {/* Live Preview */}
        <div className="flex-1 bg-gray-50">
          <div className="h-full flex flex-col">
            <div className="p-4 bg-white border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Live Preview - {currentBrand?.name}</h3>
            </div>
            <iframe
              key={currentBrandId}
              src={currentBrand && currentBrand.id !== 'default' 
                ? `/betco/browse-bets/${currentBrand.name.toLowerCase().replace(/\s+/g, '-')}`
                : '/betco/browse-bets'
              }
              className="flex-1 w-full"
              title="Theme Preview"
              style={{ zoom: 0.75 }}
            />
          </div>
        </div>
      </div>

      {/* AI Design Preview Modal */}
      {showAiDesignPreview && aiDesignResult?.success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">AI Generated Design Preview</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {aiDesignResult.analysis?.designPrompt}
                </p>
              </div>
              <button
                onClick={() => setShowAiDesignPreview(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 flex">
              {/* Design Details */}
              <div className="w-1/3 p-6 border-r border-gray-200 overflow-y-auto">
                <h4 className="font-medium mb-4">Design Analysis</h4>
                
                {aiDesignResult.analysis && (
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Layout Style</h5>
                      <p className="text-sm capitalize bg-gray-100 px-3 py-1 rounded inline-block">
                        {aiDesignResult.analysis.layoutStyle}
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Color Palette</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(aiDesignResult.analysis.colorPalette).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            <div 
                              className="w-6 h-6 rounded border border-gray-300"
                              style={{ backgroundColor: value }}
                            />
                            <span className="text-xs capitalize">{key}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Features</h5>
                      <div className="space-y-1">
                        {Object.entries(aiDesignResult.analysis.features).map(([key, value]) => (
                          <div key={key} className="text-xs">
                            <span className={value ? 'text-green-600' : 'text-gray-400'}>
                              {value ? '✓' : '✗'} {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* HTML Preview */}
              <div className="flex-1 bg-gray-50">
                {aiDesignResult.generatedHTML && (
                  <iframe
                    srcDoc={aiDesignResult.generatedHTML}
                    className="w-full h-full"
                    title="AI Generated Design"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Theme Extraction Preview Modal */}
      {showExtractionPreview && extractionResult?.success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Theme Extraction Preview</h3>
                <button
                  onClick={() => setShowExtractionPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {extractionResult.extractedTheme && (
                <div className="space-y-6">
                  {/* Colors Preview */}
                  {extractionResult.extractedTheme.colors && Object.keys(extractionResult.extractedTheme.colors).length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Extracted Colors</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(extractionResult.extractedTheme.colors).map(([key, value]) => 
                          value ? (
                            <div key={key} className="flex items-center gap-2">
                              <div 
                                className="w-6 h-6 rounded border border-gray-300"
                                style={{ backgroundColor: value }}
                              />
                              <span className="text-sm">
                                {key}: <code className="text-xs bg-gray-100 px-1 rounded">{value}</code>
                              </span>
                            </div>
                          ) : null
                        )}
                      </div>
                    </div>
                  )}

                  {/* Typography Preview */}
                  {extractionResult.extractedTheme.typography && (
                    <div>
                      <h4 className="font-medium mb-3">Typography</h4>
                      <div className="space-y-2">
                        {extractionResult.extractedTheme.typography.fontFamily && (
                          <p className="text-sm">
                            Font Family: <code className="text-xs bg-gray-100 px-1 rounded">
                              {extractionResult.extractedTheme.typography.fontFamily}
                            </code>
                          </p>
                        )}
                        {extractionResult.extractedTheme.typography.headingFont && (
                          <p className="text-sm">
                            Heading Font: <code className="text-xs bg-gray-100 px-1 rounded">
                              {extractionResult.extractedTheme.typography.headingFont}
                            </code>
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Layout Preview */}
                  {extractionResult.extractedTheme.layout && (
                    <div>
                      <h4 className="font-medium mb-3">Layout & Components</h4>
                      <div className="space-y-2 text-sm">
                        {extractionResult.extractedTheme.layout.borderRadius && (
                          <p>Border Radius: <code className="text-xs bg-gray-100 px-1 rounded">
                            {extractionResult.extractedTheme.layout.borderRadius}
                          </code></p>
                        )}
                        {extractionResult.extractedTheme.layout.spacing && (
                          <p>Spacing: <code className="text-xs bg-gray-100 px-1 rounded">
                            {extractionResult.extractedTheme.layout.spacing}
                          </code></p>
                        )}
                        {extractionResult.extractedTheme.components?.buttonStyle && (
                          <p>Button Style: <code className="text-xs bg-gray-100 px-1 rounded">
                            {extractionResult.extractedTheme.components.buttonStyle}
                          </code></p>
                        )}
                        {extractionResult.extractedTheme.components?.cardShadow && (
                          <p>Card Shadow: <code className="text-xs bg-gray-100 px-1 rounded">
                            {extractionResult.extractedTheme.components.cardShadow}
                          </code></p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Images Preview */}
                  {extractionResult.extractedTheme.images && (
                    <div>
                      <h4 className="font-medium mb-3">Extracted Images</h4>
                      <div className="space-y-3">
                        {extractionResult.extractedTheme.images.logo && (
                          <div>
                            <p className="text-sm font-medium mb-1">Logo:</p>
                            <img 
                              src={extractionResult.extractedTheme.images.logo} 
                              alt="Extracted logo" 
                              className="max-h-12 max-w-32 object-contain border border-gray-200 rounded"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        {extractionResult.extractedTheme.images.banner && (
                          <div>
                            <p className="text-sm font-medium mb-1">Banner:</p>
                            <img 
                              src={extractionResult.extractedTheme.images.banner} 
                              alt="Extracted banner" 
                              className="max-h-16 max-w-48 object-contain border border-gray-200 rounded"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Warnings */}
                  {extractionResult.warnings && extractionResult.warnings.length > 0 && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <h4 className="font-medium text-yellow-800 mb-2">Warnings:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {extractionResult.warnings.map((warning, index) => (
                          <li key={index}>• {warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Debug Info */}
                  {extractionResult.debugInfo && (
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                      <h4 className="font-medium text-gray-700 mb-2 text-sm">Extraction Details:</h4>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>Method: <span className="font-mono bg-white px-1 rounded">{extractionResult.extractionMethod || 'unknown'}</span></p>
                        {extractionResult.debugInfo.proxiesAttempted && (
                          <p>Proxies tried: {extractionResult.debugInfo.proxiesAttempted.length}</p>
                        )}
                        {extractionResult.debugInfo.htmlLength !== undefined && (
                          <p>HTML size: {extractionResult.debugInfo.htmlLength.toLocaleString()} chars</p>
                        )}
                        {extractionResult.debugInfo.colorsFound !== undefined && (
                          <p>Colors found: {extractionResult.debugInfo.colorsFound}</p>
                        )}
                        {extractionResult.debugInfo.primaryColorMethod && (
                          <p>Primary color detection: <span className="font-mono bg-white px-1 rounded">{extractionResult.debugInfo.primaryColorMethod}</span></p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      onClick={handleApplyExtractedTheme}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white"
                    >
                      Apply This Theme
                    </Button>
                    <Button 
                      onClick={() => setShowExtractionPreview(false)}
                      className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
