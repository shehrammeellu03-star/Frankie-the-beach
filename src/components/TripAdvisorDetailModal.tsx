import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Utensils, Sparkles, MapPin, CheckCircle2, ThumbsUp, ShieldCheck, Heart } from 'lucide-react';
import { TRIPADVISOR_PROFILES_DATA } from '../data/restaurantData';
import { TripAdvisorProfileData } from '../types';

interface TripAdvisorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'restaurant' | 'attractions';
}

export const TripAdvisorDetailModal: React.FC<TripAdvisorDetailModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'restaurant',
}) => {
  const [activeTab, setActiveTab] = useState<'restaurant' | 'attractions'>(initialTab);

  // Sync initial tab whenever it opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Lock body scroll & listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentData: TripAdvisorProfileData = TRIPADVISOR_PROFILES_DATA[activeTab];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      id="tripadvisor-detail-modal-wrapper"
    >
      {/* Dark Dim Backdrop - Clicking anywhere outside closes the modal */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs cursor-pointer transition-opacity"
        onClick={onClose}
        aria-label="Click background to close modal"
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 z-10"
        id="tripadvisor-detail-modal"
      >
        {/* Top Header */}
        <div className="bg-[#000000] text-white p-3.5 sm:p-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* TripAdvisor Owl Icon */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 p-1.5 flex items-center justify-center border border-white/15 shrink-0">
              <svg viewBox="0 0 100 65" className="w-full h-auto" fill="none">
                <path
                  d="M50 20 C42 8, 26 8, 14 15 C8 18.5, 4 24, 4 33 C4 47, 16 58, 30 58 C38 58, 45 53, 50 46 C55 53, 62 58, 70 58 C84 58, 96 47, 96 33 C96 24, 92 18.5, 86 15 C74 8, 58 8, 50 20 Z"
                  fill="#ffffff"
                />
                <circle cx="30" cy="36" r="18" fill="#00aa6c" />
                <circle cx="70" cy="36" r="18" fill="#d9381e" />
                <circle cx="30" cy="36" r="13" fill="#ffffff" />
                <circle cx="70" cy="36" r="13" fill="#ffffff" />
                <circle cx="30" cy="36" r="5" fill="#000000" />
                <circle cx="70" cy="36" r="5" fill="#000000" />
                <polygon points="50,33 46,45 54,45" fill="#D1A03F" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#D1A03F] font-heading">
                  TripAdvisor UK Official Data
                </span>
                <span className="text-white/40 hidden sm:inline">•</span>
                <span className="text-[10px] sm:text-[11px] text-emerald-400 font-bold hidden sm:inline">Verified Pages</span>
              </div>
              <h2 className="text-sm sm:text-lg font-heading font-extrabold text-white leading-tight">
                Frankie's At The Beach TripAdvisor Profiles
              </h2>
            </div>
          </div>
        </div>

        {/* Tab Switcher & The 1 Close Button */}
        <div className="bg-[#f8f9f7] border-b border-gray-200 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap">
            <button
              onClick={() => setActiveTab('restaurant')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'restaurant'
                  ? 'bg-[#0580FF] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-emerald-300" />
              <span>Restaurant (981 Reviews)</span>
            </button>

            <button
              onClick={() => setActiveTab('attractions')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'attractions'
                  ? 'bg-gradient-to-r from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] text-[#000000] shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Beach Rides (450+ Reviews)</span>
            </button>
          </div>

          {/* Quick External Link & Single Cross Button */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href={currentData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#f26522] hover:text-[#d9531e] transition-colors"
            >
              <span>Open live page</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* The single cross button */}
            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 rounded-lg bg-red-600 hover:bg-red-700 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm shrink-0"
              aria-label="Close modal"
              title="Close modal (Esc)"
              id="btn-close-modal-tabs"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Key Metrics Banner */}
          <div className="bg-gradient-to-br from-[#000000] to-[#001f3f] text-white rounded-2xl p-5 sm:p-7 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Score & Bubbles */}
              <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-white/15 pb-5 md:pb-0 md:pr-6">
                <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-2 font-heading">
                  TripAdvisor Verified Listing
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                  {currentData.title}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-300 text-xs mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D1A03F] shrink-0" />
                  <span>{currentData.location}</span>
                </div>

                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-4xl sm:text-5xl font-black font-heading text-white">
                    {currentData.rating.toFixed(1)}
                  </span>
                  <div>
                    {/* 5 TripAdvisor green circles */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((bubble) => (
                        <span
                          key={bubble}
                          className="w-4 h-4 rounded-full bg-[#00aa6c] border border-white/40 shadow-xs"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-300 font-bold block mt-1">
                      {currentData.reviewCountLabel} • 100% Recommended
                    </span>
                  </div>
                </div>

                <div className="mt-3 p-2.5 bg-white/5 rounded-xl border border-white/10 text-xs text-emerald-300 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{currentData.rank}</span>
                </div>
              </div>

              {/* Sub-Ratings Breakdown */}
              <div className="md:col-span-7 space-y-3">
                <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-amber-300 mb-2">
                  TripAdvisor Traveler Ratings Breakdown
                </h4>
                {Object.entries(currentData.subRatings).map(([subKey, val]) => (
                  <div key={subKey} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-200">{subKey}</span>
                      <span className="text-[#D1A03F] font-bold">{val.toFixed(1)} / 5.0</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#00aa6c] to-emerald-400 rounded-full w-full" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Highlights & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#f8f9f7] rounded-2xl p-4 sm:p-5 border border-gray-200">
              <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#000000] mb-2.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Features &amp; Highlights</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-700">
                {currentData.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#f8f9f7] rounded-2xl p-4 sm:p-5 border border-gray-200">
              <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#000000] mb-2.5 flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#D1A03F]" />
                <span>Visitor Favorites &amp; Attractions</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {currentData.popularItems.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-bold text-gray-800 bg-white border border-gray-200 px-2.5 py-1 rounded-lg shadow-2xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Authentic TripAdvisor Reviews Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-heading font-extrabold text-[#000000] uppercase">
                  Authentic TripAdvisor Traveler Reviews
                </h3>
                <p className="text-xs text-gray-500">
                  Showing real feedback left on {currentData.shortTitle}
                </p>
              </div>

              <a
                href={currentData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#f26522] hover:bg-[#d9531e] text-white text-xs font-heading font-extrabold uppercase tracking-wider px-3.5 py-2 rounded-xl shadow-xs transition-all"
              >
                <span>Write a Review</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentData.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    {/* Author and verification */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-heading font-extrabold text-sm text-[#000000]">
                            {rev.author}
                          </span>
                          {rev.verified && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/60">
                              <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                              Verified
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400 block">{rev.location}</span>
                      </div>

                      {/* 5 green bubbles */}
                      <div className="flex items-center gap-0.5" title="5 of 5 rating">
                        {[1, 2, 3, 4, 5].map((b) => (
                          <span
                            key={b}
                            className="w-2.5 h-2.5 rounded-full bg-[#00aa6c] inline-block"
                          />
                        ))}
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-gray-900 mb-1.5">
                      "{rev.title}"
                    </h4>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                    <span>{rev.date} • {rev.visitType}</span>
                    <span className="flex items-center gap-1 text-gray-500 font-medium">
                      <ThumbsUp className="w-3 h-3 text-[#00aa6c]" />
                      <span>{rev.helpfulVotes}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Call to action bar */}
          <div className="bg-[#f0f9fa] rounded-2xl p-4 sm:p-5 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-heading font-extrabold text-sm text-[#0580FF] uppercase">
                Want to read all {currentData.reviewCountLabel} on TripAdvisor?
              </h4>
              <p className="text-xs text-gray-600 mt-0.5">
                Visit the official live listing on TripAdvisor UK to see traveler photos and full threads.
              </p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
              <a
                href={currentData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0580FF] hover:bg-[#004fb3] text-white font-heading font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-sm transition-all"
              >
                <span>View On TripAdvisor UK</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
