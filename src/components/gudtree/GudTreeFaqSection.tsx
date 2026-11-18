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
    category: 'Daily Diet & Munching',
    q: 'Agar wazan ghatana ho ya 4 PM office slump ho, toh chai ke sath kya khayein?',
    a: 'Samosa, rusk aur bakery ke digestive biscuits sabse pehle band karein. Uski jagah 1 mutthi roasted black chana (bhuna chana) ya desi ghee me bhuna sendha namak makhana lein. Inka glycemic index 35 se kam hota hai, jisse insulin spike nahi hota aur sham 7 baje tak aalas ya bhookh nahi lagti.',
  },
  {
    category: 'Market Labels & Truth',
    q: 'Kya packet par likha "Sugar-Free" ya "Baked Not Fried" sach me safe hota hai?',
    a: 'Bilkul nahi! 90% "Sugar-Free" biscuits aur namkeen me maltodextrin ya maltitol syrup daala jata hai jiska Glycemic Index normal chini se bhi jyada hota hai. Aur "Baked Not Fried" chips me crunch lane ke liye upar se 20% refined palm oil aur emulsifiers spray kiye jate hain. Hamesha peeche ka ingredient list check karein.',
  },
  {
    category: 'Drinks & Hangover',
    q: 'Daru ke hangover me subah kya peena chahiye aur kis cheez se bachna chahiye?',
    a: 'Hangover ke waqt kadak doodh wali chai, coffee ya khali pet paracetamol lene ki galti na karein — ye liver ko aur thaka deti hain aur acidity badhati hain. Sabse pehle taaza nariyal pani me 1 chutki sendha namak milakar piyein, ya thandi jeera chaas lein. Nariyal pani ka potassium aur jeera ka cooling effect 30 minute me sir dard aur dehydration shant karta hai.',
  },
  {
    category: 'Budget Protein',
    q: 'Hostel me bina gas chulhe ke ₹50 ke andar daily protein kaise pura karein?',
    a: 'Mehenge imported whey powder ki jarurat nahi hai. Thande pani me 2 chammach bhuna sattu gholein (18g protein, kharcha ₹15), 1 katori roasted peanuts khayein (12g protein, kharcha ₹15), aur 1 mutthi bhuna chana lein (8g protein, kharcha ₹10). Total ₹40 me 38g se 40g tak clean desi protein mil jata hai bina pachan kharab hue.',
  },
  {
    category: 'Kids Tiffin',
    q: 'Bache tiffin me roti-sabji chhod dete hain, tiffin dabba kaise healthy banayein?',
    a: 'Bacho ko dry roti-sabji thandi hone par pasand nahi aati. Isliye finger-friendly format chunein: jaise stone-ground wheat roti ke andar paneer bhurji ka roll, besan chilla ke chote square bites, ya ragi banana sweet coins. Ye dopehar 1 baje tak soft rehte hain aur bacha bina nakhre ke pura dabba khali karke laata hai.',
  },
  {
    category: 'PCOS & Hormones',
    q: 'PCOS me chin ke pimples aur pet ke fat ko kam karne ke liye kya khana chahiye?',
    a: 'PCOS me androgen testosterone badhne se acne aur belly fat banta hai. Subah ki meethi chai aur oats ki jagah namkeen besan chilla ya paneer nashta lein. Sham ko spearmint (pudina) chai piyein aur sunflower-pumpkin seeds ki cycling karein. 3 hafte me hormonal sujan (inflammation) aur pimples kam hone lagte hain.',
  },
  {
    category: 'Pet & Pachan',
    q: 'Khane ke baad kursi par baithne se pet tight kyu ho jata hai aur iska kya hal hai?',
    a: 'Dopehar ke khane ke turant baad baithne se pachan enzymes slow pad jate hain aur gas banti hai. Khane ke 20 minute baad 1 glass taaza mathi hui jeera chaas piyein ya 1 chammach bhiga hua sabja seed paani me lein. Khane ke baad 100 kadam walk karein aur lunch ke sath chilled soda ya cold drink bilkul na lein.',
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
      className="w-full max-w-full overflow-x-clip bg-[#FFFFFF] py-14 sm:py-20 border-t border-[#ADC3DE]/35"
    >
      <div className="max-w-[880px] mx-auto px-4 sm:px-5">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FF] text-[#2F54EB] text-[11px] font-bold uppercase tracking-[0.1em] mb-2.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? • Real Nutrition Answers</span>
          </span>
          <h2 className="gt-font-display text-[26px] sm:text-[36px] lg:text-[42px] leading-[1.12] tracking-[-0.02em] text-[#102A56]">
            Aapke Sabse Zyada Pooche Jane Wale Sawal
          </h2>
          <p className="mt-2 text-[14.5px] sm:text-[16px] text-[#334155] leading-[1.55]">
            Clean snacking, daily diet, label audits aur GudTree ke baare me sab kuch saaf-saaf bina kisi marketing dhokhe ke.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-[18px] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#FFF9EC] border-[#2F54EB]/40 shadow-[0_8px_20px_-6px_rgba(16,42,86,0.08)]'
                    : 'bg-[#F9FBFC] border-[#ADC3DE]/40 hover:border-[#ADC3DE]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1 pr-2">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#2F54EB] mb-1">
                      {faq.category}
                    </span>
                    <h3 className="text-[16px] sm:text-[17.5px] font-bold text-[#102A56] leading-[1.35]">
                      {faq.q}
                    </h3>
                  </div>
                  <span
                    className={`mt-1 shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#102A56] text-[#E5F36D] rotate-180'
                        : 'bg-[#FFFFFF] border border-[#ADC3DE]/50 text-[#102A56]'
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
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-[14px] sm:text-[15px] leading-[1.65] text-[#334155] border-t border-[#ADC3DE]/20 mt-1">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Small Trust Note at Bottom of FAQ */}
        <div className="mt-10 text-center text-[12.5px] text-[#64748B] bg-[#F5F7FA] rounded-xl p-3 border border-[#ADC3DE]/30">
          <span>
            💡 <strong>GudTree Pledge:</strong> Hum kisi FMCG brand se paise lekar unke packets promote nahi karte. Hamari sari recommendations independent kitchen testing par aadharit hain.
          </span>
        </div>
      </div>
    </section>
  );
}
