'use client';

import React, { useEffect, useRef } from 'react';

export const GT_SPRING = { type: 'spring', stiffness: 320, damping: 28, mass: 0.8 } as const;
export const GT_GENTLE_SPRING = { type: 'spring', stiffness: 190, damping: 24 } as const;
export const GT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function TopReadingProgressBar() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = barRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={barRef}
      style={{ transform: 'scaleX(0)' }}
      className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-[#0A6C33] via-[#16A34A] to-[#22C55E] origin-left z-[70] pointer-events-none"
    />
  );
}

interface FadeUpRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  yOffset?: number;
  children: React.ReactNode;
}

export function FadeUpReveal({
  children,
  className = '',
  ...props
}: FadeUpRevealProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

interface TactileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TactileCard({
  children,
  className = '',
  ...props
}: TactileCardProps) {
  return (
    <div
      className={`transition-transform duration-200 hover:-translate-y-1.5 hover:scale-[1.01] active:scale-[0.985] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface SquishButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SquishButton({
  children,
  className = '',
  ...props
}: SquishButtonProps) {
  return (
    <button
      className={`transition-transform duration-150 hover:scale-[1.03] active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function MarqueeRibbon({
  items,
  className = '',
}: {
  items: string[];
  className?: string;
}) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`w-full max-w-full overflow-hidden bg-[#102A56] text-[#FFF9EC] py-3 border-y border-[#0944BA]/40 select-none ${className}`}
      style={{ contain: 'inline-size' }}
    >
      <div className="animate-gt-marquee flex items-center gap-8 whitespace-nowrap">
        {repeated.map((text, idx) => (
          <div key={idx} className="inline-flex items-center gap-8">
            <span className="sc-display-sm text-[#FFF9EC]">
              {text}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#E5F36D]" />
          </div>
        ))}
      </div>
    </div>
  );
}
