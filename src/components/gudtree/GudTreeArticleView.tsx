'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Check,
  Share2,
  User,
  Languages,
  Loader2,
  Bookmark,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  ThumbsUp,
  MessageCircle,
} from 'lucide-react';
import { Article } from '@/types';
import { getCategorySlug } from '@/data/categories';
import { getBlogUrl } from '@/lib/blogUrl';
import { linkifyHtml } from '@/lib/linkify';
import { READER_LANGUAGES, isSupportedLang } from '@/lib/languages';
import ArticleViewTracker from '@/components/ArticleViewTracker';
import EditorialTitle from './EditorialTitle';
import GudTreeImg from './GudTreeImg';
import DietaryBadgePill, { inferWellnessTag } from './DietaryBadgePill';
import { TopReadingProgressBar } from './MotionPrimitives';
import { formatNfDate, normalizeCatName } from '@/lib/newsflashFormat';

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface TranslatedArticleData {
  title: string;
  excerpt: string;
  content: string;
}

type FontSizeMode = 'sm' | 'md' | 'lg';
type FontFamilyMode = 'sans' | 'display';
type PaperThemeMode = 'buttercream' | 'white' | 'sage' | 'pine';

const PAPER_THEMES: Record<
  PaperThemeMode,
  {
    label: string;
    bg: string;
    surface: string;
    cardSurface: string;
    text: string;
    muted: string;
    border: string;
    swatch: string;
    badgeBg: string;
    isDark?: boolean;
  }
> = {
  buttercream: {
    label: 'Buttercream',
    bg: '#FFF9EC',
    surface: '#FFFFFF',
    cardSurface: '#FFFFFF',
    text: '#102A56',
    muted: '#334155',
    border: 'rgba(16, 42, 86, 0.12)',
    swatch: '#FFF9EC',
    badgeBg: '#D6EDFF',
  },
  white: {
    label: 'Crisp White',
    bg: '#FFFFFF',
    surface: '#FFF9EC',
    cardSurface: '#FFFFFF',
    text: '#102A56',
    muted: '#334155',
    border: '#CBD5E1',
    swatch: '#FFFFFF',
    badgeBg: '#D6EDFF',
  },
  sage: {
    label: 'Soft Sage',
    bg: '#DFE5D7',
    surface: '#FFF9EC',
    cardSurface: '#FFFDF7',
    text: '#102A56',
    muted: '#1E293B',
    border: 'rgba(16, 42, 86, 0.14)',
    swatch: '#DFE5D7',
    badgeBg: '#E5F36D',
  },
  pine: {
    label: 'Night',
    bg: '#0D120B',
    surface: '#171D15',
    cardSurface: '#151B14',
    text: '#FFF9EC',
    muted: '#DFE5D7',
    border: 'rgba(255, 249, 236, 0.15)',
    swatch: '#0D120B',
    badgeBg: 'rgba(229, 243, 109, 0.14)',
    isDark: true,
  },
};

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
}

function escapeHtmlText(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function slugifyHeading(text: string, idx: number): string {
  const clean = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  return clean ? `${clean}-${idx}` : `section-${idx}`;
}

function buildSourceHtml(article: Article): string {
  if (article.content && article.content.trim()) {
    return article.content;
  }
  const parts: string[] = [];
  if (article.paragraphs && article.paragraphs.length > 0) {
    parts.push(`<p>${escapeHtmlText(article.paragraphs[0])}</p>`);
  }
  if (article.sections && article.sections.length > 0) {
    for (const sec of article.sections) {
      if (sec.heading) {
        parts.push(`<h2>${escapeHtmlText(sec.heading)}</h2>`);
      }
      if (sec.content) {
        parts.push(`<p>${escapeHtmlText(sec.content)}</p>`);
      }
    }
  } else if (article.paragraphs && article.paragraphs.length > 1) {
    for (const p of article.paragraphs.slice(1)) {
      parts.push(`<p>${escapeHtmlText(p)}</p>`);
    }
  }
  return parts.join('\n');
}

function inferFocusHub(article: Article): { slug: string; title: string; desc: string } {
  const text = `${article.title || ''} ${article.category || ''} ${article.tag || ''} ${(article.keywords || []).toString()}`.toLowerCase();
  if (/diabet|sugar|glucose|insulin|low-gi|sweetener|jaggery|gud/.test(text)) {
    return {
      slug: 'diabetes',
      title: 'Diabetes & Low-GI Hub',
      desc: 'Tested swaps to prevent blood sugar spikes without giving up evening crunch.',
    };
  }
  if (/pcos|hormon|period|women|fertilit|cycle|seed/.test(text)) {
    return {
      slug: 'pcos',
      title: 'PCOS Clean Diet Hub',
      desc: 'Insulin-sensitizing Indian foods, seed cycling, and anti-inflammatory swaps.',
    };
  }
  if (/heart|cholesterol|bp|pressure|cardio|palm oil|palmolein|artery/.test(text)) {
    return {
      slug: 'heart',
      title: 'Heart & Zero Palm Oil Hub',
      desc: 'Protect arteries with unrefined cold-pressed fats and clean snack roasts.',
    };
  }
  if (/gut|microbiome|digest|bloat|probiotic|fiber|constipat|acidity/.test(text)) {
    return {
      slug: 'gut',
      title: 'Gut Health & Digestion Hub',
      desc: 'Desi probiotics, spiced chaas, and prebiotic millets for bloating relief.',
    };
  }
  return {
    slug: 'weight',
    title: 'Weight & Clean Fuel Hub',
    desc: 'High-protein whole grain snacks that curb 4 PM cravings sustainably.',
  };
}

const SAVED_STORAGE_KEY = 'gudtree_saved_blogs';
const LANG_PREF_KEY = 'gudtree_reader_lang_v1';

export default function GudTreeArticleView({
  article,
  relatedArticles,
  topSidebarArticles,
  prevArticle,
  nextArticle,
  showFeaturedImage = true,
  siteName = 'GudTree',
}: {
  article: Article;
  relatedArticles: Article[];
  topSidebarArticles?: Article[];
  prevArticle?: Article | null;
  nextArticle?: Article | null;
  showFeaturedImage?: boolean;
  shouldShowPopularPosts?: boolean;
  siteName?: string;
}) {
  const [fontSize, setFontSize] = useState<FontSizeMode>('md');
  const [fontFamily, setFontFamily] = useState<FontFamilyMode>('sans');
  const [paperTheme, setPaperTheme] = useState<PaperThemeMode>('buttercream');
  const [activeTocId, setActiveTocId] = useState<string>('');
  const [tocOpen, setTocOpen] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  // Compact icon popovers (clean UI without clutter)
  const [langMenuOpen, setLangMenuOpen] = useState<boolean>(false);
  const [displayMenuOpen, setDisplayMenuOpen] = useState<boolean>(false);
  const langPopoverRef = useRef<HTMLDivElement | null>(null);
  const displayPopoverRef = useRef<HTMLDivElement | null>(null);

  // Top-10 reader language switcher state
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [translated, setTranslated] = useState<TranslatedArticleData | null>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translateError, setTranslateError] = useState<string>('');
  const translationCacheRef = useRef<Record<string, TranslatedArticleData>>({});
  const abortControllerRef = useRef<AbortController | null>(null);
  const requestSeqRef = useRef<number>(0);

  const rawLeadExcerpt = article.excerpt || article.paragraphs?.[0] || '';
  const sourceHtml = useMemo(() => buildSourceHtml(article), [article]);
  const focusHub = useMemo(() => inferFocusHub(article), [article]);

  // Close popovers when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        langPopoverRef.current &&
        !langPopoverRef.current.contains(e.target as Node)
      ) {
        setLangMenuOpen(false);
      }
      if (
        displayPopoverRef.current &&
        !displayPopoverRef.current.contains(e.target as Node)
      ) {
        setDisplayMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Restore reading prefs, bookmark status, and preferred language
  useEffect(() => {
    try {
      const raw = localStorage.getItem('gudtree_reading_prefs_v2');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.fontSize && ['sm', 'md', 'lg'].includes(parsed.fontSize)) {
          setFontSize(parsed.fontSize);
        }
        if (parsed.fontFamily && ['sans', 'display'].includes(parsed.fontFamily)) {
          setFontFamily(parsed.fontFamily);
        }
        if (
          parsed.paperTheme &&
          ['buttercream', 'white', 'sage', 'pine'].includes(parsed.paperTheme)
        ) {
          setPaperTheme(parsed.paperTheme);
        }
      }
    } catch { }

    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTocOpen(false);
    }

    try {
      const savedRaw = localStorage.getItem(SAVED_STORAGE_KEY);
      if (savedRaw) {
        const slugs: string[] = JSON.parse(savedRaw);
        if (Array.isArray(slugs)) {
          setIsBookmarked(slugs.includes(article.slug));
        }
      }
    } catch { }

    try {
      const prefLang = localStorage.getItem(LANG_PREF_KEY);
      if (prefLang && isSupportedLang(prefLang) && prefLang !== 'en') {
        setSelectedLang(prefLang);
      }
    } catch { }
  }, [article.slug]);

  const toggleBookmark = () => {
    try {
      const raw = localStorage.getItem(SAVED_STORAGE_KEY);
      const slugs: string[] = raw ? JSON.parse(raw) : [];
      const next = slugs.includes(article.slug)
        ? slugs.filter((s) => s !== article.slug)
        : [...slugs, article.slug];
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(next));
      setIsBookmarked(next.includes(article.slug));
    } catch {
      setIsBookmarked((v) => !v);
    }
  };

  const updatePrefs = (
    nextSize: FontSizeMode,
    nextFam: FontFamilyMode,
    nextTheme: PaperThemeMode
  ) => {
    setFontSize(nextSize);
    setFontFamily(nextFam);
    setPaperTheme(nextTheme);
    try {
      localStorage.setItem(
        'gudtree_reading_prefs_v2',
        JSON.stringify({
          fontSize: nextSize,
          fontFamily: nextFam,
          paperTheme: nextTheme,
        })
      );
    } catch { }
  };

  const fetchTranslation = useCallback(
    async (langCode: string) => {
      if (langCode === 'en') {
        abortControllerRef.current?.abort();
        setTranslated(null);
        setIsTranslating(false);
        setTranslateError('');
        return;
      }

      if (translationCacheRef.current[langCode]) {
        setTranslated(translationCacheRef.current[langCode]);
        setIsTranslating(false);
        setTranslateError('');
        return;
      }

      const cacheKey = `gudtree_tr_v4_${langCode}_${article.slug}`;
      try {
        const cachedRaw = localStorage.getItem(cacheKey);
        if (cachedRaw) {
          const parsed = JSON.parse(cachedRaw) as TranslatedArticleData;
          // Discard corrupt/stale caches where translation was skipped or identical to English
          const isBasicallyEnglish =
            langCode !== 'hinglish' &&
            parsed.title === article.title &&
            parsed.content === sourceHtml;

          if (parsed && (parsed.title || parsed.content) && !isBasicallyEnglish) {
            translationCacheRef.current[langCode] = parsed;
            setTranslated(parsed);
            setIsTranslating(false);
            setTranslateError('');
            return;
          }
        }
      } catch { }

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const seq = ++requestSeqRef.current;

      setIsTranslating(true);
      setTranslateError('');

      try {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            targetLang: langCode,
            title: article.title,
            excerpt: rawLeadExcerpt,
            content: sourceHtml,
          }),
        });

        if (!res.ok) {
          throw new Error(`Translation request failed (${res.status})`);
        }

        const data = (await res.json()) as {
          title?: string;
          excerpt?: string;
          content?: string;
          error?: string;
        };

        if (seq !== requestSeqRef.current) return;

        if (data.error) {
          throw new Error(data.error);
        }

        const isBasicallyEnglish =
          langCode !== 'hinglish' &&
          data.title === article.title &&
          data.content === sourceHtml;

        if (isBasicallyEnglish) {
          throw new Error('Translation server returned original language');
        }

        const payload: TranslatedArticleData = {
          title: data.title || article.title,
          excerpt: data.excerpt || rawLeadExcerpt,
          content: data.content || sourceHtml,
        };

        translationCacheRef.current[langCode] = payload;
        try {
          localStorage.setItem(cacheKey, JSON.stringify(payload));
        } catch { }

        setTranslated(payload);
        setIsTranslating(false);
        setTranslateError('');
      } catch (err) {
        if ((err as Error)?.name === 'AbortError') return;
        if (seq !== requestSeqRef.current) return;
        setIsTranslating(false);
        setTranslateError('Translation service is temporarily busy. Click to retry.');
      }
    },
    [article.slug, article.title, rawLeadExcerpt, sourceHtml]
  );

  useEffect(() => {
    try {
      localStorage.setItem(LANG_PREF_KEY, selectedLang);
    } catch { }
    fetchTranslation(selectedLang);
  }, [selectedLang, fetchTranslation]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const displayTitle =
    selectedLang !== 'en' && translated?.title ? translated.title : article.title;
  const displayExcerpt =
    selectedLang !== 'en' && translated?.excerpt ? translated.excerpt : rawLeadExcerpt;
  const activeHtmlSource =
    selectedLang !== 'en' && translated?.content ? translated.content : sourceHtml;

  const { processedHtml, tocHeadings } = useMemo(() => {
    const headings: TocHeading[] = [];
    if (activeHtmlSource) {
      const linked = linkifyHtml(activeHtmlSource);
      let idx = 0;
      const withIds = linked.replace(
        /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi,
        (full, tag, attrs, inner) => {
          const plain = stripTags(inner);
          if (!plain) return full;
          const id = slugifyHeading(plain, idx++);
          headings.push({
            id,
            text: plain,
            level: tag.toLowerCase() === 'h2' ? 2 : 3,
          });
          if (/id=/.test(attrs)) {
            return `<${tag}${attrs}>${inner}</${tag}>`;
          }
          return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
        }
      );
      return { processedHtml: withIds, tocHeadings: headings };
    }
    return { processedHtml: '', tocHeadings: headings };
  }, [activeHtmlSource]);

  useEffect(() => {
    if (tocHeadings.length === 0) return;
    setActiveTocId(tocHeadings[0].id);

    const handleScroll = () => {
      let currentId = tocHeadings[0].id;
      for (const h of tocHeadings) {
        const el = document.getElementById(h.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            currentId = h.id;
          }
        }
      }
      setActiveTocId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocHeadings]);

  const catSlug = getCategorySlug(article.category);
  const catLabel = normalizeCatName(article.category);
  const authorName = article.author || `${siteName} Nutrition Desk`;
  const authorInitial = authorName.charAt(0).toUpperCase();
  const wellnessTag = inferWellnessTag(
    article.title,
    article.category,
    article.tag
  );

  const activeTheme = PAPER_THEMES[paperTheme];
  const fontSizeClass =
    fontSize === 'sm'
      ? 'text-[16px] leading-[1.7]'
      : fontSize === 'lg'
        ? 'text-[19.5px] leading-[1.82]'
        : 'text-[17.5px] leading-[1.75]';
  const fontFamilyClass =
    fontFamily === 'display' ? 'gt-font-display tracking-[-0.02em]' : 'gt-font-sans';

  const resolvedPrev = prevArticle || relatedArticles[0] || topSidebarArticles?.[0] || null;
  const resolvedNext = nextArticle || relatedArticles[1] || topSidebarArticles?.[1] || null;
  const relatedGrid = (relatedArticles.length > 0 ? relatedArticles : topSidebarArticles || []).slice(0, 3);

  const activeLangObj =
    READER_LANGUAGES.find((l) => l.code === selectedLang) || READER_LANGUAGES[0];

  const handleSocialShare = (
    platform: 'facebook' | 'x' | 'whatsapp' | 'linkedin' | 'system'
  ) => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const encUrl = encodeURIComponent(url);
    const encTitle = encodeURIComponent(displayTitle);

    if (platform === 'system') {
      if (navigator.share) {
        navigator.share({ title: displayTitle, url }).catch(() => { });
      } else {
        navigator.clipboard?.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
      return;
    }

    const targets: Record<'facebook' | 'x' | 'whatsapp' | 'linkedin', string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`,
      x: `https://twitter.com/intent/tweet?url=${encUrl}&text=${encTitle}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encTitle}%20${encUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`,
    };

    window.open(targets[platform], '_blank', 'width=600,height=450');
  };

  return (
    <div
      className="w-full max-w-full overflow-x-hidden transition-colors duration-300"
      style={{
        backgroundColor: activeTheme.bg,
        color: activeTheme.text,
      }}
    >
      <TopReadingProgressBar />
      <ArticleViewTracker slug={article.slug} />

      <main
        className="w-full"
        itemScope
        itemType="https://schema.org/Article"
      >
        {/* ================================================================
            SECTION 1: COMPACT, CLEAN EDITORIAL HEADER (ZERO BLOAT)
            ================================================================ */}
        <section className="w-full px-4 sm:px-6 py-6 sm:pb-8">
          <div className="max-w-[1000px] mx-auto">
            {/* Top Utility Row: Clean Stacked Mobile Header + Single Row Desktop Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 pb-4 border-b" style={{ borderColor: activeTheme.border }}>
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-1.5 text-[12.5px] sm:text-[13px] font-medium whitespace-nowrap overflow-x-auto no-scrollbar min-w-0"
                style={{ color: activeTheme.muted }}
              >
                <Link
                  href="/"
                  className="hover:text-[#DA440D] no-underline transition-colors"
                  style={{ color: activeTheme.text }}
                >
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
                <Link
                  href="/blog"
                  className="hover:text-[#DA440D] no-underline transition-colors"
                  style={{ color: activeTheme.text }}
                >
                  All Blogs
                </Link>
                <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
                <Link
                  href={`/category/${catSlug}`}
                  className="font-semibold text-[#0944BA] hover:underline no-underline truncate"
                >
                  {catLabel}
                </Link>
              </nav>

              {/* Right Compact Icon Bar (Language Icon + Comfort Icon + Save + Share) */}
              <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto">
                {/* 1. Single Clean Language Icon Dropdown Button */}
                <div className="relative" ref={langPopoverRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setLangMenuOpen((v) => !v);
                      setDisplayMenuOpen(false);
                    }}
                    aria-label="Choose reading language"
                    aria-expanded={langMenuOpen}
                    title="Change reading language"
                    className={`min-h-[44px] sm:min-h-0 sm:h-9 px-3.5 sm:px-3 rounded-full border inline-flex items-center gap-1.5 text-[12.5px] font-bold transition-all cursor-pointer ${langMenuOpen || selectedLang !== 'en'
                      ? 'bg-[#102A56] text-[#E5F36D] border-[#102A56] shadow-sm'
                      : 'hover:border-[#0944BA]'
                      }`}
                    style={
                      !langMenuOpen && selectedLang === 'en'
                        ? {
                          backgroundColor: activeTheme.cardSurface,
                          borderColor: activeTheme.border,
                          color: activeTheme.text,
                        }
                        : undefined
                    }
                  >
                    {isTranslating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Languages className="w-4 h-4" />
                    )}
                    <span className="uppercase">{activeLangObj.shortCode}</span>
                  </button>

                  {langMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-[225px] max-w-[calc(100vw-2rem)] rounded-[18px] border shadow-[0_18px_40px_-10px_rgba(16,42,86,0.22)] p-1.5 z-50"
                      style={{
                        backgroundColor: activeTheme.cardSurface,
                        borderColor: activeTheme.border,
                        color: activeTheme.text,
                      }}
                    >
                      <div className="px-2.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider opacity-60">
                        Read Blog In
                      </div>
                      <div className="max-h-[300px] overflow-y-auto flex flex-col gap-0.5">
                        {READER_LANGUAGES.map((lang) => {
                          const active = selectedLang === lang.code;
                          return (
                            <button
                              key={lang.code}
                              type="button"
                              onClick={() => {
                                setSelectedLang(lang.code);
                                setLangMenuOpen(false);
                              }}
                              className={`w-full min-h-[44px] sm:min-h-0 px-2.5 py-2 rounded-[12px] text-left flex items-center justify-between text-[13.5px] sm:text-[13px] transition-colors cursor-pointer ${active
                                ? 'bg-[#102A56] text-[#E5F36D] font-bold'
                                : 'hover:bg-[#D6EDFF]/60 font-medium'
                                }`}
                            >
                              <span>
                                {lang.nativeLabel}{' '}
                                {lang.nativeLabel !== lang.label && (
                                  <span className={`text-[11px] ${active ? 'text-white/75' : 'opacity-60'}`}>
                                    ({lang.label})
                                  </span>
                                )}
                              </span>
                              <span
                                className={`text-[10.5px] font-extrabold uppercase ${active ? 'text-[#E5F36D]' : 'opacity-55'
                                  }`}
                              >
                                {lang.shortCode}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Compact Reading Style Popover Button (Font Size / Theme) */}
                <div className="relative" ref={displayPopoverRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setDisplayMenuOpen((v) => !v);
                      setLangMenuOpen(false);
                    }}
                    aria-label="Reading display settings"
                    aria-expanded={displayMenuOpen}
                    title="Text size & theme"
                    className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border inline-flex items-center justify-center transition-colors hover:border-[#0944BA] cursor-pointer"
                    style={{
                      backgroundColor: activeTheme.cardSurface,
                      borderColor: activeTheme.border,
                      color: activeTheme.text,
                    }}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>

                  {displayMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-[230px] rounded-[18px] border shadow-[0_18px_40px_-10px_rgba(16,42,86,0.22)] p-3.5 z-50 flex flex-col gap-3.5"
                      style={{
                        backgroundColor: activeTheme.cardSurface,
                        borderColor: activeTheme.border,
                        color: activeTheme.text,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-65">
                          Text Size
                        </span>
                        <div className="flex items-center gap-1">
                          {(['sm', 'md', 'lg'] as FontSizeMode[]).map((sz) => (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => updatePrefs(sz, fontFamily, paperTheme)}
                              className={`px-2 py-1 rounded-[8px] text-[11.5px] font-bold cursor-pointer ${fontSize === sz
                                ? 'bg-[#102A56] text-[#E5F36D]'
                                : 'opacity-70 hover:opacity-100'
                                }`}
                            >
                              {sz === 'sm' ? 'A-' : sz === 'md' ? 'A' : 'A+'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-65">
                          Font
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updatePrefs(
                              fontSize,
                              fontFamily === 'sans' ? 'display' : 'sans',
                              paperTheme
                            )
                          }
                          className="px-2.5 py-1 rounded-full border text-[11.5px] font-bold flex items-center gap-1 cursor-pointer"
                          style={{ borderColor: activeTheme.border }}
                        >
                          <BookOpen className="w-3 h-3 text-[#DA440D]" />
                          <span>{fontFamily === 'sans' ? 'Inter' : 'Lilita'}</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-65">
                          Paper
                        </span>
                        <div className="flex items-center gap-2">
                          {(Object.keys(PAPER_THEMES) as PaperThemeMode[]).map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => updatePrefs(fontSize, fontFamily, t)}
                              title={PAPER_THEMES[t].label}
                              aria-label={`Paper theme ${PAPER_THEMES[t].label}`}
                              className={`w-5 h-5 rounded-full border cursor-pointer transition-transform ${paperTheme === t
                                ? 'scale-110 ring-2 ring-[#DA440D] ring-offset-1'
                                : 'border-[#ADC3DE]'
                                }`}
                              style={{ backgroundColor: PAPER_THEMES[t].swatch }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Save Bookmark Icon */}
                <button
                  type="button"
                  onClick={toggleBookmark}
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Save blog'}
                  title={isBookmarked ? 'Saved' : 'Save'}
                  className={`w-11 h-11 sm:w-9 sm:h-9 rounded-full border inline-flex items-center justify-center transition-colors cursor-pointer ${isBookmarked
                    ? 'bg-[#E5F36D] text-[#102A56] border-[#E5F36D]'
                    : 'hover:border-[#DA440D]'
                    }`}
                  style={
                    !isBookmarked
                      ? {
                        backgroundColor: activeTheme.cardSurface,
                        borderColor: activeTheme.border,
                        color: activeTheme.text,
                      }
                      : undefined
                  }
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>

                {/* 4. WhatsApp Direct Share */}
                <button
                  type="button"
                  onClick={() => handleSocialShare('whatsapp')}
                  aria-label="Share on WhatsApp"
                  title="Share on WhatsApp"
                  className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border inline-flex items-center justify-center transition-colors hover:border-[#25D366] text-[#25D366] cursor-pointer"
                  style={{
                    backgroundColor: activeTheme.cardSurface,
                    borderColor: activeTheme.border,
                  }}
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                </button>

                {/* 5. Share Icon */}
                <button
                  type="button"
                  onClick={() => handleSocialShare('system')}
                  aria-label="Share link"
                  title={copiedLink ? 'Link Copied' : 'Share'}
                  className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border inline-flex items-center justify-center transition-colors hover:border-[#0944BA] cursor-pointer"
                  style={{
                    backgroundColor: activeTheme.cardSurface,
                    borderColor: activeTheme.border,
                    color: activeTheme.text,
                  }}
                >
                  {copiedLink ? (
                    <Check className="w-4 h-4 text-[#0944BA]" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Translation Error Notice (only if failed) */}
            {translateError && !isTranslating && (
              <div className="mt-3 px-4 py-2.5 rounded-[12px] bg-[#FFF0EA] border border-[#DA440D]/30 text-[#DA440D] text-[13px] font-medium flex flex-wrap items-center justify-between gap-2">
                <span>{translateError}</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fetchTranslation(selectedLang)}
                    className="inline-flex items-center gap-1 font-bold text-[#DA440D] hover:underline cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLang('en');
                      setTranslated(null);
                      setTranslateError('');
                    }}
                    className="font-bold text-[#102A56] hover:underline cursor-pointer text-[12px]"
                  >
                    Read in English
                  </button>
                </div>
              </div>
            )}

            {/* Compact Balanced Editorial Split Hero */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
              {/* Left Info Column */}
              <div className="lg:col-span-7 flex flex-col items-start gap-3.5 order-2 lg:order-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/category/${catSlug}`}
                    className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-[0.08em] no-underline border transition-colors hover:border-[#DA440D]"
                    style={{
                      backgroundColor: activeTheme.badgeBg,
                      borderColor: activeTheme.border,
                      color: activeTheme.isDark ? '#E5F36D' : '#102A56',
                    }}
                  >
                    {catLabel}
                  </Link>
                  <DietaryBadgePill
                    label={wellnessTag.label}
                    tone={wellnessTag.tone}
                  />
                </div>

                {/* Proportional Editorial Title (Clean 30px-40px, NOT giant 92px!) */}
                <h1
                  itemProp="headline"
                  className="gt-font-display text-[30px] sm:text-[36px] lg:text-[42px] leading-[1.12] tracking-[-0.025em]"
                  style={{ color: activeTheme.text }}
                >
                  {displayTitle}
                </h1>

                {displayExcerpt && (
                  <p
                    className="text-[15.5px] sm:text-[17px] leading-[1.6] max-w-[600px]"
                    style={{ color: activeTheme.muted }}
                  >
                    {displayExcerpt}
                  </p>
                )}

                {/* E-E-A-T Author, Reviewer, Date & Read Time Meta Strip */}
                <div
                  className="pt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12.5px] sm:text-[13px] font-medium"
                  style={{ color: activeTheme.muted }}
                >
                  <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: activeTheme.text }}>
                    <span className="w-5 h-5 rounded-full bg-[#102A56] text-[#E5F36D] text-[10px] font-bold inline-flex items-center justify-center shrink-0">
                      {authorInitial}
                    </span>
                    <span itemProp="author">{authorName}</span>
                    {article.authorRole && (
                      <span className="font-normal opacity-75 hidden sm:inline">
                        ({article.authorRole})
                      </span>
                    )}
                  </span>
                  <span className="opacity-35">&bull;</span>
                  <Link
                    href="/editorial-policy"
                    className="inline-flex items-center gap-1 text-[#15803D] font-semibold hover:underline no-underline"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      Reviewed by {article.reviewedBy || 'Dr. Radhika Sen, MBBS, DNB'}
                    </span>
                  </Link>
                  <span className="opacity-35">&bull;</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#DA440D]" />
                    <time dateTime={article.updatedDate || article.publishDate || article.date}>
                      Updated {formatNfDate(article.updatedDate || article.date)}
                    </time>
                  </span>
                  <span className="opacity-35">&bull;</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#0944BA]" />
                    <span>{article.readTime || '6 min read'}</span>
                  </span>
                </div>
              </div>

              {/* Right Proportional Cover Photo */}
              <div className="lg:col-span-5 order-1 lg:order-2">
                {showFeaturedImage && article.image ? (
                  <div
                    className="w-full h-[220px] sm:h-[280px] lg:h-[300px] rounded-[22px] overflow-hidden border shadow-[0_14px_34px_-12px_rgba(16,42,86,0.14)] relative"
                    style={{
                      borderColor: activeTheme.border,
                      backgroundColor: activeTheme.cardSurface,
                    }}
                  >
                    <GudTreeImg src={article.image} alt={displayTitle} eager />
                  </div>
                ) : (
                  <div
                    className="w-full h-[220px] sm:h-[280px] lg:h-[300px] rounded-[22px] border flex items-center justify-center p-6 text-center"
                    style={{
                      borderColor: activeTheme.border,
                      backgroundColor: activeTheme.cardSurface,
                    }}
                  >
                    <span className="gt-font-display text-[22px] opacity-70">
                      {siteName} &mdash; {catLabel}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* HAIRLINE SECTION DIVIDER */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div
            className="max-w-[1000px] mx-auto h-px"
            style={{ backgroundColor: activeTheme.border }}
          />
        </div>

        {/* ================================================================
            SECTION 2: CLEAN 2-COLUMN READING STAGE
            ================================================================ */}
        <section className="w-full px-4 sm:px-6 py-7 sm:py-10 lg:pb-14">
          <div className="max-w-[1000px] mx-auto flex flex-col lg:flex-row items-stretch lg:items-start gap-7 lg:gap-10">
            {/* LEFT STICKY RAIL */}
            <aside className="w-full lg:w-[235px] shrink-0 lg:sticky lg:top-[84px] flex flex-col gap-4">
              <div
                className="rounded-[18px] border overflow-hidden transition-colors"
                style={{
                  borderColor: activeTheme.border,
                  backgroundColor: activeTheme.cardSurface,
                }}
              >
                <button
                  type="button"
                  onClick={() => setTocOpen((v) => !v)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer"
                  aria-expanded={tocOpen}
                >
                  <span className="gt-font-display text-[17px] tracking-[-0.02em]">
                    In This Guide
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${tocOpen ? 'rotate-180' : ''
                      }`}
                    style={{ color: activeTheme.muted }}
                  />
                </button>

                {tocOpen && (
                  <div
                    className="border-t px-4 py-3.5"
                    style={{ borderColor: activeTheme.border }}
                  >
                    {tocHeadings.length > 0 ? (
                      <ul className="space-y-2">
                        {tocHeadings.map((h) => {
                          const isActive = activeTocId === h.id;
                          return (
                            <li key={h.id}>
                              <a
                                href={`#${h.id}`}
                                className={`block text-[13px] leading-snug transition-colors no-underline ${h.level === 3 ? 'pl-3' : ''
                                  } ${isActive
                                    ? 'font-bold text-[#DA440D]'
                                    : 'opacity-75 hover:opacity-100'
                                  }`}
                                style={{
                                  color: isActive ? '#DA440D' : activeTheme.text,
                                }}
                              >
                                {h.text}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p
                        className="text-[12.5px] leading-relaxed"
                        style={{ color: activeTheme.muted }}
                      >
                        Quick clean read &mdash; scroll right through.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Contextual Focus Hub Pillar Link (Topic Cluster SEO) */}
              <div
                className="rounded-[18px] border p-4 flex flex-col gap-2.5 transition-colors"
                style={{
                  borderColor: activeTheme.border,
                  backgroundColor: activeTheme.cardSurface,
                }}
              >
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#DA440D] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#DA440D]" />
                  <span>Health Goal Hub</span>
                </div>
                <div>
                  <Link
                    href={`/focus/${focusHub.slug}`}
                    className="gt-font-display text-[15px] leading-tight text-[#102A56] hover:text-[#0944BA] block transition-colors no-underline"
                    style={{ color: activeTheme.isDark ? '#E5F36D' : '#102A56' }}
                  >
                    {focusHub.title}
                  </Link>
                  <p
                    className="mt-1 text-[12px] leading-relaxed line-clamp-2"
                    style={{ color: activeTheme.muted }}
                  >
                    {focusHub.desc}
                  </p>
                </div>
                <Link
                  href={`/focus/${focusHub.slug}`}
                  className="mt-0.5 inline-flex items-center gap-1 text-[12px] font-bold text-[#0944BA] hover:underline"
                >
                  <span>Explore Pillar Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <Link
                href="/blog"
                className="rounded-[16px] border px-4 py-3 flex items-center justify-between text-[13px] font-bold no-underline transition-colors hover:border-[#DA440D]"
                style={{
                  borderColor: activeTheme.border,
                  backgroundColor: activeTheme.cardSurface,
                  color: activeTheme.text,
                }}
              >
                <span>Browse All Blogs</span>
                <ArrowRight className="w-4 h-4 text-[#DA440D]" />
              </Link>
            </aside>

            {/* RIGHT MAIN EDITORIAL PAPER CARD */}
            <div className="flex-1 min-w-0 w-full flex flex-col gap-10">
              <div
                className="rounded-[20px] sm:rounded-[24px] border p-4 sm:p-10 shadow-[0_6px_26px_-12px_rgba(16,42,86,0.06)] transition-colors"
                style={{
                  backgroundColor: activeTheme.cardSurface,
                  borderColor: activeTheme.border,
                }}
              >
                {isTranslating ? (
                  <div
                    className="mb-6 px-4 py-3 rounded-[14px] border border-[#0944BA]/30 bg-[#D6EDFF]/50 text-[#102A56] flex items-center justify-between gap-3 text-[13px] animate-pulse"
                  >
                    <div className="flex items-center gap-2.5">
                      <Loader2 className="w-4 h-4 text-[#0944BA] animate-spin shrink-0" />
                      <span className="font-semibold">
                        Translating article to {activeLangObj.nativeLabel} ({activeLangObj.label})...
                      </span>
                    </div>
                    <span className="text-[11.5px] opacity-75 hidden sm:inline">Takes ~1 second</span>
                  </div>
                ) : selectedLang !== 'en' ? (
                  <div
                    className="mb-6 px-3.5 py-2.5 rounded-[12px] border flex flex-wrap items-center justify-between gap-2 text-[12.5px]"
                    style={{
                      backgroundColor: activeTheme.isDark
                        ? 'rgba(229,243,109,0.08)'
                        : '#FFF9EC',
                      borderColor: activeTheme.border,
                    }}
                  >
                    <span className="font-medium">
                      Reading in{' '}
                      <strong>
                        {activeLangObj.nativeLabel} ({activeLangObj.label})
                      </strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedLang('en');
                        setTranslated(null);
                        setTranslateError('');
                      }}
                      className="font-bold text-[#0944BA] hover:underline cursor-pointer"
                    >
                      Switch to English
                    </button>
                  </div>
                ) : null}

                {/* Prose Body */}
                <div
                  itemProp="articleBody"
                  className={`gt-article-body ${fontSizeClass} ${fontFamilyClass}`}
                >
                  <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
                </div>

                {/* Was this audit helpful? Feedback & Viral Loop */}
                <div
                  className="mt-8 p-4 sm:p-5 rounded-[16px] border text-center flex flex-col items-center justify-center gap-3 transition-all"
                  style={{
                    borderColor: activeTheme.border,
                    backgroundColor: activeTheme.cardSurface,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#DA440D]" />
                    <span className="font-bold text-[14px] sm:text-[15px]" style={{ color: activeTheme.text }}>
                      Did this audit help you choose cleaner snacks?
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setHasLiked(true)}
                      className={`px-4 py-2 rounded-full font-bold text-[13px] inline-flex items-center gap-1.5 transition-all cursor-pointer ${hasLiked
                        ? 'bg-[#15803D] text-white'
                        : 'bg-[#EFF6FF] text-[#0944BA] hover:bg-[#DBEAFE]'
                        }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} />
                      <span>{hasLiked ? 'Thanks for the feedback! 🌱' : 'Yes, Helpful!'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSocialShare('whatsapp')}
                      className="px-4 py-2 rounded-full font-bold text-[13px] inline-flex items-center gap-1.5 bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Share with Family</span>
                    </button>
                  </div>
                </div>

                {/* Scientific & Regulatory Citations (E-E-A-T Verification) */}
                {Array.isArray(article.sources) && article.sources.length > 0 && (
                  <div
                    className="mt-8 p-4 sm:p-5 rounded-[16px] border"
                    style={{
                      borderColor: activeTheme.border,
                      backgroundColor: activeTheme.surface,
                    }}
                  >
                    <h3 className="text-[14px] font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5" style={{ color: activeTheme.text }}>
                      <BookOpen className="w-4 h-4 text-[#0944BA]" />
                      <span>Sources &amp; Fact-Check References</span>
                    </h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-[13px]" style={{ color: activeTheme.muted }}>
                      {article.sources.map((src) => (
                        <li key={src.url}>
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0944BA] hover:underline font-medium"
                          >
                            {src.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Author & Editorial Review Verification Box */}
                <div
                  className="mt-8 p-4 sm:p-5 rounded-[16px] border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  style={{
                    borderColor: activeTheme.border,
                    backgroundColor: activeTheme.surface,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#102A56] text-[#E5F36D] font-bold text-[15px] inline-flex items-center justify-center shrink-0">
                      {authorInitial}
                    </span>
                    <div className="text-[13px] leading-relaxed">
                      <div className="font-bold" style={{ color: activeTheme.text }}>
                        Written by {authorName}
                        {article.authorRole ? ` — ${article.authorRole}` : ''}
                      </div>
                      <div style={{ color: activeTheme.muted }}>
                        Reviewed by{' '}
                        <strong style={{ color: activeTheme.text }}>
                          {article.reviewedBy || 'Dr. Radhika Sen, MBBS, DNB'}
                        </strong>{' '}
                        ({article.reviewedByRole || 'Clinical Nutrition & Metabolic Health Reviewer'})
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/editorial-policy"
                    className="shrink-0 px-3.5 py-2 rounded-full border text-[12px] font-bold text-[#0944BA] hover:bg-[#EEF4FF] no-underline transition-colors text-center"
                    style={{ borderColor: activeTheme.border }}
                  >
                    Audit Methodology &rarr;
                  </Link>
                </div>

                {/* Clean Nutrition Advisory */}
                <div
                  className="mt-10 p-4 sm:p-5 rounded-[16px] border flex items-start gap-3.5"
                  style={{
                    borderColor: activeTheme.border,
                    backgroundColor: activeTheme.isDark
                      ? activeTheme.surface
                      : '#EFF6FF',
                  }}
                >
                  <ShieldCheck className="w-5 h-5 text-[#0944BA] shrink-0 mt-0.5" />
                  <div className="text-[13.5px] leading-relaxed">
                    <strong className="block mb-0.5 font-semibold">
                      {siteName} Nutrition Advisory
                    </strong>
                    <span
                      style={{
                        color: activeTheme.isDark ? activeTheme.muted : '#334155',
                      }}
                    >
                      Our guides focus on honest snack labels, clean pantry swaps, and everyday good eating. For personal health advice, please consult a qualified dietitian or doctor.
                    </span>
                  </div>
                </div>

                {/* Social Share Row */}
                <div
                  className="mt-8 pt-6 border-t flex flex-wrap items-center justify-between gap-4"
                  style={{ borderColor: activeTheme.border }}
                >
                  <span className="gt-font-display text-[19px] tracking-[-0.02em]">
                    Share this guide
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSocialShare('whatsapp')}
                      aria-label="Share on WhatsApp"
                      title="WhatsApp"
                      className="w-11 h-11 sm:w-10 sm:h-10 rounded-[12px] sm:rounded-[10px] border flex items-center justify-center transition-colors hover:border-[#DA440D] hover:text-[#DA440D] cursor-pointer"
                      style={{
                        borderColor: activeTheme.border,
                        backgroundColor: activeTheme.surface,
                      }}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 0 0-8.54 15.2L2 22l4.94-1.3A10 10 0 1 0 12 2z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSocialShare('x')}
                      aria-label="Share on X"
                      title="X / Twitter"
                      className="w-11 h-11 sm:w-10 sm:h-10 rounded-[12px] sm:rounded-[10px] border flex items-center justify-center transition-colors hover:border-[#DA440D] hover:text-[#DA440D] cursor-pointer"
                      style={{
                        borderColor: activeTheme.border,
                        backgroundColor: activeTheme.surface,
                      }}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSocialShare('facebook')}
                      aria-label="Share on Facebook"
                      title="Facebook"
                      className="w-11 h-11 sm:w-10 sm:h-10 rounded-[12px] sm:rounded-[10px] border flex items-center justify-center transition-colors hover:border-[#DA440D] hover:text-[#DA440D] cursor-pointer"
                      style={{
                        borderColor: activeTheme.border,
                        backgroundColor: activeTheme.surface,
                      }}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.2-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.2H8v3h2.5V21h3z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSocialShare('linkedin')}
                      aria-label="Share on LinkedIn"
                      title="LinkedIn"
                      className="w-11 h-11 sm:w-10 sm:h-10 rounded-[12px] sm:rounded-[10px] border flex items-center justify-center transition-colors hover:border-[#DA440D] hover:text-[#DA440D] cursor-pointer"
                      style={{
                        borderColor: activeTheme.border,
                        backgroundColor: activeTheme.surface,
                      }}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSocialShare('system')}
                      aria-label="Copy link or system share"
                      title={copiedLink ? 'Link Copied' : 'Share / Copy Link'}
                      className="w-11 h-11 sm:w-10 sm:h-10 rounded-[12px] sm:rounded-[10px] border flex items-center justify-center transition-colors hover:border-[#DA440D] hover:text-[#DA440D] cursor-pointer"
                      style={{
                        borderColor: activeTheme.border,
                        backgroundColor: activeTheme.surface,
                      }}
                    >
                      {copiedLink ? (
                        <Check className="w-4 h-4 text-[#0944BA]" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Previous / Next Navigation Cards */}
              {(resolvedPrev || resolvedNext) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resolvedPrev ? (
                    <Link
                      href={getBlogUrl(resolvedPrev)}
                      className="group p-4 sm:p-5 rounded-[18px] border flex flex-col items-start gap-2 no-underline transition-all hover:border-[#DA440D]"
                      style={{
                        borderColor: activeTheme.border,
                        backgroundColor: activeTheme.cardSurface,
                      }}
                    >
                      <span className="inline-flex items-center gap-1.5 text-[11.5px] font-extrabold uppercase tracking-wider text-[#DA440D]">
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Previous</span>
                      </span>
                      <span
                        className="gt-font-display text-[17px] leading-snug line-clamp-2 group-hover:text-[#0944BA] transition-colors"
                        style={{ color: activeTheme.text }}
                      >
                        {resolvedPrev.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {resolvedNext && (
                    <Link
                      href={getBlogUrl(resolvedNext)}
                      className="group p-4 sm:p-5 rounded-[18px] border flex flex-col items-start sm:items-end sm:text-right gap-2 no-underline transition-all hover:border-[#DA440D]"
                      style={{
                        borderColor: activeTheme.border,
                        backgroundColor: activeTheme.cardSurface,
                      }}
                    >
                      <span className="inline-flex items-center gap-1.5 text-[11.5px] font-extrabold uppercase tracking-wider text-[#0944BA]">
                        <span>Next</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <span
                        className="gt-font-display text-[17px] leading-snug line-clamp-2 group-hover:text-[#0944BA] transition-colors"
                        style={{ color: activeTheme.text }}
                      >
                        {resolvedNext.title}
                      </span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* HAIRLINE DIVIDER */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div
            className="max-w-[1000px] mx-auto h-px"
            style={{ backgroundColor: activeTheme.border }}
          />
        </div>

        {/* ================================================================
            SECTION 3: CLEAN RELATED READS ("You Might Also Enjoy")
            ================================================================ */}
        {relatedGrid.length > 0 && (
          <section className="w-full max-w-full overflow-hidden px-4 sm:px-6 py-10 sm:py-14">
            <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-6 min-w-0 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#0944BA]">
                    More Honest Reads
                  </span>
                  <h2 className="gt-font-display text-[28px] sm:text-[34px] leading-tight mt-0.5">
                    You Might Also Enjoy
                  </h2>
                </div>
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border gt-font-display text-[14.5px] no-underline w-fit transition-colors hover:bg-[#102A56] hover:text-[#E5F36D] hover:border-[#102A56]"
                  style={{
                    borderColor: activeTheme.border,
                    backgroundColor: activeTheme.cardSurface,
                    color: activeTheme.text,
                  }}
                >
                  <span>All Blogs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="gt-hscroll-md md:grid md:grid-cols-3 gap-3.5 md:gap-5 pb-2 md:pb-0">
                {relatedGrid.map((rel) => {
                  const relHref = getBlogUrl(rel);
                  const relCat = normalizeCatName(rel.category);
                  const relExcerpt = rel.excerpt || rel.paragraphs?.[0] || '';

                  return (
                    <article
                      key={rel.slug}
                      className="group w-[238px] md:w-auto min-w-0 rounded-[20px] md:rounded-[22px] border p-3 md:p-3.5 flex flex-col gap-2.5 md:gap-3 shadow-[0_4px_18px_-8px_rgba(16,42,86,0.08)] hover:border-[#DA440D] hover:-translate-y-1 transition-all duration-300"
                      style={{
                        borderColor: activeTheme.border,
                        backgroundColor: activeTheme.cardSurface,
                      }}
                    >
                      <Link
                        href={relHref}
                        className="relative w-full h-[146px] md:h-[185px] shrink-0 rounded-[14px] md:rounded-[16px] overflow-hidden block border no-underline"
                        style={{ borderColor: activeTheme.border }}
                      >
                        <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                          <GudTreeImg src={rel.image} alt={rel.title} />
                        </div>

                        <span
                          className="inline-block absolute top-2 left-2 md:top-2.5 md:left-2.5 px-2.5 py-0.5 md:py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md border"
                          style={{
                            backgroundColor: activeTheme.isDark
                              ? 'rgba(13,18,11,0.88)'
                              : 'rgba(255,249,236,0.94)',
                            borderColor: activeTheme.border,
                            color: activeTheme.text,
                          }}
                        >
                          {relCat}
                        </span>
                      </Link>

                      <div className="px-0.5 py-0.5 flex flex-col gap-1.5 flex-1 min-w-0">
                        <div
                          className="flex items-center gap-2 text-[11px] font-semibold"
                          style={{ color: activeTheme.muted }}
                        >
                          <span className="shrink-0 text-[#0944BA]">{rel.readTime || '4 min read'}</span>
                        </div>

                        <Link
                          href={relHref}
                          className="flex flex-col gap-1 no-underline"
                        >
                          <EditorialTitle
                            title={rel.title}
                            variant="card"
                            light={activeTheme.isDark}
                            className="gt-font-display text-[17px] md:text-[19px] leading-[1.2] line-clamp-2 group-hover:text-[#0944BA] transition-colors"
                          />
                          {relExcerpt && (
                            <p
                              className="hidden md:block text-[13.5px] leading-[1.55] line-clamp-2 gt-font-sans"
                              style={{ color: activeTheme.muted }}
                            >
                              {relExcerpt}
                            </p>
                          )}
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Mobile Sticky Bottom Reader Action Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF] border-t border-[#E2E8F0] px-4 py-2.5 shadow-[0_-4px_16px_rgba(16,42,86,0.08)] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setHasLiked(!hasLiked)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer ${hasLiked ? 'bg-[#15803D] text-white' : 'bg-[#F1F5F9] text-[#102A56]'
              }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} />
            <span>{hasLiked ? 'Helpful' : 'Helpful?'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialShare('whatsapp')}
            className="flex-1 max-w-[200px] py-1.5 px-3 rounded-full bg-[#25D366] text-white font-bold text-[12.5px] inline-flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Share on WhatsApp</span>
          </button>

          <Link
            href="/news"
            className="px-3 py-1.5 rounded-full text-[12px] font-bold bg-[#EEF3FF] text-[#2F54EB] inline-flex items-center gap-0.5 no-underline"
          >
            <span>More</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>
    </div>
  );
}
