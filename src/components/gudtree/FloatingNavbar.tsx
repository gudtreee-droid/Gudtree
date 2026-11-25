'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { Article, Category } from '@/types';
import { getBlogUrl } from '@/lib/blogUrl';
import { normalizeCatName } from '@/lib/newsflashFormat';
import EditorialTitle from './EditorialTitle';

let cachedSearchArticles: Article[] | null = null;

export default function FloatingNavbar() {
  const pathname = usePathname();
  const [categories] = useState<Category[]>(CATEGORIES);
  const [articles, setArticles] = useState<Article[]>(
    () => cachedSearchArticles || []
  );
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 14);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
        setIsSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isSearchOpen || articles.length > 0 || loadingSearch) return;
    setLoadingSearch(true);
    fetch('/api/articles?summary=1')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          cachedSearchArticles = data;
          setArticles(data);
        }
      })
      .catch(() => { })
      .finally(() => setLoadingSearch(false));
  }, [isSearchOpen, articles.length, loadingSearch]);

  useEffect(() => {
    setIsDrawerOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return articles.slice(0, 6);
    return articles
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          (a.category || '').toLowerCase().includes(q) ||
          (a.excerpt || '').toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [articles, searchQuery]);

  if (isAdmin) return null;

  const visibleCats = categories.filter(
    (c) => c.slug !== 'home' && c.isVisible !== false
  );

  const navLinks = [
    { label: 'Explore Blogs', href: '/blog' },
    { label: 'Food Audits', href: '/category/label-audits' },
    { label: 'Health Swaps', href: '/#blogs-shelf' },
    { label: 'All Topics', href: '/category' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[60px] sm:h-[64px] w-full max-w-full bg-[#FFFFFF]/96 backdrop-blur-md transition-shadow duration-200 ${scrolled ? 'shadow-[0_4px_20px_rgba(16,42,86,0.08)]' : ''
          }`}
      >
        <div className="max-w-[1060px] mx-auto h-full px-4 sm:px-5 flex items-center justify-between gap-3">
          {/* Official Brand Logo */}
          <Link
            href="/"
            className="flex items-center no-underline shrink-0 py-1"
            aria-label="Gud Tree — Healthy Packed Snacks Home"
          >
            <img
              src="/images/gudtree-logo.webp"
              alt="Gud Tree — Healthy Packed Snacks"
              width={130}
              height={40}
              className="h-[34px] sm:h-[40px] w-auto object-contain"
            />
          </Link>

          {/* Right Dot-Separated Clean Navigation Links + Search */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center"
            >
              {navLinks.map((item, idx) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname?.startsWith(item.href.split('#')[0]) &&
                    item.href !== '/';
                return (
                  <React.Fragment key={item.href}>
                    {idx > 0 && (
                      <span
                        aria-hidden="true"
                        className="mx-2 lg:mx-3 text-[#14181E]/35 text-[12px] select-none"
                      >
                        •
                      </span>
                    )}
                    <Link
                      href={item.href}
                      className={`text-[13.5px] lg:text-[14px] tracking-[-0.01em] whitespace-nowrap transition-colors no-underline ${active
                        ? 'font-bold text-[#2F54EB]'
                        : 'font-medium text-[#102A56]/80 hover:text-[#2F54EB]'
                        }`}
                    >
                      {item.label}
                    </Link>
                  </React.Fragment>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-full text-[#14181E]/75 hover:text-[#14181E] hover:bg-[#14181E]/6 hover:scale-105 active:scale-95 cursor-pointer transition-all"
              aria-label="Search GudTree"
              title="Search snacks & nutrition (Ctrl+K)"
            >
              <Search className="w-[18px] h-[18px] sm:w-4 sm:h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FFF9EC] border border-[#ADC3DE] text-[#102A56] hover:bg-[#102A56] hover:text-[#E5F36D] transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}

      {/* Search Overlay Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[80] bg-[#102A56]/45 backdrop-blur-sm flex items-start justify-center pt-20 sm:pt-28 px-4"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#FFF9EC] border border-[#ADC3DE] rounded-[28px] shadow-[0_24px_60px_-12px_rgba(16,42,86,0.3)] overflow-hidden animate-gt-fadeup"
          >
              <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-[#ADC3DE]/60">
                <Search className="w-5 h-5 text-[#DA440D] shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search healthy snacks, diabetes diet, makhana, palm oil audits..."
                  className="flex-1 bg-transparent text-[16px] sm:text-[15px] text-[#102A56] placeholder:text-[#334155] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="Close search"
                  className="w-11 h-11 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-[#FFF9EC] text-[#334155] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-2">
                {loadingSearch ? (
                  <p className="text-center py-8 text-[13px] text-[#334155]">
                    Loading GudTree guides...
                  </p>
                ) : searchResults.length === 0 ? (
                  <p className="text-center py-8 text-[14px] text-[#334155]">
                    No matching articles found for &ldquo;{searchQuery}&rdquo;.
                  </p>
                ) : (
                  searchResults.map((art) => (
                    <Link
                      key={art.slug}
                      href={getBlogUrl(art)}
                      onClick={() => setIsSearchOpen(false)}
                      className="group flex items-start justify-between gap-4 p-3.5 rounded-[18px] bg-white border border-[#ADC3DE]/50 hover:border-[#DA440D] transition-colors no-underline"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wider text-[#0944BA] mb-1">
                          <span>{normalizeCatName(art.category)}</span>
                          <span className="text-[#999999] font-normal">
                            • {art.readTime || '4 min read'}
                          </span>
                        </div>
                        <EditorialTitle
                          title={art.title}
                          variant="compact"
                          as="h4"
                          className="text-[18px] text-[#102A56] leading-snug"
                        />
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#334155] group-hover:text-[#DA440D] shrink-0 mt-2 transition-colors" />
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
      )}

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-[80] bg-[#102A56]/45 backdrop-blur-sm flex justify-end"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs h-full bg-[#FFF9EC] border-l border-[#ADC3DE] p-6 flex flex-col gap-6 overflow-y-auto"
          >
              <div className="flex items-center justify-between pb-4 border-b border-[#ADC3DE]/60">
                <img
                  src="/images/gudtree-logo.webp"
                  alt="Gud Tree — Healthy Packed Snacks"
                  width={104}
                  height={32}
                  className="h-[32px] w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close menu"
                  className="w-11 h-11 sm:w-8 sm:h-8 rounded-full bg-white border border-[#ADC3DE] flex items-center justify-center text-[#102A56] cursor-pointer"
                >
                  <X className="w-5 h-5 sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                {navLinks.map((item) => {
                  const active =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname?.startsWith(item.href.split('#')[0]) &&
                      item.href !== '/';
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className={`min-h-[44px] flex items-center px-4 py-2.5 rounded-2xl text-[16px] transition-colors no-underline ${
                        active
                          ? 'font-bold bg-[#EEF4FF] text-[#2F54EB]'
                          : 'font-semibold text-[#102A56] hover:bg-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[#ADC3DE]/60">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#334155] mb-2.5">
                  9 Clean Categories
                </div>
                <div className="flex flex-wrap gap-2">
                  {visibleCats.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setIsDrawerOpen(false)}
                      className="min-h-[38px] inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-[#ADC3DE] text-[12.5px] font-medium text-[#102A56] hover:border-[#2F54EB] hover:text-[#2F54EB] no-underline"
                    >
                      {normalizeCatName(cat.name)}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#ADC3DE]/60">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#DA440D] mb-2.5">
                  Everyday Diet Focus
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Low-Sugar Diet', href: '/focus/diabetes' },
                    { label: 'PCOS Food Guide', href: '/focus/pcos' },
                    { label: 'Budget Protein', href: '/focus/weight' },
                    { label: 'Bloat & Acidity', href: '/focus/gut' },
                    { label: 'Hangover Reset', href: '/focus/heart' },
                  ].map((hub) => (
                    <Link
                      key={hub.href}
                      href={hub.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className="min-h-[38px] inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-[#ADC3DE] text-[12px] font-semibold text-[#102A56] hover:border-[#0944BA] no-underline"
                    >
                      {hub.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
      )}
    </>
  );
}
