'use client';

import React, { useState } from 'react';

const GUDTREE_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&q=80',
];

export default function GudTreeImg({
  src,
  alt,
  className = '',
  eager = false,
  fallbackIndex = 0,
}: {
  src?: string;
  alt: string;
  className?: string;
  eager?: boolean;
  fallbackIndex?: number;
}) {
  const defaultFallback =
    GUDTREE_FALLBACK_IMAGES[fallbackIndex % GUDTREE_FALLBACK_IMAGES.length];
  const [imgSrc, setImgSrc] = useState(src || defaultFallback);

  return (
    <img
      src={imgSrc || defaultFallback}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
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
