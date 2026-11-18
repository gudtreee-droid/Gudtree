'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, CheckCircle2, Lightbulb } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: string;
  tagColor: string;
  goldenRule: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'Daily Munching',
    tagColor: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
    q: 'What should I snack on during the 4 PM office slump?',
    goldenRule: 'Replace high-GI bakery biscuits with whole roasted black chana or ghee makhana.',
    a: 'Skip fried samosas, rusk, and digestive biscuits. Instead, pick a handful of dry-roasted black chana (bhuna chana) or ghee-roasted makhana. Their low glycemic index (< 35) prevents insulin spikes and eliminates the post-tea energy crash.',
  },
  {
    category: 'Label Audits',
    tagColor: 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]',
    q: 'Are "Sugar-Free" and "Baked Not Fried" snacks actually healthy?',
    goldenRule: 'Always check the back label for Maltodextrin and INS 150d caramel colour.',
    a: 'Rarely. Most "sugar-free" snacks replace sugar with maltodextrin or chemical syrups like maltitol, which spike blood glucose faster than table sugar. Meanwhile, "baked" chips are often flash-sprayed with 20% refined palm oil to achieve crunch.',
  },
  {
    category: 'Morning Reset',
    tagColor: 'bg-[#E0F2FE] text-[#075985] border-[#BAE6FD]',
    q: 'What is the fastest natural way to recover from an alcohol hangover?',
    goldenRule: 'Skip bed-tea & coffee. Drink fresh coconut water with a pinch of rock salt (sendha namak).',
    a: 'Caffeine worsens alcohol-induced dehydration and triggers severe acid reflux. Drink fresh tender coconut water with sendha namak or chilled roasted jeera chaas. The high potassium restores cellular hydration and clears brain fog in 30 minutes.',
  },
  {
    category: 'Budget Protein',
    tagColor: 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]',
    q: 'How can I hit 35g+ clean protein daily on a budget under ₹50?',
    goldenRule: 'Sattu drink (18g) + roasted peanuts (12g) + bhuna chana (8g) = ₹40 for 38g protein.',
    a: 'Mix 2 tablespoons of roasted sattu in chilled water (18g protein, ~₹15), have a small bowl of roasted peanuts (12g protein, ~₹15), and a handful of roasted chana (8g protein, ~₹10). That gives you ~38g of bioavailable plant protein without expensive whey.',
  },
  {
    category: 'Kids Lunchbox',
    tagColor: 'bg-[#F3E8FF] text-[#6B21A8] border-[#E9D5FF]',
    q: 'How do I pack a healthy school lunchbox kids will actually finish?',
    goldenRule: 'Make it finger-friendly: paneer wheat rolls, besan chilla bites, or ragi coin pancakes.',
    a: 'Kids dislike cold, soggy sabzi-roti. Switch to finger-friendly formats: whole wheat paneer bhurji rolls, square besan chilla bites, or naturally sweet ragi-banana mini pancakes that stay soft and fresh until lunch break.',
  },
  {
    category: 'Women’s Care & PCOS',
    tagColor: 'bg-[#FCE7F3] text-[#9D174D] border-[#FBCFE8]',
    q: 'What foods help reduce hormonal acne and belly bloat in PCOS?',
    goldenRule: 'Eat a savoury protein breakfast daily and drink spearmint tea for androgen control.',
    a: 'Start the day with a savoury, protein-rich breakfast like besan chilla or paneer to stabilize morning insulin. Incorporate spearmint tea and pumpkin-flax seed cycling to naturally reduce androgen levels and inflammatory breakouts.',
  },
  {
    category: 'Gut & Digestion',
    tagColor: 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
    q: 'Why does sitting at a desk cause bloating, and how can I fix it?',
    goldenRule: 'Drink 1 glass of fresh roasted jeera chaas 20 minutes after lunch; avoid ice-cold sodas.',
    a: 'Prolonged sitting slows digestive motility and traps gas in the intestines. Drink a glass of fresh roasted jeera chaas 20 minutes after lunch, take a brisk 5-minute walk, and avoid icy cold drinks or carbonated soda with meals.',
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
      className="w-full max-w-full overflow-x-clip py-14 sm:py-20 border-t border-[#ADC3DE]/40 relative"
      style={{
        backgroundColor: '#FDFBF7',
        backgroundImage: 'radial-gradient(#DECBB5 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <div className="max-w-[800px] mx-auto px-4 sm:px-5">
        {/* Playful & Clean Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-11">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border-2 border-[#14181E] shadow-[0_3px_0_#14181E] text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.06em] text-[#102A56] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#DA440D]" />
            <span>Nutrition FAQ • Real Direct Answers</span>
          </div>
          <h2 className="gt-hero-comic-title text-[24px] sm:text-[34px] lg:text-[38px] tracking-[0.01em] text-[#102A56]">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="mt-1 text-[13.5px] sm:text-[15px] text-[#475569] leading-[1.5]">
            No brand sponsorships, no marketing buzzwords. Just honest, practical nutrition answers.
          </p>
        </div>

        {/* Interactive Accordion Cards */}
        <div className="flex flex-col gap-3 sm:gap-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className={`transition-all duration-300 rounded-[18px] overflow-hidden ${
                  isOpen
                    ? 'bg-[#FFFFFF] border-2 border-[#102A56] shadow-[0_6px_0_#102A56]'
                    : 'bg-[#FFFFFF] border border-[#ADC3DE]/50 hover:border-[#102A56]/60 shadow-[0_2px_8px_rgba(16,42,86,0.04)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between gap-3 cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${faq.tagColor}`}
                      >
                        {faq.category}
                      </span>
                    </div>
                    <h3
                      className={`text-[14.5px] sm:text-[16px] font-bold leading-[1.3] transition-colors ${
                        isOpen
                          ? 'text-[#2F54EB]'
                          : 'text-[#102A56] group-hover:text-[#2F54EB]'
                      }`}
                    >
                      {faq.q}
                    </h3>
                  </div>

                  <span
                    className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#102A56] border-[#102A56] text-[#E5F36D] rotate-180 shadow-xs'
                        : 'bg-[#F8FAFC] border-[#ADC3DE]/50 text-[#102A56] group-hover:bg-[#EEF4FF] group-hover:text-[#2F54EB]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1.5 border-t border-[#F1F5F9]">
                        {/* Golden Rule Highlight Box */}
                        <div className="mb-2.5 p-2.5 sm:p-3 rounded-[12px] bg-[#EEF5EE] border border-[#15803D]/30 flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                          <div className="text-[12px] sm:text-[12.5px] text-[#0F5132] font-semibold leading-[1.4]">
                            <span className="font-bold text-[#15803D]">Key Takeaway: </span>
                            {faq.goldenRule}
                          </div>
                        </div>

                        {/* Detailed Explanation */}
                        <p className="text-[13px] sm:text-[14px] leading-[1.6] text-[#334155]">
                          {faq.a}
                        </p>

                        {/* Bottom Verified Badge */}
                        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-[#15803D]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Tested in real Indian home kitchens • Zero brand bias</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Small Trust Note */}
        <div className="mt-8 text-center text-[12px] text-[#64748B] bg-[#FFFFFF] rounded-xl p-3 border border-[#ADC3DE]/40 shadow-xs">
          <span>
            💡 <strong>GudTree Pledge:</strong> We never accept sponsorships from food brands. All recommendations are independently tested.
          </span>
        </div>
      </div>
    </section>
  );
}
