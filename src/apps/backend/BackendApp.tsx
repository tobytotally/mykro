import { Routes, Route } from 'react-router-dom';
import { BackendLayout } from '../../shared/components/Layout/BackendLayout';
import { DashboardPage } from './pages/DashboardPage';
import { DonationsPage } from './pages/DonationsPage';
import { ConfigurationPage } from './pages/ConfigurationPage';
import { CharitiesPage } from './pages/CharitiesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

export function BackendApp() {
  return (
    <Routes>
      <Route path="/" element={<BackendLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="donations" element={<DonationsPage />} />
        <Route path="configuration" element={<ConfigurationPage />} />
        <Route path="charities" element={<CharitiesPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="impact-stories" element={<div>Impact Stories Coming Soon</div>} />
      </Route>
    </Routes>
  );
}
