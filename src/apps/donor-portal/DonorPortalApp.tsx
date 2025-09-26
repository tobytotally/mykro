import { Routes, Route } from 'react-router-dom';
import { DonorLayout } from '../../shared/components/Layout/DonorLayout';
import { DonorDashboard } from './pages/DonorDashboard';
import { MyCharities } from './pages/MyCharities';
import { DiscoverCharities } from './pages/DiscoverCharities';
import { ImpactStories } from './pages/ImpactStories';
import { Settings } from './pages/Settings';

export function DonorPortalApp() {
  return (
    <Routes>
      <Route path="/" element={<DonorLayout />}>
        <Route index element={<DonorDashboard />} />
        <Route path="charities" element={<MyCharities />} />
        <Route path="discover" element={<DiscoverCharities />} />
        <Route path="stories" element={<ImpactStories />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
