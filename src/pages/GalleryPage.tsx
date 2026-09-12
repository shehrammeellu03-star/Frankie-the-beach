import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Palmtree,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Sparkles,
} from 'lucide-react';
import { CLIENT_IMAGES, ASSETS, FRANKIES_FACEBOOK_URL } from '../data/restaurantData';
import { ClientImage } from '../components/ClientImage';
import { useImages } from '../context/ImageContext';
import { GalleryItem } from '../types';

export const GalleryPage: React.FC = () => {
  const { galleryItems } = useImages();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [galleryItems, activeCategory]);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredItems.length) % filteredItems.length);
    }
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
              <span className="text-[#D1A03F]">GALLERY</span>
            </nav>

            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-300 font-heading mb-2">
              <Palmtree className="w-4 h-4 text-[#D1A03F]" />
              <span>REAL PHOTOS FROM FRANKIE'S AT THE BEACH</span>
              <Palmtree className="w-4 h-4 text-[#D1A03F]" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white font-heading">
              BEACHFRONT GALLERY
            </h1>

            <div className="flex justify-center my-3">
              <svg viewBox="0 0 80 10" className="w-16 text-[#D1A03F] fill-none stroke-current stroke-[3] stroke-linecap-round">
                <path d="M0 5 Q10 0 20 5 T40 5 T60 5 T80 5" />
              </svg>
            </div>

            <p className="text-base sm:text-lg text-sky-100 max-w-xl mx-auto font-medium">
              Real moments, genuine coastal food, ice cream cones, and family fun on Ramsgate Beach.
            </p>
          </div>
        </div>
      </div>

      {/* Main Gallery Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filter Tabs */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#dde0d5] shadow-sm mb-8 flex items-center justify-center gap-2 overflow-x-auto scrollbar-none flex-wrap">
          {[
            { id: 'all', label: `All Photos (${galleryItems.length})` },
            { id: 'kiosk-team', label: 'Beach Kiosk & Team' },
            { id: 'burgers-dogs', label: 'Burgers & Hot Dogs' },
            { id: 'loaded-fries', label: 'Loaded Fries & Sides' },
            { id: 'treats', label: 'Ice Creams & Sweets' },
            { id: 'family', label: 'Ramsgate Beach Rides' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#0580FF] text-white shadow-sm'
                  : 'bg-[#f8f9f5] text-[#496068] hover:bg-[#edf0e6] border border-[#dde0d5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="bg-white rounded-2xl overflow-hidden border border-[#dde0d5] shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <ClientImage
                  src={item.src}
                  slotKey={`gallery:${item.id}`}
                  fallbackSrc={item.fallbackSrc}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-heading font-extrabold uppercase flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-[#D1A03F]" />
                    Click to Enlarge
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#000000] uppercase group-hover:text-[#0580FF] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#526b74] mt-1 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Instagram Banner */}
        <div className="mt-16 bg-[#004fb3] text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <Instagram className="w-7 h-7 text-[#D1A03F]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                TAG US IN YOUR BEACH PHOTOS
              </span>
              <h4 className="font-heading font-extrabold text-xl sm:text-2xl uppercase mt-0.5">
                #FRANKIESATTHEBEACH
              </h4>
              <p className="text-xs text-sky-100 mt-1">
                Share your burgers, loaded fries, sundaes, and beach fun with @FrankiesAtTheBeach!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={FRANKIES_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1877F2] hover:bg-[#166fe5] text-white font-heading font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
              id="gallery-facebook-btn"
            >
              <Facebook className="w-4 h-4" />
              <span>FOLLOW ON FACEBOOK</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] font-heading font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer"
            >
              FOLLOW ON INSTAGRAM
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={closeLightbox} />

          <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#07242c] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col border border-white/15 text-white">
            {/* Top Bar */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-[#04191f]">
              <div className="flex items-center gap-2">
                <Palmtree className="w-5 h-5 text-[#D1A03F]" />
                <span className="font-heading font-extrabold text-sm uppercase tracking-wider text-white truncate max-w-md">
                  {filteredItems[selectedImageIndex].title}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Photo View */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
              <ClientImage
                src={filteredItems[selectedImageIndex].src}
                slotKey={`gallery:${filteredItems[selectedImageIndex].id}`}
                fallbackSrc={filteredItems[selectedImageIndex].fallbackSrc}
                alt={filteredItems[selectedImageIndex].title}
                className="w-full h-full object-contain"
              />

              {/* Prev / Next Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption */}
            <div className="p-5 bg-[#04191f] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <p className="text-white/80 max-w-xl">
                {filteredItems[selectedImageIndex].desc}
              </p>
              <span className="text-white/50 text-[11px] uppercase font-bold shrink-0">
                Photo {selectedImageIndex + 1} of {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
