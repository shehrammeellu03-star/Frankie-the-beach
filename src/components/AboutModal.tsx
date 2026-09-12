import React from 'react';
import { X, Palmtree, Award, Heart, Sunset } from 'lucide-react';
import { ASSETS } from '../data/restaurantData';
import { ClientImage } from './ClientImage';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreMenu: () => void;
  onContact?: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onExploreMenu,
  onContact,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/65 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto z-10 border border-[#dde0d5]">
        
        {/* Header with image banner */}
        <div className="relative h-48 sm:h-60 overflow-hidden bg-[#002866]">
          <ClientImage
            src={ASSETS.kiosk}
            slotKey="site:kiosk"
            fallbackSrc={ASSETS.beachPatio}
            alt="Frankie's Beachfront on Ramsgate Sands"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000e1f] via-transparent to-black/30" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-amber-300 p-1 rounded-lg bg-black/40 hover:bg-black/60 transition-colors"
            aria-label="Close about us"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-6 text-white">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest font-heading mb-1">
              <Palmtree className="w-4 h-4 text-[#D1A03F]" />
              ESTABLISHED ON RAMSGATE BEACH, KENT
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold uppercase">
              ABOUT FRANKIE'S @ THE BEACH
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-[#3e555e] text-xs sm:text-sm leading-relaxed">
          <div>
            <h3 className="font-heading font-extrabold text-base text-[#000000] uppercase mb-2">
              Our Story: Eat. Beach. Repeat.
            </h3>
            <p>
              Born from a love for salty sea air, golden hour sunsets, and unapologetically juicy burgers, Frankie’s @ The Beach started as a small timber beach shack on Ramsgate's Ocean Drive. Today, it’s the go-to coastal hangout for locals, surfers, and sunset chasers looking for serious smash burgers, loaded fries, and sweet seaside treats.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-[#EEEFE9] rounded-2xl border border-[#dde0d5] space-y-2">
              <Award className="w-6 h-6 text-[#0580FF]" />
              <h4 className="font-heading font-extrabold text-xs text-[#000000] uppercase">
                100% British Angus
              </h4>
              <p className="text-xs text-[#5a717a]">
                Locally sourced beef patties seared on an ultra-hot chrome flat-top for that crispy caramelized crust.
              </p>
            </div>

            <div className="p-4 bg-[#EEEFE9] rounded-2xl border border-[#dde0d5] space-y-2">
              <Sunset className="w-6 h-6 text-[#0580FF]" />
              <h4 className="font-heading font-extrabold text-xs text-[#000000] uppercase">
                Front-Row Ocean Views
              </h4>
              <p className="text-xs text-[#5a717a]">
                Direct unobstructed view of the beach, boardwalk, and evening coastal sunset.
              </p>
            </div>

            <div className="p-4 bg-[#EEEFE9] rounded-2xl border border-[#dde0d5] space-y-2">
              <Heart className="w-6 h-6 text-[#0580FF]" />
              <h4 className="font-heading font-extrabold text-xs text-[#000000] uppercase">
                Good Food, Good Mood
              </h4>
              <p className="text-xs text-[#5a717a]">
                Dog-friendly patio, laid-back acoustic beach tunes, and our signature secret Frankie’s burger sauce.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4 justify-between border-t border-[#edf0e6]">
            <p className="font-hand text-2xl text-[#0580FF] font-bold">
              We look forward to seeing you down by the water!
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  onClose();
                  onExploreMenu();
                }}
                className="bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] font-heading font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Explore Menu
              </button>
              <button
                onClick={() => {
                  onClose();
                  onContact?.();
                }}
                className="bg-[#002866] hover:bg-[#073c47] text-white font-heading font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Contact &amp; Location
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
