'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Article } from '@/types';
import { getBlogUrl } from '@/lib/blogUrl';
import { formatNfDate, normalizeCatName } from '@/lib/newsflashFormat';
import GudTreeImg from './GudTreeImg';
import EditorialTitle from './EditorialTitle';
import DietaryBadgePill, { inferWellnessTag } from './DietaryBadgePill';
import { GT_SPRING } from './MotionPrimitives';

export function GudTreeSectionHeader({
  eyebrow,
  title,
  href,
  viewAllLabel = 'Explore All',
  dark = false,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  viewAllLabel?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b ${
        dark ? 'border-white/15' : 'border-[#ADC3DE]/60'
      } ${className}`}
    >
      <div className="flex flex-col gap-1.5">
        {eyebrow && (
          <span
            className={`text-[11.5px] font-bold uppercase tracking-[0.12em] ${
              dark ? 'text-[#E5F36D]' : 'text-[#0944BA]'
            }`}
          >
            {eyebrow}
          </span>
        )}
        <h2
          className={`sc-display-h2 ${
            dark ? 'text-[#FFF9EC]' : 'text-[#102A56]'
          }`}
        >
          {title}
        </h2>
      </div>

      {href && (
        <Link
          href={href}
          className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border gt-font-display text-[15px] tracking-[-0.02em] transition-all duration-200 w-fit no-underline ${
            dark
              ? 'border-white/25 text-[#FFF9EC] hover:bg-[#DA440D] hover:border-[#DA440D]'
              : 'border-[#ADC3DE] bg-[#FFFFFF] text-[#102A56] hover:bg-[#102A56] hover:text-[#E5F36D] hover:border-[#102A56]'
          }`}
        >
          <span>{viewAllLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}

export function GudTreeStoryCard({
  article,
  imageHeightClass = 'h-[210px]',
  showExcerpt = true,
  index = 0,
}: {
  article: Article;
  imageHeightClass?: string;
  showExcerpt?: boolean;
  index?: number;
}) {
  const url = getBlogUrl(article);
  const catLabel = normalizeCatName(article.category);
  const wellness = inferWellnessTag(article.title, article.category, article.tag);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={GT_SPRING}
      className="h-full min-w-0"
    >
      <Link
        href={url}
        className="group h-full flex flex-col bg-[#FFFFFF] border border-[#ADC3DE]/65 rounded-[24px] p-4 shadow-[0_4px_20px_-4px_rgba(16,42,86,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(16,42,86,0.14)] hover:border-[#DA440D] transition-all duration-300 no-underline"
      >
        <div className={`gt-img-wrap w-full ${imageHeightClass} mb-4`}>
          <GudTreeImg
            src={article.image}
            alt={article.title}
            fallbackIndex={index}
          />
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFF9EC]/95 backdrop-blur-sm border border-[#ADC3DE] text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#102A56]">
              {catLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          <DietaryBadgePill label={wellness.label} tone={wellness.tone} />
          {article.readTime && (
            <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#334155]">
              <Clock className="w-3 h-3 text-[#0944BA]" />
              {article.readTime}
            </span>
          )}
        </div>

        <EditorialTitle
          title={article.title}
          variant="card"
          as="h3"
          className="sc-display-h3 text-[#102A56] group-hover:text-[#0944BA] transition-colors mb-2.5"
        />

        {showExcerpt && article.excerpt && (
          <p className="text-[15px] leading-[1.55] tracking-[-0.015em] text-[#334155] line-clamp-2 mb-4 flex-1">
            {article.excerpt}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-[#ADC3DE]/40 flex items-center justify-between text-[12.5px] text-[#334155]">
          <span className="font-semibold text-[#102A56] truncate max-w-[150px]">
            {article.author || 'GudTree Nutrition'}
          </span>
          <span className="gt-font-mono text-[11px] text-[#999999]">
            {formatNfDate(article.date)}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function GudTreeCompactCard({
  article,
  hasBorder = true,
  index = 0,
}: {
  article: Article;
  hasBorder?: boolean;
  index?: number;
}) {
  const url = getBlogUrl(article);
  const catLabel = normalizeCatName(article.category);

  return (
    <Link
      href={url}
      className={`group flex items-start gap-3.5 py-3.5 no-underline transition-colors ${
        hasBorder ? 'border-b border-[#ADC3DE]/50' : ''
      }`}
    >
      <div className="gt-img-wrap w-20 h-20 rounded-[14px] shrink-0">
        <GudTreeImg
          src={article.image}
          alt={article.title}
          fallbackIndex={index}
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#DA440D] mb-1">
          <span>{catLabel}</span>
          {article.readTime && (
            <>
              <span className="w-1 h-1 rounded-full bg-[#999999]" />
              <span className="text-[#334155] font-medium lowercase">
                {article.readTime}
              </span>
            </>
          )}
        </div>
        <EditorialTitle
          title={article.title}
          variant="compact"
          as="h4"
          className="text-[18px] sm:text-[19px] leading-[1.18] text-[#102A56] group-hover:text-[#0944BA] transition-colors"
        />
      </div>
    </Link>
  );
}
