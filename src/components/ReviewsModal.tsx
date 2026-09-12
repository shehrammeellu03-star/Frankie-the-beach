import React, { useState } from 'react';
import { X, Star, MessageSquarePlus, CheckCircle } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/restaurantData';
import { CustomerReview } from '../types';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({ isOpen, onClose }) => {
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      name: newName || 'Beach Diner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
      rating: newRating,
      comment: newComment,
      date: 'Just now',
      tag: 'Verified Diner',
    };
    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowAddForm(false);
      setNewName('');
      setNewComment('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/65 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-3xl h-[85vh] bg-[#EEEFE9] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col border border-[#dde0d5]">
        
        {/* Header */}
        <div className="bg-[#002866] text-white p-5 sm:p-6 flex items-center justify-between">
          <div>
            <span className="text-amber-300 text-xs font-extrabold uppercase tracking-widest font-heading">
              GUEST FEEDBACK
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold uppercase tracking-wide">
              WHAT OUR DINERS SAY
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close reviews"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Rating Overview */}
        <div className="bg-white p-5 border-b border-[#dde0d5] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-heading font-extrabold text-[#000000]">
              4.9
            </div>
            <div>
              <div className="flex items-center text-[#D1A03F]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#526971] mt-0.5">Based on 340+ customer reviews</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] font-heading font-extrabold text-xs uppercase tracking-wider px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>LEAVE A REVIEW</span>
          </button>
        </div>

        {/* Add Review Form Drawer / Panel */}
        {showAddForm && (
          <div className="p-5 bg-[#fafbf7] border-b border-[#dde0d5] animate-in slide-in-from-top duration-200">
            {submitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold">Thank you! Your beach review was posted successfully.</span>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-3">
                <h4 className="font-heading font-extrabold text-xs uppercase text-[#000000]">
                  Share Your Experience
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-white border border-[#dde0d5] rounded-lg focus:outline-none"
                    required
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#4c626a] font-bold">Rating:</span>
                    <div className="flex gap-1 text-[#D1A03F]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="focus:outline-none cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              star <= newRating ? 'fill-[#D1A03F]' : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <textarea
                  placeholder="How were the burgers, beach atmosphere, and service?"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#dde0d5] rounded-lg focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#0580FF] hover:bg-[#004fb3] text-white font-heading font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-lg cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        )}

        {/* Reviews List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {reviewsList.map((review) => (
            <div
              key={review.id}
              className="bg-white p-5 rounded-2xl border border-[#dde0d5] shadow-2xs space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#dde0d5]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="font-heading font-extrabold text-xs sm:text-sm text-[#000000]">
                      {review.name}
                    </h5>
                    <span className="text-[10px] text-[#718b95]">{review.date || 'Verified Visit'}</span>
                  </div>
                </div>

                <div className="flex text-[#D1A03F]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-[#3e565f] leading-relaxed">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
