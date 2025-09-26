import axios from 'axios';
import { OperatorTheme } from '../../stores/themeConfigStore';

export interface ExtractedTheme {
  colors: {
    primary?: string;
    secondary?: string;
    headerBg?: string;
    headerText?: string;
    navBg?: string;
    navText?: string;
    background?: string;
    surface?: string;
    text?: string;
    border?: string;
  };
  typography: {
    fontFamily?: string;
    headingFont?: string;
  };
  layout: {
    borderRadius?: string;
    spacing?: 'compact' | 'normal' | 'spacious';
    sidebarPosition?: 'left' | 'right';
  };
  components: {
    buttonStyle?: 'rounded' | 'square' | 'pill';
    cardShadow?: 'none' | 'sm' | 'md' | 'lg';
  };
  images?: {
    logo?: string;
    banner?: string;
  };
}

export interface ThemeExtractionResult {
  success: boolean;
  extractedTheme?: ExtractedTheme;
  suggestedTheme?: Partial<OperatorTheme>;
  error?: string;
  warnings?: string[];
  extractionMethod?: 'full' | 'pattern' | 'mixed'; // Track which method was used
  debugInfo?: {
    proxiesAttempted?: string[];
    htmlLength?: number;
    colorsFound?: number;
    primaryColorMethod?: string;
  };
}

class ThemeExtractorService {
  private readonly corsProxies = [
    'https://api.allorigins.win/get?url=',
    'https://api.codetabs.com/v1/proxy?quest=',
    'https://thingproxy.freeboard.io/fetch/',
  ];

  async extractThemeFromUrl(url: string): Promise<ThemeExtractionResult> {
    const debugInfo: ThemeExtractionResult['debugInfo'] = {
      proxiesAttempted: [],
      htmlLength: 0,
      colorsFound: 0,
      primaryColorMethod: 'none'
    };

    try {
      // Validate URL
      const urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('Invalid URL protocol. Only HTTP and HTTPS are supported.');
      }

      // Try multiple CORS proxies with fallback
      let htmlContent: string | null = null;
      let lastError: Error | null = null;

      for (const proxyUrl of this.corsProxies) {
        debugInfo.proxiesAttempted!.push(proxyUrl);
        try {
          console.log(`Trying proxy: ${proxyUrl}`);
          const encodedUrl = encodeURIComponent(url);
          
          const response = await axios.get(`${proxyUrl}${encodedUrl}`, {
            timeout: 15000,
            headers: {
              'Accept': 'application/json'
            }
          });

          // Handle different proxy response formats
          let potentialContent = '';
          if (response.data?.contents && response.data.contents.trim()) {
            potentialContent = response.data.contents;
          } else if (typeof response.data === 'string' && response.data.trim()) {
            potentialContent = response.data;
          } else if (response.data?.data && response.data.data.trim()) {
            potentialContent = response.data.data;
          }

          // Check if we got actual website content or an error/blocked page
          if (potentialContent && this.isValidWebsiteContent(potentialContent)) {
            htmlContent = potentialContent;
            console.log('Got valid HTML content from proxy, length:', htmlContent.length);
            break;
          } else if (potentialContent) {
            console.log('Got blocked/error page content, trying next proxy');
            lastError = new Error('Access blocked or error page returned');
            continue;
          } else {
            console.log('Proxy response format not recognized or empty:', response.data);
          }
        } catch (error) {
          console.warn(`Proxy ${proxyUrl} failed:`, error);
          lastError = error instanceof Error ? error : new Error('Unknown proxy error');
          continue;
        }
      }

      if (!htmlContent) {
        console.log('All proxies failed, trying URL pattern fallback for:', url);
        // If all proxies fail, try to extract theme from URL patterns as fallback
        const fallbackTheme = this.extractThemeFromUrlPatterns(url);
        if (fallbackTheme) {
          console.log('Fallback theme created:', fallbackTheme);
          return {
            success: true,
            extractedTheme: fallbackTheme,
            suggestedTheme: this.convertToOperatorTheme(fallbackTheme),
            warnings: ['Could not fetch page content - used URL-based detection', ...this.generateWarnings(fallbackTheme)],
            extractionMethod: 'pattern',
            debugInfo: {
              ...debugInfo,
              primaryColorMethod: 'pattern-matching'
            }
          };
        }
        
        throw new Error('Unable to fetch page content. Please check the URL or try again later.');
      }
      
      // Parse HTML and extract theme elements
      console.log('Parsing HTML content for theme extraction, length:', htmlContent.length);
      debugInfo.htmlLength = htmlContent.length;
      const extractedTheme = this.parseHtmlForTheme(htmlContent, url, debugInfo);
      
      // Check if we got meaningful extraction results
      const hasExtractedColors = Object.keys(extractedTheme.colors).some(key => extractedTheme.colors[key]);
      const hasExtractedTypography = Object.keys(extractedTheme.typography).length > 0;
      
      console.log('Extraction results - has colors:', hasExtractedColors, 'has typography:', hasExtractedTypography);
      
      // If extraction didn't find much, try pattern fallback
      if (!hasExtractedColors && !hasExtractedTypography) {
        console.log('Limited extraction results, trying URL pattern fallback');
        const fallbackTheme = this.extractThemeFromUrlPatterns(url);
        if (fallbackTheme) {
          // Merge fallback with any extracted data
          const mergedTheme = {
            colors: { ...fallbackTheme.colors, ...extractedTheme.colors },
            typography: { ...fallbackTheme.typography, ...extractedTheme.typography },
            layout: { ...fallbackTheme.layout, ...extractedTheme.layout },
            components: { ...fallbackTheme.components, ...extractedTheme.components },
            images: extractedTheme.images || fallbackTheme.images
          };
          
          return {
            success: true,
            extractedTheme: mergedTheme,
            suggestedTheme: this.convertToOperatorTheme(mergedTheme),
            warnings: ['Limited CSS data available - enhanced with pattern matching', ...this.generateWarnings(mergedTheme)],
            extractionMethod: 'mixed',
            debugInfo
          };
        }
      }
      
      // Convert extracted theme to OperatorTheme format
      const suggestedTheme = this.convertToOperatorTheme(extractedTheme);

      return {
        success: true,
        extractedTheme,
        suggestedTheme,
        warnings: this.generateWarnings(extractedTheme),
        extractionMethod: 'full',
        debugInfo
      };

    } catch (error) {
      console.error('Theme extraction failed:', error);
      
      // Try fallback extraction even on error
      try {
        const fallbackTheme = this.extractThemeFromUrlPatterns(url);
        if (fallbackTheme) {
          return {
            success: true,
            extractedTheme: fallbackTheme,
            suggestedTheme: this.convertToOperatorTheme(fallbackTheme),
            warnings: ['Extraction failed - used URL-based detection', ...this.generateWarnings(fallbackTheme)]
          };
        }
      } catch (fallbackError) {
        console.warn('Fallback extraction also failed:', fallbackError);
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private extractThemeFromUrlPatterns(url: string): ExtractedTheme | null {
    try {
      // Extract domain from URL, ignoring hash fragments and query params
      const urlObj = new URL(url);
      const fullDomain = urlObj.hostname.toLowerCase();
      const domain = fullDomain.replace('www.', '');
      const urlLower = url.toLowerCase();
      
      // Extract base domain (e.g., "ladbrokes" from "sports.ladbrokes.com")
      const domainParts = domain.split('.');
      const baseDomain = domainParts.length > 2 
        ? domainParts[domainParts.length - 2] 
        : domainParts[0];
      
      console.log('Pattern matching - URL:', url);
      console.log('Pattern matching - Full domain:', fullDomain);
      console.log('Pattern matching - Base domain:', baseDomain);
      
      const extracted: ExtractedTheme = {
        colors: {},
        typography: {},
        layout: {},
        components: {}
      };

      // Known betting site patterns - check base domain, full domain, and URL
      if (baseDomain === 'betway' || domain.includes('betway') || urlLower.includes('betway')) {
        console.log('Matched: Betway');
        extracted.colors = {
          primary: '#00A651',
          secondary: '#1B365D',
          headerBg: '#1B365D',
          headerText: '#ffffff',
          navBg: '#ffffff',
          navText: '#333333',
          background: '#f5f5f5',
          surface: '#ffffff',
          text: '#333333',
          border: '#e0e0e0'
        };
        extracted.typography = {
          fontFamily: 'Arial, sans-serif'
        };
        extracted.layout = {
          borderRadius: '4px',
          spacing: 'compact'
        };
        extracted.components = {
          buttonStyle: 'rounded',
          cardShadow: 'sm'
        };
      } else if (baseDomain === 'paddypower' || baseDomain === 'paddy' || domain.includes('paddypower') || domain.includes('paddy') || urlLower.includes('paddypower') || urlLower.includes('paddy')) {
        console.log('Matched: Paddy Power');
        extracted.colors = {
          primary: '#004833',
          secondary: '#00ff00',
          headerBg: '#004833',
          headerText: '#ffffff',
          navBg: '#ffffff',
          navText: '#333333',
          background: '#f0f0f0',
          surface: '#ffffff',
          text: '#333333',
          border: '#cccccc'
        };
        extracted.typography = {
          fontFamily: 'Arial, sans-serif',
          headingFont: 'Arial Black, sans-serif'
        };
        extracted.layout = {
          borderRadius: '4px',
          spacing: 'compact'
        };
        extracted.components = {
          buttonStyle: 'square',
          cardShadow: 'none'
        };
      } else if (baseDomain === 'bet365' || domain.includes('bet365') || urlLower.includes('bet365')) {
        extracted.colors = {
          primary: '#FFCC02',
          secondary: '#143E52', 
          headerBg: '#143E52',
          headerText: '#ffffff',
          navBg: '#FFCC02',
          navText: '#000000',
          background: '#f8f8f8',
          surface: '#ffffff',
          text: '#000000',
          border: '#d4d4d4'
        };
        extracted.typography = {
          fontFamily: 'Arial, sans-serif'
        };
        extracted.layout = {
          borderRadius: '4px',
          spacing: 'compact'
        };
        extracted.components = {
          buttonStyle: 'square',
          cardShadow: 'sm'
        };
      } else if (baseDomain === 'skybet' || domain.includes('skybet') || urlLower.includes('skybet')) {
        extracted.colors = {
          primary: '#0077BE',
          secondary: '#FFA500',
          headerBg: '#0077BE',
          headerText: '#ffffff',
          navBg: '#ffffff',
          navText: '#0077BE',
          background: '#f5f7fa',
          surface: '#ffffff',
          text: '#333333',
          border: '#e1e8ed'
        };
        extracted.typography = {
          fontFamily: 'Arial, sans-serif'
        };
        extracted.layout = {
          borderRadius: '8px',
          spacing: 'normal'
        };
        extracted.components = {
          buttonStyle: 'rounded',
          cardShadow: 'md'
        };
      } else if (baseDomain === 'williamhill' || domain.includes('williamhill') || urlLower.includes('williamhill')) {
        extracted.colors = {
          primary: '#004B87',
          secondary: '#F39800',
          headerBg: '#004B87',
          headerText: '#ffffff',
          navBg: '#ffffff',
          navText: '#004B87',
          background: '#f8f9fa',
          surface: '#ffffff',
          text: '#333333',
          border: '#dee2e6'
        };
        extracted.typography = {
          fontFamily: 'Arial, sans-serif'
        };
        extracted.layout = {
          borderRadius: '4px',
          spacing: 'normal'
        };
        extracted.components = {
          buttonStyle: 'rounded',
          cardShadow: 'sm'
        };
      } else if (baseDomain === 'ladbrokes' || domain.includes('ladbrokes') || urlLower.includes('ladbrokes')) {
        console.log('Matched: Ladbrokes');
        extracted.colors = {
          primary: '#C8102E',
          secondary: '#FFD700',
          headerBg: '#C8102E',
          headerText: '#ffffff',
          navBg: '#ffffff',
          navText: '#C8102E',
          background: '#f8f8f8',
          surface: '#ffffff',
          text: '#333333',
          border: '#e0e0e0'
        };
        extracted.typography = {
          fontFamily: 'Arial, sans-serif'
        };
        extracted.layout = {
          borderRadius: '4px',
          spacing: 'normal'
        };
        extracted.components = {
          buttonStyle: 'rounded',
          cardShadow: 'sm'
        };
      } else if (baseDomain === 'coral' || domain.includes('coral') || urlLower.includes('coral')) {
        extracted.colors = {
          primary: '#FF6B35',
          secondary: '#2E86AB',
          headerBg: '#FF6B35',
          headerText: '#ffffff',
          navBg: '#ffffff',
          navText: '#FF6B35',
          background: '#f9f9f9',
          surface: '#ffffff',
          text: '#333333',
          border: '#e5e5e5'
        };
        extracted.typography = {
          fontFamily: 'Arial, sans-serif'
        };
        extracted.layout = {
          borderRadius: '6px',
          spacing: 'normal'
        };
        extracted.components = {
          buttonStyle: 'rounded',
          cardShadow: 'sm'
        };
      } else if (baseDomain === 'unibet' || domain.includes('unibet') || urlLower.includes('unibet')) {
        extracted.colors = {
          primary: '#17805E',
          secondary: '#F39A2B',
          headerBg: '#17805E',
          headerText: '#ffffff',
          navBg: '#ffffff',
          navText: '#17805E',
          background: '#f7f7f7',
          surface: '#ffffff',
          text: '#333333',
          border: '#e0e0e0'
        };
        extracted.typography = {
          fontFamily: 'Arial, sans-serif'
        };
        extracted.layout = {
          borderRadius: '4px',
          spacing: 'normal'
        };
        extracted.components = {
          buttonStyle: 'rounded',
          cardShadow: 'sm'
        };
      } else {
        console.log('No match found - using generic fallback');
        // Generic fallback
        extracted.colors = {
          primary: '#1976d2',
          headerBg: '#1976d2',
          headerText: '#ffffff',
          navBg: '#ffffff',
          navText: '#333333',
          background: '#f5f5f5',
          surface: '#ffffff',
          text: '#333333',
          border: '#e0e0e0'
        };
        extracted.typography = {
          fontFamily: 'system-ui, sans-serif'
        };
        extracted.layout = {
          borderRadius: '0.5rem',
          spacing: 'normal'
        };
      }

      return extracted;
    } catch {
      return null;
    }
  }

  private isValidWebsiteContent(html: string): boolean {
    const htmlLower = html.toLowerCase();
    
    // More specific error indicators that are less likely to appear in legitimate content
    const criticalErrorIndicators = [
      'ip address has been blocked',
      'access denied',
      'error 403',
      'error 404',
      'error 500',
      'not available in your country',
      'geoblocked',
      'blocked access',
      'access restricted'
    ];

    // Soft indicators that need additional context
    const softErrorIndicators = [
      'forbidden',
      'service unavailable',
      'temporarily unavailable',
      'maintenance mode',
      'coming soon',
      'under construction',
      'cloudflare',
      'captcha'
    ];

    // Check for critical errors first
    if (criticalErrorIndicators.some(indicator => htmlLower.includes(indicator))) {
      console.log('Detected critical error/blocked page content');
      return false;
    }

    // For soft indicators, check if they appear in error-like contexts
    const softErrorCount = softErrorIndicators.filter(indicator => {
      if (!htmlLower.includes(indicator)) return false;
      
      // Check if the indicator appears near error-related terms
      const index = htmlLower.indexOf(indicator);
      const contextWindow = htmlLower.substring(Math.max(0, index - 100), index + 100);
      
      // Look for error context clues
      const errorContextClues = ['error', 'blocked', 'denied', 'cannot', 'unable', 'restrict'];
      return errorContextClues.some(clue => contextWindow.includes(clue));
    }).length;

    // If multiple soft errors in error contexts, likely an error page
    if (softErrorCount >= 2) {
      console.log('Multiple soft error indicators detected in error contexts');
      return false;
    }

    // Expanded betting indicators including more terms and languages
    const bettingIndicators = [
      'bet', 'wager', 'gambl', 'sport', 'casino', 'odds', 'stake',
      'football', 'soccer', 'basketball', 'tennis', 'cricket',
      'horse racing', 'live betting', 'in-play', 'place bet',
      'sign up', 'login', 'register', 'deposit', 'withdraw',
      'bonus', 'promotion', 'jackpot', 'slot', 'poker', 'blackjack',
      'accumulator', 'parlay', 'handicap', 'spread'
    ];

    // Check if it has betting-related content (at least 2 indicators for better confidence)
    const bettingIndicatorCount = bettingIndicators.filter(indicator => 
      htmlLower.includes(indicator)
    ).length;
    
    const hasBettingContent = bettingIndicatorCount >= 2;

    // More flexible HTML structure check
    const hasBasicHtmlStructure = htmlLower.includes('<body') || htmlLower.includes('<html');
    
    // Check for content indicators (any of these suggest real content)
    const contentIndicators = [
      '<div', '<span', '<p', '<h1', '<h2', '<h3', 
      '<nav', '<header', '<main', '<footer', '<section',
      '<button', '<a href', '<img', '<script', '<style'
    ];
    
    const hasContentElements = contentIndicators.filter(indicator => 
      htmlLower.includes(indicator)
    ).length >= 3;

    // Check content length - error pages are typically shorter
    const isSubstantialContent = html.length > 1000;

    // More lenient validation: 
    // Valid if it has betting content OR (has HTML structure AND content elements AND substantial size)
    const isValid = hasBettingContent || 
                    (hasBasicHtmlStructure && hasContentElements && isSubstantialContent);

    if (!isValid) {
      console.log('Content validation failed:', {
        hasBettingContent,
        bettingIndicatorCount,
        hasBasicHtmlStructure,
        hasContentElements,
        contentLength: html.length,
        softErrorCount
      });
    }

    return isValid;
  }

  private parseHtmlForTheme(html: string, baseUrl: string, debugInfo?: ThemeExtractionResult['debugInfo']): ExtractedTheme {
    // Create a virtual DOM to parse HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const extracted: ExtractedTheme = {
      colors: {},
      typography: {},
      layout: {},
      components: {},
      images: {}
    };

    // Extract colors from CSS and inline styles
    this.extractColors(doc, extracted, debugInfo);
    
    // Extract typography
    this.extractTypography(doc, extracted);
    
    // Extract layout patterns
    this.extractLayout(doc, extracted);
    
    // Extract component styles
    this.extractComponents(doc, extracted);
    
    // Extract images
    this.extractImages(doc, extracted, baseUrl);

    return extracted;
  }

  private extractColors(doc: Document, extracted: ExtractedTheme, debugInfo?: ThemeExtractionResult['debugInfo']): void {
    const colorPattern = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\)/g;
    
    // Collect all CSS text from various sources
    let allCssText = '';
    
    // 1. Extract from <style> tags
    const styleTags = doc.querySelectorAll('style');
    styleTags.forEach(style => {
      allCssText += style.textContent + '\n';
    });
    
    // 2. Extract from inline styles
    const elementsWithStyle = doc.querySelectorAll('[style]');
    elementsWithStyle.forEach(element => {
      allCssText += element.getAttribute('style') + '; ';
    });
    
    // 3. Extract CSS variables from :root or html
    const rootElement = doc.documentElement;
    const rootStyle = rootElement.getAttribute('style') || '';
    const cssVarPattern = /--([\w-]+):\s*([^;]+)/g;
    let cssVarMatch;
    const cssVars = new Map<string, string>();
    
    while ((cssVarMatch = cssVarPattern.exec(rootStyle)) !== null) {
      const [, varName, varValue] = cssVarMatch;
      if (varValue.match(colorPattern)) {
        cssVars.set(varName, varValue.trim());
      }
    }
    
    console.log('Found CSS variables:', Array.from(cssVars.entries()));
    
    // 4. Also check the entire HTML for any embedded colors
    allCssText += doc.documentElement.innerHTML;
    
    console.log('Collected CSS text length:', allCssText.length);
    
    const matches = allCssText.match(colorPattern) || [];
    
    // Add CSS variable values to matches
    cssVars.forEach((value) => {
      if (value.match(colorPattern)) {
        matches.push(value);
      }
    });
    console.log('Found color matches:', matches.length);
    if (debugInfo) {
      debugInfo.colorsFound = matches.length;
    }
    
    // Analyze color frequency and patterns
    const colorFrequency = new Map<string, number>();
    matches.forEach(color => {
      const normalized = this.normalizeColor(color);
      if (normalized && normalized !== 'transparent') {
        colorFrequency.set(normalized, (colorFrequency.get(normalized) || 0) + 1);
      }
    });

    // Filter out white and black early, but keep them for reference
    const colorEntries = Array.from(colorFrequency.entries());
    const nonWhiteBlackColors = colorEntries.filter(([color]) => 
      color !== '#ffffff' && color !== '#000000' && color !== '#fff' && color !== '#000'
    );
    
    // Sort by frequency
    const sortedAllColors = colorEntries
      .sort((a, b) => b[1] - a[1])
      .map(([color]) => color);
      
    // Sort non-white/black colors by frequency
    const sortedColors = nonWhiteBlackColors
      .sort((a, b) => b[1] - a[1])
      .map(([color]) => color);

    console.log('Top colors found (excluding white/black):', sortedColors.slice(0, 10));
    console.log('Color frequency:', nonWhiteBlackColors.slice(0, 5).map(([c, f]) => `${c}: ${f}`));

    // Map colors to theme properties based on common patterns
    if (sortedColors.length > 0) {
      // Look for brand-specific colors FIRST (red for Ladbrokes, green for Betway, etc.)
      const nonNeutralColors = sortedColors.filter(c => !this.isNeutralColor(c));
      
      // Filter colors by minimum occurrence threshold (at least 3 times)
      const significantColors = nonNeutralColors.filter(c => {
        const frequency = colorFrequency.get(c) || 0;
        return frequency >= 3;
      });
      
      // Check for specific color patterns with their frequency
      const redColors = significantColors.filter(c => this.isRedColor(c))
        .sort((a, b) => {
          // Sort by vibrancy first, then frequency
          const aVibrant = this.isVibrantColor(a) ? 1 : 0;
          const bVibrant = this.isVibrantColor(b) ? 1 : 0;
          if (aVibrant !== bVibrant) return bVibrant - aVibrant;
          return (colorFrequency.get(b) || 0) - (colorFrequency.get(a) || 0);
        });
        
      const greenColors = significantColors.filter(c => this.isGreenColor(c))
        .sort((a, b) => {
          const aVibrant = this.isVibrantColor(a) ? 1 : 0;
          const bVibrant = this.isVibrantColor(b) ? 1 : 0;
          if (aVibrant !== bVibrant) return bVibrant - aVibrant;
          return (colorFrequency.get(b) || 0) - (colorFrequency.get(a) || 0);
        });
        
      const blueColors = significantColors.filter(c => this.isBlueColor(c))
        .sort((a, b) => {
          const aVibrant = this.isVibrantColor(a) ? 1 : 0;
          const bVibrant = this.isVibrantColor(b) ? 1 : 0;
          if (aVibrant !== bVibrant) return bVibrant - aVibrant;
          return (colorFrequency.get(b) || 0) - (colorFrequency.get(a) || 0);
        });
      
      console.log('Brand color detection:');
      console.log('- Reds:', redColors.slice(0, 3));
      console.log('- Greens:', greenColors.slice(0, 3));
      console.log('- Blues:', blueColors.slice(0, 3));
      
      // Prioritize vibrant brand colors
      let primaryColor = null;
      
      // Check which color type is most prominent
      const colorTypeScores = {
        red: redColors.reduce((sum, c) => sum + (colorFrequency.get(c) || 0), 0),
        green: greenColors.reduce((sum, c) => sum + (colorFrequency.get(c) || 0), 0),
        blue: blueColors.reduce((sum, c) => sum + (colorFrequency.get(c) || 0), 0)
      };
      
      console.log('Color type scores:', colorTypeScores);
      
      // Pick the dominant color type
      const dominantType = Object.entries(colorTypeScores)
        .sort(([,a], [,b]) => b - a)[0][0];
      
      if (dominantType === 'red' && redColors.length > 0) {
        primaryColor = redColors[0];
        extracted.colors.primary = primaryColor;
        if (debugInfo) {
          debugInfo.primaryColorMethod = `dominant-type-red (score: ${colorTypeScores.red})`;
        }
      } else if (dominantType === 'green' && greenColors.length > 0) {
        primaryColor = greenColors[0];
        extracted.colors.primary = primaryColor;
        if (debugInfo) {
          debugInfo.primaryColorMethod = `dominant-type-green (score: ${colorTypeScores.green})`;
        }
      } else if (dominantType === 'blue' && blueColors.length > 0) {
        primaryColor = blueColors[0];
        extracted.colors.primary = primaryColor;
        if (debugInfo) {
          debugInfo.primaryColorMethod = `dominant-type-blue (score: ${colorTypeScores.blue})`;
        }
      } else {
        // Fallback to most vibrant non-neutral color
        const vibrantColors = nonNeutralColors.filter(c => this.isVibrantColor(c));
        if (vibrantColors.length > 0) {
          primaryColor = vibrantColors[0];
          extracted.colors.primary = primaryColor;
          if (debugInfo) {
            debugInfo.primaryColorMethod = 'fallback-vibrant-color';
          }
        } else if (nonNeutralColors.length > 0) {
          primaryColor = nonNeutralColors[0];
          extracted.colors.primary = primaryColor;
          if (debugInfo) {
            debugInfo.primaryColorMethod = 'fallback-first-non-neutral';
          }
        }
      }
      
      console.log('Selected primary color:', primaryColor);

      // Header background (look for dark colors, but not the primary if it's dark)
      const darkColors = sortedColors.filter(c => 
        this.isDarkColor(c) && c !== extracted.colors.primary
      );
      if (darkColors.length > 0) {
        extracted.colors.headerBg = darkColors[0];
        extracted.colors.headerText = '#ffffff';
      } else if (extracted.colors.primary && this.isDarkColor(extracted.colors.primary)) {
        // If primary is dark, use it for header
        extracted.colors.headerBg = extracted.colors.primary;
        extracted.colors.headerText = '#ffffff';
      } else {
        // Default header colors
        extracted.colors.headerBg = '#2b2b2b';
        extracted.colors.headerText = '#ffffff';
      }

      // Secondary color (look for accent colors different from primary)
      if (primaryColor) {
        const accentCandidates = nonNeutralColors.filter(c => 
          c !== primaryColor && this.getColorDistance(c, primaryColor) > 100
        );
        if (accentCandidates.length > 0) {
          extracted.colors.secondary = accentCandidates[0];
        }
      }

      // Background colors
      const lightColors = sortedColors.filter(c => this.isLightColor(c) && c !== '#ffffff');
      if (lightColors.length > 0) {
        extracted.colors.background = lightColors[0];
      } else {
        extracted.colors.background = '#ffffff';
      }

      extracted.colors.surface = '#ffffff';
      extracted.colors.text = '#333333';
      extracted.colors.border = '#e5e7eb';
    }

    // Look for specific elements with important colors
    this.extractElementColors(doc, extracted, debugInfo);
  }

  private extractElementColors(doc: Document, extracted: ExtractedTheme, debugInfo?: ThemeExtractionResult['debugInfo']): void {
    // Look for brand-specific selectors first
    const brandSelectors = [
      // Generic brand selectors
      '.brand-color', '.primary-color', '.theme-brand-01', '.theme-primary',
      '[class*="brand"]', '[class*="primary"]', '.accent-color', '.main-color',
      
      // CSS variable selectors
      '[style*="--theme-"]', '[style*="--brand-"]', '[style*="--primary"]',
      
      // Betting-specific selectors
      '.odds-button', '.bet-button', '.place-bet', '.betting-button',
      '.match-odds', '.price-button', '.selection-button',
      '.sportsbook-header', '.betting-header', '.sports-nav',
      
      // Known brand colors
      '[style*="#f01e28"]', '[style*="#c8102e"]', '[style*="#d9342b"]', // Ladbrokes red
      '[style*="#00a651"]', '[style*="#1b365d"]', // Betway
      '[style*="#004833"]', '[style*="#00ff00"]', // Paddy Power
      '[style*="#ffcc02"]', '[style*="#143e52"]', // Bet365
      '[style*="#0077be"]', // Sky Bet
      
      // Common CTA elements
      '.cta', '.call-to-action', '.btn-primary', '.primary-button',
      'a.button', 'a.btn', '[role="button"]'
    ];
    
    for (const selector of brandSelectors) {
      try {
        const elements = doc.querySelectorAll(selector);
        elements.forEach(element => {
          const style = this.getElementColors(element);
          if (style.backgroundColor && !this.isTransparent(style.backgroundColor) && !this.isNeutralColor(style.backgroundColor)) {
            const normalized = this.normalizeColor(style.backgroundColor);
            if (this.isRedColor(normalized) || this.isGreenColor(normalized) || this.isBlueColor(normalized)) {
              extracted.colors.primary = normalized;
              console.log('Found brand color from element:', selector, normalized);
              if (debugInfo) {
                debugInfo.primaryColorMethod = `element-selector: ${selector}`;
              }
              return;
            }
          }
        });
      } catch (e) {
        // Ignore selector errors
      }
    }

    // Look for navigation elements
    const navElements = doc.querySelectorAll('nav, .nav, .navigation, .header-nav');
    navElements.forEach(nav => {
      const computedStyle = this.getElementColors(nav);
      if (computedStyle.backgroundColor && !this.isTransparent(computedStyle.backgroundColor)) {
        extracted.colors.navBg = this.normalizeColor(computedStyle.backgroundColor);
      }
      if (computedStyle.color) {
        extracted.colors.navText = this.normalizeColor(computedStyle.color);
      }
    });

    // Look for header elements
    const headerElements = doc.querySelectorAll('header, .header, .top-header');
    headerElements.forEach(header => {
      const computedStyle = this.getElementColors(header);
      if (computedStyle.backgroundColor && !this.isTransparent(computedStyle.backgroundColor)) {
        const normalized = this.normalizeColor(computedStyle.backgroundColor);
        extracted.colors.headerBg = normalized;
        
        // If header has a brand color, might be the primary
        if (!extracted.colors.primary && (this.isRedColor(normalized) || this.isGreenColor(normalized) || this.isBlueColor(normalized))) {
          extracted.colors.primary = normalized;
        }
      }
      if (computedStyle.color) {
        extracted.colors.headerText = this.normalizeColor(computedStyle.color);
      }
    });

    // Look for button colors
    const buttonElements = doc.querySelectorAll('button, .btn, .button, input[type="submit"], [class*="cta"], [class*="btn-primary"]');
    buttonElements.forEach(button => {
      const computedStyle = this.getElementColors(button);
      if (computedStyle.backgroundColor && !this.isTransparent(computedStyle.backgroundColor)) {
        const normalized = this.normalizeColor(computedStyle.backgroundColor);
        if (!extracted.colors.primary || this.isNeutralColor(extracted.colors.primary)) {
          if (!this.isNeutralColor(normalized)) {
            extracted.colors.primary = normalized;
          }
        }
      }
    });
  }

  private extractTypography(doc: Document, extracted: ExtractedTheme): void {
    // Look for font-family declarations in CSS
    const allText = doc.documentElement.innerHTML;
    const fontFamilyPattern = /font-family\s*:\s*([^;]+)/gi;
    const matches = allText.match(fontFamilyPattern) || [];

    const fontFamilies = new Set<string>();
    matches.forEach(match => {
      const family = match.replace(/font-family\s*:\s*/i, '').replace(/['"]/g, '');
      fontFamilies.add(family.split(',')[0].trim());
    });

    // Map to available font options
    const availableFonts = [
      'Inter, system-ui, sans-serif',
      'Arial, sans-serif', 
      'Roboto, sans-serif',
      'Open Sans, sans-serif',
      'system-ui, sans-serif'
    ];

    const detectedFonts = Array.from(fontFamilies);
    for (const available of availableFonts) {
      const baseFont = available.split(',')[0].trim();
      if (detectedFonts.some(detected => detected.toLowerCase().includes(baseFont.toLowerCase()))) {
        extracted.typography.fontFamily = available;
        break;
      }
    }

    // Default to system font if none detected
    if (!extracted.typography.fontFamily) {
      extracted.typography.fontFamily = 'system-ui, sans-serif';
    }
  }

  private extractLayout(doc: Document, extracted: ExtractedTheme): void {
    // Look for border-radius patterns
    const allText = doc.documentElement.innerHTML;
    const borderRadiusPattern = /border-radius\s*:\s*([^;]+)/gi;
    const matches = allText.match(borderRadiusPattern) || [];

    const radiusValues = matches.map(match => 
      match.replace(/border-radius\s*:\s*/i, '').trim()
    );

    // Determine most common border radius
    const radiusFreq = new Map<string, number>();
    radiusValues.forEach(radius => {
      radiusFreq.set(radius, (radiusFreq.get(radius) || 0) + 1);
    });

    const mostCommonRadius = Array.from(radiusFreq.entries())
      .sort((a, b) => b[1] - a[1])[0]?.[0];

    if (mostCommonRadius) {
      // Map to available options
      if (mostCommonRadius.includes('0')) {
        extracted.layout.borderRadius = '0';
      } else if (mostCommonRadius.includes('4px') || mostCommonRadius.includes('0.25rem')) {
        extracted.layout.borderRadius = '4px';
      } else if (mostCommonRadius.includes('8px') || mostCommonRadius.includes('0.5rem')) {
        extracted.layout.borderRadius = '0.5rem';
      } else {
        extracted.layout.borderRadius = '1rem';
      }
    }

    // Analyze spacing (look for padding/margin patterns)
    const spacingPattern = /(padding|margin)\s*:\s*([^;]+)/gi;
    const spacingMatches = allText.match(spacingPattern) || [];
    
    // Simple heuristic: if most spacing is < 12px, it's compact
    const avgSpacing = this.analyzeSpacing(spacingMatches);
    if (avgSpacing < 12) {
      extracted.layout.spacing = 'compact';
    } else if (avgSpacing > 20) {
      extracted.layout.spacing = 'spacious';
    } else {
      extracted.layout.spacing = 'normal';
    }

    // Detect sidebar position (look for common sidebar class patterns)
    const hasSidebarLeft = doc.querySelector('.sidebar-left, .left-sidebar, .sidebar.left');
    const hasSidebarRight = doc.querySelector('.sidebar-right, .right-sidebar, .sidebar.right');
    
    if (hasSidebarRight) {
      extracted.layout.sidebarPosition = 'right';
    } else {
      extracted.layout.sidebarPosition = 'left'; // default
    }
  }

  private extractComponents(doc: Document, extracted: ExtractedTheme): void {
    // Analyze button styles
    const buttons = doc.querySelectorAll('button, .btn, .button');
    let roundedCount = 0;
    let squareCount = 0;
    let pillCount = 0;

    buttons.forEach(button => {
      const style = button.getAttribute('style') || '';
      const className = button.getAttribute('class') || '';
      
      if (style.includes('border-radius: 50') || className.includes('pill') || className.includes('rounded-full')) {
        pillCount++;
      } else if (style.includes('border-radius: 0') || className.includes('square')) {
        squareCount++;
      } else {
        roundedCount++;
      }
    });

    // Determine most common button style
    if (pillCount > roundedCount && pillCount > squareCount) {
      extracted.components.buttonStyle = 'pill';
    } else if (squareCount > roundedCount) {
      extracted.components.buttonStyle = 'square';
    } else {
      extracted.components.buttonStyle = 'rounded';
    }

    // Analyze card shadows (look for box-shadow patterns)
    const allText = doc.documentElement.innerHTML;
    const shadowPattern = /box-shadow\s*:\s*([^;]+)/gi;
    const shadowMatches = allText.match(shadowPattern) || [];

    if (shadowMatches.length === 0) {
      extracted.components.cardShadow = 'none';
    } else {
      // Simple heuristic based on shadow values
      const avgShadowSize = this.analyzeShadowSize(shadowMatches);
      if (avgShadowSize < 4) {
        extracted.components.cardShadow = 'sm';
      } else if (avgShadowSize > 12) {
        extracted.components.cardShadow = 'lg';
      } else {
        extracted.components.cardShadow = 'md';
      }
    }
  }

  private extractImages(doc: Document, extracted: ExtractedTheme, baseUrl: string): void {
    // Look for logo images
    const logoSelectors = [
      'img[alt*="logo" i]',
      'img[src*="logo" i]',
      'img[class*="logo" i]',
      '.logo img',
      'header img',
      '.header img'
    ];

    for (const selector of logoSelectors) {
      const logoImg = doc.querySelector(selector) as HTMLImageElement;
      if (logoImg && logoImg.src) {
        extracted.images!.logo = this.resolveUrl(logoImg.src, baseUrl);
        break;
      }
    }

    // Look for banner/hero images
    const bannerSelectors = [
      'img[class*="banner" i]',
      'img[class*="hero" i]',
      '.banner img',
      '.hero img',
      '.hero-section img'
    ];

    for (const selector of bannerSelectors) {
      const bannerImg = doc.querySelector(selector) as HTMLImageElement;
      if (bannerImg && bannerImg.src) {
        extracted.images!.banner = this.resolveUrl(bannerImg.src, baseUrl);
        break;
      }
    }
  }

  private convertToOperatorTheme(extracted: ExtractedTheme): Partial<OperatorTheme> {
    console.log('convertToOperatorTheme called with:', extracted);
    const theme: Partial<OperatorTheme> = {};

    // Map colors
    if (Object.keys(extracted.colors).length > 0) {
      console.log('Converting extracted colors:', extracted.colors);
      theme.colors = {
        // Use extracted colors or provide sensible defaults
        headerBg: extracted.colors.headerBg || extracted.colors.primary || '#111827',
        headerText: extracted.colors.headerText || '#ffffff',
        navBg: extracted.colors.navBg || extracted.colors.surface || '#ffffff',
        navText: extracted.colors.navText || extracted.colors.text || '#333333',
        navHover: this.lightenColor(extracted.colors.navBg || '#ffffff', 0.1),
        navActive: extracted.colors.primary || '#111827',
        
        primary: extracted.colors.primary || '#111827',
        primaryHover: this.darkenColor(extracted.colors.primary || '#111827', 0.1),
        primaryText: this.getContrastColor(extracted.colors.primary || '#111827'),
        
        secondary: extracted.colors.secondary || '#8b5cf6',
        secondaryHover: this.darkenColor(extracted.colors.secondary || '#8b5cf6', 0.1),
        secondaryText: this.getContrastColor(extracted.colors.secondary || '#8b5cf6'),
        
        background: extracted.colors.background || '#f9fafb',
        surface: extracted.colors.surface || '#ffffff',
        border: extracted.colors.border || '#e5e7eb',
        text: extracted.colors.text || '#111827',
        textMuted: this.lightenColor(extracted.colors.text || '#111827', 0.4),
        
        slipBg: extracted.colors.surface || '#ffffff',
        slipBorder: extracted.colors.border || '#d1d5db',
        slipHeader: this.lightenColor(extracted.colors.background || '#f9fafb', 0.05),
        
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      };
    }

    // Map typography
    if (extracted.typography.fontFamily) {
      theme.typography = {
        fontFamily: extracted.typography.fontFamily,
        headingFont: extracted.typography.headingFont,
        fontSize: {
          base: '16px',
          sm: '14px',
          lg: '18px',
          xl: '20px',
        },
      };
    }

    // Map layout
    if (Object.keys(extracted.layout).length > 0) {
      theme.layout = {
        borderRadius: extracted.layout.borderRadius || '0.5rem',
        spacing: extracted.layout.spacing || 'normal',
        sidebarPosition: extracted.layout.sidebarPosition || 'left',
        slipStyle: 'detailed',
      };
    }

    // Map components
    if (Object.keys(extracted.components).length > 0) {
      theme.components = {
        buttons: {
          style: extracted.components.buttonStyle || 'rounded',
          shadow: false,
        },
        cards: {
          shadow: extracted.components.cardShadow || 'sm',
          border: true,
        },
        inputs: {
          style: 'outlined',
        },
      };
    }

    // Map images
    if (extracted.images?.logo) {
      theme.logo = extracted.images.logo;
    }
    if (extracted.images?.banner) {
      theme.banner = extracted.images.banner;
    }

    return theme;
  }

  // Helper methods
  private normalizeColor(color: string): string {
    // Remove whitespace
    color = color.trim();
    
    // Convert rgb/rgba to hex
    if (color.startsWith('rgb')) {
      const values = color.match(/\d+/g)?.map(Number);
      if (values && values.length >= 3) {
        const hex = `#${values[0].toString(16).padStart(2, '0')}${values[1].toString(16).padStart(2, '0')}${values[2].toString(16).padStart(2, '0')}`;
        return hex.toLowerCase();
      }
    }
    
    // Normalize 3-digit hex to 6-digit
    if (color.match(/^#[0-9a-f]{3}$/i)) {
      return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`.toLowerCase();
    }
    
    // Return normalized hex
    return color.toLowerCase();
  }

  private isNeutralColor(color: string): boolean {
    const neutral = ['#ffffff', '#000000', '#f5f5f5', '#eeeeee', '#dddddd', '#cccccc', '#999999', '#666666', '#333333'];
    return neutral.includes(color.toLowerCase());
  }

  private isDarkColor(color: string): boolean {
    // Simple brightness calculation
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness < 128;
    }
    return false;
  }

  private isLightColor(color: string): boolean {
    return !this.isDarkColor(color);
  }

  private isTransparent(color: string): boolean {
    return color === 'transparent' || color === 'rgba(0,0,0,0)' || color.includes('rgba(') && color.includes(',0)');
  }

  private isRedColor(color: string): boolean {
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return r > 150 && g < 100 && b < 100;
    }
    return false;
  }

  private isGreenColor(color: string): boolean {
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return g > 150 && r < 100 && b < 100;
    }
    return false;
  }

  private isBlueColor(color: string): boolean {
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return b > 150 && r < 100 && g < 100;
    }
    return false;
  }

  private isVibrantColor(color: string): boolean {
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      // Check if color has high saturation (not too close to gray)
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const saturation = max === 0 ? 0 : (max - min) / max;
      return saturation > 0.5 && max > 100; // Saturated and not too dark
    }
    return false;
  }

  private getColorDistance(color1: string, color2: string): number {
    if (color1.startsWith('#') && color2.startsWith('#')) {
      const r1 = parseInt(color1.slice(1, 3), 16);
      const g1 = parseInt(color1.slice(3, 5), 16);
      const b1 = parseInt(color1.slice(5, 7), 16);
      
      const r2 = parseInt(color2.slice(1, 3), 16);
      const g2 = parseInt(color2.slice(3, 5), 16);
      const b2 = parseInt(color2.slice(5, 7), 16);
      
      // Calculate Euclidean distance in RGB space
      return Math.sqrt(
        Math.pow(r2 - r1, 2) + 
        Math.pow(g2 - g1, 2) + 
        Math.pow(b2 - b1, 2)
      );
    }
    return 0;
  }

  private getElementColors(element: Element): { backgroundColor?: string; color?: string } {
    const style = element.getAttribute('style') || '';
    const backgroundColor = style.match(/background-color\s*:\s*([^;]+)/)?.[1];
    const color = style.match(/color\s*:\s*([^;]+)/)?.[1];
    return { backgroundColor, color };
  }

  private analyzeSpacing(spacingMatches: string[]): number {
    // Extract numeric values and calculate average
    const values: number[] = [];
    spacingMatches.forEach(match => {
      const numbers = match.match(/\d+/g);
      if (numbers) {
        values.push(...numbers.map(Number));
      }
    });
    return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 16;
  }

  private analyzeShadowSize(shadowMatches: string[]): number {
    // Extract blur radius from box-shadow values
    const blurValues: number[] = [];
    shadowMatches.forEach(match => {
      const values = match.match(/[\d.]+px/g);
      if (values && values.length >= 3) {
        // Third value is typically blur radius
        const blurRadius = parseFloat(values[2]);
        blurValues.push(blurRadius);
      }
    });
    return blurValues.length > 0 ? blurValues.reduce((a, b) => a + b, 0) / blurValues.length : 4;
  }

  private resolveUrl(url: string, baseUrl: string): string {
    try {
      return new URL(url, baseUrl).toString();
    } catch {
      return url;
    }
  }

  private lightenColor(color: string, amount: number): string {
    // Simple color lightening
    if (color.startsWith('#')) {
      const num = parseInt(color.slice(1), 16);
      const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * amount));
      const g = Math.min(255, Math.floor(((num >> 8) & 0x00FF) + (255 - ((num >> 8) & 0x00FF)) * amount));
      const b = Math.min(255, Math.floor((num & 0x0000FF) + (255 - (num & 0x0000FF)) * amount));
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    return color;
  }

  private darkenColor(color: string, amount: number): string {
    // Simple color darkening
    if (color.startsWith('#')) {
      const num = parseInt(color.slice(1), 16);
      const r = Math.max(0, Math.floor((num >> 16) * (1 - amount)));
      const g = Math.max(0, Math.floor(((num >> 8) & 0x00FF) * (1 - amount)));
      const b = Math.max(0, Math.floor((num & 0x0000FF) * (1 - amount)));
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    return color;
  }

  private getContrastColor(backgroundColor: string): string {
    return this.isDarkColor(backgroundColor) ? '#ffffff' : '#000000';
  }

  private generateWarnings(extracted: ExtractedTheme): string[] {
    const warnings: string[] = [];
    
    if (!extracted.colors.primary) {
      warnings.push('Could not detect primary color - using default');
    }
    
    if (!extracted.typography.fontFamily) {
      warnings.push('Could not detect font family - using default');
    }
    
    if (!extracted.images?.logo) {
      warnings.push('No logo image found');
    }

    return warnings;
  }
}

export const themeExtractorService = new ThemeExtractorService();