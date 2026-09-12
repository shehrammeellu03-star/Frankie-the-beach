import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Palmtree,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  CheckCircle,
  HelpCircle,
  Compass,
  ExternalLink,
  Facebook,
  Send,
} from 'lucide-react';
import { FRANKIES_FACEBOOK_URL } from '../data/restaurantData';

export const ContactPage: React.FC = () => {
  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [lastMessageUrl, setLastMessageUrl] = useState('');

  const buildWhatsAppUrl = () => {
    const phoneNumber = '447554663569';
    const text =
      `🌴 *MESSAGE / INQUIRY - Frankie's @ The Beach* 🌴\n\n` +
      `👤 *Name:* ${name.trim() || 'Beach Visitor'}\n` +
      `📞 *Phone:* ${phone.trim()}\n` +
      (email.trim() ? `✉️ *Email:* ${email.trim()}\n` : '') +
      (message.trim() ? `💬 *Message:* ${message.trim()}\n` : '') +
      `\n_Sent directly from frankiesatthebeach.co.uk_`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const url = buildWhatsAppUrl();
    setLastMessageUrl(url);
    setIsSent(true);

    // Open WhatsApp directly for instant delivery to +44 7554 663569
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppDirect = () => {
    const phoneNumber = '447554663569';
    const msg = encodeURIComponent(
      "Hi Frankie's @ The Beach! 🌴 I have a question regarding visiting Ramsgate Main Sands."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank', 'noopener,noreferrer');
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
              <span className="text-[#D1A03F]">CONTACT & LOCATION</span>
            </nav>

            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-300 font-heading mb-2">
              <Palmtree className="w-4 h-4 text-[#D1A03F]" />
              <span>BEACHFRONT, OCEAN DRIVE • RAMSGATE CT11 8LS</span>
              <Palmtree className="w-4 h-4 text-[#D1A03F]" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white font-heading">
              CONTACT & LOCATION
            </h1>

            <div className="flex justify-center my-3">
              <svg viewBox="0 0 80 10" className="w-16 text-[#D1A03F] fill-none stroke-current stroke-[3] stroke-linecap-round">
                <path d="M0 5 Q10 0 20 5 T40 5 T60 5 T80 5" />
              </svg>
            </div>

            <p className="text-base sm:text-lg text-sky-100 max-w-xl mx-auto font-medium">
              Drop by our beachfront kiosk on Ramsgate Main Sands or reach out directly for inquiries, groups, and beach updates. Walk-ins are always welcomed by the waves!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quick Contact Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          
          <div className="bg-white p-5 rounded-2xl border border-[#dde0d5] shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#0580FF]/10 text-[#0580FF] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#718b95]">VISIT US</span>
              <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#000000] uppercase mt-0.5">
                Beachfront, Ocean Drive
              </h4>
              <p className="text-xs text-[#526b74]">Ramsgate CT11 8LS, United Kingdom</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#dde0d5] shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#0580FF]/10 text-[#0580FF] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#718b95]">OPEN HOURS</span>
              <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#000000] mt-0.5">
                Mon - Thu: 9 AM - 5 PM
              </h4>
              <p className="text-xs text-[#526b74] font-semibold">Fri - Sun: 10 AM - 6 PM</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#dde0d5] shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#0580FF]/10 text-[#0580FF] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#718b95]">DIRECT CALL</span>
              <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#000000] uppercase mt-0.5">
                <a href="tel:+447554663569" className="hover:text-[#0580FF]">
                  +44 7554 663569
                </a>
              </h4>
              <p className="text-xs text-[#526b74] break-all">
                <a href="mailto:frankiefernando@msn.com" className="hover:text-[#0580FF]">
                  frankiefernando@msn.com
                </a>
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#25D366]/30 shadow-xs flex items-start gap-3.5 bg-gradient-to-br from-white to-emerald-50/30">
            <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-emerald-800 font-heading">
                INSTANT WHATSAPP
              </span>
              <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#000000] uppercase mt-0.5">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="hover:text-[#25D366] cursor-pointer flex items-center gap-1"
                >
                  <span>Chat With Frankie</span>
                  <ExternalLink className="w-3 h-3 text-[#25D366]" />
                </button>
              </h4>
              <p className="text-xs text-emerald-700 font-semibold">+44 7554 663569</p>
            </div>
          </div>

        </div>

        {/* 2 Column: Left Contact / Inquiry Form / Right Seaside Map & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
          
          {/* Left: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#dde0d5] shadow-sm overflow-hidden">
            
            {/* Header */}
            <div className="bg-[#000000] text-white p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#25D366] font-heading mb-1">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span>DIRECT WHATSAPP INQUIRY</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl uppercase tracking-wide">
                SEND US A MESSAGE
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-1">
                Have a question about our menu, beach rides, weather, or directions? Send your note directly to Frankie.
              </p>
            </div>

            {/* Form or Confirmation */}
            {isSent ? (
              <div className="p-8 sm:p-10 text-center space-y-5 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#25D366] flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="font-heading font-extrabold text-2xl text-[#000000] uppercase">
                  MESSAGE SENT TO WHATSAPP!
                </h4>
                <p className="text-xs sm:text-sm text-[#526b74] max-w-md mx-auto">
                  Your inquiry has been formatted and opened directly with Frankie on WhatsApp (+44 7554 663569). We'll reply as soon as possible!
                </p>

                {/* Summary Card */}
                <div className="p-5 bg-[#f8f9f5] rounded-2xl text-left text-xs sm:text-sm text-[#3e565f] space-y-2 border border-[#dde0d5] max-w-md mx-auto">
                  <div className="flex justify-between border-b border-gray-200 pb-2 mb-2 text-xs font-bold text-emerald-800">
                    <span>STATUS: SENT VIA WHATSAPP</span>
                    <span>FRANKIE'S @ THE BEACH</span>
                  </div>
                  <p><strong className="text-[#000000]">Name:</strong> {name || 'Beach Visitor'}</p>
                  <p><strong className="text-[#000000]">Contact Phone:</strong> {phone}</p>
                  {email && <p><strong className="text-[#000000]">Email:</strong> {email}</p>}
                  {message && (
                    <p><strong className="text-[#000000]">Message:</strong> {message}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={lastMessageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>RE-OPEN WHATSAPP CHAT</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setIsSent(false)}
                    className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-heading font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl cursor-pointer transition-all"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="p-6 sm:p-8 space-y-5 text-xs sm:text-sm">
                
                {/* Contact details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#496068] mb-1 font-heading">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Henderson"
                      className="w-full px-3.5 py-2.5 text-xs font-medium border border-[#dde0d5] rounded-xl bg-[#f8f9f5] focus:outline-none focus:border-[#0580FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#496068] mb-1 font-heading">
                      PHONE NUMBER (FOR WHATSAPP) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 07554 663569 or +44 ..."
                      className="w-full px-3.5 py-2.5 text-xs font-medium border border-[#dde0d5] rounded-xl bg-[#f8f9f5] focus:outline-none focus:border-[#0580FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#496068] mb-1 font-heading">
                    EMAIL ADDRESS (OPTIONAL)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 text-xs font-medium border border-[#dde0d5] rounded-xl bg-[#f8f9f5] focus:outline-none focus:border-[#0580FF]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#496068] mb-1 font-heading">
                    YOUR MESSAGE OR QUESTION *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask us anything about our food, beach rides, accessibility, or seaside visit..."
                    className="w-full px-3.5 py-2.5 text-xs font-medium border border-[#dde0d5] rounded-xl bg-[#f8f9f5] focus:outline-none focus:border-[#0580FF]"
                  />
                </div>

                {/* WhatsApp Info Notice */}
                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200/80 flex items-start gap-2.5 text-xs text-emerald-900">
                  <div className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <MessageSquare className="w-3 h-3 fill-current" />
                  </div>
                  <div>
                    <span className="font-bold block">Direct WhatsApp Chat to +44 7554 663569</span>
                    <span className="text-emerald-700 text-[11px]">
                      Clicking below automatically prepares and sends your message directly to Frankie on WhatsApp for instant assistance.
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.99] text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider py-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND MESSAGE VIA WHATSAPP</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                </button>
              </form>
            )}

          </div>

          {/* Right: Map & Getting Here (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Interactive Google Map */}
            <div className="bg-white rounded-3xl border border-[#dde0d5] shadow-sm overflow-hidden p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0580FF] font-heading">
                  <Compass className="w-4 h-4 text-[#D1A03F]" />
                  <span>FINDING US ON THE SEAFRONT</span>
                </div>
                <span className="text-[10px] font-bold text-[#0580FF] uppercase bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
                  Interactive Map
                </span>
              </div>

              {/* Google Maps Embed */}
              <div className="relative w-full h-72 sm:h-84 rounded-2xl overflow-hidden border border-[#cbe4ec] shadow-inner bg-[#e6f4f8]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2492.8496508028647!2d1.4220757124654058!3d51.33228517165625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47deab0321141391%3A0xa7c0a3ad60b4d3ce!2sFrankie%E2%80%99s%20%40%20the%20beach!5e0!3m2!1sen!2s!4v1788394881912!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Frankie's @ the beach Google Maps"
                  className="w-full h-full block"
                />
              </div>

              {/* Address Bar under Map */}
              <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 bg-[#f8f9f5] rounded-xl border border-[#dde0d5] text-xs text-[#476069]">
                <div className="flex items-center gap-1.5 font-medium text-[#000000]">
                  <MapPin className="w-3.5 h-3.5 text-[#0580FF] shrink-0" />
                  <span>Beachfront, Ocean Drive, Ramsgate CT11 8LS</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Frankie%E2%80%99s+%40+the+beach+Ramsgate"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0580FF] font-bold hover:underline shrink-0"
                >
                  Open in Google Maps →
                </a>
              </div>

              {/* Highlights */}
              <div className="mt-5 space-y-3 text-xs text-[#496068]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Walking from Royal Harbour:</strong> 4-minute scenic stroll along Ocean Drive.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Parking:</strong> Dedicated parking bays and Ramsgate Harbour parking right along Ocean Drive.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Public Transit:</strong> Ramsgate Station is a short bus ride or pleasant walk down to the seafront.</span>
                </div>
              </div>

              {/* Facebook Community Card */}
              <div className="mt-5 pt-4 border-t border-[#edf0e6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#f0f6ff] p-3.5 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#1877F2] text-white flex items-center justify-center shrink-0">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-heading font-extrabold text-xs text-[#000000] uppercase">Official Facebook Page</h5>
                    <p className="text-[11px] text-[#526b74]">Follow daily beach weather, specials & news</p>
                  </div>
                </div>
                <a
                  href={FRANKIES_FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-heading font-extrabold uppercase px-3.5 py-2 rounded-xl transition-all shadow-xs shrink-0"
                  id="contact-facebook-btn"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Visit Facebook</span>
                </a>
              </div>

            </div>

            {/* Quick FAQ */}
            <div className="bg-white rounded-3xl border border-[#dde0d5] shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0580FF] font-heading">
                <HelpCircle className="w-4 h-4 text-[#D1A03F]" />
                <span>FREQUENT QUESTIONS</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <h5 className="font-heading font-extrabold text-[#000000] uppercase">
                    Do I need to book in advance?
                  </h5>
                  <p className="text-[#526b74] mt-0.5">
                    No booking required! Frankie's operates on a relaxed walk-in basis right on Ramsgate Main Sands. Just stroll up to the counter, order your favorites, and pick any sea-view picnic table!
                  </p>
                </div>

                <div className="pt-2 border-t border-[#edf0e6]">
                  <h5 className="font-heading font-extrabold text-[#000000] uppercase">
                    Are dogs allowed?
                  </h5>
                  <p className="text-[#526b74] mt-0.5">
                    Yes! Our beachfront deck is 100% dog-friendly. We even provide water bowls and dog treats.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#edf0e6]">
                  <h5 className="font-heading font-extrabold text-[#000000] uppercase">
                    Are tables walk-in only?
                  </h5>
                  <p className="text-[#526b74] mt-0.5">
                    Yes, all seating is first-come, first-served with panoramic sea views across Ramsgate beach and the harbour.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#edf0e6]">
                  <h5 className="font-heading font-extrabold text-[#000000] uppercase">
                    Can I take food to the beach?
                  </h5>
                  <p className="text-[#526b74] mt-0.5">
                    Absolutely. All takeaway orders are packed in 100% biodegradable seaside boxes with napkins.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
