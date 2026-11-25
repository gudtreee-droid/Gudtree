'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Bookmark,
  Check,
  X,
  Plus,
  Minus,
  ChevronRight,
} from 'lucide-react';
import { Article } from '@/types';
import { FocusPageConfig, FOCUS_PAGES_MAP, FOCUS_SLUGS } from '@/data/focusPagesData';
import { getBlogUrl } from '@/lib/blogUrl';
import { normalizeCatName, formatNfDate } from '@/lib/newsflashFormat';
import EditorialTitle from './EditorialTitle';
import GudTreeImg from './GudTreeImg';
import { MarqueeRibbon, GT_SPRING, GT_EASE } from './MotionPrimitives';

function getScoreMeta(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return `${3 + (Math.abs(hash) % 5)} min read`;
}

function FocusHeroBackdrop({ slug }: { slug: FocusPageConfig['slug'] }) {
  if (slug === 'diabetes') {
    return (
      <>
        <motion.div
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full border-2 border-dashed border-white/25 pointer-events-none"
        />
        <motion.div
          aria-hidden="true"
          animate={{ rotate: -360 }}
          transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-white/20 pointer-events-none"
        />
      </>
    );
  }

  if (slug === 'heart') {
    return (
      <>
        <div className="gt-pattern-ripple-ring w-[300px] h-[300px]" />
        <div
          className="gt-pattern-ripple-ring w-[480px] h-[480px]"
          style={{ animationDelay: '1.5s' }}
        />
        <div
          className="gt-pattern-ripple-ring w-[680px] h-[680px]"
          style={{ animationDelay: '3s' }}
        />
      </>
    );
  }

  if (slug === 'gut') {
    return <div aria-hidden="true" className="absolute inset-0 gt-pattern-stripes pointer-events-none" />;
  }

  if (slug === 'pcos') {
    return <div aria-hidden="true" className="absolute inset-0 gt-pattern-dots pointer-events-none" />;
  }

  return <div aria-hidden="true" className="absolute inset-0 gt-pattern-grid pointer-events-none" />;
}

const HERO_CLASS_MAP: Record<FocusPageConfig['slug'], string> = {
  diabetes: 'gt-focus-hero-diabetes',
  heart: 'gt-focus-hero-heart',
  gut: 'gt-focus-hero-gut',
  pcos: 'gt-focus-hero-pcos',
  weight: 'gt-focus-hero-weight',
};

export default function SundayCrumbFocusPage({
  config,
  articles,
}: {
  config: FocusPageConfig;
  articles: Article[];
}) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [routineTab, setRoutineTab] = useState<'swaps' | 'checklist'>('swaps');
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('gudtree_saved_blogs');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setSavedSlugs(parsed);
      }
    } catch {
      // ignore storage failure
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
        // ignore storage failure
      }
      return next;
    });
  };

  const curatedBlogs = useMemo(() => {
    const safe = articles || [];
    if (safe.length === 0) return [];
    const matched = safe.filter((a) => {
      const hay = `${a.title} ${a.category} ${a.excerpt || ''} ${a.tag || ''}`.toLowerCase();
      return config.keywords.some((kw) => hay.includes(kw));
    });
    const used = new Set(matched.map((m) => m.slug));
    const filler = safe.filter((a) => !used.has(a.slug));
    return [...matched, ...filler].slice(0, 7);
  }, [articles, config.keywords]);

  const topShowcaseBlogs = curatedBlogs.slice(0, 3);
  const moreBlogs = curatedBlogs.slice(3, 7);

  return (
    <div className="w-full max-w-full overflow-x-clip flex flex-col bg-[#FFF9EC] text-[#102A56]">
      {/* ====================================================================
          SECTION 1: DISTINCT COLOR + UNIQUE PATTERN HERO (EXACT LANDING HEIGHT)
         ==================================================================== */}
      <section className="w-full max-w-full overflow-x-clip bg-[#FFFFFF] px-2 sm:px-3.5 pt-0.5 pb-0">
        <div
          className={`relative overflow-hidden rounded-t-[16px] sm:rounded-t-[20px] flex flex-col items-center justify-center px-4 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-12 text-center ${HERO_CLASS_MAP[config.slug]}`}
        >
          {/* Unique Motion Pattern Per Page */}
          <FocusHeroBackdrop slug={config.slug} />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: GT_EASE }}
            className="relative z-10 flex flex-col items-center max-w-2xl mx-auto w-full"
          >
            {/* Clean Translucent Breadcrumb Pill */}
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/18 backdrop-blur-md border border-white/25 text-[11.5px] font-semibold text-white mb-3.5"
            >
              <Link href="/" className="hover:text-[#E5F36D] no-underline text-white/90">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-white/70" />
              <span>{config.title}</span>
            </nav>

            {/* Clean Stroke-Free Sunday Crumb Lilita One Title */}
            <h1 className="gt-font-display text-[38px] sm:text-[50px] lg:text-[58px] leading-[0.98] tracking-[-0.03em] text-white">
              {config.heroTitle}
            </h1>

            <p className="mt-2.5 text-[14.5px] sm:text-[16px] font-normal text-white/90 leading-[1.5] max-w-lg">
              {config.heroSubtitle}
            </p>

            {/* Floating Food Visual */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="my-4 sm:my-5"
            >
              <img
                src={config.imageSrc}
                alt={config.title}
                className="w-[108px] sm:w-[132px] h-auto drop-shadow-[0_16px_26px_rgba(0,0,0,0.28)] pointer-events-none"
              />
            </motion.div>

            {/* Clean Minimalist Anchor Links (Horizontal Swipe Pills on Mobile) */}
            <div className="gt-hscroll-sm sm:flex sm:flex-wrap items-center justify-start sm:justify-center gap-2 pb-1 sm:pb-0">
              <a
                href="#deep-info"
                className="whitespace-nowrap px-4 py-2 sm:py-1.5 rounded-full bg-[#FFFFFF] text-[#102A56] hover:bg-[#E5F36D] text-[12.5px] font-semibold no-underline transition-colors"
              >
                Diet Info
              </a>
              <a
                href="#best-guides"
                className="whitespace-nowrap px-4 py-2 sm:py-1.5 rounded-full bg-white/16 hover:bg-white/25 text-white border border-white/25 text-[12.5px] font-medium no-underline transition-colors"
              >
                Curated Blogs
              </a>
              <a
                href="#swap-routine"
                className="whitespace-nowrap px-4 py-2 sm:py-1.5 rounded-full bg-white/16 hover:bg-white/25 text-white border border-white/25 text-[12.5px] font-medium no-underline transition-colors"
              >
                Daily Swaps
              </a>
              <a
                href="#timing-guide"
                className="whitespace-nowrap px-4 py-2 sm:py-1.5 rounded-full bg-white/16 hover:bg-white/25 text-white border border-white/25 text-[12.5px] font-medium no-underline transition-colors"
              >
                Snack Schedule
              </a>
            </div>
          </motion.div>

          {/* Bottom Scalloped Wave */}
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
                  id={`gt-focus-wave-${config.slug}`}
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
                fill={`url(#gt-focus-wave-${config.slug})`}
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2: CLEAN SUNDAY CRUMB EDITORIAL INFO SPREAD (#FFF9EC)
         ==================================================================== */}
      <section id="deep-info" className="gt-container py-16 sm:py-24 scroll-mt-20">
        <div className="max-w-3xl mb-12">
          <h2 className="sc-display-h2 text-[#102A56]">
            {config.aboutHeadlineLine1}
            <br />
            <span className="text-[#DA440D]">{config.aboutHeadlineLine2}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 min-w-0">
            <div className="rounded-[28px] bg-[#FFFFFF] border border-[#102A56]/10 p-8 sm:p-10 flex flex-col items-center text-center shadow-[0_10px_30px_-10px_rgba(16,42,86,0.08)]">
              <img
                src={config.imageSrc}
                alt={config.title}
                className="w-[155px] h-[155px] object-contain mb-5 pointer-events-none"
              />
              <div className="gt-font-display text-[28px] text-[#0944BA] leading-none">
                {config.statHighlight}
              </div>
              <p className="mt-2 text-[14px] text-[#334155] leading-relaxed max-w-[240px]">
                {config.statLabel}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0 flex flex-col gap-5">
            <p className="sc-lead text-[#102A56]">{config.aboutParagraph1}</p>
            <p className="sc-body text-[#334155]">{config.aboutParagraph2}</p>

            <div className="pt-2">
              <a
                href="#swap-routine"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#102A56] hover:bg-[#DA440D] text-[#E5F36D] hover:text-white gt-font-display text-[16px] tracking-[-0.02em] no-underline transition-colors"
              >
                <span>Explore Clean Swaps</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 3: CURATED BLOGS COUNTER SHOWCASE (#D6EDFF SOFT SKY)
         ==================================================================== */}
      {topShowcaseBlogs.length > 0 && (
        <section
          id="best-guides"
          className="w-full bg-[#D6EDFF] py-16 sm:py-24 scroll-mt-20"
        >
          <div className="gt-container">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <h2 className="sc-display-h2 text-[#102A56]">
                  Top {config.title} Blogs
                </h2>
                <p className="mt-2 sc-lead text-[#102A56]/75 max-w-xl">
                  Honest nutrition reading, back-of-pack checks, and clean snack swaps.
                </p>
              </div>
            </div>

            <div className="gt-hscroll-md md:grid md:grid-cols-3 gap-4 md:gap-6 pb-2 md:pb-0">
              {topShowcaseBlogs.map((article, idx) => {
                const isSaved = savedSlugs.includes(article.slug);
                const mins = getScoreMeta(article.slug);
                return (
                  <motion.article
                    key={article.slug}
                    whileHover={{ y: -5 }}
                    transition={GT_SPRING}
                    className="group w-[252px] md:w-auto min-w-0 flex flex-col bg-[#FFF9EC] rounded-[22px] p-4 sm:p-5 border border-[#102A56]/10 shadow-[0_8px_24px_-8px_rgba(16,42,86,0.08)]"
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[12px] font-bold text-[#0944BA]">
                        {normalizeCatName(article.category)}
                      </span>
                      <span className="text-[12px] text-[#334155]">
                        {article.readTime || mins}
                      </span>
                    </div>

                    <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden bg-[#FFFFFF] mb-4">
                      <Link href={getBlogUrl(article)} className="block w-full h-full no-underline">
                        <GudTreeImg
                          src={article.image}
                          alt={article.title}
                          fallbackIndex={idx}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => toggleSave(e, article.slug)}
                        aria-label="Bookmark guide"
                        className={`absolute top-2 right-2 w-10 h-10 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer ${isSaved
                          ? 'bg-[#0944BA] text-white'
                          : 'bg-white/90 text-[#102A56]/75 hover:text-[#0944BA]'
                          }`}
                      >
                        <Bookmark className={`w-4 h-4 sm:w-3.5 sm:h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <Link href={getBlogUrl(article)} className="no-underline mb-2 block shrink-0">
                      <EditorialTitle
                        title={article.title}
                        variant="card"
                        as="h3"
                        className="text-[17.5px] leading-[1.32] text-[#102A56] group-hover:text-[#0944BA] transition-colors line-clamp-2 overflow-hidden"
                      />
                    </Link>

                    {article.excerpt && (
                      <p className="text-[14px] leading-[1.55] text-[#334155] line-clamp-2 mt-auto">
                        {article.excerpt}
                      </p>
                    )}
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================
          SECTION 4: SUNDAY CRUMB CLEAN SWAPS & CHECKLIST (#FFF9EC)
         ==================================================================== */}
      <section id="swap-routine" className="gt-container py-16 sm:py-24 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="sc-display-h2 text-[#102A56]">How to Eat Clean</h2>
            <p className="mt-2 sc-lead max-w-xl">
              Simple daily swaps and label rules you can start today.
            </p>
          </div>

          <div className="inline-flex p-1 rounded-full bg-[#FFFFFF] border border-[#102A56]/12 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setRoutineTab('swaps')}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors cursor-pointer ${routineTab === 'swaps'
                ? 'bg-[#102A56] text-[#FFF9EC]'
                : 'text-[#334155] hover:text-[#102A56]'
                }`}
            >
              Daily Swaps
            </button>
            <button
              type="button"
              onClick={() => setRoutineTab('checklist')}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors cursor-pointer ${routineTab === 'checklist'
                ? 'bg-[#102A56] text-[#FFF9EC]'
                : 'text-[#334155] hover:text-[#102A56]'
                }`}
            >
              Ingredient Rules
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {routineTab === 'swaps' ? (
            <motion.div
              key="swaps"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {config.dailySwaps.map((row) => (
                <div
                  key={row.occasion}
                  className="rounded-[24px] bg-[#FFFFFF] border border-[#102A56]/10 p-6 sm:p-7 flex flex-col justify-between gap-5"
                >
                  <div>
                    <h3 className="sc-display-h3 text-[#102A56] mb-4">{row.occasion}</h3>

                    <div className="space-y-3">
                      <div className="flex items-start gap-2.5 text-[14px] text-[#334155]">
                        <X className="w-4 h-4 text-[#DA440D] mt-0.5 shrink-0" />
                        <span>{row.avoid}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-[14.5px] font-semibold text-[#102A56]">
                        <Check className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0" />
                        <span>{row.swapTo}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[13px] text-[#334155] leading-relaxed pt-4 border-t border-[#102A56]/8">
                    {row.whyItWorks}
                  </p>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="checklist"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="rounded-[24px] bg-[#FFFFFF] border border-[#102A56]/10 p-7 sm:p-8">
                <h3 className="sc-display-h3 text-[#DA440D] mb-4">
                  {config.whyProblemHeadline}
                </h3>
                <ul className="space-y-3.5 text-[14.5px] text-[#102A56]">
                  {config.avoidIngredients.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <X className="w-4 h-4 text-[#DA440D] mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[24px] bg-[#FFFFFF] border border-[#102A56]/10 p-7 sm:p-8">
                <h3 className="sc-display-h3 text-[#102A56] mb-4">
                  Clean Pantry Staples
                </h3>
                <ul className="space-y-3.5 text-[14.5px] text-[#102A56]">
                  {config.recommendedSnacks.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#15803D] mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ====================================================================
          SECTION 5: SUNDAY CRUMB SCALLOPED SAGE BAND + TIMING TABLE (#DFE5D7)
         ==================================================================== */}
      <section
        id="timing-guide"
        className="w-full relative bg-[#DFE5D7] pt-20 pb-16 sm:pt-24 sm:pb-24 scroll-mt-20"
      >
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none"
        >
          <svg
            viewBox="0 0 1440 34"
            preserveAspectRatio="none"
            className="w-full h-[20px] sm:h-[28px] block"
          >
            <defs>
              <pattern
                id={`gt-sage-wave-${config.slug}`}
                x="0"
                y="0"
                width="90"
                height="34"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0,18 C22.5,34 22.5,34 45,18 C67.5,2 67.5,2 90,18 L90,0 L0,0 Z"
                  fill="#FFF9EC"
                />
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="1440"
              height="34"
              fill={`url(#gt-sage-wave-${config.slug})`}
            />
          </svg>
        </div>

        <div className="gt-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 min-w-0">
            <h2 className="sc-display-h2 text-[#102A56]">
              Come to a cleaner routine.
            </h2>
            <p className="mt-3 sc-lead text-[#102A56]/75">
              Measured everyday portions timed to keep cravings calm from morning chai through dinner.
            </p>
            <div className="mt-7">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#102A56] hover:bg-[#DA440D] text-[#E5F36D] hover:text-white gt-font-display text-[16px] no-underline transition-colors"
              >
                <span>Browse All Blogs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0">
            <div className="rounded-[28px] bg-[#FFF9EC] border border-[#102A56]/10 p-6 sm:p-9">
              <h3 className="sc-display-h3 text-[#102A56] pb-4 mb-2 border-b border-[#102A56]/12">
                Daily Snacking Clock
              </h3>

              <div className="divide-y divide-[#102A56]/10">
                {config.timingSchedule.map((slot) => (
                  <div
                    key={slot.timeSlot}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-semibold text-[15px] text-[#102A56]">
                        {slot.timeSlot}
                      </div>
                      <div className="text-[14px] text-[#334155] mt-0.5">{slot.idealPick}</div>
                    </div>
                    <span className="self-start sm:self-center shrink-0 text-[13px] font-bold text-[#0944BA]">
                      {slot.portion}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 6: TICKER + CLEAN 4-COLUMN MORE BLOGS (#FFF9EC)
         ==================================================================== */}
      <MarqueeRibbon items={config.marqueeItems} className="mt-0" />

      {moreBlogs.length > 0 && (
        <section className="gt-container py-16 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="sc-display-h2 text-[#102A56]">More {config.title} Reads</h2>
            <p className="mt-2 sc-lead">
              Fresh snack audits, kitchen guides, and everyday clean eating stories.
            </p>
          </div>

          <div className="gt-hscroll-sm sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 pb-2 sm:pb-0">
            {moreBlogs.map((article, idx) => {
              const mins = getScoreMeta(article.slug);
              return (
                <article
                  key={article.slug}
                  className="group h-full w-[224px] sm:w-auto min-w-0 flex flex-col bg-[#FFFFFF] rounded-[18px] p-2.5 sm:p-3.5 border border-[#102A56]/10 hover:border-[#0944BA] transition-all"
                >
                  <Link
                    href={getBlogUrl(article)}
                    className="block w-full aspect-[16/10] rounded-[14px] bg-[#F5F7FA] overflow-hidden mb-3 no-underline"
                  >
                    <GudTreeImg
                      src={article.image}
                      alt={article.title}
                      fallbackIndex={idx + 3}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <span className="text-[11px] font-bold text-[#0944BA] mb-1">
                    {normalizeCatName(article.category)}
                  </span>

                  <Link href={getBlogUrl(article)} className="no-underline mb-2 block shrink-0">
                    <EditorialTitle
                      title={article.title}
                      variant="compact"
                      as="h3"
                      className="text-[15.5px] leading-[1.32] text-[#102A56] group-hover:text-[#0944BA] transition-colors line-clamp-2 overflow-hidden"
                    />
                  </Link>

                  <div className="mt-auto text-[12px] font-medium text-[#0944BA]">
                    {article.readTime || mins}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* ====================================================================
          SECTION 7: CLEAN HAIRLINE FAQ ACCORDION + OTHER HUBS (#FFFFFF)
         ==================================================================== */}
      <section className="w-full bg-[#FFFFFF] border-t border-[#102A56]/10 py-16 sm:py-24">
        <div className="gt-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5 min-w-0">
            <h2 className="sc-display-h2 text-[#102A56]">
              A few facts you need to know.
            </h2>
            <p className="mt-3 sc-lead">
              Quick answers on labels, safe portions, and everyday clean snacks.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#102A56] hover:bg-[#DA440D] text-[#FFF9EC] gt-font-display text-[15px] no-underline transition-colors"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0 divide-y divide-[#102A56]/12 border-t border-b border-[#102A56]/12">
            {config.faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={faq.q} className="bg-transparent">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer bg-transparent border-0"
                  >
                    <span className="font-semibold text-[16px] sm:text-[17px] text-[#102A56]">
                      {faq.q}
                    </span>
                    <span className="text-[#102A56] shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 text-[14.5px] leading-[1.6] text-[#334155] pr-6">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clean Hub Switcher */}
        <div className="gt-container mt-14 pt-10 border-t border-[#102A56]/10 text-center">
          <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#334155] mb-4">
            Other Diet &amp; Clean Snack Hubs
          </div>
          <div className="gt-hscroll-sm sm:flex sm:flex-wrap items-center justify-start sm:justify-center gap-2 sm:gap-2.5 pb-1 sm:pb-0">
            {FOCUS_SLUGS.map((slug) => {
              const item = FOCUS_PAGES_MAP[slug];
              const isCurrent = slug === config.slug;
              return (
                <Link
                  key={slug}
                  href={`/focus/${slug}`}
                  className={`whitespace-nowrap px-4 py-2.5 sm:py-2 rounded-full text-[13px] font-semibold no-underline transition-colors ${isCurrent
                    ? 'bg-[#102A56] text-[#E5F36D]'
                    : 'bg-[#FFF9EC] text-[#102A56] hover:bg-[#D6EDFF]'
                    }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
