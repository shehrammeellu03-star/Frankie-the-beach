import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { QuickInfoBar } from '../components/QuickInfoBar';
import { ChefsFavorites } from '../components/ChefsFavorites';
import { WhatPeopleSay } from '../components/WhatPeopleSay';
import {
  Utensils,
  Calendar,
  Palmtree,
  ArrowRight,
  Flame,
  Clock,
  MapPin,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Check,
  Heart,
  HandHeart,
} from 'lucide-react';
import { ASSETS, OFFICIAL_MENU, CLIENT_IMAGES } from '../data/restaurantData';
import { ClientImage } from '../components/ClientImage';
import { PWAInstallButton } from '../components/PWAInstallButton';
import { TripAdvisorAttractionsBanner } from '../components/TripAdvisorBanner';
import { useImages } from '../context/ImageContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { clientImages } = useImages();

  const handleWhatsAppContact = () => {
    const phoneNumber = '447554663569';
    const message = encodeURIComponent(
      "Hello Frankie's @ The Beach! 🌴🍔 I'd like to ask about your opening times and visiting today."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex-1 bg-[#EEEFE9]">
      {/* 1. Hero Section */}
      <Hero
        onExploreMenu={() => navigate('/menu')}
        onContact={() => navigate('/contact')}
      />

      {/* 2. Quick Info Bar */}
      <QuickInfoBar />

      {/* 3. Chef's Favorites Showcase */}
      <ChefsFavorites
        onViewFullMenu={() => navigate('/menu')}
      />

      {/* 4. Feature Showcase / Seaside Shack Teaser */}
      <section className="py-16 sm:py-20 bg-white border-t border-b border-[#dde0d5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Image Collage */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#004fb3]">
                <ClientImage
                  src={clientImages.kiosk}
                  slotKey="site:kiosk"
                  fallbackSrc={ASSETS.beachPatio}
                  alt="Frankie's Beachfront Kiosk in Ramsgate"
                  className="w-full h-80 sm:h-96 object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-gradient-to-r from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] text-[#000000] text-[11px] font-black uppercase px-3 py-1 rounded-md tracking-wider">
                    UK'S #1 QUICK BITE (TRIPADVISOR)
                  </span>
                  <p className="font-heading font-extrabold text-xl sm:text-2xl mt-2 text-white">
                    Right on the sands of Ramsgate Beach
                  </p>
                </div>
              </div>

              {/* Floating Polaroids / Pill */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-3.5 rounded-2xl shadow-xl border border-[#dde0d5] flex items-center gap-3 max-w-xs">
                <ClientImage
                  src={clientImages.food1Burger}
                  slotKey="menu:the-classic-smash"
                  fallbackSrc={ASSETS.fallbacks.heroBurger}
                  alt="Classic Smash Burger"
                  className="w-14 h-14 rounded-xl object-cover"
                  priority
                />
                <div>
                  <div className="flex items-center gap-1 text-[#D1A03F]">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#0580FF]">
                      100% British Angus
                    </span>
                  </div>
                  <h4 className="font-heading font-extrabold text-xs text-[#000000] uppercase">
                    Seared Fresh Daily
                  </h4>
                  <p className="text-[11px] text-gray-500">Flat-top caramelized crust</p>
                </div>
              </div>
            </div>

            {/* Right Story & Highlights */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0580FF] font-heading">
                <Palmtree className="w-4 h-4 text-[#D1A03F]" />
                <span>RAMSGATE SEAFRONT VIBES</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#000000] font-heading leading-tight">
                CRISPY SMASH BURGERS, OCEAN BREEZES & GOOD TIMES.
              </h2>

              <p className="text-sm sm:text-base text-[#496068] leading-relaxed">
                Frankie's @ the Beach is your go-to spot in Ramsgate for great food, sweet treats and laid-back beachside vibes. Whether you're here for a quick bite, a family day out or sunset by the sea — we've got you covered.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f8f9f5] border border-[#e4e8dd]">
                  <div className="w-9 h-9 rounded-lg bg-[#0580FF] text-white flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5 text-[#D1A03F]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-xs text-[#000000] uppercase">
                      Chrome Smashed Beef
                    </h4>
                    <p className="text-[11px] text-[#556d75] mt-0.5">
                      Premium British beef seared hard with caramelized crispy borders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f8f9f5] border border-[#e4e8dd]">
                  <div className="w-9 h-9 rounded-lg bg-[#0580FF] text-white flex items-center justify-center shrink-0">
                    <Palmtree className="w-5 h-5 text-[#D1A03F]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-xs text-[#000000] uppercase">
                      Open-Air Beach Deck
                    </h4>
                    <p className="text-[11px] text-[#556d75] mt-0.5">
                      Panoramic views of the channel, dog-friendly patio, laid-back beats.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/menu"
                  className="bg-[#0580FF] hover:bg-[#004fb3] text-white font-heading font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <span>EXPLORE OUR COMPLETE MENU</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/about"
                  className="bg-[#EEEFE9] hover:bg-[#e6eadf] text-[#000000] font-heading font-extrabold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl border border-[#dde0d5] transition-all cursor-pointer"
                >
                  READ OUR STORY
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Menu Categories Teaser (Direct access to all categories) */}
      <section className="py-16 sm:py-20 bg-[#edf0e6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0580FF] font-heading">
              WHAT ARE YOU CRAVING TODAY?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#000000] font-heading mt-1">
              EXPLORE OUR SEASIDE SPECIALS
            </h2>
            <div className="flex justify-center my-3">
              <svg viewBox="0 0 80 10" className="w-16 text-[#D1A03F] fill-none stroke-current stroke-[3] stroke-linecap-round">
                <path d="M0 5 Q10 0 20 5 T40 5 T60 5 T80 5" />
              </svg>
            </div>
            <p className="text-sm text-[#496068]">
              From jumbo boardwalk hot dogs to towering chocolate sundae cones, discover what makes Frankie's Ramsgate's favorite beach shack.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Card 1: Burgers */}
            <div
              onClick={() => navigate('/menu')}
              className="bg-white rounded-2xl overflow-hidden border border-[#dde0d5] shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <ClientImage
                  src={clientImages.food1Burger}
                  slotKey="menu:the-classic-smash"
                  fallbackSrc={ASSETS.fallbacks.heroBurger}
                  alt="Smash Burgers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0580FF] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded">
                  SMASH BURGERS
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-base text-[#000000] uppercase group-hover:text-[#0580FF] transition-colors">
                    Double Smash Burgers
                  </h3>
                  <p className="text-xs text-[#526b74] mt-1 line-clamp-2">
                    Classic Smash, BBQ Bacon Stack, and gourmet sides seared with crispy lacy edges on our flat-top.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#edf0e6] flex items-center justify-between text-xs font-bold text-[#0580FF]">
                  <span>View Selection</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore →
                  </span>
                </div>
              </div>
            </div>

            {/* Category Card 2: Pepperoni & Loaded Fries */}
            <div
              onClick={() => navigate('/menu')}
              className="bg-white rounded-2xl overflow-hidden border border-[#dde0d5] shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <ClientImage
                  src={clientImages.pepperoniFries}
                  slotKey="menu:pepperoni-melted-cheddar-fries"
                  fallbackSrc={ASSETS.loadedFries}
                  alt="Pepperoni & Melted Cheddar Dirty Fries"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0580FF] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded">
                  LOADED FRIES &amp; CHIPS
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-base text-[#000000] uppercase group-hover:text-[#0580FF] transition-colors">
                    Pepperoni &amp; Dirty Fries
                  </h3>
                  <p className="text-xs text-[#526b74] mt-1 line-clamp-2">
                    Golden seaside chips drenched in melted cheddar cheese, crispy pepperoni slices, and loaded chicken bites.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#edf0e6] flex items-center justify-between text-xs font-bold text-[#0580FF]">
                  <span>View Selection</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore →
                  </span>
                </div>
              </div>
            </div>

            {/* Category Card 3: Crispy BBQ Wings & Sides */}
            <div
              onClick={() => navigate('/menu')}
              className="bg-white rounded-2xl overflow-hidden border border-[#dde0d5] shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <ClientImage
                  src={clientImages.hotWings}
                  slotKey="site:hotWings"
                  fallbackSrc={ASSETS.hotWings}
                  alt="Crispy BBQ Wings & Coastal Sides"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0580FF] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded">
                  BBQ WINGS &amp; SIDES
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-base text-[#000000] uppercase group-hover:text-[#0580FF] transition-colors">
                    Crispy BBQ Wings &amp; Chips
                  </h3>
                  <p className="text-xs text-[#526b74] mt-1 line-clamp-2">
                    Succulent crispy chicken wings glazed in sweet smoky barbecue sauce, served piping hot with golden chips.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#edf0e6] flex items-center justify-between text-xs font-bold text-[#0580FF]">
                  <span>View Selection</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore →
                  </span>
                </div>
              </div>
            </div>

            {/* Category Card 4: Drinks & Treats */}
            <div
              onClick={() => navigate('/menu')}
              className="bg-white rounded-2xl overflow-hidden border border-[#dde0d5] shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <ClientImage
                  src={clientImages.drinksMenu}
                  slotKey="site:drinksMenu"
                  fallbackSrc={ASSETS.drinksMenu}
                  alt="Frankie's Beach Drinks, Coffees & Slushies"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0580FF] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded">
                  BEACH DRINKS &amp; TREATS
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-base text-[#000000] uppercase group-hover:text-[#0580FF] transition-colors">
                    Coffees, Slushies &amp; Drinks
                  </h3>
                  <p className="text-xs text-[#526b74] mt-1 line-clamp-2">
                    Freshly brewed coastal coffee, iced lattes, cold beers, and fruit slushies from our chalkboard beach bar.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#edf0e6] flex items-center justify-between text-xs font-bold text-[#0580FF]">
                  <span>View Selection</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore →
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>VIEW FULL SEASIDE MENU</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mid-Page Showcase: Children's Beach Rides & Attractions Official TripAdvisor Banner */}
      <TripAdvisorAttractionsBanner className="!my-0" />

      {/* 6. What People Say (Customer reviews showcase) */}
      <WhatPeopleSay
        onViewAllReviews={() => navigate('/reviews')}
        onOpenGallery={() => navigate('/gallery')}
      />

      {/* Giving Back & Community Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12" id="home-charity-spotlight">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#dde0d5] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0580FF] font-heading bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full">
                <HandHeart className="w-4 h-4 text-[#D1A03F]" />
                <span>CHARITY &amp; COMMUNITY</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#000000] font-heading leading-tight">
                WHY GIVING BACK HAS ALWAYS MATTERED
              </h2>

              <p className="text-xs sm:text-sm text-[#D1A03F] font-heading font-extrabold uppercase tracking-wider">
                — A personal message from Frankie Fernando
              </p>

              <p className="text-sm sm:text-base text-[#496068] leading-relaxed">
                "For me, business has never been just about making money. It has always been about people, relationships, providing opportunities, supporting local communities and, whenever I can, helping someone who needs it."
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs text-[#000000] font-bold">
                <div className="flex items-center gap-2 bg-[#f8f9f5] p-2.5 rounded-xl border border-[#e4e8dd]">
                  <Heart className="w-4 h-4 text-[#D1A03F] shrink-0" />
                  <span>Share A Little Love</span>
                </div>
                <div className="flex items-center gap-2 bg-[#f8f9f5] p-2.5 rounded-xl border border-[#e4e8dd]">
                  <ShieldCheck className="w-4 h-4 text-[#0580FF] shrink-0" />
                  <span>Porchlight &amp; Hospices</span>
                </div>
                <div className="flex items-center gap-2 bg-[#f8f9f5] p-2.5 rounded-xl border border-[#e4e8dd]">
                  <Sparkles className="w-4 h-4 text-[#0580FF] shrink-0" />
                  <span>Local Autism Causes</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  to="/charity"
                  className="inline-flex items-center gap-2 bg-[#0580FF] hover:bg-[#004fb3] text-white font-heading font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-[#D1A03F]" />
                  <span>READ FRANKIE'S FULL STORY</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#f8f9f5] rounded-2xl p-6 border border-[#dde0d5] space-y-3">
              <span className="text-[11px] font-extrabold text-[#0580FF] uppercase tracking-wider font-heading block">
                Frankie's Words
              </span>
              <blockquote className="text-xs sm:text-sm italic text-[#000000] font-medium leading-relaxed">
                "Whenever I see someone struggling today, I don't look down on them. I think, 'There but for the grace of God go I.' And if I am in a position to help, then I will. That's not a marketing strategy. That's just me."
              </blockquote>
              <div className="pt-2 border-t border-[#e4e8dd] text-[11px] font-bold text-[#526b74]">
                Frankie Fernando — Founder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PWA Mobile App Download Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <PWAInstallButton variant="banner" />
      </section>

      {/* 7. Call To Action: Visit & Contact Banner */}
      <section className="bg-[#004fb3] py-16 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest font-heading">
            <Palmtree className="w-4 h-4 text-[#D1A03F]" />
            <span>JOIN US BY THE WATER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase font-heading">
            PLANNING YOUR VISIT TO RAMSGATE MAIN SANDS?
          </h2>

          <p className="text-sm sm:text-base text-sky-100 max-w-2xl mx-auto leading-relaxed">
            Drop by our beachfront kiosk on Ocean Drive for gourmet burgers, loaded dirty fries, seaside treats, and kids' beach rides right on the sand. Walk-ins are always welcomed by the waves!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              to="/contact"
              className="bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              CONTACT &amp; GET DIRECTIONS
            </Link>

            <button
              onClick={handleWhatsAppContact}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>CHAT ON WHATSAPP</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
