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
    metaTitle: 'Healthy Indian Snacks, Diet Swaps & Food Label Audits | GudTree',
    metaDescription:
      'Independent back-of-pack food label audits, zero-palm-oil Indian snacks, school tiffin plans, high-protein sattu & chana guides, and clinical nutrition swaps.',
    h1: 'All Clean Food & Snack Guides',
    introContent:
      'Honest, ingredient-checked Indian snacking guides from home kitchens to supermarket shelves—zero refined palm oil, zero hidden maltodextrin.',
    keywords: 'gudtree, healthy snacks india, food label audits, school tiffin ideas, sattu protein, pcos snacks, diabetes low gi snacks',
  },
  'kids-tiffin': {
    slug: 'kids-tiffin',
    metaTitle: 'Healthy Indian School Tiffin Ideas & Kids Snacks (No Maida) | GudTree',
    metaDescription:
      '10-minute maida-free Indian school tiffin recipes that stay fresh till lunch, plus sugar & ingredient audits of Bournvita, biscuits, and kids snacks.',
    h1: 'Kids School Tiffin & Clean Treats',
    introContent:
      'Practical 10-minute maida-free lunchboxes and palm-oil-free evening snacks designed for growing children and busy Indian parents.',
    keywords: 'no maida school tiffin ideas india, healthy kids lunchbox recipes, bournvita sugar content, healthy evening snacks for kids',
  },
  'clean-snacks': {
    slug: 'clean-snacks',
    metaTitle: 'Healthy Desk, 4 PM Chai & Late-Night Snacks India | GudTree',
    metaDescription:
      'Non-greasy roasted makhana, bhuna chana, and low-GI office snacks to replace oily samosas and bakery biscuits without afternoon energy crashes.',
    h1: 'Desk & Study Munches',
    introContent:
      'Crunchy, keyboard-clean Indian snacks for 4 PM office chai and late-night study sessions—engineered for steady focus without sugar crashes.',
    keywords: 'healthy 4 pm office snacks india, roasted makhana vs chips, late night study snacks india, non greasy desk snacks',
  },
  'weight-protein': {
    slug: 'weight-protein',
    metaTitle: 'High-Protein Indian Snacks Under ₹50 & Weight Loss Guides | GudTree',
    metaDescription:
      'Hit 35g+ natural daily protein under ₹50 with sattu, roasted chana, paneer, and honest peanut butter brand comparisons—no expensive whey required.',
    h1: 'Budget Protein & Weight Management',
    introContent:
      'Affordable, bioavailable Indian vegetarian protein swaps and 150-calorie snacks backed by real macro math.',
    keywords: 'high protein indian snacks under 50, sattu vs whey protein, best peanut butter india label audit, 150 calorie snacks india',
  },
  'heart-liver-care': {
    slug: 'heart-liver-care',
    metaTitle: 'Heart-Safe Zero Palm Oil Drinks, Chaas & Hangover Reset | GudTree',
    metaDescription:
      'Clean desi coolers, buttermilk electrolytes for fast morning hangover recovery, cold-pressed oil audits, and liver-friendly Indian hydration habits.',
    h1: 'Clean Sips, Heart Care & Hangover Reset',
    introContent:
      'Gut-friendly spiced chaas, natural electrolyte hangover recovery drinks, and zero-palm-oil fats to protect heart and liver health.',
    keywords: 'natural hangover cure drinks india, jeera chaas benefits, palm oil heart risk india, cold pressed mustard oil vs sunflower oil',
  },
  'pcos-hormones': {
    slug: 'pcos-hormones',
    metaTitle: "PCOS Diet Snacks, Seed Cycling & Period Relief Foods India | GudTree",
    metaDescription:
      'Insulin-sensitizing Indian breakfasts, seed cycling ratios for PCOS hormone balance, spearmint tea protocols, and period cramp anti-inflammatory foods.',
    h1: "Women's Care: PCOS, Periods & Skin",
    introContent:
      'Evidence-informed Indian diet swaps for PCOS insulin resistance, hormonal acne, and menstrual cramp relief without extreme carb deprivation.',
    keywords: 'pcos diet snacks india, seed cycling pcos india, foods for hormonal acne india, period cramp relief indian foods',
  },
  'gut-health': {
    slug: 'gut-health',
    metaTitle: 'Gut Health, Bloating & Acidity Relief Indian Food Guides | GudTree',
    metaDescription:
      'Fix post-lunch desk bloating, coffee acidity, and sluggish digestion using fermented kanji, roasted jeera chaas, sabja seeds, and emulsifier-free eating.',
    h1: 'Gut Health, Bloating & Digestion',
    introContent:
      'Targeted everyday digestive relief using traditional Indian probiotics and cutting out gut-irritating commercial emulsifiers.',
    keywords: 'post lunch bloating relief india, jeera chaas for acidity, beetroot kanji probiotic recipe, emulsifiers gut health',
  },
  'label-audits': {
    slug: 'label-audits',
    metaTitle: 'Indian Packaged Food Label Audits: Palm Oil, Maltodextrin & Sugar | GudTree',
    metaDescription:
      'Independent back-of-pack label audits exposing hidden palm oil, maltodextrin, INS additives, and misleading health claims in Indian biscuits, chips & bars.',
    h1: 'Market Packaged Food Label Audits',
    introContent:
      'We inspect the tiny ingredient fine print on supermarket and quick-commerce packets so Indian families never fall for health-washed marketing.',
    keywords: 'indian food label audit, palm oil in biscuits india, maltodextrin hidden sugar, flavored makhana label check, protein bar audit india',
  },
  'diabetes-low-gi': {
    slug: 'diabetes-low-gi',
    metaTitle: 'Diabetic-Friendly Indian Snacks & Low-GI Blood Sugar Guides | GudTree',
    metaDescription:
      'Tested low-GI (< 45) Indian chai snacks, CGM blood sugar comparisons of digestive biscuits vs roasted chana, and food sequencing hacks to prevent spikes.',
    h1: 'Diabetes & Low-GI Blood Sugar Crunch',
    introContent:
      'Practical glycemic index comparisons and meal-ordering rules to enjoy crispy Indian snacks with flat post-meal glucose curves.',
    keywords: 'diabetic friendly indian snacks, low gi snacks india, digestive biscuit blood sugar spike, makhana glycemic index diabetes',
  },
  'desi-pantry': {
    slug: 'desi-pantry',
    metaTitle: 'Clean Desi Pantry: Millets, Palm Jaggery (Gud) & Fasting Swaps | GudTree',
    metaDescription:
      'Authentic guides on kachi ghani mustard oil, ragi & jowar millets, real palm jaggery vs fake gud, and acidity-free Navratri vrat fasting foods.',
    h1: 'Clean Desi Pantry & Fasting Swaps',
    introContent:
      'Reclaiming India’s cleanest traditional staples—unpolished millets, real wood-pressed oils, and refined-sugar-free festive treats.',
    keywords: 'kachi ghani mustard oil vs refined oil, palm jaggery vs white sugar, healthy vrat fasting snacks india, indian millets nutrition',
  },
  // Legacy aliases
  'vegan-plant-based': {
    slug: 'kids-tiffin',
    metaTitle: 'Kids School Tiffin & Healthy Treats | GudTree',
    metaDescription:
      'Subah 10-minute me banne wale no-maida school tiffin ideas aur bachhon ke liye safe kurkure snacks.',
    h1: 'Kids (Bachhe) - School Tiffin & Treats',
    keywords: 'school tiffin ideas, kids lunchbox recipes, no maida tiffin',
  },
  'womens-health': {
    slug: 'pcos-hormones',
    metaTitle: "Women's Care: PCOS, Periods & Skin | GudTree",
    metaDescription:
      'PCOS me wazan aur pimples control, period cramps aur meetha khane ki craving shant karne wale safe food swaps.',
    h1: "Women's Care",
    keywords: 'pcos snacks india, period cramps relief food',
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
    metaTitle: `${formatted} Clean Food & Snack Guides | GudTree`,
    metaDescription: `Explore ${formatted} clean snacks, recipes, and honest Indian kitchen guides on GudTree.`,
    h1: formatted || 'Clean Guides',
    introContent: `Aasan aur clean ${formatted.toLowerCase()} guides, bina palm oil, bina faltu chemicals.`,
    keywords: `${slug}, gudtree, healthy snacks, clean diet`,
  };
}
