'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bookmark, Clock, X, BookOpen } from 'lucide-react';
import { Article } from '@/types';
import { getBlogUrl } from '@/lib/blogUrl';
import { normalizeCatName, formatNfDate } from '@/lib/newsflashFormat';
import EditorialTitle from './EditorialTitle';
import GudTreeImg from './GudTreeImg';
import {
  MarqueeRibbon,
  GT_SPRING,
  GT_EASE,
} from './MotionPrimitives';
import { PATIENT_CONDITIONS } from './PatientConditionStrip';
import AudienceFocusCards from './AudienceFocusCards';
import BlogDiscoveryTabsShelf from './BlogDiscoveryTabsShelf';
import CuratedNeedsAndGuidesBand from './CuratedNeedsAndGuidesBand';
import HeroPlayfulMascots from './HeroPlayfulMascots';
import GudTreeFaqSection from './GudTreeFaqSection';

function getCardRating(slug: string): { rating: string; mins: string } {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  const abs = Math.abs(hash);
  const dec = [6, 7, 8, 9, 8][abs % 5];
  const mins = `${3 + (abs % 5)} min read`;
  return { rating: `4.${dec}`, mins };
}

function UnifiedCleanBlogCard({
  article,
  index,
  isSaved,
  onToggleSave,
}: {
  article: Article;
  index: number;
  isSaved: boolean;
  onToggleSave: (e: React.MouseEvent, slug: string) => void;
}) {
  const meta = getCardRating(article.slug);
  return (
    <article className="group h-full min-w-0 flex flex-col bg-[#FFFFFF] rounded-[18px] p-2.5 sm:p-3 border border-[#ADC3DE]/40 hover:border-[#2F54EB] hover:shadow-[0_14px_30px_-10px_rgba(16,42,86,0.12)] transition-all duration-300">
      <div className="relative w-full aspect-[16/10] rounded-[13px] bg-[#F5F7FA] overflow-hidden mb-2.5 border border-[#ADC3DE]/25">
        <Link
          href={getBlogUrl(article)}
          className="block w-full h-full no-underline"
          aria-label={article.title}
        >
          <GudTreeImg
            src={article.image}
            alt={article.title}
            fallbackIndex={index}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <button
          type="button"
          onClick={(e) => onToggleSave(e, article.slug)}
          title={isSaved ? 'Saved' : 'Bookmark Guide'}
          aria-label={isSaved ? 'Remove Bookmark' : 'Bookmark Guide'}
          className={`absolute top-2 right-2 w-10 h-10 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer z-10 ${isSaved
            ? 'bg-[#2F54EB] text-white shadow-sm'
            : 'bg-white/88 text-[#102A56]/75 hover:text-[#2F54EB]'
            }`}
        >
          <Bookmark className={`w-4 h-4 sm:w-3.5 sm:h-3.5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="mb-1.5">
        <span className="inline-block px-2 py-0.5 rounded-[5px] bg-[#EEF3FF] text-[#2F54EB] text-[11.5px] sm:text-[10.5px] font-semibold tracking-[-0.01em]">
          {normalizeCatName(article.category)}
        </span>
      </div>

      <Link href={getBlogUrl(article)} className="no-underline mb-2 flex-1">
        <EditorialTitle
          title={article.title}
          variant="compact"
          as="h3"
          className="text-[15px] sm:text-[15.5px] leading-[1.3] text-[#102A56] group-hover:text-[#2F54EB] transition-colors line-clamp-2"
        />
      </Link>

      <div className="mt-auto pt-1 flex items-center justify-between text-[11.5px] font-medium text-[#334155]">
        <span className="inline-flex items-center gap-1 text-[#0944BA] font-semibold">
          <Clock className="w-3 h-3" />
          <span>{article.readTime || meta.mins}</span>
        </span>
        <span className="text-[10.5px] font-semibold text-[#15803D] bg-[#EAF7EE] px-2 py-0.5 rounded-full">
          Clean Swap
        </span>
      </div>
    </article>
  );
}

export default function GudTreeHomeView({ articles }: { articles: Article[] }) {
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('gudtree_saved_blogs');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setSavedSlugs(parsed);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleSave = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedSlugs((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      try {
        localStorage.setItem('gudtree_saved_blogs', JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const safeArticles = useMemo(() => articles || [], [articles]);

  const activeConditionMeta = useMemo(
    () => PATIENT_CONDITIONS.find((c) => c.id === selectedCondition) || null,
    [selectedCondition]
  );

  // Category Section 1: Healthy Snacks & Condition Focus
  const snacksCategoryArticles = useMemo(() => {
    if (
      selectedCondition !== 'all' &&
      activeConditionMeta &&
      activeConditionMeta.keywords.length > 0
    ) {
      const matched = safeArticles.filter((a) => {
        const hay = `${a.title} ${a.category} ${a.excerpt || ''} ${a.tag || ''}`.toLowerCase();
        return activeConditionMeta.keywords.some((kw) => hay.includes(kw));
      });
      if (matched.length >= 4) return matched.slice(0, 4);
      const used = new Set(matched.map((x) => x.slug));
      return [...matched, ...safeArticles.filter((a) => !used.has(a.slug))].slice(0, 4);
    }

    const lifestyleOrFood = safeArticles.filter((a) => {
      const c = (a.category || '').toLowerCase();
      return c.includes('snack') || c.includes('label') || c.includes('pantry');
    });
    return (lifestyleOrFood.length >= 4 ? lifestyleOrFood : safeArticles).slice(0, 4);
  }, [safeArticles, selectedCondition, activeConditionMeta]);

  // Category Section 2: Gut Health & Clean Diet Guides
  const healthCategoryArticles = useMemo(() => {
    const usedSlugs = new Set(snacksCategoryArticles.map((a) => a.slug));
    const healthList = safeArticles.filter(
      (a) =>
        !usedSlugs.has(a.slug) &&
        ((a.category || '').toLowerCase().includes('gut') ||
          (a.category || '').toLowerCase().includes('diabet') ||
          (a.category || '').toLowerCase().includes('pcos') ||
          (a.category || '').toLowerCase().includes('heart'))
    );
    return (healthList.length >= 4
      ? healthList
      : safeArticles.filter((a) => !usedSlugs.has(a.slug))
    ).slice(0, 4);
  }, [safeArticles, snacksCategoryArticles]);

  // Kids & School Tiffin Articles
  const kidsCategoryArticles = useMemo(() => {
    return safeArticles.filter((a) => (a.category || '').toLowerCase().includes('kid')).slice(0, 4);
  }, [safeArticles]);

  // Gym & Budget Fitness Articles
  const gymCategoryArticles = useMemo(() => {
    return safeArticles.filter((a) => (a.category || '').toLowerCase().includes('gym')).slice(0, 4);
  }, [safeArticles]);

  // Drinks & Hangover Detox Articles
  const drinksCategoryArticles = useMemo(() => {
    return safeArticles.filter((a) => (a.category || '').toLowerCase().includes('drink')).slice(0, 4);
  }, [safeArticles]);

  // Market Packet Check Articles
  const marketCategoryArticles = useMemo(() => {
    return safeArticles.filter((a) => (a.category || '').toLowerCase().includes('market')).slice(0, 4);
  }, [safeArticles]);

  // Women's Care & Hormones Articles
  const womenCategoryArticles = useMemo(() => {
    return safeArticles.filter((a) => (a.category || '').toLowerCase().includes('women')).slice(0, 4);
  }, [safeArticles]);

  return (
    <div className="w-full max-w-full overflow-x-clip flex flex-col bg-[#FFF9EC] text-[#102A56]">
      {/* BAND 1: COMPACT SKY SUNBURST HERO — CENTERED 3D BLINKING CHARACTERS (NO BUTTON) */}
      <section className="w-full max-w-full overflow-x-clip bg-[#FFFFFF] px-2 sm:px-3.5 pt-0.5 pb-0">
        <div className="gt-hero-sky rounded-t-[16px] sm:rounded-t-[20px] flex flex-col items-center justify-center px-3 sm:px-6 pt-5 sm:pt-8 pb-8 sm:pb-12 text-center">
          <div aria-hidden="true" className="gt-hero-rays" />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: GT_EASE }}
            className="relative z-10 flex flex-col items-center max-w-4xl mx-auto w-full"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border-2 border-[#14181E] shadow-[0_3px_0_#14181E] text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.06em] text-[#102A56] mb-2.5 sm:mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#DA440D]" />
              <span>India's Clean Snacking &amp; Nutrition Guide</span>
            </div>

            <h1 className="gt-hero-comic-title text-[30px] sm:text-[46px] lg:text-[54px]">
              READ CLEAN. SNACK HONEST.
            </h1>

            <p className="mt-1.5 sm:mt-2 text-[13.5px] sm:text-[15.5px] font-medium text-[#FFFFFF] leading-[1.42] max-w-xl drop-shadow-[0_1px_2px_rgba(16,42,86,0.22)]">
              We audit packed Indian snacks, expose hidden sugars &amp; palm oil, and find healthy swaps your family will actually love.
            </p>

            {/* 4 Real-Blinking 3D Animated Characters (Eating, Reading, Exercising vs Junk Fatigue) */}
            <HeroPlayfulMascots />
          </motion.div>

          {/* Scalloped Wave Cutout */}
          <div
            aria-hidden="true"
            className="absolute bottom-[-1px] left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10"
          >
            <svg
              viewBox="0 0 1440 38"
              preserveAspectRatio="none"
              className="w-full h-[22px] sm:h-[30px] md:h-[36px] block"
            >
              <defs>
                <pattern
                  id="gt-hero-scallop-wave"
                  x="0"
                  y="0"
                  width="90"
                  height="38"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0,18 C22.5,38 22.5,38 45,18 C67.5,-2 67.5,-2 90,18 L90,38 L0,38 Z"
                    fill="#FFF9EC"
                  />
                </pattern>
              </defs>
              <rect
                x="0"
                y="0"
                width="1440"
                height="38"
                fill="url(#gt-hero-scallop-wave)"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* BAND 2: 5 SCALLOPED AUDIENCE / DIET / GUT HEALTH CARDS */}
      <AudienceFocusCards
        activeId={selectedCondition}
        onSelect={setSelectedCondition}
      />

      {/* BAND 3: CURVED FOLDER-TAB BLOG DISCOVERY SHELF */}
      <BlogDiscoveryTabsShelf articles={safeArticles} />

      {/* BAND 4: COLOR-CHANGED "READ BY NEEDS" + "DAILY GUIDES" + "QUICK DIET READS" */}
      <CuratedNeedsAndGuidesBand onSelectCondition={setSelectedCondition} />

      {/* BAND 5: MARQUEE SCROLL FLUSH WITH "QUICK DIET READS" EDGE */}
      <MarqueeRibbon
        className="mt-0 border-t-0"
        items={[
          'NO REFINED SUGAR',
          'ZERO PALM OIL',
          'PATIENT-SAFE SNACK AUDITS',
          'ROASTED MAKHANA & MILLETS',
          'REAL PALM JAGGERY (GUD)',
          'DIABETIC & PCOS FRIENDLY GUIDES',
        ]}
      />

      {/* BAND 6: CATEGORY 1 — CENTERED HEADER + UNIFIED CLEAN BLOG CARDS */}
      {snacksCategoryArticles.length > 0 && (
        <section
          id="health-goals"
          className="w-full max-w-full overflow-x-clip bg-[#FFFFFF] py-12 sm:py-16 scroll-mt-20 border-b border-[#ADC3DE]/35"
        >
          <div className="max-w-[1060px] mx-auto px-4 sm:px-5">
            {/* Centered Header Matching Rest of Site */}
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-[#EEF4FF] text-[#2F54EB] text-[11px] font-bold uppercase tracking-[0.1em] mb-2">
                {selectedCondition !== 'all' && activeConditionMeta
                  ? `Curated Focus • ${activeConditionMeta.giFocus}`
                  : 'Desk & Study Munches'}
              </span>
              <h2 className="gt-font-display text-[22px] sm:text-[32px] lg:text-[38px] leading-[1.12] tracking-[-0.02em] text-[#102A56]">
                {selectedCondition !== 'all' && activeConditionMeta
                  ? activeConditionMeta.label
                  : 'Desk & Study Munches'}
              </h2>
              <p className="mt-1.5 text-[13.5px] sm:text-[15px] text-[#334155] leading-[1.5]">
                {selectedCondition !== 'all' && activeConditionMeta
                  ? activeConditionMeta.hinglishHint
                  : 'Roasted makhana, millet crunch, and zero-palm-oil alternatives tested for daily tea-time.'}
              </p>

              {selectedCondition !== 'all' && (
                <div className="mt-3 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setSelectedCondition('all')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#102A56] text-[#E5F36D] text-[12px] font-semibold cursor-pointer hover:bg-[#DA440D] hover:text-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear Focus Filter</span>
                  </button>
                </div>
              )}
            </div>

            <div className="gt-hscroll-sm sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-2 sm:pb-0">
              {snacksCategoryArticles.map((article, idx) => (
                <div key={article.slug} className="w-[224px] sm:w-auto min-w-0">
                  <UnifiedCleanBlogCard
                    article={article}
                    index={idx}
                    isSaved={savedSlugs.includes(article.slug)}
                    onToggleSave={toggleSave}
                  />
                </div>
              ))}
            </div>

            <div className="mt-7 flex justify-center">
              <Link
                href="/category/clean-snacks"
                className="w-full sm:w-auto sm:min-w-[300px] h-11 px-8 rounded-full bg-[#EEF4FF] hover:bg-[#DCE8FF] text-[#2F54EB] text-[14px] font-bold inline-flex items-center justify-center gap-1.5 no-underline transition-colors"
              >
                <span>Explore Clean Snack Swaps</span>
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* BAND 7: CATEGORY 2 — CENTERED HEADER + BUTTERCREAM CANVAS + CLEAN BLOG CARDS */}
      {healthCategoryArticles.length > 0 && (
        <section className="w-full max-w-full overflow-x-clip bg-[#FFF9EC] py-12 sm:py-16">
          <div className="max-w-[1060px] mx-auto px-4 sm:px-5">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#ADC3DE]/60 text-[#DA440D] text-[11px] font-bold uppercase tracking-[0.1em] mb-2">
                Gut &amp; Bloat • Daily Digestion
              </span>
              <h2 className="gt-font-display text-[22px] sm:text-[32px] lg:text-[38px] leading-[1.12] tracking-[-0.02em] text-[#102A56]">
                Gut Health &amp; Bloat Relief
              </h2>
              <p className="mt-1.5 text-[13.5px] sm:text-[15px] text-[#334155] leading-[1.55]">
                Practical probiotic foods, low-GI meal ordering hacks, and label audits for Indian families.
              </p>
            </div>

            <div className="gt-hscroll-sm sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-2 sm:pb-0">
              {healthCategoryArticles.map((article, idx) => (
                <div key={article.slug} className="w-[224px] sm:w-auto min-w-0">
                  <UnifiedCleanBlogCard
                    article={article}
                    index={idx + 4}
                    isSaved={savedSlugs.includes(article.slug)}
                    onToggleSave={toggleSave}
                  />
                </div>
              ))}
            </div>

            <div className="mt-7 flex justify-center">
              <Link
                href="/category/gut-health"
                className="w-full sm:w-auto sm:min-w-[300px] h-11 px-8 rounded-full bg-[#102A56] hover:bg-[#DA440D] text-[#FFFFFF] text-[14px] font-semibold inline-flex items-center justify-center gap-1.5 no-underline transition-colors shadow-sm"
              >
                <span>Explore Gut &amp; Digestion Swaps</span>
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* BAND 8: KIDS & SCHOOL TIFFIN GUIDES */}
      {kidsCategoryArticles.length > 0 && (
        <section className="w-full max-w-full overflow-x-clip bg-[#FFFFFF] py-12 sm:py-16 border-b border-[#ADC3DE]/35">
          <div className="max-w-[1060px] mx-auto px-4 sm:px-5">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-[#EEF4FF] text-[#2F54EB] text-[11px] font-bold uppercase tracking-[0.1em] mb-2">
                Kids Tiffin &amp; Safe Treats
              </span>
              <h2 className="gt-font-display text-[22px] sm:text-[32px] lg:text-[38px] leading-[1.12] tracking-[-0.02em] text-[#102A56]">
                Kids School Lunchbox
              </h2>
              <p className="mt-1.5 text-[13.5px] sm:text-[15px] text-[#334155] leading-[1.55]">
                Fast, zero-maida lunchbox recipes and wholesome finger-foods your children will actually finish.
              </p>
            </div>

            <div className="gt-hscroll-sm sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-2 sm:pb-0">
              {kidsCategoryArticles.map((article, idx) => (
                <div key={article.slug} className="w-[224px] sm:w-auto min-w-0">
                  <UnifiedCleanBlogCard
                    article={article}
                    index={idx + 8}
                    isSaved={savedSlugs.includes(article.slug)}
                    onToggleSave={toggleSave}
                  />
                </div>
              ))}
            </div>

            <div className="mt-7 flex justify-center">
              <Link
                href="/category/kids-tiffin"
                className="w-full sm:w-auto sm:min-w-[300px] h-11 px-8 rounded-full bg-[#EEF4FF] hover:bg-[#DCE8FF] text-[#2F54EB] text-[14px] font-bold inline-flex items-center justify-center gap-1.5 no-underline transition-colors"
              >
                <span>Explore Kids &amp; Tiffin Guides</span>
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* BAND 9: BUDGET PROTEIN */}
      {gymCategoryArticles.length > 0 && (
        <section className="w-full max-w-full overflow-x-clip bg-[#FFF9EC] py-12 sm:py-16 border-b border-[#ADC3DE]/35">
          <div className="max-w-[1060px] mx-auto px-4 sm:px-5">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#ADC3DE]/60 text-[#DA440D] text-[11px] font-bold uppercase tracking-[0.1em] mb-2">
                Budget Protein • Daily Muscle Fuel
              </span>
              <h2 className="gt-font-display text-[22px] sm:text-[32px] lg:text-[38px] leading-[1.12] tracking-[-0.02em] text-[#102A56]">
                Budget Protein
              </h2>
              <p className="mt-1.5 text-[13.5px] sm:text-[15px] text-[#334155] leading-[1.55]">
                Affordable roasted sattu shakes, black chana, and clean peanut butter hacks for hostel and home gym.
              </p>
            </div>

            <div className="gt-hscroll-sm sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-2 sm:pb-0">
              {gymCategoryArticles.map((article, idx) => (
                <div key={article.slug} className="w-[224px] sm:w-auto min-w-0">
                  <UnifiedCleanBlogCard
                    article={article}
                    index={idx + 12}
                    isSaved={savedSlugs.includes(article.slug)}
                    onToggleSave={toggleSave}
                  />
                </div>
              ))}
            </div>

            <div className="mt-7 flex justify-center">
              <Link
                href="/category/weight-protein"
                className="w-full sm:w-auto sm:min-w-[300px] h-11 px-8 rounded-full bg-[#102A56] hover:bg-[#DA440D] text-[#FFFFFF] text-[14px] font-semibold inline-flex items-center justify-center gap-1.5 no-underline transition-colors shadow-sm"
              >
                <span>Explore Budget Protein &amp; Gym Guides</span>
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </div>
          </div>
        </section>
      )}


      {/* BAND 11: DRINKS, DETOX & HANGOVER RESET */}
      {drinksCategoryArticles.length > 0 && (
        <section className="w-full max-w-full overflow-x-clip bg-[#FFFFFF] py-12 sm:py-16 border-b border-[#ADC3DE]/35">
          <div className="max-w-[1060px] mx-auto px-4 sm:px-5">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-[#EEF4FF] text-[#2F54EB] text-[11px] font-bold uppercase tracking-[0.1em] mb-2">
                Sips &amp; Hangover Reset
              </span>
              <h2 className="gt-font-display text-[22px] sm:text-[32px] lg:text-[38px] leading-[1.12] tracking-[-0.02em] text-[#102A56]">
                Clean Sips &amp; Hangover Reset
              </h2>
              <p className="mt-1.5 text-[13.5px] sm:text-[15px] text-[#334155] leading-[1.55]">
                Headache-relieving electrolyte drinks, digestive buttermilk, and natural alternatives to chemical energy cans.
              </p>
            </div>

            <div className="gt-hscroll-sm sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pb-2 sm:pb-0">
              {drinksCategoryArticles.map((article, idx) => (
                <div key={article.slug} className="w-[224px] sm:w-auto min-w-0">
                  <UnifiedCleanBlogCard
                    article={article}
                    index={idx + 16}
                    isSaved={savedSlugs.includes(article.slug)}
                    onToggleSave={toggleSave}
                  />
                </div>
              ))}
            </div>

            <div className="mt-7 flex justify-center">
              <Link
                href="/category/heart-liver-care"
                className="w-full sm:w-auto sm:min-w-[300px] h-11 px-8 rounded-full bg-[#EEF4FF] hover:bg-[#DCE8FF] text-[#2F54EB] text-[14px] font-bold inline-flex items-center justify-center gap-1.5 no-underline transition-colors"
              >
                <span>Explore Drinks &amp; Detox Guides</span>
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* BAND 12: MARKET PACKET CHECK (BLINKIT & ZEPTO AUDITS) */}
      {marketCategoryArticles.length > 0 && (
        <section className="w-full max-w-full overflow-x-clip bg-[#FFF9EC] py-12 sm:py-16 border-b border-[#ADC3DE]/35">
          <div className="max-w-[1060px] mx-auto px-4 sm:px-5">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#ADC3DE]/60 text-[#DA440D] text-[11px] font-bold uppercase tracking-[0.1em] mb-2">
                Packet Truth • Quick Commerce Audits
              </span>
              <h2 className="gt-font-display text-[22px] sm:text-[32px] lg:text-[38px] leading-[1.12] tracking-[-0.02em] text-[#102A56]">
                Packaged Label Audits
              </h2>
              <p className="mt-1.5 text-[13.5px] sm:text-[15px] text-[#334155] leading-[1.55]">
                Spotting hidden palm oil, 60% maida in 'atta' biscuits, and deceptive sugar names on Blinkit and Zepto.
              </p>
            </div>

            <div className="gt-hscroll-sm sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-2 sm:pb-0">
              {marketCategoryArticles.map((article, idx) => (
                <div key={article.slug} className="w-[224px] sm:w-auto min-w-0">
                  <UnifiedCleanBlogCard
                    article={article}
                    index={idx + 20}
                    isSaved={savedSlugs.includes(article.slug)}
                    onToggleSave={toggleSave}
                  />
                </div>
              ))}
            </div>

            <div className="mt-7 flex justify-center">
              <Link
                href="/category/label-audits"
                className="w-full sm:w-auto sm:min-w-[300px] h-11 px-8 rounded-full bg-[#102A56] hover:bg-[#DA440D] text-[#FFFFFF] text-[14px] font-semibold inline-flex items-center justify-center gap-1.5 no-underline transition-colors shadow-sm"
              >
                <span>Explore Market Packet Audits</span>
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* BAND 13: WOMEN'S CARE & HORMONES */}
      {womenCategoryArticles.length > 0 && (
        <section className="w-full max-w-full overflow-x-clip bg-[#FFFFFF] py-12 sm:py-16 border-b border-[#ADC3DE]/35">
          <div className="max-w-[1060px] mx-auto px-4 sm:px-5">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-[#EEF4FF] text-[#2F54EB] text-[11px] font-bold uppercase tracking-[0.1em] mb-2">
                Women Care • Hormones &amp; Glow
              </span>
              <h2 className="gt-font-display text-[22px] sm:text-[32px] lg:text-[38px] leading-[1.12] tracking-[-0.02em] text-[#102A56]">
                PCOS &amp; Hormonal Health
              </h2>
              <p className="mt-1.5 text-[13.5px] sm:text-[15px] text-[#334155] leading-[1.55]">
                Cycle-synced seed blends, savoury protein breakfasts, and natural remedies for persistent chin acne.
              </p>
            </div>

            <div className="gt-hscroll-sm sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-2 sm:pb-0">
              {womenCategoryArticles.map((article, idx) => (
                <div key={article.slug} className="w-[224px] sm:w-auto min-w-0">
                  <UnifiedCleanBlogCard
                    article={article}
                    index={idx + 24}
                    isSaved={savedSlugs.includes(article.slug)}
                    onToggleSave={toggleSave}
                  />
                </div>
              ))}
            </div>

            <div className="mt-7 flex justify-center">
              <Link
                href="/category/pcos-hormones"
                className="w-full sm:w-auto sm:min-w-[300px] h-11 px-8 rounded-full bg-[#EEF4FF] hover:bg-[#DCE8FF] text-[#2F54EB] text-[14px] font-bold inline-flex items-center justify-center gap-1.5 no-underline transition-colors"
              >
                <span>Explore Women's Health &amp; PCOS Guides</span>
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* BAND 14: FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <GudTreeFaqSection />
    </div>
  );
}
