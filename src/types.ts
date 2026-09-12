export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  fallbackImage?: string;
  category: 'burgers' | 'hot-dogs' | 'loaded-fries' | 'ice-cream';
  isFavorite?: boolean;
  spicyLevel?: number;
  popular?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date?: string;
  tag?: string;
}

export interface ContactInquiry {
  name: string;
  phone: string;
  email?: string;
  inquiryType?: string;
  message: string;
}

export interface TripAdvisorReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  date: string;
  visitType: string;
  comment: string;
  helpfulVotes: number;
  verified: boolean;
}

export interface TripAdvisorProfileData {
  id: string;
  title: string;
  shortTitle: string;
  tripadvisorId: string;
  location: string;
  rating: number;
  reviewCount: number;
  reviewCountLabel: string;
  rank: string;
  subRatings: { [key: string]: number };
  priceRange: string;
  categories: string[];
  features: string[];
  popularItems: string[];
  url: string;
  reviews: TripAdvisorReviewItem[];
}

export interface UploadedImage {
  id: string;
  title: string;
  dataUrl: string;
  fileSize?: string;
  dimensions?: string;
  createdAt: number;
  category?: string;
  assignedSlot?: string;
  tags?: string[];
}

export interface GalleryItem {
  id: string;
  src: string;
  fallbackSrc?: string;
  title: string;
  category: 'all' | 'kiosk-team' | 'burgers-dogs' | 'loaded-fries' | 'treats' | 'family';
  desc: string;
}

export interface ImageSlotInfo {
  key: string;
  label: string;
  group: 'menu' | 'site' | 'attractions';
  defaultSrc: string;
  currentSrc: string;
  description: string;
}
