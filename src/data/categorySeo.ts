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
    metaTitle: 'All Clean Snacks, Sips & Food Guides | GudTree',
    metaDescription:
      'Ghar ka khana, school tiffin, gym protein, pet ka gas relief aur market packet audits. Simple and honest Indian snacking guides on GudTree.',
    h1: 'All Clean Food & Snack Guides',
    introContent:
      'Ghar ke kitchen se leke office desk tak, simple aur honest desi snacks aur drinks ke guides. Bina palm oil, bina faltu chemical.',
    keywords: 'gudtree, clean snacks india, school tiffin ideas, gym protein under 50, hangover drinks, pcos snacks, pet gas relief',
  },
  'kids-tiffin': {
    slug: 'kids-tiffin',
    metaTitle: 'Kids School Tiffin & Healthy Treats | GudTree',
    metaDescription:
      'Subah 10-minute me banne wale no-maida school tiffin ideas, bournvita audits, aur bachhon ke liye safe kurkure snacks.',
    h1: 'Kids (Bachhe) - School Tiffin & Treats',
    introContent:
      'Subah ka school lunchbox jo dopahar tak soggy na ho aur bachha dabba khali karke laaye. Bina maida, bina palm oil ke bachhon ke snacks.',
    keywords: 'school tiffin ideas, kids lunchbox recipes, no maida tiffin, healthy snacks for kids, bournvita audit, toddlers snacks india',
  },
  'clean-snacks': {
    slug: 'clean-snacks',
    metaTitle: 'Desk & Study Snacks (Late Night & 4 PM) | GudTree',
    metaDescription:
      'Laptop keyboard safe dry crunch, raat ki padhai ke snacks, aur 4 PM office slump me samosa ke healthy swaps.',
    h1: 'Desk & Study Munches',
    introContent:
      'Laptop par kaam karte waqt ya raat ko padhte waqt chabane ke liye non-greasy snacks jisse neend na aaye aur ungliya saaf rahein.',
    keywords: 'desk snacks, late night study munchies, office 4 pm chai snacks, non greasy laptop snacks, roasted makhana, hostel food',
  },
  'weight-protein': {
    slug: 'weight-protein',
    metaTitle: 'Gym & Fitness Protein Under ₹50 | GudTree',
    metaDescription:
      'Body aur muscles ke liye ₹50 ke andar sasta protein, chana sattu shakes, aur pre-post workout snacks bina mehenge whey ke.',
    h1: 'Gym & Sasta Protein',
    introContent:
      'Hostel aur room par rehne walo ke liye sasta aur clean protein. Bina ₹6,000 ke dabbo ke 20g natural protein hit karne ke aasan tareeqe.',
    keywords: 'protein under 50 rupees, sattu protein vs whey, gym bag snacks, pre post workout snacks, fat loss snacks 150 calories',
  },
  'heart-liver-care': {
    slug: 'heart-liver-care',
    metaTitle: 'Drinks, Chaas & Hangover Reset | GudTree',
    metaDescription:
      'Daru ka hangover utarne ke desi nuskhe, jeera chaas, sattu coolers aur chai peene ke aasan pet-friendly rules.',
    h1: 'Healthy Drinks & Hangover Reset',
    introContent:
      'Roz ke pet-friendly desi sharbat aur weekend party ke baad daru ka hangover, ulti aur sir-dard 30 minute me shant karne wale desi drinks.',
    keywords: 'daru ka hangover kaise utare, hangover home remedies india, jeera chaas benefits, desi coolers, chai acidity buffer, liver detox drinks',
  },
  'pcos-hormones': {
    slug: 'pcos-hormones',
    metaTitle: "Women's Care: PCOS, Periods & Skin | GudTree",
    metaDescription:
      'PCOS me wazan aur pimples control, period cramps aur meetha khane ki craving shant karne wale safe Indian food swaps.',
    h1: "Women's Care (PCOS & Periods)",
    introContent:
      'PCOS me insulin balance, periods se pehle pet ke marod (cramps) kam karne wale seeds, aur jawline pimples rokhne ke dairy-free swaps.',
    keywords: 'pcos snacks india, period cramps relief food, pms craving snacks, seed cycling mix, hormonal acne diet, pregnancy morning sickness snacks',
  },
  'gut-health': {
    slug: 'gut-health',
    metaTitle: 'Pet Ka Gas & Bloating Relief | GudTree',
    metaDescription:
      '8 ghante kursi par baithne se phoola hua pet, khane ke baad acidity aur seene ki jalan shant karne ke desi gharelu nuskhe.',
    h1: 'Pet & Pachan (Gut Health)',
    introContent:
      'Office chair par 8 ghante baithne se achanak pet phoolna aur acidity hona. Dahi, kanji aur sabja seeds se pet ko halka aur thanda rakhna.',
    keywords: 'pet ka gas relief, desk sitting bloat, acidity after coffee, sabja seeds acidity, dahi probiotics, beetroot kanji benefits',
  },
  'label-audits': {
    slug: 'label-audits',
    metaTitle: 'Market Packet Check (Blinkit, Chips, Biscuits) | GudTree',
    metaDescription:
      'Blinkit, Too Yumm aur bakery biscuits ke packet ke piche ka sach. Exposing maltodextrin, hidden palm oil aur fake whole wheat claims.',
    h1: 'Market Packets Ka Sach',
    introContent:
      'Supermarket aur delivery apps par milne wale chips aur biscuits ke packet ka sach. Baked bol kar palm oil aur maltodextrin kaise chipkate hain.',
    keywords: 'market label audit india, blinkit snack audit, too yumm truth, digestive biscuit maida truth, hidden sugar names, protein bar check',
  },
  'diabetes-low-gi': {
    slug: 'diabetes-low-gi',
    metaTitle: 'Sugar & Diabetes Friendly Crunch | GudTree',
    metaDescription:
      'Sugar ke mareez aur jinka sugar achanak badhta hai, unke liye sham ki chai ke sath safe snacks aur khana khane ka sahi krama.',
    h1: 'Sugar & Diabetes Crunch',
    introContent:
      'Chai ke sath aisi crunch jo sugar ko bilkul normal rakhe. Low-GI makhana, bhuna chana aur khana khane ke aasan food sequencing hacks.',
    keywords: 'low gi snacks india, diabetes friendly chai snacks, sugar spike control, food sequencing hacks, methi khakhra, makhana glycemic index',
  },
  'desi-pantry': {
    slug: 'desi-pantry',
    metaTitle: 'Vrat & Tyohar Ki Healthy Mithai | GudTree',
    metaDescription:
      'Upwas me bina tel-masale ke clean snacks, tyohar par bina white sugar ki mithai, aur desi millets (ragi, jowar).',
    h1: 'Vrat & Tyohar Ki Mithai',
    introContent:
      'Navratri aur fasting me acidity rokhne wale clean snacks, aur tyohar par khoya aur white sugar ke bina khajoor aur palm gud ke laddoo.',
    keywords: 'healthy upwas snacks, vrat ka khana without acidity, diwali sugar free sweets, palm jaggery karupatti, positive millets ragi jowar',
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
