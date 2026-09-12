import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  MessageSquare,
  CheckCircle,
  ThumbsUp,
  Sparkles,
  ExternalLink,
  Utensils,
  MapPin,
  ShieldCheck,
  Heart,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import { CUSTOMER_REVIEWS, TRIPADVISOR_LINKS, TRIPADVISOR_PROFILES_DATA } from '../data/restaurantData';
import { CustomerReview, TripAdvisorProfileData } from '../types';

type ReviewSourceFilter = 'all' | 'tripadvisor-restaurant' | 'tripadvisor-attractions' | 'google';

export const ReviewsPage: React.FC = () => {
  const [sourceFilter, setSourceFilter] = useState<ReviewSourceFilter>('tripadvisor-restaurant');
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);

  // New review form states
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTag, setNewTag] = useState('TripAdvisor Review');
  const [newComment, setNewComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const restaurantProfile: TripAdvisorProfileData = TRIPADVISOR_PROFILES_DATA.restaurant;
  const attractionsProfile: TripAdvisorProfileData = TRIPADVISOR_PROFILES_DATA.attractions;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
      rating: newRating,
      comment: newComment.trim(),
      date: 'Just now',
      tag: newTag,
    };

    setReviews([newRev, ...reviews]);
    setSubmittedMessage(true);
    setNewName('');
    setNewComment('');
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowForm(false);
    }, 2500);
  };

  return (
    <div className="flex-1 bg-[#EEEFE9] pb-20">
      
      {/* Page Header Banner */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-1 sm:mt-2 mb-8 sm:mb-10">
        <div className="bg-[#0580FF] text-white py-12 sm:py-16 px-4 sm:px-8 rounded-3xl relative overflow-hidden shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <nav className="flex justify-center items-center gap-2 text-xs uppercase tracking-widest text-sky-200 mb-3 font-semibold">
              <Link to="/" className="hover:text-white transition-colors">
                HOME
              </Link>
              <span>/</span>
              <span className="text-[#D1A03F]">REVIEWS</span>
            </nav>

            {/* Badges for both TripAdvisor profiles & Google */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 font-heading border border-emerald-400/30">
                <span className="w-2 h-2 rounded-full bg-[#00aa6c] animate-pulse" />
                <span>TRIPADVISOR: RESTAURANT &amp; FOOD (981 REVIEWS • 5.0)</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 font-heading border border-amber-400/30">
                <span className="w-2 h-2 rounded-full bg-[#D1A03F] animate-pulse" />
                <span>TRIPADVISOR: BEACH RIDES (450+ REVIEWS • 5.0)</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-sky-100 font-heading border border-white/15">
                <span>GOOGLE VERIFIED (4.9)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white font-heading">
              AUTHENTIC REVIEWS &amp; RATINGS
            </h1>

            <div className="flex justify-center my-3">
              <svg viewBox="0 0 80 10" className="w-16 text-[#D1A03F] fill-none stroke-current stroke-[3] stroke-linecap-round">
                <path d="M0 5 Q10 0 20 5 T40 5 T60 5 T80 5" />
              </svg>
            </div>

            <p className="text-base sm:text-lg text-sky-100 max-w-2xl mx-auto font-medium">
              Verified data and authentic customer feedback across both TripAdvisor UK listings and Google.
            </p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Primary Platform Selector Tabs */}
        <div className="bg-white rounded-3xl p-3 sm:p-4 border border-[#dde0d5] shadow-xs mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            
            {/* 1. TripAdvisor Restaurant */}
            <button
              onClick={() => setSourceFilter('tripadvisor-restaurant')}
              className={`p-3 sm:p-4 rounded-2xl flex items-center gap-3 transition-all cursor-pointer text-left border ${
                sourceFilter === 'tripadvisor-restaurant'
                  ? 'bg-emerald-50/80 border-emerald-500 shadow-sm ring-1 ring-emerald-500/20'
                  : 'bg-[#fcfdfa] border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Utensils className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 font-heading block">
                  TripAdvisor (The Main)
                </span>
                <h3 className="text-xs sm:text-sm font-heading font-extrabold text-[#000000] truncate">
                  Restaurant &amp; Food
                </h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs font-black text-gray-900">5.0</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((b) => (
                      <span key={b} className="w-2 h-2 rounded-full bg-[#00aa6c]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 font-bold ml-1">981 Reviews</span>
                </div>
              </div>
            </button>

            {/* 2. TripAdvisor Children */}
            <button
              onClick={() => setSourceFilter('tripadvisor-attractions')}
              className={`p-3 sm:p-4 rounded-2xl flex items-center gap-3 transition-all cursor-pointer text-left border ${
                sourceFilter === 'tripadvisor-attractions'
                  ? 'bg-amber-50/80 border-amber-500 shadow-sm ring-1 ring-amber-500/20'
                  : 'bg-[#fcfdfa] border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] text-[#000000] flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 font-heading block">
                  TripAdvisor (The Children)
                </span>
                <h3 className="text-xs sm:text-sm font-heading font-extrabold text-[#000000] truncate">
                  Beach Rides &amp; Play
                </h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs font-black text-gray-900">5.0</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((b) => (
                      <span key={b} className="w-2 h-2 rounded-full bg-[#00aa6c]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 font-bold ml-1">450+ Reviews</span>
                </div>
              </div>
            </button>

            {/* 3. Google Verified */}
            <button
              onClick={() => setSourceFilter('google')}
              className={`p-3 sm:p-4 rounded-2xl flex items-center gap-3 transition-all cursor-pointer text-left border ${
                sourceFilter === 'google'
                  ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-1 ring-blue-500/20'
                  : 'bg-[#fcfdfa] border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-xs">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-800 font-heading block">
                  Google Reviews
                </span>
                <h3 className="text-xs sm:text-sm font-heading font-extrabold text-[#000000] truncate">
                  Diner Community
                </h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs font-black text-gray-900">4.9</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] text-gray-500 font-bold ml-1">340+ Reviews</span>
                </div>
              </div>
            </button>

            {/* 4. All Combined */}
            <button
              onClick={() => setSourceFilter('all')}
              className={`p-3 sm:p-4 rounded-2xl flex items-center gap-3 transition-all cursor-pointer text-left border ${
                sourceFilter === 'all'
                  ? 'bg-[#0580FF]/10 border-[#0580FF] shadow-sm ring-1 ring-[#0580FF]/20'
                  : 'bg-[#fcfdfa] border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#0580FF] text-white flex items-center justify-center shrink-0 shadow-xs">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0580FF] font-heading block">
                  All Platforms
                </span>
                <h3 className="text-xs sm:text-sm font-heading font-extrabold text-[#000000] truncate">
                  Combined View
                </h3>
                <span className="text-[11px] text-gray-500 font-bold block mt-0.5">
                  1,700+ Total Reviews
                </span>
              </div>
            </button>

          </div>
        </div>

        {/* SECTION A: TRIPADVISOR RESTAURANT DATA PROFILE */}
        {sourceFilter === 'tripadvisor-restaurant' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Detailed Profile Showcase Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left: Overall Info */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full font-heading">
                      TripAdvisor UK Verified Profile (The Main)
                    </span>
                    <span className="text-xs text-gray-400">ID: {restaurantProfile.tripadvisorId}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#000000]">
                    {restaurantProfile.title}
                  </h2>

                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{restaurantProfile.location}</span>
                  </div>

                  {/* Rating Bubble Display */}
                  <div className="flex items-baseline gap-3 pt-2">
                    <span className="text-5xl font-black font-heading text-[#000000]">
                      5.0
                    </span>
                    <div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((bubble) => (
                          <span
                            key={bubble}
                            className="w-4 h-4 rounded-full bg-[#00aa6c] border border-white inline-block shadow-2xs"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-emerald-800 font-bold block mt-1">
                        {restaurantProfile.reviewCountLabel} • 100% Recommended on TripAdvisor
                      </span>
                    </div>
                  </div>

                  {/* Ranking Ribbon */}
                  <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{restaurantProfile.rank}</span>
                  </div>

                  {/* Features */}
                  <div className="pt-2">
                    <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-gray-700 mb-2">
                      Key Highlights &amp; Amenities:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {restaurantProfile.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg"
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Sub-Ratings & Direct Links */}
                <div className="lg:col-span-6 bg-[#f9faf8] rounded-2xl p-5 sm:p-6 border border-gray-200 space-y-4">
                  <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#000000] flex items-center justify-between">
                    <span>TripAdvisor Sub-Ratings Breakdown</span>
                    <span className="text-emerald-700 font-bold">5.0 / 5.0 Perfect Score</span>
                  </h4>

                  <div className="space-y-3">
                    {Object.entries(restaurantProfile.subRatings).map(([key, score]) => (
                      <div key={key} className="space-y-1 text-xs">
                        <div className="flex justify-between font-bold text-gray-800">
                          <span>{key}</span>
                          <span className="text-emerald-700">{score.toFixed(1)} / 5.0</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#00aa6c] to-emerald-500 rounded-full w-full" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Popular Dishes */}
                  <div className="pt-3 border-t border-gray-200">
                    <span className="text-[11px] font-bold text-gray-700 block mb-1.5">
                      Top Traveler Mentions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {restaurantProfile.popularItems.map((dish, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-bold text-[#000000] bg-white border border-gray-200 px-2 py-0.5 rounded shadow-2xs"
                        >
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link to Live TripAdvisor */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={restaurantProfile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f26522] hover:bg-[#d9531e] text-white font-heading font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Read All 981 on TripAdvisor UK</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={restaurantProfile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 transition-colors"
                    >
                      <span>Leave TripAdvisor Review</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>

              </div>
            </div>

            {/* Authentic TripAdvisor Reviews Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-heading font-extrabold text-[#000000] uppercase">
                    Authentic Diner Reviews from TripAdvisor UK
                  </h3>
                  <p className="text-xs text-gray-500">
                    Showing verified traveller experiences for Frankie's Restaurant &amp; Kiosk
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {restaurantProfile.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white rounded-2xl p-5 border border-emerald-100/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-heading font-extrabold text-sm text-[#000000]">
                              {rev.author}
                            </span>
                            <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                              <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                              Verified
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-400">{rev.location}</span>
                        </div>

                        {/* 5 TripAdvisor bubbles */}
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((b) => (
                            <span key={b} className="w-2.5 h-2.5 rounded-full bg-[#00aa6c]" />
                          ))}
                        </div>
                      </div>

                      <h4 className="text-xs font-extrabold text-gray-900 mb-1.5">
                        "{rev.title}"
                      </h4>

                      <p className="text-xs text-gray-600 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                      <span>{rev.date} • {rev.visitType}</span>
                      <span className="flex items-center gap-1 text-gray-600 font-medium">
                        <ThumbsUp className="w-3 h-3 text-[#00aa6c]" />
                        <span>{rev.helpfulVotes}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION B: TRIPADVISOR CHILDREN (BEACH RIDES) DATA PROFILE */}
        {sourceFilter === 'tripadvisor-attractions' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Detailed Profile Showcase Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left: Overall Info */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-900 bg-amber-50 border border-amber-300 px-3 py-1 rounded-full font-heading">
                      TripAdvisor UK Verified Profile (The Children)
                    </span>
                    <span className="text-xs text-gray-400">ID: {attractionsProfile.tripadvisorId}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#000000]">
                    {attractionsProfile.title}
                  </h2>

                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{attractionsProfile.location}</span>
                  </div>

                  {/* Rating Bubble Display */}
                  <div className="flex items-baseline gap-3 pt-2">
                    <span className="text-5xl font-black font-heading text-[#000000]">
                      5.0
                    </span>
                    <div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((bubble) => (
                          <span
                            key={bubble}
                            className="w-4 h-4 rounded-full bg-[#00aa6c] border border-white inline-block shadow-2xs"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-amber-900 font-bold block mt-1">
                        {attractionsProfile.reviewCountLabel} • 100% Family Approved on TripAdvisor
                      </span>
                    </div>
                  </div>

                  {/* Ranking Ribbon */}
                  <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs font-bold text-amber-950 flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#D1A03F] shrink-0" />
                    <span>{attractionsProfile.rank}</span>
                  </div>

                  {/* Features */}
                  <div className="pt-2">
                    <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-gray-700 mb-2">
                      Safety &amp; Family Amenities:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {attractionsProfile.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg"
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Sub-Ratings & Direct Links */}
                <div className="lg:col-span-6 bg-[#fefcf8] rounded-2xl p-5 sm:p-6 border border-amber-100 space-y-4">
                  <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#000000] flex items-center justify-between">
                    <span>Family &amp; Ride Ratings Breakdown</span>
                    <span className="text-amber-700 font-bold">5.0 / 5.0 Perfect Score</span>
                  </h4>

                  <div className="space-y-3">
                    {Object.entries(attractionsProfile.subRatings).map(([key, score]) => (
                      <div key={key} className="space-y-1 text-xs">
                        <div className="flex justify-between font-bold text-gray-800">
                          <span>{key}</span>
                          <span className="text-amber-700">{score.toFixed(1)} / 5.0</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#D1A03F] to-amber-500 rounded-full w-full" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Featured Rides */}
                  <div className="pt-3 border-t border-gray-200">
                    <span className="text-[11px] font-bold text-gray-700 block mb-1.5">
                      Rides &amp; Activities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {attractionsProfile.popularItems.map((ride, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-bold text-[#000000] bg-white border border-amber-200 px-2 py-0.5 rounded shadow-2xs"
                        >
                          {ride}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link to Live TripAdvisor */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={attractionsProfile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f26522] hover:bg-[#d9531e] text-white font-heading font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Read All 450+ on TripAdvisor UK</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={attractionsProfile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 transition-colors"
                    >
                      <span>Leave TripAdvisor Review</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>

              </div>
            </div>

            {/* Authentic TripAdvisor Reviews Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-heading font-extrabold text-[#000000] uppercase">
                    Authentic Family Reviews from TripAdvisor UK
                  </h3>
                  <p className="text-xs text-gray-500">
                    Showing verified parent and family feedback for Beach Rides &amp; Funfair
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {attractionsProfile.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white rounded-2xl p-5 border border-amber-100/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-heading font-extrabold text-sm text-[#000000]">
                              {rev.author}
                            </span>
                            <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                              <ShieldCheck className="w-2.5 h-2.5 text-amber-600" />
                              Verified
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-400">{rev.location}</span>
                        </div>

                        {/* 5 TripAdvisor bubbles */}
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((b) => (
                            <span key={b} className="w-2.5 h-2.5 rounded-full bg-[#00aa6c]" />
                          ))}
                        </div>
                      </div>

                      <h4 className="text-xs font-extrabold text-gray-900 mb-1.5">
                        "{rev.title}"
                      </h4>

                      <p className="text-xs text-gray-600 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                      <span>{rev.date} • {rev.visitType}</span>
                      <span className="flex items-center gap-1 text-gray-600 font-medium">
                        <ThumbsUp className="w-3 h-3 text-[#00aa6c]" />
                        <span>{rev.helpfulVotes}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION C: GOOGLE REVIEWS OR COMBINED REVIEWS */}
        {(sourceFilter === 'google' || sourceFilter === 'all') && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Rating Breakdown & Write Review Banner */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#dde0d5] shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Overall Score */}
                <div className="lg:col-span-4 text-center lg:text-left lg:border-r border-[#dde0d5] lg:pr-8">
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <span className="text-5xl sm:text-6xl font-black font-heading text-[#000000]">
                      4.9
                    </span>
                    <div>
                      <div className="flex items-center gap-1 text-[#D1A03F]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-[#69828b] font-medium block mt-1">
                        Based on 340+ verified diner reviews
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#526b74] mt-3 leading-relaxed">
                    98% of customers recommend Frankie's @ The Beach for smash burgers and seaside family gatherings.
                  </p>
                </div>

                {/* Bars */}
                <div className="lg:col-span-5 space-y-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-12 font-bold text-[#000000]">5 Stars</span>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#D1A03F] rounded-full w-[94%]" />
                    </div>
                    <span className="w-10 text-right text-gray-500 font-bold">94%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-12 font-bold text-[#000000]">4 Stars</span>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#D1A03F] rounded-full w-[5%]" />
                    </div>
                    <span className="w-10 text-right text-gray-500 font-bold">5%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-12 font-bold text-[#000000]">3 Stars</span>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#D1A03F] rounded-full w-[1%]" />
                    </div>
                    <span className="w-10 text-right text-gray-500 font-bold">1%</span>
                  </div>
                </div>

                {/* Write a review button */}
                <div className="lg:col-span-3 text-center lg:text-right">
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#0580FF] hover:bg-[#004fb3] text-white font-heading font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{showForm ? 'CLOSE FORM' : 'WRITE A REVIEW'}</span>
                  </button>
                </div>

              </div>

              {/* Form Expansion */}
              {showForm && (
                <div className="mt-8 pt-8 border-t border-[#dde0d5] animate-in slide-in-from-top duration-300">
                  {submittedMessage ? (
                    <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                      <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                      <h4 className="font-heading font-extrabold text-emerald-800 text-base uppercase">
                        THANK YOU FOR YOUR REVIEW!
                      </h4>
                      <p className="text-xs text-emerald-700">
                        Your feedback has been published to our beach guestbook.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4 max-w-2xl mx-auto text-xs sm:text-sm">
                      <h3 className="font-heading font-extrabold text-base text-[#000000] uppercase text-center">
                        LEAVE YOUR FEEDBACK
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-extrabold uppercase text-[#496068] mb-1 font-heading">
                            YOUR NAME
                          </label>
                          <input
                            type="text"
                            required
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="e.g. Sarah Jenkins"
                            className="w-full px-3 py-2 border border-[#dde0d5] rounded-xl bg-[#f8f9f5] focus:outline-none focus:border-[#0580FF]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-extrabold uppercase text-[#496068] mb-1 font-heading">
                            STAR RATING
                          </label>
                          <select
                            value={newRating}
                            onChange={(e) => setNewRating(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-[#dde0d5] rounded-xl bg-[#f8f9f5] focus:outline-none focus:border-[#0580FF]"
                          >
                            <option value={5}>5 Stars - Pure Excellence</option>
                            <option value={4}>4 Stars - Great Experience</option>
                            <option value={3}>3 Stars - Good Seaside Food</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-extrabold uppercase text-[#496068] mb-1 font-heading">
                          YOUR REVIEW
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Tell us about your experience with the food, beach rides, or atmosphere..."
                          className="w-full px-3 py-2 border border-[#dde0d5] rounded-xl bg-[#f8f9f5] focus:outline-none focus:border-[#0580FF]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] font-heading font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl shadow-md cursor-pointer transition-all"
                      >
                        POST SEASIDE REVIEW
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setRatingFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  ratingFilter === 'all'
                    ? 'bg-[#0580FF] text-white shadow-sm'
                    : 'bg-white text-[#496068] border border-[#dde0d5]'
                }`}
              >
                All Reviews ({reviews.length})
              </button>
              <button
                onClick={() => setRatingFilter(5)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                  ratingFilter === 5
                    ? 'bg-[#0580FF] text-white shadow-sm'
                    : 'bg-white text-[#496068] border border-[#dde0d5]'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>5 Stars Only</span>
              </button>
              <button
                onClick={() => setRatingFilter(4)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                  ratingFilter === 4
                    ? 'bg-[#0580FF] text-white shadow-sm'
                    : 'bg-white text-[#496068] border border-[#dde0d5]'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4 Stars</span>
              </button>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews
                .filter((r) => (ratingFilter === 'all' ? true : r.rating === ratingFilter))
                .map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white rounded-2xl p-6 border border-[#dde0d5] shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.avatar}
                            alt={rev.name}
                            className="w-10 h-10 rounded-full object-cover border border-[#dde0d5]"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="font-heading font-extrabold text-sm text-[#000000]">
                              {rev.name}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[11px] text-[#789098]">
                                {rev.date}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-0.5 text-[#D1A03F]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#3d535b] leading-relaxed">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#edf0e6] flex items-center justify-between text-[11px] text-[#789098]">
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#1a73e8] font-semibold">
                        <svg className="w-3 h-3" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                        </svg>
                        Google Review
                      </span>
                      <span className="flex items-center gap-1 text-emerald-600 font-bold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Verified Diner
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
