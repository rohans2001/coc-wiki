import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { EntityDetailPage } from './pages/EntityDetailPage';
import { ProgressionPage } from './pages/ProgressionPage';
import { ComparePage } from './pages/ComparePage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminImportPage } from './pages/admin/AdminImportPage';

// Scroll to top helper on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#07090E] text-stone-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <ScrollToTop />
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Category Hubs */}
          <Route path="/troops" element={<CategoryPage categoryType="troop" />} />
          <Route path="/troops/:slug" element={<EntityDetailPage categoryType="troop" />} />

          <Route path="/heroes" element={<CategoryPage categoryType="hero" />} />
          <Route path="/heroes/:slug" element={<EntityDetailPage categoryType="hero" />} />

          <Route path="/defenses" element={<CategoryPage categoryType="defense" />} />
          <Route path="/defenses/:slug" element={<EntityDetailPage categoryType="defense" />} />

          <Route path="/buildings" element={<CategoryPage categoryType="defense" />} />
          <Route path="/buildings/:slug" element={<EntityDetailPage categoryType="defense" />} />

          <Route path="/spells" element={<CategoryPage categoryType="spell" />} />
          <Route path="/spells/:slug" element={<EntityDetailPage categoryType="spell" />} />

          <Route path="/equipment" element={<CategoryPage categoryType="equipment" />} />
          <Route path="/equipment/:slug" element={<EntityDetailPage categoryType="equipment" />} />

          <Route path="/pets" element={<CategoryPage categoryType="pet" />} />
          <Route path="/pets/:slug" element={<EntityDetailPage categoryType="pet" />} />

          <Route path="/siege-machines" element={<CategoryPage categoryType="siege" />} />
          <Route path="/siege-machines/:slug" element={<EntityDetailPage categoryType="siege" />} />

          <Route path="/resources" element={<CategoryPage categoryType="resource" />} />
          <Route path="/resources/:slug" element={<EntityDetailPage categoryType="resource" />} />

          <Route path="/mechanics" element={<CategoryPage categoryType="mechanic" />} />
          <Route path="/mechanics/:slug" element={<EntityDetailPage categoryType="mechanic" />} />

          {/* Tools & Progression */}
          <Route path="/progression" element={<ProgressionPage />} />
          <Route path="/th/:level" element={<ProgressionPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/calculators" element={<CalculatorsPage />} />

          {/* Data & About */}
          <Route path="/data-sources" element={<DataSourcesPage />} />
          <Route path="/about/data" element={<DataSourcesPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Admin Ingestion Pipeline */}
          <Route path="/admin/imports" element={<AdminImportPage />} />

          {/* Fallback 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
