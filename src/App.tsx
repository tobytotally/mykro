import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { BrandProvider } from './contexts/BrandContext';
import { FrontendApp } from './apps/frontend/FrontendApp';
import { OperatorAdminApp } from './apps/operator-admin/OperatorAdminApp';
import { DonorPortalApp } from './apps/donor-portal/DonorPortalApp';
import { DigitalExperiencePage } from './DigitalExperiencePage';
import { IndustriesPage } from './IndustriesPage';
import { ImpactPage } from './ImpactPage';
import { PartnersPage } from './PartnersPage';
import { AboutPage } from './AboutPage';
import { TechnologyPage } from './TechnologyPage';
import { TasksPage } from './TasksPage';
import { TestBranding } from './TestBranding';
import MykroGiving from './MykroGiving';
import MykroSolutions from './MykroSolutions';
import { FloatingAppNav } from './shared/components/FloatingAppNav';
import { PersistentNavigation } from './shared/components/PersistentNavigation';
import { ThemeApplier } from './components/ThemeApplier';

function AppContent() {
  const location = useLocation();
  
  // Check if we're in the branding preview iframe
  const isBrandingPreview = location.pathname === '/betco/branding-preview';
  
  // Check if we're on website pages (not app pages)
  const isWebsitePage = ['/', '/industries', '/impact', '/partners', '/about', '/technology', '/mykro/giving', '/mykro/solutions'].includes(location.pathname);
  
  return (
    <>
      {/* Show persistent navigation only on website pages and not in branding preview */}
      {isWebsitePage && !isBrandingPreview && <PersistentNavigation />}
      
      <Routes>
        {/* Landing page with app selection */}
        <Route path="/" element={<DigitalExperiencePage />} />
        
        {/* Industries page */}
        <Route path="/industries" element={<IndustriesPage />} />
        
        {/* Website pages */}
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/test-branding" element={<TestBranding />} />
        
        {/* Mykro Ecosystem Pages */}
        <Route path="/mykro/giving" element={<MykroGiving />} />
        <Route path="/mykro/solutions" element={<MykroSolutions />} />
        
        {/* Betting App - moved to /betco */}
        <Route path="/betco/*" element={<FrontendApp />} />
        
        {/* Operator Admin Routes */}
        <Route path="/operator-admin/*" element={<OperatorAdminApp />} />
        
        {/* Donor Portal Routes */}
        <Route path="/donor/*" element={<DonorPortalApp />} />
      </Routes>
      
      {/* Persistent floating navigation */}
      <FloatingAppNav />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <BrandProvider>
          <ThemeApplier>
            <AppContent />
          </ThemeApplier>
        </BrandProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
