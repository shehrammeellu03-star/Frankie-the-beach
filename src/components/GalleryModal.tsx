import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Palmtree } from 'lucide-react';
import { ASSETS } from '../data/restaurantData';
import { ClientImage } from './ClientImage';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose }) => {
  const images = [
    {
      src: ASSETS.barSelfie,
      slotKey: 'site:barSelfie',
      title: "Frankie's Beach Bar Team & Welcoming Service",
      desc: "Inside Frankie's on Ramsgate Main Sands with friendly smiles, cold refreshments, and beach treats.",
    },
    {
      src: ASSETS.heroBurger,
      slotKey: 'site:heroBurger',
      title: 'Beach Classic Cheeseburger',
      desc: 'Double Angus smash patty, melted aged cheddar, smoky crispy bacon, freshly baked brioche.',
    },
    {
      src: ASSETS.beachPatio,
      slotKey: 'site:kiosk',
      title: 'Beachfront Deck & Umbrella Dining',
      desc: 'Open air seaside seating with ocean breeze, rattan chairs, and panoramic coastline view.',
    },
    {
      src: ASSETS.chocolateSundaeCone,
      slotKey: 'site:massiveIceCream',
      title: 'Massive Chocolate Sundae Waffle Cone',
      desc: 'Towering vanilla and chocolate soft-serve swirl topped with Belgian chocolate drizzle and sprinkles.',
    },
    {
      src: ASSETS.loadedFries,
      slotKey: 'menu:pepperoni-melted-cheddar-fries',
      title: 'Golden Cheesy Loaded Fries',
      desc: 'Hand-cut crispy fries smothered in melted cheddar sauce, bacon bits, and chopped scallions.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#07242c] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col border border-white/10 text-white">
        
        {/* Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-[#051a20]">
          <div className="flex items-center gap-2">
            <Palmtree className="w-5 h-5 text-[#D1A03F]" />
            <h3 className="font-heading font-extrabold text-sm sm:text-base uppercase tracking-wider">
              FRANKIE'S BEACH GALLERY
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Photo Showcase */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
          <ClientImage
            src={images[currentIndex].src}
            slotKey={images[currentIndex].slotKey}
            fallbackSrc={images[currentIndex].src}
            alt={images[currentIndex].title}
            className="w-full h-full object-contain"
          />

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Caption & Thumbnails */}
        <div className="p-5 bg-[#051a20] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-heading font-extrabold text-base text-white">
              {images[currentIndex].title}
            </h4>
            <p className="text-xs text-white/70 mt-0.5">
              {images[currentIndex].desc}
            </p>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  currentIndex === idx ? 'border-[#D1A03F] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <ClientImage
                  src={img.src}
                  slotKey={img.slotKey}
                  fallbackSrc={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
