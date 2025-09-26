# Mykro Development History

## Session Summary - July 19, 2025

### Project Overview
The Mykro project is a white-label betting platform with a brand theme configuration system. The main focus has been on implementing automated theme extraction from competitor betting sites to help operators quickly configure their brand appearance.

### Key Components Completed

#### 1. Theme Extraction Service (`/src/shared/services/themeExtractor.service.ts`)
- **Purpose**: Extract brand themes (colors, fonts, layouts) from betting site URLs
- **Features**:
  - CORS proxy fallback system (3 different proxies)
  - Intelligent color detection with brand-specific priority
  - Pattern matching for known betting sites (Betway, Ladbrokes, Bet365, etc.)
  - HTML parsing with CSS analysis
  - Debug information tracking

#### 2. Brand Management System (`/src/stores/themeConfigStore.ts`)
- **Features**:
  - Per-brand theme storage with Zustand persistence
  - Brand-specific extraction URL storage
  - Deep copying to prevent reference issues
  - Real-time theme application to document

#### 3. Branding Configuration Page (`/src/apps/frontend/pages/branding/BrandingPage.tsx`)
- **Features**:
  - Multi-brand management with dropdown selector
  - Theme extraction with URL input
  - Brand-specific logo/banner uploads with immediate save
  - Live preview modal with extraction details
  - Real-time theme application and preview

### Major Issues Resolved This Session

#### 1. Brand-Specific Uploads ✅
- **Problem**: Logo/banner uploads were applying to all brands instead of the specific brand
- **Solution**: Added immediate save functionality that directly updates the current brand when files are uploaded
- **Files Modified**: `BrandingPage.tsx` (lines 438-460, 474-496)

#### 2. Shared URL Component ✅
- **Problem**: Website URL input was shared across all brands
- **Solution**: Added `extractionUrl` field to Brand interface and made URL storage per-brand
- **Files Modified**: `themeConfigStore.ts` (line 221), `BrandingPage.tsx` (lines 385-390)

#### 3. Incorrect Color Extraction ✅
- **Problem**: Extraction was returning white/gray colors instead of actual brand colors (e.g., Ladbrokes red)
- **Solution**: Enhanced color priority logic to:
  - Filter out white/black colors early in analysis
  - Prioritize vibrant brand colors over frequency
  - Use color type scoring (red/green/blue) to identify dominant brand colors
  - Add vibrancy detection for better color selection
- **Files Modified**: `themeExtractor.service.ts` (lines 660-798)

#### 4. CORS Proxy Issues ✅
- **Problem**: Proxies returning blocked content or geo-restrictions
- **Solution**: Improved content validation and fallback to URL pattern matching
- **Files Modified**: `themeExtractor.service.ts` (lines 465-569)

#### 5. Pattern Matching Enhancement ✅
- **Problem**: Limited subdomain support (e.g., sports.ladbrokes.com not recognized)
- **Solution**: Enhanced pattern matching to handle:
  - Base domain extraction from subdomains
  - Multiple URL variations per brand
  - Comprehensive brand database with accurate colors
- **Files Modified**: `themeExtractor.service.ts` (lines 214-463)

#### 6. Debug Information System ✅
- **Problem**: No visibility into extraction process for troubleshooting
- **Solution**: Added comprehensive debug tracking:
  - Extraction method (full/pattern/mixed)
  - Proxies attempted
  - HTML size and colors found
  - Primary color detection method
  - Debug display in preview modal
- **Files Modified**: `themeExtractor.service.ts` (lines 42-48, 59-64, debug tracking throughout), `BrandingPage.tsx` (lines 1267-1287)

### Technical Architecture

#### State Management
- **Zustand**: Used for theme configuration state with persistence
- **Brand Structure**: Each brand has ID, name, theme, timestamps, and extractionUrl
- **Deep Copying**: Prevents reference issues when switching brands

#### Theme Extraction Flow
1. **URL Input**: User enters competitor site URL
2. **CORS Proxy Attempts**: Try 3 different proxies sequentially
3. **Content Validation**: Check for valid website content vs. blocked pages
4. **HTML Parsing**: Extract CSS, colors, fonts, and layout patterns
5. **Color Analysis**: Prioritize vibrant brand colors using frequency and type scoring
6. **Pattern Fallback**: Use known brand patterns if HTML extraction fails
7. **Theme Generation**: Convert extracted data to OperatorTheme format
8. **Debug Info**: Track extraction method and results

#### Color Extraction Algorithm
1. **CSS Collection**: Gather styles from `<style>` tags, inline styles, and CSS variables
2. **Color Normalization**: Convert RGB/rgba to hex, normalize format
3. **Frequency Analysis**: Count color occurrences, filter white/black early
4. **Brand Color Detection**: Identify red/green/blue colors with vibrancy scoring
5. **Dominant Type Selection**: Choose most prominent color type (red/green/blue)
6. **Element Extraction**: Look for brand-specific selectors and elements
7. **Theme Mapping**: Apply extracted colors to theme properties

### Known Betting Site Patterns
The system includes specific color schemes for:
- **Betway**: Green (#00A651) and dark blue (#1B365D)
- **Ladbrokes**: Red (#C8102E) and gold (#FFD700)
- **Bet365**: Yellow (#FFCC02) and navy (#143E52)
- **Paddy Power**: Dark green (#004833) and bright green (#00ff00)
- **Sky Bet**: Blue (#0077BE) and orange (#FFA500)
- **William Hill**: Navy (#004B87) and orange (#F39800)
- **Coral**: Orange (#FF6B35) and blue (#2E86AB)
- **Unibet**: Green (#17805E) and orange (#F39A2B)

### File Structure
```
src/
├── shared/
│   ├── services/
│   │   └── themeExtractor.service.ts    # Core extraction logic
│   └── utils/
│       └── colorUtils.ts                # Color manipulation utilities
├── stores/
│   └── themeConfigStore.ts              # Brand and theme state management
└── apps/frontend/pages/branding/
    └── BrandingPage.tsx                 # Main branding UI
```

### Current Status
- ✅ All major functionality working
- ✅ Brand-specific uploads and URLs
- ✅ Enhanced color extraction with debugging
- ✅ Comprehensive pattern matching
- ✅ Debug information display
- 🟢 Ready for production testing

### Next Steps / Future Improvements

1. **Testing & Validation**
   - Test extraction with more betting sites
   - Validate color accuracy across different brands
   - Test upload functionality with various image formats

2. **Enhancement Opportunities**
   - Add more betting site patterns as needed
   - Implement color scheme suggestions based on industry standards
   - Add image processing for logo/banner optimization
   - Consider adding CSS-in-JS extraction for modern sites

3. **Performance & Reliability**
   - Add caching for successful extractions
   - Implement retry logic with exponential backoff
   - Add rate limiting for CORS proxy requests
   - Consider adding more CORS proxy services

4. **User Experience**
   - Add loading states during extraction
   - Implement theme comparison feature
   - Add bulk brand import functionality
   - Consider adding theme export/import

### Development Environment
- **Framework**: React with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: npm

### Important Notes
- All CORS proxy services are external and may have rate limits
- Color extraction prioritizes vibrancy and brand recognition over frequency
- Pattern matching serves as reliable fallback when proxy access fails
- Debug information is crucial for troubleshooting extraction issues
- Brand data persists in localStorage via Zustand middleware

### Commands to Resume Development
```bash
# Start development server
npm run dev

# Access the branding page
http://localhost:5173/betco/branding

# Test extraction with known sites
- https://www.ladbrokes.com (should extract red theme)
- https://www.betway.com (should extract green theme)
- https://sports.ladbrokes.com (should handle subdomain)
```

### Contact Points for Issues
- Color extraction not working: Check debug info in preview modal
- CORS issues: Verify proxy services are operational
- Brand switching issues: Check deep copying in store
- Upload issues: Verify immediate save functionality

---
*Last Updated: July 19, 2025*
*Development Session: Theme Extraction Enhancement*