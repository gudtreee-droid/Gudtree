const fs = require('fs');
const path = require('path');

// 1. Read categories.json to bind 100% exact names and slugs
const categoriesPath = path.join(__dirname, '..', 'src', 'data', 'categories.json');
const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));

// 2. Comprehensive Master Article Template & Topic Matrix
// 9 Categories x 4 Subcategories x 4 Articles = 144 Articles
const masterCatalog = [
  // =========================================================================
  // CATEGORY 1: Kids Tiffin (kids-tiffin)
  // =========================================================================
  // Subcat 1: School Lunch (school-lunch)
  {
    cat: 'kids-tiffin', sub: 'school-lunch',
    title: '5 No-Maida School Tiffin Ideas That Stay Fresh & Crispy Till 1 PM',
    slug: 'no-maida-school-tiffin-ideas-stay-fresh',
    tag: 'Kids Safe', readTime: '5 min read',
    excerpt: 'Subah 6:30 baje maida bread ke bajaye ye 5 nutrient-dense desi lunchbox swaps jo dopahar tak soggy na ho aur bachha dabba pura saaf karke laaye.',
    swap: 'Ragi & Paneer Stuffed Paratha instead of White Bread Jam',
    badItem: 'Commercial White Sandwich Bread with Hydrogenated Emulsifiers',
    focusKeyword: 'no maida school tiffin ideas',
    keywords: 'no maida school tiffin, healthy lunchbox kids, ragi chilla tiffin, kids lunch ideas india, crispy tiffin hacks',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80'
  },
  {
    cat: 'kids-tiffin', sub: 'school-lunch',
    title: 'Why Morning Bread-Jam Gives Kids an 11 AM School Crash (And 3 Clean Swaps)',
    slug: 'morning-bread-jam-kids-11am-crash-clean-swaps',
    tag: 'Clean Swap', readTime: '4 min read',
    excerpt: 'White bread aur refined jam me 24g rapid sugar hoti hai jo bachhe ki body me insulin spike karke 11 baje dimaag thaka deti hai.',
    swap: 'Sprouted Moong Cheela with Mint Curd Dip',
    badItem: 'Packaged Mixed Fruit Jam (68% Added Sugar & Liquid Glucose)',
    focusKeyword: 'bread jam kids energy crash',
    keywords: 'bread jam health audit, kids sugar rush school, whole grain tiffin, ragi banana pancakes, low GI breakfast kids',
    img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=1200&q=80'
  },
  {
    cat: 'kids-tiffin', sub: 'school-lunch',
    title: 'The 10-Minute Morning Tiffin Prep Guide for Busy Working Parents',
    slug: '10-minute-morning-tiffin-prep-guide-working-parents',
    tag: 'Kids Safe', readTime: '4 min read',
    excerpt: 'Sunday ko 20 minute ki prep aur har subah sirf 10 minute me garam, healthy tiffin pack karne ka realistic desi blueprint.',
    swap: 'Pre-roasted Makhana & Steamed Sweet Corn Box',
    badItem: 'Ready-to-Fry Frozen Nuggets (Hydrogenated Palm Oil & Sodium)',
    focusKeyword: 'quick healthy tiffin prep 10 min',
    keywords: 'quick healthy tiffin, working mother lunchbox tips, batch prep tiffin, oats idli tiffin, paneer wrap kids',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80'
  },
  {
    cat: 'kids-tiffin', sub: 'school-lunch',
    title: 'Picky Eater Hacks: How to Sneak Fiber & Lentils Into School Rotis',
    slug: 'picky-eater-hacks-sneak-fiber-lentils-school-rotis',
    tag: 'Desi Superfood', readTime: '5 min read',
    excerpt: 'Bina taste bigade beetroot puree, sattu aur flaxseed powder ko roti me knead karne ka tarika jo bachhe bina complaint ke khayein.',
    swap: 'Pink Beetroot Sattu Chapati Roll with Hung Curd',
    badItem: 'Packaged Parathas (Preserved with INS 282 & Margarine)',
    focusKeyword: 'picky eater healthy tiffin hacks',
    keywords: 'picky eater lunch box, beetroot roti kids, hidden vegetable tiffin, sattu roll kids, healthy school food',
    img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1200&q=80'
  },

  // Subcat 2: Evening Bites (shaam-ke-snacks)
  {
    cat: 'kids-tiffin', sub: 'shaam-ke-snacks',
    title: 'Shaam Ki 5 PM Hunger: 4 Oil-Free Crunchy Swaps Kids Actually Crave',
    slug: 'shaam-5pm-hunger-oil-free-crunchy-swaps-kids',
    tag: 'Clean Swap', readTime: '4 min read',
    excerpt: 'School se laut-te hi chips aur kurkure mangne wale bachhon ke liye 4 crispy, dry-roasted finger foods jo 2 minute me table par hon.',
    swap: 'Spiced Puffed Lotus Seeds (Makhana) with A2 Ghee',
    badItem: 'Extruded Corn Puffs (Synthetic Flavor 627, 631 & Palm Oil)',
    focusKeyword: 'evening snacks for kids oil free',
    keywords: 'evening snacks for kids, roasted makhana kids, puffed rice bhel clean, shaam ka nasta, healthy evening bites',
    img: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=1200&q=80'
  },
  {
    cat: 'kids-tiffin', sub: 'shaam-ke-snacks',
    title: 'Packet Bhujia vs Roasted Chana: The 4 PM Indian Snack Truth for Children',
    slug: 'packet-bhujia-vs-roasted-chana-kids-snack-truth',
    tag: 'Packet Audit', readTime: '5 min read',
    excerpt: 'Ek 50g bhujia packet me 18g palm oil hota hai jabki 50g roasted chana me 10g natural plant protein aur 8g prebiotic fiber hota hai.',
    swap: 'Spiced Roasted Chana with Peanuts & Curry Leaves',
    badItem: 'Commercial Aloo Bhujia (42% Palm Oil & Acidity Regulators)',
    focusKeyword: 'aloo bhujia vs roasted chana kids',
    keywords: 'bhujia packet audit, roasted chana benefits kids, palm oil in bhujia, clean evening munchies, healthy protein snack',
    img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&q=80'
  },
  {
    cat: 'kids-tiffin', sub: 'shaam-ke-snacks',
    title: 'Homemade Fruit & Nut Chaat: No Refined Sugar, 100% Electrolytes',
    slug: 'homemade-fruit-nut-chaat-no-refined-sugar-kids',
    tag: 'Kids Safe', readTime: '4 min read',
    excerpt: 'Playground se aakar thake huye bachhe ko synthetic juices ke badle seasonal pomegranate, apple aur soaked almonds ki chaat dein.',
    swap: 'Apple, Pomegranate & Soaked Walnut Bowl with Chaat Masala',
    badItem: 'Packaged Mango Drink (Liquid Glucose, Permitted Synthetic Color 110)',
    focusKeyword: 'healthy fruit chaat for kids',
    keywords: 'fruit chaat recipe kids, chaat masala fruits, post playtime snack, hydration snack kids, natural vitamins chaat',
    img: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=1200&q=80'
  },
  {
    cat: 'kids-tiffin', sub: 'shaam-ke-snacks',
    title: 'Crispy Roasted Foxnuts (Makhana): 3 Kid-Approved Spice Blends',
    slug: 'crispy-roasted-foxnuts-makhana-kid-spice-blends',
    tag: 'Desk Munch', readTime: '4 min read',
    excerpt: 'Store-bought flavored makhana me hidden maltodextrin hota hai. Ye 3 simple homemade blends jo kadhai me 3 minute me roast ho jayein.',
    swap: 'Turmeric-Pepper-A2 Ghee Roasted Makhana',
    badItem: 'Commercial Cream & Onion Foxnut Pack (Maltodextrin, MSG, Flavor 635)',
    focusKeyword: 'crispy roasted makhana recipes kids',
    keywords: 'makhana seasonings kids, peri peri makhana home, cheese flavor makhana clean, calcium rich snack kids, oil free crunch',
    img: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=1200&q=80'
  },

  // Subcat 3: Weekend Treats (weekend-treats)
  {
    cat: 'kids-tiffin', sub: 'weekend-treats',
    title: 'Zero Refined Sugar Weekend Treats: Homemade Ragi Brownies with Jaggery',
    slug: 'zero-refined-sugar-weekend-treats-ragi-brownies-jaggery',
    tag: 'No Refined Sugar', readTime: '5 min read',
    excerpt: 'Maida aur white sugar ke bina raw cacao, sprouted finger millet (ragi) aur desi jaggery se bani fudgy brownies jo bachhe bina guilt enjoy karein.',
    swap: 'Sprouted Ragi & Dark Cacao Jaggery Slice',
    badItem: 'Packaged Chocolate Cakes (Palm Fat, Invert Sugar, Potassium Sorbate)',
    focusKeyword: 'ragi brownie jaggery recipe kids',
    keywords: 'ragi brownies no sugar, jaggery baking kids, healthy chocolate treat, weekend baking clean, calcium dessert kids',
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1200&q=80'
  },
  {
    cat: 'kids-tiffin', sub: 'weekend-treats',
    title: 'The Packaged Cookie Audit: Why Butter Cookies Contain Only 1% Real Butter',
    slug: 'packaged-cookie-audit-butter-cookies-only-1-percent-butter',
    tag: 'Packet Audit', readTime: '5 min read',
    excerpt: 'Front pack par golden butter picture, back panel par Hydrogenated Vegetable Fat 24%, Real Butter 0.8%. Janein packet ka pura sach.',
    swap: 'Homemade Oats & Whole Wheat Desi Ghee Cookies',
    badItem: 'Store-Bought Danish Style Cookies (Refined Palm Oil & Artificial Vanillin)',
    focusKeyword: 'butter cookie label audit india',
    keywords: 'butter cookies reality check, hydrogenated vegetable oil cookies, bakery biscuit audit, palm fat in cookies, clean cookies',
    img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&q=80'
  },
  {
    cat: 'kids-tiffin', sub: 'weekend-treats',
    title: 'Homemade Kulfi with A2 Milk & Dates: Beating Industrial Ice Cream Stabilizers',
    slug: 'homemade-kulfi-a2-milk-dates-no-stabilizers',
    tag: 'Clean Swap', readTime: '4 min read',
    excerpt: 'Commercial ice creams me air whipped hoti hai aur INS 412, INS 471 stabilizers hote hain. Ye traditional slow-reduced malai kulfi clean hai.',
    swap: 'Cardamom-Pistachio Slow Cooked Milk Kulfi',
    badItem: 'Commercial Frozen Dessert (Palm Oil, High Fructose Syrup, INS 466)',
    focusKeyword: 'healthy homemade kulfi dates a2 milk',
    keywords: 'healthy kulfi no sugar, dates kulfi recipe, ice cream stabilizers audit, emulsifier 471 ice cream, clean indian desserts',
    img: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=1200&q=80'
  },
  {
    cat: 'kids-tiffin', sub: 'weekend-treats',
    title: 'Millet Waffles with Wild Forest Honey: Sunday Breakfast Family Blueprint',
    slug: 'millet-waffles-wild-forest-honey-sunday-breakfast',
    tag: 'Desi Superfood', readTime: '5 min read',
    excerpt: 'Jowar aur oats ke batter se crispy waffles banayein jo pure desi honey aur sliced strawberries ke sath perfect Sunday treat banate hain.',
    swap: 'Golden Jowar-Oat Waffles with Raw Honey',
    badItem: 'Instant Pancake Mix (Bleached Wheat Flour, Sodium Bicarbonate, Artificial Flavor)',
    focusKeyword: 'millet waffles healthy sunday breakfast',
    keywords: 'millet waffles recipe, jowar flour waffles, wild honey breakfast, healthy pancake mix, gluten free kids breakfast',
    img: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=1200&q=80'
  },

  // Subcat 4: Milk & Sips (doodh-drinks)
  {
    cat: 'kids-tiffin', sub: 'doodh-drinks',
    title: 'Bournvita & Horlicks Reality Check: Decoding 50% Sugar in Kids Health Drinks',
    slug: 'bournvita-horlicks-reality-check-decoding-sugar-health-drinks',
    tag: 'Packet Audit', readTime: '6 min read',
    excerpt: '100g powder me 50g added sugar aur maltodextrin. Health claim ke naam par bachhon ko roz subah 3 chamach extra chini pilai ja rahi hai.',
    swap: 'Homemade Almond-Walnut-Turmeric Doodh Masala',
    badItem: 'Commercial Chocolate Malt Mix (Sugar 49.8g/100g, Caramel Color INS 150c)',
    focusKeyword: 'bournvita sugar content health drink audit',
    keywords: 'bournvita label audit, horlicks sugar content, kids health drinks reality, maltodextrin in doodh mix, clean milk powders',
    img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&q=80'
  },
  {
    cat: 'kids-tiffin', sub: 'doodh-drinks',
    title: '3 Clean Desi Milk Mixers You Can Make at Home in Under 10 Minutes',
    slug: '3-clean-desi-milk-mixers-homemade-recipe',
    tag: 'Kids Safe', readTime: '4 min read',
    excerpt: 'Badam, pista, cardamom aur organic saffron ka natural powder jo doodh ka taste 10 guna badha de bina kisi chemicals ke.',
    swap: 'Pista-Badam-Kesar Immunity Milk Masala',
    badItem: 'Synthetic Vanilla Milk Syrup (High Fructose Corn Syrup & Sodium Benzoate)',
    focusKeyword: 'homemade milk powder for kids recipes',
    keywords: 'dry fruit milk masala, natural doodh powder kids, turmeric ashwagandha milk, almond saffron powder, no sugar milk drink',
    img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&q=80'
  },
  {
    cat: 'kids-tiffin', sub: 'doodh-drinks',
    title: 'Does Your Child Really Need Milk Powders for Bone Growth? The Calcium Truth',
    slug: 'child-milk-powders-bone-growth-calcium-truth',
    tag: 'Clean Swap', readTime: '5 min read',
    excerpt: '100g ragi me doodh se 3 guna zyada bioavailable calcium hota hai. Janein calcium ke asli desi khazane jo health drinks se behtar hain.',
    swap: 'Sprouted Ragi & Sesame Malt Drink',
    badItem: 'Growth & Height Malt Powders (Liquid Glucose & Synthetic Vitamins)',
    focusKeyword: 'kids calcium requirements milk powders truth',
    keywords: 'kids calcium natural sources, ragi calcium vs milk, til seeds calcium kids, child height nutrition myths, clean dairy',
    img: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=1200&q=80'
  },
  {
    cat: 'kids-tiffin', sub: 'doodh-drinks',
    title: 'Golden Turmeric A2 Milk at Bedtime: Fixing Sleep & Immunity Naturally',
    slug: 'golden-turmeric-a2-milk-bedtime-sleep-immunity',
    tag: 'Gut Healing', readTime: '4 min read',
    excerpt: 'Curcumin ki power ko pinch of black pepper aur cow A2 ghee ke sath unlock karein jo raat me cough, congestion aur rest ko theek kare.',
    swap: 'Fresh Kasturi Turmeric Infused Warm Milk',
    badItem: 'Commercial Turmeric Flavor Packaged UHT Milk (Carrageenan INS 407, Sugar 8g)',
    focusKeyword: 'haldi doodh benefits kids bedtime',
    keywords: 'haldi doodh recipe kids, golden milk bedtime, immunity drink children, black pepper curcumin absorption, clean nighttime routine',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&q=80'
  }
];

// Helper to generate full realistic articles for the remaining 32 subcategories programmatically
const subcatDefinitions = [
  // CATEGORY 2: Desk Munches (clean-snacks)
  {
    cat: 'clean-snacks', sub: 'raat-ki-padhai', subName: 'Late-Night Study',
    topics: [
      { title: 'Raat Ki 1 AM Study Hunger: 4 Light Munches That Keep You Awake Without Acidity', slug: 'raat-1am-study-hunger-light-munches-no-acidity', tag: 'Desk Munch', focus: 'late night study snacks india', swap: 'Lightly Salted Roasted Foxnuts with Walnuts', bad: 'Instant 2-Minute Noodles (Palm Oil & Wheat Gluten)' },
      { title: 'Why Midnight Maggi Causes Brain Fog & Lethargy During Morning Exams', slug: 'midnight-maggi-causes-brain-fog-morning-exams', tag: 'Packet Audit', focus: 'instant noodles exam brain fog', swap: 'Steamed Vegetable Poha with Sprouted Peanuts', bad: 'Instant Masala Noodles (TBHQ Preservative & 18% Palm Oil)' },
      { title: 'The Ultimate Hostel Exam Pantry: 5 No-Cook Munches That Fit in a Desk Drawer', slug: 'ultimate-hostel-exam-pantry-5-no-cook-munches', tag: 'Clean Swap', focus: 'hostel room healthy snacks no cook', swap: 'Trail Mix of Roasted Chana, Pumpkin Seeds & Raisins', bad: 'Commercial Potato Chips (35% Palm Oil & MSG)' },
      { title: 'Caffeine Crash Prevention: How to Pair Green Tea with Almonds for Steady Focus', slug: 'caffeine-crash-prevention-green-tea-almonds-focus', tag: 'Low-GI (<45)', focus: 'green tea almonds steady study energy', swap: 'Whole Mamra Almonds with Steamed Sencha Tea', bad: 'Sugary Energy Drink Can (32g Sugar & Synthetic Taurine)' }
    ]
  },
  {
    cat: 'clean-snacks', sub: 'office-4pm-chai', subName: '4 PM Chai Crunch',
    topics: [
      { title: '4 PM Office Chai Partner: Why Roasted Makhana Beats Bhujia Every Single Time', slug: '4pm-office-chai-roasted-makhana-beats-bhujia', tag: 'Desk Munch', focus: '4pm office chai snacks makhana', swap: 'Black Pepper & Himalayan Pink Salt Roasted Makhana', bad: 'Haldiram Sev Bhujia (Edible Palmolein Oil)' },
      { title: 'The Corporate Vending Machine Trap: Decoding Baked Chips and Diet Namkeen', slug: 'corporate-vending-machine-trap-baked-chips-audit', tag: 'Packet Audit', focus: 'diet namkeen baked chips audit', swap: 'Air-Popped Jowar Puffs with Chaat Masala', bad: 'Commercial Diet Chivda (Refined Cottonseed Oil & Maltodextrin)' },
      { title: 'Beating the 4 PM Sugar Craving: Why 2 Medjool Dates Beat a Dairy Milk Bar', slug: 'beating-4pm-sugar-craving-dates-vs-chocolate', tag: 'No Refined Sugar', focus: '4pm sugar cravings dates clean swap', swap: 'Stuffed Medjool Date with Walnut Half', bad: 'Commercial Milk Chocolate Bar (Sugar 55% & Palm Fat)' },
      { title: 'Chai Without The Crash: How to Drink Indian Milk Tea Without Gut Acidity', slug: 'chai-without-crash-drink-tea-without-acidity', tag: 'Gut Healing', focus: 'tea acidity office desk cure', swap: 'Saunf-Elaichi Infused Low-Boil Chai with 4 Almonds First', bad: 'Vending Machine Instant Tea Premix (Hydrogenated Milk Solids)' }
    ]
  },
  {
    cat: 'clean-snacks', sub: 'hostel-library', subName: 'Hostel & Library',
    topics: [
      { title: 'Pocket-Friendly Hostel Snacks: 5 No-Cook Clean Munches Under ₹30', slug: 'pocket-friendly-hostel-snacks-under-30-rupees', tag: 'Clean Swap', focus: 'cheap healthy hostel snacks under 30', swap: '₹15 Paper Packet Roasted Black Gram with Lemon', bad: 'Canteen Fried Samosa (Multiple Times Reheated Palm Oil)' },
      { title: 'Library Study Rules: Silent, Crunchy Snacks That Do Not Disturb Other Students', slug: 'library-study-rules-silent-crunchy-snacks', tag: 'Desk Munch', focus: 'library quiet snacks study food', swap: 'Chewy Dried Figs (Anjeer) and Soaked Pumpkin Seeds', bad: 'Crinkly Foil Chip Pack (Noisy Packaging & High MSG Odor)' },
      { title: 'The Sattu Shaker Bottle Trick: Instant ₹20 Protein Shake in a Hostel Room', slug: 'sattu-shaker-bottle-trick-instant-hostel-protein', tag: 'High Protein', focus: 'sattu shaker bottle hostel protein', swap: 'Chilled Roasted Chana Sattu Drink with Rock Salt', bad: 'Commercial Chocolate UHT Shake (Sugar 21g & Artificial Aroma)' },
      { title: 'Surviving Mess Food: How to Balance Carb-Heavy Hostel Meals with Raw Fibers', slug: 'surviving-mess-food-balance-carb-heavy-meals', tag: 'Gut Healing', focus: 'balance hostel mess food digestion', swap: 'Whole Cucumber & Sprouted Moong Side Bowl', bad: 'Hostel Late-Night Bread Omelette (Vanaspati Margarine on Tawa)' }
    ]
  },
  {
    cat: 'clean-snacks', sub: 'laptop-safe-crunch', subName: 'Keyboard-Safe Bites',
    topics: [
      { title: 'Non-Sticky Work Bites: Crunchy Snacks That Will Not Leave Oil on Your Keyboard', slug: 'non-sticky-work-bites-crunchy-snacks-oil-free', tag: 'Desk Munch', focus: 'keyboard safe snacks non sticky office', swap: 'Dry-Roasted Edamame Beans & Spiced Puffed Millets', bad: 'Greasy Potato Wafers (32g Refined Oil Residual Film)' },
      { title: 'Mindless Desk Eating: The 1-Bowl Portion Control Method for Remote Workers', slug: 'mindless-desk-eating-1-bowl-portion-control-method', tag: 'Clean Swap', focus: 'stop mindless snacking at desk', swap: 'Single Ceramic Katori of Dry Roasted Chana & Makhana', bad: 'Family Size Namkeen Pouch (Eaten Straight From Pack)' },
      { title: 'Sprouted Moong Crunch: How to Dehydrate Sprouts for a Keyboard-Ready Snack', slug: 'sprouted-moong-crunch-dehydrate-keyboard-snack', tag: 'High Protein', focus: 'crispy sprouted moong snack recipe', swap: 'Chaat Masala Air-Crisped Sprouted Moong', bad: 'Commercial Moong Dal Namkeen (Deep Fried in Palmolein)' },
      { title: 'Blue Light Fatigue: 3 Lutein-Rich Desk Munches That Support Eye Health', slug: 'blue-light-fatigue-lutein-rich-desk-munches-eyes', tag: 'Desi Superfood', focus: 'snacks for eye health screen time', swap: 'Raw Unsalted Pistachios & Shelled Pumpkin Seeds', bad: 'Refined Flour Pretzels (Zero Carotenoids & High GI)' }
    ]
  },

  // CATEGORY 3: Gym & Protein (weight-protein)
  {
    cat: 'weight-protein', sub: 'daily-sasta-protein', subName: 'Budget Protein',
    topics: [
      { title: 'Desi Sasta Protein: How Roasted Black Chana Beats Overpriced Protein Bars', slug: 'desi-sasta-protein-roasted-chana-beats-protein-bars', tag: 'High Protein', focus: 'cheap high protein indian snacks', swap: '100g Roasted Black Gram (22g Protein for ₹20)', bad: 'Overpriced Commercial Protein Bar (18g Sugar & Palm Oil)' },
      { title: 'Whey vs Desi Sattu: The Honest Bioavailability & Digestion Audit', slug: 'whey-vs-desi-sattu-honest-digestion-audit', tag: 'Packet Audit', focus: 'whey protein vs sattu digestion', swap: 'Cold-Pressed Chana Sattu with Buttermilk', bad: 'Cheap Whey Blend (Hidden Maltodextrin & Artificial Sucralose)' },
      { title: '₹15 Paneer Bhurji Toast: Building Lean Muscle on an Indian College Budget', slug: '15-rupee-paneer-bhurji-toast-college-muscle', tag: 'Clean Swap', focus: 'budget paneer protein toast college', swap: 'Fresh Crumbled Cow Milk Paneer on Sourdough', bad: 'Processed Cheese Slices (60% Emulsifiers & Sodium Citrate)' },
      { title: 'Sprouted Kala Chana Chaat: 16g Plant Protein You Can Meal Prep for 3 Days', slug: 'sprouted-kala-chana-chaat-16g-plant-protein', tag: 'High Protein', focus: 'sprouted kala chana meal prep protein', swap: 'Boiled Sprouted Chana with Diced Tomatoes & Chaat Masala', bad: 'Canned Baked Beans (High Sugar Tomato Puree & Salt)' }
    ]
  },
  {
    cat: 'weight-protein', sub: 'pre-post-workout', subName: 'Workout Fuel',
    topics: [
      { title: 'Pre-Workout Desi Fuel: Why Banana with Roasted Peanuts Beats Chemical Energy Gels', slug: 'pre-workout-desi-fuel-banana-peanuts-vs-gels', tag: 'Clean Swap', focus: 'desi pre workout snack banana peanuts', swap: 'Ripe Robusta Banana with 15 Roasted Peanuts', bad: 'Synthetic Pre-Workout Powder (High Caffeine & Artificial Dye 40)' },
      { title: 'Post-Workout Anabolic Window: 3 Fast-Absorbing Desi Protein Combos', slug: 'post-workout-desi-protein-combos-fast-recovery', tag: 'High Protein', focus: 'post workout indian snacks muscle recovery', swap: 'Curd & Sattu Bowl with Crushed Walnuts', bad: 'Commercial Mass Gainer (80g Maltodextrin Carbohydrates)' },
      { title: 'Electrolyte Reset After Heavy Sweating: Why Nimbu Pani with Rock Salt Wins', slug: 'electrolyte-reset-nimbu-pani-rock-salt-wins', tag: 'Kids Safe', focus: 'natural sports drink nimbu pani rock salt', swap: 'Fresh Lime Water with Kala Namak & Raw Honey', bad: 'Fluorescent Sports Drink (Synthetic High Fructose Syrup)' },
      { title: 'Morning Gym Hunger: 2-Minute Pre-Lift Bites That Will Not Make You Nauseous', slug: 'morning-gym-hunger-2-minute-pre-lift-bites', tag: 'Low-GI (<45)', focus: 'morning empty stomach workout snacks', swap: '2 Soft Medjool Dates with 1 Spoon Peanut Butter', bad: 'Heavy Oily Paratha (Causes Cramps and Acid Reflux)' }
    ]
  },
  {
    cat: 'weight-protein', sub: 'fat-loss-snacks', subName: 'Fat Loss Snacks',
    topics: [
      { title: '150-Calorie High-Protein Desi Munches That Keep You Full for 4 Hours', slug: '150-calorie-high-protein-desi-munches-fullness', tag: 'Clean Swap', focus: '150 calorie high protein indian snacks', swap: 'Steamed Edamame & Roasted Makhana Bowl', bad: 'Diet Sev Mix (Hidden Palm Oil & High Caloric Density)' },
      { title: 'Why Volumetrics Beat Starvation: Eating a Huge Bowl of Food for 90 Calories', slug: 'volumetrics-beat-starvation-huge-bowl-90-calories', tag: 'Desk Munch', focus: 'volumetric snacking fat loss india', swap: 'Jumbo Bowl of Dry-Roasted Spiced Foxnuts', bad: 'Tiny Handful of Fried Chips (Empty 280 Calories)' },
      { title: 'Late-Night Fat Loss Craving: How Casein in Desi Paneer Stops Midnight Binging', slug: 'late-night-fat-loss-craving-paneer-casein', tag: 'High Protein', focus: 'bedtime protein for fat loss paneer', swap: '50g Fresh Raw Cow Paneer with Black Pepper', bad: 'Ice Cream Tub (Spikes Insulin & Halts Fat Burning)' },
      { title: 'The Liquid Calorie Trap: How Cutting Packaged Fruit Juices Melts Belly Fat', slug: 'liquid-calorie-trap-cutting-packaged-fruit-juices', tag: 'Packet Audit', focus: 'packaged fruit juice belly fat audit', swap: 'Whole Sweet Orange with Fiber Pulp', bad: 'Tetra-Pack Mixed Juice (30g Liquid Sugar & Concentrates)' }
    ]
  },
  {
    cat: 'weight-protein', sub: 'muscle-strength', subName: 'Strength & Stamina',
    topics: [
      { title: 'Natural Creatine & Carnitine: Traditional Indian Foods for Power Lifters', slug: 'natural-creatine-carnitine-traditional-indian-foods', tag: 'Desi Superfood', focus: 'natural creatine foods vegetarian india', swap: 'Sprouted Moong & Paneer Cubes with A2 Ghee', bad: 'Unverified Gym Steroid Infused Powders' },
      { title: 'Joint Lubrication for Heavy Squats: The Traditional Gond & Methi Secret', slug: 'joint-lubrication-heavy-squats-gond-methi-secret', tag: 'Gut Healing', focus: 'gond methi joint health lifters', swap: 'Small Homemade Gond & Almond Bite', bad: 'Artificial Glucosamine Gummy Sweets (High Glucose Syrup)' },
      { title: 'Ashwagandha & Shilajit Snacking: When and How to Take Adaptogens for Stamina', slug: 'ashwagandha-shilajit-snacking-adaptogens-stamina', tag: 'Desi Superfood', focus: 'ashwagandha timing stamina workout', swap: 'A2 Milk with Pure Ashwagandha Root Powder', bad: 'Synthetic Testosterone Booster Pills' },
      { title: 'Building Muscle on a Pure Vegetarian Indian Diet: The Amino Acid Puzzle', slug: 'building-muscle-pure-vegetarian-indian-diet-amino-acids', tag: 'High Protein', focus: 'complete protein vegetarian indian diet', swap: 'Combination of Rice + Dal + Peanuts + Curd', bad: 'Incomplete Single Grain Starvation Diets' }
    ]
  },

  // CATEGORY 4: Sips & Hangover (heart-liver-care)
  {
    cat: 'heart-liver-care', sub: 'hangover-party-reset', subName: 'Hangover Reset',
    topics: [
      { title: 'Sunday Morning Hangover & Acid Reset: Desi Coconut & Kokum Electrolyte Fix', slug: 'sunday-morning-hangover-acid-reset-coconut-kokum', tag: 'Clean Swap', focus: 'indian hangover cure coconut water kokum', swap: 'Fresh Tender Coconut Water with Pinch of Kokum', bad: 'Greasy Fried Eggs & Bacon (Stresses Fatty Liver)' },
      { title: 'Why Commercial Energy Drinks Ruin Liver Detox Pathways After Alcohol', slug: 'commercial-energy-drinks-ruin-liver-detox-alcohol', tag: 'Packet Audit', focus: 'energy drinks after alcohol liver damage', swap: 'Fresh Sugarcane Juice with Ginger and Lemon', bad: 'Caffeinated Party Mixer Can (High Taurine & Acid)' },
      { title: 'The Alkaline Morning Broth: Flushing Acetaldehyde with Cumin & Coriander Tea', slug: 'alkaline-morning-broth-flushing-acetaldehyde-cumin-tea', tag: 'Gut Healing', focus: 'jeera dhaniya water hangover detox', swap: 'Boiled Jeera-Dhaniya-Saunf Detox Tea', bad: 'Strong Black Coffee on Empty Acidic Stomach' },
      { title: 'Fatty Liver Prevention: 5 Everyday Desi Habits for Non-Alcoholic Adults', slug: 'fatty-liver-prevention-5-everyday-desi-habits', tag: 'Desi Superfood', focus: 'prevent non alcoholic fatty liver snacks', swap: '30g Soaked Walnuts & Fresh Amla Juice', bad: 'Commercial Biscuits Made with Palm Olein Oil' }
    ]
  },
  {
    cat: 'heart-liver-care', sub: 'roz-ke-desi-sips', subName: 'Everyday Coolers',
    topics: [
      { title: 'Sattu Buttermilk vs Bottled Fizz: Why Desi Chaas Wins the Summer Hydration War', slug: 'sattu-buttermilk-vs-bottled-fizz-summer-hydration', tag: 'Clean Swap', focus: 'sattu chaas vs soft drinks hydration', swap: 'Chilled Spiced Sattu Chaas with Roasted Cumin', bad: 'Carbonated Cola (Phosphoric Acid & 10 Spoons Sugar)' },
      { title: 'Bel Sharbat: The Ancient Indian Gut Coolant for Extreme Heatwaves', slug: 'bel-sharbat-ancient-indian-gut-coolant-heatwave', tag: 'Gut Healing', focus: 'bel sharbat gut health summer', swap: 'Fresh Wood Apple (Bel) Pulp with Jaggery', bad: 'Artificial Orange Squash (Sodium Benzoate & Food Color)' },
      { title: 'Kokum Solkadhi: The Coastal Digestive Secret That Calms Gastrointestinal Heat', slug: 'kokum-solkadhi-coastal-digestive-secret-calms-gut', tag: 'Desi Superfood', focus: 'solkadhi benefits digestion gut heat', swap: 'Fresh Coconut Milk Infused with Tangy Kokum', bad: 'Antacid Chewable Tablets (Reduces Stomach Acid Artificially)' },
      { title: 'Aam Panna Without White Sugar: Raw Mango Electrolyte Drink Recipe', slug: 'aam-panna-without-white-sugar-raw-mango-recipe', tag: 'No Refined Sugar', focus: 'healthy aam panna recipe with jaggery', swap: 'Roasted Kairi (Raw Mango) Pulp with Black Salt & Gud', bad: 'Commercial Green Mango Ready Syrup (Synthetic Aroma & Sugar)' }
    ]
  },
  {
    cat: 'heart-liver-care', sub: 'chai-coffee-swaps', subName: 'Chai & Coffee Swaps',
    topics: [
      { title: 'Acidity-Free Afternoon Chai: Herbal & Spiced Brews That Do Not Spike Cortisol', slug: 'acidity-free-afternoon-chai-herbal-spiced-brews', tag: 'Clean Swap', focus: 'acidity free chai alternatives afternoon', swap: 'Lemongrass, Ginger & Cardamom Herbal Infusion', bad: 'Over-Boiled Street Cutting Chai (Tannic Acid & Stale Milk)' },
      { title: 'Chicory vs Pure Coffee: Which Is Better for Acid Reflux and Heart Palpitations?', slug: 'chicory-vs-pure-coffee-acid-reflux-heart-palpitations', tag: 'Packet Audit', focus: 'chicory vs coffee acidity heart', swap: 'Roasted Chicory Inulin Root Brew with A2 Milk', bad: 'Triple-Shot Espresso on Empty Stomach' },
      { title: 'Golden Kahwa: Kashmiri Green Tea with Saffron & Almonds for Heart Vitality', slug: 'golden-kahwa-kashmiri-green-tea-saffron-almonds', tag: 'Desi Superfood', focus: 'kashmiri kahwa benefits heart health', swap: 'Whole Leaf Kashmiri Kahwa with Sliced Almonds', bad: 'Flavored Tea Bags with Microplastics & Chemical Aroma' },
      { title: 'Moon Milk at 10 PM: How Nutmeg & Ashwagandha Deepen REM Sleep Cycles', slug: 'moon-milk-10pm-nutmeg-ashwagandha-rem-sleep', tag: 'Gut Healing', focus: 'moon milk recipe sleep insomnia india', swap: 'Warm Spiced Milk with Freshly Grated Nutmeg (Jaiphal)', bad: 'Chemical Sleeping Pills (Disturbs Natural Sleep Architecture)' }
    ]
  },
  {
    cat: 'heart-liver-care', sub: 'energy-hydration', subName: 'Hydration & Electrolytes',
    topics: [
      { title: 'The Real ORS Audit: Why Commercial Tetra-Pack ORS Drinks Are Sugar Traps', slug: 'real-ors-audit-commercial-tetra-pack-sugar-traps', tag: 'Packet Audit', focus: 'ors drink sugar content audit india', swap: 'WHO Standard Oral Rehydration Salt Packets in Water', bad: 'Tetra-Pack Apple ORS Drink (24g Added Liquid Sugar)' },
      { title: 'Chia vs Sabja Seeds: Which Indian Super-Seed Hydrates Cells Faster?', slug: 'chia-vs-sabja-seeds-which-hydrates-cells-faster', tag: 'Clean Swap', focus: 'sabja vs chia seeds hydration digestion', swap: 'Soaked Basil Seeds (Sabja) in Lemon Infused Water', bad: 'Colored Gummy Electrolyte Drops (Corn Syrup Base)' },
      { title: 'Electrolyte Balance for Hypertension: High Potassium Snacks That Lower BP', slug: 'electrolyte-balance-hypertension-high-potassium-snacks', tag: 'Low-GI (<45)', focus: 'potassium rich snacks high blood pressure', swap: 'Tender Coconut Water & Unsalted Pumpkin Seeds', bad: 'Processed Salted Peanuts (High Refined Sodium Chloride)' },
      { title: 'Dehydration Headaches at Work: How to Hydrate Without Chugging 4 Liters at Once', slug: 'dehydration-headaches-at-work-smart-hydration', tag: 'Desk Munch', focus: 'cure dehydration headache office desk', swap: 'Sip Cucumber & Mint Infused Water Every 30 Minutes', bad: 'Paracetamol Tablets for Simple Dehydration Fatigue' }
    ]
  },

  // CATEGORY 5: Women Care (pcos-hormones)
  {
    cat: 'pcos-hormones', sub: 'pcos-pcod', subName: 'PCOS & Hormones',
    topics: [
      { title: 'PCOS Snacking Rules: 4 Low-Insulin Munches That Prevent Evening Cravings', slug: 'pcos-snacking-rules-low-insulin-munches-cravings', tag: 'Low-GI (<45)', focus: 'pcos friendly evening snacks india', swap: 'Spiced Roasted Makhana & Walnut Mix', bad: 'Digestive Biscuits (High Glycemic Maida & Palm Fat)' },
      { title: 'Spearmint Tea & Savoury Millet Crackers: A Calm 5 PM Routine for Hormones', slug: 'spearmint-tea-savoury-millet-crackers-routine', tag: 'Clean Swap', focus: 'spearmint tea pcos facial hair crackers', swap: 'Pure Spearmint Leaf Brew with Baked Jowar Crackers', bad: 'Commercial Chai with 2 Spoons White Sugar' },
      { title: 'Hidden Soy Isolate & Sugar Traps Inside Packaged Women Wellness Bars', slug: 'hidden-soy-isolate-sugar-traps-women-wellness-bars', tag: 'Packet Audit', focus: 'women wellness bars sugar audit pcos', swap: 'Handmade Almond, Flax & Pumpkin Seed Ladoo', bad: 'Commercial Fitness Bar with Soy Protein Isolate' },
      { title: 'Why a Savoury High-Protein Breakfast Tames 4 PM PCOS Sweet Cravings', slug: 'savoury-high-protein-breakfast-tames-pcos-cravings', tag: 'High Protein', focus: 'savoury breakfast for pcos insulin spikes', swap: 'Sprouted Moong & Paneer Chilla with Mint Chutney', bad: 'Sweet Cornflakes with Skimmed Milk (Insulin Rollercoaster)' }
    ]
  },
  {
    cat: 'pcos-hormones', sub: 'periods-pms', subName: 'Periods & Cramps',
    topics: [
      { title: 'Cramp Relief Desi Bites: How Til-Gud, Pumpkin Seeds & Dark Cacao Help PMS', slug: 'cramp-relief-desi-bites-til-gud-pumpkin-seeds', tag: 'Desi Superfood', focus: 'period cramp relief snacks food', swap: 'Sesame (Til) & Organic Jaggery Ladoo with Magnesium', bad: 'Salty Potato Chips (Increases Bloating and Water Retention)' },
      { title: 'Why You Crave Sugar Before Periods: The Serotonin-Dopamine Mechanism', slug: 'why-you-crave-sugar-before-periods-serotonin', tag: 'Clean Swap', focus: 'premenstrual sugar cravings science fix', swap: '85% Single-Origin Dark Chocolate with Almond Butter', bad: 'Commercial Bakery Pastries (High Trans Fats & Empty Sugar)' },
      { title: 'Ajwain & Ginger Warm Infusion: Natural Antispasmodic for Menstrual Cramps', slug: 'ajwain-ginger-warm-infusion-menstrual-cramps', tag: 'Gut Healing', focus: 'ajwain water for period cramps relief', swap: 'Warm Boiled Carom Seeds (Ajwain) & Ginger Water', bad: 'Carbonated Sugary Drinks (Worsens Uterine Spasms)' },
      { title: 'Iron Deficiency & Fatigue: 4 Vitamin C Enhanced Desi Snacks for Heavy Flow', slug: 'iron-deficiency-fatigue-vitamin-c-snacks-heavy-flow', tag: 'High Protein', focus: 'iron rich snacks heavy periods anemia', swap: 'Roasted Chana with Fresh Amla Chutney', bad: 'Coffee Directly After Meals (Inhibits Iron Absorption)' }
    ]
  },
  {
    cat: 'pcos-hormones', sub: 'pregnancy-new-moms', subName: 'Pregnancy & Moms',
    topics: [
      { title: 'Clean Postpartum Munches: Traditional Gond, Methi & Makhana Ladoos Decoded', slug: 'clean-postpartum-munches-gond-methi-makhana-ladoos', tag: 'Desi Superfood', focus: 'gond ladoo postpartum recovery benefits', swap: 'Pure Desi A2 Ghee Gond & Dry Fruit Ladoo', bad: 'Store-Bought Glucose Biscuits for Nursing Mothers' },
      { title: 'Morning Sickness & Nausea: 3 Alkaline Kitchen Bites That Settle Pregnant Stomachs', slug: 'morning-sickness-nausea-alkaline-kitchen-bites', tag: 'Gut Healing', focus: 'morning sickness snacks first trimester india', swap: 'Roasted Cumin Dry Crackers with Lemon Water', bad: 'Fried Street Kachoris (Triggers Severe Acidity)' },
      { title: 'Gestational Diabetes Friendly Snacks: Safe Blood Sugar Munchies for Expecting Moms', slug: 'gestational-diabetes-friendly-snacks-expecting-moms', tag: 'Low-GI (<45)', focus: 'gestational diabetes snacks list india', swap: 'Boiled Chickpea Chaat with Cucumber & Olive Oil', bad: 'Refined Rusk Toast with Sweetened Milk' },
      { title: 'Galactagogue Superfoods: Natural Herbs & Seeds for Healthy Breast Milk Supply', slug: 'galactagogue-superfoods-natural-seeds-breast-milk', tag: 'Kids Safe', focus: 'foods to increase breast milk supply desi', swap: 'Shatavari, Fennel (Saunf) & Sesame Seed Mix', bad: 'Synthetic Lactation Cookies Packed with Refined Sugar' }
    ]
  },
  {
    cat: 'pcos-hormones', sub: 'skin-pimples-glow', subName: 'Clear Skin & Glow',
    topics: [
      { title: 'The Gut-Skin Connection: 4 Anti-Inflammatory Snacks to Fight Hormonal Acne', slug: 'gut-skin-connection-anti-inflammatory-snacks-acne', tag: 'Gut Healing', focus: 'diet for hormonal acne clear skin india', swap: 'Fresh Curd Bowl with Crushed Flaxseeds & Walnuts', bad: 'Dairy Milk Chocolate Bars with Emulsifiers' },
      { title: 'Why Refined Dairy & Sugar Cause Adult Jawline Breakouts (And What to Eat Instead)', slug: 'why-refined-dairy-sugar-cause-jawline-breakouts', tag: 'Packet Audit', focus: 'jawline acne dairy sugar audit', swap: 'Spiced Coconut Yogurt with Chia Seeds', bad: 'Commercial Flavored Milk & Milk Powder Shakes' },
      { title: 'Amla & Sunflower Seeds: Building Natural Collagen Without Expensive Supplements', slug: 'amla-sunflower-seeds-building-natural-collagen', tag: 'Desi Superfood', focus: 'natural collagen foods vegetarian india', swap: 'Raw Amla Juice Shooters with Toasted Sunflower Seeds', bad: 'Hydrolyzed Marine Collagen Gummies Full of Glucose' },
      { title: 'Skin Hydration From Within: Replacing Carbonated Sodas with Vetiver Water', slug: 'skin-hydration-within-vetiver-khus-water', tag: 'Clean Swap', focus: 'vetiver khus water skin glow hydration', swap: 'Earthen Pot Water Infused with Vetiver (Khus) Roots', bad: 'Diet Sodas Packed with Aspartame & Phosphoric Acid' }
    ]
  },

  // CATEGORY 6: Gut & Bloat (gut-health)
  {
    cat: 'gut-health', sub: 'gas-bloating', subName: 'Bloat & Acidity',
    topics: [
      { title: '3 PM Desk Bloat? Why Puffed Millets Beat Extruded Packaged Namkeen', slug: '3pm-desk-bloat-puffed-millets-beat-namkeen', tag: 'Gut Healing', focus: 'desk bloat cures afternoon snacks', swap: 'Roasted Puffed Jowar with Rock Salt & Hing', bad: 'Extruded Namkeen Fried in Palmolein' },
      { title: 'Hidden Emulsifiers in Commercial Snacks That Quietly Trigger Gut Inflammation', slug: 'hidden-emulsifiers-commercial-snacks-gut-inflammation', tag: 'Packet Audit', focus: 'emulsifiers in snacks gut lining damage', swap: 'Single-Ingredient Dry Roasted Peanuts', bad: 'Commercial Cookies with Soy Lecithin & INS 471' },
      { title: 'The 2-Minute Hing-Jeera Warm Water Protocol After a Heavy Oily Lunch', slug: '2-minute-hing-jeera-warm-water-protocol-lunch', tag: 'Clean Swap', focus: 'hing jeera water bloat gas instant relief', swap: 'Warm Water with Pinch of Asafetida & Cumin', bad: 'Effervescent Antacid Sachets (High Sodium Content)' },
      { title: 'FODMAP Friendly Indian Snacks: Crunchy Options That Will Not Inflate Your Belly', slug: 'fodmap-friendly-indian-snacks-no-bloat', tag: 'Low-GI (<45)', focus: 'low fodmap indian snacks bloating ibs', swap: 'Dry Roasted Makhana & Pumpkin Seeds with Mint', bad: 'Garlic-Heavy Commercial Mixture Namkeen' }
    ]
  },
  {
    cat: 'gut-health', sub: 'acidity-jalan', subName: 'Acidity & Heartburn',
    topics: [
      { title: 'Instant Heartburn Relief: 3 Alkaline Kitchen Snacks That Calm Acid Spikes', slug: 'instant-heartburn-relief-alkaline-kitchen-snacks', tag: 'Gut Healing', focus: 'instant heartburn relief food indian kitchen', swap: 'Cold Raw Milk Sips or Chewing 1 Pod of Green Cardamom', bad: 'Chewing Gums with Artificial Peppermint & Sweeteners' },
      { title: 'Why Empty Stomach Chai Corrodes Your Gastric Mucosa (And How to Protect It)', slug: 'empty-stomach-chai-corrodes-gastric-mucosa', tag: 'Clean Swap', focus: 'empty stomach tea acidity stomach ulcers', swap: 'Eat 4 Soaked Almonds 10 Minutes Before Your Chai', bad: 'Strong Dark Tea on Bare Empty Stomach' },
      { title: 'Fennel (Saunf) & Rock Sugar: The Ancient Post-Meal Science of Digestion', slug: 'fennel-saunf-mishri-post-meal-science-digestion', tag: 'Desi Superfood', focus: 'saunf mishri digestion science benefits', swap: 'Lightly Roasted Saunf with Unrefined Dhaga Mishri', bad: 'Commercial Colored Supari & Flavored Pan Masala' },
      { title: 'GERD Safe Late-Night Munching: Foods That Prevent Acid Reflux in Bed', slug: 'gerd-safe-late-night-munching-prevent-reflux', tag: 'Desk Munch', focus: 'acid reflux safe bedtime snacks', swap: 'Half an Apple with a Pinch of Cinnamon', bad: 'Late Night Pizza or Fried Paratha with Butter' }
    ]
  },
  {
    cat: 'gut-health', sub: 'dahi-fermented', subName: 'Fermented & Probiotic',
    topics: [
      { title: 'Desi Probiotic Power: Kanji, Dahi & Fermented Rice for Your Microbiome', slug: 'desi-probiotic-power-kanji-dahi-fermented-rice', tag: 'Gut Healing', focus: 'indian fermented probiotic foods microbiome', swap: 'Black Carrot Mustard Kanji & Fresh Set Curd', bad: 'Expensive Commercial Probiotic Drink Bottles with Sugar' },
      { title: 'How to Make Authentic Prebiotic Gajar Kanji at Home in a Clay Pot', slug: 'make-authentic-prebiotic-gajar-kanji-clay-pot', tag: 'Clean Swap', focus: 'gajar kanji recipe gut health winter', swap: 'Mustard Seed & Beetroot Ferment in Sunlit Jar', bad: 'Synthetic Apple Cider Vinegar Gummies with Added Sugar' },
      { title: 'Panta Bhat & Fermented Pohe: The Ancient Indian Super-Breakfast for Leaky Gut', slug: 'panta-bhat-fermented-pohe-super-breakfast-gut', tag: 'Desi Superfood', focus: 'fermented rice water benefits gut healing', swap: 'Overnight Soaked Cooked Rice with Mustard Oil & Onion', bad: 'Store-Bought Cereal Flakes with Synthetic B-Vitamins' },
      { title: 'Is Store-Bought Yogurt Really Probiotic? The Shelf-Life & Sugar Truth', slug: 'store-bought-yogurt-probiotic-shelf-life-truth', tag: 'Packet Audit', focus: 'flavored yogurt probiotic reality audit', swap: 'Homemade A2 Cow Milk Dahi with Live Active Cultures', bad: 'Commercial Strawberry Yogurt (18g Sugar & Stabilizers)' }
    ]
  },
  {
    cat: 'gut-health', sub: 'kabz-fiber', subName: 'High Fiber & Digestion',
    topics: [
      { title: 'Fiber-First Evenings: 4 Desi Seeds & Sprouts to End Chronic Constipation', slug: 'fiber-first-evenings-desi-seeds-sprouts-constipation', tag: 'Gut Healing', focus: 'chronic constipation cure high fiber snacks', swap: 'Soaked Basil Seeds (Sabja) in Warm Water with Fig', bad: 'Synthetic Laxative Syrups That Cause Dependency' },
      { title: 'Isabgol (Psyllium Husk) Mistakes: Why Taking It Wrong Makes Constipation Worse', slug: 'isabgol-psyllium-husk-mistakes-constipation-worse', tag: 'Clean Swap', focus: 'how to take isabgol correctly water ratio', swap: '1 Spoon Isabgol Stirred in Full 300ml Water Immediately', bad: 'Dry Isabgol Taken with Very Little Water (Causes Choking)' },
      { title: 'Dried Figs (Anjeer) & Munakka: The Gentle Nighttime Laxative for Kids & Elderly', slug: 'dried-figs-anjeer-munakka-nighttime-laxative', tag: 'Kids Safe', focus: 'soaked anjeer munakka for smooth digestion', swap: '2 Soaked Dried Figs Eaten Before Sleeping', bad: 'Chewable Sugar-Coated Laxative Tablets' },
      { title: 'Soluble vs Insoluble Fiber: Balancing Your Evening Snack Bowl for Perfect Stools', slug: 'soluble-vs-insoluble-fiber-evening-snack-bowl', tag: 'Low-GI (<45)', focus: 'soluble vs insoluble fiber indian diet', swap: 'Roasted Oats & Apple Bowl (Soluble) + Flaxseeds', bad: 'Over-Processed Refined Wheat Fiber Biscuits' }
    ]
  },

  // CATEGORY 7: Packet Truth (label-audits)
  {
    cat: 'label-audits', sub: 'chips-namkeen', subName: 'Chips & Namkeen',
    topics: [
      { title: 'The Aloo Bhujia Investigation: How Palm Oil & INS 500 Disguise Real Taste', slug: 'aloo-bhujia-investigation-palm-oil-ins-500-audit', tag: 'Packet Audit', focus: 'aloo bhujia packet audit palm oil', swap: 'Homemade Besan Sev Cooked in Cold-Pressed Peanut Oil', bad: 'Haldiram Aloo Bhujia (42% Palmolein Oil & Synthetic Citric)' },
      { title: 'Decoding Potato Chips: Why 30% of Every Packet Is Pure Hydrogenated Fat', slug: 'decoding-potato-chips-30-percent-hydrogenated-fat', tag: 'Packet Audit', focus: 'potato chips fat content audit india', swap: 'Air-Fried Sweet Potato Slices with Sea Salt', bad: 'Classic Salted Potato Wafers (High Acrylamide & Palmolein)' },
      { title: 'The Banana Chips Scam: Are Kerala Chips Fried in Pure Coconut Oil or Palm Oil?', slug: 'banana-chips-scam-coconut-oil-vs-palmolein', tag: 'Packet Audit', focus: 'kerala banana chips oil audit palm oil', swap: 'Authentic Village Chips Fried in 100% Cold-Pressed Coconut Oil', bad: 'Commercial Packaged Banana Chips (70% Palmolein Blend)' },
      { title: 'Zero Trans Fat on the Label: How FSSAI Loophole Allows Hidden Trans Fats', slug: 'zero-trans-fat-label-fssai-loophole-hidden-fats', tag: 'Packet Audit', focus: 'fssai zero trans fat loophole explained', swap: 'Cold-Pressed Single Seed Oil Namkeen', bad: 'Partially Hydrogenated Vegetable Fat Snacks' }
    ]
  },
  {
    cat: 'label-audits', sub: 'biscuit-bakery', subName: 'Biscuits & Bakery',
    topics: [
      { title: 'The Digestive Biscuit Myth: 68% Maida and Hidden Maltodextrin Decoded', slug: 'digestive-biscuit-myth-68-percent-maida-audit', tag: 'Packet Audit', focus: 'digestive biscuits healthy or not audit', swap: 'Homemade 100% Spelt or Whole Grain Oat Biscuits', bad: 'NutriChoice Digestive (Wheat Flour Maida 65% & Invert Sugar)' },
      { title: 'Rusk Toast with Tea: Why Indian Bakery Rusk Is Worse Than a Donut', slug: 'rusk-toast-with-tea-bakery-rusk-worse-than-donut', tag: 'Packet Audit', focus: 'rusk tea health effects palm oil bakery', swap: 'Sourdough Whole Grain Toast with Desi Ghee', bad: 'Commercial Suji Rusk (Double Baked Palm Oil & Refined Maida)' },
      { title: 'Cream Biscuits & Children: The Synthetic Vanillin & Palm Fat Paste Inside', slug: 'cream-biscuits-children-synthetic-vanillin-palm-fat', tag: 'Kids Safe', focus: 'cream biscuits ingredients audit children', swap: 'Single-Origin Cacao Jaggery Cookies', bad: 'Oreo & Bourbon Style Biscuits (Emulsifiers & High Fructose)' },
      { title: 'Brown Bread vs White Bread: Why 90% of Indian Brown Breads Are Just Dyed Maida', slug: 'brown-bread-vs-white-bread-caramel-color-scam', tag: 'Packet Audit', focus: 'brown bread caramel color scam india', swap: '100% Stone-Ground Whole Wheat Atta Bread', bad: 'Commercial Brown Bread (Maida 75% + Caramel Color IV INS 150d)' }
    ]
  },
  {
    cat: 'label-audits', sub: 'protein-bars-peanut-butter', subName: 'Protein Bars & Butters',
    topics: [
      { title: 'The 20g Protein Bar Audit: Real Whey vs Soy Isolate & Polyols That Cause Gas', slug: '20g-protein-bar-audit-whey-vs-soy-polyols', tag: 'Packet Audit', focus: 'protein bar ingredients audit maltitol gas', swap: 'Whole Nut & Whey Protein Bar with Zero Added Syrups', bad: 'Commercial Gym Bar (Maltitol Syrup, Soy Crisps & Palm Fat)' },
      { title: 'Peanut Butter Trap: Check Your Jar for Hydrogenated Vegetable Oil (Emulsifiers)', slug: 'peanut-butter-trap-check-jar-hydrogenated-oil', tag: 'Packet Audit', focus: 'peanut butter ingredients audit palm oil', swap: '100% Roasted Peanuts Only Peanut Butter (Oil Separation Normal)', bad: 'Commercial Creamy Peanut Butter (Hydrogenated Rapeseed Oil)' },
      { title: 'Chocolate Spreads & Hazelnut Jars: Why Sugar & Palm Oil Make Up 70% of the Jar', slug: 'chocolate-spreads-hazelnut-jars-70-percent-sugar', tag: 'Packet Audit', focus: 'hazelnut chocolate spread ingredients audit', swap: 'Homemade Roasted Hazelnut & Raw Cacao Paste with Honey', bad: 'Commercial Chocolate Hazelnut Spread (Palm Oil 32% & Sugar 55%)' },
      { title: 'High-Protein Cookies: Marketing Gimmick vs Real Nutrition Breakdown', slug: 'high-protein-cookies-marketing-gimmick-vs-nutrition', tag: 'High Protein', focus: 'high protein cookie calories audit', swap: 'Roasted Chana Sattu Ladoo with A2 Ghee', bad: 'Overpriced Protein Cookie (380 Calories & 22g Refined Sugar)' }
    ]
  },
  {
    cat: 'label-audits', sub: 'blinkit-zepto-packs', subName: 'Quick Commerce Audits',
    topics: [
      { title: 'Blinkit & Zepto 10-Minute Snack Audit: The Cleanest 5 Packets You Can Order Right Now', slug: 'blinkit-zepto-10-minute-snack-audit-cleanest-packs', tag: 'Clean Swap', focus: 'healthy snacks blinkit zepto clean list', swap: 'Unroasted Makhana, Roasted Chana & Cold-Pressed Groundnuts', bad: 'Commercial Midnight Munchie Combo Packs (Palm Fat Heavy)' },
      { title: 'Instant Noodle Alternatives on Quick Commerce: Zero Maida, Air-Dried Millet Noodles', slug: 'instant-noodle-alternatives-quick-commerce-millet', tag: 'Kids Safe', focus: 'healthy instant noodles blinkit no maida', swap: '100% Air-Dried Ragi & Foxtail Millet Noodles with Clean Spices', bad: 'Flash-Fried Palm Oil Instant Noodles' },
      { title: 'Ready-to-Eat Popcorn: Why Movie Style Microwave Bags Contain Diacetyl & Palm Fat', slug: 'ready-to-eat-popcorn-microwave-bags-diacetyl-audit', tag: 'Packet Audit', focus: 'microwave popcorn chemicals audit diacetyl', swap: 'Stovetop Pressure Cooker Popped Corn in Desi Cow Ghee', bad: 'Commercial Microwave Butter Popcorn (Hydrogenated Fat & Diacetyl)' },
      { title: 'Packaged Coconut Water: Why Tetra-Packs Taste Sweetened and Contain Sodium Metabisulphite', slug: 'packaged-coconut-water-tetra-pack-preservative-audit', tag: 'Packet Audit', focus: 'packaged coconut water preservatives audit', swap: 'Fresh Green Coconut Cut Live at Street Stall', bad: 'Tetra-Pack Coconut Water (INS 223 Preservative & Reconstituted)' }
    ]
  },

  // CATEGORY 8: Low-Sugar Crunch (diabetes-low-gi)
  {
    cat: 'diabetes-low-gi', sub: 'low-gi-crunch', subName: 'Low-GI Crunch',
    topics: [
      { title: 'The Low-GI Evening Bowl: Roasted Makhana & Methi Seeds for Stable Blood Sugar', slug: 'low-gi-evening-bowl-makhana-methi-blood-sugar', tag: 'Low-GI (<45)', focus: 'low gi snacks for diabetics india', swap: 'Dry Roasted Makhana with Fenugreek (Methi) Spices', bad: 'Puffed White Rice Murmura (Glycemic Index of 85)' },
      { title: 'Glycemic Index of Popular Indian Snacks Ranked from Best to Worst', slug: 'glycemic-index-popular-indian-snacks-ranked', tag: 'Low-GI (<45)', focus: 'glycemic index indian snacks chart', swap: 'Boiled Chana (GI 28) and Roasted Makhana (GI 42)', bad: 'Sabudana Vada (GI 92) and Potato Chips (GI 75)' },
      { title: 'Roasted Edamame & Black Soybeans: The Ultra-Low Carb Evening Crunch', slug: 'roasted-edamame-black-soybeans-ultra-low-carb', tag: 'High Protein', focus: 'low carb snacks diabetics india edamame', swap: 'Dry Toasted Salted Edamame Beans (Net Carbs 4g)', bad: 'Corn Flakes Chivda (High Glycemic Spike)' },
      { title: 'Millet Khakhra with Methi: A Gujarati Classic That Won’t Spike Your Glucometer', slug: 'millet-khakhra-methi-gujarati-classic-no-spike', tag: 'Desi Superfood', focus: 'millet khakhra diabetes blood sugar safe', swap: '100% Jowar-Methi Hand-Pressed Khakhra with Ghee', bad: 'Maida Wheat Khakhra (Refined Flour Base)' }
    ]
  },
  {
    cat: 'diabetes-low-gi', sub: 'sugar-free-namkeen', subName: 'Sugar-Free Namkeen',
    topics: [
      { title: 'Why Sugar-Free Namkeen Still Spikes Your Sugar: The Maltodextrin Starch Secret', slug: 'why-sugar-free-namkeen-spikes-sugar-maltodextrin', tag: 'Packet Audit', focus: 'sugar free namkeen diabetes trap audit', swap: 'Whole Roasted Gram & Cucumber Chaat', bad: 'Commercial Sugar-Free Mixture (Maltodextrin GI 110)' },
      { title: 'Diabetic-Safe Namkeen: 3 Traditional Indian Recipes You Can Make in 15 Minutes', slug: 'diabetic-safe-namkeen-3-traditional-recipes-home', tag: 'Clean Swap', focus: 'homemade diabetic friendly namkeen recipes', swap: 'Spiced Roasted Oats, Peanuts & Curry Leaf Chivda', bad: 'Store-Bought Haldiram Lite Mixture (Fried in Palmolein)' },
      { title: 'The Artificial Sweetener Dilemma: Sucralose vs Stevia vs Monk Fruit in Indian Snacks', slug: 'artificial-sweetener-dilemma-sucralose-stevia-monkfruit', tag: 'Packet Audit', focus: 'stevia vs sucralose diabetes safety audit', swap: 'Pure 100% Green Stevia Leaf Powder or Raw Ceylon Cinnamon', bad: 'Artificial Sucralose Drops (Alters Gut Microbiome Bacteria)' },
      { title: 'Salt and Insulin Resistance: Why Sodium Load Matters Just as Much as Sugar', slug: 'salt-insulin-resistance-sodium-matters-sugar', tag: 'Clean Swap', focus: 'sodium blood sugar insulin resistance', swap: 'Rock Salt (Sendha Namak) in Measured Portions', bad: 'Heavy Monosodium Glutamate & Table Salt Loaded Packs' }
    ]
  },
  {
    cat: 'diabetes-low-gi', sub: 'sugar-spike-hacks', subName: 'Glucose Control Hacks',
    topics: [
      { title: 'The Fiber First Snacking Hack: How 5 Almonds Before Chai Blunts Insulin Spike', slug: 'fiber-first-snacking-hack-5-almonds-before-chai', tag: 'Clean Swap', focus: 'eat nuts before tea cut glucose spike', swap: '5 Whole Raw Almonds Eaten 10 Minutes Before Tea', bad: 'Drinking Sweet Chai on Empty Stomach with Rusk' },
      { title: 'The Vinegar (Sirka) Trick: How 1 Spoon of Apple Cider Vinegar Slows Carb Breakdown', slug: 'vinegar-sirka-trick-slows-carb-breakdown-sugar', tag: 'Gut Healing', focus: 'vinegar before meals blood sugar spike', swap: '1 Spoon Jamun Sirka in Water Before Starchy Snacks', bad: 'Commercial Sugar-Spiked Digestive Tonics' },
      { title: 'Post-Snack 10-Minute Walk: Activating GLUT-4 Receptors in Your Muscles', slug: 'post-snack-10-minute-walk-glut-4-receptors', tag: 'Desk Munch', focus: 'walk after eating blood sugar control', swap: 'Gentle 10-Minute Office Corridor Stroll After Tea', bad: 'Immediately Slumping in Desk Chair for 3 Hours' },
      { title: 'Cold-Soaked Seeds for Glucose: The Fenugreek (Methi) & Cinnamon Overnight Infusion', slug: 'cold-soaked-seeds-fenugreek-cinnamon-glucose', tag: 'Desi Superfood', focus: 'methi seeds cinnamon water blood sugar', swap: 'Overnight Soaked Methi Seeds Water in the Morning', bad: 'Sweetened Herbal Diabetes Juices from Supermarket' }
    ]
  },
  {
    cat: 'diabetes-low-gi', sub: 'bina-chini-sweets', subName: 'Clean Sweet Treats',
    topics: [
      { title: 'Sugar-Free Desi Mithai: Real Dates & Raw Kakvi Swaps Without Maltitol Polyols', slug: 'sugar-free-desi-mithai-real-dates-kakvi-swaps', tag: 'No Refined Sugar', focus: 'diabetic friendly sweets no maltitol india', swap: 'Handmade Anjeer & Walnut Burfi Sweetened with Dates', bad: 'Commercial Diabetic Kaju Katli (Sweetened with Maltitol)' },
      { title: 'Roasted Makhana Kheer with A2 Milk & Cardamom: Festival Sweet Without Guilt', slug: 'roasted-makhana-kheer-a2-milk-cardamom-recipe', tag: 'Desi Superfood', focus: 'makhana kheer no sugar recipe diabetics', swap: 'Slow-Simmered Makhana Kheer Sweetened with Stevia & Nutmeg', bad: 'Store-Bought Instant Kheer Mix (Sugar 52g per Pack)' },
      { title: 'Ceylon Cinnamon Roasted Almonds: The Natural Sweet Spice That Lowers Fasting Sugar', slug: 'ceylon-cinnamon-roasted-almonds-lowers-sugar', tag: 'Low-GI (<45)', focus: 'ceylon cinnamon vs cassia diabetes snack', swap: 'Dry Roasted Almonds Dusted with Pure Ceylon Cinnamon', bad: 'Commercial Honey Roasted Nuts (Coated in Liquid Glucose)' },
      { title: 'Raw Cacao & Coconut Bites: Healthy Chocolate Truffles You Can Make in 5 Minutes', slug: 'raw-cacao-coconut-bites-healthy-truffles-5-min', tag: 'Clean Swap', focus: 'healthy keto chocolate truffles india', swap: 'Organic Cacao, Desiccated Coconut & Cold-Pressed Coconut Oil Bites', bad: 'Commercial Sugar-Free Chocolate Bars with Artificial Sweeteners' }
    ]
  },

  // CATEGORY 9: Fasting Munch (desi-pantry)
  {
    cat: 'desi-pantry', sub: 'upwas-vrat-food', subName: 'Fasting (Vrat) Bites',
    topics: [
      { title: 'Navratri & Ekadashi Vrat: Why Deep-Fried Sabudana Vada Needs a Clean Swap', slug: 'navratri-ekadashi-vrat-sabudana-vada-clean-swap', tag: 'Clean Swap', focus: 'healthy vrat snacks navratri no deep fry', swap: 'Roasted Makhana with Sendha Namak & Roasted Peanuts', bad: 'Deep-Fried Sabudana Vada (Soaked in Commercial Refined Oil)' },
      { title: 'Singhara & Kuttu Atta: The Nutrient-Dense Ancient Flours for Energy During Fasting', slug: 'singhara-kuttu-atta-nutrient-dense-vrat-flours', tag: 'Desi Superfood', focus: 'singhara atta vs kuttu atta benefits vrat', swap: 'Non-Greasy Buckwheat (Kuttu) Cheela with Fresh Curd', bad: 'Deep Fried Kuttu Poori Made with Reuse Oil' },
      { title: 'Rock Salt (Sendha Namak) vs Table Salt: Mineral Profile & Blood Pressure Truth', slug: 'rock-salt-sendha-namak-vs-table-salt-minerals', tag: 'Clean Swap', focus: 'sendha namak vs white salt health benefits', swap: 'Pure Himalayan Pink Sendha Namak for Cooking', bad: 'Refined Table Salt with Anti-Caking Agents (INS 551)' },
      { title: 'Samak Ke Chawal (Barnyard Millet) Khichdi: The Ultimate Light Vrat Meal', slug: 'samak-chawal-barnyard-millet-khichdi-vrat', tag: 'Low-GI (<45)', focus: 'samak rice khichdi healthy fasting recipe', swap: 'Steamed Barnyard Millet with Ghee, Jeera & Peanuts', bad: 'Commercial Fasting Potato Chips (Heavy Trans Fats)' }
    ]
  },
  {
    cat: 'desi-pantry', sub: 'tyohar-ki-mithai', subName: 'Festive Sweets',
    topics: [
      { title: 'Diwali & Rakhi Clean Mithai: Pure A2 Ghee & Makhana Ladoo Recipes', slug: 'diwali-rakhi-clean-mithai-pure-ghee-makhana-ladoo', tag: 'Desi Superfood', focus: 'healthy diwali sweets no refined sugar', swap: 'Handmade Makhana, Gond & Almond Ladoo with Jaggery', bad: 'Commercial Silver Foil Coated Market Mawa Sweets' },
      { title: 'The Adulterated Mawa (Khoya) Warning: How to Test Festive Sweets at Home', slug: 'adulterated-mawa-khoya-warning-test-sweets-home', tag: 'Packet Audit', focus: 'test adulterated mawa iodine starch test', swap: 'Homemade Slow-Reduced Whole Milk Khoya', bad: 'Starch & Detergent Mixed Commercial Khoya' },
      { title: 'Badaam Katli with Organic Jaggery: The Pure Almond Festive Delight', slug: 'badaam-katli-organic-jaggery-almond-delight', tag: 'No Refined Sugar', focus: 'badam katli no sugar recipe festive', swap: 'Pure Almond Flour Kneaded with Warm Desi Jaggery Syrup', bad: 'Commercial Kaju Katli (Cut with 40% Ground Peanuts & Sugar)' },
      { title: 'Dry Fruit Gujiya in Air Fryer: Zero-Maida Festive Holi Snacking', slug: 'dry-fruit-gujiya-air-fryer-zero-maida-holi', tag: 'Clean Swap', focus: 'air fryer gujiya whole wheat recipe', swap: 'Whole Wheat & Suji Crust Baked in Desi Ghee', bad: 'Deep-Fried Maida Gujiya Soaked in Sugar Syrup' }
    ]
  },
  {
    cat: 'desi-pantry', sub: 'mota-anaaj-millets', subName: 'Native Millets',
    topics: [
      { title: 'Ragi, Jowar & Bajra: How India’s Ancient Millets Outperform Modern Oats', slug: 'ragi-jowar-bajra-ancient-millets-vs-oats', tag: 'Desi Superfood', focus: 'millets vs rolled oats nutrition comparison', swap: 'Traditional Sprouted Ragi & Jowar Porridge', bad: 'Commercial Flavored Instant Oats (Added Sugar 16g)' },
      { title: 'How to Roast Millets at Home: Crispy Jowar and Bajra Puffs Without Oil', slug: 'how-to-roast-millets-at-home-crispy-jowar-puffs', tag: 'Desk Munch', focus: 'roast jowar bajra puffs home recipe', swap: 'Stovetop Salt-Popped Jowar Puffs (Desi Popcorn)', bad: 'Commercial Extruded Puffs with MSG & Palm Oil' },
      { title: 'Foxtail & Little Millet: Easy Swaps for Polished White Rice in Daily Lunch', slug: 'foxtail-little-millet-easy-swaps-white-rice', tag: 'Low-GI (<45)', focus: 'foxtail millet vs white rice diabetes', swap: 'Steamed Foxtail Millet with Traditional Dal & Ghee', bad: 'Ultra-Polished Double White Basmati Rice' },
      { title: 'Millet Digestive Enzymes: Why You Must Soak Native Millets for 6 Hours', slug: 'millet-digestive-enzymes-why-soak-millets-6-hours', tag: 'Gut Healing', focus: 'why soak millets before cooking phytates', swap: 'Properly Soaked & Sprouted Millets for Maximum Iron', bad: 'Raw Unsoaked Millet Flours That Cause Bloat' }
    ]
  },
  {
    cat: 'desi-pantry', sub: 'gud-til-snacks', subName: 'Jaggery & Sesame',
    topics: [
      { title: 'Desi Gud vs White Sugar: Mineral Content, Glycemic Truth & Real Desi Til Ladoos', slug: 'desi-gud-vs-white-sugar-mineral-content-til-ladoo', tag: 'Desi Superfood', focus: 'jaggery vs white sugar nutrition comparison', swap: 'Organic Dark Black Jaggery (Iron Rich & Chemical Free)', bad: 'Bleached Yellow Jaggery (Treated with Sodium Hydrosulphite)' },
      { title: 'Winter Immunity with Til & Peanuts: The Traditional Science of Sesame Chikki', slug: 'winter-immunity-til-peanuts-sesame-chikki-science', tag: 'Desi Superfood', focus: 'til chikki health benefits winter immunity', swap: 'Handmade Sesame & Jaggery Brittle Cooked in Iron Kadai', bad: 'Commercial Chikki Bars (Diluted with Liquid Glucose)' },
      { title: 'Palm Jaggery (Karupatti) Benefits: The South Indian Medicinal Sweetener', slug: 'palm-jaggery-karupatti-benefits-south-indian-sweetener', tag: 'Low-GI (<45)', focus: 'palm jaggery karupatti benefits low gi', swap: 'Pure Palm Tree Sap Jaggery (Low GI of 35)', bad: 'Refined White Table Sugar (Empty Calorie GI 65)' },
      { title: 'Black Sesame vs White Sesame: Which Seed Has More Calcium and Zinc?', slug: 'black-sesame-vs-white-sesame-calcium-zinc', tag: 'Clean Swap', focus: 'black til vs white til calcium zinc nutrition', swap: 'Toasted Black Sesame Seeds Sprinkled on Daily Meals', bad: 'Refined Vegetable Oil Margarines' }
    ]
  }
];

// Combine all 144 items
const allArticles = [...masterCatalog];

// Expand subcatDefinitions into allArticles
for (const def of subcatDefinitions) {
  for (const t of def.topics) {
    allArticles.push({
      cat: def.cat,
      sub: def.sub,
      title: t.title,
      slug: t.slug,
      tag: t.tag,
      readTime: '4 min read',
      excerpt: `${t.title} — Janein packet ke piche ka pura sach, nutritional macro table, aur 100% clean Indian kitchen swaps jo health ko protect karein.`,
      swap: t.swap,
      badItem: t.bad,
      focusKeyword: t.focus,
      keywords: `${t.focus}, clean snacking india, gudtree food audit, honest nutrition, zero palm oil`,
      img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&q=80'
    });
  }
}

console.log(`Total Planned Articles: ${allArticles.length}`);

// Generate full article objects matching types/index.ts
const fullArticles = allArticles.map((item, idx) => {
  const catObj = categories.find(c => c.slug === item.cat) || categories[0];
  const subObj = (catObj.subcategories || []).find(s => s.slug === item.sub) || { name: item.sub, slug: item.sub };

  const sections = [
    {
      heading: "1. The Reality Behind the Label (Front Claim vs Reality)",
      content: `<p>Bazaar me bikne wale lagbhag 85% packaged snacks ke front label par 'Healthy', 'Natural', ya 'Rich in Fiber' likha hota hai. Par jaise hi aap packet ko flip karke ingredients padhte hain, asli sach samne aata hai.</p>
<div class="my-6 p-4 rounded-xl bg-red-50 border border-red-200">
  <h4 class="font-bold text-red-900 text-sm mb-1">⚠️ PACKET RED FLAG AUDIT:</h4>
  <p class="text-xs text-red-800 leading-relaxed"><strong>Disguised Ingredient:</strong> ${item.badItem}. Inme refined hydrogenated fats, hidden maltodextrin (GI > 110), aur acidity regulators hote hain jo blood sugar ko spike karte hain aur digestion ko slow karte hain.</p>
</div>
<p>Hamara motive seedha hai: consumers ko empower karna taaki wo greenwashed packaging se bewakoof na banein aur janein ki packet ke andar asal me kya hai.</p>`
    },
    {
      heading: "2. Why Commercial Packaged Snacks Fail Your Health Goals",
      content: `<p>Jab aap refined vegetable oils (jaise Palmolein) ya ultra-processed maida wale snacks khate hain, to body me 3 negative metabolic reactions hote hain:</p>
<ul class="list-disc pl-5 space-y-2 my-4 text-[#334155]">
  <li><strong>Rapid Glucose Spike & Crash:</strong> Refined flour aur liquid glucose se insulin turant pump hota hai, jisse khane ke 45 minute baad dubara bhookh aur lethargy lagti hai.</li>
  <li><strong>Gut Lining Irritation:</strong> INS 471 aur artificial emulsifiers gut ke protective mucous barrier ko weaken karte hain, jisse gas aur bloating hoti hai.</li>
  <li><strong>Slow Metabolism:</strong> Reheated vegetable oils me oxidized free radicals hote hain jo liver detox pathways par extra load daalte hain.</li>
</ul>`
    },
    {
      heading: "3. The GudTree Clean Swap & Macro Breakdown",
      content: `<p>Iska sabse asardar aur tasty solution hamare traditional Indian kitchen me pehle se maujood hai. Is packet ko replace karein hamare verified clean swap se:</p>
<div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
  <h4 class="font-bold text-emerald-900 text-sm mb-1">✅ VERIFIED CLEAN SWAP:</h4>
  <p class="text-xs text-emerald-800 leading-relaxed"><strong>Swap with:</strong> ${item.swap}. Ye zero palm oil, real whole grains, cold-pressed oils ya A2 ghee se bante hain jinka glycemic index 45 se kam hota hai.</p>
</div>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left text-xs border border-gray-200 rounded-lg">
    <thead class="bg-gray-100 font-bold text-gray-700">
      <tr>
        <th class="p-2.5 border-b">Nutritional Metric</th>
        <th class="p-2.5 border-b text-red-600">Commercial Packet</th>
        <th class="p-2.5 border-b text-emerald-700">GudTree Clean Swap</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
      <tr>
        <td class="p-2.5 font-medium">Refined Palm Oil</td>
        <td class="p-2.5 text-red-600">22g - 35g</td>
        <td class="p-2.5 text-emerald-700">0g (Cold-Pressed / Zero)</td>
      </tr>
      <tr>
        <td class="p-2.5 font-medium">Protein per 100g</td>
        <td class="p-2.5 text-red-600">4g - 6g</td>
        <td class="p-2.5 text-emerald-700">12g - 22g Natural</td>
      </tr>
      <tr>
        <td class="p-2.5 font-medium">Dietary Fiber</td>
        <td class="p-2.5 text-red-600">&lt; 1.5g</td>
        <td class="p-2.5 text-emerald-700">7g - 11g Prebiotic</td>
      </tr>
      <tr>
        <td class="p-2.5 font-medium">Glycemic Index (GI)</td>
        <td class="p-2.5 text-red-600">&gt; 70 (High Spike)</td>
        <td class="p-2.5 text-emerald-700">&lt; 45 (Steady Energy)</td>
      </tr>
    </tbody>
  </table>
</div>`
    },
    {
      heading: "4. Practical 3-Step Action Guide",
      content: `<p>Aapko apni daily diet badalne ke liye bohot mehnge exotic products ki zaroorat nahi hai. Sirf ye 3 basic steps follow karein:</p>
<ol class="list-decimal pl-5 space-y-2 my-4 text-[#334155]">
  <li><strong>Read the First 3 Ingredients:</strong> Agar pehle 3 ingredients me Maida, Palm Oil ya Sugar/Maltodextrin hai, to wo health product nahi hai.</li>
  <li><strong>Batch Roast on Weekends:</strong> Makhana, chana, aur pumpkin seeds ko dry roast karke airtight glass jar me table par rakhein.</li>
  <li><strong>Eat Fiber Before Carbs:</strong> Chai ya snack se pehle 4 soaked almonds ya ek glass paani piyein taaki blood sugar stable rahe.</li>
</ol>`
    }
  ];

  const htmlContent = sections.map(s => `<h2>${s.heading}</h2>${s.content}`).join('\n\n');
  const paragraphs = sections.map(s => s.content.replace(/<[^>]*>?/gm, ' ').trim());

  return {
    id: item.slug,
    slug: item.slug,
    title: item.title,
    category: catObj.name,
    categories: [catObj.name, catObj.slug],
    subcategory: subObj.name,
    region: "India",
    contentType: "Clean Food Guide",
    tag: item.tag,
    date: "2026-11-18",
    publishDate: "2026-11-18",
    author: "GudTree Editorial Team",
    authorRole: "Clean Snacking & Nutrition Specialists",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300",
    image: item.img,
    readTime: item.readTime,
    excerpt: item.excerpt,
    content: htmlContent,
    paragraphs: paragraphs,
    sections: sections,
    status: "Published",
    featured: idx < 12,
    trending: idx < 24,
    placement: idx < 3 ? "top3" : idx < 9 ? "latest-news" : "standard",
    keywords: item.keywords,
    focusKeyword: item.focusKeyword,
    metaTitle: `${item.title} | GudTree`,
    metaDescription: item.excerpt.substring(0, 155)
  };
});

// Save to src/data/articles.json
const articlesFilePath = path.join(__dirname, '..', 'src', 'data', 'articles.json');
fs.writeFileSync(articlesFilePath, JSON.stringify(fullArticles, null, 2), 'utf8');
console.log(`Successfully generated and written ${fullArticles.length} articles to src/data/articles.json`);
