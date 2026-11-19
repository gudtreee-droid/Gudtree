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
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { Article } from '@/types';
import { getBlogUrl } from '@/lib/blogUrl';
import { normalizeCatName, formatNfDate } from '@/lib/newsflashFormat';
import EditorialTitle from './EditorialTitle';
import GudTreeImg from './GudTreeImg';

export interface BlogShelfTab {
  id: string;
  label: string;
  thumbSrc: string;
  pillText: string;
  href: string;
  fallbackOffset: number;
  keywords: string[];
}

export const BLOG_SHELF_TABS: BlogShelfTab[] = [
  {
    id: 'kids',
    label: 'Kids Tiffin',
    thumbSrc: '/images/categories/kids-tiffin.svg',
    pillText: 'Kids Fuel',
    href: '/category/kids-tiffin',
    fallbackOffset: 0,
    keywords: ['kids', 'tiffin', 'school', 'lunch', 'bachhe', 'bournvita', 'children'],
  },
  {
    id: 'desk',
    label: 'Desk Munches',
    thumbSrc: '/images/card-diabetes.png',
    pillText: '4 PM Crunch',
    href: '/category/clean-snacks',
    fallbackOffset: 5,
    keywords: ['clean snacks', 'desk', 'study', 'makhana', 'slump', 'chana', 'chai', 'laptop'],
  },
  {
    id: 'gym',
    label: 'Daily Protein',
    thumbSrc: '/images/card-weight.png',
    pillText: 'High Protein',
    href: '/focus/weight',
    fallbackOffset: 10,
    keywords: ['weight', 'protein', 'fitness', '150 calorie', 'sattu', 'under 50', 'chana', 'gym'],
  },
  {
    id: 'drinks',
    label: 'Sips & Reset',
    thumbSrc: '/images/card-heart.png',
    pillText: 'Hangover Fix',
    href: '/category/heart-liver-care',
    fallbackOffset: 15,
    keywords: ['hangover', 'drinks', 'chaas', 'sattu', 'nariyal', 'party', 'alcohol', 'detox', 'liver'],
  },
  {
    id: 'women',
    label: "Women's Health",
    thumbSrc: '/images/card-pcos.png',
    pillText: 'PCOS & Skin',
    href: '/focus/pcos',
    fallbackOffset: 20,
    keywords: ['pcos', 'pcod', 'hormone', 'period', 'cramp', 'pms', 'pregnancy', 'acne', 'skin'],
  },
  {
    id: 'gut',
    label: 'Gut & Bloat',
    thumbSrc: '/images/card-gut.png',
    pillText: 'Digestion',
    href: '/focus/gut',
    fallbackOffset: 25,
    keywords: ['gut health', 'bloat', 'acidity', 'chaas', 'kanji', 'emulsifier', 'chia', 'sitting', 'gas'],
  },
  {
    id: 'labels',
    label: 'Packet Truth',
    thumbSrc: '/images/categories/label-audits.svg',
    pillText: 'Label Audit',
    href: '/category/label-audits',
    fallbackOffset: 30,
    keywords: ['label audits', 'blinkit', 'added sugar', 'maltodextrin', 'too yumm', 'maida', 'protein bar', 'palm oil'],
  },
  {
    id: 'diabetes',
    label: 'Low Sugar',
    thumbSrc: '/images/categories/low-sugar.svg',
    pillText: 'Low-GI Pick',
    href: '/focus/diabetes',
    fallbackOffset: 35,
    keywords: ['diabetes', 'low-gi', 'glucose', 'glycemic', 'sugar', 'millet', 'khakhra'],
  },
  {
    id: 'vrat',
    label: 'Clean Pantry',
    thumbSrc: '/images/categories/clean-pantry.svg',
    pillText: 'Fasting Clean',
    href: '/category/desi-pantry',
    fallbackOffset: 40,
    keywords: ['vrat', 'upwas', 'tyohar', 'jaggery', 'gud', 'cold-pressed', 'millets', 'mithai', 'til'],
  },
];

function LightningIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M13.2 2L4.5 13.5H11.5L10.3 22L19.5 10.2H12.4L13.2 2Z"
        fill="#FACC15"
        stroke="#14181E"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getArticleScore(slug: string): { rating: string; mins: string } {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  const abs = Math.abs(hash);
  const dec = [6, 7, 8, 9, 8][abs % 5];
  const mins = `${3 + (abs % 5)} min read`;
  return { rating: `4.${dec}`, mins };
}

export default function BlogDiscoveryTabsShelf({
  articles,
}: {
  articles: Article[];
}) {
  const [activeTabId, setActiveTabId] = useState<string>(BLOG_SHELF_TABS[0].id);
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [curveMetrics, setCurveMetrics] = useState<{
    trackWidth: number;
    trackHeight: number;
    activeLeft: number;
    activeWidth: number;
  } | null>(null);

  const tabsTrackRef = useRef<HTMLDivElement | null>(null);
  const tabButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const scrollerRef = useRef<HTMLDivElement | null>(null);

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

  const measureCurve = useCallback(() => {
    const track = tabsTrackRef.current;
    const btn = tabButtonRefs.current[activeTabId];
    if (!track || !btn) return;

    const firstTab = BLOG_SHELF_TABS[0];
    const lastTab = BLOG_SHELF_TABS[BLOG_SHELF_TABS.length - 1];
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
  }, [activeTabId]);

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

  const activeTab = useMemo(
    () => BLOG_SHELF_TABS.find((t) => t.id === activeTabId) || BLOG_SHELF_TABS[0],
    [activeTabId]
  );

  const tabArticles = useMemo(() => {
    const safe = articles || [];
    if (safe.length === 0) return [];

    const matched = safe.filter((a) => {
      const hay = `${a.title} ${a.category} ${a.excerpt || ''} ${a.tag || ''}`.toLowerCase();
      return activeTab.keywords.some((kw) => hay.includes(kw));
    });

    if (matched.length >= 8) {
      return matched.slice(0, 8);
    }

    const used = new Set(matched.map((m) => m.slug));
    const offsetSlice = safe
      .slice(activeTab.fallbackOffset)
      .concat(safe.slice(0, activeTab.fallbackOffset))
      .filter((a) => !used.has(a.slug));

    return [...matched, ...offsetSlice].slice(0, 8);
  }, [articles, activeTab]);

  const handleTabSwitch = (id: string) => {
    setActiveTabId(id);
    const track = tabsTrackRef.current;
    const btn = tabButtonRefs.current[id];
    if (track && btn) {
      const lastTab = BLOG_SHELF_TABS[BLOG_SHELF_TABS.length - 1];
      const lastBtn = tabButtonRefs.current[lastTab.id];
      const totalContentWidth = lastBtn ? lastBtn.offsetLeft + lastBtn.offsetWidth + 16 : track.scrollWidth;
      const maxScroll = Math.max(0, totalContentWidth - track.clientWidth);
      if (maxScroll > 2) {
        const btnLeft = btn.offsetLeft;
        const idealLeft = btnLeft - (track.clientWidth - btn.offsetWidth) / 2;
        const targetLeft = Math.max(0, Math.min(maxScroll, idealLeft));
        track.scrollTo({ left: targetLeft, behavior: 'smooth' });
      }
    }
    if (scrollerRef.current) {
      scrollerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const scrollCards = (dir: 'left' | 'right') => {
    if (!scrollerRef.current) return;
    const step = scrollerRef.current.clientWidth * 0.72;
    scrollerRef.current.scrollBy({
      left: dir === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  // Single continuous seamless SVG Bezier folder path fading out cleanly at both ends
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

  if (!articles || articles.length === 0) return null;

  return (
    <section
      id="blogs-shelf"
      aria-label="Curated Nutrition Blog Shelves"
      className="w-full max-w-full overflow-x-clip bg-[#FFFFFF] border-t border-[#ADC3DE]/35 pt-10 sm:pt-14 pb-10 sm:pb-12 scroll-mt-20"
    >
      <div className="w-full max-w-[1060px] mx-auto px-4 sm:px-5 min-w-0 overflow-hidden">
        {/* Centered Heading Flanked by Lightning Icons */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <LightningIcon />
            <h2 className="gt-font-display text-[26px] sm:text-[34px] lg:text-[38px] leading-[1.08] tracking-[-0.025em] text-[#102A56] text-center">
              Blogs You Can&apos;t Miss
            </h2>
            <LightningIcon />
          </div>
          <p className="mt-2 text-center text-[13.5px] sm:text-[15px] text-[#334155] max-w-lg mx-auto leading-[1.5]">
            Handpicked food guides and honest palm-oil-free swaps.
            <br className="hidden sm:inline" /> Select your daily snacking situation to discover clean reads.
          </p>
        </div>

        {/* Category Tabs: Original Continuous Blue Line with Scrollbar Completely Hidden */}
        <div className="relative w-full pb-1">
          <div
            ref={tabsTrackRef}
            className="relative flex items-center justify-start lg:justify-between gap-1 sm:gap-2.5 overflow-x-auto no-scrollbar scrollbar-none gt-hscroll-none pt-1 pb-2 sm:pb-3 px-4 sm:px-6 w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* The Original Seamless Continuous Curved Folder Border */}
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
                    id="gt-folder-curve-fade"
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
                  stroke="url(#gt-folder-curve-fade)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {BLOG_SHELF_TABS.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabButtonRefs.current[tab.id] = el;
                  }}
                  type="button"
                  onClick={() => handleTabSwitch(tab.id)}
                  aria-pressed={isActive}
                  className="relative z-20 w-[80px] sm:w-[96px] lg:w-[104px] shrink-0 flex flex-col items-center text-center pt-2 pb-2 px-1 cursor-pointer select-none border-0 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 active:outline-none bg-transparent group"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {/* Circular / Soft Halo Thumbnail */}
                  <div
                    className={`w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] rounded-full flex items-center justify-center p-1.5 sm:p-2 mb-1.5 transition-transform duration-200 ${
                      isActive
                        ? 'bg-[#FFFFFF] ring-2 ring-[#2F54EB]/25 shadow-xs scale-[1.05]'
                        : 'bg-[#F6F7FA] group-hover:bg-[#EEF4FF] group-hover:scale-105'
                    }`}
                  >
                    <img
                      src={tab.thumbSrc}
                      alt={tab.label.replace('\n', ' ')}
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  </div>

                  {/* Two-line Clean Category Name */}
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

        {/* Clean, Airy Blog Card Shelf (Horizontal Swipe on Mobile + 4-Col Desktop Grid) */}
        <div className="relative mt-4 sm:mt-6 w-full">
          <div className="gt-hscroll-md md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-2 md:pb-0">
            {tabArticles.slice(0, 6).map((article, idx) => {
              const isSaved = savedSlugs.includes(article.slug);
              const meta = getArticleScore(article.slug);

              return (
                <article
                  key={`${activeTab.id}-${article.slug}`}
                  className={`group w-[212px] sm:w-[230px] md:w-full min-w-0 flex flex-col bg-[#FFFFFF] rounded-[16px] p-2.5 sm:p-3 border border-[#ADC3DE]/35 hover:border-[#2F54EB] transition-all ${idx >= 4 ? 'lg:hidden' : ''
                    }`}
                >
                  {/* Clean Image + Single Subtle Bookmark */}
                  <div className="relative w-full aspect-[16/11] rounded-[12px] bg-[#F5F7FA] overflow-hidden mb-2 border border-[#ADC3DE]/25">
                    <Link
                      href={getBlogUrl(article)}
                      className="block w-full h-full no-underline"
                      aria-label={article.title}
                    >
                      <GudTreeImg
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => toggleSave(e, article.slug)}
                      title={isSaved ? 'Saved' : 'Bookmark Guide'}
                      aria-label={isSaved ? 'Remove Bookmark' : 'Bookmark Guide'}
                      className={`absolute top-1.5 right-1.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer z-10 ${isSaved
                        ? 'bg-[#2F54EB] text-white shadow-sm'
                        : 'bg-white/88 text-[#102A56]/75 hover:text-[#2F54EB]'
                        }`}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Single Crisp Category Tag Pill */}
                  <div className="mb-1">
                    <span className="inline-block px-2 py-0.5 rounded-[5px] bg-[#EEF3FF] text-[#2F54EB] text-[10.5px] font-semibold tracking-[-0.01em] truncate max-w-full">
                      {normalizeCatName(article.category) || activeTab.pillText}
                    </span>
                  </div>

                  {/* Easy-to-Read Blog Title */}
                  <Link
                    href={getBlogUrl(article)}
                    className="no-underline mb-1.5"
                  >
                    <EditorialTitle
                      title={article.title}
                      variant="compact"
                      as="h3"
                      className="text-[13.5px] sm:text-[15px] leading-[1.28] text-[#102A56] group-hover:text-[#2F54EB] transition-colors line-clamp-2"
                    />
                  </Link>

                  {/* Single Clean Bottom Meta Line */}
                  <div className="mt-auto flex items-center justify-between text-[11px] sm:text-[12px] font-medium text-[#526071]">
                    <span className="inline-flex items-center gap-1 text-[#0944BA] font-semibold">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime || meta.mins}</span>
                    </span>
                    <span className="text-[10px] sm:text-[10.5px] font-semibold text-[#15803D] bg-[#EAF7EE] px-2 py-0.5 rounded-full">
                      Clean Swap
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Full-Width Soft Blue Pill Button Matching Active Category Route */}
          <div className="mt-5">
            <Link
              href={activeTab.href || '/news'}
              className="w-full h-12 rounded-[14px] bg-[#EEF4FF] hover:bg-[#DCE8FF] text-[#0944BA] text-[14.5px] font-bold inline-flex items-center justify-center gap-1.5 no-underline transition-colors"
            >
              <span>See All {activeTab.label.replace('\n', ' ')}</span>
              <span aria-hidden="true" className="text-[15px] leading-none">
                &raquo;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
