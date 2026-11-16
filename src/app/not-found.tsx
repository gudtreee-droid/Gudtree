'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CATEGORIES as INITIAL_CATEGORIES } from '@/data/categories';
import { Category } from '@/types';
import EditorialTitle from '@/components/gudtree/EditorialTitle';

export default function NotFound() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        const list = Array.isArray(payload) ? payload : payload?.data;
        if (Array.isArray(list) && list.length > 0) {
          setCategories(list.filter((cat: Category) => cat.isVisible !== false));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="gt-container py-16 sm:py-24 text-center max-w-2xl mx-auto">
      <div className="mb-5 flex justify-center">
        <span className="gt-badge-caramel">Edition Error 404</span>
      </div>

      <EditorialTitle
        as="h1"
        title="Story Not Found"
        variant="hero"
        className="text-[#102A56] mb-4 justify-center"
      />

      <p className="sc-lead mb-8 max-w-xl mx-auto">
        The requested nutrition guide, snack review, or editorial shelf could not be found in the current GudTree archives.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <Link
          href="/"
          className="bg-[#102A56] hover:bg-[#DA440D] text-[#FFF9EC] sc-display-sm text-[14px] px-6 h-11 rounded-full transition-colors inline-flex items-center gap-2 no-underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return To GudTree Home</span>
        </Link>
        <Link
          href="/news"
          className="border border-[#ADC3DE] bg-white hover:border-[#DA440D] text-[#102A56] sc-display-sm text-[14px] px-6 h-11 rounded-full transition-colors inline-flex items-center gap-2 no-underline"
        >
          <span>Browse All Guides</span>
        </Link>
      </div>

      <div className="pt-8 border-t border-[#ADC3DE]/60">
        <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#666666] mb-4">
          Explore Nutrition Shelves
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.slice(0, 14).map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="text-[12px] font-semibold bg-white hover:bg-[#DA440D] hover:text-white border border-[#ADC3DE]/70 px-3.5 py-1.5 rounded-full transition-colors text-[#102A56] no-underline"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
