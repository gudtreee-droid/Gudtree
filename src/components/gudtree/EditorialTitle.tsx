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
 * Renders GudTree article and blog headlines in clean, high-legibility
 * Plus Jakarta Sans without DOM character splitting so both readers and
 * search engines parse unbroken semantic headings.
 */
export default function EditorialTitle({
  title,
  variant = 'card',
  as: Tag = 'h3',
  className = '',
  linkify = false,
  light = false,
}: EditorialTitleProps) {
  const trimmedTitle = (title || '').trim();

  const variantClassMap: Record<NonNullable<EditorialTitleProps['variant']>, string> = {
    hero: 'font-extrabold tracking-[-0.025em] leading-[1.16]',
    feature: 'font-extrabold tracking-[-0.02em] leading-[1.22]',
    card: 'font-bold tracking-[-0.018em] leading-[1.28]',
    compact: 'font-bold tracking-[-0.015em] leading-[1.3]',
  };

  const lightTintClass = light ? 'text-[#FAF7F2]' : '';

  return (
    <Tag
      className={`gt-font-editorial ${variantClassMap[variant]} ${lightTintClass} ${className}`}
      style={{ overflowWrap: 'break-word' }}
    >
      {linkify ? linkifyText(trimmedTitle) : trimmedTitle}
    </Tag>
  );
}
