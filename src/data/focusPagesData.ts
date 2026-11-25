export interface SwapRow {
  occasion: string;
  avoid: string;
  swapTo: string;
  whyItWorks: string;
}

export interface ScheduleRow {
  timeSlot: string;
  idealPick: string;
  portion: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FocusPageConfig {
  slug: 'diabetes' | 'heart' | 'gut' | 'pcos' | 'weight';
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  eyebrow: string;
  imageSrc: string;
  accentHex: string;
  statHighlight: string;
  statLabel: string;
  aboutHeadlineLine1: string;
  aboutHeadlineLine2: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  whyProblemHeadline: string;
  avoidIngredients: string[];
  recommendedSnacks: string[];
  dailySwaps: SwapRow[];
  timingSchedule: ScheduleRow[];
  marqueeItems: string[];
  faqs: FaqItem[];
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
}

export const FOCUS_PAGES_MAP: Record<FocusPageConfig['slug'], FocusPageConfig> = {
  diabetes: {
    slug: 'diabetes',
    title: 'Diabetes & Low-GI',
    heroTitle: 'DIABETES & LOW-GI.',
    heroSubtitle:
      'Steady blood sugar, roasted desi crunch, and zero hidden glucose spikes across everyday Indian snacks.',
    eyebrow: 'GudTree Clean Diet Hub • Low-GI Focus',
    imageSrc: '/images/card-diabetes.webp',
    accentHex: '#FF5A3D',
    statHighlight: 'GI < 45',
    statLabel: '237M+ Indians face diabetes or prediabetes spikes',
    aboutHeadlineLine1: 'Crunchy snacks.',
    aboutHeadlineLine2: 'Steady sugar.',
    aboutParagraph1:
      'Most supermarket "diabetic biscuits", rusks, and puffed corn snacks quietly carry maida, liquid glucose, and maltodextrin (glycemic index ~105) behind "sugar-free" front labels. Even small 4 PM servings trigger a sharp glucose roller-coaster followed by evening cravings.',
    aboutParagraph2:
      'Our Low-GI hub pairs classic Indian kitchen staples—like dry-roasted chana, spiced foxnuts (makhana), methi khakhra, and slow-digesting millets—with simple protein-before-carb rules so you enjoy real evening crunch without sacrificing energy.',
    whyProblemHeadline: 'Hidden Triggers in Common Indian Packs',
    avoidIngredients: [
      'Maltodextrin & Liquid Glucose (spikes sugar faster than sucrose)',
      'Refined Wheat Flour (Maida) disguised as "Wheat Crisps"',
      'Caramel Color (INS 150) & Honey-Coated Cornflakes',
      'Refined Palmolein Oil causing sluggish insulin sensitivity',
    ],
    recommendedSnacks: [
      'Dry-roasted black chana (1 handful = high fibre + plant protein)',
      'Jeera or mint roasted makhana tossed in cold-pressed ghee',
      'Unsalted soaked almonds & walnuts before tea',
      'Moong dal chilla crisps or handmade bajra khakhra',
    ],
    dailySwaps: [
      {
        occasion: '4 PM Chai Companion',
        avoid: '2 Marie/Digestive Biscuits + Sweet Chai',
        swapTo: '1 Cup Roasted Makhana + Spiced Roasted Chana',
        whyItWorks: 'Protein and prebiotic fibre slow glucose absorption cleanly.',
      },
      {
        occasion: 'Quick Office Hunger',
        avoid: 'Packaged Aloo Bhujia or Fried Mixture',
        swapTo: 'Handful of Unsalted Almonds + Pumpkin Seeds',
        whyItWorks: 'Healthy monounsaturated fats blunt mid-day insulin swings.',
      },
      {
        occasion: 'After-Meal Sweet Craving',
        avoid: 'Bakery Gulab Jamun or Milk Chocolate Bar',
        swapTo: '1 Small Square 85% Dark Cacao + 2 Roasted Dates with Walnut',
        whyItWorks: 'Nut fat slows natural fruit sugar release cleanly.',
      },
    ],
    timingSchedule: [
      { timeSlot: 'Morning (Pre-Tea)', idealPick: '5 soaked almonds + fenugreek seed water', portion: '1 small bowl' },
      { timeSlot: 'Mid-Morning', idealPick: 'Guava slices or sprouts with lemon & jeera', portion: '100g fresh' },
      { timeSlot: '4 PM Chai Time', idealPick: 'Roasted black chana + curry-leaf makhana', portion: '30g crisp' },
      { timeSlot: 'After Dinner', idealPick: 'Warm cinnamon saunf infusion (zero sugar)', portion: '1 cup' },
    ],
    marqueeItems: [
      'GLYCEMIC INDEX < 45',
      'ZERO MALTODEXTRIN',
      'ROASTED CHANA & MAKHANA',
      'NO MAIDA RUSKS',
      'FIBRE BEFORE CARBS',
    ],
    faqs: [
      {
        q: 'Can people managing blood sugar eat roasted makhana daily?',
        a: 'Yes, plain dry-roasted makhana (around 25–30g per serving) has a low glycemic load, practically zero fat if air-roasted or lightly tossed in cold-pressed ghee, and digests comfortably at chai time.',
      },
      {
        q: 'Why do "sugar-free" biscuits still raise post-meal glucose?',
        a: 'Even when table sugar is removed, refined wheat flour (maida), refined palmolein oil, and starches like maltodextrin digest rapidly into glucose. Always check the top three ingredients on the back panel.',
      },
      {
        q: 'What is the smartest snack order to prevent sugar spikes?',
        a: 'Eat 6–8 almonds or a small sprout bowl 15 minutes before any carbohydrate snack or meal. Protein and fibre create a natural buffer in your gut that flattens the glucose curve.',
      },
      {
        q: 'Are date-sweetened bars always safe for diabetes?',
        a: 'Not in excess. Concentrated date paste without added nuts or seeds delivers fast fructose. Pair small portions with walnuts, chia, or roasted peanuts rather than eating pure fruit paste bars alone.',
      },
    ],
    keywords: ['diabet', 'sugar', 'glucose', 'health', 'food', 'lifestyle', 'insulin'],
    seoTitle: 'Diabetes & Low-GI Clean Snacks, Diet Swaps & Guides | GudTree',
    seoDescription:
      'Explore low-GI Indian healthy snacks, label red flags, roasted makhana swaps, and sugar-smart nutrition blogs on GudTree.',
  },

  heart: {
    slug: 'heart',
    title: 'Heart & Fatty Liver',
    heroTitle: 'HEART & FATTY LIVER.',
    heroSubtitle:
      'Zero palm oil swaps, omega-rich nuts, and clean liver-friendly Indian everyday eating without fried grease.',
    eyebrow: 'GudTree Clean Diet Hub • Heart & Liver Care',
    imageSrc: '/images/card-heart.webp',
    accentHex: '#2BA6FF',
    statHighlight: '0% PALM',
    statLabel: '30–35% Indian adults face fatty liver & lipid imbalance',
    aboutHeadlineLine1: 'Light oils.',
    aboutHeadlineLine2: 'Cleaner arteries.',
    aboutParagraph1:
      'Fatty liver (MASLD) and low HDL cholesterol in India rarely come from homemade ghee alone—they surge because packaged snacks, namkeens, and "baked" chips soak up cheap refined palmolein oil, hidden fructose syrups, and excessive sodium.',
    aboutParagraph2:
      'This hub focuses on practical swaps: trading deep-fried mixtures for dry-roasted walnut-flax mixes, lowering refined carbs at dinner, and spots-checking "zero cholesterol" labels that still carry trans fats and hydrogenated oil.',
    whyProblemHeadline: 'What Hurts Liver & Lipid Numbers Quietly',
    avoidIngredients: [
      'Refined Palmolein / Edible Vegetable Oil on fried & "baked" snacks',
      'Partially Hydrogenated Fat (Vanaspati / Bakery Shortening)',
      'High-Fructose Corn Syrup & packaged fruit drinks',
      'Excess Sodium (> 500mg per small pouch) raising BP load',
    ],
    recommendedSnacks: [
      'Raw walnuts & roasted flaxseeds (omega-3 lipid support)',
      'Low-sodium dry-roasted peanuts & sprouted moong',
      'Fresh avocado or boiled chana with pomegranate & lemon',
      'Steamed idli / millet dhokla over fried samosa',
    ],
    dailySwaps: [
      {
        occasion: 'Crunchy Evening Snack',
        avoid: 'Fried Sev Bhujia or Coated Salted Peanuts',
        swapTo: '3 Walnut Halves + Unsalted Dry-Roasted Oats Chivda',
        whyItWorks: 'Eliminates oxidized palm oil while boosting heart-friendly HDL.',
      },
      {
        occasion: 'Refreshing Drink Break',
        avoid: 'Canned Mango Drink / Sweetened Cola',
        swapTo: 'Homemade Nimbu-Pudina Pani or Black Coffee (Unsweetened)',
        whyItWorks: 'Black coffee & citrus cut liver fat buildup with zero fructose load.',
      },
      {
        occasion: 'Cooking & Tossing Fat',
        avoid: 'Reheated Multi-Source Refined Seed Oil',
        swapTo: 'Measured Mustard / Cold-Pressed Groundnut / A2 Ghee',
        whyItWorks: 'Single-press traditional oils remain stable under Indian tadka heat.',
      },
    ],
    timingSchedule: [
      { timeSlot: 'Morning Start', idealPick: 'Warm water + 2 soaked walnuts', portion: '4 halves' },
      { timeSlot: 'Mid-Morning', idealPick: 'Apple or papaya cubes with roasted flax powder', portion: '1 bowl' },
      { timeSlot: 'Evening Break', idealPick: 'Unsweetened green tea + moong sprout chaat', portion: '1 cup' },
      { timeSlot: 'Light Dinner', idealPick: 'Dal + sabzi + multigrain roti (early by 8 PM)', portion: 'Balanced plate' },
    ],
    marqueeItems: [
      'ZERO PALM OIL PROMISE',
      'OMEGA-3 WALNUTS & FLAX',
      'LOW SODIUM CHIVDA',
      'LIVER FRIENDLY SWAPS',
      'NO HYDROGENATED FATS',
    ],
    faqs: [
      {
        q: 'Which packaged snacks are genuinely free of palm oil?',
        a: 'Look explicitly for snacks roasted in air, ghee, olive oil, rice bran, or groundnut oil. Many "baked" multigrain chips still spray 15–20% palmolein for seasoning adhesion—always read the fat source line.',
      },
      {
        q: 'Does lean or non-drinking Indians really get fatty liver?',
        a: 'Yes. High intake of refined maida snacks, white rice overload, sugary beverages, and sedentary desk routines causes insulin resistance and liver fat storage even at normal body weight.',
      },
      {
        q: 'Are walnuts better than fried namkeen for cholesterol?',
        a: 'Replacing just 30g of fried namkeen daily with raw walnuts and roasted flaxseed lowers triglycerides while naturally supporting healthy HDL levels.',
      },
      {
        q: 'How much salt should a clean heart snack contain?',
        a: 'Aim for under 150–200mg sodium per 30g serving, and choose snacks seasoned with roasted cumin, black pepper, amchur, and herbs instead of heavy table salt.',
      },
    ],
    keywords: ['heart', 'cholesterol', 'liver', 'palmolein', 'walnut', 'flax', 'sodium'],
    seoTitle: 'Heart & Fatty Liver Clean Snacks, Zero Palm Oil Guides | GudTree',
    seoDescription:
      'Zero palm oil Indian snacks, walnut-flax swaps, and fatty liver (MASLD) friendly clean eating guides on GudTree.',
  },

  gut: {
    slug: 'gut',
    title: 'Gut Health & Fiber',
    heroTitle: 'GUT HEALTH & FIBRE.',
    heroSubtitle:
      'Lighter digestion, zero acidity, fermented Indian traditions, and prebiotic fibre snacks free of artificial emulsifiers.',
    eyebrow: 'GudTree Clean Diet Hub • Digestive Wellness',
    imageSrc: '/images/card-gut.webp',
    accentHex: '#9B51E0',
    statHighlight: '70%+ DEMAND',
    statLabel: 'Bloating & acidity trigger massive clean digestive focus',
    aboutHeadlineLine1: 'Happy gut.',
    aboutHeadlineLine2: 'Lighter mornings.',
    aboutParagraph1:
      'Frequent bloating, evening acidity, and sluggish digestion are rarely fixed by antacids—they often stem from synthetic thickeners (INS 466, INS 471), artificial sweeteners, and ultra-refined low-fibre packaged biscuits consumed on empty stomachs.',
    aboutParagraph2:
      'GudTree revives effortless Indian microbiome boosters: soaked chia & sabja, homemade chaas with roasted jeera, fermented rice kanji, and crisp jowar/ragi puffs packed with gentle prebiotic fibre.',
    whyProblemHeadline: 'Packaged Additives That Irritate Gut Lining',
    avoidIngredients: [
      'Synthetic Emulsifiers (INS 471, Polysorbate 80, Carboxymethylcellulose)',
      'Sorbitol, Sucralose & Sugar Alcohols causing gas & bloating',
      'Deep-fried maida samosas & acidic evening pastries',
      'Flavoured masala powders loaded with MSG (INS 621)',
    ],
    recommendedSnacks: [
      'Jeera & pudina dry-roasted makhana (easy evening crunch)',
      'Homemade buttermilk (chaas) with hing & roasted cumin',
      'Soaked chia seeds in fresh probiotic curd',
      'Fermented idli bites or sprouted green moong',
    ],
    dailySwaps: [
      {
        occasion: 'Heavy Afternoon Feeling',
        avoid: 'Packaged Fizz Soda + Fried Aloo Crisps',
        swapTo: 'Fresh Jeera Chaas + Baked Jowar Puffs',
        whyItWorks: 'Live lactic acid cultures + gentle sorghum fibre calm gut motility.',
      },
      {
        occasion: 'Late-Night Digestion',
        avoid: 'Spicy Packaged Chips or Ice Cream',
        swapTo: 'Warm Roasted Saunf & Ajwain Water or Papaya Bowl',
        whyItWorks: 'Natural digestive enzymes ease overnight acid reflux.',
      },
      {
        occasion: 'Breakfast Crunch',
        avoid: 'Sugary Malt Cereal with UHT Cream',
        swapTo: 'Curd Parfait with Soaked Chia & Puffed Amaranth',
        whyItWorks: 'High soluble mucilage feeds healthy gut bacteria cleanly.',
      },
    ],
    timingSchedule: [
      { timeSlot: 'Morning Routine', idealPick: 'Soaked raisins & warm jeera water', portion: '1 glass' },
      { timeSlot: 'Post Lunch', idealPick: 'Thin salted chaas with roasted cumin & mint', portion: '200 ml' },
      { timeSlot: 'Evening Snack', idealPick: 'Roasted murmura or lightly salted makhana', portion: '30g bowl' },
      { timeSlot: 'Pre-Bed Habit', idealPick: 'Chew 1 tsp roasted saunf (fennel seeds)', portion: '1 tsp' },
    ],
    marqueeItems: [
      'DESI PROBIOTICS & CHAAS',
      'ZERO SYNTHETIC EMULSIFIERS',
      'PREBIOTIC MILLET FIBRE',
      'BLOATING RELIEF SWAPS',
      'LIGHT & CLEAN SNACKING',
    ],
    faqs: [
      {
        q: 'Which packaged snack ingredients cause sudden bloating?',
        a: 'Watch closely for sugar alcohols (maltitol, sorbitol), carrageenan, synthetic emulsifiers like INS 471, and dense ultra-processed soy protein isolates in commercial diet bars.',
      },
      {
        q: 'Why is homemade dahi better than packaged probiotic drinks?',
        a: 'Packaged probiotic shots often pack 10–14g of refined cane sugar per tiny bottle. Fresh homemade curd paired with soaked chia or roasted oats gives live cultures with zero sugar penalty.',
      },
      {
        q: 'Is roasted makhana safe for people with acidity?',
        a: 'Yes, mildly seasoned jeera or pink-salt roasted makhana is naturally alkaline, non-greasy, and far gentler than deep-fried besan bhujia or tea-time rusks.',
      },
      {
        q: 'How fast does adding fermented food improve digestion?',
        a: 'Pairing just one daily fermented staple (chaas, idli, kanji, or curd) alongside 25g whole-food fibre visibly settles bloating within 7–10 consistent days.',
      },
    ],
    keywords: ['gut', 'digest', 'fiber', 'wellness', 'lifestyle', 'health'],
    seoTitle: 'Gut Health Snacks, Desi Probiotics & Digestion Guides | GudTree',
    seoDescription:
      'Clean probiotic snack ideas, bloating-free Indian evening swaps, and gut microbiome diet blogs on GudTree.',
  },

  pcos: {
    slug: 'pcos',
    title: 'PCOS & Diet Plan',
    heroTitle: 'PCOS & HORMONE PLAN.',
    heroSubtitle:
      'Seed-cycling snacks, anti-inflammatory nuts, and high-protein clean bites crafted to steady cravings naturally.',
    eyebrow: 'GudTree Clean Diet Hub • Hormone Balance',
    imageSrc: '/images/card-pcos.webp',
    accentHex: '#4CC36B',
    statHighlight: 'SEED CYCLING',
    statLabel: '1 in 5 Indian women benefit from low-insulin clean snacking',
    aboutHeadlineLine1: 'Calm cravings.',
    aboutHeadlineLine2: 'Steady hormones.',
    aboutParagraph1:
      'PCOS cravings and afternoon energy crashes are closely tied to hidden insulin spikes and inflammatory refined oils in everyday baked cookies, sugary coffee mixes, and low-protein snacks.',
    aboutParagraph2:
      'Our PCOS & Hormone hub simplifies Indian seed cycling (pumpkin, flax, sesame, sunflower), cinnamon-spiced protein nuts, and savory clean bites that satisfy crunch while nourishing zinc, magnesium, and omega-3 intake.',
    whyProblemHeadline: 'Common Craving Traps Behind Hormone Fatigue',
    avoidIngredients: [
      'Soy Isolates & Artificial Vanilla/Caramel Flavours in "Diet" Bars',
      'Sweetened Coffee Creamers & High-Sugar Milk Tea Premixes',
      'Refined Maida Bakery Puffs & Cream Biscuits',
      'Trans Fats slowing cellular insulin sensitivity',
    ],
    recommendedSnacks: [
      'Seed-cycling laddu (pumpkin + flax or sesame + sunflower with tiny gud)',
      'Cinnamon-dusted roasted almonds & pumpkin seeds',
      'Crispy roasted edamame or sattu buttermilk',
      'Spiced boiled chana chaat with cucumber',
    ],
    dailySwaps: [
      {
        occasion: '4 PM Sweet & Carb Craving',
        avoid: 'Chocolate Wafer Cookie or Cold Coffee Premix',
        swapTo: '1 Homemade Pumpkin-Flax Seed Bite + Spearmint Tea',
        whyItWorks: 'Spearmint + zinc-rich pumpkin seeds support hormone calm with steady glucose.',
      },
      {
        occasion: 'Morning Rush Fuel',
        avoid: 'Packaged Strawberry Muesli',
        swapTo: 'Overnight Soaked Ragi/Oats with Cinnamon & Almonds',
        whyItWorks: 'Cinnamon aids insulin responsiveness without morning sugar rush.',
      },
      {
        occasion: 'Weekend Crunch',
        avoid: 'Cheesy Nachos with Dip',
        swapTo: 'Baked Ragi Crackers with Hung-Curd Mint Dip',
        whyItWorks: 'Calcium, probiotic protein, and slow-burning millet carbs.',
      },
    ],
    timingSchedule: [
      { timeSlot: 'Morning Fuel', idealPick: 'Savory protein start (besan chilla / boiled eggs + seeds)', portion: 'High protein' },
      { timeSlot: 'Mid-Day Boost', idealPick: '1 tbsp mixed pumpkin & flax seeds', portion: '15g seeds' },
      { timeSlot: '4 PM Break', idealPick: 'Spearmint tea + roasted cinnamon almonds', portion: '10 nuts' },
      { timeSlot: 'Dinner Rhythm', idealPick: 'Early balanced dal-veg plate; avoid post-9 PM desserts', portion: 'Regular meal' },
    ],
    marqueeItems: [
      'SEED CYCLING SIMPLIFIED',
      'CINNAMON & ALMOND CRUNCH',
      'SPEARMINT & ANTI-INFLAMMATORY',
      'SAVORY PROTEIN BREAKFAST',
      'NO SOY ISOLATE FILLERS',
    ],
    faqs: [
      {
        q: 'How does seed cycling fit into simple daily Indian snacking?',
        a: 'Days 1–14: add 1 tbsp raw pumpkin + ground flax seeds to curd or snack bars. Days 15–28: switch to 1 tbsp sesame + sunflower seeds as crispy chikki bites or salad toppers.',
      },
      {
        q: 'Why do nutritionists suggest savory high-protein mornings for PCOS?',
        a: 'Starting the morning with sugary cereal spikes blood sugar first thing, driving cravings all afternoon. Savory protein like moong chilla, paneer, or nuts keeps appetite steady.',
      },
      {
        q: 'Are commercial "women wellness gummies" better than real seed snacks?',
        a: 'Whole pumpkin, flax, sesame seeds, and walnuts deliver bioavailable zinc, lignans, and omega-3s alongside natural fibre—without the glucose syrup base inside most gummies.',
      },
      {
        q: 'Does spearmint tea help alongside clean diet swaps?',
        a: 'Many women pair 1–2 unsweetened cups of spearmint tea daily with whole-food anti-inflammatory snacks for refreshing afternoon hydration without caffeine jitters.',
      },
    ],
    keywords: ['pcos', 'hormon', 'seed cycling', 'cinnamon', 'spearmint'],
    seoTitle: 'PCOS & Hormone Clean Snacking, Seed Cycling & Diet Plans | GudTree',
    seoDescription:
      'Discover PCOS-friendly seed cycling bars, cinnamon nut swaps, savory breakfast ideas, and hormone wellness blogs on GudTree.',
  },

  weight: {
    slug: 'weight',
    title: 'Weight & Clean Fuel',
    heroTitle: 'WEIGHT & CLEAN FUEL.',
    heroSubtitle:
      '150-kcal filling clean snacks, high-protein paneer & lentil swaps, and honest calorie truth without starving.',
    eyebrow: 'GudTree Clean Diet Hub • High-Satiety Fuel',
    imageSrc: '/images/card-weight.webp',
    accentHex: '#F5A623',
    statHighlight: '< 150 KCAL',
    statLabel: 'Portion-smart high protein beats starving every single time',
    aboutHeadlineLine1: 'Eat full.',
    aboutHeadlineLine2: 'Trim empty calories.',
    aboutParagraph1:
      'Crash diets fail because tiny 100-calorie "diet crackers" leave you hungry 45 minutes later—triggering late-night overeating. Real fat loss happens when snacks deliver high volume, chewy crunch, and protein per 150 calories.',
    aboutParagraph2:
      'GudTree curates honest Indian high-satiety swaps: spiced sattu coolers, grilled paneer & lentil crisp stacks, dry-roasted soya nuts, and measured makhana bowls that keep you genuinely satisfied between meals.',
    whyProblemHeadline: 'Calorie Traps Disguised as "Light" Snacks',
    avoidIngredients: [
      'Packaged "Lite" Baked Chips packing 480 kcal per 100g via palm oil',
      'Flavoured Yogurt Cups loaded with 16g added sugar syrups',
      'Caloric Cheese Dust & Mayo Dips masking tiny crisp portions',
      'Empty Fruit Juices stripped of satiating pulp & fibre',
    ],
    recommendedSnacks: [
      'Roasted soya nuts or chana zor (high protein crunch under 140 kcal)',
      'Chilled sattu drink with lemon, mint & black salt',
      'Multigrain lentil crisp topped with spiced paneer & cucumber',
      'Air-popped jowar or makhana big bowl (high volume, ~110 kcal)',
    ],
    dailySwaps: [
      {
        occasion: 'Late Afternoon Energy Dip',
        avoid: 'Packet of Cheese Puffs + Sweet Cold Drink (~380 kcal)',
        swapTo: 'Multigrain Lentil Crisps + 50g Spiced Paneer (~165 kcal)',
        whyItWorks: 'Triples satiety protein while slashing refined oils and sugar.',
      },
      {
        occasion: 'Pre-Workout Quick Bite',
        avoid: 'Sugary Bakery Muffin (~340 kcal)',
        swapTo: '1 Banana + 1 tbsp Roasted Peanuts (~180 kcal)',
        whyItWorks: 'Clean natural potassium + sustained nutty stamina.',
      },
      {
        occasion: 'Movie Night Crunch',
        avoid: 'Tub of Buttered Popcorn / Nachos (~600 kcal)',
        swapTo: 'Large Bowl Home-Roasted Peri-Peri Makhana (~130 kcal)',
        whyItWorks: 'Huge crunchy bowl volume keeps hands busy at 75% fewer calories.',
      },
    ],
    timingSchedule: [
      { timeSlot: 'Morning Hydrate', idealPick: 'Black coffee / green tea + 5 soaked almonds', portion: '~45 kcal' },
      { timeSlot: 'Mid-Morning', idealPick: '1 seasonal fruit (apple / guava / berries)', portion: '~75 kcal' },
      { timeSlot: '5 PM Refuel', idealPick: 'Chilled roasted sattu or sprouted moong chaat', portion: '~140 kcal' },
      { timeSlot: 'Dinner Rule', idealPick: 'Fill half plate with sabzi/salad before roti/rice', portion: 'Balanced satiety' },
    ],
    marqueeItems: [
      'HIGH SATIETY < 150 KCAL',
      'PANEER & LENTIL CRUNCH',
      'DESI SATTU PROTEIN',
      'AIR-ROASTED VOLUME SNACKS',
      'NO CRASH DIETS',
    ],
    faqs: [
      {
        q: 'Why is makhana better than potato chips for weight loss?',
        a: 'A generous 30g bowl of air-roasted makhana gives huge crunchy volume for ~105 calories, whereas 30g of fried potato chips packs ~165 calories mostly from oxidized oil and leaves you wanting more.',
      },
      {
        q: 'What is the highest-protein cheap Indian snack under ₹20?',
        a: 'Roasted Bengal gram (bhuna chana), roasted soya nuts, and homemade roasted sattu drinks offer 10–15g plant protein per serving at tiny cost with clean ingredient transparency.',
      },
      {
        q: 'Do "multigrain" packaged biscuits help weight loss?',
        a: 'Usually not—most commercial multigrain biscuits contain 60–70% refined wheat flour (maida), added sugar, and palm oil, delivering ~460 kcal per 100g with very low protein.',
      },
      {
        q: 'Should I skip evening snacks completely to lose fat?',
        a: 'No! Skipping the 4–5 PM meal often leads to ravenous overeating at 9 PM dinner. A clean 130–150 kcal protein-rich snack at 5 PM protects dinner portions effortlessly.',
      },
    ],
    keywords: ['weight', 'protein', '150 cal', 'sattu', 'paneer', 'lentil', 'volumetrics'],
    seoTitle: 'Weight Loss Snacks, High-Protein Indian Swaps & Guides | GudTree',
    seoDescription:
      'Discover high-protein Indian snacks under 150 kcal, paneer-lentil swaps, sattu fuel, and fat-loss diet blogs on GudTree.',
  },
};

export const FOCUS_SLUGS = Object.keys(FOCUS_PAGES_MAP) as Array<FocusPageConfig['slug']>;

export function getFocusPageConfig(slug: string): FocusPageConfig | null {
  const key = (slug || '').toLowerCase() as FocusPageConfig['slug'];
  return FOCUS_PAGES_MAP[key] || null;
}
