import { Category } from '@/types';

export const CATEGORIES: Category[] = [
  {
    name: "Kids (Bachhe)",
    slug: "kids-tiffin",
    description: "Subah ka easy school lunchbox, shaam ke kurkure snacks, aur bina palm oil ke healthy treats.",
    layout: "kids-tiffin-layout",
    order: 1,
    isVisible: true,
    subcategories: [
      { name: "School Lunch (Tiffin)", slug: "school-lunch", description: "Subah 10-minute me banne wale no-maida tiffin ideas jo dopahar tak kharab na ho." },
      { name: "Shaam Ke Snacks", slug: "shaam-ke-snacks", description: "School se lautne ke baad bhookh mitane wale kurkure aur safe snacks." },
      { name: "Weekend Treats", slug: "weekend-treats", description: "Sunday ko pizza aur burger ki jagah bachhon ke liye tasty homemade swaps." },
      { name: "Doodh & Drinks", slug: "doodh-drinks", description: "Bournvita ke badle real dry-fruits mix, sattu shakes aur fruit coolers." }
    ]
  },
  {
    name: "Desk & Study",
    slug: "clean-snacks",
    description: "Laptop keyboard-safe crunch, raat ki padhai ke snacks, aur 4 PM office slump ka aasan hal.",
    layout: "clean-snacks-layout",
    order: 2,
    isVisible: true,
    subcategories: [
      { name: "Raat Ki Padhai", slug: "raat-ki-padhai", description: "1 AM study aur coding ke waqt dimaag fresh rakhne wale light snacks." },
      { name: "Office 4 PM Chai", slug: "office-4pm-chai", description: "Samosa aur bakery biscuit chhod kar energy dene wale chai companions." },
      { name: "Hostel & Library", slug: "hostel-library", description: "Bina gas-chulhe aur fridge ke mahino chalne wale saste pocket-friendly snacks." },
      { name: "Laptop-Safe Crunch", slug: "laptop-safe-crunch", description: "Aise kurkure snacks jisse keyboard par tel ya peela masala na lage." }
    ]
  },
  {
    name: "Gym & Fitness",
    slug: "weight-protein",
    description: "Body aur muscles ke liye ₹50 ke andar sasta protein, bina mehenge whey powder ke.",
    layout: "weight-protein-layout",
    order: 3,
    isVisible: true,
    subcategories: [
      { name: "Daily Sasta Protein", slug: "daily-sasta-protein", description: "Hostel aur room par rehne walo ke liye bhuna chana, moong aur sattu hacks." },
      { name: "Pre & Post Workout", slug: "pre-post-workout", description: "Gym se pehle natural energy aur gym ke baad clean muscle recovery." },
      { name: "Wazan Ghatana (Fat Loss)", slug: "fat-loss-snacks", description: "Pet pura bharne wale 150-calorie low-calorie crunch." },
      { name: "Muscle & Strength", slug: "muscle-strength", description: "Natural desi khana jisse strength badhe bina pachan kharab hue." }
    ]
  },
  {
    name: "Drinks & Detox",
    slug: "heart-liver-care",
    description: "Roz ke pet-friendly desi sharbat aur weekend party ke baad daru ka hangover utarne ke nuskhe.",
    layout: "heart-liver-care-layout",
    order: 4,
    isVisible: true,
    subcategories: [
      { name: "Hangover & Party Reset", slug: "hangover-party-reset", description: "Daru ka hangover, sir-dard aur ulti 30 minute me shant karne wale desi drinks." },
      { name: "Roz Ke Desi Sips", slug: "roz-ke-desi-sips", description: "Jeera chaas, chilled sattu cooler, aur dahi ke natural probiotics." },
      { name: "Chai & Coffee Swaps", slug: "chai-coffee-swaps", description: "Chai peene se gas aur acidity na bane, uske aasan tarike." },
      { name: "Energy & Hydration", slug: "energy-hydration", description: "Nariyal pani aur sendha namak electrolytes bina packaged chemical drinks ke." }
    ]
  },
  {
    name: "Women's Care",
    slug: "pcos-hormones",
    description: "PCOS me wazan aur pimples control, period ke pet dard, aur pregnancy ke safe snacks.",
    layout: "pcos-hormones-layout",
    order: 5,
    isVisible: true,
    subcategories: [
      { name: "PCOS & PCOD", slug: "pcos-pcod", description: "Sugar aur testosterone control karne wale seed cycling aur snacks." },
      { name: "Periods & PMS", slug: "periods-pms", description: "Period se pehle pet ke marod (cramps) aur meetha khane ki craving ka hal." },
      { name: "Pregnancy & New Moms", slug: "pregnancy-new-moms", description: "Subah ki ulti (morning sickness) aur sugar control ke safe snacks." },
      { name: "Chehre Ke Pimples & Glow", slug: "skin-pimples-glow", description: "Doodh wali chai chhod kar chin aur jawline ke dardnak pimples thik karna." }
    ]
  },
  {
    name: "Pet & Pachan",
    slug: "gut-health",
    description: "8 ghante kursi par baithne se phoola hua pet aur khane ke baad seene ki jalan ka ilaj.",
    layout: "gut-health-layout",
    order: 6,
    isVisible: true,
    subcategories: [
      { name: "Gas & Bloating", slug: "gas-bloating", description: "Baithe-baithe pet phoolna aur tight jeans ki takleef shant karna." },
      { name: "Acidity & Jalan", slug: "acidity-jalan", description: "Office coffee ke baad gale aur seene ki aag thandi karne wale gharelu seeds." },
      { name: "Dahi & Fermented", slug: "dahi-fermented", description: "Beetroot kanji aur dahi se pachan aur aanto ko majboot banana." },
      { name: "Kabz & Fiber", slug: "kabz-fiber", description: "Subah pet khul kar saaf hone ke liye unpolished desi grains." }
    ]
  },
  {
    name: "Market Packet Check",
    slug: "label-audits",
    description: "Blinkit, Zepto aur dukaan ke chips, biscuit aur namkeen ke packet ka sach.",
    layout: "label-audits-layout",
    order: 7,
    isVisible: true,
    subcategories: [
      { name: "Chips & Namkeen", slug: "chips-namkeen", description: "Too Yumm aur Haldiram ke packet me palm oil aur maltodextrin ka sach." },
      { name: "Biscuit & Bakery", slug: "biscuit-bakery", description: "Whole wheat bol kar 60% maida aur chini bechne wale digestive biscuits." },
      { name: "Protein Bars & Peanut Butter", slug: "protein-bars-peanut-butter", description: "Maltitol chemical syrup aur hydrogenated palm oil ki jaanch." },
      { name: "Blinkit & Zepto Packs", slug: "blinkit-zepto-packs", description: "Quick delivery app par milne wale 5 sabse clean aur safe namkeen packet." }
    ]
  },
  {
    name: "Sugar & Diabetes",
    slug: "diabetes-low-gi",
    description: "Sugar ke mareez aur jinka sugar achanak badhta hai, unke liye safe evening crunch.",
    layout: "diabetes-low-gi-layout",
    order: 8,
    isVisible: true,
    subcategories: [
      { name: "Low-GI Crunch", slug: "low-gi-crunch", description: "Makhana aur bhuna chana jo sugar ko bilkul normal rakhte hain." },
      { name: "Sugar-Free Namkeen", slug: "sugar-free-namkeen", description: "Bina maida ke kurkure methi khakhra aur roasted grains." },
      { name: "Sugar Spike Control Hacks", slug: "sugar-spike-hacks", description: "Khana khane ka sahi krama aur chai se pehle badam khane ka fayda." },
      { name: "Bina Chini Ke Sweets", slug: "bina-chini-sweets", description: "Khajoor, til aur nariyal se bane safe aur meethe treats." }
    ]
  },
  {
    name: "Vrat & Tyohar",
    slug: "desi-pantry",
    description: "Upwas (vrat) me bina tel-masale ke energy aur tyohar par bina white sugar ki mithai.",
    layout: "desi-pantry-layout",
    order: 9,
    isVisible: true,
    subcategories: [
      { name: "Upwas (Vrat) Food", slug: "upwas-vrat-food", description: "Sabudana vada chhod kar roasted makhana aur samak ke clean snacks." },
      { name: "Tyohar Ki Mithai", slug: "tyohar-ki-mithai", description: "Diwali aur Rakhi par bina khoya aur bina white sugar ke natural laddoo." },
      { name: "Mota Anaaj (Millets)", slug: "mota-anaaj-millets", description: "Ragi, jowar aur bajra se ghar par banayein crispy snacks." },
      { name: "Gud & Til Snacks", slug: "gud-til-snacks", description: "Asli palm jaggery, karupatti aur calcium se bhari til chikki." }
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
