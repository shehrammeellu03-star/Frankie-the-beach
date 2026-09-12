import React from 'react';
import { Link } from 'react-router-dom';
import {
  Palmtree,
  Sparkles,
  MapPin,
  Heart,
  Award,
  Flame,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  HandHeart,
  Briefcase,
  Users,
} from 'lucide-react';
import { CLIENT_IMAGES, ASSETS } from '../data/restaurantData';
import { ClientImage } from '../components/ClientImage';
import { TripAdvisorAttractionsBanner } from '../components/TripAdvisorBanner';
import { useImages } from '../context/ImageContext';

export const AboutPage: React.FC = () => {
  const { clientImages } = useImages();
  return (
    <div className="flex-1 bg-[#EEEFE9] pb-20">
      
      {/* Top Banner Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-1 sm:mt-2 mb-8 sm:mb-10">
        <div className="bg-[#0580FF] text-white py-12 sm:py-16 px-4 sm:px-8 rounded-3xl relative overflow-hidden shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <nav className="flex justify-center items-center gap-2 text-xs uppercase tracking-widest text-sky-200 mb-3 font-semibold">
              <Link to="/" className="hover:text-white transition-colors">
                HOME
              </Link>
              <span>/</span>
              <span className="text-[#D1A03F]">ABOUT US</span>
            </nav>

            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-300 font-heading mb-2">
              <Palmtree className="w-4 h-4 text-[#D1A03F]" />
              <span>THE TRUE STORY BEHIND FRANKIE'S</span>
              <Palmtree className="w-4 h-4 text-[#D1A03F]" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white font-heading">
              OUR STORY
            </h1>

            <div className="flex justify-center my-3">
              <svg viewBox="0 0 80 10" className="w-16 text-[#D1A03F] fill-none stroke-current stroke-[3] stroke-linecap-round">
                <path d="M0 5 Q10 0 20 5 T40 5 T60 5 T80 5" />
              </svg>
            </div>

            <p className="text-base sm:text-lg text-sky-100 max-w-2xl mx-auto font-medium leading-relaxed">
              Founded by Frankie Fernando — built on resilience, decades of hard work, a passion for Ramsgate, and a lifelong commitment to giving back to the community.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* 1. FOUNDER'S JOURNEY: Authentic Story from Frankie Fernando */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#dde0d5] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0580FF] font-heading bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-[#D1A03F]" />
                <span>The Founder's Journey — Frankie Fernando</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#000000] font-heading leading-tight">
                BREAKING THE MOULD &amp; BUILDING SOMETHING BETTER
              </h2>

              <p className="text-sm sm:text-base text-[#496068] leading-relaxed">
                Frankie Fernando's story started long before the Frankie's name became synonymous with beachfront burgers, golden chips, and ice creams on Ramsgate Beach.
              </p>

              <p className="text-sm sm:text-base text-[#496068] leading-relaxed">
                Coming from a very poor background and raised by a single mum who worked tirelessly against enormous hardship, Frankie learned firsthand what it feels like to go without. When he was 12 years old, the immense pressure took its toll on his mother, who ended up in a mental institution.
              </p>

              <p className="text-sm sm:text-base text-[#496068] leading-relaxed">
                Rather than letting his upbringing define him as a victim, Frankie made a conscious decision to crack on with life, work hard, and break the mould. Over the decades, his working life spanned retail, menswear, cars, street trading, and ice cream — learning the value of genuine relationships and honest graft.
              </p>

              {/* Frankie's Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#f8f9f5] border-l-4 border-[#D1A03F] space-y-1.5">
                <p className="text-xs sm:text-sm font-bold italic text-[#000000] leading-snug">
                  "Where you start in life doesn't have to determine where you end up. I refused to let my childhood become an excuse. I chose to crack on, work hard, break the mould and build something better. But I never forgot where I came from."
                </p>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#0580FF] font-heading">
                  — Frankie Fernando
                </p>
              </div>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-[#000000]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#0580FF]" />
                  <span>Decades of Hands-On Work</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#0580FF]" />
                  <span>Deep Thanet Family Connections</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#0580FF]" />
                  <span>Creating Jobs for Local Youth</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#0580FF]" />
                  <span>Personal Investment into Ramsgate</span>
                </div>
              </div>
            </div>

            {/* Photo of Frankie & Beach Crew */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[3/4] sm:aspect-[4/3] lg:aspect-[3/4] bg-[#000000]">
                <ClientImage
                  src={clientImages.barSelfie}
                  slotKey="site:barSelfie"
                  fallbackSrc={ASSETS.barSelfie}
                  alt="Frankie Fernando & Staff at Frankie's @ the beach Ramsgate"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#D1A03F] block font-heading">
                    Frankie Fernando &amp; Crew
                  </span>
                  <p className="font-heading font-bold text-sm text-white mt-0.5">
                    "Business has never been just about making money. It is about people and supporting communities."
                  </p>
                  <p className="text-[11px] text-sky-200 mt-1">
                    Frankie's @ the Beach — Ramsgate Sands
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. WHY RAMSGATE: Believing in the Town's Potential */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#dde0d5] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[3/4] sm:aspect-[4/3] lg:aspect-[3/4] bg-[#004fb3]">
                <ClientImage
                  src={clientImages.childrenKiddiesCorner || '/childern_2.webp'}
                  slotKey="site:childrenKiddiesCorner"
                  fallbackSrc="/childern_1.webp"
                  alt="Children enjoying the beach rides and funfair at Frankie's Ramsgate"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 mb-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Ramsgate Main Sands, Kent</span>
                  </div>
                  <p className="font-heading font-extrabold text-base text-white">
                    Family &amp; Children's Beach Amusements
                  </p>
                  <p className="text-xs text-white/80 mt-0.5">
                    Bringing seaside joy, rides &amp; fun to Thanet families
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0580FF] font-heading bg-sky-50 border border-sky-200/80 px-3.5 py-1.5 rounded-full">
                <MapPin className="w-4 h-4 text-[#D1A03F]" />
                <span>Why Ramsgate Matters</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#000000] font-heading leading-tight">
                BELIEVING IN RAMSGATE &amp; ITS PEOPLE
              </h2>

              <p className="text-sm sm:text-base text-[#496068] leading-relaxed">
                Ramsgate wasn't just somewhere picked off a map. Frankie has family connections across Thanet and lived in the area previously. He chose Ramsgate because he genuinely believes in the town, its community, and its enormous seaside potential.
              </p>

              <p className="text-sm sm:text-base text-[#496068] leading-relaxed">
                Frankie invested significant personal money, time, and energy to transform Frankie's @ the Beach into a high-standard destination. But to Frankie, success isn't just measured by turnover or profit:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-[#f8f9f5] border border-[#e4e8dd] flex items-start gap-2.5">
                  <Briefcase className="w-4 h-4 text-[#0580FF] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#000000] uppercase">Youth Employment</h4>
                    <p className="text-[11px] text-[#526b74] mt-0.5">Giving local young people work experience and dependable seaside jobs.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f8f9f5] border border-[#e4e8dd] flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-[#0580FF] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#000000] uppercase">Family Destination</h4>
                    <p className="text-[11px] text-[#526b74] mt-0.5">Creating a vibrant, welcoming seaside spot right beside the sand and funfair.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f8f9f5] border border-[#e4e8dd] flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-[#D1A03F] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#000000] uppercase">UK No. 1 Accolade</h4>
                    <p className="text-[11px] text-[#526b74] mt-0.5">Voted UK's #1 Quick Bite on TripAdvisor by authentic visiting diners.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f8f9f5] border border-[#e4e8dd] flex items-start gap-2.5">
                  <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#000000] uppercase">Community Backbone</h4>
                    <p className="text-[11px] text-[#526b74] mt-0.5">Supporting Thanet causes, autism groups, and local fundraising.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3. GIVING BACK SPOTLIGHT: Direct Link to Dedicated Charity Page */}
        <div className="bg-gradient-to-br from-[#004fb3] via-[#0580FF] to-[#000000] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-lg relative overflow-hidden">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#D1A03F] font-heading bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
                <HandHeart className="w-4 h-4 text-[#D1A03F]" />
                <span>Lifelong Commitment</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase font-heading text-white leading-tight">
                WHY GIVING BACK HAS ALWAYS MATTERED
              </h2>

              <p className="text-sm sm:text-base text-sky-100 leading-relaxed">
                Supporting charities and individuals isn't a marketing strategy for Frankie — it has been an integral part of his life and businesses for decades.
              </p>

              <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
                From establishing the <strong>Share A Little Love Foundation</strong> to funding a specialist wheelchair for a child with cerebral palsy, supporting <strong>Porchlight</strong> and <strong>Pilgrims Hospices</strong>, and helping local Ramsgate families affected by <strong>autism</strong>.
              </p>

              <div className="pt-2">
                <Link
                  to="/charity"
                  className="inline-flex items-center gap-2 bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Heart className="w-4 h-4" />
                  <span>READ FRANKIE'S FULL CHARITY MESSAGE</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 rounded-2xl p-5 sm:p-6 border border-white/20 space-y-3 backdrop-blur-xs">
              <span className="text-[11px] font-bold text-[#D1A03F] uppercase tracking-wider block font-heading">
                Frankie's Personal Words
              </span>
              <p className="text-xs sm:text-sm italic text-white/95 leading-relaxed">
                "Whenever I see someone struggling today, I don't look down on them. I think, 'There but for the grace of God go I.' And if I am in a position to help, then I will. That's not a marketing strategy. That's just me."
              </p>
              <div className="pt-2 border-t border-white/15 text-xs text-sky-200">
                — Frankie Fernando
              </div>
            </div>

          </div>
        </div>

        {/* 4. THREE PILLARS: Award-Winning Food & Coastal Hospitality */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-[#dde0d5] shadow-xs space-y-3 hover:shadow-md transition-shadow text-left">
            <div className="w-12 h-12 rounded-xl bg-[#0580FF]/10 text-[#0580FF] flex items-center justify-center">
              <Award className="w-6 h-6 text-[#0580FF]" />
            </div>
            <h3 className="font-heading font-extrabold text-lg text-[#000000] uppercase">
              Award-Winning Bites
            </h3>
            <p className="text-xs sm:text-sm text-[#526b74] leading-relaxed">
              Voted UK's No. 1 Quick Bite with hearty portions, sizzling smash Angus beef burgers, and hand-cut triple-cooked sea salt chips.
            </p>
          </div>

          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-[#dde0d5] shadow-xs space-y-3 hover:shadow-md transition-shadow text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#D1A03F]" />
            </div>
            <h3 className="font-heading font-extrabold text-lg text-[#000000] uppercase">
              Massive Ice Creams
            </h3>
            <p className="text-xs sm:text-sm text-[#526b74] leading-relaxed">
              Towering chocolate sundae cones, rainbow sprinkles, waffle cones, and ice-cold fruit slushies right on the beach sand.
            </p>
          </div>

          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-[#dde0d5] shadow-xs space-y-3 hover:shadow-md transition-shadow text-left">
            <div className="w-12 h-12 rounded-xl bg-[#0580FF]/10 text-[#0580FF] flex items-center justify-center">
              <Flame className="w-6 h-6 text-[#0580FF]" />
            </div>
            <h3 className="font-heading font-extrabold text-lg text-[#000000] uppercase">
              Jumbo Boardwalk Dogs
            </h3>
            <p className="text-xs sm:text-sm text-[#526b74] leading-relaxed">
              Premium grilled pork frankfurters smothered in melted cheddar cheese, caramelized onions, and savory relish on the sand.
            </p>
          </div>

        </div>

        {/* 5. RAMSGATE BEACH FAMILY FUNFAIR & ATTRACTIONS */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#dde0d5] shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0580FF] font-heading bg-sky-50 border border-sky-200/80 px-3.5 py-1.5 rounded-full mb-3">
              <Palmtree className="w-4 h-4 text-[#D1A03F]" />
              <span>Right Beside Frankie's Kiosk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#000000] font-heading">
              BEACH FUN FOR THE WHOLE FAMILY
            </h2>
            <p className="text-xs sm:text-sm text-[#526b74] mt-2">
              Located right beside our outdoor dining tables are the Ramsgate beach rides, trampolines, and carousel—making Frankie's the perfect stop for kids and parents alike.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                src: clientImages.childrenSlide,
                slotKey: 'site:childrenSlide',
                title: 'Giant Beach Inflatable Slide',
                desc: 'Massive colorful 3-lane inflatable climbing slide right on Ramsgate sand.',
              },
              {
                src: clientImages.childrenKiddiesCorner,
                slotKey: 'site:childrenKiddiesCorner',
                title: 'Kiddies Corner & Family Walk',
                desc: 'Classic carousel and family amusements on the golden beach sand.',
              },
              {
                src: clientImages.childrenTrampolines,
                slotKey: 'site:childrenTrampolines',
                title: 'Beachfront Trampolines Arena',
                desc: 'Multi-bed jumping arena with safety netting overlooking the sea.',
              },
              {
                src: clientImages.childrenCarousel,
                slotKey: 'site:childrenCarousel',
                title: 'Vintage Seaside Carousel',
                desc: 'Traditional red and yellow scalloped carousel ride right beside the waves.',
              },
            ].map((ride, idx) => (
              <div
                key={idx}
                className="bg-[#f8f9f5] rounded-2xl overflow-hidden border border-[#e4e8dd] shadow-xs hover:shadow-md transition-shadow group flex flex-col text-left"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <ClientImage
                    src={ride.src}
                    slotKey={ride.slotKey}
                    fallbackSrc={ASSETS.beachPatio}
                    alt={ride.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h4 className="font-heading font-extrabold text-sm text-[#000000] uppercase">
                    {ride.title}
                  </h4>
                  <p className="text-xs text-[#526b74] mt-1">
                    {ride.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mid-Page Showcase: Children's Beach Rides & Attractions Official TripAdvisor Banner */}
        <div className="rounded-3xl overflow-hidden border border-[#dde0d5] shadow-xs">
          <TripAdvisorAttractionsBanner className="!my-0 !border-0" />
        </div>

        {/* 6. Coastal CTA Box */}
        <div className="bg-[#004fb3] text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-extrabold uppercase tracking-widest font-heading">
              <Palmtree className="w-4 h-4 text-[#D1A03F]" />
              <span>SEE YOU AT THE BEACH!</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase font-heading">
              JOIN US BY THE SEA IN RAMSGATE
            </h2>

            <p className="text-xs sm:text-sm text-sky-100 leading-relaxed max-w-xl mx-auto">
              Grab a seat on the sand, order your favorite smash burger and dirty fries, or stop by for towering sundae cones on your seaside stroll.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                to="/menu"
                className="bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] font-heading font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-2"
              >
                <span>VIEW SEASIDE MENU</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/charity"
                className="bg-white/10 hover:bg-white/20 text-white font-heading font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-white/20 cursor-pointer transition-all flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-[#D1A03F]" />
                <span>CHARITY</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
