'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { Search, X, Bookmark, Clock, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article, Category } from '@/types';
import { CATEGORIES as INITIAL_CATEGORIES } from '@/data/categories';
import { getBlogUrl } from '@/lib/blogUrl';
import { normalizeCatName, formatNfDate } from '@/lib/newsflashFormat';
import EditorialTitle from './EditorialTitle';
import GudTreeImg from './GudTreeImg';
import { GT_SPRING } from './MotionPrimitives';

interface GudTreeArchiveClientProps {
  initialCategory?: string;
  initialArticles?: Article[];
  initialCategories?: Category[];
}

function normalizeKey(value?: string): string {
  return (value || '').toLowerCase().trim().replace(/[-\s_]/g, '');
}

function articleMatchesCategory(article: Article, targetNorm: string): boolean {
  if (!targetNorm || targetNorm === 'all') return true;
  if (normalizeKey(article.category) === targetNorm) return true;
  if (
    Array.isArray(article.categories) &&
    article.categories.some((c) => normalizeKey(c) === targetNorm)
  ) {
    return true;
  }
  return false;
}

function getScoreMeta(slug: string): { rating: string; mins: string } {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  const abs = Math.abs(hash);
  return {
    rating: `4.${[7, 8, 9, 8, 9][abs % 5]}`,
    mins: `${3 + (abs % 5)} min read`,
  };
}

export default function GudTreeArchiveClient({
  initialCategory,
  initialArticles,
  initialCategories,
}: GudTreeArchiveClientProps = {}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [articles] = useState<Article[]>(initialArticles || []);
  const [categories] = useState<Category[]>(
    initialCategories || INITIAL_CATEGORIES
  );
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  const resolveInitialCategory = () => {
    const paramCat = searchParams.get('category');
    if (paramCat) return paramCat.toLowerCase().trim();
    const pathCatMatch = pathname?.match(/^\/category\/([^/?#]+)/i);
    if (pathCatMatch?.[1]) return decodeURIComponent(pathCatMatch[1]).toLowerCase();
    return initialCategory ? initialCategory.toLowerCase().trim() : 'all';
  };

  const [activeCategory, setActiveCategory] = useState<string>(resolveInitialCategory);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') || '');
  const [visibleCount, setVisibleCount] = useState<number>(12);

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

  const visibleCats = useMemo(
    () => categories.filter((c) => c.slug !== 'home' && c.isVisible !== false),
    [categories]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: articles.length };
    visibleCats.forEach((cat) => {
      const norm = normalizeKey(cat.slug);
      counts[cat.slug] = articles.filter((a) =>
        articleMatchesCategory(a, norm)
      ).length;
    });
    return counts;
  }, [articles, visibleCats]);

  const filteredArticles = useMemo(() => {
    const normCat = normalizeKey(activeCategory);
    const q = searchQuery.trim().toLowerCase();

    return articles.filter((art) => {
      if (showSavedOnly && !savedSlugs.includes(art.slug)) return false;
      if (!articleMatchesCategory(art, normCat)) return false;
      if (q) {
        const hay = `${art.title} ${art.excerpt || ''} ${art.category || ''} ${art.keywords || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [articles, activeCategory, showSavedOnly, savedSlugs, searchQuery]);

  const isDedicatedCategoryRoute = pathname?.startsWith('/category/');

  return (
    <div className="w-full max-w-full min-w-0 overflow-hidden bg-[#FFF9EC] text-[#102A56]">
      {/* SCALLOPED SKY-BLUE COMPACT HERO HEADER (ONLY WHEN ON SINGLE-PAGE /news LIBRARY) */}
      {!isDedicatedCategoryRoute && (
        <section className="w-full max-w-full overflow-hidden bg-[#FFFFFF] px-2 sm:px-3.5 pt-0.5 pb-0">
          <div className="gt-hero-sky rounded-t-[16px] sm:rounded-t-[20px] flex flex-col items-center justify-center px-4 sm:px-6 pt-7 sm:pt-9 pb-12 sm:pb-14 text-center">
            <div aria-hidden="true" className="gt-hero-rays opacity-85" />

            <div className="relative z-10 max-w-2xl mx-auto w-full flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/18 backdrop-blur-md border border-white/25 text-[11.5px] font-semibold text-white mb-3">
                <BookOpen className="w-3.5 h-3.5 text-[#E5F36D]" />
                <span>Single-Page Blog Explorer • {articles.length} Guides</span>
              </div>

              <h1 className="gt-font-display text-[36px] sm:text-[48px] lg:text-[54px] leading-[1.0] tracking-[-0.03em] text-white">
                Clean Snacks &amp; Diet Library
              </h1>

              <p className="mt-2.5 text-[14.5px] sm:text-[16px] text-white/92 leading-[1.5] max-w-lg">
                Tap any category below to filter instant healthy eating blogs right here — zero extra pages.
              </p>

              {/* Inline Search Pill Inside Hero */}
              <div className="relative w-full max-w-lg mt-5">
                <Search className="w-4 h-4 text-[#DA440D] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search makhana, zero palm oil, ragi, seed cycling..."
                  className="w-full h-12 pl-11 pr-11 rounded-full bg-[#FFFFFF] border border-[#102A56]/10 text-[16px] sm:text-[14.5px] text-[#102A56] placeholder:text-[#526071] focus:outline-none focus:ring-2 focus:ring-[#E5F36D] shadow-[0_12px_28px_rgba(16,42,86,0.2)]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[#FFF9EC] text-[#526071] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Scalloped Bottom Wave Into Buttercream */}
            <div
              aria-hidden="true"
              className="absolute bottom-[-1px] left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10"
            >
              <svg
                viewBox="0 0 1440 38"
                preserveAspectRatio="none"
                className="w-full h-[22px] sm:h-[30px] md:h-[34px] block"
              >
                <defs>
                  <pattern
                    id="gt-archive-hero-wave"
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
                <rect x="0" y="0" width="1440" height="38" fill="url(#gt-archive-hero-wave)" />
              </svg>
            </div>
          </div>
        </section>
      )}

      {/* SINGLE-PAGE INTERACTIVE CATEGORY FILTER TABS + BLOG CARDS */}
      <div className="gt-container py-6 sm:py-10 overflow-hidden">
        {!isDedicatedCategoryRoute && (
          <div className="gt-hscroll-sm sm:flex sm:flex-wrap items-center justify-start sm:justify-center gap-2 pb-2 mb-6">
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setShowSavedOnly(false);
                setVisibleCount(12);
              }}
              className={`shrink-0 min-h-[44px] sm:min-h-0 px-3.5 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer border ${activeCategory === 'all' && !showSavedOnly
                ? 'bg-[#102A56] text-[#E5F36D] border-[#102A56] shadow-sm'
                : 'bg-[#FFFFFF] text-[#102A56] border-[#ADC3DE] hover:border-[#0944BA]'
                }`}
            >
              All Blogs ({categoryCounts.all || 0})
            </button>

            {visibleCats.map((cat) => {
              const isSelected =
                !showSavedOnly &&
                normalizeKey(activeCategory) === normalizeKey(cat.slug);
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.slug);
                    setShowSavedOnly(false);
                    setVisibleCount(12);
                  }}
                  className={`shrink-0 min-h-[44px] sm:min-h-0 px-3.5 py-2 rounded-full text-[13px] font-semibold transition-all cursor-pointer border ${isSelected
                    ? 'bg-[#102A56] text-[#E5F36D] border-[#102A56] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#102A56] border-[#ADC3DE] hover:border-[#0944BA]'
                    }`}
                >
                  {normalizeCatName(cat.name)} ({categoryCounts[cat.slug] || 0})
                </button>
              );
            })}

            {savedSlugs.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setShowSavedOnly((prev) => !prev);
                  setVisibleCount(12);
                }}
                className={`shrink-0 min-h-[44px] sm:min-h-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer border ${showSavedOnly
                  ? 'bg-[#0944BA] text-white border-[#0944BA] shadow-sm'
                  : 'bg-[#EEF4FF] text-[#0944BA] border-[#ADC3DE] hover:border-[#0944BA]'
                  }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>Saved ({savedSlugs.length})</span>
              </button>
            )}
          </div>
        )}

        {/* Instant Filtered Results */}
        {filteredArticles.length === 0 ? (
          <div className="p-12 rounded-[28px] bg-white border border-[#ADC3DE] text-center max-w-xl mx-auto">
            <h3 className="sc-display-h3 text-[#102A56] mb-2">
              No matching blogs found
            </h3>
            <p className="text-[15px] text-[#334155] mb-5">
              Try switching to All Blogs or clearing your search keywords.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setShowSavedOnly(false);
              }}
              className="px-6 py-2.5 rounded-full bg-[#DA440D] text-white text-[14px] font-semibold cursor-pointer"
            >
              Show All Blogs
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${showSavedOnly}-${searchQuery}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5"
            >
              {filteredArticles.slice(0, visibleCount).map((article, idx) => {
                const meta = getScoreMeta(article.slug);
                const isSaved = savedSlugs.includes(article.slug);
                return (
                  <motion.article
                    key={article.slug}
                    whileHover={{ y: -4 }}
                    transition={GT_SPRING}
                    className="group h-full min-w-0 flex flex-row sm:flex-col items-stretch gap-3 sm:gap-0 bg-[#FFFFFF] rounded-[20px] sm:rounded-[22px] p-2.5 sm:p-3.5 border border-[#ADC3DE]/45 hover:border-[#0944BA] hover:shadow-[0_14px_30px_-10px_rgba(16,42,86,0.12)] transition-all"
                  >
                    <div className="relative w-[112px] h-[106px] sm:w-full sm:h-auto sm:aspect-[16/10] shrink-0 rounded-[14px] sm:rounded-[16px] bg-[#F5F7FA] overflow-hidden sm:mb-3">
                      <Link
                        href={getBlogUrl(article)}
                        className="block w-full h-full no-underline"
                      >
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
                        aria-label="Bookmark blog"
                        className={`hidden sm:flex absolute top-2.5 right-2.5 w-8 h-8 rounded-full items-center justify-center backdrop-blur-md transition-colors cursor-pointer z-10 ${isSaved
                          ? 'bg-[#0944BA] text-white'
                          : 'bg-white/90 text-[#102A56]/75 hover:text-[#0944BA]'
                          }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="mb-1 sm:mb-1.5 flex items-center justify-between gap-2">
                        <span className="inline-block px-2 py-0.5 rounded-[6px] bg-[#EEF3FF] text-[#0944BA] text-[11px] font-semibold truncate">
                          {normalizeCatName(article.category)}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => toggleSave(e, article.slug)}
                          aria-label="Bookmark blog"
                          className={`sm:hidden w-8 h-8 shrink-0 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${isSaved
                            ? 'bg-[#0944BA] text-white border-[#0944BA]'
                            : 'bg-[#FFF9EC] text-[#102A56]/70 border-[#ADC3DE]/60'
                            }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      <Link href={getBlogUrl(article)} className="no-underline mb-1 sm:mb-2">
                        <EditorialTitle
                          title={article.title}
                          variant="compact"
                          as="h3"
                          className="text-[15px] sm:text-[16px] leading-[1.3] text-[#102A56] group-hover:text-[#0944BA] transition-colors line-clamp-2"
                        />
                      </Link>

                      {article.excerpt && (
                        <p className="hidden sm:block text-[13.5px] leading-[1.52] text-[#334155] line-clamp-2 mb-3 flex-1">
                          {article.excerpt}
                        </p>
                      )}

                      <div className="mt-auto pt-1.5 sm:pt-2 sm:border-t sm:border-[#ADC3DE]/30 flex items-center justify-between text-[11.5px] sm:text-[12px] font-medium text-[#526071]">
                        <span className="inline-flex items-center gap-1 font-semibold text-[#0944BA]">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime || meta.mins}</span>
                        </span>
                        <span className="text-[10px] sm:text-[10.5px] font-semibold text-[#15803D] bg-[#EAF7EE] px-2 py-0.5 rounded-full">
                          Clean Guide
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>

            {visibleCount < filteredArticles.length && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="px-7 py-3 rounded-full bg-[#102A56] hover:bg-[#DA440D] text-[#E5F36D] hover:text-white text-[14px] font-bold transition-colors cursor-pointer shadow-sm"
                >
                  Show More Guides ({filteredArticles.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
