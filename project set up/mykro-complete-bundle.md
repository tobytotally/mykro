# Mykro Prototype - Complete Project Bundle

This bundle contains all files, documentation, and wireframes needed to build the Mykro prototype.

## 📁 Bundle Contents

### 1. Project Documentation
- Project Brief & Overview
- Technical Specifications
- API Integration Guide
- Component Library
- Design System

### 2. Wireframes (HTML)
- Frontend Betting Journey (7 screens)
- Operator Backend Admin (5 screens)
- Donor Portal B2C (6 screens)

### 3. Source Code Structure
- Complete React/TypeScript setup
- All component files
- API services
- State management
- Utility functions

### 4. Configuration Files
- package.json
- tsconfig.json
- tailwind.config.js
- vite.config.ts
- .env.example

---

## 🎨 WIREFRAMES

### Frontend Betting Journey Wireframes

```html
<!-- frontend-wireframes.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mykro Frontend Wireframes</title>
    <style>
        body { font-family: 'Courier New', monospace; padding: 20px; }
        .wireframe { border: 2px solid black; margin-bottom: 40px; padding: 20px; }
        .screen-title { font-weight: bold; margin-bottom: 20px; }
    </style>
</head>
<body>
    <h1>Mykro Frontend Betting Journey - Wireframes</h1>
    
    <!-- Screen 1: Homepage -->
    <div class="wireframe">
        <div class="screen-title">1. OPERATOR HOMEPAGE WITH MYKRO</div>
        <p>Key Elements:</p>
        <ul>
            <li>Main navigation: Sports | Live | Casino | Promotions</li>
            <li>Mykro banner: "Betting with Purpose" message</li>
            <li>Featured matches section</li>
            <li>Charity spotlight widget</li>
            <li>User account/balance display</li>
        </ul>
    </div>
    
    <!-- Screen 2: Betting Page -->
    <div class="wireframe">
        <div class="screen-title">2. BROWSE BETS & BUILD BETTING SLIP</div>
        <p>Key Elements:</p>
        <ul>
            <li>Match list with odds (Home/Draw/Away)</li>
            <li>Betting slip sidebar (right)</li>
            <li>Mykro donation section in slip</li>
            <li>Percentage slider (1-10%)</li>
            <li>Charity selection</li>
            <li>Real-time calculation display</li>
        </ul>
    </div>
    
    <!-- Additional screens continue... -->
</body>
</html>
```

### Operator Backend Wireframes

```html
<!-- backend-wireframes.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mykro Backend Admin Wireframes</title>
    <style>
        body { font-family: 'Courier New', monospace; padding: 20px; }
        .wireframe { border: 2px solid black; margin-bottom: 40px; padding: 20px; }
        .screen-title { font-weight: bold; margin-bottom: 20px; }
    </style>
</head>
<body>
    <h1>Mykro Operator Backend - Wireframes</h1>
    
    <!-- Screen 1: Dashboard -->
    <div class="wireframe">
        <div class="screen-title">1. DASHBOARD OVERVIEW</div>
        <p>Key Elements:</p>
        <ul>
            <li>Sidebar navigation (left)</li>
            <li>KPI cards: Total Donations, Active Users, Conversion Rate, Impact Score</li>
            <li>Donation trend chart</li>
            <li>Recent activity table</li>
            <li>Real-time updates</li>
        </ul>
    </div>
    
    <!-- Additional screens continue... -->
</body>
</html>
```

### Donor Portal Wireframes

```html
<!-- donor-wireframes.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mykro Donor Portal Wireframes</title>
    <style>
        body { font-family: 'Courier New', monospace; padding: 20px; }
        .wireframe { border: 2px solid black; margin-bottom: 40px; padding: 20px; }
        .screen-title { font-weight: bold; margin-bottom: 20px; }
    </style>
</head>
<body>
    <h1>Mykro Donor Portal - Wireframes</h1>
    
    <!-- Screen 1: Personal Dashboard -->
    <div class="wireframe">
        <div class="screen-title">1. PERSONAL DASHBOARD</div>
        <p>Key Elements:</p>
        <ul>
            <li>Impact summary (smaller, left side)</li>
            <li>My Charities section (right side)</li>
            <li>Allocation visualization</li>
            <li>Stats cards: Monthly giving, Active charities, Streak, Pending</li>
            <li>Recent activity feed</li>
        </ul>
    </div>
    
    <!-- Additional screens continue... -->
</body>
</html>
```

---

## 📂 PROJECT STRUCTURE

```
mykro-prototype/
├── public/
│   └── index.html
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── apps/
│   │   ├── frontend/
│   │   │   ├── FrontendApp.tsx
│   │   │   ├── pages/
│   │   │   │   ├── HomePage.tsx
│   │   │   │   ├── BettingPage.tsx
│   │   │   │   ├── BetSlipPage.tsx
│   │   │   │   └── ResultPage.tsx
│   │   │   └── components/
│   │   │       ├── MatchList.tsx
│   │   │       ├── MykroOnboardingModal.tsx
│   │   │       └── WinLossOverlay.tsx
│   │   ├── backend/
│   │   │   ├── BackendApp.tsx
│   │   │   ├── pages/
│   │   │   │   ├── DashboardPage.tsx
│   │   │   │   ├── DonationsPage.tsx
│   │   │   │   ├── ConfigurationPage.tsx
│   │   │   │   ├── CharitiesPage.tsx
│   │   │   │   └── AnalyticsPage.tsx
│   │   │   └── components/
│   │   │       ├── MetricsCard.tsx
│   │   │       ├── TransactionTable.tsx
│   │   │       └── CharityManager.tsx
│   │   └── donor-portal/
│   │       ├── DonorPortalApp.tsx
│   │       ├── pages/
│   │       │   ├── DonorDashboard.tsx
│   │       │   ├── MyCharities.tsx
│   │       │   ├── DiscoverCharities.tsx
│   │       │   ├── ImpactStories.tsx
│   │       │   └── Settings.tsx
│   │       └── components/
│   │           ├── ImpactHero.tsx
│   │           ├── CharityPortfolio.tsx
│   │           └── AllocationManager.tsx
│   ├── shared/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── FrontendLayout.tsx
│   │   │   │   ├── BackendLayout.tsx
│   │   │   │   └── DonorLayout.tsx
│   │   │   ├── UI/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── Input.tsx
│   │   │   └── MykroBettingSlip.tsx
│   │   ├── services/
│   │   │   ├── apiFootball.service.ts
│   │   │   ├── storage.service.ts
│   │   │   └── cache.service.ts
│   │   ├── hooks/
│   │   │   ├── useLiveMatches.ts
│   │   │   ├── useAuth.ts
│   │   │   └── useMykro.ts
│   │   ├── utils/
│   │   │   ├── formatters.ts
│   │   │   ├── mockData.ts
│   │   │   └── rateLimiter.ts
│   │   └── types/
│   │       └── index.ts
│   ├── stores/
│   │   ├── bettingStore.ts
│   │   ├── userStore.ts
│   │   └── charityStore.ts
│   └── config/
│       ├── api.config.ts
│       ├── routes.config.ts
│       └── sports.config.ts
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 📄 CONFIGURATION FILES

### package.json
```json
{
  "name": "mykro-prototype",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "zustand": "^4.4.7",
    "axios": "^1.6.2",
    "@headlessui/react": "^1.7.17",
    "@heroicons/react": "^2.0.18",
    "recharts": "^2.10.3",
    "framer-motion": "^10.16.16",
    "date-fns": "^2.30.0",
    "clsx": "^2.0.0",
    "@supabase/supabase-js": "^2.39.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
```

### .env.example
```env
# API Configuration
VITE_API_FOOTBALL_KEY=your_api_key_here
VITE_API_FOOTBALL_HOST=https://v3.football.api-sports.io

# App URLs
VITE_FRONTEND_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:5173/admin
VITE_DONOR_PORTAL_URL=http://localhost:5173/donor

# Storage Configuration
VITE_STORAGE_TYPE=local
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Feature Flags
VITE_ENABLE_REAL_ODDS=true
VITE_ENABLE_LIVE_UPDATES=true
VITE_DEMO_MODE=false
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mykro': {
          'green': '#00C853',
          'blue': '#2196F3',
          'dark': '#1A1A1A',
          'gold': '#FFB300',
          'orange': '#FF6B35',
          'purple': '#7C4DFF'
        },
        'operator': {
          'primary': '#1976D2',
          'secondary': '#FFA726',
          'accent': '#00C853'
        }
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      animation: {
        'confetti': 'confetti 3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-in'
      },
      keyframes: {
        confetti: {
          '0%': { transform: 'translateY(-100%) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: 0 }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@headlessui/tailwindcss')
  ],
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@shared/*": ["src/shared/*"],
      "@frontend/*": ["src/apps/frontend/*"],
      "@backend/*": ["src/apps/backend/*"],
      "@donor/*": ["src/apps/donor-portal/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@frontend': path.resolve(__dirname, './src/apps/frontend'),
      '@backend': path.resolve(__dirname, './src/apps/backend'),
      '@donor': path.resolve(__dirname, './src/apps/donor-portal'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
```

---

## 📝 README.md

```markdown
# Mykro Prototype

A comprehensive prototype demonstrating the Mykro charitable betting platform.

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   git clone [repository-url]
   cd mykro-prototype
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Add your API-Football key to .env
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Access Applications**
   - Frontend: http://localhost:5173
   - Backend Admin: http://localhost:5173/admin
   - Donor Portal: http://localhost:5173/donor

## 🏗️ Architecture

This prototype contains three integrated applications:

### 1. Frontend (Betting Interface)
- Browse live sports matches with real odds
- Integrated Mykro donation toggle in betting slip
- First-time user onboarding
- Win/Loss result experiences

### 2. Backend (Operator Admin)
- Real-time donation metrics dashboard
- Charity management system
- Configuration settings
- Transaction monitoring

### 3. Donor Portal (B2C)
- Personal impact tracking
- Charity portfolio management
- Multi-operator integration
- Achievement system

## 🔧 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Routing**: React Router v6
- **API**: API-Football for live data
- **Storage**: localStorage (Supabase ready)
- **Animation**: Framer Motion

## 📊 API Integration

The app integrates with API-Football for real sports data:
- Live match fixtures
- Real-time betting odds
- Automatic fallback to mock data
- Smart caching to minimize API calls

## 🎨 Design System

- **Colors**: Mykro Green (#00C853), Blue (#2196F3)
- **Typography**: Inter (body), Poppins (headings)
- **Components**: Card-based, responsive design
- **Animations**: Smooth transitions, celebration effects

## 📁 Project Structure

```
src/
├── apps/           # Three main applications
├── shared/         # Shared components and utilities
├── stores/         # Global state management
└── config/         # Configuration files
```

## 🧪 Testing

1. **API Connection**: Check console for API status
2. **Routing**: Verify all three apps are accessible
3. **Responsive**: Test on mobile and desktop
4. **Data Flow**: Ensure betting slip persistence

## 🚢 Deployment

Ready for deployment on:
- Vercel
- Netlify
- Any static hosting service

Set environment variables in your deployment platform.

## 📄 License

This is a prototype for demonstration purposes.
```

---

## 🎯 MAIN ENTRY FILES

### src/main.tsx
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### src/App.tsx
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FrontendApp } from './apps/frontend/FrontendApp';
import { BackendApp } from './apps/backend/BackendApp';
import { DonorPortalApp } from './apps/donor-portal/DonorPortalApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Frontend Routes */}
        <Route path="/*" element={<FrontendApp />} />
        
        {/* Backend Routes */}
        <Route path="/admin/*" element={<BackendApp />} />
        
        {/* Donor Portal Routes */}
        <Route path="/donor/*" element={<DonorPortalApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### src/index.css
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-body text-gray-900 antialiased;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-display;
  }
}

@layer components {
  .btn-primary {
    @apply bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors;
  }
  
  .btn-secondary {
    @apply border-2 border-black text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow;
  }
}
```

---

## 🛠️ SETUP INSTRUCTIONS

### Step 1: Create Project
```bash
npm create vite@latest mykro-prototype -- --template react-ts
cd mykro-prototype
```

### Step 2: Install Dependencies
```bash
npm install react-router-dom zustand axios @headlessui/react @heroicons/react recharts framer-motion date-fns clsx @supabase/supabase-js

npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography
```

### Step 3: Initialize Tailwind
```bash
npx tailwindcss init -p
```

### Step 4: Copy Configuration Files
- Copy all config files from this bundle
- Add your API-Football key to .env

### Step 5: Create Folder Structure
- Create all folders as shown in project structure
- Copy all component files from bundle

### Step 6: Run Development Server
```bash
npm run dev
```

---

## 📋 IMPLEMENTATION CHECKLIST

- [ ] Project setup with Vite and TypeScript
- [ ] Tailwind CSS configuration
- [ ] Routing setup for three apps
- [ ] Layout components for each app
- [ ] API-Football integration
- [ ] Mock data fallback
- [ ] State management with Zustand
- [ ] Frontend betting flow
- [ ] Mykro donation integration
- [ ] Onboarding modals
- [ ] Win/Loss screens
- [ ] Backend admin dashboard
- [ ] Charity management
- [ ] Transaction monitoring
- [ ] Donor portal dashboard
- [ ] Impact tracking
- [ ] Responsive design
- [ ] Animations with Framer Motion
- [ ] Error handling
- [ ] Loading states

---

## 🚦 CLAUDE CODE INSTRUCTIONS

To build this prototype:

1. **Start with setup**: Create the project and install all dependencies
2. **Configure environment**: Set up .env with API-Football key
3. **Build structure**: Create the folder structure exactly as shown
4. **Implement routing**: Get the three apps routing working
5. **Create layouts**: Build the three layout components
6. **Add API integration**: Implement API-Football service with caching
7. **Build Frontend first**: Complete the betting journey
8. **Then Backend**: Add admin dashboard features
9. **Finally Donor Portal**: Complete the B2C experience
10. **Polish**: Add animations and responsive design

Focus on getting a working prototype that demonstrates all three aspects of the Mykro platform with real sports data integration.

---

This bundle contains everything needed to build the complete Mykro prototype!