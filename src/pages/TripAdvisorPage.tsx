import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Utensils,
  Sparkles,
  MapPin,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  Award,
  ChevronRight,
  Heart,
  Share2,
  MessageSquare,
  Star,
  ThumbsUp,
  Clock,
  Info,
} from 'lucide-react';
import { TRIPADVISOR_LINKS, TRIPADVISOR_PROFILES_DATA, CLIENT_IMAGES } from '../data/restaurantData';
import { TripAdvisorProfileData } from '../types';
import { ClientImage } from '../components/ClientImage';

interface TripAdvisorPageProps {
  initialProfile?: 'restaurant' | 'attractions' | 'all';
}

export const TripAdvisorPage: React.FC<TripAdvisorPageProps> = ({ initialProfile }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active profile from path or prop
  const getProfileFromPath = (): 'restaurant' | 'attractions' | 'all' => {
    if (initialProfile) return initialProfile;
    if (location.pathname.includes('/restaurant')) return 'restaurant';
    if (location.pathname.includes('/attractions')) return 'attractions';
    return 'restaurant'; // Default to the #1 Quick Bite restaurant page
  };

  const [activeProfile, setActiveProfile] = useState<'restaurant' | 'attractions' | 'all'>(getProfileFromPath);

  useEffect(() => {
    setActiveProfile(getProfileFromPath());
  }, [location.pathname, initialProfile]);

  const restaurant: TripAdvisorProfileData = TRIPADVISOR_PROFILES_DATA.restaurant;
  const attractions: TripAdvisorProfileData = TRIPADVISOR_PROFILES_DATA.attractions;

  const selectProfile = (profile: 'restaurant' | 'attractions' | 'all') => {
    setActiveProfile(profile);
    if (profile === 'restaurant') {
      navigate('/tripadvisor/restaurant');
    } else if (profile === 'attractions') {
      navigate('/tripadvisor/attractions');
    } else {
      navigate('/tripadvisor');
    }
  };

  return (
    <div className="flex-1 bg-[#EEEFE9] pb-24 md:pb-20">
      {/* Top Hero Banner */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-1 sm:mt-2 mb-8 sm:mb-10">
        <div className="bg-[#0580FF] text-white py-10 sm:py-14 px-4 sm:px-8 rounded-3xl relative overflow-hidden shadow-md">
          {/* Background overlay accent */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Breadcrumb Navigation */}
            <nav className="flex justify-center items-center gap-2 text-xs uppercase tracking-widest text-sky-200 mb-3 font-semibold">
              <Link to="/" className="hover:text-white transition-colors">
                HOME
              </Link>
              <span>/</span>
              <span className="text-[#D1A03F]">TRIPADVISOR</span>
              {activeProfile === 'restaurant' && (
                <>
                  <span>/</span>
                  <span className="text-white">THE MAIN (RESTAURANT)</span>
                </>
              )}
              {activeProfile === 'attractions' && (
                <>
                  <span>/</span>
                  <span className="text-white">THE CHILDREN (BEACH RIDES)</span>
                </>
              )}
            </nav>

            {/* Verification Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-sky-100 font-heading border border-white/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00aa6c] animate-pulse" />
              <span>OFFICIAL TRIPADVISOR UK VERIFIED LISTINGS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white font-heading">
              {activeProfile === 'restaurant'
                ? "FRANKIE'S RESTAURANT & BAR"
                : activeProfile === 'attractions'
                ? "BEACH RIDES & ATTRACTIONS"
                : "TRIPADVISOR ACCOLADES"}
            </h1>

            <div className="flex justify-center my-3">
              <svg viewBox="0 0 80 10" className="w-16 text-[#D1A03F] fill-none stroke-current stroke-[3] stroke-linecap-round">
                <path d="M0 5 Q10 0 20 5 T40 5 T60 5 T80 5" />
              </svg>
            </div>

            <p className="text-base sm:text-lg text-sky-100 max-w-2xl mx-auto font-medium">
              {activeProfile === 'restaurant'
                ? "Dedicated TripAdvisor profile for Frankie's @ The Beach — UK's No. 1 Quick Bite with 981 verified 5-Star reviews."
                : activeProfile === 'attractions'
                ? "Dedicated TripAdvisor profile for Frankie's Beach Rides & Entertainment — 450+ verified 5-Star family reviews."
                : "Explore our two distinct, officially verified TripAdvisor UK profiles right on Ramsgate Main Sands."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Dedicated Profile Selector Tabs */}
        <div className="bg-white rounded-3xl p-2.5 sm:p-3 border border-[#dde0d5] shadow-xs mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {/* Tab 1: Restaurant (The Main) */}
            <button
              onClick={() => selectProfile('restaurant')}
              id="tab-tripadvisor-restaurant"
              className={`p-3 sm:p-4 rounded-2xl flex items-center gap-3 transition-all cursor-pointer text-left border ${
                activeProfile === 'restaurant'
                  ? 'bg-emerald-50/90 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20'
                  : 'bg-[#fcfdfa] border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-colors ${
                  activeProfile === 'restaurant'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                <Utensils className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 font-heading">
                    The Main Profile
                  </span>
                  <span className="text-[10px] font-black text-white bg-emerald-700 px-1.5 py-0.5 rounded">
                    #1 IN UK
                  </span>
                </div>
                <h3 className="text-sm font-heading font-extrabold text-[#000000] truncate">
                  Frankie's Restaurant &amp; Food
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((b) => (
                      <span key={b} className="w-2.5 h-2.5 rounded-full bg-[#00aa6c] inline-block" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-700">5.0 (981 Reviews)</span>
                </div>
              </div>
            </button>

            {/* Tab 2: Attractions (The Children) */}
            <button
              onClick={() => selectProfile('attractions')}
              id="tab-tripadvisor-attractions"
              className={`p-3 sm:p-4 rounded-2xl flex items-center gap-3 transition-all cursor-pointer text-left border ${
                activeProfile === 'attractions'
                  ? 'bg-amber-50/90 border-amber-500 shadow-sm ring-2 ring-amber-500/20'
                  : 'bg-[#fcfdfa] border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-colors ${
                  activeProfile === 'attractions'
                    ? 'bg-amber-500 text-white'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 font-heading">
                    The Children Profile
                  </span>
                  <span className="text-[10px] font-black text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded">
                    RIDES &amp; FUN
                  </span>
                </div>
                <h3 className="text-sm font-heading font-extrabold text-[#000000] truncate">
                  Beach Rides &amp; Attractions
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((b) => (
                      <span key={b} className="w-2.5 h-2.5 rounded-full bg-[#00aa6c] inline-block" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-700">5.0 (450+ Reviews)</span>
                </div>
              </div>
            </button>

            {/* Tab 3: Compare & Overview */}
            <button
              onClick={() => selectProfile('all')}
              id="tab-tripadvisor-all"
              className={`p-3 sm:p-4 rounded-2xl flex items-center gap-3 transition-all cursor-pointer text-left border col-span-1 sm:col-span-2 lg:col-span-1 ${
                activeProfile === 'all'
                  ? 'bg-sky-50/90 border-[#0580FF] shadow-sm ring-2 ring-[#0580FF]/20'
                  : 'bg-[#fcfdfa] border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-colors ${
                  activeProfile === 'all'
                    ? 'bg-[#0580FF] text-white'
                    : 'bg-cyan-100 text-[#0580FF]'
                }`}
              >
                <Award className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0580FF] font-heading block">
                  TripAdvisor Hub
                </span>
                <h3 className="text-sm font-heading font-extrabold text-[#000000] truncate">
                  Both Profiles Overview
                </h3>
                <span className="text-xs text-gray-500">Compare verified ratings &amp; awards</span>
              </div>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DEDICATED VIEW 1: RESTAURANT & BEACH BAR (THE MAIN) */}
        {/* ========================================================= */}
        {activeProfile === 'restaurant' && (
          <div className="space-y-8 animate-in fade-in duration-200" id="dedicated-restaurant-section">
            
            {/* Header Hero Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-sm relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-900 bg-emerald-100/90 border border-emerald-300 px-3 py-1 rounded-full font-heading">
                      TripAdvisor UK Verified Profile (The Main)
                    </span>
                    <span className="text-xs text-gray-500 font-medium">ID: {restaurant.tripadvisorId}</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-heading font-black text-[#000000] leading-tight">
                    {restaurant.title}
                  </h2>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{restaurant.location}</span>
                  </div>

                  {/* Rating Bubble Display */}
                  <div className="flex items-baseline gap-4 pt-1">
                    <span className="text-5xl sm:text-6xl font-black font-heading text-[#000000]">
                      5.0
                    </span>
                    <div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((bubble) => (
                          <span
                            key={bubble}
                            className="w-5 h-5 rounded-full bg-[#00aa6c] border-2 border-white inline-block shadow-xs"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-emerald-800 font-bold block mt-1">
                        {restaurant.reviewCountLabel} • 100% Recommended on TripAdvisor UK
                      </span>
                    </div>
                  </div>

                  {/* Official Rank Ribbon */}
                  <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/90 text-sm font-bold text-emerald-900 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <span>{restaurant.rank}</span>
                  </div>

                  {/* Key Highlights */}
                  <div>
                    <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-gray-700 mb-2">
                      Key Highlights &amp; Diner Amenities:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200/60"
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Sub-Ratings & Direct TripAdvisor Link */}
                <div className="lg:col-span-5 bg-[#f8faf9] rounded-2xl p-6 border border-emerald-100 space-y-5">
                  <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
                    <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-gray-700">
                      TripAdvisor Sub-Ratings
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Perfect 5.0 Across All
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {Object.entries(restaurant.subRatings).map(([category, score], idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-gray-700">
                          <span>{category}</span>
                          <span className="text-emerald-700 font-black">{Number(score).toFixed(1)} / 5.0</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${(Number(score) / 5.0) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="pt-2 space-y-2.5">
                    <a
                      href={restaurant.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#00aa6c] hover:bg-[#008f5b] active:scale-95 text-white font-heading font-extrabold text-sm uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      id="btn-visit-tripadvisor-restaurant"
                    >
                      <span>Read All 981 on TripAdvisor UK</span>
                      <ExternalLink className="w-4 h-4 text-white/90 group-hover:translate-x-0.5 transition-transform" />
                    </a>

                    <Link
                      to="/contact"
                      className="w-full bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] font-heading font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Contact &amp; Location</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Food Imagery & Popular Picks */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-xl font-heading font-extrabold text-[#000000]">
                    Most Mentioned Dishes on TripAdvisor UK
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Diners frequently praise these handmade specialties in their 5-star reviews
                  </p>
                </div>
                <Link
                  to="/menu"
                  className="text-xs font-bold text-[#0580FF] hover:underline flex items-center gap-1 font-heading uppercase tracking-wider"
                >
                  <span>Explore Full Menu</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200/60 flex items-center gap-3">
                  <ClientImage
                    src={CLIENT_IMAGES.food1Burger}
                    slotKey="menu:the-classic-smash"
                    alt="Smash Burger"
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-heading font-extrabold text-xs text-[#000000]">Smash Cheeseburger</h4>
                    <span className="text-[10px] text-emerald-700 font-bold">100+ positive mentions</span>
                    <p className="text-[11px] text-gray-500 mt-0.5">Fresh Angus beef on brioche</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200/60 flex items-center gap-3">
                  <ClientImage
                    src={CLIENT_IMAGES.food2LoadedChips}
                    slotKey="menu:pepperoni-melted-cheddar-fries"
                    alt="Loaded Fries"
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-heading font-extrabold text-xs text-[#000000]">Loaded Beach Fries</h4>
                    <span className="text-[10px] text-emerald-700 font-bold">85+ positive mentions</span>
                    <p className="text-[11px] text-gray-500 mt-0.5">Warm cheese sauce &amp; bacon</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200/60 flex items-center gap-3">
                  <ClientImage
                    src={CLIENT_IMAGES.hotWings}
                    slotKey="site:hotWings"
                    alt="Crispy BBQ Wings"
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-heading font-extrabold text-xs text-[#000000]">Crispy BBQ Wings</h4>
                    <span className="text-[10px] text-emerald-700 font-bold">75+ positive mentions</span>
                    <p className="text-[11px] text-gray-500 mt-0.5">Glazed in smoky sweet BBQ</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200/60 flex items-center gap-3">
                  <ClientImage
                    src={CLIENT_IMAGES.drinksMenu}
                    slotKey="site:drinksMenu"
                    alt="Coastal Drinks & Coffees"
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-heading font-extrabold text-xs text-[#000000]">Coastal Coffee &amp; Slushies</h4>
                    <span className="text-[10px] text-emerald-700 font-bold">120+ positive mentions</span>
                    <p className="text-[11px] text-gray-500 mt-0.5">Barista coffee, lattes &amp; iced drinks</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Authentic Diner Reviews List */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-heading font-extrabold text-[#000000]">
                    Verified TripAdvisor UK Diner Reviews
                  </h3>
                  <span className="text-xs text-gray-500">Unfiltered feedback directly from diners</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    981 Reviews on File
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {restaurant.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-[#fcfdfa] p-5 rounded-2xl border border-gray-200/70 hover:border-emerald-300 transition-colors shadow-2xs space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-heading font-extrabold text-sm text-[#000000]">
                          {rev.author}
                        </h4>
                        <span className="text-[11px] text-gray-500">{rev.location}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((bubble) => (
                        <span
                          key={bubble}
                          className="w-3.5 h-3.5 rounded-full bg-[#00aa6c] inline-block shadow-2xs"
                        />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                      "{rev.comment}"
                    </p>

                    <div className="flex items-center gap-1.5 pt-1 text-[11px] text-emerald-800 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>TripAdvisor Verified Diner Review</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Switcher Banner to Attractions */}
            <div className="bg-gradient-to-r from-amber-500 to-[#D1A03F] rounded-3xl p-6 sm:p-8 text-[#000000] shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-950 font-heading">
                  ALSO VISITING WITH FAMILY?
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-black">
                  Explore Frankie's Beach Rides &amp; Attractions
                </h3>
                <p className="text-xs sm:text-sm text-amber-950/80 font-medium max-w-xl">
                  Check out the second verified TripAdvisor profile with 450+ 5-Star reviews for our seaside carousel, trampolines, giant slide, and scooters.
                </p>
              </div>
              <button
                onClick={() => selectProfile('attractions')}
                className="bg-[#000000] hover:bg-black text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0 flex items-center gap-2"
              >
                <span>View Beach Rides Profile</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* DEDICATED VIEW 2: BEACH RIDES & ATTRACTIONS (THE CHILDREN) */}
        {/* ========================================================= */}
        {activeProfile === 'attractions' && (
          <div className="space-y-8 animate-in fade-in duration-200" id="dedicated-attractions-section">
            
            {/* Header Hero Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-amber-900 bg-amber-100/90 border border-amber-300 px-3 py-1 rounded-full font-heading">
                      TripAdvisor UK Verified Profile (The Children)
                    </span>
                    <span className="text-xs text-gray-500 font-medium">ID: {attractions.tripadvisorId}</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-heading font-black text-[#000000] leading-tight">
                    {attractions.title}
                  </h2>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{attractions.location}</span>
                  </div>

                  {/* Rating Bubble Display */}
                  <div className="flex items-baseline gap-4 pt-1">
                    <span className="text-5xl sm:text-6xl font-black font-heading text-[#000000]">
                      5.0
                    </span>
                    <div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((bubble) => (
                          <span
                            key={bubble}
                            className="w-5 h-5 rounded-full bg-[#00aa6c] border-2 border-white inline-block shadow-xs"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-amber-800 font-bold block mt-1">
                        {attractions.reviewCountLabel} • 100% Family Approved on TripAdvisor UK
                      </span>
                    </div>
                  </div>

                  {/* Official Rank Ribbon */}
                  <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/90 text-sm font-bold text-amber-900 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-amber-600 shrink-0" />
                    <span>{attractions.rank}</span>
                  </div>

                  {/* Key Highlights */}
                  <div>
                    <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-gray-700 mb-2">
                      Rides &amp; Amenities:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {attractions.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200/60"
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Sub-Ratings & Direct TripAdvisor Link */}
                <div className="lg:col-span-5 bg-[#fdfaf5] rounded-2xl p-6 border border-amber-100 space-y-5">
                  <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
                    <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-gray-700">
                      Family TripAdvisor Sub-Ratings
                    </span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      Perfect 5.0 Rating
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {Object.entries(attractions.subRatings).map(([category, score], idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-gray-700">
                          <span>{category}</span>
                          <span className="text-amber-800 font-black">{Number(score).toFixed(1)} / 5.0</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: `${(Number(score) / 5.0) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="pt-2 space-y-2.5">
                    <a
                      href={attractions.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#00aa6c] hover:bg-[#008f5b] active:scale-95 text-white font-heading font-extrabold text-sm uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      id="btn-visit-tripadvisor-attractions"
                    >
                      <span>Read All 450+ on TripAdvisor UK</span>
                      <ExternalLink className="w-4 h-4 text-white/90 group-hover:translate-x-0.5 transition-transform" />
                    </a>

                    <Link
                      to="/gallery"
                      className="w-full bg-[#0580FF] hover:bg-[#004fb3] active:scale-95 text-white font-heading font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>View Rides Photo Gallery</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Attractions Photo Cards */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
              <h3 className="text-xl font-heading font-extrabold text-[#000000] mb-2">
                Featured Ramsgate Beach Rides
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Directly adjacent to Frankie's Kiosk on the sands — fun for toddlers and teenagers
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200/60 shadow-2xs">
                  <ClientImage
                    src={CLIENT_IMAGES.childrenCarousel}
                    slotKey="site:childrenCarousel"
                    alt="Vintage Carousel"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3.5">
                    <h4 className="font-heading font-extrabold text-sm text-[#000000]">1950s Vintage Carousel</h4>
                    <p className="text-xs text-gray-500 mt-1">Classic hand-painted horses with seaside tunes</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200/60 shadow-2xs">
                  <ClientImage
                    src={CLIENT_IMAGES.childrenTrampolines}
                    slotKey="site:childrenTrampolines"
                    alt="Bungee Trampolines"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3.5">
                    <h4 className="font-heading font-extrabold text-sm text-[#000000]">Bungee Trampolines</h4>
                    <p className="text-xs text-gray-500 mt-1">High-flying secure harness flips over the sands</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200/60 shadow-2xs">
                  <ClientImage
                    src={CLIENT_IMAGES.childrenSlide}
                    slotKey="site:childrenSlide"
                    alt="Giant Inflatable Slide"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3.5">
                    <h4 className="font-heading font-extrabold text-sm text-[#000000]">Giant Lighthouse Slide</h4>
                    <p className="text-xs text-gray-500 mt-1">Towering inflatable slide overlooking the ocean</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200/60 shadow-2xs">
                  <ClientImage
                    src={CLIENT_IMAGES.childrenScooter}
                    slotKey="site:childrenScooter"
                    alt="Beach Family Fun"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3.5">
                    <h4 className="font-heading font-extrabold text-sm text-[#000000]">Electric Scooters</h4>
                    <p className="text-xs text-gray-500 mt-1">Safe enclosed beach-track mini scooters for kids</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Authentic Family Reviews List */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-heading font-extrabold text-[#000000]">
                    Verified TripAdvisor UK Family Reviews
                  </h3>
                  <span className="text-xs text-gray-500">Unfiltered feedback from visiting families</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    450+ Reviews on File
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attractions.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-[#fcfdfa] p-5 rounded-2xl border border-gray-200/70 hover:border-amber-300 transition-colors shadow-2xs space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-heading font-extrabold text-sm text-[#000000]">
                          {rev.author}
                        </h4>
                        <span className="text-[11px] text-gray-500">{rev.location}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((bubble) => (
                        <span
                          key={bubble}
                          className="w-3.5 h-3.5 rounded-full bg-[#00aa6c] inline-block shadow-2xs"
                        />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                      "{rev.comment}"
                    </p>

                    <div className="flex items-center gap-1.5 pt-1 text-[11px] text-amber-800 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>TripAdvisor Verified Family Review</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Switcher Banner to Restaurant */}
            <div className="bg-gradient-to-r from-emerald-600 to-[#00aa6c] rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-200 font-heading">
                  HUNGRY AFTER PLAYING?
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-black">
                  Visit Frankie's Restaurant &amp; Beach Bar
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-xl">
                  Check out our #1 UK Quick Bite food profile with 981 5-Star reviews for freshly smashed burgers, loaded fries, hot dogs, and ice cream treats.
                </p>
              </div>
              <button
                onClick={() => selectProfile('restaurant')}
                className="bg-white hover:bg-emerald-50 text-emerald-900 font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0 flex items-center gap-2"
              >
                <span>View Restaurant Profile</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* OVERVIEW / DUAL PROFILE COMPARISON VIEW */}
        {/* ========================================================= */}
        {activeProfile === 'all' && (
          <div className="space-y-8 animate-in fade-in duration-200" id="overview-comparison-section">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#000000]">
                Choose a Dedicated TripAdvisor Profile
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Frankie's @ The Beach holds two officially verified TripAdvisor UK profiles. Select a dedicated page below to view complete ratings, reviews, and verified badges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Card 1 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-md flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-heading">
                      THE MAIN • FOOD &amp; DRINKS
                    </span>
                    <span className="text-xs font-bold text-gray-400">ID: {restaurant.tripadvisorId}</span>
                  </div>

                  <h3 className="text-2xl font-heading font-extrabold text-[#000000]">
                    {restaurant.title}
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-heading font-black text-[#000000]">5.0</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((b) => (
                        <span key={b} className="w-3.5 h-3.5 rounded-full bg-[#00aa6c]" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-emerald-800">981 Reviews</span>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl text-xs font-bold text-emerald-900 border border-emerald-200/80">
                    🏆 {restaurant.rank}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Celebrated coastal quick bite serving smash burgers, loaded fries, hot dogs, milkshakes, and cocktails directly on Ramsgate sands.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => selectProfile('restaurant')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-extrabold text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Open Dedicated Restaurant Page</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <a
                    href={restaurant.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-heading font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Visit Live Listing on TripAdvisor.co.uk</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Profile Card 2 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-500 shadow-md flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-900 bg-amber-100 px-3 py-1 rounded-full font-heading">
                      THE CHILDREN • RIDES &amp; FAMILY
                    </span>
                    <span className="text-xs font-bold text-gray-400">ID: {attractions.tripadvisorId}</span>
                  </div>

                  <h3 className="text-2xl font-heading font-extrabold text-[#000000]">
                    {attractions.title}
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-heading font-black text-[#000000]">5.0</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((b) => (
                        <span key={b} className="w-3.5 h-3.5 rounded-full bg-[#00aa6c]" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-amber-800">450+ Reviews</span>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl text-xs font-bold text-amber-900 border border-amber-200/80">
                    🎡 {attractions.rank}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Beachfront family entertainment featuring 1950s vintage carousel, bungee trampolines, giant lighthouse slide, and kids electric scooters.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => selectProfile('attractions')}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-heading font-extrabold text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Open Dedicated Beach Rides Page</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <a
                    href={attractions.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-heading font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Visit Live Listing on TripAdvisor.co.uk</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
