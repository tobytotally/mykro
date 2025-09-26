# Mykro - Charitable Betting Platform

A modern React-based betting platform that turns every bet into an opportunity for charitable giving.

## 🌟 Features

- **Multi-App Architecture**: Frontend betting app, operator admin panel, and donor portal
- **Mykro Integration**: Turn bets into charitable donations
- **Theme System**: Dynamic branding and theming capabilities
- **Responsive Design**: Works on desktop and mobile
- **Screenshot Automation**: Automated visual testing and documentation

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Available Apps

1. **Betting Frontend** (`/betco`) - Sports betting interface with Mykro integration
2. **Operator Admin** (`/operator-admin`) - Backend management dashboard
3. **Donor Portal** (`/donor`) - Charitable giving and impact tracking

## 🔧 Development

### Scripts

```bash
npm run dev                    # Development server
npm run build                  # Production build
npm run preview                # Preview build
npm run lint                   # Run ESLint
npm run typecheck              # TypeScript checking
npm run screenshot             # Take app screenshots
npm run screenshot:betting-states  # Betting slip state screenshots
```

### Project Structure

```
src/
├── apps/                  # Multi-app architecture
│   ├── frontend/         # Betting app
│   ├── operator-admin/   # Admin dashboard
│   └── donor-portal/     # Charity portal
├── shared/               # Shared components and utilities
│   ├── components/       # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   └── services/        # API and utility services
└── stores/              # Zustand state management
```

## 🚀 Deployment

### GitHub Pages (Automatic)

1. Push to main branch
2. GitHub Actions will automatically build and deploy
3. Site will be available at `https://yourusername.github.io/mykro/`

### Manual Deployment

```bash
# Deploy to GitHub Pages
npm run deploy:gh-pages

# Test build locally
npm run deploy:build
```

## 🎨 Features

- **Dynamic Theming**: Real-time brand customization
- **Mykro Onboarding**: Multi-pathway user experience
- **Betting Slip States**: Complex state management with visual feedback
- **Screenshot Automation**: Playwright-powered visual testing
- **Mobile Responsive**: Optimized for all devices

## 🧪 Testing

The project includes automated screenshot testing for:
- All app pages (desktop and mobile)
- Betting slip states
- Mykro onboarding flows

## 📄 License

MIT License - feel free to use this project as a foundation for your own charitable betting platform.