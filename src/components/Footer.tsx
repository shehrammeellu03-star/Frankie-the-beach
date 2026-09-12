import React from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Phone,
  Palmtree,
  Facebook,
} from 'lucide-react';
import { TRIPADVISOR_LINKS, FRANKIES_FACEBOOK_URL } from '../data/restaurantData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000000] text-white pt-14 pb-8 border-t border-white/10" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col items-start group">
              <div className="flex items-center gap-1.5">
                <span className="font-script text-3xl sm:text-4xl text-white tracking-wide font-bold group-hover:text-[#ECD87A] transition-colors">
                  Frankie's
                </span>
                <Palmtree className="w-6 h-6 text-[#ECD87A] stroke-[2.2] -rotate-12 -ml-1 transition-transform group-hover:rotate-0" />
              </div>
              <span className="text-[10px] font-extrabold tracking-[0.28em] text-[#ECD87A] uppercase -mt-1 font-heading">
                @ THE BEACH
              </span>
            </Link>

            <p className="text-xs text-white/70 leading-relaxed max-w-xs">
              Ramsgate's seafront hotspot for authentic smash burgers, loaded fries, hot dogs, and sunset seaside vibes.
            </p>

            {/* Social Link - Facebook Only */}
            <div className="pt-1">
              <a
                href={FRANKIES_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/30 hover:border-[#D1A03F] hover:bg-[#D1A03F] hover:text-[#000e1f] text-white/90 text-xs font-semibold transition-all shadow-xs"
                title="Follow Frankie's on Facebook"
                id="footer-facebook-btn"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Column 2: Pages & Navigation */}
          <div>
            <h4 className="text-xs font-extrabold tracking-[0.2em] uppercase text-white/90 mb-4 font-heading">
              PAGES & EXPLORE
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/75 font-medium">
              <li>
                <Link to="/" className="hover:text-[#D1A03F] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#D1A03F] transition-colors">
                  Full Menu (Burgers, Dogs & Fries)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D1A03F] transition-colors">
                  About Us & Our Shack
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#D1A03F] transition-colors">
                  Beach Gallery & Photos
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-[#D1A03F] transition-colors">
                  Diner Reviews & Ratings
                </Link>
              </li>
              <li>
                <Link to="/charity" className="hover:text-[#D1A03F] transition-colors flex items-center justify-between gap-1.5" id="footer-link-charity">
                  <span>Charity</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">Community</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D1A03F] transition-colors">
                  Contact &amp; Location
                </Link>
              </li>
              <li className="pt-2 border-t border-white/10">
                <Link
                  to="/tripadvisor/restaurant"
                  className="hover:text-[#D1A03F] text-emerald-400 font-semibold transition-colors flex items-center justify-between gap-1.5"
                  id="footer-tripadvisor-restaurant"
                >
                  <span>TripAdvisor: {TRIPADVISOR_LINKS.restaurant.shortTitle}</span>
                  <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded font-bold">Dedicated</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tripadvisor/attractions"
                  className="hover:text-[#D1A03F] text-amber-300 font-semibold transition-colors flex items-center justify-between gap-1.5"
                  id="footer-tripadvisor-attractions"
                >
                  <span>TripAdvisor: {TRIPADVISOR_LINKS.attractions.shortTitle}</span>
                  <span className="text-[10px] bg-amber-900/60 text-amber-200 px-1.5 py-0.5 rounded font-bold">Dedicated</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tripadvisor"
                  className="hover:text-[#D1A03F] text-cyan-300 font-medium transition-colors text-xs flex items-center gap-1 mt-0.5"
                  id="footer-tripadvisor-hub"
                >
                  <span>All TripAdvisor Accolades &amp; Badges →</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-white/10">
                <Link
                  to="/admin"
                  className="hover:text-amber-400 text-amber-300/90 font-semibold transition-colors flex items-center justify-between gap-1.5"
                  id="footer-admin-link"
                >
                  <span>Admin &amp; Image Studio</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">Upload</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Opening Hours & Script */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-[#D1A03F]" />
              <h4 className="text-xs font-extrabold tracking-[0.2em] uppercase text-white/90 font-heading">
                OPEN HOURS
              </h4>
            </div>

            <div className="space-y-1.5 text-xs sm:text-[13px] text-white/75">
              <p className="font-semibold text-white/95">Mon - Thu: 9 AM - 5 PM</p>
              <p className="font-semibold text-white/95">Fri - Sun: 10 AM - 6 PM</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                ● Open Today by the Sea
              </span>
            </div>

            {/* Signature "See you at the beach!" cursive in gold */}
            <div className="mt-6 pt-1">
              <p className="font-hand text-2xl sm:text-3xl text-[#D1A03F] font-bold tracking-wide">
                See you at the beach!
              </p>
              <svg viewBox="0 0 120 12" className="w-24 text-[#D1A03F] fill-none stroke-current stroke-[2.5] stroke-linecap-round mt-0.5">
                <path d="M0 6 Q15 0 30 6 T60 6 T90 6 T120 6" />
              </svg>
            </div>
          </div>

          {/* Column 4: Find Us & Call Us */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <MapPin className="w-4 h-4 text-[#D1A03F] shrink-0" />
                <h4 className="text-xs font-extrabold tracking-[0.2em] uppercase text-white/90 font-heading">
                  VISIT US
                </h4>
              </div>
              <p className="text-xs sm:text-[13px] text-white/85 leading-relaxed pl-6">
                Beachfront, Ocean Drive<br />
                Ramsgate CT11 8LS<br />
                United Kingdom
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <Phone className="w-4 h-4 text-[#D1A03F] shrink-0" />
                <h4 className="text-xs font-extrabold tracking-[0.2em] uppercase text-white/90 font-heading">
                  CONTACT
                </h4>
              </div>
              <div className="text-xs sm:text-[13px] text-white/85 space-y-1 pl-6">
                <a
                  href="tel:+447554663569"
                  className="block font-medium hover:text-[#D1A03F] transition-colors"
                >
                  +44 7554 663569
                </a>
                <a
                  href="mailto:frankiefernando@msn.com"
                  className="block text-white/70 hover:text-[#D1A03F] transition-colors text-[12px] break-all"
                >
                  frankiefernando@msn.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Palm Tree / Wave Line Art */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            <p>© 2026 Frankie's @ the beach. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-2 text-white/40">
            <svg
              viewBox="0 0 120 30"
              className="w-28 h-7 text-white/30 fill-none stroke-current stroke-[1.8] stroke-linecap-round"
            >
              <path d="M2 24 Q16 16 30 24 T60 24 T90 24 T118 24" />
              <path d="M102 24 C100 16 102 8 106 2" />
              <path d="M106 2 C100 0 94 4 92 6" />
              <path d="M106 2 C112 0 118 4 120 6" />
              <path d="M106 2 C104 -2 108 -6 110 -7" />
            </svg>
          </div>
        </div>

      </div>
    </footer>
  );
};
