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
  Star,
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
    id: 'snacks',
    label: 'Clean\nSnacks',
    thumbSrc: '/images/card-diabetes.png',
    pillText: 'Clean Snacks',
    href: '/category/clean-snacks',
    fallbackOffset: 0,
    keywords: ['clean snacks', 'makhana', 'chana', 'chai', 'baked'],
  },
  {
    id: 'gut',
    label: 'Gut &\nDigestion',
    thumbSrc: '/images/card-gut.png',
    pillText: 'Gut Health',
    href: '/focus/gut',
    fallbackOffset: 5,
    keywords: ['gut health', 'chaas', 'kanji', 'emulsifier', 'chia', 'bloating'],
  },
  {
    id: 'diabetes',
    label: 'Diabetes &\nLow-GI',
    thumbSrc: '/images/card-pcos.png',
    pillText: 'Low GI Plan',
    href: '/focus/diabetes',
    fallbackOffset: 10,
    keywords: ['diabetes', 'low-gi', 'glucose', 'glycemic', 'sugar', 'millet'],
  },
  {
    id: 'liver',
    label: 'Heart &\nFatty Liver',
    thumbSrc: '/images/card-heart.png',
    pillText: 'Liver Care',
    href: '/focus/heart',
    fallbackOffset: 15,
    keywords: ['heart', 'liver', 'palmolein', 'walnut', 'flax', 'sodium'],
  },
  {
    id: 'pcos',
    label: 'PCOS &\nHormones',
    thumbSrc: '/images/card-pcos.png',
    pillText: 'PCOS Plan',
    href: '/focus/pcos',
    fallbackOffset: 20,
    keywords: ['pcos', 'hormone', 'seed cycling', 'cinnamon', 'spearmint'],
  },
  {
    id: 'weight',
    label: 'Weight &\nProtein',
    thumbSrc: '/images/card-weight.png',
    pillText: 'Clean Fuel',
    href: '/focus/weight',
    fallbackOffset: 25,
    keywords: ['weight', 'protein', '150 calorie', 'sattu', 'paneer', 'lentil'],
  },
  {
    id: 'labels',
    label: 'Label\nAudits',
    thumbSrc: '/images/gudtree-hero-sticker.png',
    pillText: 'Pack Audit',
    href: '/category/label-audits',
    fallbackOffset: 30,
    keywords: ['label audits', 'added sugar', 'maida', 'protein bar', 'zero cholesterol'],
  },
  {
    id: 'pantry',
    label: 'Desi\nPantry',
    thumbSrc: '/images/card-diabetes.png',
    pillText: 'Desi Pantry',
    href: '/category/desi-pantry',
    fallbackOffset: 35,
    keywords: ['desi pantry', 'jaggery', 'gud', 'cold-pressed', 'millets', 'chikki'],
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

    const trackWidth = track.scrollWidth;
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
    const btn = tabButtonRefs.current[id];
    if (btn) {
      btn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
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
    const rad = Math.min(18, Math.floor(activeWidth * 0.25));
    const yBase = Math.max(40, trackHeight - 2);
    const yTop = 2;
    const l = Math.max(rad + 4, activeLeft);
    const r = Math.min(trackWidth - rad - 4, activeLeft + activeWidth);

    return [
      `M 0,${yBase}`,
      `L ${l - rad},${yBase}`,
      `A ${rad} ${rad} 0 0 0 ${l},${yBase - rad}`,
      `L ${l},${yTop + rad}`,
      `A ${rad} ${rad} 0 0 1 ${l + rad},${yTop}`,
      `L ${r - rad},${yTop}`,
      `A ${rad} ${rad} 0 0 1 ${r},${yTop + rad}`,
      `L ${r},${yBase - rad}`,
      `A ${rad} ${rad} 0 0 0 ${r + rad},${yBase}`,
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
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
          <LightningIcon />
          <h2 className="gt-font-display text-[26px] sm:text-[34px] lg:text-[38px] leading-[1.08] tracking-[-0.025em] text-[#102A56] text-center">
            Blogs you can&apos;t miss
          </h2>
          <LightningIcon />
        </div>

        {/* Category Tabs: Compact 4x2 Grid on Mobile + Continuous Faded Curved Folder Line on sm+ */}
        <div className="relative w-full pb-1">
          <div
            ref={tabsTrackRef}
            className="relative grid grid-cols-4 gap-1.5 sm:flex sm:items-stretch sm:justify-center sm:gap-2 px-0 sm:px-6 pt-2 pb-3 sm:pb-4"
          >
            {/* Smooth Continuous SVG Line on Desktop/Tablet (sm+) */}
            {curveMetrics && continuousCurvePath && (
              <svg
                width={curveMetrics.trackWidth}
                height={curveMetrics.trackHeight}
                viewBox={`0 0 ${curveMetrics.trackWidth} ${curveMetrics.trackHeight}`}
                fill="none"
                aria-hidden="true"
                className="hidden sm:block absolute inset-0 pointer-events-none z-10 overflow-hidden"
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
                    <stop offset="0%" stopColor="#6384E8" stopOpacity="0" />
                    <stop offset="4.5%" stopColor="#4A6EE0" stopOpacity="1" />
                    <stop offset="95.5%" stopColor="#4A6EE0" stopOpacity="1" />
                    <stop offset="100%" stopColor="#6384E8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={continuousCurvePath}
                  stroke="url(#gt-folder-curve-fade)"
                  strokeWidth="1.65"
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
                  className={`relative z-20 w-full sm:w-[92px] lg:w-[100px] sm:shrink-0 flex flex-col items-center text-center pt-2 pb-1.5 px-1 cursor-pointer transition-all select-none focus:outline-none border-0 rounded-[14px] sm:rounded-none ${
                    isActive
                      ? 'bg-[#EEF4FF] sm:bg-transparent'
                      : 'bg-transparent'
                  }`}
                >
                  {/* Circular / Soft Halo Thumbnail */}
                  <div
                    className={`w-[46px] h-[46px] sm:w-[60px] sm:h-[60px] rounded-full flex items-center justify-center p-1.5 sm:p-2 mb-1.5 sm:mb-2 transition-transform duration-200 ${
                      isActive
                        ? 'bg-[#FFFFFF] sm:bg-[#F4F7FF] scale-[1.04] shadow-xs sm:shadow-none'
                        : 'bg-[#F6F7FA] hover:bg-[#F0F4FF]'
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
                    className={`whitespace-pre-line text-[11px] sm:text-[12.5px] leading-[1.18] tracking-[-0.01em] transition-colors ${
                      isActive
                        ? 'font-bold text-[#0A6C33] sm:text-[#2F54EB]'
                        : 'font-medium text-[#1F2937]/75 hover:text-[#102A56]'
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean, Airy Blog Card Shelf (2-Col Mobile Grid + 4-Col Desktop Grid, Zero Horizontal Overflow) */}
        <div className="relative mt-4 sm:mt-6 w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {tabArticles.slice(0, 4).map((article) => {
              const isSaved = savedSlugs.includes(article.slug);
              const meta = getArticleScore(article.slug);

              return (
                <article
                  key={`${activeTab.id}-${article.slug}`}
                  className="group min-w-0 flex flex-col bg-[#FFFFFF] rounded-[16px] p-2 sm:p-3 border border-[#ADC3DE]/35 hover:border-[#2F54EB] transition-all"
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
                      className={`absolute top-1.5 right-1.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer z-10 ${
                        isSaved
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
                  <div className="mt-auto flex items-center gap-1.5 text-[11px] sm:text-[12px] font-medium text-[#526071]">
                    <span className="inline-flex items-center gap-0.5 font-semibold text-[#15803D]">
                      <Star className="w-3 h-3 fill-[#15803D] text-[#15803D]" />
                      {meta.rating}
                    </span>
                    <span className="text-[#94A3B8]">•</span>
                    <span className="truncate">{article.readTime || meta.mins}</span>
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
