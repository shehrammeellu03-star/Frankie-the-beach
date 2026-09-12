import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePWAInstall } from '../hooks/usePWAInstall';
import {
  Download,
  Smartphone,
  Share,
  PlusSquare,
  X,
  CheckCircle,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Info,
} from 'lucide-react';
import { useImages } from '../context/ImageContext';
import { ClientImage } from './ClientImage';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { clientImages } = useImages();
  const {
    isInstallable,
    isIOS,
    isAndroid,
    isInIframe,
    install,
    openInBrowser,
  } = usePWAInstall();

  const [copied, setCopied] = useState(false);
  const [deviceTab, setDeviceTab] = useState<'ios' | 'android'>('android');
  const [installSuccess, setInstallSuccess] = useState(false);

  // Sync tab with detected OS on open
  useEffect(() => {
    if (isOpen) {
      if (isIOS) {
        setDeviceTab('ios');
      } else {
        setDeviceTab('android');
      }
    }
  }, [isOpen, isIOS, isAndroid]);

  // Close on Escape key and lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto overscroll-contain flex items-start sm:items-center justify-center animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-global-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 flex flex-col max-h-[92vh] sm:max-h-[88vh] my-auto overflow-hidden animate-in zoom-in-95 duration-150 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Sticky Header - Always pinned at top */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-3.5 border-b border-gray-100 bg-[#f8f9f5] shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <ClientImage
              slotKey="site:logo"
              src={clientImages.logo || '/logo.webp'}
              fallbackSrc="/logo.webp"
              alt="Frankie's App Icon"
              className="w-10 h-10 rounded-xl shadow-xs border border-gray-200 object-cover bg-white shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold tracking-widest text-[#0580FF] uppercase font-heading">
                  OFFICIAL APP
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase">
                  Free PWA
                </span>
              </div>
              <h3 id="pwa-global-modal-title" className="font-heading font-extrabold text-sm sm:text-base text-[#000000] uppercase truncate">
                Frankie's @ The Beach
              </h3>
            </div>
          </div>

          {/* Single prominent close button */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-red-600 hover:bg-red-700 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0"
            aria-label="Close modal"
            title="Close"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* 2. Scrollable Body Content */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-3.5 overscroll-contain flex-1">
          {/* Preview Window Notice if Running inside Iframe */}
          {isInIframe && (
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 space-y-2">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-[#D1A03F] shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  <strong>Preview Window:</strong> Mobile browsers (Chrome &amp; Safari) only allow installing apps from your real browser, not inside preview frames.
                </p>
              </div>
              <button
                type="button"
                onClick={openInBrowser}
                className="w-full bg-[#0580FF] hover:bg-[#004fb3] active:scale-98 text-white font-heading font-extrabold text-xs uppercase tracking-wider py-2.5 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Mobile Browser to Install</span>
              </button>
            </div>
          )}

          {/* Direct 1-Tap Install Button if Native Prompt is Available */}
          {isInstallable && !isInIframe && (
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-heading font-extrabold text-xs uppercase tracking-wide">
                  Ready For Instant Installation
                </span>
              </div>
              <button
                type="button"
                onClick={async () => {
                  const outcome = await install();
                  if (outcome) {
                    setInstallSuccess(true);
                    setTimeout(() => {
                      onClose();
                    }, 1800);
                  }
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-heading font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Install App on Phone Now</span>
              </button>
            </div>
          )}

          {/* Device Selector Tabs: iPhone vs Android */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-gray-500">
                Step-By-Step Guide:
              </span>
              <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200">
                <button
                  type="button"
                  onClick={() => setDeviceTab('ios')}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-heading font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    deviceTab === 'ios'
                      ? 'bg-[#0580FF] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  iPhone (Safari)
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceTab('android')}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-heading font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    deviceTab === 'android'
                      ? 'bg-[#0580FF] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Android (Chrome)
                </button>
              </div>
            </div>

            {/* iPhone Tab Content */}
            {deviceTab === 'ios' && (
              <div className="p-3.5 rounded-2xl bg-[#f8f9f5] border border-[#dde0d5] space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 font-heading font-extrabold text-xs text-[#000000] uppercase">
                  <Smartphone className="w-4 h-4 text-[#0580FF]" />
                  <span>On iPhone &amp; iPad (Safari):</span>
                </div>
                <ol className="space-y-1.5 text-xs text-[#496068] pl-2 list-decimal list-inside leading-relaxed">
                  <li>
                    Open in <strong>Safari</strong> browser.
                  </li>
                  <li>
                    Tap the <strong>Share button</strong>{' '}
                    <span className="inline-flex items-center gap-1 bg-white border border-gray-200 px-1.5 py-0.5 rounded text-[11px] font-bold text-[#0580FF] mx-0.5 shadow-2xs">
                      <Share className="w-3 h-3 text-[#0580FF]" /> Share
                    </span>{' '}
                    at the bottom bar.
                  </li>
                  <li>
                    Scroll down and tap{' '}
                    <span className="inline-flex items-center gap-1 bg-white border border-gray-200 px-1.5 py-0.5 rounded text-[11px] font-bold text-[#0580FF] mx-0.5 shadow-2xs">
                      <PlusSquare className="w-3 h-3 text-[#0580FF]" /> Add to Home Screen
                    </span>.
                  </li>
                  <li>
                    Tap <strong>"Add"</strong> in the top-right corner. Done!
                  </li>
                </ol>
              </div>
            )}

            {/* Android Tab Content */}
            {deviceTab === 'android' && (
              <div className="p-3.5 rounded-2xl bg-[#f8f9f5] border border-[#dde0d5] space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 font-heading font-extrabold text-xs text-[#000000] uppercase">
                  <Smartphone className="w-4 h-4 text-[#0580FF]" />
                  <span>On Android (Chrome / Edge):</span>
                </div>
                <ol className="space-y-1.5 text-xs text-[#496068] pl-2 list-decimal list-inside leading-relaxed">
                  <li>
                    Open in <strong>Google Chrome</strong>.
                  </li>
                  <li>
                    Tap the <strong>Menu (3 dots ⋮)</strong> in the top-right.
                  </li>
                  <li>
                    Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                  </li>
                  <li>
                    Confirm to launch Frankie's from your apps drawer anytime!
                  </li>
                </ol>
              </div>
            )}
          </div>

          {/* Friendly Note Explaining Why PWA doesn't download an APK file */}
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong>No heavy file download:</strong> Installs straight to your home screen with zero storage clutter and works offline!
            </span>
          </div>
        </div>

        {/* 3. Sticky Footer - Always pinned at bottom */}
        <div className="p-3 sm:p-4 border-t border-gray-100 bg-white shrink-0 flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-heading font-extrabold text-xs uppercase tracking-wider py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-gray-500" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-[#0580FF] hover:bg-[#004fb3] text-white font-heading font-extrabold text-xs uppercase tracking-wider py-2.5 px-3 rounded-xl transition-all cursor-pointer shadow-xs text-center active:scale-98"
          >
            Got It
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {installSuccess && (
        <div className="fixed bottom-4 right-4 z-[10000] flex items-center gap-2.5 rounded-2xl bg-emerald-700 px-4 py-3 text-xs font-bold text-white shadow-xl animate-in slide-in-from-bottom duration-200">
          <CheckCircle className="w-5 h-5 text-emerald-200 shrink-0" />
          <span>Frankie's @ The Beach installed successfully on your home screen!</span>
        </div>
      )}
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
};
