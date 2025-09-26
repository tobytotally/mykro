# Mykro App Summary

## Overview
Mykro is a white-label betting platform that integrates charitable donations into the sports betting experience. It enables betting operators to offer users the option to donate a percentage of their stake to charity while placing bets, creating social impact through gambling.

## Core Objective
Transform sports betting into a force for good by:
- **Seamless Integration**: Allow bettors to donate 1-10% of their stake to charity with every bet
- **White-Label Solution**: Enable betting operators to quickly deploy branded platforms with customized themes
- **Social Impact**: Channel gambling activity toward charitable causes and community benefit
- **Multi-Stakeholder Ecosystem**: Serve bettors, operators, charities, and donors through integrated platforms

## Key Features

### 1. **Automated Theme Extraction**
- Extract brand themes (colors, fonts, layouts) from competitor betting sites
- Support for major operators: Betway, Ladbrokes, Bet365, Paddy Power, etc.
- CORS proxy system with intelligent fallback to pattern matching
- Real-time theme application and preview capabilities

### 2. **Multi-Application Architecture**
- **Frontend App** (`/betco`): Primary betting interface for end users
- **Operator Admin** (`/operator-admin`): Management dashboard for betting operators
- **Donor Portal** (`/donor`): Impact tracking and charity management for donors
- **Branding System**: Advanced theme configuration and brand management

### 3. **Donation Integration**
- Configurable donation percentages (1-10% of stake)
- Charity selection from operator-curated lists
- Impact tracking and giving streak maintenance
- Real-time donation calculation and processing

### 4. **State Management & Persistence**
- Zustand-based state management with localStorage persistence
- Brand-specific theme storage and configuration
- User bet slip management and donation preferences
- Cross-application data synchronization

## Technical Architecture

### **Stack**
- **Frontend**: React 18 + TypeScript + Vite
- **State Management**: Zustand with persistence middleware
- **Styling**: Tailwind CSS with dynamic theming
- **Routing**: React Router v6
- **UI Components**: Headless UI + Heroicons
- **Charts**: Recharts for analytics
- **Database**: Supabase (production) / localStorage (development)

### **Project Structure**
```
src/
├── apps/
│   ├── frontend/         # Main betting interface (/betco)
│   ├── operator-admin/   # Operator management (/operator-admin)
│   ├── donor-portal/     # Donor dashboard (/donor)
├── shared/
│   ├── components/       # Reusable UI components
│   ├── services/         # Business logic services
│   └── utils/            # Utility functions
├── stores/               # Zustand state stores
├── contexts/             # React contexts (Theme, Brand)
└── components/           # App-level components
```

### **Core Services**
- **Theme Extractor**: Analyzes competitor sites and extracts brand themes
- **Color Utils**: Advanced color manipulation and theme generation
- **AI Design Analyzer**: Enhanced design analysis capabilities
- **Mock Data Service**: Development data for sports betting

## Development Status
- ✅ **Theme Extraction System**: Fully functional with debug capabilities
- ✅ **Brand Management**: Multi-brand support with per-brand configuration
- ✅ **Betting Interface**: Complete sports betting UI with donation integration
- ✅ **Admin Dashboards**: Operator and donor management interfaces
- ✅ **State Persistence**: Robust data management across applications
- 🟢 **Ready for Production Testing**

## Business Model
- **B2B SaaS**: License platform to betting operators
- **White-Label**: Operators deploy branded versions quickly
- **Social Impact**: Generate charitable donations through betting activity
- **Multi-Revenue**: Serve operators, enable donations, track impact

## Next Steps
1. Production testing with real betting operators
2. Integration with payment gateways and charity APIs
3. Enhanced analytics and reporting features
4. Mobile application development
5. Compliance with gambling regulations

## Development Environment
- **Port**: 4002 (as per hotel configuration)
- **Development Server**: `npm run dev`
- **Build**: `npm run build`
- **Linting**: `npm run lint`

---
*Mykro combines the excitement of sports betting with the satisfaction of charitable giving, creating a platform where every bet can make a positive impact.*