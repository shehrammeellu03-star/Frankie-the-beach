import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Utensils,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Phone,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useImages } from '../context/ImageContext';
import { ASSETS } from '../data/restaurantData';

export const CateringShowcase: React.FC = () => {
  const { clientImages } = useImages();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // Video source: checks client custom upload first, then default
  const videoSrc = clientImages.cateringVideo || ASSETS.cateringVideo || '/catering-video.mp4';

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleWhatsAppInquiry = () => {
    const phoneNumber = '447554663569';
    const text =
      `🌴 *BEACH CATERING & PRIVATE HIRE INQUIRY - Frankie's @ The Beach* 🌴\n\n` +
      `Hi Frankie's team! We're planning an event/gathering on Ramsgate Beach and would love details on your catering services, group boxes, and availability.\n\n` +
      `Looking forward to hearing from you!`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-[#f7f8f4] to-[#EEEFE9] border-t border-b border-[#dde0d5] relative overflow-hidden" id="catering">
      {/* Subtle Seaside Texture Accent */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#0580FF]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#D1A03F]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0580FF] font-heading bg-sky-50 border border-sky-200/80 px-4 py-1.5 rounded-full shadow-2xs">
            <Utensils className="w-3.5 h-3.5 text-[#D1A03F]" />
            <span>BEACH CATERING &amp; PRIVATE EVENTS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#000000] font-heading mt-3 leading-tight">
            BRING FRANKIE'S FEAST TO YOUR NEXT EVENT
          </h2>

          <div className="flex justify-center my-3">
            <svg viewBox="0 0 80 10" className="w-16 text-[#D1A03F] fill-none stroke-current stroke-[3] stroke-linecap-round">
              <path d="M0 5 Q10 0 20 5 T40 5 T60 5 T80 5" />
            </svg>
          </div>

          <p className="text-sm sm:text-base text-[#496068] leading-relaxed">
            Planning a beach party, wedding reception, birthday celebration, corporate beach day, or family gathering on Ramsgate Sands? We serve hot smash burgers, loaded fries, hot dogs, and sweet seaside treats right by the waves.
          </p>
        </div>

        {/* 2-Column Showcase: Video Reel (Left) & Event Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Video Player Showcase */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 bg-[#142328] group">
              
              {!videoError ? (
                <video
                  ref={videoRef}
                  src={videoSrc}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  onError={() => setVideoError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Fallback Image Poster if video is missing or still being loaded */
                <div className="w-full h-full relative">
                  <img
                    src={ASSETS.slicedSausage || ASSETS.heroBurger}
                    alt="Frankie's Beach Catering Feast"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6 text-center">
                    <Sparkles className="w-12 h-12 text-[#D1A03F] mb-3" />
                    <span className="font-heading font-black text-xl uppercase tracking-wide">
                      Fresh Beach Catering Showcase
                    </span>
                    <p className="text-xs text-white/80 max-w-sm mt-1">
                      Upload your catering video in the Admin portal or drop catering-video.mp4 into public/ to stream live.
                    </p>
                  </div>
                </div>
              )}

              {/* Floating Top Badge */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-heading font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Catering In Action</span>
              </div>

              {/* Bottom Video Controls Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 sm:p-5 flex items-center justify-between z-20 transition-opacity">
                
                {/* Play / Pause Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    type="button"
                    className="w-10 h-10 rounded-full bg-[#0580FF] hover:bg-[#004fb3] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                    title={isPlaying ? 'Pause video' : 'Play video'}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                  </button>
                  <span className="text-white text-xs font-bold hidden sm:inline drop-shadow">
                    {isPlaying ? 'Playing Catering Reel' : 'Paused'}
                  </span>
                </div>

                {/* Right controls: Sound & Fullscreen */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    type="button"
                    className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                    title={isMuted ? 'Unmute audio' : 'Mute audio'}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-4 h-4 text-amber-300" />
                        <span>Unmute</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-400" />
                        <span>Sound On</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleFullscreen}
                    type="button"
                    className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                    title="Fullscreen"
                    aria-label="Fullscreen video"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

            {/* Video Caption & Capacity Note */}
            <div className="flex flex-wrap items-center justify-between text-xs text-[#526b74] mt-3 px-2">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Live footage from Frankie's Beachfront Kiosk, Ramsgate
              </span>
              <span className="font-heading font-extrabold uppercase text-[#000000]">
                Groups from 10 to 200+ Guests
              </span>
            </div>
          </div>

          {/* RIGHT: Catering Packages & Action Points */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-3">
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#000000] uppercase tracking-tight">
                Freshly Prepared By The Sea
              </h3>
              <p className="text-sm text-[#496068] leading-relaxed">
                Take the stress out of catering your next beach day. We prepare everything fresh to order with generous portions, gourmet packaging, and seaside hospitality.
              </p>
            </div>

            {/* 3 Value Pillars */}
            <div className="space-y-3.5">
              
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#dde0d5] shadow-2xs hover:border-[#0580FF]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#0580FF]/10 text-[#0580FF] flex items-center justify-center shrink-0">
                  <Utensils className="w-5 h-5 text-[#0580FF]" />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-sm text-[#000000] uppercase">
                    Hot Burger &amp; Loaded Fry Platters
                  </h4>
                  <p className="text-xs text-[#526b74] mt-0.5">
                    Double smash beef burgers, BBQ bacon stacks, chilli cheese dogs, and loaded chips boxed piping hot.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#dde0d5] shadow-2xs hover:border-[#0580FF]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D1A03F] flex items-center justify-center shrink-0 border border-amber-200">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-sm text-[#000000] uppercase">
                    Patio Hire or Sand Delivery
                  </h4>
                  <p className="text-xs text-[#526b74] mt-0.5">
                    Reserve our open-air beach dining patio right beside the carousel, or have food delivered right to your beach spot.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#dde0d5] shadow-2xs hover:border-[#0580FF]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-sm text-[#000000] uppercase">
                    Drinks, Slushies &amp; Ice Cream Treats
                  </h4>
                  <p className="text-xs text-[#526b74] mt-0.5">
                    Cold canned beers, fruit slushies, whippy cones with Flakes, and artisan barista coffees for your whole crew.
                  </p>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              
              <button
                onClick={handleWhatsAppInquiry}
                type="button"
                className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-extrabold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                title="Inquire about catering on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>INQUIRE VIA WHATSAPP</span>
              </button>

              <Link
                to="/contact"
                className="bg-[#0580FF] hover:bg-[#004fb3] text-white font-heading font-extrabold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>EVENT INQUIRY FORM</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

            </div>

            {/* Direct Call Line */}
            <div className="text-center sm:text-left text-xs text-[#526b74]">
              <span>Prefer to talk directly? Call Frankie's at </span>
              <a
                href="tel:07554663569"
                className="font-bold text-[#000000] hover:text-[#0580FF] underline inline-flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-[#0580FF]" />
                07554 663569
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
