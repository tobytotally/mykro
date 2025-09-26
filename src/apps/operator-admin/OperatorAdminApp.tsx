import { Routes, Route } from 'react-router-dom';
import { OperatorAdminLayout } from '../../shared/components/Layout/OperatorAdminLayout';
import { DashboardPage } from './pages/DashboardPage';
import { DonationsPage } from './pages/DonationsPage';
import { ConfigurationPage } from './pages/ConfigurationPage';
import { CharitiesPage } from './pages/CharitiesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PaymentPage } from './pages/PaymentPage';

export function OperatorAdminApp() {
  return (
    <Routes>
      <Route path="/" element={<OperatorAdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="donations" element={<DonationsPage />} />
        <Route path="configuration" element={<ConfigurationPage />} />
        <Route path="charities" element={<CharitiesPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="impact-stories" element={<div>Impact Stories Coming Soon</div>} />
      </Route>
    </Routes>
  );
}