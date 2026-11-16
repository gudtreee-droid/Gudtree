import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';
import { getSiteBaseUrl } from '@/lib/siteUrl';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showBackLink?: boolean;
  backHref?: string;
  backLabel?: string;
  rightBadge?: string;
  includeJsonLd?: boolean;
}

export default function Breadcrumbs({
  items,
  className = '',
  showBackLink = false,
  backHref = '/',
  backLabel = 'Back',
  rightBadge,
  includeJsonLd = true,
}: BreadcrumbsProps) {
  const baseUrl = getSiteBaseUrl();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const fullUrl = item.href
        ? item.href.startsWith('http')
          ? item.href
          : `${baseUrl}${item.href.startsWith('/') ? item.href : `/${item.href}`}`
        : undefined;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        ...(fullUrl ? { item: fullUrl } : {}),
      };
    }),
  };

  return (
    <>
      {includeJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <nav
        aria-label="Breadcrumb"
        className={`w-full flex items-center justify-between flex-wrap gap-2 py-3 mb-6 border-b border-[#ADC3DE]/60 text-[12px] text-[#666666] gt-font-sans ${className}`}
      >
        <div className="flex items-center gap-1.5 flex-wrap overflow-hidden gt-no-scrollbar">
          {showBackLink && (
            <>
              <Link
                href={backHref}
                className="hover:text-[#DA440D] flex items-center gap-1 mr-2 text-[#102A56] font-semibold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{backLabel}</span>
              </Link>
              <span className="text-[#ADC3DE] mr-1">|</span>
            </>
          )}

          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            const isFirst = idx === 0;

            return (
              <React.Fragment key={`${item.label}-${idx}`}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#999999] select-none" />}
                {isLast || !item.href ? (
                  <span
                    className="font-semibold text-[#102A56] truncate max-w-[200px] sm:max-w-[360px]"
                    title={item.label}
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-[#DA440D] transition-colors flex items-center gap-1 text-[#666666]"
                  >
                    {isFirst && <Home className="w-3 h-3 inline-block -mt-0.5" />}
                    <span>{item.label}</span>
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {rightBadge && (
          <span className="gt-badge-olive shrink-0">
            {rightBadge}
          </span>
        )}
      </nav>
    </>
  );
}
