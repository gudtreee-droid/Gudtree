'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'Daily Snacking',
    q: 'What should I snack on during the 4 PM office slump?',
    a: 'Skip fried samosas, rusk, and digestive biscuits. Instead, pick dry-roasted black chana (bhuna chana) or ghee-roasted makhana. Their low glycemic index (< 35) prevents insulin spikes and eliminates the post-tea energy crash.',
  },
  {
    category: 'Label Audits',
    q: 'Are "Sugar-Free" and "Baked Not Fried" snacks actually healthy?',
    a: 'Rarely. Most "sugar-free" snacks replace sugar with maltodextrin or chemical syrups like maltitol, which spike blood glucose faster than table sugar. Meanwhile, "baked" chips are often flash-sprayed with 20% refined palm oil to achieve crunch.',
  },
  {
    category: 'Hydration & Hangover',
    q: 'What is the fastest natural way to recover from an alcohol hangover?',
    a: 'Avoid bed-tea or black coffee—caffeine worsens dehydration and triggers acid reflux. Drink fresh coconut water with a pinch of rock salt (sendha namak) or chilled jeera chaas to restore electrolytes and rehydrate your liver within 30 minutes.',
  },
  {
    category: 'Budget Protein',
    q: 'How can I hit 35g+ clean protein daily on a budget under ₹50?',
    a: 'Mix 2 tablespoons of roasted sattu in chilled water (18g protein, ~₹15), have a small bowl of roasted peanuts (12g protein, ~₹15), and a handful of roasted chana (8g protein, ~₹10). That gives you ~38g of clean plant protein without expensive whey.',
  },
  {
    category: 'Kids Tiffin',
    q: 'How do I pack a healthy school lunchbox kids will actually finish?',
    a: 'Kids dislike cold, soggy sabzi-roti. Switch to finger-friendly formats: whole wheat paneer bhurji rolls, square besan chilla bites, or naturally sweet ragi-banana mini pancakes that stay soft until lunch break.',
  },
  {
    category: 'Women’s Health & PCOS',
    q: 'What foods help reduce hormonal acne and belly bloat in PCOS?',
    a: 'Start the day with a savoury, protein-rich breakfast like besan chilla or paneer to stabilize morning insulin. Drink spearmint tea and practice pumpkin-flax seed cycling to naturally reduce androgen levels and inflammatory breakouts.',
  },
  {
    category: 'Gut & Digestion',
    q: 'Why does sitting at a desk cause bloating, and how can I fix it?',
    a: 'Prolonged sitting slows digestive motility and traps gas. Drink a glass of fresh roasted jeera chaas 20 minutes after lunch, take a brisk 5-minute walk, and avoid icy cold drinks or carbonated soda with meals.',
  },
];

export default function GudTreeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      aria-label="Frequently Asked Questions"
      className="w-full max-w-full overflow-x-clip bg-[#FFFFFF] py-10 sm:py-14 border-t border-[#ADC3DE]/35"
    >
      <div className="max-w-[780px] mx-auto px-4 sm:px-5">
        {/* Compact Header */}
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#EEF4FF] text-[#2F54EB] text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.08em] mb-2">
            <HelpCircle className="w-3 h-3" />
            <span>Nutrition FAQ • Direct Answers</span>
          </span>
          <h2 className="gt-font-display text-[22px] sm:text-[30px] lg:text-[34px] leading-[1.12] tracking-[-0.02em] text-[#102A56]">
            Frequently Asked Questions
          </h2>
          <p className="mt-1 text-[13px] sm:text-[14.5px] text-[#475569] leading-[1.5]">
            Evidence-backed answers on clean snacking, everyday diets, and label audits.
          </p>
        </div>

        {/* Compact Accordion List */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-[14px] border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#FFF9EC] border-[#2F54EB]/40 shadow-[0_4px_12px_-4px_rgba(16,42,86,0.06)]'
                    : 'bg-[#F9FBFC] border-[#ADC3DE]/35 hover:border-[#ADC3DE]/70'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-3 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#2F54EB] mb-0.5">
                      {faq.category}
                    </span>
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-[#102A56] leading-[1.35]">
                      {faq.q}
                    </h3>
                  </div>
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[12px] transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#102A56] text-[#E5F36D] rotate-180'
                        : 'bg-[#FFFFFF] border border-[#ADC3DE]/40 text-[#102A56]'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                    >
                      <div className="px-4 sm:px-5 pb-3.5 pt-1 text-[13px] sm:text-[13.5px] leading-[1.6] text-[#334155] border-t border-[#ADC3DE]/20">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Small Trust Note */}
        <div className="mt-8 text-center text-[11.5px] text-[#64748B] bg-[#F8FAFC] rounded-lg p-2.5 border border-[#ADC3DE]/30">
          <span>
            💡 <strong>GudTree Pledge:</strong> We never accept brand sponsorships. All guides are independently tested in real Indian home kitchens.
          </span>
        </div>
      </div>
    </section>
  );
}
