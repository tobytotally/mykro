import { Routes, Route, Navigate } from 'react-router-dom';
import { FrontendLayout } from '../../shared/components/Layout/FrontendLayout';
import { HomePage } from './pages/HomePage';
import { SportsPage } from './pages/SportsPage';
import { BrowseBetsPage } from './pages/BrowseBetsPage';
import { BrowseBetsLivePage } from './pages/BrowseBetsLivePage';
import { BetSlipPage } from './pages/BetSlipPage';
import { ResultPage } from './pages/ResultPage';
import { BrandingPage } from './pages/branding/BrandingPage';

export function FrontendApp() {
  return (
    <Routes>
      <Route path="/" element={<FrontendLayout />}>
        <Route index element={<Navigate to="/betco/browse-bets" replace />} />
        <Route path="sports" element={<SportsPage />} />
        <Route path="sports/:sport" element={<SportsPage />} />
        <Route path="browse-bets/live" element={<BrowseBetsLivePage />} />
        <Route path="browse-bets/:brandSlug" element={<BrowseBetsPage />} />
        <Route path="browse-bets" element={<BrowseBetsPage />} />
        <Route path="bet-slip" element={<BetSlipPage />} />
        <Route path="bet-slip/:brandSlug" element={<BetSlipPage />} />
        <Route path="result/:betId" element={<ResultPage />} />
        <Route path="result/:betId/:brandSlug" element={<ResultPage />} />
        <Route path="live" element={<div className="p-8 text-center">Live Betting Coming Soon</div>} />
        <Route path="live/:brandSlug" element={<div className="p-8 text-center">Live Betting Coming Soon</div>} />
        <Route path="casino" element={<div className="p-8 text-center">Casino Coming Soon</div>} />
        <Route path="casino/:brandSlug" element={<div className="p-8 text-center">Casino Coming Soon</div>} />
        <Route path="promotions" element={<div className="p-8 text-center">Promotions Coming Soon</div>} />
        <Route path="promotions/:brandSlug" element={<div className="p-8 text-center">Promotions Coming Soon</div>} />
        <Route path="mykro" element={<div className="p-8 text-center">Mykro Info Page Coming Soon</div>} />
      </Route>
      <Route path="/branding" element={<BrandingPage />} />
    </Routes>
  );
}
