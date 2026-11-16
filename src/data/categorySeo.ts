export interface CategorySeoData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  introContent?: string;
  keywords: string;
}

export const CATEGORY_SEO_DATA: Record<string, CategorySeoData> = {
  'all': {
    slug: 'all',
    metaTitle: 'All Clean Snack & Diet Guides | GudTree',
    metaDescription:
      'Explore honest Indian packaged snack audits, clean home diet swaps, gut wellness, low-GI guides, and desi superfood stories on GudTree.',
    h1: 'All Snacking & Diet Guides',
    introContent:
      'Independent, label-verified Indian clean eating guides spanning healthy snacks, gut wellness, low-GI swaps, heart care, and honest kitchen staples.',
    keywords: 'gudtree, clean snacking india, healthy indian snacks, diet guides, label audits',
  },
  'clean-snacks': {
    slug: 'clean-snacks',
    metaTitle: 'Clean Snacks & Healthy Chai-Time Swaps | GudTree',
    metaDescription:
      'Discover roasted makhana, bhuna chana, zero-maida biscuits, and palm-oil-free snack swaps on GudTree.',
    h1: 'Clean Snacks',
    introContent:
      'Roasted foxnuts, crispy chana, spiced murmura, and zero-maida tea-time snacks built for everyday Indian homes.',
    keywords: 'clean snacks, roasted makhana, healthy chai time snacks, zero palm oil',
  },
  'gut-health': {
    slug: 'gut-health',
    metaTitle: 'Gut Health, Probiotics & Bloating-Free Snacks | GudTree',
    metaDescription:
      'Desi probiotics, homemade jeera chaas, prebiotic fibre, and clean label guides for lighter digestion.',
    h1: 'Gut Health',
    introContent:
      'Gentle digestive habits, fermented Indian staples like kanji and chaas, and prebiotic fibre snacks free of artificial emulsifiers.',
    keywords: 'gut health india, desi probiotics, bloating relief, clean digestion snacks',
  },
  'diabetes-low-gi': {
    slug: 'diabetes-low-gi',
    metaTitle: 'Diabetes & Low-GI Clean Snack Guides | GudTree',
    metaDescription:
      'Steady blood sugar snacks, glycemic index comparisons, maltodextrin alerts, and millet swaps for India.',
    h1: 'Diabetes & Low-GI',
    introContent:
      'Low-glycemic Indian evening snacks, smart food-order sequencing, and no-maida swaps to prevent sugar spikes cleanly.',
    keywords: 'low gi snacks india, diabetic friendly snacks, steady blood sugar, makhana gi',
  },
  'heart-liver-care': {
    slug: 'heart-liver-care',
    metaTitle: 'Heart & Fatty Liver Clean Eating Guides | GudTree',
    metaDescription:
      'Zero palm oil swaps, omega-3 walnut-flax habits, low-sodium seasonings, and fatty liver kitchen guides.',
    h1: 'Heart & Liver Care',
    introContent:
      'Clean-fat swaps replacing repeated refined palmolein oils with walnuts, flax, cold-pressed oils, and low-sodium Indian spices.',
    keywords: 'fatty liver diet india, zero palm oil, low sodium snacks, heart healthy nuts',
  },
  'pcos-hormones': {
    slug: 'pcos-hormones',
    metaTitle: 'PCOS & Hormone Balance Snack Guides | GudTree',
    metaDescription:
      'Seed cycling snack bars, cinnamon roasted nuts, savoury protein breakfasts, and anti-inflammatory guides.',
    h1: 'PCOS & Hormones',
    introContent:
      'Indian seed cycling simplified, high-protein savoury breakfasts, and calm 4 PM nutrition swaps.',
    keywords: 'pcos diet india, seed cycling snacks, cinnamon almonds, hormone balance',
  },
  'weight-protein': {
    slug: 'weight-protein',
    metaTitle: 'Weight & Clean Protein Snacking Under 150 Kcal | GudTree',
    metaDescription:
      'High-satiety Indian snacks under 150 calories, sattu protein drinks, paneer crisps, and sustainable diet guides.',
    h1: 'Weight & Protein',
    introContent:
      'Volume-rich snacks, traditional roasted sattu drinks, and paneer-lentil fuel that keep you satisfied without crash dieting.',
    keywords: '150 calorie snacks india, sattu protein, weight loss clean snacks',
  },
  'label-audits': {
    slug: 'label-audits',
    metaTitle: 'Supermarket Food Label Audits & Red Flags | GudTree',
    metaDescription:
      'Back-of-pack checks exposing hidden sugars, maltodextrin, palm oil, and marketing claims in Indian food packs.',
    h1: 'Label Audits',
    introContent:
      'Honest ingredient breakdowns decoding hidden sugars, fake whole-wheat claims, protein bar hype, and INS food additives.',
    keywords: 'nutrition label audit india, hidden sugar names, maltodextrin trap, fssai labels',
  },
  'desi-pantry': {
    slug: 'desi-pantry',
    metaTitle: 'Desi Pantry, Millets, Palm Jaggery & Wood-Pressed Oils | GudTree',
    metaDescription:
      'Guides on foxtail and ragi millets, karupatti palm jaggery, til-gud chikki, and cold-pressed Indian cooking oils.',
    h1: 'Desi Pantry',
    introContent:
      'Timeless Indian kitchen ingredients—millets, palm jaggery, sesame seeds, and traditional oils—adapted for modern clean eating.',
    keywords: 'desi pantry staples, palm jaggery gud, positive millets india, cold pressed oils',
  },
};

export function getCategorySeo(slug: string): CategorySeoData {
  const cleanSlug = (slug || '').toLowerCase().trim();
  if (CATEGORY_SEO_DATA[cleanSlug]) {
    return CATEGORY_SEO_DATA[cleanSlug];
  }

  const formatted = cleanSlug
    .split('-')
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
    .join(' ');

  return {
    slug: cleanSlug,
    metaTitle: `${formatted} Clean Eating Guides | GudTree`,
    metaDescription: `Explore ${formatted} snack audits, clean recipes, and practical nutrition guides on GudTree.`,
    h1: formatted || 'Clean Guides',
    introContent: `Label-checked ${formatted.toLowerCase()} articles, whole-food swaps, and everyday nutrition guides on GudTree.`,
    keywords: `${slug}, gudtree, healthy snacks, clean diet`,
  };
}
