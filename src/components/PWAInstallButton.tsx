import React from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useCart } from '../context/CartContext';
import { useImages } from '../context/ImageContext';
import { ClientImage } from './ClientImage';
import {
  Download,
  Smartphone,
} from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'header' | 'banner' | 'card' | 'footer';
  className?: string;
  onAction?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'header',
  className = '',
  onAction,
}) => {
  const {
    isInstallable,
    isInstalled,
    isInIframe,
    install,
  } = usePWAInstall();

  const { setIsPwaModalOpen } = useCart();
  const { clientImages } = useImages();

  // If already running as an installed PWA, do not render the install trigger
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    if (onAction) {
      onAction();
    }

    if (isInstallable && !isInIframe) {
      const outcome = await install();
      if (outcome) {
        return;
      }
    }
    // Open the global guide modal
    setIsPwaModalOpen(true);
  };

  return (
    <>
      {/* 1. Header Variant */}
      {variant === 'header' && (
        <button
          type="button"
          onClick={handleInstallClick}
          id="btn-pwa-install-header"
          className={`group flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-extrabold text-[11px] uppercase tracking-wider transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 ${className}`}
          title="Install Frankie's App on your phone"
        >
          <div className="w-5 h-5 rounded-lg bg-gradient-to-r from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] text-[#000000] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Download className="w-3 h-3" />
          </div>
          <span className="hidden sm:inline">GET APP</span>
          <span className="sm:hidden">APP</span>
        </button>
      )}

      {/* 2. Banner Variant */}
      {variant === 'banner' && (
        <div
          id="pwa-install-banner"
          className={`bg-gradient-to-r from-[#004fb3] via-[#0580FF] to-[#000000] border border-cyan-300/30 rounded-2xl p-4 sm:p-5 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
        >
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <ClientImage
              slotKey="site:logo"
              src={clientImages.logo || '/logo.webp'}
              fallbackSrc="/logo.webp"
              alt="Frankie's App Icon"
              className="w-12 h-12 rounded-2xl shadow-md border border-white/20 shrink-0 object-cover bg-white"
            />
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D1A03F] font-heading">
                  OFFICIAL BEACH APP
                </span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white font-semibold">
                  Free • No Store Fee
                </span>
              </div>
              <h4 className="font-heading font-extrabold text-sm sm:text-base text-white uppercase mt-0.5 leading-snug">
                Install Frankie's On Your Phone
              </h4>
              <p className="text-xs text-white/80 line-clamp-1">
                Sea-view menu, beach ride details &amp; seaside updates right on your home screen!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleInstallClick}
              id="btn-pwa-install-banner-action"
              className="w-full sm:w-auto bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] font-heading font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{isInstallable && !isInIframe ? 'Install App Now' : 'Get App / Add to Screen'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Card Variant */}
      {variant === 'card' && (
        <div
          id="pwa-install-card"
          className={`bg-white rounded-2xl border border-[#dde0d5] p-5 shadow-xs flex items-center justify-between gap-4 ${className}`}
        >
          <div className="flex items-center gap-3">
            <ClientImage
              slotKey="site:logo"
              src={clientImages.logo || '/logo.webp'}
              fallbackSrc="/logo.webp"
              alt="Frankie's App Icon"
              className="w-11 h-11 rounded-xl shadow-xs border border-gray-100 shrink-0 object-cover"
            />
            <div className="text-left">
              <h5 className="font-heading font-extrabold text-xs sm:text-sm text-[#000000] uppercase">
                Frankie's Mobile App
              </h5>
              <p className="text-[11px] text-[#526b74]">
                Works offline &amp; launches in full screen
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleInstallClick}
            id="btn-pwa-install-card-action"
            className="bg-[#0580FF] hover:bg-[#004fb3] text-white font-heading font-extrabold text-xs uppercase tracking-wider px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0"
          >
            Install
          </button>
        </div>
      )}

      {/* 4. Footer Variant */}
      {variant === 'footer' && (
        <button
          type="button"
          onClick={handleInstallClick}
          id="btn-pwa-install-footer"
          className={`inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-[#D1A03F] transition-colors cursor-pointer ${className}`}
        >
          <Smartphone className="w-4 h-4 text-[#D1A03F]" />
          <span>Install Phone App</span>
        </button>
      )}
    </>
  );
};
