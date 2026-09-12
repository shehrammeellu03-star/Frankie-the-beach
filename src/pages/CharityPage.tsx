import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Sparkles,
  Users,
  Briefcase,
  MapPin,
  Quote,
  ArrowRight,
  HandHeart,
  Accessibility,
  CheckCircle2,
  Mail,
  Phone,
  ShieldCheck,
  Palmtree,
  Smile,
} from 'lucide-react';
import { CHARITY_MESSAGE } from '../data/charityData';
import { CLIENT_IMAGES, ASSETS } from '../data/restaurantData';
import { ClientImage } from '../components/ClientImage';

// Children and Play Areas authentic photography
const PLAY_AREA_IMAGES = [
  {
    src: CLIENT_IMAGES.childrenKiddiesCorner,
    fallbackSrc: ASSETS.children2,
    slotKey: 'site:childrenKiddiesCorner',
    title: 'Seaside Days Out & Kiddies Corner',
    badge: 'Children & Families',
    desc: 'Organizing memorable beach days, treats, and fun for children’s clubs and local families who might otherwise miss out.',
  },
  {
    src: CLIENT_IMAGES.childrenSlide,
    fallbackSrc: ASSETS.children1,
    slotKey: 'site:childrenSlide',
    title: 'Giant Beach Inflatable Slide',
    badge: 'Play & Carefree Smiles',
    desc: 'Creating joyful, energetic spaces right on Ramsgate Main Sands where children can simply be kids without worries.',
  },
  {
    src: CLIENT_IMAGES.childrenTrampolines,
    fallbackSrc: ASSETS.children3,
    slotKey: 'site:childrenTrampolines',
    title: 'Beachfront Trampolines Arena',
    badge: 'Youth & Active Play',
    desc: 'Supporting local youth sports groups, community days, and active outdoor fun overlooking the sea.',
  },
  {
    src: CLIENT_IMAGES.childrenCarousel,
    fallbackSrc: ASSETS.children4,
    slotKey: 'site:childrenCarousel',
    title: 'Vintage Seaside Carousel',
    badge: 'Inclusive Autism Support',
    desc: 'Accessible seaside smiles, supporting Thanet organisations helping children and families affected by autism.',
  },
];

export const CharityPage: React.FC = () => {
  return (
    <div className="flex-1 bg-[#EEEFE9] pb-20">
      
      {/* 1. HERO BANNER */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-1 sm:mt-2 mb-8 sm:mb-10">
        <div className="bg-[#0580FF] text-white py-12 sm:py-16 px-4 sm:px-8 rounded-3xl relative overflow-hidden shadow-sm">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-cyan-600/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <nav className="flex justify-center items-center gap-2 text-xs uppercase tracking-widest text-sky-200 mb-3 font-semibold">
              <Link to="/" className="hover:text-white transition-colors">
                HOME
              </Link>
              <span>/</span>
              <span className="text-[#D1A03F]">CHARITY</span>
            </nav>

            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-300 font-heading mb-2.5 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
              <HandHeart className="w-4 h-4 text-[#D1A03F]" />
              <span>FRANKIE'S CHARITY WORK</span>
              <HandHeart className="w-4 h-4 text-[#D1A03F]" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white font-heading">
              WHY GIVING BACK HAS ALWAYS MATTERED
            </h1>

            <div className="flex justify-center my-3">
              <svg viewBox="0 0 80 10" className="w-16 text-[#D1A03F] fill-none stroke-current stroke-[3] stroke-linecap-round">
                <path d="M0 5 Q10 0 20 5 T40 5 T60 5 T80 5" />
              </svg>
            </div>

            <p className="text-base sm:text-xl text-sky-100 max-w-2xl mx-auto font-medium leading-relaxed">
              A personal message from Frankie Fernando — Founder of Frankie's @ the Beach Ramsgate.
            </p>

            {/* Quick Badge info */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-xs text-sky-100">
              <span className="bg-white/15 px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                Decades of Direct Support
              </span>
              <span className="bg-white/15 px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 font-semibold">
                <Heart className="w-3.5 h-3.5 text-amber-300" />
                Share A Little Love Foundation
              </span>
              <span className="bg-white/15 px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 font-semibold">
                <Smile className="w-3.5 h-3.5 text-amber-300" />
                Seaside Days Out for Children
              </span>
              <span className="bg-white/15 px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                Ramsgate &amp; Thanet Causes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN EDITORIAL LETTER CONTAINER */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Featured Quote Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#dde0d5] shadow-sm mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-[#0580FF] pointer-events-none">
            <Quote className="w-32 h-32" />
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#0580FF] flex items-center justify-center shrink-0 mt-1 shadow-2xs">
              <Quote className="w-6 h-6 text-[#0580FF]" />
            </div>
            <div className="space-y-2 text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#0580FF] font-heading block">
                FROM THE HEART
              </span>
              <blockquote className="text-lg sm:text-2xl font-heading font-extrabold text-[#000000] italic leading-snug">
                {CHARITY_MESSAGE.leadQuote}
              </blockquote>
              <p className="text-xs sm:text-sm font-semibold text-[#526b74]">
                — Frankie Fernando, Founder
              </p>
            </div>
          </div>
        </div>

        {/* The Authentic Message — Part 1: Personal Roots & Why It Matters */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#dde0d5] shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-5 text-left text-[#324b53] leading-relaxed text-base sm:text-lg">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0580FF] font-heading bg-sky-50 border border-sky-200/80 px-3.5 py-1.5 rounded-full mb-1">
                <Heart className="w-4 h-4 text-[#D1A03F]" />
                <span>The Story of Giving Back</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#000000] font-heading leading-tight">
                MORE THAN JUST A BUSINESS
              </h2>

              <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-[#0580FF] first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                {CHARITY_MESSAGE.paragraphs[0]}
              </p>

              <p>
                {CHARITY_MESSAGE.paragraphs[1]}
              </p>

              <div className="p-5 sm:p-6 bg-[#f8f9f5] rounded-2xl border-l-4 border-[#0580FF] space-y-3 my-6">
                <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#000000] uppercase">
                  A Very Personal Reason
                </h3>
                <p className="text-sm sm:text-base text-[#496068]">
                  {CHARITY_MESSAGE.paragraphs[2]}
                </p>
              </div>

              <p>
                {CHARITY_MESSAGE.paragraphs[3]}
              </p>

              <p>
                {CHARITY_MESSAGE.paragraphs[4]}
              </p>

              <p className="font-medium text-[#000000]">
                {CHARITY_MESSAGE.paragraphs[5]}
              </p>
            </div>

            {/* Sidebar Photo: Frankie & Beach Bar Crew + Children Play Area Preview */}
            <div className="lg:col-span-5 space-y-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[3/4] bg-[#000000]">
                <ClientImage
                  src={CLIENT_IMAGES.barSelfie}
                  slotKey="site:barSelfie"
                  fallbackSrc={ASSETS.barSelfie}
                  alt="Frankie Fernando & Beach Bar Crew at Frankie's @ the beach Ramsgate"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#D1A03F] block font-heading mb-1">
                    Frankie Fernando &amp; Crew
                  </span>
                  <p className="font-heading font-bold text-base text-white leading-snug">
                    "Helping people has always been part of who I am."
                  </p>
                  <p className="text-xs text-sky-200 mt-1">
                    Frankie's @ the Beach — Ramsgate Sands
                  </p>
                </div>
              </div>

              {/* Visual Preview Card: Beach Play & Children Days Out */}
              <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-white aspect-[16/10] bg-[#004fb3] group">
                <ClientImage
                  src={CLIENT_IMAGES.childrenKiddiesCorner}
                  slotKey="site:childrenKiddiesCorner"
                  fallbackSrc={ASSETS.children2}
                  alt="Children play area on Ramsgate Beach"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/85 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 font-heading block">
                    Seaside Days Out
                  </span>
                  <p className="text-xs font-bold text-white leading-tight mt-0.5">
                    Supporting children's clubs &amp; memorable beach days
                  </p>
                </div>
              </div>

              {/* Personal Value Cards */}
              <div className="bg-[#f8f9f5] rounded-2xl p-5 border border-[#dde0d5] space-y-3 text-left">
                <h4 className="font-heading font-extrabold text-xs text-[#000000] uppercase tracking-wider">
                  Frankie's Principles
                </h4>
                <div className="space-y-2 text-xs text-[#496068]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0580FF] shrink-0 mt-0.5" />
                    <span><strong>Break the mould:</strong> Overcoming childhood hardship through hard work and determination.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0580FF] shrink-0 mt-0.5" />
                    <span><strong>Never forget roots:</strong> Having a genuine soft spot for those facing tough times.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0580FF] shrink-0 mt-0.5" />
                    <span><strong>Real action:</strong> Direct community support rather than marketing publicity.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3. DEDICATED VISUAL SHOWCASE: CHILDREN & PLAY AREAS ON RAMSGATE BEACH */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#dde0d5] shadow-sm mb-10 text-left">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0580FF] font-heading bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full mb-2">
              <Smile className="w-4 h-4 text-[#D1A03F]" />
              <span>Children &amp; Community Play Areas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#000000] font-heading">
              PROVIDING DAYS OUT, JOY &amp; SMILES FOR CHILDREN
            </h2>
            <p className="text-sm sm:text-base text-[#496068] mt-2 leading-relaxed">
              In Frankie’s own words: <em>"Through the years, I have helped provide days out for children, supported children's clubs, helped with specialist equipment, including a wheelchair for a child with cerebral palsy... and organisations helping children and families affected by autism."</em>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PLAY_AREA_IMAGES.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#f8f9f5] rounded-2xl overflow-hidden border border-[#e4e8dd] shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <ClientImage
                    src={item.src}
                    slotKey={item.slotKey}
                    fallbackSrc={item.fallbackSrc}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0580FF] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                    {item.badge}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-[#000000] uppercase group-hover:text-[#0580FF] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#526b74] mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#edf0e6] flex items-center gap-1.5 text-[11px] font-bold text-[#0580FF]">
                    <MapPin className="w-3.5 h-3.5 text-[#D1A03F]" />
                    <span>Ramsgate Main Sands Beachfront</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. CHARITABLE PILLARS & INITIATIVES */}
        <div className="mb-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0580FF] font-heading bg-sky-50 border border-sky-200/80 px-3.5 py-1.5 rounded-full mb-2">
              <Sparkles className="w-4 h-4 text-[#D1A03F]" />
              <span>Decades of Community Commitment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#000000] font-heading">
              HOW WE GIVE BACK
            </h2>
            <p className="text-xs sm:text-sm text-[#526b74] mt-1.5">
              Supporting children, local families, hospice care, and grassroots causes across Kent and Thanet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHARITY_MESSAGE.causes.map((cause, idx) => {
              const getIcon = () => {
                switch (cause.iconName) {
                  case 'heart':
                    return <Heart className="w-6 h-6 text-[#D1A03F]" />;
                  case 'wheelchair':
                    return <Accessibility className="w-6 h-6 text-[#0580FF]" />;
                  case 'users':
                    return <Users className="w-6 h-6 text-[#0580FF]" />;
                  case 'sparkles':
                    return <Sparkles className="w-6 h-6 text-[#D1A03F]" />;
                  case 'briefcase':
                    return <Briefcase className="w-6 h-6 text-[#0580FF]" />;
                  default:
                    return <Heart className="w-6 h-6 text-[#0580FF]" />;
                }
              };

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-[#dde0d5] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between text-left space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#f8f9f5] border border-[#e4e8dd] flex items-center justify-center">
                        {getIcon()}
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-50 text-[#0580FF] border border-sky-200">
                        {cause.badge}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-[#D1A03F] uppercase tracking-wider font-heading block">
                        {cause.category}
                      </span>
                      <h3 className="text-lg font-extrabold text-[#000000] font-heading uppercase mt-0.5">
                        {cause.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#496068] leading-relaxed">
                      {cause.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. The Authentic Message — Part 2: Decades of Community Support */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#dde0d5] shadow-sm mb-10 text-left">
          <div className="max-w-3xl mx-auto space-y-6 text-[#324b53] leading-relaxed text-base sm:text-lg">
            
            <div className="border-b border-gray-100 pb-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#D1A03F] font-heading block mb-1">
                A LIFELONG PROMISE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#000000] font-heading">
                {CHARITY_MESSAGE.decadesSectionTitle}
              </h2>
            </div>

            <p>
              {CHARITY_MESSAGE.decadesParagraphs[0]}
            </p>

            <p>
              {CHARITY_MESSAGE.decadesParagraphs[1]}
            </p>

            {/* Share A Little Love Box */}
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-6 rounded-2xl border-l-4 border-[#D1A03F] space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#D1A03F]" />
                <h4 className="font-heading font-extrabold text-base text-[#000000] uppercase">
                  The Share A Little Love Foundation
                </h4>
              </div>
              <p className="text-sm sm:text-base text-[#496068]">
                {CHARITY_MESSAGE.decadesParagraphs[2]}
              </p>
            </div>

            <p>
              {CHARITY_MESSAGE.decadesParagraphs[3]}
            </p>

            {/* Autism Support Highlight */}
            <div className="bg-[#0580FF]/5 p-6 rounded-2xl border border-sky-200/60 space-y-2">
              <div className="flex items-center gap-2 text-[#0580FF]">
                <Sparkles className="w-5 h-5 text-[#0580FF]" />
                <h4 className="font-heading font-extrabold text-base text-[#000000] uppercase">
                  Supporting Autism in Thanet
                </h4>
              </div>
              <p className="text-sm sm:text-base text-[#496068]">
                {CHARITY_MESSAGE.decadesParagraphs[4]}
              </p>
            </div>

            <p>
              {CHARITY_MESSAGE.decadesParagraphs[5]}
            </p>

            <p>
              {CHARITY_MESSAGE.decadesParagraphs[6]}
            </p>

            <p className="font-medium text-[#000000]">
              {CHARITY_MESSAGE.decadesParagraphs[7]}
            </p>

            {/* Powerful Final Quote Callout */}
            <div className="mt-8 pt-6 border-t-2 border-[#D1A03F]/30">
              <blockquote className="text-xl sm:text-2xl font-heading font-extrabold text-[#0580FF] italic leading-snug">
                {CHARITY_MESSAGE.closingQuote}
              </blockquote>
              <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="font-heading font-extrabold text-base text-[#000000] uppercase">
                    Frankie Fernando
                  </p>
                  <p className="text-xs text-[#526b74]">
                    Founder, Frankie's @ the Beach Ramsgate
                  </p>
                </div>
                <div className="font-hand text-3xl sm:text-4xl text-[#D1A03F] font-bold">
                  Frankie Fernando
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 6. LOCAL CAUSES CONTACT BOX */}
        <div className="bg-[#004fb3] text-white rounded-3xl p-8 sm:p-12 shadow-xl mb-8">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-extrabold uppercase tracking-widest font-heading bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
              <HandHeart className="w-4 h-4 text-[#D1A03F]" />
              <span>LOCAL RAMSGATE &amp; THANET CAUSES</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase font-heading">
              ARE YOU RUNNING A LOCAL COMMUNITY CAUSE?
            </h2>

            <p className="text-xs sm:text-sm text-sky-100 leading-relaxed max-w-xl mx-auto">
              If you represent a grassroots children’s club, an autism family support group, or a local Thanet community charity where a helping hand can make a genuine difference, we would love to hear from you.
            </p>

            <div className="pt-3 flex flex-wrap justify-center items-center gap-4">
              <a
                href="mailto:frankiefernando@msn.com?subject=Community%20Charity%20Inquiry%20-%20Frankie's%20Ramsgate"
                className="bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] font-heading font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-2 active:scale-95"
              >
                <Mail className="w-4 h-4" />
                <span>EMAIL FRANKIE DIRECTLY</span>
              </a>

              <a
                href="tel:+447554663569"
                className="bg-white/15 hover:bg-white/25 text-white font-heading font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-white/20 cursor-pointer transition-all flex items-center gap-2 active:scale-95"
              >
                <Phone className="w-4 h-4 text-[#D1A03F]" />
                <span>+44 7554 663569</span>
              </a>
            </div>

            <div className="pt-2 text-[11px] text-sky-200/80">
              Beachfront, Ocean Drive • Ramsgate CT11 8LS • Kent, United Kingdom
            </div>
          </div>
        </div>

        {/* 7. Navigation Link back to About & Menu */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-[#dde0d5] text-xs font-semibold">
          <Link
            to="/about"
            className="text-[#0580FF] hover:underline flex items-center gap-1.5 font-heading font-extrabold uppercase tracking-wider"
          >
            ← Learn More About Frankie's Beach Story
          </Link>
          <Link
            to="/menu"
            className="text-[#D1A03F] hover:text-[#8C6F2B] flex items-center gap-1.5 font-heading font-extrabold uppercase tracking-wider"
          >
            <span>Explore Beachfront Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
};
