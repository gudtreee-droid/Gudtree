'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowRightLeft } from 'lucide-react';

interface SwapItem {
  id: string;
  junkName: string;
  junkIssue: string;
  cleanName: string;
  cleanBenefit: string;
  savings: string;
  categoryLink: string;
}

const SWAP_MATRIX: SwapItem[] = [
  {
    id: 'bhujia-makhana',
    junkName: 'Packaged Aloo Bhujia',
    junkIssue: '35% palm oil, excessive sodium & trans fats',
    cleanName: 'Desi Ghee Roasted Makhana',
    cleanBenefit: 'Zero palm oil, high potassium & digestive ease',
    savings: '120 kcal vs 280 kcal • 0% Palm Oil',
    categoryLink: '/category/clean-snacks',
  },
  {
    id: 'biscuit-chana',
    junkName: 'Digestive & Atta Biscuits',
    junkIssue: '60% refined maida & hidden invert sugar syrups',
    cleanName: 'Roasted Chana & 4 Almonds',
    cleanBenefit: 'Slow-release complex carbs + 8g clean plant protein',
    savings: 'Zero Added Sugar • 3-Hr Energy',
    categoryLink: '/category/diabetes-low-gi',
  },
  {
    id: 'noodles-chilla',
    junkName: '2-Minute Instant Noodles',
    junkIssue: 'Flash-fried maida, wax coatings & MSG slump',
    cleanName: 'Besan Chilla with Paneer',
    cleanBenefit: '14g bioavailable protein + whole chickpea fiber',
    savings: '180 kcal vs 340 kcal • No Maida',
    categoryLink: '/category/kids-tiffin',
  },
  {
    id: 'energydrink-coconut',
    junkName: 'Canned Energy Drinks & Colas',
    junkIssue: '32g liquid high-fructose corn syrup & chemical crash',
    cleanName: 'Coconut Water + Rock Salt',
    cleanBenefit: 'Nature’s pure electrolytes + rapid liver rehydration',
    savings: '45 kcal • 400mg Potassium',
    categoryLink: '/category/heart-liver-care',
  },
];

export default function CleanPlateSwapMatrix() {
  return (
    <section
      aria-label="Smart Food Swaps Comparison"
      className="w-full max-w-full overflow-x-clip bg-[#FFF9EC] py-10 sm:py-14 border-b border-[#ADC3DE]/35"
    >
      <div className="max-w-[1060px] mx-auto px-4 sm:px-5">
        {/* Compact Header */}
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFFFFF] border border-[#ADC3DE]/60 text-[#2F54EB] text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.08em] mb-2">
            <ArrowRightLeft className="w-3 h-3 text-[#2F54EB]" />
            <span>Smart Swaps • Whole-Food Alternatives</span>
          </span>
          <h2 className="gt-font-display text-[22px] sm:text-[30px] lg:text-[34px] leading-[1.12] tracking-[-0.02em] text-[#102A56]">
            Simple Food Swaps for Everyday Junk
          </h2>
          <p className="mt-1 text-[13px] sm:text-[14.5px] text-[#475569] leading-[1.5]">
            Trade ultra-processed snacks for clean, pocket-friendly Indian kitchen staples.
          </p>
        </div>

        {/* Compact 2x2 Grid of Sleek Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {SWAP_MATRIX.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFFFF] rounded-[16px] p-3.5 sm:p-4 border border-[#ADC3DE]/40 shadow-[0_4px_16px_-4px_rgba(16,42,86,0.05)] hover:border-[#2F54EB]/50 transition-all flex flex-col justify-between"
            >
              <div className="flex flex-col gap-2.5">
                {/* Comparison Row */}
                <div className="flex items-center justify-between gap-2 text-[13px] sm:text-[14px]">
                  {/* Avoid Side */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="px-1.5 py-0.5 rounded bg-[#FEE2E2] text-[#DC2626] text-[10px] font-bold uppercase">
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

                  {/* Arrow Indicator */}
                  <div className="shrink-0 px-1 text-[#2F54EB] font-bold text-[14px]">
                    &rarr;
                  </div>

                  {/* Clean Side */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="px-1.5 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold uppercase">
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

                {/* Stat Pill & Quick Link */}
                <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] sm:text-[11.5px]">
                  <span className="font-semibold text-[#0944BA] bg-[#EEF4FF] px-2 py-0.5 rounded-md">
                    {item.savings}
                  </span>
                  <Link
                    href={item.categoryLink}
                    className="font-semibold text-[#2F54EB] hover:text-[#DA440D] inline-flex items-center gap-0.5 no-underline transition-colors"
                  >
                    <span>Read Swaps</span>
                    <ArrowRight className="w-3 h-3" />
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
