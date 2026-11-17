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
    metaTitle: 'All Clean Snacks, Desk Fuel & Nutrition Guides | GudTree',
    metaDescription:
      'Explore label-verified Indian snack audits, desk study fuel, women hormone nutrition, vegan plant protein, and honest kitchen guides on GudTree.',
    h1: 'All Clean Snacking & Nutrition Guides',
    introContent:
      'Independent, label-verified Indian snacking guides built for students and young professionals (15–35). Zero palm oil, no hidden maltodextrin, and real desi kitchen swaps.',
    keywords: 'gudtree, clean snacking india, desk fuel, students study snacks, label audits, pcos snacks, vegan indian snacks',
  },
  'clean-snacks': {
    slug: 'clean-snacks',
    metaTitle: 'Clean Snacks & Desk Fuel (Late Night & 4 PM Slump) | GudTree',
    metaDescription:
      'Non-greasy keyboard-friendly snacks, roasted makhana, bhuna chana, and 4 PM office slump rescues with zero palm oil.',
    h1: 'Clean Snacks & Desk Fuel',
    introContent:
      'Non-greasy, high-crunch snacks engineered for late-night coding, exam prep, and 4 PM office slumps without afternoon brain fog or sugar crashes.',
    keywords: 'clean snacks, desk fuel, late night study snacks, 4 pm office slump, roasted makhana, non greasy keyboard snacks, healthy tea time snacks',
  },
  'pcos-hormones': {
    slug: 'pcos-hormones',
    metaTitle: "Women's Health & Hormones (PCOS, Period Cramps & PMS) | GudTree",
    metaDescription:
      'Evidence-backed PCOS insulin resistance swaps, period cramp relief, clean pregnancy munches, and hormonal acne diet guides for Indian women.',
    h1: "Women's Health & Hormones",
    introContent:
      'Empowering nutrition guides for young Indian women: seed cycling, low-insulin-spike whole foods, PMS emergency craving fixes, and gentle gut-skin acne care.',
    keywords: 'pcos diet india, period cramp relief food, pms craving snacks, clean pregnancy snacks, seed cycling mix, hormonal acne diet, spearmint tea',
  },
  'vegan-plant-based': {
    slug: 'vegan-plant-based',
    metaTitle: 'Vegan & Plant-Based Clean Snacking (Desi Sattu & Dairy-Free) | GudTree',
    metaDescription:
      'Desi sattu protein shakes, lactose-free chai munches, Blinkit plant milk label audits, and zero-dairy Indian sweets on GudTree.',
    h1: 'Vegan & Plant-Based',
    introContent:
      'Clean, plant-powered Indian nutrition for anyone avoiding lactose bloating or seeking ethical, cruelty-free snacks. Sattu fuel, roasted legumes, and whole pantry swaps.',
    keywords: 'vegan snacks india, sattu protein, lactose free chai snacks, plant milk audit, zero dairy sweets, dairy free acne, oat milk blinkit',
  },
  'label-audits': {
    slug: 'label-audits',
    metaTitle: 'Label Audits & Quick-Commerce (Blinkit, Zepto, Too Yumm) | GudTree',
    metaDescription:
      'Back-of-pack supermarket checks exposing maltodextrin, hidden palm oil, 50+ sugar names, and fake protein claims on Indian shelves.',
    h1: 'Label Audits & Quick-Commerce',
    introContent:
      'Unbiased ingredient breakdowns of top quick-commerce brands (Blinkit, Zepto, Too Yumm, 4700BC). We decode front-of-pack buzzwords into back-panel facts.',
    keywords: 'nutrition label audit india, blinkit snack audit, maltodextrin trap, hidden sugars list, zero palm oil check, too yumm audit, fssai labels',
  },
  'weight-protein': {
    slug: 'weight-protein',
    metaTitle: 'Budget Fitness & Clean Protein Under ₹50 | GudTree',
    metaDescription:
      'High-protein Indian meal prep under ₹50, sattu vs whey comparisons, roasted chana fuel, and 150-calorie high-satiety snacking guides.',
    h1: 'Budget Fitness & Protein',
    introContent:
      'Practical fitness nutrition for hostel students and freshers: hit your daily protein goals without expensive imported supplements or starvation diets.',
    keywords: 'clean protein under 50, sattu vs whey, 150 calorie snacks india, roasted chana protein, peanut butter audit, gym evening snacks',
  },
  'gut-health': {
    slug: 'gut-health',
    metaTitle: 'Gut Health & Bloat Relief (Desk Sitting & Post-Lunch Acidity) | GudTree',
    metaDescription:
      'Relief from 8-hour desk-sitting bloat, post-lunch acidity, desi probiotics (jeera chaas, beet kanji), and prebiotic fiber on GudTree.',
    h1: 'Gut Health & Bloat Relief',
    introContent:
      'Targeted digestive fixes for sedentary desk workers: fermented Indian staples, calming seed waters, and emulsifier-free clean snacks to stop daily bloating.',
    keywords: 'gut health india, desk bloat relief, post lunch acidity, jeera chaas, beet kanji, prebiotic fiber snacks, digestive enzymes',
  },
  'diabetes-low-gi': {
    slug: 'diabetes-low-gi',
    metaTitle: 'Diabetes & Low-GI Clean Snack Guides | GudTree',
    metaDescription:
      'Flat continuous glucose curves: low-glycemic evening crunch, foxtail millet swaps, and meal sequencing tricks to prevent post-snack spikes.',
    h1: 'Diabetes & Low-GI',
    introContent:
      'Low-glycemic Indian evening snacks, smart food-ordering habits, and zero-maida swaps tested for flat glucose curves and sustained energy.',
    keywords: 'low gi snacks india, diabetic friendly snacks, sugar spike control, foxtail millet puffs, makhana glycemic index, meal sequencing',
  },
  'desi-pantry': {
    slug: 'desi-pantry',
    metaTitle: 'Desi Superfoods & Pantry (Millets, Palm Jaggery & Cold-Pressed Oils) | GudTree',
    metaDescription:
      'Ancient positive millets (ragi, jowar), unrefined palm jaggery (karupatti), til-gud chikki, and kachi ghani cold-pressed oils on GudTree.',
    h1: 'Desi Superfoods & Pantry',
    introContent:
      'Timeless Indian superfoods updated for modern kitchens: unpolished positive millets, mineral-dense palm jaggery, and hexane-free cold-pressed oils.',
    keywords: 'desi pantry staples, palm jaggery karupatti, positive millets india, ragi snacks, cold pressed oils, til gud chikki',
  },
  'heart-liver-care': {
    slug: 'heart-liver-care',
    metaTitle: 'Zero Palm Oil & Clean Fats (Palmolein Checks & Raw Walnuts) | GudTree',
    metaDescription:
      'Why Indian packaged snacks use palmolein oil, raw walnut-flax ALA omega-3 habits, low-sodium spices, and clean cold-pressed fat guides.',
    h1: 'Zero Palm Oil & Clean Fats',
    introContent:
      'Practical guides to eliminating cheap fractionated palmolein oils and oxidized trans-fats from your daily snack cupboard with clean plant fats.',
    keywords: 'zero palm oil snacks, palmolein red flags, raw walnuts brain fuel, flaxseed omega 3, low sodium namkeen, fatty liver diet india',
  },
  // Legacy aliases to prevent 404 / undefined metadata
  'womens-health': {
    slug: 'pcos-hormones',
    metaTitle: "Women's Health & Hormones (PCOS, Period Cramps & PMS) | GudTree",
    metaDescription:
      'Evidence-backed PCOS insulin resistance swaps, period cramp relief, clean pregnancy munches, and hormonal acne diet guides for Indian women.',
    h1: "Women's Health & Hormones",
    keywords: 'pcos diet india, period cramp relief food, pms craving snacks, clean pregnancy snacks, seed cycling mix',
  },
  'vegan': {
    slug: 'vegan-plant-based',
    metaTitle: 'Vegan & Plant-Based Clean Snacking (Desi Sattu & Dairy-Free) | GudTree',
    metaDescription:
      'Desi sattu protein shakes, lactose-free chai munches, Blinkit plant milk label audits, and zero-dairy Indian sweets on GudTree.',
    h1: 'Vegan & Plant-Based',
    keywords: 'vegan snacks india, sattu protein, lactose free chai snacks, plant milk audit, zero dairy sweets',
  },
  'desk-fuel': {
    slug: 'clean-snacks',
    metaTitle: 'Desk & Study Fuel (Late Night & 4 PM Slump) | GudTree',
    metaDescription:
      'Non-greasy keyboard-friendly snacks, roasted makhana, bhuna chana, and 4 PM office slump rescues with zero palm oil.',
    h1: 'Desk & Study Fuel',
    keywords: 'desk fuel, late night study snacks, 4 pm office slump, roasted makhana, non greasy keyboard snacks',
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
    metaTitle: `${formatted} Clean Snacking & Nutrition Guides | GudTree`,
    metaDescription: `Explore ${formatted} snack audits, clean recipes, and practical 15-35 nutrition guides on GudTree.`,
    h1: formatted || 'Clean Guides',
    introContent: `Label-checked ${formatted.toLowerCase()} articles, whole-food swaps, and everyday nutrition guides on GudTree.`,
    keywords: `${slug}, gudtree, healthy snacks, clean diet, students, working professionals`,
  };
}
