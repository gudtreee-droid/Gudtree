'use client';

import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import Link from 'next/link';
import { Clock, Bookmark } from 'lucide-react';
import { Article, Category } from '@/types';
import { getBlogUrl } from '@/lib/blogUrl';
import GudTreeImg from './GudTreeImg';

export interface CategoryShelfTab {
  id: string;
  label: string;
  thumbSrc: string;
  slug: string;
  href: string;
  categoryNames: string[];
}

export const CATEGORY_SHELF_TABS: CategoryShelfTab[] = [
  {
    id: 'kids-tiffin',
    label: 'Kids Tiffin',
    thumbSrc: '/images/categories/kids-tiffin.svg',
    slug: 'kids-tiffin',
    href: '/category/kids-tiffin',
    categoryNames: ['Kids Tiffin', 'kids-tiffin'],
  },
  {
    id: 'clean-snacks',
    label: 'Desk Munches',
    thumbSrc: '/images/card-diabetes.webp',
    slug: 'clean-snacks',
    href: '/category/clean-snacks',
    categoryNames: ['Desk Munches', 'clean-snacks'],
  },
  {
    id: 'weight-protein',
    label: 'Daily Protein',
    thumbSrc: '/images/card-weight.webp',
    slug: 'weight-protein',
    href: '/category/weight-protein',
    categoryNames: ['Gym & Protein', 'weight-protein', 'Daily Protein'],
  },
  {
    id: 'heart-liver-care',
    label: 'Sips & Reset',
    thumbSrc: '/images/card-heart.webp',
    slug: 'heart-liver-care',
    href: '/category/heart-liver-care',
    categoryNames: ['Sips & Hangover', 'heart-liver-care', 'Sips & Reset'],
  },
  {
    id: 'pcos-hormones',
    label: "Women's Health",
    thumbSrc: '/images/card-pcos.webp',
    slug: 'pcos-hormones',
    href: '/category/pcos-hormones',
    categoryNames: ['Women Care', 'pcos-hormones', "Women's Health"],
  },
  {
    id: 'gut-health',
    label: 'Gut & Bloat',
    thumbSrc: '/images/card-gut.webp',
    slug: 'gut-health',
    href: '/category/gut-health',
    categoryNames: ['Gut & Bloat', 'gut-health'],
  },
  {
    id: 'label-audits',
    label: 'Packet Truth',
    thumbSrc: '/images/categories/label-audits.svg',
    slug: 'label-audits',
    href: '/category/label-audits',
    categoryNames: ['Packet Truth', 'label-audits'],
  },
  {
    id: 'diabetes-low-gi',
    label: 'Low Sugar',
    thumbSrc: '/images/categories/low-sugar.svg',
    slug: 'diabetes-low-gi',
    href: '/category/diabetes-low-gi',
    categoryNames: ['Low-Sugar Crunch', 'diabetes-low-gi', 'Low Sugar'],
  },
  {
    id: 'desi-pantry',
    label: 'Clean Pantry',
    thumbSrc: '/images/categories/clean-pantry.svg',
    slug: 'desi-pantry',
    href: '/category/desi-pantry',
    categoryNames: ['Fasting Munch', 'desi-pantry', 'Clean Pantry'],
  },
];

interface Props {
  currentSlug: string;
  categoryObj?: Category;
  initialArticles: Article[];
  allArticles: Article[];
  categories: Category[];
  initialSub?: string;
}

function normalizeKey(str?: string): string {
  return (str || '').toLowerCase().trim().replace(/[-\s_&]/g, '');
}

export default function GudTreeCategoryPageView({
  currentSlug,
  categoryObj,
  initialArticles,
  allArticles,
}: Props) {
  // Resolve initial active tab based on currentSlug
  const initialActive = useMemo(() => {
    const target = normalizeKey(currentSlug);
    return (
      CATEGORY_SHELF_TABS.find(
        (t) =>
          normalizeKey(t.slug) === target ||
          normalizeKey(t.label) === target ||
          t.categoryNames.some((n) => normalizeKey(n) === target)
      ) || CATEGORY_SHELF_TABS[0]
    );
  }, [currentSlug]);

  const [currentActiveTab, setCurrentActiveTab] = useState<CategoryShelfTab>(initialActive);
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  // Folder curve measurements for original continuous curve
  const [curveMetrics, setCurveMetrics] = useState<{
    trackWidth: number;
    trackHeight: number;
    activeLeft: number;
    activeWidth: number;
  } | null>(null);

  const tabsTrackRef = useRef<HTMLDivElement | null>(null);
  const tabButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    setCurrentActiveTab(initialActive);
  }, [initialActive]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('gudtree_saved_blogs');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setSavedSlugs(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const target = normalizeKey(path.replace('/category/', ''));
      const found = CATEGORY_SHELF_TABS.find(
        (t) =>
          normalizeKey(t.slug) === target ||
          normalizeKey(t.label) === target ||
          t.categoryNames.some((n) => normalizeKey(n) === target)
      );
      if (found) {
        setCurrentActiveTab(found);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const measureCurve = useCallback(() => {
    const track = tabsTrackRef.current;
    const btn = tabButtonRefs.current[currentActiveTab.id];
    if (!track || !btn) return;

    const firstTab = CATEGORY_SHELF_TABS[0];
    const lastTab = CATEGORY_SHELF_TABS[CATEGORY_SHELF_TABS.length - 1];
    const firstBtn = tabButtonRefs.current[firstTab.id];
    const lastBtn = tabButtonRefs.current[lastTab.id];

    // Left and right padding: strictly ends where the last button ends + symmetric margin
    const padding = firstBtn ? firstBtn.offsetLeft : 12;
    const contentWidth = lastBtn
      ? lastBtn.offsetLeft + lastBtn.offsetWidth + padding
      : track.clientWidth;
    const trackWidth = Math.max(track.clientWidth, contentWidth);
    const trackHeight = track.offsetHeight;
    const activeLeft = btn.offsetLeft;
    const activeWidth = btn.offsetWidth;

    if (trackWidth > 0 && activeWidth > 0) {
      setCurveMetrics({
        trackWidth,
        trackHeight,
        activeLeft,
        activeWidth,
      });
    }
  }, [currentActiveTab.id]);

  useLayoutEffect(() => {
    measureCurve();
  }, [measureCurve]);

  useEffect(() => {
    const track = tabsTrackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(() => measureCurve());
    ro.observe(track);
    window.addEventListener('resize', measureCurve);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measureCurve);
    };
  }, [measureCurve]);

  // Horizontally center active tab into view WITHOUT vertical window scroll
  const scrollActiveTabIntoView = useCallback((tabId: string) => {
    const track = tabsTrackRef.current;
    const btn = tabButtonRefs.current[tabId];
    if (!track || !btn) return;

    const lastTab = CATEGORY_SHELF_TABS[CATEGORY_SHELF_TABS.length - 1];
    const lastBtn = tabButtonRefs.current[lastTab.id];
    const totalContentWidth = lastBtn ? lastBtn.offsetLeft + lastBtn.offsetWidth + 16 : track.scrollWidth;
    const maxScroll = Math.max(0, totalContentWidth - track.clientWidth);

    if (maxScroll > 2) {
      const btnLeft = btn.offsetLeft;
      const idealLeft = btnLeft - (track.clientWidth - btn.offsetWidth) / 2;
      const targetLeft = Math.max(0, Math.min(maxScroll, idealLeft));
      track.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollActiveTabIntoView(currentActiveTab.id);
  }, [currentActiveTab.id, scrollActiveTabIntoView]);

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
        // ignore
      }
      return next;
    });
  };

  const handleTabClick = (e: React.MouseEvent, tab: CategoryShelfTab) => {
    e.preventDefault();
    if (tab.id === currentActiveTab.id) return;

    setCurrentActiveTab(tab);
    scrollActiveTabIntoView(tab.id);

    // Cleanly update URL without triggering Next.js full unmount/scroll
    window.history.pushState(null, '', tab.href);
  };

  // Filter articles based on active category
  const displayedArticles = useMemo(() => {
    const targetKeys = new Set([
      normalizeKey(currentActiveTab.id),
      normalizeKey(currentActiveTab.slug),
      normalizeKey(currentActiveTab.label),
      ...currentActiveTab.categoryNames.map(normalizeKey),
    ]);

    const source = allArticles && allArticles.length > 0 ? allArticles : initialArticles;

    const list = (source || []).filter((a) => {
      const aCat = normalizeKey(a.category);
      if (targetKeys.has(aCat)) return true;
      if (
        Array.isArray(a.categories) &&
        a.categories.some((c) => targetKeys.has(normalizeKey(c)))
      ) {
        return true;
      }
      return false;
    });

    if (list.length > 0) return list;
    if (initialArticles && initialArticles.length > 0) return initialArticles;
    return source.slice(0, 16);
  }, [allArticles, currentActiveTab, initialArticles]);

  // Original continuous seamless SVG Bezier folder path
  const continuousCurvePath = useMemo(() => {
    if (!curveMetrics) return '';
    const { trackWidth, trackHeight, activeLeft, activeWidth } = curveMetrics;
    const rad = Math.min(16, Math.floor(activeWidth * 0.22));
    const yBase = Math.max(40, trackHeight - 4);
    const yTop = 2;
    const l = activeLeft;
    const r = activeLeft + activeWidth;

    const leftFilletRad = Math.min(rad, Math.max(4, l));
    const rightFilletRad = Math.min(rad, Math.max(4, trackWidth - r));

    return [
      `M 0,${yBase}`,
      `L ${Math.max(0, l - leftFilletRad)},${yBase}`,
      `A ${leftFilletRad} ${leftFilletRad} 0 0 0 ${l},${yBase - leftFilletRad}`,
      `L ${l},${yTop + rad}`,
      `A ${rad} ${rad} 0 0 1 ${l + rad},${yTop}`,
      `L ${r - rad},${yTop}`,
      `A ${rad} ${rad} 0 0 1 ${r},${yTop + rad}`,
      `L ${r},${yBase - rightFilletRad}`,
      `A ${rightFilletRad} ${rightFilletRad} 0 0 0 ${Math.min(trackWidth, r + rightFilletRad)},${yBase}`,
      `L ${trackWidth},${yBase}`,
    ].join(' ');
  }, [curveMetrics]);

  return (
    <div className="w-full min-h-screen bg-white text-[#102A56] pb-20">
      {/* 1. STICKY CATEGORY ICONS SHELF (100% SOLID OPAQUE WHITE, ZERO TRANSPARENCY, SCROLLBAR COMPLETELY HIDDEN) */}
      <div className="sticky top-[60px] sm:top-[64px] z-40 w-full bg-white border-b border-slate-200/90 shadow-[0_2px_12px_rgba(16,42,86,0.04)] pt-3 pb-3">
        <div className="max-w-[1240px] mx-auto px-2 sm:px-6 bg-white">
          {/* Horizontal Category Shelf with Original Continuous Curve */}
          <div className="relative w-full">
            <div
              ref={tabsTrackRef}
              className="relative flex items-center justify-start lg:justify-between gap-1 sm:gap-2.5 overflow-x-auto no-scrollbar scrollbar-none gt-hscroll-none pt-1 pb-2 px-2 sm:px-4 w-full"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Original Seamless Continuous Curved Line with Gradient */}
              {curveMetrics && continuousCurvePath && (
                <svg
                  width={curveMetrics.trackWidth}
                  height={curveMetrics.trackHeight}
                  viewBox={`0 0 ${curveMetrics.trackWidth} ${curveMetrics.trackHeight}`}
                  fill="none"
                  aria-hidden="true"
                  className="absolute top-0 left-0 pointer-events-none z-10 overflow-hidden"
                  style={{
                    width: `${curveMetrics.trackWidth}px`,
                    height: `${curveMetrics.trackHeight}px`,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="gt-category-curve-fade"
                      x1="0"
                      y1="0"
                      x2={curveMetrics.trackWidth}
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#4A6EE0" stopOpacity="0.4" />
                      <stop offset="3%" stopColor="#2F54EB" stopOpacity="1" />
                      <stop offset="97%" stopColor="#2F54EB" stopOpacity="1" />
                      <stop offset="100%" stopColor="#4A6EE0" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  <path
                    d={continuousCurvePath}
                    stroke="url(#gt-category-curve-fade)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

              {CATEGORY_SHELF_TABS.map((tab) => {
                const isActive = tab.id === currentActiveTab.id;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabButtonRefs.current[tab.id] = el;
                    }}
                    type="button"
                    onClick={(e) => handleTabClick(e, tab)}
                    aria-pressed={isActive}
                    className="relative z-20 w-[80px] sm:w-[96px] lg:w-[104px] shrink-0 flex flex-col items-center text-center pt-2 pb-2 px-1 cursor-pointer select-none border-0 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 active:outline-none bg-transparent group"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    {/* Circular Halo Thumbnail Icon */}
                    <div
                      className={`w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] rounded-full flex items-center justify-center p-1.5 sm:p-2 mb-1.5 transition-transform duration-200 ${
                        isActive
                          ? 'bg-white shadow-xs ring-2 ring-[#2F54EB]/25 scale-[1.05]'
                          : 'bg-[#F6F7FA] group-hover:bg-[#EEF4FF] group-hover:scale-105'
                      }`}
                    >
                      <img
                        src={tab.thumbSrc}
                        alt={tab.label}
                        loading="lazy"
                        width={56}
                        height={56}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    </div>

                    {/* Clean Tab Label */}
                    <span
                      className={`whitespace-pre-line text-[10.5px] sm:text-[12px] leading-[1.18] tracking-[-0.01em] transition-colors ${
                        isActive
                          ? 'font-bold text-[#2F54EB]'
                          : 'font-semibold text-slate-700 group-hover:text-[#102A56]'
                      }`}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. CLEAN 4-COLUMN BLOG CARDS GRID DIRECTLY BELOW SHELF (SOLID WHITE BACKGROUND, NO TRANSPARENCY, EXACT USER MATCH) */}
      <section className="w-full px-4 sm:px-6 max-w-[1240px] mx-auto mt-6 sm:mt-8 bg-white">
        {displayedArticles.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 my-8">
            <p className="text-[16px] font-bold text-[#102A56] mb-1">No articles found in this category</p>
            <p className="text-[13px] text-slate-500 mb-4">Select another category tab above to explore clean guides.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {displayedArticles.map((article, idx) => {
              const isSaved = savedSlugs.includes(article.slug);
              const readTime = article.readTime || `${4 + (idx % 3)} min read`;

              return (
                <article
                  key={article.slug}
                  className="group bg-white rounded-[18px] p-3 border border-slate-200/90 hover:border-[#2F54EB] hover:shadow-[0_12px_28px_-8px_rgba(16,42,86,0.12)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Rounded Image with Aspect Ratio & Bookmark */}
                    <div className="relative w-full aspect-[16/10] rounded-[14px] overflow-hidden bg-slate-100 mb-2.5">
                      <Link href={getBlogUrl(article)} className="block w-full h-full no-underline outline-none">
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
                        aria-label="Save guide"
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors border-0 outline-none focus:outline-none"
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            isSaved ? 'fill-[#2F54EB] text-[#2F54EB]' : 'text-white'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Tag Badge */}
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EEF4FF] text-[#2F54EB] mb-2 self-start">
                      {currentActiveTab.label}
                    </span>

                    {/* Clean Unified Title */}
                    <h3 className="text-[14px] sm:text-[15px] font-bold leading-snug line-clamp-2 min-h-[42px] text-[#102A56] group-hover:text-[#2F54EB] transition-colors">
                      <Link
                        href={getBlogUrl(article)}
                        className="no-underline text-inherit outline-none block"
                      >
                        {article.title}
                      </Link>
                    </h3>
                  </div>

                  {/* Bottom Bar: Read Time + Clean Swap */}
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-[11.5px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {readTime}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-[#ECFDF5] text-[#059669]">
                      Clean Swap
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
