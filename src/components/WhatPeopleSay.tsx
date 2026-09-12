import React from 'react';
import { Star, ArrowRight, Sparkles } from 'lucide-react';
import { CUSTOMER_REVIEWS, ASSETS } from '../data/restaurantData';
import { ClientImage } from './ClientImage';

interface WhatPeopleSayProps {
  onViewAllReviews: () => void;
  onOpenGallery: () => void;
}

export const WhatPeopleSay: React.FC<WhatPeopleSayProps> = ({
  onViewAllReviews,
  onOpenGallery,
}) => {
  // We showcase the first 3 reviews + the sunset image card
  const topReviews = CUSTOMER_REVIEWS.slice(0, 3);

  return (
    <section className="bg-[#EEEFE9] py-12 sm:py-16 border-t border-[#e2e5dc]" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white border border-[#dde0d5] text-[#3c4043] shadow-xs">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                Google Reviews
              </span>
              <div className="flex items-center gap-0.5 text-[#D1A03F]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D1A03F] text-[#D1A03F]" />
                ))}
                <span className="text-xs font-extrabold text-[#000000] ml-1">4.9 / 5</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-[#000000] font-heading">
              WHAT PEOPLE SAY
            </h2>
            <p className="text-xs sm:text-sm text-[#526b74] font-medium mt-1">
              Real reviews from our amazing customers on Google.
            </p>
            {/* Signature Golden Brush Accent Underneath */}
            <div className="h-1.5 w-16 bg-gradient-to-r from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] rounded-full mt-2"></div>
          </div>

          <button
            onClick={onViewAllReviews}
            id="link-view-all-reviews"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0580FF] hover:text-[#002866] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>VIEW ALL 17 REVIEWS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Columns: 3 Review Cards + 1 Sunset Photo Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* Top 3 Reviews */}
          {topReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_18px_rgba(0,0,0,0.04)] border border-[#e2e5dc] flex flex-col justify-between hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div>
                {/* 5 Golden Stars */}
                <div className="flex items-center gap-1 text-[#D1A03F]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D1A03F] text-[#D1A03F]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-[13px] text-[#3d535b] font-normal leading-relaxed mt-3.5">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#f0f2eb]">
                <div className="flex items-center gap-2.5">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#dde0d5]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#000000]">
                      {review.name}
                    </h4>
                    <span className="text-[10px] text-[#69828b] font-medium block">
                      {review.date}
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#4285F4] font-bold bg-blue-50 px-2 py-0.5 rounded-full">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  Google
                </span>
              </div>
            </div>
          ))}

          {/* 4th Card: Sunset Beach Photography Card */}
          <div
            onClick={onOpenGallery}
            className="group relative rounded-2xl overflow-hidden shadow-[0_4px_18px_rgba(0,0,0,0.08)] border border-[#e2e5dc] cursor-pointer min-h-[220px] bg-[#1a2e35]"
            title="Click to view beachfront sunset gallery"
          >
            <ClientImage
              src={ASSETS.sunsetBeach}
              slotKey="site:sunsetBeach"
              fallbackSrc={ASSETS.sunsetBeach}
              alt="Golden beachfront ocean sunset with silhouettes of palm trees"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white text-xs font-bold flex items-center gap-1.5 drop-shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Golden Hour at Frankie's
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
