import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  MessageSquare,
  Download,
  Star,
  Sparkles,
  Flame,
  Palmtree,
  Search,
  Info,
} from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_CATEGORIES } from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import { useImages } from '../context/ImageContext';
import { ClientImage } from '../components/ClientImage';

export const MenuPage: React.FC = () => {
  const { menuItems } = useImages();
  const { setIsPdfMenuOpen } = useCart();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'the-classic-smash': true,
    'bbq-bacon-stack': true,
    'jumbo-boardwalk-dog': true,
    'pepperoni-melted-cheddar-fries': true,
    'massive-chocolate-sundae-cone': true,
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = '447554663569';
    const message = encodeURIComponent(
      "Hello Frankie's @ The Beach! 🌴🍔 I have a question about your menu and allergens."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      const matchesPopular = onlyPopular ? item.popular : true;
      return matchesCategory && matchesSearch && matchesPopular;
    });
  }, [menuItems, activeCategory, searchQuery, onlyPopular]);

  return (
    <div className="flex-1 bg-[#EEEFE9] pb-20">
      
      {/* Page Header Banner */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-1 sm:mt-2 mb-8 sm:mb-10">
        <div className="bg-[#0580FF] text-white py-12 sm:py-16 px-4 sm:px-8 rounded-3xl relative overflow-hidden shadow-sm">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Breadcrumb */}
            <nav className="flex justify-center items-center gap-2 text-xs uppercase tracking-widest text-sky-200 mb-3 font-semibold">
              <Link to="/" className="hover:text-white transition-colors">
                HOME
              </Link>
              <span>/</span>
              <span className="text-[#D1A03F]">OUR MENU</span>
            </nav>

            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-300 font-heading mb-2">
              <Palmtree className="w-4 h-4 text-[#D1A03F]" />
              <span>BEACHFRONT KITCHEN & SHACK</span>
              <Palmtree className="w-4 h-4 text-[#D1A03F]" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white font-heading">
              OUR MENU
            </h1>

            <div className="flex justify-center my-3">
              <svg viewBox="0 0 80 10" className="w-16 text-[#D1A03F] fill-none stroke-current stroke-[3] stroke-linecap-round">
                <path d="M0 5 Q10 0 20 5 T40 5 T60 5 T80 5" />
              </svg>
            </div>

            <p className="text-base sm:text-lg text-sky-100 max-w-xl mx-auto font-medium">
              Freshly prepared, locally sourced, and served right by the sea.
            </p>

            {/* Action Buttons: WhatsApp & Download PDF */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
              <button
                onClick={handleWhatsAppContact}
                id="btn-whatsapp-chat"
                className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 sm:px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>CHAT ON WHATSAPP</span>
              </button>

              <button
                onClick={() => setIsPdfMenuOpen(true)}
                id="btn-download-menu-pdf"
                className="inline-flex items-center gap-2 bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 sm:px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD MENU (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search & Category Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#dde0d5] shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search burgers, hot dogs, fries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#f8f9f5] border border-[#dde0d5] rounded-xl focus:outline-none focus:border-[#0580FF]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter toggle for popular */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => setOnlyPopular(!onlyPopular)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 ${
                  onlyPopular
                    ? 'bg-[#0580FF] text-white border-[#0580FF]'
                    : 'bg-[#f8f9f5] text-[#476069] border-[#dde0d5] hover:bg-gray-100'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${onlyPopular ? 'fill-amber-300 text-amber-300' : ''}`} />
                <span>Popular Picks Only</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-[#edf0e6]">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0580FF] text-white shadow-sm scale-102'
                      : 'bg-[#f8f9f5] text-[#476069] hover:bg-[#edf0e6] border border-[#dde0d5]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#526b74]">
          <span>
            Showing <strong className="text-[#000000]">{filteredItems.length}</strong> delicious beach items
          </span>
          {activeCategory !== 'all' && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setOnlyPopular(false);
              }}
              className="text-[#0580FF] font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#dde0d5] my-6">
            <Palmtree className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-heading font-extrabold text-lg text-[#000000] uppercase">
              No menu items match your search
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Try adjusting your search query or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setOnlyPopular(false);
              }}
              className="mt-4 bg-[#0580FF] text-white px-5 py-2 rounded-xl text-xs font-heading font-extrabold uppercase"
            >
              Show All Menu Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((item) => {
              const isFav = favorites[item.id] ?? false;

              return (
                <div
                  key={item.id}
                  id={`menu-item-${item.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-[#dde0d5] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.09)] transition-all flex flex-col justify-between group"
                >
                  {/* Photo & Badge */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e4e8dd]">
                    <ClientImage
                      src={item.image}
                      slotKey={`menu:${item.id}`}
                      fallbackSrc={item.fallbackImage}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Pill Tag */}
                    <div className="absolute top-3 left-3 bg-[#004fb3]/90 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                      {item.category.replace('-', ' ')}
                    </div>

                    {/* Favorite Star Button */}
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                      aria-label={`Favorite ${item.name}`}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isFav ? 'fill-amber-400 text-amber-400' : 'text-white'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="mb-1.5">
                        <h3 className="font-heading font-extrabold text-base text-[#000000] uppercase group-hover:text-[#0580FF] transition-colors">
                          {item.name}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-[#526b74] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-4 mt-4 border-t border-[#edf0e6] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#708993] uppercase">
                        {item.spicyLevel ? (
                          <span className="flex items-center gap-1 text-red-500 font-bold">
                            <Flame className="w-3.5 h-3.5 fill-current" />
                            Spicy
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[#0580FF]">
                            <Sparkles className="w-3.5 h-3.5" />
                            Fresh Daily
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0580FF] bg-[#e7f3f6] px-3 py-1 rounded-full">
                        {item.popular ? '★ Popular Pick' : 'Made Fresh'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dietary and Allergens Notice */}
        <div className="mt-14 p-6 bg-white rounded-2xl border border-[#dde0d5] flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-[#526b74]">
          <div className="w-10 h-10 rounded-xl bg-[#0580FF]/10 text-[#0580FF] flex items-center justify-center shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-heading font-extrabold text-xs text-[#000000] uppercase mb-1">
              Dietary Requirements & Allergen Information
            </h4>
            <p className="leading-relaxed">
              All our beef is seared on dedicated chrome flat-tops. Gluten-free burger buns and vegan cheese alternatives are available upon request. Please inform our team of any food allergies when visiting our counter or when contacting us in advance.
            </p>
          </div>
          <button
            onClick={handleWhatsAppContact}
            className="shrink-0 text-xs font-extrabold text-[#0580FF] hover:underline"
          >
            Ask Chef on WhatsApp →
          </button>
        </div>

      </div>
    </div>
  );
};
