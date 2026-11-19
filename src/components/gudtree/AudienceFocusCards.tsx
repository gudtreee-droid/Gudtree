'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GT_SPRING, GT_EASE } from './MotionPrimitives';

export interface AudienceCardItem {
  id: string;
  title: string;
  description: string;
  blobColor: string;
  blobRotation: number;
  imageSrc: string;
  imageAlt: string;
  href?: string;
}

export const AUDIENCE_FOCUS_CARDS: AudienceCardItem[] = [
  {
    id: 'chai-crunch',
    title: '4 PM Chai Crunch',
    description:
      'Clean chai companions to replace oily samosas, namkeen, and bakery biscuits.',
    blobColor: '#F5A623',
    blobRotation: -5,
    imageSrc: '/images/card-weight.png',
    imageAlt: 'Clean roasted chai snacks and seeds',
    href: '/category/clean-snacks',
  },
  {
    id: 'kids-tiffin',
    title: 'School Lunchbox',
    description:
      'Quick 10-minute palm-oil-free tiffins and crisp evening bites kids actually finish.',
    blobColor: '#4CC36B',
    blobRotation: 9,
    imageSrc: '/images/card-pcos.png',
    imageAlt: 'Kids healthy tiffin and wholesome snacks',
    href: '/category/kids-tiffin',
  },
  {
    id: 'late-night-study',
    title: 'Late-Night Study',
    description:
      'Keyboard-clean roasted snacks and light fuel for 1 AM study and work sessions.',
    blobColor: '#2BA6FF',
    blobRotation: 12,
    imageSrc: '/images/card-heart.png',
    imageAlt: 'Light roasted makhana and millets for study',
    href: '/category/clean-snacks',
  },
  {
    id: 'label-audits',
    title: 'Packet Audit',
    description:
      'Real food label checks. Exposing hidden palm oil, maltodextrin, and false claims.',
    blobColor: '#FF5A3D',
    blobRotation: -8,
    imageSrc: '/images/card-diabetes.png',
    imageAlt: 'Honest food label and ingredient audit',
    href: '/category/label-audits',
  },
  {
    id: 'weight-protein',
    title: 'Budget Protein',
    description:
      'Roasted sattu, chana, and wholesome fuel under ₹50/day without whey powder.',
    blobColor: '#9B51E0',
    blobRotation: -15,
    imageSrc: '/images/card-gut.png',
    imageAlt: 'Roasted sattu and black chana protein bowl',
    href: '/category/weight-protein',
  },
];

/**
 * Smooth 10-lobed scalloped wavy medallion matching Bullen's signature card backdrop
 */
function ScallopedBlobSvg({
  color,
  rotation,
  isActive,
}: {
  color: string;
  rotation: number;
  isActive: boolean;
}) {
  // Parametric smooth 10-lobe scalloped wave around r ≈ 80
  const d =
    'M 100,14 C 110,14 115,24 125,27 C 134,30 144,23 152,29 C 160,35 157,46 164,54 C 170,62 182,63 185,72 C 188,82 179,90 179,100 C 179,110 188,118 185,128 C 182,137 170,138 164,146 C 157,154 160,165 152,171 C 144,177 134,170 125,173 C 115,176 110,186 100,186 C 90,186 85,176 75,173 C 66,170 56,177 48,171 C 40,165 43,154 36,146 C 30,138 18,137 15,128 C 12,118 21,110 21,100 C 21,90 12,82 15,72 C 18,63 30,62 36,54 C 43,46 40,35 48,29 C 56,23 66,30 75,27 C 85,24 90,14 100,14 Z';

  return (
    <motion.svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      initial={false}
      animate={{
        rotate: isActive ? rotation + 14 : rotation,
        scale: isActive ? 1.07 : 1,
      }}
      transition={GT_SPRING}
      className="w-[154px] h-[154px] sm:w-[164px] sm:h-[164px] drop-shadow-[0_10px_22px_rgba(16,42,86,0.08)] group-hover:scale-105 group-hover:rotate-6 transition-transform duration-300"
    >
      <path d={d} fill={color} />
    </motion.svg>
  );
}

export default function AudienceFocusCards({
  activeId,
}: {
  activeId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <section
      id="diet-focus"
      aria-label="Target Audience and Diet Plans"
      className="w-full max-w-full overflow-x-clip bg-[#FFF9EC] pt-8 sm:pt-12 pb-12 sm:pb-16 scroll-mt-20 relative"
    >
      <div id="health-goals" className="absolute -top-16 left-0 pointer-events-none" />
      <div className="max-w-[1060px] mx-auto px-4 sm:px-5">
        {/* Centered Header (clean editorial focus matching Bullen's section) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: GT_EASE }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="gt-font-display text-[26px] sm:text-[36px] lg:text-[42px] leading-[1.08] tracking-[-0.03em] text-[#102A56]">
            Clean Swaps for Every Occasion
          </h2>
          <p className="mt-2 text-[14px] sm:text-[15.5px] text-[#334155] leading-[1.5] max-w-xl mx-auto">
            Tested snacks for 4 PM chai, school tiffins, and late-night work.
            <br className="hidden sm:inline" /> Simple healthy snack swaps your whole family will actually love.
          </p>
        </motion.div>

        {/* 5 Playful Scalloped Medallion Cards — Horizontal Swipe on Mobile + 5-Across Desktop */}
        <div className="gt-hscroll-md md:grid md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 items-start pb-2 md:pb-0">
          {AUDIENCE_FOCUS_CARDS.map((item, idx) => {
            const isActive = activeId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: GT_EASE }}
                className="w-[152px] sm:w-[172px] md:w-full min-w-0"
              >
                <Link
                  href={item.href || `/focus/${item.id}`}
                  className={`group w-full min-w-0 flex flex-col items-center text-center bg-transparent p-1.5 sm:p-2 rounded-[22px] no-underline transition-all ${
                    isActive
                      ? 'ring-2 ring-[#102A56]/25 bg-[#FFFFFF]/60 shadow-sm'
                      : ''
                  }`}
                >
                  {/* Medallion Blob + Overlapping Cutout Object */}
                  <div className="relative w-[132px] h-[126px] sm:w-[158px] sm:h-[152px] flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-[0.82] sm:scale-95">
                      <ScallopedBlobSvg
                        color={item.blobColor}
                        rotation={item.blobRotation}
                        isActive={isActive}
                      />
                    </div>
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      loading="lazy"
                      className="relative z-10 w-[112px] h-[112px] sm:w-[140px] sm:h-[140px] object-contain drop-shadow-[0_12px_16px_rgba(16,42,86,0.18)] transition-transform duration-300 group-hover:scale-108 group-hover:-translate-y-1.5 pointer-events-none select-none"
                    />
                  </div>

                  {/* Bold Centered Card Title */}
                  <h3 className="mt-2 sm:mt-3 gt-font-display text-[17px] sm:text-[20px] leading-[1.15] tracking-[-0.02em] text-[#102A56] group-hover:text-[#DA440D] transition-colors">
                    {item.title}
                  </h3>

                  {/* Crisp 2-Line Description */}
                  <p className="mt-1 text-[12px] sm:text-[13.5px] leading-[1.45] text-[#334155] max-w-[210px] line-clamp-2 sm:line-clamp-none">
                    {item.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
