# Instructions for Claude Code - Building Mykro Prototype

## Overview
You need to build a functional prototype for Mykro, a platform that integrates charitable giving into sports betting. The prototype consists of three interconnected applications sharing the same codebase.

## What You're Building

### 1. Frontend Betting Integration (`/`)
- Sports betting interface where users can browse matches and place bets
- Mykro donation toggle integrated into betting slip
- First-time user onboarding flow
- Win/Loss result screens with charitable impact messaging

### 2. Operator Admin Backend (`/admin`)
- Dashboard showing donation metrics and analytics
- Configuration settings for operators
- Charity management interface
- Transaction monitoring and reporting

### 3. Donor Portal B2C (`/donor`)
- Personal dashboard for donors to track their impact
- Charity discovery and portfolio management
- Connected betting platforms overview
- Impact stories and achievements

## Development Steps

### Step 1: Project Setup
```bash
# Create the project
npm create vite@latest mykro-prototype -- --template react-ts
cd mykro-prototype

# Install all dependencies
npm install react-router-dom zustand axios @headlessui/react @heroicons/react recharts framer-motion date-fns clsx @supabase/supabase-js
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography

# Initialize Tailwind
npx tailwindcss init -p
```

### Step 2: Configure Environment
1. Create `.env` file with API-Football credentials
2. Set up the folder structure as specified
3. Configure Tailwind with the Mykro color scheme
4. Set up routing configuration

### Step 3: Core Implementation Order

1. **Set up routing and layouts** (30 mins)
   - Main App.tsx with route splitting
   - Three layout components (Frontend, Backend, Donor)
   - Basic navigation

2. **Create shared components** (45 mins)
   - MykroBettingSlip component
   - Reusable UI components (buttons, cards, modals)
   - Loading and error states

3. **Implement API integration** (45 mins)
   - API-Football service with caching
   - Mock data generator for fallback
   - Storage service for local data

4. **Build Frontend betting journey** (2 hours)
   - Homepage with featured matches
   - Sports betting page with live odds
   - Betting slip with Mykro integration
   - Onboarding modals
   - Result screens (win/loss)

5. **Build Backend admin** (1.5 hours)
   - Dashboard with metrics
   - Configuration settings page
   - Charity management
   - Transaction list

6. **Build Donor portal** (1.5 hours)
   - Personal impact dashboard
   - Charity portfolio view
   - Settings and allocation
   - Impact stories feed

### Step 4: Polish and Testing
- Add animations with Framer Motion
- Ensure responsive design
- Test API integration with real data
- Implement proper error handling

## Key Technical Requirements

### API Integration
- Use API-Football for real match data
- Cache responses for 10 minutes
- Fall back to mock data if API fails
- Handle rate limiting (100 requests/day on free tier)

### State Management
- Use Zustand for global state
- Persist betting slip and user preferences
- Keep Mykro settings synchronized

### Styling
- Use Tailwind CSS exclusively
- Follow the Mykro color scheme
- Make everything responsive
- Add subtle animations for better UX

### Data Storage
- Use localStorage for now
- Structure data to be Supabase-ready
- Store user preferences, betting history, and Mykro settings

## Important Features to Include

### Frontend
- Real-time odds updates
- Mykro toggle with percentage slider
- Charity selection in betting slip
- Social login options in modal
- Celebration animations for wins
- Supportive messaging for losses

### Backend
- Live donation ticker
- Configurable donation percentages
- Charity approval workflow
- Financial reconciliation tools
- Export functionality for reports

### Donor Portal
- Visual impact metrics
- Charity allocation interface
- Multi-operator connection
- Achievement/gamification system
- Social sharing features

## API-Football Integration Notes

1. **Authentication**: Use headers with 'x-rapidapi-key'
2. **Endpoints to use**:
   - `/fixtures?date={date}` for matches
   - `/odds?fixture={id}` for betting odds
3. **Caching strategy**: Cache fixtures for 10 mins, odds for 5 mins
4. **Error handling**: Always have mock data ready as fallback

## Design Guidelines

- **Colors**: 
  - Primary: Mykro Green (#00C853)
  - Secondary: Mykro Blue (#2196F3)
  - Accent: Gold (#FFB300)
- **Typography**: Inter for body, Poppins for headings
- **Spacing**: Use Tailwind's default scale
- **Components**: Card-based design with subtle shadows
- **Animations**: Smooth transitions, celebrate positive moments

## File Structure to Create

```
src/
├── App.tsx (main router)
├── apps/
│   ├── frontend/
│   │   ├── FrontendApp.tsx
│   │   ├── pages/
│   │   └── components/
│   ├── backend/
│   │   ├── BackendApp.tsx
│   │   ├── pages/
│   │   └── components/
│   └── donor-portal/
│       ├── DonorPortalApp.tsx
│       ├── pages/
│       └── components/
├── shared/
│   ├── components/
│   ├── services/
│   ├── utils/
│   ├── hooks/
│   └── types/
└── stores/
    ├── bettingStore.ts
    ├── userStore.ts
    └── charityStore.ts
```

## Testing Your Implementation

1. **API Connection**: Check console for successful API connection on startup
2. **Routing**: Ensure all three apps are accessible at their respective paths
3. **Data Flow**: Test betting slip persistence and Mykro calculations
4. **Responsive**: Check on mobile and desktop viewports
5. **Error States**: Disconnect internet to test fallback behavior

## Final Checklist

- [ ] All three apps accessible via routing
- [ ] API-Football integration working with real data
- [ ] Mock data fallback when API unavailable
- [ ] Betting slip with Mykro donation toggle
- [ ] Onboarding flow for new users
- [ ] Win/Loss result screens
- [ ] Admin dashboard with metrics
- [ ] Donor portal with impact tracking
- [ ] Responsive on all devices
- [ ] Smooth animations and transitions
- [ ] Data persists in localStorage
- [ ] Clean, well-commented code

## Getting Help

- Check the provided type definitions for data structures
- Use the mock data generator when API is unavailable
- Refer to the component examples for patterns
- The storage service handles both local and future Supabase integration

Start with the basic structure and progressively add features. Focus on getting the core betting flow working first, then add the admin and donor portals.