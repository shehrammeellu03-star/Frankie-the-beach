import React, { useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { CHEFS_FAVORITES } from '../data/restaurantData';
import { ClientImage } from './ClientImage';

interface ChefsFavoritesProps {
  onViewFullMenu: () => void;
}

export const ChefsFavorites: React.FC<ChefsFavoritesProps> = ({
  onViewFullMenu,
}) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'beach-classic': true,
    'bacon-wave': true,
    'spicy-beach': true,
    'loaded-fries': true,
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-[#EEEFE9] py-12 sm:py-16" id="favorites">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-[#000000] font-heading">
            CHEF'S FAVORITES
          </h2>

          <button
            onClick={onViewFullMenu}
            id="link-view-full-menu"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0580FF] hover:text-[#004fb3] transition-colors cursor-pointer"
          >
            <span>VIEW FULL MENU</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHEFS_FAVORITES.map((item) => {
            const isFav = favorites[item.id] ?? false;

            return (
              <div
                key={item.id}
                id={`card-${item.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_18px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.1)] border border-[#e2e5dc] transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Container with Favorite Star Toggle */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e5e9df]">
                  <ClientImage
                    src={item.image}
                    slotKey={`menu:${item.id}`}
                    fallbackSrc={item.fallbackImage}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Star Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0580FF] hover:bg-[#004fb3] active:scale-90 text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
                    aria-label={`Favorite ${item.name}`}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        isFav ? 'fill-white text-white' : 'text-white/80'
                      } transition-colors`}
                    />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div>
                      <h3 className="font-heading font-extrabold text-sm sm:text-base tracking-wide text-[#000000] uppercase">
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#556c74] font-normal leading-relaxed mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Bottom Tag & Menu Link */}
                  <div className="mt-4 pt-2.5 border-t border-[#edf0e6] flex justify-between items-center text-xs">
                    <span className="text-[11px] font-bold text-[#718c96] uppercase tracking-wider">
                      Seaside Special
                    </span>
                    <button
                      onClick={onViewFullMenu}
                      className="text-[#0580FF] hover:text-[#004fb3] font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                    >
                      <span>Menu</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
