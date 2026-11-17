'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  HeartPulse,
  Sparkles,
  Leaf,
  ShieldCheck,
  Flame,
  PackageCheck,
  Laptop,
} from 'lucide-react';
import { GT_SPRING } from './MotionPrimitives';

export interface ConditionOption {
  id: string;
  label: string;
  hinglishHint: string;
  safeSnacks: string;
  avoidIngredients: string;
  giFocus: string;
  keywords: string[];
  icon: React.ReactNode;
}

export const PATIENT_CONDITIONS: ConditionOption[] = [
  {
    id: 'all',
    label: 'All Clean Munches',
    hinglishHint: 'Non-greasy, zero-palm-oil clean snacking hub for 15-35s',
    safeSnacks: 'Roasted Makhana, Desi Sattu, Bhuna Chana, Seed Mixes, Palm Gud',
    avoidIngredients: 'Refined Palmolein Oil, Maltodextrin, High-Fructose Syrups',
    giFocus: 'Whole-Food Nutrition',
    keywords: [],
    icon: <Leaf className="w-3.5 h-3.5" />,
  },
  {
    id: 'desk',
    label: 'Desk & Study Fuel',
    hinglishHint: 'Non-greasy keyboard crunch for late night & 4 PM slump',
    safeSnacks: 'Air-Roasted Makhana, Dry Bhuna Chana, Jowar Puffs, Spiced Murmura',
    avoidIngredients: 'Oily Chips, Samosa Trans Fats, Sugar-Dusted Biscuits',
    giFocus: 'Zero Brain-Fog & High Crunch',
    keywords: ['desk', 'study', 'focus', 'coder', 'slump', 'office', 'makhana', 'cram', 'midnight', 'non-greasy'],
    icon: <Laptop className="w-3.5 h-3.5" />,
  },
  {
    id: 'pcos',
    label: "Women's Health (PCOS & PMS)",
    hinglishHint: 'Seed cycling, cramp relief & hormonal acne swaps',
    safeSnacks: 'Pumpkin & Flax Seed Mix, 70% Dark Chocolate, Cinnamon Makhana, Til-Gud',
    avoidIngredients: 'Maltodextrin "Diet" Namkeens, Excess Dairy Sugars, Soy Isolates',
    giFocus: 'Insulin Sensitivity & Zinc/Magnesium',
    keywords: ['pcos', 'pcod', 'hormon', 'period', 'cramp', 'pms', 'pregnancy', 'acne', 'skin', 'seed cycling'],
    icon: <Sparkles className="w-3.5 h-3.5" />,
  },
  {
    id: 'vegan',
    label: 'Vegan & Dairy-Free',
    hinglishHint: 'Desi sattu protein, plant milks & zero post-chai bloat',
    safeSnacks: 'Chana Sattu Shake, Air-Roasted Edamame, Coconut-Gud Laddus, Tofu Tikka',
    avoidIngredients: 'Casein/Lactose Fillers, Cheap Milk Solids, Dairy-Dusted Chips',
    giFocus: '100% Plant Bio-Availability',
    keywords: ['vegan', 'dairy-free', 'sattu', 'lactose', 'plant', 'oat milk', 'almond milk', 'chana'],
    icon: <Leaf className="w-3.5 h-3.5" />,
  },
  {
    id: 'weight',
    label: 'Budget Fitness (Under ₹50)',
    hinglishHint: 'High-protein hostel & fresher fuel without expensive whey',
    safeSnacks: '₹20 Bhuna Chana, Sattu Protein Drink, Sprouted Moong Chaat, Boiled Kala Chana',
    avoidIngredients: 'Hydrogenated Peanut Butter Palm Oil, Fake 20g Protein Bars',
    giFocus: '20g+ Protein / < 180 kcal',
    keywords: ['weight', 'protein', 'fitness', 'gym', 'sattu', 'whey', 'budget', '150 cal', 'chana'],
    icon: <Flame className="w-3.5 h-3.5" />,
  },
  {
    id: 'gut',
    label: 'Gut & Bloat Relief',
    hinglishHint: 'Stops 8-hour desk-sitting bloat and post-lunch acidity',
    safeSnacks: 'Roasted Jeera Chaas, Beet Kanji, Soaked Sabja Water, Prebiotic Millets',
    avoidIngredients: 'Emulsifiers (INS 471), Refined Maida, Deep-Fried Namkeen',
    giFocus: 'Prebiotic Fiber & Zero Acidity',
    keywords: ['gut', 'bloat', 'acidity', 'chaas', 'kanji', 'digest', 'probiotic', 'prebiotic', 'sitting'],
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
  },
  {
    id: 'diabetes',
    label: 'Diabetes & Low-GI',
    hinglishHint: 'Flat continuous glucose curves with low-GI evening crunch',
    safeSnacks: 'Roasted Kala Chana, Raw Walnuts, Methi Khakhra, Foxtail Millet Puffs',
    avoidIngredients: 'Liquid Glucose, Maltodextrin, White Maida, Dextrose',
    giFocus: 'Glycemic Index < 50',
    keywords: ['diabet', 'sugar', 'glucose', 'glycemic', 'low-gi', 'spike', 'khakhra'],
    icon: <Activity className="w-3.5 h-3.5" />,
  },
  {
    id: 'heart',
    label: 'Zero Palm Oil & Clean Fats',
    hinglishHint: 'Unmasking palmolein in packaged snacks & raw omega-3s',
    safeSnacks: 'Raw Walnuts, Flaxseed Chikki (Low Sodium), Cold-Pressed Roasted Almonds',
    avoidIngredients: 'Palmolein Oil, Vanaspati Trans Fats, Excessive Iodized Salt Dust',
    giFocus: 'Zero Trans Fat & ALA Omega-3',
    keywords: ['heart', 'liver', 'palmolein', 'palm oil', 'walnut', 'flax', 'sodium', 'trans fat'],
    icon: <HeartPulse className="w-3.5 h-3.5" />,
  },
  {
    id: 'packed',
    label: 'Blinkit & Label Audits',
    hinglishHint: 'Back-of-pack green flags & red flags decoded in 1 minute',
    safeSnacks: '100% Ingredient Verified Brands (Real Whole Seeds, Zero Palm Oil)',
    avoidIngredients: '"Diet" claims hiding 35% Maltodextrin and INS 150d Caramel Color',
    giFocus: '100% Ingredient Honesty',
    keywords: ['label', 'audit', 'blinkit', 'palm oil', 'maltodextrin', 'zepto', 'too yumm', 'red flag'],
    icon: <PackageCheck className="w-3.5 h-3.5" />,
  },
];

export default function PatientConditionStrip({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const current =
    PATIENT_CONDITIONS.find((c) => c.id === activeId) || PATIENT_CONDITIONS[0];

  return (
    <div id="patient-care" className="w-full scroll-mt-28">
      {/* Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {PATIENT_CONDITIONS.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full gt-font-display text-[15px] tracking-[-0.02em] whitespace-nowrap transition-colors cursor-pointer shrink-0 border ${
                isActive
                  ? 'text-[#E5F36D] border-[#102A56]'
                  : 'bg-[#FFFFFF] text-[#102A56] border-[#ADC3DE] hover:border-[#DA440D] hover:bg-[#D6EDFF]/40'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="gtConditionPill"
                  transition={GT_SPRING}
                  className="absolute inset-0 rounded-full bg-[#102A56] -z-0"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Patient Nutritionist Guidance Card */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 p-5 sm:p-6 rounded-[24px] bg-[#FFFFFF] border border-[#ADC3DE]/70 shadow-[0_4px_20px_-4px_rgba(16,42,86,0.06)] grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#DA440D]">
            Target Focus • {current.giFocus}
          </span>
          <h3 className="sc-display-h3 text-[#102A56]">
            {current.label}
          </h3>
          <p className="text-[14px] leading-relaxed text-[#334155]">{current.hinglishHint}</p>
        </div>

        <div className="p-4 rounded-[18px] bg-[#DFE5D7]/60 border border-[#ADC3DE]/50">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#102A56] mb-1">
            Safe Indian Snack Picks
          </span>
          <p className="text-[14px] font-medium text-[#102A56] leading-relaxed">
            {current.safeSnacks}
          </p>
        </div>

        <div className="p-4 rounded-[18px] bg-[#FFF0EA] border border-[#DA440D]/25">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#DA440D] mb-1">
            Red-Flag Ingredients To Avoid
          </span>
          <p className="text-[14px] font-medium text-[#102A56] leading-relaxed">
            {current.avoidIngredients}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
