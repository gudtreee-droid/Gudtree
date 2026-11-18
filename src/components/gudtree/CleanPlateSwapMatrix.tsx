'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { GT_EASE } from './MotionPrimitives';

interface SwapItem {
  id: string;
  junkName: string;
  junkProblem: string;
  junkStats: string;
  cleanName: string;
  cleanBenefit: string;
  cleanStats: string;
  categoryLink: string;
}

const SWAP_MATRIX: SwapItem[] = [
  {
    id: 'bhujia-makhana',
    junkName: 'Aloo Bhujia & Packaged Sev',
    junkProblem: '35% Refined Palm Oil + High Sodium + Acidity Jalan',
    junkStats: '280 kcal • 18g Bad Fat • Insulin Spike',
    cleanName: 'Desi Ghee Roasted Makhana',
    cleanBenefit: 'Zero Palm Oil + Potassium + Pachan Me Halka',
    cleanStats: '120 kcal • 3g Desi Ghee • GI < 40',
    categoryLink: '/category/clean-snacks',
  },
  {
    id: 'biscuit-chana',
    junkName: 'Atta / Digestive Biscuits',
    junkProblem: '60% Maida + Invert Sugar Syrup + Emulsifiers',
    junkStats: '190 kcal • 12g Hidden Sugar • 4 PM Crash',
    cleanName: 'Bhuna Chana & 4 Badam',
    cleanBenefit: 'Natural Slow-Release Fiber + 8g Clean Protein',
    cleanStats: '110 kcal • 0g Added Sugar • 3-Hr Energy',
    categoryLink: '/category/diabetes-low-gi',
  },
  {
    id: 'noodles-chilla',
    junkName: '2-Minute Instant Noodles',
    junkProblem: 'Flash-Fried Maida + Synthetic MSG + Waxy Coating',
    junkStats: '340 kcal • Heavy Gut Bloat • Fat Slump',
    cleanName: 'Besan Chilla with Paneer',
    cleanBenefit: 'Zero Maida + Iron + Calcium Se Bhara Tiffin',
    cleanStats: '180 kcal • 14g Real Protein • High Digestion',
    categoryLink: '/category/kids-tiffin',
  },
  {
    id: 'energydrink-coconut',
    junkName: 'Canned Energy Drink / Cola',
    junkProblem: '32g Liquid Sugar + Synthetic Caffeine Crash',
    junkStats: '140 kcal • Dehydration • Liver Acid Load',
    cleanName: 'Nariyal Pani + Sendha Namak',
    cleanBenefit: 'World Ka Best Natural Electrolyte + Fast Liver Reset',
    cleanStats: '45 kcal • 400mg Potassium • Instant Hydration',
    categoryLink: '/category/heart-liver-care',
  },
];

export default function CleanPlateSwapMatrix() {
  return (
    <section
      aria-label="Clean Food Swaps Comparison"
      className="w-full max-w-full overflow-x-clip bg-[#07241A] text-white py-14 sm:py-20 relative overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 80% 20%, rgba(229, 243, 109, 0.08) 0%, transparent 60%)',
      }}
    >
      <div className="max-w-[1060px] mx-auto px-4 sm:px-5">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#E5F36D] text-[11px] font-bold uppercase tracking-[0.1em] mb-2.5 border border-white/15">
            <span>Dukan Ka Packet vs GudTree Kitchen Swap</span>
          </span>
          <h2 className="gt-hero-comic-title text-[24px] sm:text-[36px] lg:text-[42px] tracking-[0.01em] text-white">
            KYA KHANA BAND KAREIN VS KYA SHURU KAREIN
          </h2>
          <p className="mt-2 text-[14px] sm:text-[15.5px] text-white/80 leading-[1.55]">
            Har dukan ke packet ka ek sasta, swadisht aur clean desi option hota hai. Dekhiye sidha farak:
          </p>
        </div>

        {/* 4 Side-by-Side Comparison Cards (Grid on desktop, horizontal scroll on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {SWAP_MATRIX.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.07, ease: GT_EASE }}
              className="bg-[#0C3527] rounded-[20px] p-4 sm:p-5 border border-white/12 flex flex-col justify-between hover:border-[#E5F36D]/40 transition-colors"
            >
              <div className="flex flex-col gap-3">
                {/* JUNK ROW (RED TINT) */}
                <div className="bg-[#2A1515] rounded-[14px] p-3 sm:p-3.5 border border-[#EF4444]/30">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[14.5px] sm:text-[15.5px] font-bold text-[#FCA5A5] flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-[#EF4444] shrink-0" />
                      <span>{item.junkName}</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EF4444]/20 text-[#FCA5A5] px-2 py-0.5 rounded-full">
                      Avoid
                    </span>
                  </div>
                  <p className="text-[12.5px] sm:text-[13px] text-[#F87171] leading-[1.4]">
                    {item.junkProblem}
                  </p>
                  <div className="mt-1.5 text-[11px] font-semibold text-white/60">
                    {item.junkStats}
                  </div>
                </div>

                {/* SWAP ARROW */}
                <div className="flex items-center justify-center -my-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E5F36D] bg-[#07241A] px-2.5 py-0.5 rounded-full border border-white/10 flex items-center gap-1">
                    <span>Clean Desi Swap</span>
                    <span>&darr;</span>
                  </span>
                </div>

                {/* CLEAN ROW (GREEN TINT) */}
                <div className="bg-[#124231] rounded-[14px] p-3 sm:p-3.5 border border-[#E5F36D]/40">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[14.5px] sm:text-[15.5px] font-bold text-[#E5F36D] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0" />
                      <span>{item.cleanName}</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#4ADE80]/20 text-[#86EFAC] px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </div>
                  <p className="text-[12.5px] sm:text-[13px] text-white/90 leading-[1.4]">
                    {item.cleanBenefit}
                  </p>
                  <div className="mt-1.5 text-[11px] font-semibold text-[#86EFAC]">
                    {item.cleanStats}
                  </div>
                </div>
              </div>

              {/* Read Full Guide Link */}
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                <Link
                  href={item.categoryLink}
                  className="text-[12.5px] font-semibold text-[#E5F36D] hover:underline inline-flex items-center gap-1 no-underline"
                >
                  <span>Explore Clean Swaps In This Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
