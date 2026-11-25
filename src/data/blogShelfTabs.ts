export interface BlogShelfTab {
  id: string;
  label: string;
  thumbSrc: string;
  pillText: string;
  href: string;
  fallbackOffset: number;
  keywords: string[];
}

export const BLOG_SHELF_TABS: BlogShelfTab[] = [
  {
    id: 'kids',
    label: 'Kids Tiffin',
    thumbSrc: '/images/categories/kids-tiffin.svg',
    pillText: 'Kids Fuel',
    href: '/category/kids-tiffin',
    fallbackOffset: 0,
    keywords: ['kids', 'tiffin', 'school', 'lunch', 'bachhe', 'bournvita', 'children'],
  },
  {
    id: 'desk',
    label: 'Desk Munches',
    thumbSrc: '/images/card-diabetes.webp',
    pillText: '4 PM Crunch',
    href: '/category/clean-snacks',
    fallbackOffset: 5,
    keywords: ['clean snacks', 'desk', 'study', 'makhana', 'slump', 'chana', 'chai', 'laptop'],
  },
  {
    id: 'gym',
    label: 'Daily Protein',
    thumbSrc: '/images/card-weight.webp',
    pillText: 'High Protein',
    href: '/focus/weight',
    fallbackOffset: 10,
    keywords: ['weight', 'protein', 'fitness', '150 calorie', 'sattu', 'under 50', 'chana', 'gym'],
  },
  {
    id: 'drinks',
    label: 'Sips & Reset',
    thumbSrc: '/images/card-heart.webp',
    pillText: 'Hangover Fix',
    href: '/category/heart-liver-care',
    fallbackOffset: 15,
    keywords: ['hangover', 'drinks', 'chaas', 'sattu', 'nariyal', 'party', 'alcohol', 'detox', 'liver'],
  },
  {
    id: 'women',
    label: "Women's Health",
    thumbSrc: '/images/card-pcos.webp',
    pillText: 'PCOS & Skin',
    href: '/focus/pcos',
    fallbackOffset: 20,
    keywords: ['pcos', 'pcod', 'hormone', 'period', 'cramp', 'pms', 'pregnancy', 'acne', 'skin'],
  },
  {
    id: 'gut',
    label: 'Gut & Bloat',
    thumbSrc: '/images/card-gut.webp',
    pillText: 'Digestion',
    href: '/focus/gut',
    fallbackOffset: 25,
    keywords: ['gut health', 'bloat', 'acidity', 'chaas', 'kanji', 'emulsifier', 'chia', 'sitting', 'gas'],
  },
  {
    id: 'labels',
    label: 'Packet Truth',
    thumbSrc: '/images/categories/label-audits.svg',
    pillText: 'Label Audit',
    href: '/category/label-audits',
    fallbackOffset: 30,
    keywords: ['label audits', 'blinkit', 'added sugar', 'maltodextrin', 'too yumm', 'maida', 'protein bar', 'palm oil'],
  },
  {
    id: 'diabetes',
    label: 'Low Sugar',
    thumbSrc: '/images/categories/low-sugar.svg',
    pillText: 'Low-GI Pick',
    href: '/focus/diabetes',
    fallbackOffset: 35,
    keywords: ['diabetes', 'low-gi', 'glucose', 'glycemic', 'sugar', 'millet', 'khakhra'],
  },
  {
    id: 'vrat',
    label: 'Clean Pantry',
    thumbSrc: '/images/categories/clean-pantry.svg',
    pillText: 'Fasting Clean',
    href: '/category/desi-pantry',
    fallbackOffset: 40,
    keywords: ['vrat', 'upwas', 'tyohar', 'jaggery', 'gud', 'cold-pressed', 'millets', 'mithai', 'til'],
  },
];
