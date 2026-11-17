import { Category } from '@/types';

export const CATEGORIES: Category[] = [
  {
    name: "Clean Snacks & Desk Fuel",
    slug: "clean-snacks",
    description: "Roasted makhana, chana, non-greasy study crunch, and 4 PM office slump rescue with zero refined oil.",
    layout: "clean-snacks-layout",
    order: 1,
    isVisible: true,
    subcategories: [
      { name: "Desk & Study Fuel", slug: "desk-study-fuel", description: "Non-greasy, high-crunch snacks for coding, late-night cramming, and deep focus without brain fog." },
      { name: "4 PM Office Slump", slug: "4pm-office-slump", description: "Smart pantry and quick-commerce snacks to replace samosa, deep-fried namkeen, and sugary biscuits." },
      { name: "Roasted Makhana & Foxnuts", slug: "roasted-makhana", description: "Lightly spiced foxnuts roasted in home ghee or cold-pressed oil with zero trans fats." },
      { name: "Chai-Time Clean Munches", slug: "chai-time-munches", description: "Baked methi mathri, roasted murmura, and zero-maida tea-time companions." }
    ]
  },
  {
    name: "Women's Health & Hormones",
    slug: "pcos-hormones",
    description: "PCOS insulin resistance swaps, period cramp & PMS craving relief, clean pregnancy snacks, and gut-skin acne care.",
    layout: "pcos-hormones-layout",
    order: 2,
    isVisible: true,
    subcategories: [
      { name: "PCOS & PCOD Swaps", slug: "pcos-pcod-swaps", description: "Low-insulin-spike whole-food snacks, spearmint pairings, and androgen-safe nutrition." },
      { name: "Period Cramps & PMS Cravings", slug: "period-pms-relief", description: "Magnesium-rich dark chocolate pairings, sesame-gud iron snacks, and cramp-soothing seeds." },
      { name: "Clean Pregnancy Munches", slug: "clean-pregnancy-munches", description: "Safe nausea-relief bites, gestational blood sugar control, and whole-grain panjiri guides." },
      { name: "Hormonal Skin & Acne", slug: "hormonal-skin-acne", description: "Dairy-free, anti-inflammatory snacks targeting the gut-skin axis and hormonal breakouts." }
    ]
  },
  {
    name: "Vegan & Plant-Based",
    slug: "vegan-plant-based",
    description: "Desi sattu protein, lactose-free chai companions, Blinkit plant milk audits, and zero-dairy sweets.",
    layout: "vegan-plant-based-layout",
    order: 3,
    isVisible: true,
    subcategories: [
      { name: "Desi Sattu & Plant Protein", slug: "sattu-plant-protein", description: "Affordable 20g+ protein shakes and roasted chana fuel made from 100% Indian legumes." },
      { name: "Lactose-Free Chai Munches", slug: "lactose-free-munches", description: "Dairy-free tea pairings that eliminate post-chai bloating, heaviness, and skin flare-ups." },
      { name: "Plant Milk Label Audits", slug: "plant-milk-audits", description: "Ingredient checks on oat, almond, and soy milk packs exposing vegetable oils and emulsifiers." },
      { name: "Zero-Dairy Desi Sweets", slug: "zero-dairy-sweets", description: "Clean peanut-date laddus, palm jaggery til chikki, and raw coconut-gud bites." }
    ]
  },
  {
    name: "Label Audits & Quick-Commerce",
    slug: "label-audits",
    description: "Blinkit, Zepto & supermarket back-of-pack audits exposing maltodextrin, hidden sugars, palm oil, and fake protein.",
    layout: "label-audits-layout",
    order: 4,
    isVisible: true,
    subcategories: [
      { name: "Blinkit 10-Minute Audits", slug: "blinkit-audits", description: "Ingredient-verified green flags and red flags across instant grocery delivery snack catalogs." },
      { name: "Hidden Sugars & Maltodextrin", slug: "hidden-sugars-maltodextrin", description: "Decoding 50+ deceptive names for refined sweeteners on so-called 'diet' and 'healthy' packs." },
      { name: "Zero Palm Oil Checkers", slug: "zero-palm-oil-checkers", description: "Spotting cheap palmolein and hydrogenated vegetable fats hidden inside baked chips and cookies." },
      { name: "Protein Bar & Powder Audits", slug: "protein-bar-audits", description: "Testing true protein bio-availability vs sugar alcohol bloat and cheap soy filler isolates." }
    ]
  },
  {
    name: "Budget Fitness & Protein",
    slug: "weight-protein",
    description: "Under ₹50 clean protein hacks, sattu vs whey comparisons, roasted chana fuel, and 150-calorie high-satiety munches.",
    layout: "weight-protein-layout",
    order: 5,
    isVisible: true,
    subcategories: [
      { name: "Clean Protein Under ₹50", slug: "protein-under-50", description: "Student and fresher budget meal preps delivering 20-30g protein without expensive supplements." },
      { name: "Sattu vs Whey Protein", slug: "sattu-vs-whey", description: "Macro, fiber, digestion, and cost breakdowns between Indian roasted chana flour and whey." },
      { name: "Gym Evening Munches", slug: "gym-evening-munches", description: "Pre-workout energy bites and post-workout muscle recovery snacks made from real kitchen staples." },
      { name: "150-Calorie High-Satiety Swaps", slug: "150-cal-satiety-swaps", description: "High-volume, fiber-rich snacks that kill hunger pangs without blowing your daily calorie budget." }
    ]
  },
  {
    name: "Gut Health & Bloat Relief",
    slug: "gut-health",
    description: "Relief from 8-hour desk-sitting bloat, post-lunch acidity, desi probiotics (jeera chaas, kanji), and prebiotic fiber.",
    layout: "gut-health-layout",
    order: 6,
    isVisible: true,
    subcategories: [
      { name: "Desk Bloat Solutions", slug: "desk-bloat-solutions", description: "Targeted snacking habits to stop afternoon abdomen distension and sluggish digestion from prolonged sitting." },
      { name: "Desi Probiotics & Chaas", slug: "desi-probiotics-chaas", description: "Traditional fermented gut elixirs—roasted jeera chaas, beet kanji, and set dahi." },
      { name: "Post-Lunch Acidity Fixes", slug: "post-lunch-acidity", description: "Alkalizing, gentle seeds and soothing herbal waters to calm burning chest and throat after work meals." },
      { name: "Clean Prebiotic Fiber", slug: "clean-prebiotic-fiber", description: "Feeding gut microbiome bacteria using resistant starch, soaked sabja, and whole millet hulls." }
    ]
  },
  {
    name: "Diabetes & Low-GI",
    slug: "diabetes-low-gi",
    description: "Low-glycemic snacks, sugar-spike control, meal sequencing tricks, and zero-maida chai companions.",
    layout: "diabetes-low-gi-layout",
    order: 7,
    isVisible: true,
    subcategories: [
      { name: "Sugar Spike-Free Snacking", slug: "sugar-spike-free", description: "Snacks engineered with protein and fiber buffers that keep continuous glucose monitor (CGM) curves flat." },
      { name: "Low-GI Evening Crunch", slug: "low-gi-evening-crunch", description: "Foxtail millet puffs, roasted kala chana, and sprouted methi khakhra under glycemic index 50." },
      { name: "Blood Sugar Sequencing", slug: "blood-sugar-sequencing", description: "Simple eating orders (fiber first, carbs last) to reduce glycemic spikes by up to 40%." },
      { name: "No-Maida Chai Companions", slug: "no-maida-chai-companions", description: "Swapping refined white flour biscuits for 100% whole grain, stone-ground crispies." }
    ]
  },
  {
    name: "Desi Superfoods & Pantry",
    slug: "desi-pantry",
    description: "Ancient positive millets (ragi, jowar, foxtail), unrefined palm jaggery (karupatti), and traditional cold-pressed oils.",
    layout: "desi-pantry-layout",
    order: 8,
    isVisible: true,
    subcategories: [
      { name: "Ancient Positive Millets", slug: "ancient-positive-millets", description: "Ragi, jowar, bajra, and barnyard millets cooked for sustained energy and iron absorption." },
      { name: "Palm Jaggery & Karupatti", slug: "palm-jaggery-karupatti", description: "Unrefined mineral-dense palm gud with low glycemic impact vs commercial sulfur-bleached sugar." },
      { name: "Til-Gud & Sesame Energy", slug: "til-gud-sesame-energy", description: "Calcium-rich winter and study snacks combining unpolished sesame with dark jaggery." },
      { name: "Cold-Pressed Desi Oils", slug: "cold-pressed-desi-oils", description: "Kachi ghani mustard, groundnut, and sesame oils free from hexane solvent extraction." }
    ]
  },
  {
    name: "Zero Palm Oil & Clean Fats",
    slug: "heart-liver-care",
    description: "Avoiding palmolein in packaged namkeens, raw walnuts, flaxseeds, low-sodium spices, and clean cold-pressed fats.",
    layout: "heart-liver-care-layout",
    order: 9,
    isVisible: true,
    subcategories: [
      { name: "Palmolein Red Flags", slug: "palmolein-red-flags", description: "Why Indian packaged snacks use fractionated palm oil and how to identify it on back labels." },
      { name: "Raw Walnuts & Flax", slug: "walnuts-flax-omega3", description: "Plant-based ALA omega-3 fatty acids for cognitive focus, cell health, and reduced arterial inflammation." },
      { name: "Low-Sodium Seasonings", slug: "low-sodium-seasonings", description: "Rock salt (sendha namak), black pepper, and amchur blends that deliver intense crunch without water retention." },
      { name: "Clean Cold-Pressed Fats", slug: "clean-cold-pressed-fats", description: "Grass-fed desi A2 cow ghee, cold-pressed coconut oil, and cold-pressed peanut oils for safe home roasting." }
    ]
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
  'womens-health': 'pcos-hormones',
  'women-health': 'pcos-hormones',
  'pcos': 'pcos-hormones',
  'pcod': 'pcos-hormones',
  'vegan': 'vegan-plant-based',
  'plant-based': 'vegan-plant-based',
  'desk-fuel': 'clean-snacks',
  'study-fuel': 'clean-snacks',
  'protein': 'weight-protein',
  'fitness': 'weight-protein',
  'palm-oil': 'heart-liver-care',
  'bloat': 'gut-health',
  'bloating': 'gut-health',
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
