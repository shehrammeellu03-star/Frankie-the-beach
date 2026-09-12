import React from 'react';
import { Clock, Waves, Utensils, Phone } from 'lucide-react';

export const QuickInfoBar: React.FC = () => {
  return (
    <section className="bg-[#EEEFE9] py-6 sm:py-8 border-b border-[#e1e4d8]" id="info-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#dde0d5]">
          
          {/* 1. OPEN HOURS */}
          <div className="flex items-center gap-3.5 sm:gap-4 md:px-6 pt-2 md:pt-0">
            <div className="w-11 h-11 rounded-full border-2 border-[#0580FF] flex items-center justify-center shrink-0 text-[#0580FF]">
              <Clock className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-[#000000] font-heading">
                OPEN HOURS
              </p>
              <p className="text-[11px] sm:text-xs font-semibold text-[#506870] mt-0.5">
                Mon-Thu: 9AM-5PM<br />
                Fri-Sun: 10AM-6PM
              </p>
            </div>
          </div>

          {/* 2. BEACHFRONT */}
          <div className="flex items-center gap-3.5 sm:gap-4 md:px-6 pt-4 md:pt-0">
            <div className="w-11 h-11 flex items-center justify-center shrink-0 text-[#0580FF]">
              <Waves className="w-8 h-8 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-[#000000] font-heading">
                VISIT US
              </p>
              <p className="text-xs sm:text-sm font-medium text-[#506870] mt-0.5">
                Ocean Drive, Ramsgate CT11 8LS
              </p>
            </div>
          </div>

          {/* 3. DINE-IN */}
          <div className="flex items-center gap-3.5 sm:gap-4 md:px-6 pt-4 md:pt-0">
            <div className="w-11 h-11 flex items-center justify-center shrink-0 text-[#0580FF]">
              <Utensils className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-[#000000] font-heading">
                DINE-IN
              </p>
              <p className="text-xs sm:text-sm font-medium text-[#506870] mt-0.5">
                Takeaway & Terrace
              </p>
            </div>
          </div>

          {/* 4. CALL US */}
          <div className="flex items-center gap-3.5 sm:gap-4 md:px-6 pt-4 md:pt-0">
            <a
              href="tel:+447554663569"
              className="flex items-center gap-3.5 sm:gap-4 group"
              title="Call Frankie's"
            >
              <div className="w-11 h-11 rounded-full border-2 border-[#0580FF] flex items-center justify-center shrink-0 text-[#0580FF] group-hover:bg-[#0580FF] group-hover:text-white transition-colors">
                <Phone className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-[#000000] font-heading group-hover:text-[#0580FF] transition-colors">
                  CONTACT
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#506870] mt-0.5 whitespace-nowrap">
                  +44 7554 663569
                </p>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
