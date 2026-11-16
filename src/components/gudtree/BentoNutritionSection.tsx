'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Sparkles,
  Leaf,
  Scale,
} from 'lucide-react';
import { FadeUpReveal, GT_SPRING } from './MotionPrimitives';

const SNACK_SWAPS = [
  {
    junk: 'Deep-Fried Masala Chips',
    junkIssue: '32% Refined Palmolein + High Sodium',
    clean: 'Dry-Roasted Peri-Peri Makhana',
    cleanGain: '65% Fewer Calories • Rich Magnesium',
  },
  {
    junk: 'Commercial Digestive Biscuits',
    junkIssue: 'Maida + Liquid Glucose + Palm Oil',
    clean: 'Ragi & Palm Jaggery Millet Cookies',
    cleanGain: '0% Maida • Steady Blood Sugar',
  },
  {
    junk: 'Packaged Sugary Cereal Bars',
    junkIssue: 'Maltodextrin + Invert Sugar Syrup',
    clean: 'Flax, Almond & Desi Gud Chikki',
    cleanGain: '11g Plant Protein + Omega-3',
  },
];

const RED_FLAGS = [
  {
    code: 'Maltodextrin',
    risk: 'Glycemic Index ~105 (Spikes sugar faster than table sugar)',
  },
  {
    code: 'Edible Vegetable Oil (Palmolein)',
    risk: 'Hidden high saturated palm fat behind "Roasted/Baked" front claims',
  },
  {
    code: 'INS 621 / 627 / 631',
    risk: 'Synthetic flavor enhancers triggering bloating & cravings',
  },
];

export default function BentoNutritionSection() {
  const [selectedSwap, setSelectedSwap] = useState(0);

  return (
    <section id="clean-audits" className="gt-container py-14 sm:py-20 scroll-mt-24 overflow-x-clip">
      <FadeUpReveal className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-[#0944BA]">
            Clean Label Science • Packed Snack Audits
          </span>
          <h2 className="sc-display-h2 text-[#102A56] mt-1.5">
            What We <span className="text-[#DA440D]">Audit</span> Before You Snack
          </h2>
        </div>
        <p className="sc-lead max-w-md">
          Every Indian packaged snack review &amp; patient diet guide follows our strict 3-pillar clean ingredient verification.
        </p>
      </FadeUpReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Card 1: Big Tabular Stat Hero Card (Sunday Crumb Dark Botanical + Citrus Lime) */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={GT_SPRING}
          className="lg:col-span-4 min-w-0 rounded-[28px] bg-[#0D120B] text-[#FFF9EC] p-7 flex flex-col justify-between shadow-[0_14px_34px_-8px_rgba(13,18,11,0.3)]"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171D15] border border-[#E5F36D]/30 text-[11px] font-bold uppercase tracking-widest text-[#E5F36D] mb-6">
              <Leaf className="w-3 h-3" />
              GudTree Purity Standard
            </span>

            <div className="grid grid-cols-2 gap-5 py-4 border-y border-white/15">
              <div>
                <div className="gt-font-display text-[48px] sm:text-[54px] leading-none text-[#E5F36D]">
                  0g
                </div>
                <div className="text-[13px] text-[#DFE5D7] mt-1.5 font-medium">
                  Refined White Sugar
                </div>
              </div>
              <div>
                <div className="gt-font-display text-[48px] sm:text-[54px] leading-none text-[#FFF9EC]">
                  0%
                </div>
                <div className="text-[13px] text-[#DFE5D7] mt-1.5 font-medium">
                  Palm &amp; Hydrogenated Oil
                </div>
              </div>
            </div>
          </div>

          <p className="text-[14.5px] text-[#DFE5D7] leading-relaxed mt-6">
            We replace empty calories with real palm jaggery, cold-pressed seeds, roasted makhana, and Indian millets suitable for daily mindful eating.
          </p>
        </motion.div>

        {/* Card 2: Interactive Smart Snack Swap Matrix */}
        <div className="lg:col-span-5 min-w-0 rounded-[28px] bg-[#FFFFFF] border border-[#ADC3DE]/70 p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(16,42,86,0.06)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#DA440D]">
                <Scale className="w-3.5 h-3.5" />
                Smart Desi Snack Swaps
              </span>
              <span className="text-[11px] text-[#666666] font-medium">
                Tap to compare
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {SNACK_SWAPS.map((s, idx) => (
                <button
                  key={s.clean}
                  type="button"
                  onClick={() => setSelectedSwap(idx)}
                  className={`px-3.5 py-1.5 rounded-full gt-font-display text-[15px] tracking-[-0.02em] transition-all cursor-pointer border ${
                    selectedSwap === idx
                      ? 'bg-[#102A56] text-[#E5F36D] border-[#102A56]'
                      : 'bg-[#FFF9EC] text-[#102A56] border-[#ADC3DE] hover:border-[#DA440D]'
                  }`}
                >
                  Swap #{idx + 1}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-[18px] bg-[#FFF0EA] border border-[#DA440D]/25 flex items-start gap-3">
                <XCircle className="w-5 h-5 text-[#DA440D] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#DA440D]">
                    Typical Market Pack
                  </div>
                  <div className="gt-font-display text-[20px] leading-tight text-[#102A56]">
                    {SNACK_SWAPS[selectedSwap].junk}
                  </div>
                  <div className="text-[13px] text-[#666666] mt-0.5">
                    {SNACK_SWAPS[selectedSwap].junkIssue}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-[18px] bg-[#D6EDFF]/70 border border-[#ADC3DE] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0944BA] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#0944BA]">
                    GudTree Clean Upgrade
                  </div>
                  <div className="gt-font-display text-[20px] leading-tight text-[#102A56]">
                    {SNACK_SWAPS[selectedSwap].clean}
                  </div>
                  <div className="text-[13px] text-[#102A56] mt-0.5 font-medium">
                    {SNACK_SWAPS[selectedSwap].cleanGain}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Packed Label Red-Flag Decoder */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={GT_SPRING}
          className="lg:col-span-3 min-w-0 rounded-[28px] bg-[#DFE5D7] border border-[#ADC3DE]/60 p-6 flex flex-col justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#102A56] mb-4">
              <ShieldAlert className="w-3.5 h-3.5 text-[#DA440D]" />
              Label Red Flags
            </span>
            <div className="space-y-3">
              {RED_FLAGS.map((flag) => (
                <div
                  key={flag.code}
                  className="p-3.5 rounded-[16px] bg-white border border-[#ADC3DE]/50"
                >
                  <div className="gt-font-display text-[17px] text-[#DA440D]">
                    {flag.code}
                  </div>
                  <div className="text-[12.5px] text-[#666666] leading-snug mt-0.5">
                    {flag.risk}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#102A56]/15 flex items-center gap-1.5 text-[12px] font-semibold text-[#102A56]">
            <Sparkles className="w-3.5 h-3.5 text-[#DA440D]" />
            <span>Patient-Safe Ingredient Checks</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
