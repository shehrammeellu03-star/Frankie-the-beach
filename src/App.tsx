import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TripAdvisorBanner } from './components/TripAdvisorBanner';
import { ScrollToTop } from './components/ScrollToTop';
import { MenuPdfModal } from './components/MenuPdfModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { useCart } from './context/CartContext';
import { useImages } from './context/ImageContext';
import { preloadImages } from './components/ClientImage';
import { CLIENT_IMAGES, ASSETS } from './data/restaurantData';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { TripAdvisorPage } from './pages/TripAdvisorPage';
import { CharityPage } from './pages/CharityPage';
import { AdminPage } from './pages/AdminPage';
import { PWAInstallModal } from './components/PWAInstallModal';

export default function App() {
  const navigate = useNavigate();
  const {
    isPdfMenuOpen,
    setIsPdfMenuOpen,
    isPwaModalOpen,
    setIsPwaModalOpen,
  } = useCart();
  const { slotOverrides } = useImages();

  // Dynamic Browser Tab Favicon & App Icon synchronization
  useEffect(() => {
    const activeLogo = slotOverrides['site:logo'] || slotOverrides['logo'] || slotOverrides['site:appIcon'];
    if (activeLogo) {
      // Update all favicon link elements
      const iconLinks = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
      iconLinks.forEach((link) => {
        link.href = activeLogo;
      });

      // Update or create Apple Touch Icon for iOS web app installations
      let appleIcon = document.querySelector<HTMLLinkElement>("link[rel='apple-touch-icon']");
      if (!appleIcon) {
        appleIcon = document.createElement('link');
        appleIcon.rel = 'apple-touch-icon';
        document.head.appendChild(appleIcon);
      }
      appleIcon.href = activeLogo;
    }
  }, [slotOverrides]);

  useEffect(() => {
    // Preload critical authentic photography immediately for instantaneous first-frame appearance
    preloadImages([
      ASSETS.kiosk,
      ASSETS.barSelfie,
      ASSETS.heroBurger,
      ASSETS.loadedFries,
      ASSETS.boardwalkDog,
      ASSETS.chocolateSundaeCone,
      ASSETS.tropicalDrink,
      CLIENT_IMAGES.childrenKiddiesCorner,
    ]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#EEEFE9] text-[#000000] font-sans selection:bg-[#0580FF] selection:text-white">
      {/* Auto-scroll to top on page change */}
      <ScrollToTop />

      {/* 1. Global Seaside Header with router links */}
      <Header />

      {/* 2. Route View Container */}
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/tripadvisor" element={<TripAdvisorPage />} />
          <Route path="/tripadvisor/restaurant" element={<TripAdvisorPage initialProfile="restaurant" />} />
          <Route path="/tripadvisor/attractions" element={<TripAdvisorPage initialProfile="attractions" />} />
          <Route path="/charity" element={<CharityPage />} />
          <Route path="/giving-back" element={<Navigate to="/charity" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/images" element={<AdminPage />} />
          <Route path="/upload" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global TripAdvisor Banners across all pages */}
      <TripAdvisorBanner />

      {/* 3. Global Seaside Footer */}
      <Footer />

      {/* Global PWA Install Guide Modal (Rendered at top level so it never hides behind anything) */}
      <PWAInstallModal
        isOpen={isPwaModalOpen}
        onClose={() => setIsPwaModalOpen(false)}
      />

      {/* Printable Menu PDF Modal */}
      <MenuPdfModal
        isOpen={isPdfMenuOpen}
        onClose={() => setIsPdfMenuOpen(false)}
      />

      {/* PWA Offline Network Indicator */}
      <OfflineIndicator />
    </div>
  );
}
