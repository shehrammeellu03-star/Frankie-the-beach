import React, { useState, useEffect, memo } from 'react';
import { useImages } from '../context/ImageContext';
import { resolveImageOverride } from '../utils/slotMapping';
import { Utensils, Palmtree, Coffee, Sparkles } from 'lucide-react';

interface ClientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  slotKey?: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const ClientImage: React.FC<ClientImageProps> = memo(({
  src,
  slotKey,
  fallbackSrc,
  alt,
  className = '',
  loading,
  decoding = 'async',
  priority = false,
  ...props
}) => {
  let overrideSrc: string | undefined;
  try {
    const { slotOverrides } = useImages();
    if (slotKey) {
      overrideSrc = resolveImageOverride(slotKey, slotOverrides);
    }
  } catch {
    // If used outside ImageProvider, continue gracefully
  }

  const resolvedSrc = overrideSrc || src;
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(resolvedSrc);
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(resolvedSrc);
    setHasFailed(false);
  }, [resolvedSrc]);

  const handleError = () => {
    if (!hasFailed) {
      if (fallbackSrc && fallbackSrc !== currentSrc && fallbackSrc.trim() !== '') {
        setCurrentSrc(fallbackSrc);
      } else {
        setHasFailed(true);
      }
    }
  };

  // If no image source is provided or image loading failed, render clean placeholder
  if (!currentSrc || currentSrc.trim() === '' || hasFailed) {
    const lower = `${alt} ${slotKey || ''}`.toLowerCase();
    const isDrink = lower.includes('drink') || lower.includes('coffee') || lower.includes('slushy') || lower.includes('latte');
    const isBeach = lower.includes('kiosk') || lower.includes('beach') || lower.includes('terrace') || lower.includes('carousel') || lower.includes('ride');

    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0580FF]/15 via-[#005a6c]/10 to-[#003680]/20 text-[#0580FF] p-3 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-10 h-10 rounded-2xl bg-white/80 shadow-xs flex items-center justify-center mb-1.5 shrink-0 border border-[#0580FF]/20">
          {isDrink ? (
            <Coffee className="w-5 h-5 text-[#0580FF]" />
          ) : isBeach ? (
            <Palmtree className="w-5 h-5 text-[#0580FF]" />
          ) : (
            <Utensils className="w-5 h-5 text-[#0580FF]" />
          )}
        </div>
        <span className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-[#000000] line-clamp-1">
          {alt || "Frankie's Beach"}
        </span>
        <span className="text-[9.5px] text-[#526b74] font-medium mt-0.5 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-[#D1A03F]" />
          <span>Awaiting Real Photo</span>
        </span>
      </div>
    );
  }

  const effectiveLoading = priority ? 'eager' : (loading || 'lazy');
  const effectiveDecoding = priority ? 'sync' : decoding;

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading={effectiveLoading}
      decoding={effectiveDecoding}
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      {...props}
    />
  );
});

ClientImage.displayName = 'ClientImage';

// Lightweight preloader utility
const preloadedUrls = new Set<string>();
export const preloadImage = (url: string) => {
  if (!url || preloadedUrls.has(url)) return;
  preloadedUrls.add(url);
  const img = new Image();
  img.src = url;
};

export const preloadImages = (urls: string[]) => {
  urls.forEach(preloadImage);
};



