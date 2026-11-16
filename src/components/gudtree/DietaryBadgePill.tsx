import React from 'react';
import { Sparkles, Leaf, HeartPulse } from 'lucide-react';

export interface WellnessTag {
  label: string;
  tone: 'caramel' | 'olive' | 'marigold';
}

const CONDITION_KEYWORDS: Array<{
  keywords: string[];
  tag: WellnessTag;
}> = [
  {
    keywords: ['diabet', 'sugar', 'gi', 'glucose', 'insulin', 'jaggery', 'gud'],
    tag: { label: 'Low GI & Sugar Aware', tone: 'olive' },
  },
  {
    keywords: ['pcos', 'hormon', 'women', 'seed', 'flax', 'cycle'],
    tag: { label: 'PCOS Friendly', tone: 'marigold' },
  },
  {
    keywords: ['heart', 'cholesterol', 'bp', 'pressure', 'omega', 'palm oil'],
    tag: { label: 'Heart & Zero Palm Oil', tone: 'olive' },
  },
  {
    keywords: ['gut', 'digest', 'fiber', 'probiotic', 'bloat', 'acidity'],
    tag: { label: 'Gut & Fiber Rich', tone: 'caramel' },
  },
  {
    keywords: ['protein', 'snack', 'makhana', 'millet', 'sattu', 'weight', 'diet'],
    tag: { label: 'Clean Snack Guide', tone: 'caramel' },
  },
];

export function inferWellnessTag(
  title?: string,
  category?: string,
  tag?: string
): WellnessTag {
  const haystack = `${title || ''} ${category || ''} ${tag || ''}`.toLowerCase();
  for (const rule of CONDITION_KEYWORDS) {
    if (rule.keywords.some((kw) => haystack.includes(kw))) {
      return rule.tag;
    }
  }
  return { label: 'Clean Nutrition', tone: 'olive' };
}

export default function DietaryBadgePill({
  label,
  tone = 'olive',
  className = '',
  showIcon = true,
}: {
  label: string;
  tone?: 'caramel' | 'olive' | 'marigold';
  className?: string;
  showIcon?: boolean;
}) {
  const toneClasses =
    tone === 'caramel'
      ? 'bg-[#FFF0EA] border-[#DA440D]/30 text-[#DA440D]'
      : tone === 'marigold'
      ? 'bg-[#E5F36D] border-[#C8D946] text-[#102A56]'
      : 'bg-[#D6EDFF] border-[#ADC3DE] text-[#102A56]';

  const Icon =
    tone === 'caramel' ? Sparkles : tone === 'marigold' ? HeartPulse : Leaf;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.06em] leading-none whitespace-nowrap ${toneClasses} ${className}`}
    >
      {showIcon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{label}</span>
    </span>
  );
}
