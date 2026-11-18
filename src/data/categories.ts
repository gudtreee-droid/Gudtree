import { Category } from '@/types';

export const CATEGORIES: Category[] = [
  {
    name: "Kids Tiffin",
    slug: "kids-tiffin",
    description: "Quick school lunchboxes, crisp evening bites, and 100% palm-oil-free treats kids love.",
    layout: "kids-tiffin-layout",
    order: 1,
    isVisible: true,
    subcategories: [
      { name: "School Lunch", slug: "school-lunch", description: "Quick 10-minute maida-free lunchbox ideas that stay fresh until noon." },
      { name: "Evening Bites", slug: "shaam-ke-snacks", description: "Wholesome and crunchy post-school hunger busters." },
      { name: "Weekend Treats", slug: "weekend-treats", description: "Homemade healthy swaps for pizza and burgers." },
      { name: "Milk & Sips", slug: "doodh-drinks", description: "Nut mixes, sattu shakes, and real fruit coolers instead of chemical malt drinks." }
    ]
  },
  {
    name: "Desk Munches",
    slug: "clean-snacks",
    description: "Keyboard-clean crunch, late-night study fuel, and 4 PM slump busters with zero mess.",
    layout: "clean-snacks-layout",
    order: 2,
    isVisible: true,
    subcategories: [
      { name: "Late-Night Study", slug: "raat-ki-padhai", description: "Brain-fueling, light snacks for 1 AM study and coding sessions." },
      { name: "4 PM Chai Crunch", slug: "office-4pm-chai", description: "Clean chai companions to replace oily samosas and bakery biscuits." },
      { name: "Hostel & Library", slug: "hostel-library", description: "Budget-friendly, shelf-stable snacks requiring no stove or fridge." },
      { name: "Keyboard-Safe Bites", slug: "laptop-safe-crunch", description: "Crispy snacks that leave zero oil or turmeric stains on your keyboard." }
    ]
  },
  {
    name: "Gym & Protein",
    slug: "weight-protein",
    description: "Real budget protein under ₹50 a day without expensive whey supplements.",
    layout: "weight-protein-layout",
    order: 3,
    isVisible: true,
    subcategories: [
      { name: "Budget Protein", slug: "daily-sasta-protein", description: "Roasted chana, moong, and sattu power hacks for everyday nutrition." },
      { name: "Workout Fuel", slug: "pre-post-workout", description: "Natural pre-workout energy and clean post-workout muscle recovery." },
      { name: "Fat Loss Snacks", slug: "fat-loss-snacks", description: "High-satiety, crunchy bites under 150 calories." },
      { name: "Strength & Stamina", slug: "muscle-strength", description: "Wholesome traditional foods that build stamina without gut distress." }
    ]
  },
  {
    name: "Sips & Hangover",
    slug: "heart-liver-care",
    description: "Everyday gut-cooling tonics and fast morning hangover remedies.",
    layout: "heart-liver-care-layout",
    order: 4,
    isVisible: true,
    subcategories: [
      { name: "Hangover Reset", slug: "hangover-party-reset", description: "Natural remedies to calm headaches, nausea, and dehydration in 30 minutes." },
      { name: "Everyday Coolers", slug: "roz-ke-desi-sips", description: "Jeera buttermilk, chilled sattu sharbat, and natural probiotics." },
      { name: "Chai & Coffee Swaps", slug: "chai-coffee-swaps", description: "Smooth alternatives that prevent acidity and gastric burning." },
      { name: "Hydration & Electrolytes", slug: "energy-hydration", description: "Coconut water and pink salt hydration without artificial sports drinks." }
    ]
  },
  {
    name: "Women Care",
    slug: "pcos-hormones",
    description: "Hormone-balancing snacks, seed cycling, and clean food remedies for PCOS and period cramps.",
    layout: "pcos-hormones-layout",
    order: 5,
    isVisible: true,
    subcategories: [
      { name: "PCOS & Hormones", slug: "pcos-pcod", description: "Seed cycling and low-insulin snacks to balance hormones naturally." },
      { name: "Periods & Cramps", slug: "periods-pms", description: "Soothing remedies for abdominal cramps and pre-period sugar cravings." },
      { name: "Pregnancy & Moms", slug: "pregnancy-new-moms", description: "Gentle morning sickness remedies and nutrient-rich pregnancy snacks." },
      { name: "Clear Skin & Glow", slug: "skin-pimples-glow", description: "Clean nutrition habits that calm hormonal acne and boost skin health." }
    ]
  },
  {
    name: "Gut & Bloat",
    slug: "gut-health",
    description: "Gentle digestive remedies to banish acidity, bloating, and post-meal heavy stomach.",
    layout: "gut-health-layout",
    order: 6,
    isVisible: true,
    subcategories: [
      { name: "Bloat & Acidity", slug: "gas-bloating", description: "Fast relief from desk-bound belly bloat and tight waistbands." },
      { name: "Acidity & Heartburn", slug: "acidity-jalan", description: "Kitchen spices and seeds that extinguish post-coffee chest burn." },
      { name: "Fermented & Probiotic", slug: "dahi-fermented", description: "Beet kanji, homemade curd, and traditional gut-strengthening ferments." },
      { name: "High Fiber & Digestion", slug: "kabz-fiber", description: "Unpolished native grains for effortless morning digestion." }
    ]
  },
  {
    name: "Packet Truth",
    slug: "label-audits",
    description: "Honest label audits of chips, biscuits, and namkeen sold on quick-commerce apps.",
    layout: "label-audits-layout",
    order: 7,
    isVisible: true,
    subcategories: [
      { name: "Chips & Namkeen", slug: "chips-namkeen", description: "Exposing hidden palm oil, maltodextrin, and synthetic seasonings." },
      { name: "Biscuits & Bakery", slug: "biscuit-bakery", description: "Checking whole wheat claims vs actual maida and sugar content." },
      { name: "Protein Bars & Butters", slug: "protein-bars-peanut-butter", description: "Investigating maltitol syrups and hydrogenated vegetable oils." },
      { name: "Quick Commerce Audits", slug: "blinkit-zepto-packs", description: "Ranking the 5 cleanest and safest snacks on Blinkit and Zepto." }
    ]
  },
  {
    name: "Low-Sugar Crunch",
    slug: "diabetes-low-gi",
    description: "Low-GI snacks and zero-spike evening bites designed for blood sugar balance.",
    layout: "diabetes-low-gi-layout",
    order: 8,
    isVisible: true,
    subcategories: [
      { name: "Low-GI Crunch", slug: "low-gi-crunch", description: "Roasted makhana and chana that keep blood sugar rock steady." },
      { name: "Sugar-Free Namkeen", slug: "sugar-free-namkeen", description: "Crisp roasted seed mixes and fenugreek khakhra with no maida." },
      { name: "Glucose Control Hacks", slug: "sugar-spike-hacks", description: "Smart meal sequencing and pre-meal almonds to stop glucose spikes." },
      { name: "Clean Sweet Treats", slug: "bina-chini-sweets", description: "Naturally sweet dates, sesame, and coconut bites without white sugar." }
    ]
  },
  {
    name: "Fasting Munch",
    slug: "desi-pantry",
    description: "Clean energy snacks and guilt-free festive treats without palm oil or refined sugar.",
    layout: "desi-pantry-layout",
    order: 9,
    isVisible: true,
    subcategories: [
      { name: "Fasting (Vrat) Bites", slug: "upwas-vrat-food", description: "Roasted foxnuts and barnyard millet treats to replace oily sabudana vada." },
      { name: "Festive Sweets", slug: "tyohar-ki-mithai", description: "Natural homemade laddoos made with pure jaggery and zero refined sugar." },
      { name: "Native Millets", slug: "mota-anaaj-millets", description: "Crispy homemade snacks crafted from ragi, jowar, and bajra." },
      { name: "Jaggery & Sesame", slug: "gud-til-snacks", description: "Traditional iron-rich sesame chikki and authentic palm jaggery snacks." }
    ]
  }
];

const LEGACY_MAP: Record<string, string> = {
  'kids': 'kids-tiffin',
  'kids-tiffin': 'kids-tiffin',
  'tiffin': 'kids-tiffin',
  'school-lunch': 'kids-tiffin',
  'vegan': 'kids-tiffin',
  'vegan-plant-based': 'kids-tiffin',
  'plant-based': 'kids-tiffin',
  'desk': 'clean-snacks',
  'desk-fuel': 'clean-snacks',
  'clean-snacks': 'clean-snacks',
  'study': 'clean-snacks',
  'study-fuel': 'clean-snacks',
  'gym': 'weight-protein',
  'fitness': 'weight-protein',
  'protein': 'weight-protein',
  'weight-protein': 'weight-protein',
  'drinks': 'heart-liver-care',
  'detox': 'heart-liver-care',
  'hangover': 'heart-liver-care',
  'liver': 'heart-liver-care',
  'heart': 'heart-liver-care',
  'heart-liver-care': 'heart-liver-care',
  'women': 'pcos-hormones',
  'womens-health': 'pcos-hormones',
  'pcos': 'pcos-hormones',
  'pcos-hormones': 'pcos-hormones',
  'pcod': 'pcos-hormones',
  'periods': 'pcos-hormones',
  'pet': 'gut-health',
  'pachan': 'gut-health',
  'bloat': 'gut-health',
  'gas': 'gut-health',
  'acidity': 'gut-health',
  'gut-health': 'gut-health',
  'labels': 'label-audits',
  'label-audits': 'label-audits',
  'packet-check': 'label-audits',
  'audits': 'label-audits',
  'blinkit': 'label-audits',
  'sugar': 'diabetes-low-gi',
  'diabetes': 'diabetes-low-gi',
  'low-gi': 'diabetes-low-gi',
  'diabetes-low-gi': 'diabetes-low-gi',
  'vrat': 'desi-pantry',
  'upwas': 'desi-pantry',
  'tyohar': 'desi-pantry',
  'festivals': 'desi-pantry',
  'millets': 'desi-pantry',
  'desi-pantry': 'desi-pantry',
  'lifestyle': 'clean-snacks',
  'health': 'gut-health',
  'opinion': 'label-audits',
  'news': 'clean-snacks',
  'world': 'desi-pantry',
  'business': 'label-audits',
  'interview': 'desi-pantry',
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
