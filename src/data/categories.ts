import { Category } from '@/types';

export const CATEGORIES: Category[] = [
  {
    "name": "Clean Snacks",
    "slug": "clean-snacks",
    "description": "Roasted makhana, chana, millet puffs, and crispy chai-time snacks with zero refined oil.",
    "layout": "clean-snacks-layout",
    "order": 1,
    "isVisible": true,
    "subcategories": []
  },
  {
    "name": "Gut Health",
    "slug": "gut-health",
    "description": "Desi probiotics, fermented kanji, spiced chaas, prebiotic fibre, and bloating-free eating.",
    "layout": "gut-health-layout",
    "order": 2,
    "isVisible": true,
    "subcategories": []
  },
  {
    "name": "Diabetes & Low-GI",
    "slug": "diabetes-low-gi",
    "description": "Low-glycemic snacks, sugar-spike control, smart meal ordering, and no-maida swaps.",
    "layout": "diabetes-low-gi-layout",
    "order": 3,
    "isVisible": true,
    "subcategories": []
  },
  {
    "name": "Heart & Liver Care",
    "slug": "heart-liver-care",
    "description": "Zero palm oil snacks, walnuts, flaxseeds, low-sodium crunch, and fatty liver kitchen guides.",
    "layout": "heart-liver-care-layout",
    "order": 4,
    "isVisible": true,
    "subcategories": []
  },
  {
    "name": "PCOS & Hormones",
    "slug": "pcos-hormones",
    "description": "Seed cycling snacks, cinnamon-spiced nuts, high-protein savory breakfasts, and calm energy.",
    "layout": "pcos-hormones-layout",
    "order": 5,
    "isVisible": true,
    "subcategories": []
  },
  {
    "name": "Weight & Protein",
    "slug": "weight-protein",
    "description": "Filling snacks under 150 calories, sattu fuel, paneer lentil bites, and sustainable fat loss.",
    "layout": "weight-protein-layout",
    "order": 6,
    "isVisible": true,
    "subcategories": []
  },
  {
    "name": "Label Audits",
    "slug": "label-audits",
    "description": "Back-of-pack supermarket checks exposing maltodextrin, palmolein, and fake protein claims.",
    "layout": "label-audits-layout",
    "order": 7,
    "isVisible": true,
    "subcategories": []
  },
  {
    "name": "Desi Pantry",
    "slug": "desi-pantry",
    "description": "Indian superfoods, ragi and jowar millets, palm jaggery (gud), and single-press oils.",
    "layout": "desi-pantry-layout",
    "order": 8,
    "isVisible": true,
    "subcategories": []
  }
];

const LEGACY_MAP: Record<string, string> = {
  'lifestyle': 'clean-snacks',
  'health': 'gut-health',
  'opinion': 'label-audits',
  'news': 'clean-snacks',
  'world': 'desi-pantry',
  'business': 'label-audits',
  'interview': 'desi-pantry',
  'press-release': 'clean-snacks',
  'pressrelease': 'clean-snacks',
  'technology': 'label-audits',
  'real-estate': 'desi-pantry',
  'realestate': 'desi-pantry',
  'crypto': 'clean-snacks',
  'metaverse': 'gut-health',
  'biography': 'pcos-hormones',
  'career': 'weight-protein',
};

export function getCategorySlug(categoryName: string): string {
  if (!categoryName) return 'clean-snacks';
  const norm = categoryName.toLowerCase().trim();
  const slugified = norm.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (LEGACY_MAP[slugified]) return LEGACY_MAP[slugified];
  const match = CATEGORIES.find(
    (c) => c.name.toLowerCase() === norm || c.slug.toLowerCase() === slugified
  );
  if (match) return match.slug;
  return slugified || 'clean-snacks';
}
