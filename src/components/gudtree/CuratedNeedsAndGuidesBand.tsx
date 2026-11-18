'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GT_SPRING } from './MotionPrimitives';

function ColorLightning({
  fill = '#E5F36D',
  stroke = '#073124',
}: {
  fill?: string;
  stroke?: string;
}) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M13.2 2L4.5 13.5H11.5L10.3 22L19.5 10.2H12.4L13.2 2Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const NEED_DOMES = [
  {
    id: 'desk-study',
    label: 'Late-Night Study',
    img: '/images/card-diabetes.png',
    href: '/category/clean-snacks',
  },
  {
    id: 'office-chai',
    label: '4 PM Chai Crunch',
    img: '/images/card-weight.png',
    href: '/category/clean-snacks',
  },
  {
    id: 'hangover-reset',
    label: 'Hangover Reset',
    img: '/images/card-heart.png',
    href: '/category/heart-liver-care',
  },
  {
    id: 'kids-tiffin',
    label: 'School Lunchbox',
    img: '/images/card-pcos.png',
    href: '/category/kids-tiffin',
  },
  {
    id: 'label-check',
    label: 'Packet Audit',
    img: '/images/card-gut.png',
    href: '/category/label-audits',
  },
  {
    id: 'vrat-food',
    label: 'Fasting Bites',
    img: '/images/card-diabetes.png',
    href: '/category/desi-pantry',
  },
];

const FEATURE_SPOTLIGHT_BANNERS = [
  {
    brand: '4 ALMONDS BEFORE CHAI',
    subtitle: 'Flattens Glucose Spike & Morning Acidity',
    gradient: 'from-[#FFF0E5] via-[#FFE6D4] to-[#FFD8BD]',
    accent: '#9A3412',
    img: '/images/card-diabetes.png',
    href: '/category/heart-liver-care',
  },
  {
    brand: 'FIBRE BEFORE CARBS',
    subtitle: 'Simple Blood Sugar & Digestion Hack',
    gradient: 'from-[#EAF5EC] via-[#D8EEDD] to-[#C6E5CD]',
    accent: '#0F5132',
    img: '/images/card-gut.png',
    href: '/category/diabetes-low-gi',
  },
  {
    brand: '₹15 DESI SATTU PROTEIN',
    subtitle: '18g Natural Muscle Fuel Without Whey Powder',
    gradient: 'from-[#EAF2FF] via-[#DCEAFF] to-[#CCDEFF]',
    accent: '#102A56',
    img: '/images/card-weight.png',
    href: '/category/weight-protein',
  },
];

const QUICK_DIET_PILLS = [
  {
    top: '5 MIN',
    bottom: 'READS',
    href: '/news',
    conditionId: 'all',
  },
  {
    top: 'LOW GI',
    bottom: '< 45',
    href: '#health-goals',
    conditionId: 'diabetes',
  },
  {
    top: '150 KCAL',
    bottom: 'SWAPS',
    href: '#health-goals',
    conditionId: 'weight',
  },
  {
    top: 'ZERO',
    bottom: 'PALM OIL',
    href: '#health-goals',
    conditionId: 'packed',
  },
];

export default function CuratedNeedsAndGuidesBand({
  onSelectCondition,
}: {
  onSelectCondition: (id: string) => void;
}) {
  const jumpToCondition = (id: string) => {
    onSelectCondition(id);
    const el = document.getElementById('health-goals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-clip flex flex-col">
      {/* BAND A: DEEP BOTANICAL EMERALD "READ BY NEEDS" ARCH SECTION (COLOR CHANGED) */}
      <section
        aria-label="Read by Nutrition Needs"
        className="w-full relative py-11 sm:py-14 px-4 sm:px-6 overflow-hidden"
        style={{
          backgroundColor: '#0E4D3B',
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.065) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.065) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="max-w-[1060px] mx-auto">
          {/* Header Flanked by Citrus Lime Lightning Bolts */}
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-10">
            <ColorLightning fill="#E5F36D" stroke="#073124" />
            <h2 className="gt-hero-comic-title text-[21px] sm:text-[36px] lg:text-[40px] text-center tracking-[0.01em]">
              CLEAN SWAPS FOR EVERY OCCASION
            </h2>
            <ColorLightning fill="#E5F36D" stroke="#073124" />
          </div>

          {/* Arched Botanical Domes Row: Horizontal Swipe on Mobile + 6-Col Desktop Grid */}
          <div className="gt-hscroll-sm sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-5 pb-2 sm:pb-0">
            {NEED_DOMES.map((item) => {
              const targetHref =
                item.href || (item.id === 'packed' ? '/news' : `/focus/${item.id}`);
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  transition={GT_SPRING}
                  className="w-[132px] sm:w-full min-w-0"
                >
                  <Link
                    href={targetHref}
                    className="group flex flex-col items-center text-center no-underline w-full min-w-0"
                  >
                    <div className="w-full aspect-[1/0.86] rounded-t-full bg-[#073124] border border-white/10 flex items-end justify-center p-3 pb-2 overflow-hidden shadow-[inset_0_8px_20px_rgba(0,0,0,0.22)]">
                      <img
                        src={item.img}
                        alt={item.label}
                        loading="lazy"
                        className="w-[82%] h-[86%] object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-108 pointer-events-none"
                      />
                    </div>
                    <span className="mt-2.5 text-[14px] sm:text-[15px] font-semibold text-[#FFF9EC] group-hover:text-[#E5F36D] transition-colors">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BAND B: CRISP WHITE "BEST GUIDES FOR DAILY HABITS" SPOTLIGHT PILL BANNERS */}
      <section
        aria-label="Best Guides for Daily Habits"
        className="w-full bg-[#FFFFFF] py-10 sm:py-12 px-4 sm:px-6 border-b border-[#ADC3DE]/35"
      >
        <div className="max-w-[1060px] mx-auto">
          <div className="flex items-center justify-center gap-2.5 mb-6 sm:mb-8">
            <ColorLightning fill="#F59E0B" stroke="#102A56" />
            <h2 className="gt-font-display text-[20px] sm:text-[30px] leading-[1.1] tracking-[-0.02em] text-[#102A56] text-center">
              Best guides on clean habits
            </h2>
            <ColorLightning fill="#F59E0B" stroke="#102A56" />
          </div>

          <div className="gt-hscroll-md md:grid md:grid-cols-3 gap-3.5 sm:gap-5 pb-2 md:pb-0">
            {FEATURE_SPOTLIGHT_BANNERS.map((banner) => (
              <Link
                key={banner.brand}
                href={banner.href}
                className={`group relative rounded-[20px] bg-gradient-to-r ${banner.gradient} px-5 py-4 w-[274px] md:w-auto h-[108px] flex items-center justify-between gap-3 overflow-hidden border border-[#102A56]/8 shadow-sm hover:shadow-md transition-all no-underline min-w-0`}
              >
                <div className="flex flex-col justify-center min-w-0 pr-2">
                  <span
                    className="gt-font-display text-[22px] sm:text-[24px] leading-none tracking-[-0.02em]"
                    style={{ color: banner.accent }}
                  >
                    {banner.brand}
                  </span>
                  <span className="text-[13px] font-semibold text-[#102A56]/85 mt-1 truncate">
                    {banner.subtitle}
                  </span>
                </div>

                <div className="relative flex items-center shrink-0 h-full">
                  <img
                    src={banner.img}
                    alt={banner.brand}
                    loading="lazy"
                    className="w-[84px] h-[84px] object-contain drop-shadow-md group-hover:scale-106 transition-transform duration-300 pointer-events-none"
                  />
                  <span className="ml-2 w-7 h-7 rounded-full bg-[#102A56] group-hover:bg-[#DA440D] text-white flex items-center justify-center shrink-0 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BAND C: CORAL TANGERINE GRID "QUICK DIET READS" OVAL PILLS (COLOR CHANGED) */}
      <section
        aria-label="Quick Diet Reads"
        className="w-full relative py-11 sm:py-14 px-4 sm:px-6 overflow-hidden"
        style={{
          backgroundColor: '#EB5628',
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="max-w-[980px] mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-10">
            <ColorLightning fill="#64B5FF" stroke="#102A56" />
            <h2 className="gt-hero-comic-title text-[21px] sm:text-[36px] lg:text-[40px] text-center tracking-[0.01em]">
              QUICK DIET READS
            </h2>
            <ColorLightning fill="#64B5FF" stroke="#102A56" />
          </div>

          <div className="gt-hscroll-sm sm:grid sm:grid-cols-4 gap-3.5 sm:gap-6 pb-2 sm:pb-0">
            {QUICK_DIET_PILLS.map((pill) => {
              const handlePillClick = (e: React.MouseEvent) => {
                if (pill.href === '#patient-care') {
                  e.preventDefault();
                  jumpToCondition(pill.conditionId);
                }
              };

              return (
                <motion.div
                  key={`${pill.top}-${pill.bottom}`}
                  whileHover={{ y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={GT_SPRING}
                  className="w-[144px] sm:w-full min-w-0"
                >
                  <Link
                    href={pill.href}
                    onClick={handlePillClick}
                    className="flex flex-col items-center justify-center text-center rounded-full bg-gradient-to-b from-[#FFFDF7] to-[#FFE7B8] border-2 border-[#FFFFFF]/80 shadow-[0_12px_24px_rgba(16,42,86,0.18)] py-7 px-4 min-h-[156px] sm:min-h-[172px] no-underline group"
                  >
                    <span className="gt-font-display text-[22px] sm:text-[26px] leading-[1.05] text-[#102A56]">
                      {pill.top}
                    </span>
                    <span className="gt-font-display text-[20px] sm:text-[24px] leading-[1.05] text-[#102A56]">
                      {pill.bottom}
                    </span>
                    <span className="mt-3 inline-flex items-center justify-center w-9 h-6 rounded-full bg-[#102A56] group-hover:bg-[#0944BA] text-[#FFF9EC] transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
