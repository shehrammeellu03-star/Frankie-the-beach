import React, { useEffect } from 'react';
import { X, Printer, Download, Palmtree, MessageSquare } from 'lucide-react';
import { OFFICIAL_MENU } from '../data/restaurantData';

interface MenuPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_CATEGORIES = [
  { id: 'burgers', title: 'BURGERS' },
  { id: 'hot-dogs', title: 'HOT DOGS' },
  { id: 'loaded-fries', title: 'LOADED FRIES' },
  { id: 'ice-cream', title: 'ICE CREAM & TREATS' },
];

export const MenuPdfModal: React.FC<MenuPdfModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    let content = `FRANKIE'S @ THE BEACH - OFFICIAL MENU\n`;
    content += `Freshly prepared, locally sourced, and served right by the sea.\n`;
    content += `Beachfront, Ocean Drive, Ramsgate CT11 8LS, United Kingdom\n`;
    content += `Tel: +44 7554 663569 | Email: frankiefernando@msn.com\n`;
    content += `Hours: Mon - Thu: 9 AM - 5 PM | Fri - Sun: 10 AM - 6 PM\n\n`;
    content += `=========================================================\n\n`;

    MENU_CATEGORIES.forEach((cat) => {
      content += `[ ${cat.title} ]\n`;
      const items = OFFICIAL_MENU.filter((i) => i.category === cat.id);
      items.forEach((item) => {
        content += `- ${item.name}\n  ${item.description}\n\n`;
      });
      content += `---------------------------------------------------------\n\n`;
    });

    content += `See you at the beach! 🌴🍔`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "Frankies_At_The_Beach_Menu.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const categories = MENU_CATEGORIES;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xs cursor-pointer" onClick={onClose} aria-label="Close" />

      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#fdfbf7] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col border border-[#d6dbce]">
        
        {/* Top Control Bar */}
        <div className="bg-[#004fb3] text-white p-3.5 sm:p-5 flex items-center justify-between no-print border-b border-white/10">
          <div className="flex items-center gap-2">
            <Palmtree className="w-5 h-5 text-[#D1A03F]" />
            <span className="font-heading font-extrabold text-xs sm:text-base uppercase tracking-wider">
              FRANKIE'S PRINTABLE MENU (PDF)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-heading font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print or Save as PDF via Browser"
            >
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="bg-white/10 hover:bg-white/20 text-white px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-heading font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download text menu file"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={onClose}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-heading font-extrabold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              aria-label="Close PDF viewer"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Printable Menu Canvas Document */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-[#000000] print:p-0 print:m-0" id="printable-menu">
          {/* Header */}
          <div className="text-center pb-6 border-b-2 border-dashed border-[#0580FF]/30">
            <div className="flex items-center justify-center gap-2 text-[#D1A03F] mb-1">
              <Palmtree className="w-6 h-6" />
              <span className="font-heading font-black text-2xl tracking-wider text-[#0580FF]">
                Frankie's @ THE BEACH
              </span>
              <Palmtree className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0580FF]">
              OUR OFFICIAL SEASIDE MENU
            </p>
            <p className="text-xs text-gray-500 italic mt-1">
              Freshly prepared, locally sourced, and served right by the sea.
            </p>
            <p className="text-[11px] text-gray-400 mt-1">
              Beachfront, Ocean Drive, Ramsgate CT11 8LS | Mon - Thu: 9 AM - 5 PM, Fri - Sun: 10 AM - 6 PM | Tel: +44 7554 663569
            </p>
          </div>

          {/* Categorized Menu Content */}
          <div className="mt-6 space-y-8">
            {categories.map((cat) => {
              const items = OFFICIAL_MENU.filter((i) => i.category === cat.id);
              return (
                <div key={cat.id} className="break-inside-avoid">
                  {/* Category Title with beach accent */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[#0580FF] text-white text-xs font-heading font-extrabold uppercase px-3 py-1 rounded-md tracking-wider">
                      {cat.title}
                    </span>
                    <div className="flex-1 border-t border-[#0580FF]/20" />
                  </div>

                  {/* Items in Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl border border-gray-100 bg-[#fafbfa] flex gap-3 items-start"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-lg object-cover shrink-0 border border-gray-200"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="mb-0.5">
                            <h4 className="font-heading font-extrabold text-xs text-[#000000] uppercase">
                              {item.name}
                            </h4>
                          </div>
                          <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
            <p className="font-hand text-xl text-[#0580FF] font-bold">
              See you at the beach! 🌴🍔
            </p>
            <p className="text-[10px] mt-1 text-gray-400">
              Please inform staff of any allergens or dietary requirements before ordering.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
