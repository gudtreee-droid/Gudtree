'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { normalizeCatName } from '@/lib/newsflashFormat';

export default function GudTreeFooter() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/wp-admin')) {
    return null;
  }

  // Match footer backdrop & top scalloped wave color seamlessly to the active Hero
  let heroBackdropClass = 'gt-hero-sky';
  let outerFrameBg = 'bg-[#FFF9EC]';
  let waveFill = '#FFF9EC';
  let showSunburstRays = true;

  if (pathname?.startsWith('/focus/diabetes')) {
    heroBackdropClass = 'gt-focus-hero-diabetes';
    outerFrameBg = 'bg-[#FFFFFF]';
    waveFill = '#FFFFFF';
    showSunburstRays = false;
  } else if (pathname?.startsWith('/focus/heart')) {
    heroBackdropClass = 'gt-focus-hero-heart';
    outerFrameBg = 'bg-[#FFFFFF]';
    waveFill = '#FFFFFF';
    showSunburstRays = false;
  } else if (pathname?.startsWith('/focus/gut')) {
    heroBackdropClass = 'gt-focus-hero-gut';
    outerFrameBg = 'bg-[#FFFFFF]';
    waveFill = '#FFFFFF';
    showSunburstRays = false;
  } else if (pathname?.startsWith('/focus/pcos')) {
    heroBackdropClass = 'gt-focus-hero-pcos';
    outerFrameBg = 'bg-[#FFFFFF]';
    waveFill = '#FFFFFF';
    showSunburstRays = false;
  } else if (pathname?.startsWith('/focus/weight')) {
    heroBackdropClass = 'gt-focus-hero-weight';
    outerFrameBg = 'bg-[#FFFFFF]';
    waveFill = '#FFFFFF';
    showSunburstRays = false;
  }

  const visibleCats = CATEGORIES.filter(
    (c) => c.slug !== 'home' && c.isVisible !== false
  ).slice(0, 8);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  const mainLinks = [
    { label: 'Home', href: '/' },
    { label: 'All Guides', href: '/news' },
    { label: 'Topics', href: '/category' },
    { label: 'Write for Us', href: '/write-for-us' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ];

  const patternId = `gt-footer-wave-${(pathname || 'home').replace(/[^a-z0-9]/gi, '')}`;

  return (
    <footer className={`w-full max-w-full overflow-x-clip ${outerFrameBg} px-2 sm:px-3.5 pb-2 sm:pb-3.5 pt-0 mt-0`}>
      <div className={`${heroBackdropClass} rounded-[20px] sm:rounded-[28px] relative overflow-hidden pt-16 sm:pt-20 pb-10 px-4 sm:px-8 text-center`}>
        {/* Top Scalloped Wave Cutout Matching Current Page Surface */}
        <div
          aria-hidden="true"
          className="absolute top-[-1px] left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10"
        >
          <svg
            viewBox="0 0 1440 38"
            preserveAspectRatio="none"
            className="w-full h-[22px] sm:h-[30px] md:h-[36px] block"
          >
            <defs>
              <pattern
                id={patternId}
                x="0"
                y="0"
                width="90"
                height="38"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0,20 C22.5,0 22.5,0 45,20 C67.5,40 67.5,40 90,20 L90,0 L0,0 Z"
                  fill={waveFill}
                />
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="1440"
              height="38"
              fill={`url(#${patternId})`}
            />
          </svg>
        </div>

        {showSunburstRays && <div aria-hidden="true" className="gt-hero-rays opacity-75" />}

        <div className="relative z-10 max-w-[920px] mx-auto flex flex-col items-center">
          {/* Official Brand Sticker Pill */}
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-full bg-[#FFFFFF] border border-[#102A56]/15 shadow-[0_6px_18px_rgba(16,42,86,0.16)] no-underline mb-5 hover:-translate-y-0.5 transition-transform"
          >
            <img
              src="/images/gudtree-logo.png"
              alt="Gud Tree — Healthy Packed Snacks"
              className="h-[34px] sm:h-[38px] w-auto object-contain"
            />
          </Link>

          {/* Crisp Stroke-Free Sunday Crumb Headline */}
          <h2 className="gt-font-display text-[34px] sm:text-[46px] lg:text-[52px] leading-[1.0] tracking-[-0.03em] text-[#FFFFFF]">
            Eat Clean. Snack Smart.
          </h2>

          <p className="mt-3 text-[15px] sm:text-[16px] font-medium text-[#FFFFFF]/92 max-w-xl leading-[1.55]">
            Honest Indian snack audits, clean home diet swaps, and wholesome ingredient guides every week.
          </p>

          {/* Clean Newsletter Pill */}
          <div className="w-full max-w-md mt-6 mb-8">
            {subscribed ? (
              <div className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FFFFFF] border border-[#102A56]/15 text-[#102A56] text-[13.5px] font-bold shadow-md">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>Welcome! Weekly clean snack swaps coming soon.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex items-center p-1.5 rounded-full bg-[#FFFFFF] border border-[#102A56]/15 shadow-[0_10px_24px_rgba(16,42,86,0.18)]"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for diet swaps..."
                  className="flex-1 min-w-0 bg-transparent px-4 py-2.5 text-[16px] sm:text-[14px] text-[#102A56] placeholder:text-[#526071] focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 inline-flex items-center gap-1.5 px-5 min-h-[44px] sm:min-h-0 sm:h-10 rounded-full bg-[#102A56] hover:bg-[#DA440D] text-[#FFFFFF] text-[13.5px] font-semibold transition-colors cursor-pointer"
                >
                  <span>Join Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Dot-Separated Primary Links */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center justify-center gap-y-2 mb-5"
          >
            {mainLinks.map((item, idx) => (
              <React.Fragment key={item.href}>
                {idx > 0 && (
                  <span
                    aria-hidden="true"
                    className="mx-2.5 text-[#FFFFFF]/60 text-[11px] select-none"
                  >
                    •
                  </span>
                )}
                <Link
                  href={item.href}
                  className="text-[13.5px] font-semibold text-[#FFFFFF] hover:text-[#E5F36D] transition-colors no-underline"
                >
                  {item.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>

          {/* Clean Topic Pills (Horizontal Swipe on Mobile + Wrapped Desktop) */}
          <div className="gt-hscroll-sm sm:flex sm:flex-wrap items-center justify-start sm:justify-center gap-2 mb-8 pb-1 sm:pb-0">
            {visibleCats.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="whitespace-nowrap px-3.5 py-2 sm:py-1 rounded-full bg-[#FFFFFF]/16 hover:bg-[#FFFFFF] text-[#FFFFFF] hover:text-[#102A56] border border-[#FFFFFF]/30 text-[12px] font-semibold transition-colors no-underline"
              >
                {normalizeCatName(c.name)}
              </Link>
            ))}
          </div>

          {/* Bottom Strip */}
          <div className="w-full pt-5 border-t border-[#FFFFFF]/25 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 text-[12px] font-medium text-[#FFFFFF]/90">
            <div>
              &copy;{' '}
              <Link href="/admin" className="text-inherit hover:text-[#E5F36D] no-underline">
                2026
              </Link>{' '}
              GudTree. Clean Indian Snacking &amp; Honest Food Info.
            </div>
            <div className="flex items-center gap-3">
              <span>Zero Palm Oil Promise</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5F36D]" />
              <span>0g Refined Sugar</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
