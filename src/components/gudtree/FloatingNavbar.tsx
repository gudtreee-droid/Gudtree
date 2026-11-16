'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { Article, Category } from '@/types';
import { getBlogUrl } from '@/lib/blogUrl';
import { normalizeCatName, formatNfDate } from '@/lib/newsflashFormat';
import EditorialTitle from './EditorialTitle';
import { GT_SPRING } from './MotionPrimitives';

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
    { label: 'Home', href: '/' },
    { label: 'Snack Guides', href: '/news' },
    { label: 'Patient Care', href: '/#patient-care' },
    { label: 'Topics', href: '/category' },
    { label: 'Get in touch', href: '/contact' },
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
              src="/images/gudtree-logo.png"
              alt="Gud Tree — Healthy Packed Snacks"
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
                      className={`text-[13px] lg:text-[13.5px] tracking-[-0.01em] whitespace-nowrap transition-colors no-underline ${active
                        ? 'font-bold text-[#14181E]'
                        : 'font-medium text-[#14181E]/75 hover:text-[#14181E]'
                        }`}
                    >
                      {item.label}
                    </Link>
                  </React.Fragment>
                );
              })}
            </nav>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={GT_SPRING}
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-full text-[#14181E]/75 hover:text-[#14181E] hover:bg-[#14181E]/6 cursor-pointer transition-colors"
              aria-label="Search GudTree"
              title="Search snacks & nutrition (Ctrl+K)"
            >
              <Search className="w-[18px] h-[18px] sm:w-4 sm:h-4" />
            </motion.button>

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
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[#102A56]/45 backdrop-blur-sm flex items-start justify-center pt-20 sm:pt-28 px-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={GT_SPRING}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#FFF9EC] border border-[#ADC3DE] rounded-[28px] shadow-[0_24px_60px_-12px_rgba(16,42,86,0.3)] overflow-hidden"
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
                            • {formatNfDate(art.date)}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[#102A56]/45 backdrop-blur-sm flex justify-end"
            onClick={() => setIsDrawerOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={GT_SPRING}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xs h-full bg-[#FFF9EC] border-l border-[#ADC3DE] p-6 flex flex-col gap-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#ADC3DE]/60">
                <img
                  src="/images/gudtree-logo.png"
                  alt="Gud Tree — Healthy Packed Snacks"
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
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className="min-h-[44px] flex items-center px-4 py-2.5 rounded-2xl gt-font-display text-[17px] text-[#102A56] hover:bg-[#D6EDFF]/70 no-underline transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-[#ADC3DE]/60">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#334155] mb-3">
                  Browse Categories
                </div>
                <div className="flex flex-wrap gap-2">
                  {visibleCats.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setIsDrawerOpen(false)}
                      className="min-h-[40px] inline-flex items-center px-3.5 py-2 rounded-full bg-white border border-[#ADC3DE] text-[13px] font-medium text-[#102A56] hover:border-[#DA440D] no-underline"
                    >
                      {normalizeCatName(cat.name)}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
