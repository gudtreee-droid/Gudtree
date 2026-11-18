'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowRightLeft } from 'lucide-react';

interface SwapItem {
  id: string;
  junkName: string;
  junkIssue: string;
  junkImg: string;
  cleanName: string;
  cleanBenefit: string;
  cleanImg: string;
  savings: string;
  categoryLink: string;
}

const SWAP_MATRIX: SwapItem[] = [
  {
    id: 'bhujia-makhana',
    junkName: 'Packaged Aloo Bhujia',
    junkIssue: '35% palm oil, excessive sodium & trans fats',
    junkImg: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&q=80',
    cleanName: 'Desi Ghee Roasted Makhana',
    cleanBenefit: 'Zero palm oil, high potassium & light digestion',
    cleanImg: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=80',
    savings: '120 kcal vs 280 kcal • 0% Palm Oil',
    categoryLink: '/category/clean-snacks',
  },
  {
    id: 'biscuit-chana',
    junkName: 'Digestive & Atta Biscuits',
    junkIssue: '60% refined maida & hidden invert sugar syrups',
    junkImg: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80',
    cleanName: 'Roasted Chana & 4 Almonds',
    cleanBenefit: 'Slow-release complex carbs + 8g clean plant protein',
    cleanImg: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&q=80',
    savings: 'Zero Added Sugar • 3-Hr Energy',
    categoryLink: '/category/diabetes-low-gi',
  },
  {
    id: 'noodles-chilla',
    junkName: '2-Minute Instant Noodles',
    junkIssue: 'Flash-fried maida, wax coatings & MSG slump',
    junkImg: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=300&q=80',
    cleanName: 'Besan Chilla with Paneer',
    cleanBenefit: '14g bioavailable protein + whole chickpea fiber',
    cleanImg: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80',
    savings: '180 kcal vs 340 kcal • No Maida',
    categoryLink: '/category/kids-tiffin',
  },
  {
    id: 'energydrink-coconut',
    junkName: 'Canned Energy Drinks & Soda',
    junkIssue: '32g liquid high-fructose syrup & chemical crash',
    junkImg: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&q=80',
    cleanName: 'Coconut Water + Rock Salt',
    cleanBenefit: 'Nature’s pure electrolytes + rapid liver rehydration',
    cleanImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&q=80',
    savings: '45 kcal • 400mg Potassium',
    categoryLink: '/category/heart-liver-care',
  },
];

export default function CleanPlateSwapMatrix() {
  return (
    <section
      aria-label="Smart Food Swaps Comparison"
      className="w-full max-w-full overflow-x-clip py-12 sm:py-16 border-y border-[#ADC3DE]/40 relative"
      style={{
        backgroundColor: '#F2F7F2',
        backgroundImage: 'radial-gradient(#C6DEC8 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <div className="max-w-[1060px] mx-auto px-4 sm:px-5">
        {/* Compact Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#15803D]/30 text-[#15803D] text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.08em] mb-2 shadow-xs">
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Smart Swaps • Whole-Food Alternatives</span>
          </span>
          <h2 className="gt-font-display text-[24px] sm:text-[32px] lg:text-[38px] leading-[1.12] tracking-[-0.02em] text-[#102A56]">
            Simple Food Swaps for Everyday Junk
          </h2>
          <p className="mt-1 text-[13.5px] sm:text-[15px] text-[#334155] leading-[1.5]">
            Trade ultra-processed snacks for clean, pocket-friendly Indian kitchen staples.
          </p>
        </div>

        {/* 2x2 Grid of Sleek Comparison Cards with Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {SWAP_MATRIX.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFFFF] rounded-[18px] p-4 sm:p-5 border border-[#ADC3DE]/45 shadow-[0_4px_16px_-4px_rgba(16,42,86,0.06)] hover:border-[#15803D]/50 hover:shadow-[0_10px_24px_-6px_rgba(16,42,86,0.1)] transition-all flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                {/* Comparison Row */}
                <div className="flex items-center justify-between gap-3 text-[13px] sm:text-[14px]">
                  {/* Avoid Side */}
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <img
                      src={item.junkImg}
                      alt={item.junkName}
                      loading="lazy"
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#EF4444]/40 shrink-0 shadow-xs"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="px-1.5 py-0.5 rounded bg-[#FEE2E2] text-[#DC2626] text-[9.5px] font-bold uppercase shrink-0">
                          Avoid
                        </span>
                        <span className="font-semibold text-[#64748B] line-through truncate text-[13px] sm:text-[13.5px]">
                          {item.junkName}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-[#94A3B8] leading-[1.3] truncate">
                        {item.junkIssue}
                      </p>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="shrink-0 w-7 h-7 rounded-full bg-[#EEF5EE] border border-[#15803D]/20 flex items-center justify-center text-[#15803D] font-bold text-[13px]">
                    &rarr;
                  </div>

                  {/* Clean Side */}
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <img
                      src={item.cleanImg}
                      alt={item.cleanName}
                      loading="lazy"
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#16A34A]/50 shrink-0 shadow-xs"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="px-1.5 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] text-[9.5px] font-bold uppercase shrink-0">
                          Clean
                        </span>
                        <span className="font-bold text-[#102A56] truncate text-[13px] sm:text-[13.5px]">
                          {item.cleanName}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-[#15803D] font-medium leading-[1.3] truncate">
                        {item.cleanBenefit}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stat Pill & Quick Link */}
                <div className="pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] sm:text-[11.5px]">
                  <span className="font-semibold text-[#0944BA] bg-[#EEF4FF] px-2.5 py-0.5 rounded-full border border-[#ADC3DE]/30">
                    {item.savings}
                  </span>
                  <Link
                    href={item.categoryLink}
                    className="font-semibold text-[#2F54EB] hover:text-[#15803D] inline-flex items-center gap-1 no-underline transition-colors"
                  >
                    <span>Read Swaps</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
