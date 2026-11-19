import React from 'react';
import { linkifyText } from '@/lib/linkify';

interface EditorialTitleProps {
  title: string;
  variant?: 'hero' | 'feature' | 'card' | 'compact';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span';
  className?: string;
  linkify?: boolean;
  light?: boolean;
}

/**
 * Splits a blog title so the very first letter is rendered as an
 * oversized Sunday Crumb Lilita One drop-initial, giving every GudTree
 * headline monumental editorial warmth while keeping full SEO/a11y parity.
 */
function splitFirstLetter(rawTitle: string): {
  prefix: string;
  firstLetter: string;
  rest: string;
} {
  const trimmed = (rawTitle || '').trim();
  if (!trimmed) {
    return { prefix: '', firstLetter: '', rest: '' };
  }

  const match = trimmed.match(/^(['"“‘(\[]*)([A-Za-z0-9\u0900-\u097F])([\s\S]*)$/);
  if (match) {
    return {
      prefix: match[1] || '',
      firstLetter: match[2],
      rest: match[3] || '',
    };
  }

  return {
    prefix: '',
    firstLetter: trimmed.charAt(0),
    rest: trimmed.slice(1),
  };
}

export default function EditorialTitle({
  title,
  variant = 'card',
  as: Tag = 'h3',
  className = '',
  linkify = false,
  light = false,
}: EditorialTitleProps) {
  const { prefix, firstLetter, rest } = splitFirstLetter(title);

  const bigLetterScaleMap: Record<NonNullable<EditorialTitleProps['variant']>, string> = {
    hero: 'text-[1.2em] leading-none mr-[0.02em]',
    feature: 'text-[1.1em] leading-none mr-[0.01em]',
    card: 'text-current',
    compact: 'text-current',
  };

  const accentColorClass = light
    ? 'text-[#E5F36D]'
    : 'text-current transition-colors duration-200';

  return (
    <Tag
      className={`gt-title-first-big gt-font-display font-normal tracking-[-0.04em] overflow-visible pt-1.5 ${className}`}
      style={{ overflowWrap: 'break-word' }}
    >
      {prefix && <span>{prefix}</span>}
      {firstLetter && (
        <span
          aria-hidden="true"
          className={`gt-font-display font-normal inline-block align-baseline tracking-[-0.04em] ${bigLetterScaleMap[variant]} ${accentColorClass}`}
        >
          {firstLetter}
        </span>
      )}
      <span className="sr-only">{firstLetter}</span>
      <span>{linkify ? linkifyText(rest) : rest}</span>
    </Tag>
  );
}
