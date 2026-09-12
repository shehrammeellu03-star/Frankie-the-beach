import React, { useState, useRef, useEffect } from 'react';
import { Utensils, MapPin, Palmtree, Volume2, VolumeX, Play, Pause, Video } from 'lucide-react';
import { ASSETS } from '../data/restaurantData';
import { ClientImage } from './ClientImage';
import { useImages } from '../context/ImageContext';

interface HeroProps {
  onExploreMenu: () => void;
  onContact?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onContact }) => {
  const { clientImages, slotOverrides } = useImages();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const heroVideoSrc =
    slotOverrides['site:heroVideo'] ||
    slotOverrides['heroVideo'] ||
    clientImages.heroVideo ||
    ASSETS.heroVideo ||
    '/hero-video.mp4';

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle mobile autoplay restriction
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [heroVideoSrc]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-1 sm:mt-2">
      <section
        id="home"
        className="relative text-white pt-8 sm:pt-14 pb-24 sm:pb-36 overflow-hidden bg-[#0580FF] rounded-3xl shadow-lg border border-white/10"
      >
      {/* 1. Full Beach Ocean Background (Video with Image Poster Fallback) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background Image Poster (Immediate, zero layout shift, seamless fallback) */}
        <div className="absolute inset-0 z-0">
          {clientImages.heroBg ? (
            <ClientImage
              src={clientImages.heroBg}
              slotKey="site:heroBg"
              fallbackSrc=""
              alt="Frankie's Beach"
              className="w-full h-full object-cover object-center"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0580FF] via-[#004fb3] to-[#002d66]" />
          )}
        </div>

        {/* Ambient Hero Video Loop */}
        {!videoError && heroVideoSrc && (
          <video
            ref={videoRef}
            src={heroVideoSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 z-[1] ${
              isVideoLoaded ? 'opacity-95' : 'opacity-0'
            }`}
          />
        )}

        {/* Cinematic Ocean & Seaside Color Grading Overlay for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#004fb3]/80 via-[#0580FF]/65 to-[#003680]/75 mix-blend-multiply z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#003680]/60 via-transparent to-[#002855]/75 z-[2]" />
      </div>

      {/* Live Video Control Badge */}
      {!videoError && isVideoLoaded && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 transition-all text-xs font-medium text-white shadow-lg">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="hidden sm:inline uppercase tracking-wider text-[10px] font-bold text-white/90">
            Beach Video
          </span>
          <button
            onClick={togglePlay}
            className="p-1 hover:text-[#ECD87A] transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
            aria-label={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-1 hover:text-[#ECD87A] transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* 2. Realistic Tropical Palm Tree Silhouettes & Sun Flares */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-40">
        {/* Left palm frond shadow */}
        <svg
          className="absolute -top-10 -left-16 w-[420px] h-[420px] text-[#001226] transform -rotate-12 filter blur-[0.5px]"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M10,180 Q80,120 160,20 Q110,60 60,110 Q140,40 180,60 Q120,80 80,130 Q160,90 190,120 Q130,120 90,150 Z" />
          <path d="M0,190 Q60,150 130,50 Q90,90 40,140 Q110,80 150,90 Q90,110 60,160 Z" />
        </svg>

        {/* Top-Right palm frond canopy */}
        <svg
          className="absolute -top-16 -right-16 w-[460px] h-[460px] text-[#001226] transform rotate-45 filter blur-[0.5px]"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M190,10 Q120,80 20,160 Q60,110 110,60 Q40,140 60,180 Q80,120 130,80 Q90,160 120,190 Q120,130 150,90 Z" />
        </svg>

        {/* Sunny ocean caustics & glimmers */}
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-3xl mix-blend-overlay"></div>
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          
          {/* Left Column: Bold Typography & Call to Actions */}
          <div className="lg:col-span-6 xl:col-span-5 text-left pt-2 lg:pt-0">
            {/* Massive Display Heading with crisp shadow */}
            <div className="space-y-0 tracking-tight font-impact text-7xl sm:text-8xl xl:text-9xl leading-[0.88] select-none">
              <h1 className="text-white block drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] font-black">EAT.</h1>
              <h1 className="text-white block drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] font-black">BEACH.</h1>
              <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] block drop-shadow-[0_4px_14px_rgba(0,0,0,0.7)] font-black">
                REPEAT.
              </h1>
            </div>

            {/* Golden Triple Wavy Lines */}
            <div className="mt-5 mb-5 flex flex-col gap-1.5 w-24">
              <svg viewBox="0 0 100 12" className="w-20 text-[#D1A03F] fill-none stroke-current stroke-[3.5] stroke-linecap-round stroke-linejoin-round drop-shadow-sm">
                <path d="M0 6 Q12.5 0 25 6 T50 6 T75 6 T100 6" />
              </svg>
              <svg viewBox="0 0 100 12" className="w-20 text-[#D1A03F] fill-none stroke-current stroke-[3.5] stroke-linecap-round stroke-linejoin-round -mt-1 drop-shadow-sm">
                <path d="M0 6 Q12.5 0 25 6 T50 6 T75 6 T100 6" />
              </svg>
              <svg viewBox="0 0 100 12" className="w-20 text-[#D1A03F] fill-none stroke-current stroke-[3.5] stroke-linecap-round stroke-linejoin-round -mt-1 drop-shadow-sm">
                <path d="M0 6 Q12.5 0 25 6 T50 6 T75 6 T100 6" />
              </svg>
            </div>

            {/* Subtext */}
            <div className="space-y-1 text-white text-lg sm:text-xl font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              <p>Burgers. Fries. Ocean Views.</p>
              <p>What more do you need?</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreMenu}
                id="btn-explore-menu"
                className="bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] font-heading font-extrabold text-sm uppercase tracking-wider px-6 sm:px-7 py-3.5 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:shadow-2xl transition-all flex items-center gap-2.5 group cursor-pointer"
              >
                <span>EXPLORE MENU</span>
                <Utensils className="w-4 h-4 text-[#000000] group-hover:rotate-12 transition-transform" />
              </button>

              <button
                onClick={onContact}
                id="btn-hero-contact"
                className="bg-[#004fb3]/80 hover:bg-[#004fb3] active:scale-95 text-white font-heading font-extrabold text-sm uppercase tracking-wider px-6 sm:px-7 py-3 rounded-xl border-2 border-white shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:shadow-2xl transition-all flex items-center gap-2.5 group cursor-pointer backdrop-blur-xs"
              >
                <span>FIND &amp; CONTACT US</span>
                <MapPin className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Polaroid Collage & Stamp Badge */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex justify-center lg:justify-end mt-6 lg:mt-0">
            <div className="relative w-full max-w-[560px] h-[480px] sm:h-[540px]">
              
              {/* White Artistic Paint Splatter / Seafoam Textures Behind Polaroids */}
              <div className="absolute inset-0 pointer-events-none select-none z-0">
                <svg viewBox="0 0 500 500" className="w-full h-full opacity-60 filter blur-[0.3px]" fill="white">
                  <path d="M120,240 C140,210 180,210 220,225 C260,240 310,210 360,220 C410,230 450,260 440,310 C430,360 400,390 350,405 C300,420 250,395 210,410 C170,425 130,410 110,380 C90,350 95,300 105,270 Z" opacity="0.35" />
                  <path d="M220,130 C270,110 320,125 365,150 C410,175 440,210 430,260 C420,310 370,330 330,310 C290,290 260,315 220,300 C180,285 170,250 185,210 C200,170 180,145 220,130 Z" opacity="0.4" />
                  <circle cx="100" cy="220" r="14" opacity="0.5" />
                  <circle cx="85" cy="250" r="8" opacity="0.4" />
                  <circle cx="450" cy="200" r="12" opacity="0.5" />
                  <circle cx="470" cy="230" r="6" opacity="0.4" />
                  <circle cx="440" cy="390" r="16" opacity="0.4" />
                  <circle cx="130" cy="420" r="12" opacity="0.3" />
                  <circle cx="390" cy="110" r="9" opacity="0.45" />
                </svg>
              </div>

              {/* Polaroid 2 (Top-Right): Frankie's Beachfront Kiosk */}
              <div
                className="absolute right-0 sm:right-2 top-2 sm:top-4 w-52 sm:w-64 bg-white p-2.5 pb-6 shadow-[0_20px_45px_rgba(0,0,0,0.45)] rounded-[2px] transform rotate-[6deg] hover:rotate-3 transition-transform duration-300 z-10 group cursor-pointer"
                onClick={onExploreMenu}
                title="Frankie's Beachfront Kiosk"
              >
                <div className="overflow-hidden aspect-square bg-[#006ee0]">
                  <ClientImage
                    src={clientImages.kiosk || ASSETS.kiosk}
                    slotKey="site:kiosk"
                    fallbackSrc={ASSETS.kiosk}
                    alt="Frankie's Beachfront Kiosk on Ramsgate Beach"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              {/* Polaroid 1 (Center-Left): Main Cheeseburger */}
              <div
                className="absolute left-2 sm:left-4 top-8 sm:top-12 w-64 sm:w-80 bg-white p-3 sm:p-3.5 pb-8 sm:pb-9 shadow-[0_28px_60px_rgba(0,0,0,0.55)] rounded-[2px] transform -rotate-[4deg] hover:-rotate-1 transition-transform duration-300 z-20 group cursor-pointer"
                onClick={onExploreMenu}
                title="Gourmet Cheeseburger at the beach"
              >
                <div className="overflow-hidden aspect-square bg-[#004fb3]">
                  <ClientImage
                    src={clientImages.heroBurger || ASSETS.heroBurger}
                    slotKey="site:heroBurger"
                    fallbackSrc={ASSETS.heroBurger}
                    alt="Towering gourmet double bacon cheeseburger by the ocean"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              {/* Polaroid 3 (Bottom-Right): Pepperoni & Melted Cheddar Dirty Fries */}
              <div
                className="absolute right-2 sm:right-6 bottom-4 sm:bottom-6 w-48 sm:w-60 bg-white p-2.5 pb-6 shadow-[0_22px_50px_rgba(0,0,0,0.48)] rounded-[2px] transform -rotate-[6deg] hover:rotate-0 transition-transform duration-300 z-30 group cursor-pointer"
                onClick={onExploreMenu}
                title="Pepperoni & Melted Cheddar Dirty Fries"
              >
                <div className="overflow-hidden aspect-square bg-[#003680]">
                  <ClientImage
                    src={clientImages.pepperoniFries || ASSETS.loadedFries}
                    slotKey="site:pepperoniFries"
                    fallbackSrc={ASSETS.loadedFries}
                    alt="Pepperoni & Melted Cheddar Dirty Fries in beach carton"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              {/* Circular Stamp Badge: GOOD FOOD ★ GOOD MOOD */}
              <div
                className="absolute left-1 sm:left-6 top-[250px] sm:top-[280px] z-40 stamp-badge pointer-events-auto"
                title="Good Food Good Mood"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white border-2 border-dashed border-[#0580FF] p-1.5 flex items-center justify-center relative shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
                  {/* Outer circular text simulated with SVG */}
                  <svg className="w-full h-full animate-[spin_25s_linear_infinite]" viewBox="0 0 100 100">
                    <defs>
                      <path
                        id="circlePathTop"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text className="text-[9.5px] font-extrabold uppercase tracking-[0.2em] fill-[#0580FF]">
                      <textPath href="#circlePathTop" startOffset="0%">
                        GOOD FOOD  ★  GOOD MOOD  ★ 
                      </textPath>
                    </text>
                  </svg>

                  {/* Center Teal Palm Tree Icon */}
                  <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#f0f9fa] flex items-center justify-center border border-[#0580FF]/20">
                    <Palmtree className="w-7 h-7 text-[#0580FF] stroke-[2.3]" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Realistic Wave / Beach Sand Torn-Edge Transition into Cream Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 sm:h-20 lg:h-24 object-cover text-[#EEEFE9]"
          preserveAspectRatio="none"
        >
          {/* Soft wave spray highlight */}
          <path
            d="M0,45 C150,75 350,20 540,55 C720,85 920,25 1100,50 C1280,75 1380,35 1440,55 L1440,95 L0,95 Z"
            fill="rgba(255,255,255,0.45)"
          />
          {/* Main solid sand edge matching section below */}
          <path
            d="M0,52 C180,25 360,80 540,48 C720,18 900,72 1080,42 C1260,15 1360,60 1440,40 L1440,95 L0,95 Z"
            fill="#EEEFE9"
          />
        </svg>
      </div>
    </section>
  </div>
  );
};
