'use client';

import React, { useState } from 'react';

const GUDTREE_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=520&auto=format&fit=crop&q=75',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=520&auto=format&fit=crop&q=75',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=520&auto=format&fit=crop&q=75',
];

function optimizeImageUrl(rawUrl: string, targetWidth: number): string {
  if (!rawUrl) return rawUrl;
  if (rawUrl.includes('images.unsplash.com')) {
    try {
      const u = new URL(rawUrl);
      const currentW = Number(u.searchParams.get('w') || '0');
      if (!currentW || currentW > targetWidth) {
        u.searchParams.set('w', String(targetWidth));
      }
      if (!u.searchParams.has('auto')) {
        u.searchParams.set('auto', 'format');
      }
      u.searchParams.set('q', targetWidth >= 1000 ? '80' : '75');
      return u.toString();
    } catch {
      return rawUrl;
    }
  }
  return rawUrl;
}

export default function GudTreeImg({
  src,
  alt,
  className = '',
  eager = false,
  fallbackIndex = 0,
  width,
}: {
  src?: string;
  alt: string;
  className?: string;
  eager?: boolean;
  fallbackIndex?: number;
  width?: number;
}) {
  const targetWidth = width ?? (eager ? 1000 : 520);
  const defaultFallback =
    GUDTREE_FALLBACK_IMAGES[fallbackIndex % GUDTREE_FALLBACK_IMAGES.length];
  const initialSrc = src ? optimizeImageUrl(src, targetWidth) : defaultFallback;
  const [imgSrc, setImgSrc] = useState(initialSrc);

  return (
    <img
      src={imgSrc || defaultFallback}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      onError={() => {
        if (imgSrc !== defaultFallback) {
          setImgSrc(defaultFallback);
        }
      }}
      className={`block w-full h-full object-cover ${className}`}
    />
  );
}
