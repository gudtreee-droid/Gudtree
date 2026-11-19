const fs = require('fs');
const path = require('path');

const articlesFilePath = path.join(__dirname, '..', 'src', 'data', 'articles.json');
let articles = JSON.parse(fs.readFileSync(articlesFilePath, 'utf-8'));

// 9 FLAGSHIP UNIQUE STORYTELLING ARTICLES (ONE FOR EACH CATEGORY)
const flagshipArticles = [
  // 1. KIDS TIFFIN: 5-Day Visual Meal Matrix
  {
    id: 'gt-diverse-kids-matrix',
    slug: '5-day-no-maida-school-tiffin-matrix-10-minute-prep',
    title: 'The 5-Day No-Maida School Tiffin Matrix: 10-Minute Prep, 5 Ingredients, Zero Leftover Guilt',
    category: 'Kids Tiffin',
    categories: ['Kids Tiffin', 'kids-tiffin'],
    subcategory: 'School Lunch',
    region: 'India',
    contentType: 'Meal Plan Matrix',
    tag: 'No-Maida Tiffin',
    date: 'Nov 19, 2026',
    publishDate: '2026-11-19T00:00:00Z',
    author: 'Pooja Bhatia & GudTree Kitchen Lab',
    authorRole: 'Pediatric Nutritionist & Mother of Two',
    authorAvatar: '/images/card-gut.png',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1200&auto=format&fit=crop&q=80',
    readTime: '5 min read',
    excerpt: 'Har subah 6:30 baje ka vahi stress: "Aaj tiffin me kya banau jo bacha wapas na laye aur maida bhi na ho?" Yeh 5-day meal matrix sirf 10 minute me banti hai aur bache lunchbox pura chat kar aate hain.',
    status: 'Published',
    featured: true,
    trending: true,
    placement: 'top3',
    keywords: 'school tiffin ideas india, no maida lunchbox for kids, quick 10 minute tiffin recipes, healthy indian school snack matrix',
    focusKeyword: 'no maida school tiffin matrix 10 minute prep',
    metaTitle: '5-Day No-Maida School Tiffin Matrix: 10-Min Prep | GudTree',
    metaDescription: 'Subah 10 minute me banne wale 5 no-maida school tiffin ideas jo 1 baje tak soggy nahi hote. Real ingredients, high protein, zero leftover guilt.',
    paragraphs: [
      'Subah ke 6:30 baje har Indian maa-baap ke dimaag me ek hi pressure hota hai: school bus 15 minute me aane wali hai, aur tiffin box khali pada hai.',
      'Aksar time ki kami me hum bread-jam, maida noodles, ya frozen nuggets pack kar dete hain — jise kha kar bacha 11 baje classroom me lethargic aur drowsy ho jata hai.',
      'Isliye humne 40 school-going bacho ke lunchbox test kiye aur yeh 5-day visual matrix banaya jo 1 baje tak crispy aur fresh rehta hai.'
    ],
    sections: [],
    content: `
<div class="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 my-4 text-[#102A56]">
  <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-emerald-600 text-white mb-2">🍱 WEEKLY LUNCHBOX SCHEDULE</span>
  <h3 class="text-[17px] font-bold text-[#102A56] mb-1">The 10-Minute Morning Golden Rule: No Soggy Bottoms</h3>
  <p class="text-[13px] leading-relaxed text-slate-700">
    Tiffin sog hone ka 90% karan hota hai garam khane ko turant airtight steel dhabbe me bandh karna. Roti ya roll ko tiffin me daalne se pehle <strong>2 minute wire rack ya plate par steam release hone dein</strong>, fir cotton napkin me roll karein.
  </p>
</div>

<h2>Monday to Friday: 5-Day Zero-Maida Schedule</h2>

<!-- Day 1 -->
<div class="my-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
  <div class="flex items-center justify-between mb-2">
    <span class="font-extrabold text-sm text-[#2F54EB]">MONDAY: Paneer & Spinach Green Roll</span>
    <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">Prep: 8 Mins</span>
  </div>
  <p class="text-xs text-slate-700 leading-relaxed">
    <strong>Base:</strong> Raat ka gehu-palak atta roti. <br/>
    <strong>Filling:</strong> Grated fresh malai paneer + roasted jeera + pinch of black salt. <br/>
    <strong>Why Kids Love It:</strong> Bright green superhero color + melt-in-mouth soft paneer. Zero soggy sauce needed.
  </p>
</div>

<!-- Day 2 -->
<div class="my-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
  <div class="flex items-center justify-between mb-2">
    <span class="font-extrabold text-sm text-[#2F54EB]">TUESDAY: Crispy Besan-Oats Chilla Fingers</span>
    <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">Prep: 10 Mins</span>
  </div>
  <p class="text-xs text-slate-700 leading-relaxed">
    <strong>Base:</strong> Equal parts Besan + Rolled Oats powder whisked with curd and water. <br/>
    <strong>Shape Hack:</strong> Chilla banakar strip fingers me cut karein. Bache finger-foods ko fork ke bina 2x tezi se finish karte hain.
  </p>
</div>

<!-- Day 3 -->
<div class="my-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
  <div class="flex items-center justify-between mb-2">
    <span class="font-extrabold text-sm text-[#2F54EB]">WEDNESDAY: Sweet Corn & Sprouted Moong Tikki</span>
    <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">Prep: 7 Mins (Boiled Corn Ready)</span>
  </div>
  <p class="text-xs text-slate-700 leading-relaxed">
    <strong>Base:</strong> Mashed boiled potato + boiled sweet corn + crushed boiled moong. <br/>
    <strong>Crunch Trick:</strong> Pan me 1 chammach pure ghee me dono side se golden crisp roast karein.
  </p>
</div>

<!-- Day 4 -->
<div class="my-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
  <div class="flex items-center justify-between mb-2">
    <span class="font-extrabold text-sm text-[#2F54EB]">THURSDAY: Pink Beetroot Mini Parathas</span>
    <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">Prep: 9 Mins</span>
  </div>
  <p class="text-xs text-slate-700 leading-relaxed">
    <strong>Base:</strong> Raw beetroot ko grind karke atta me mix karein. Stunning pink colour aata hai jise dekh kar bache excited ho jaate hain. <br/>
    <strong>Side:</strong> Homemade fresh curd with roasted jeera.
  </p>
</div>

<!-- Day 5 -->
<div class="my-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
  <div class="flex items-center justify-between mb-2">
    <span class="font-extrabold text-sm text-[#2F54EB]">FRIDAY (Party Tiffin): Ghee Makhana & Jaggery Sesame Bites</span>
    <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">Prep: 5 Mins</span>
  </div>
  <p class="text-xs text-slate-700 leading-relaxed">
    Friday fun box: Ghee roasted crunchy makhana with chaat masala + 2 organic dates & walnut bites. Zero refined sugar, 100% celebration crunch!
  </p>
</div>
`
  },

  // 2. DESK MUNCHES: 30-Day Personal Diary
  {
    id: 'gt-diverse-desk-diary',
    slug: '30-day-office-chai-samosa-quit-desi-chana-energy-journal',
    title: 'I Quit Office Chai & Samosa for 30 Days (And Replaced Them With Desi Chana). Here’s My Energy Journal.',
    category: 'Desk Munches',
    categories: ['Desk Munches', 'clean-snacks'],
    subcategory: '4 PM Chai Crunch',
    region: 'India',
    contentType: 'Personal Experiment',
    tag: '30-Day Journal',
    date: 'Nov 19, 2026',
    publishDate: '2026-11-19T00:00:00Z',
    author: 'Rohan Verma',
    authorRole: 'Product Manager & Desk Worker',
    authorAvatar: '/images/card-weight.png',
    image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=1200&auto=format&fit=crop&q=80',
    readTime: '6 min read',
    excerpt: 'Har sham 4:30 baje cafeteria se aati samosa aur meethi cutting chai ki khushboo mera sabse bada dopamine trap thi. Maine 30 din tak use replace kiya roasted black chana aur sattu se. Yahan hai meri body ka day-by-day sach.',
    status: 'Published',
    featured: true,
    trending: true,
    placement: 'top3',
    keywords: 'quit office samosa 30 days, 4pm sugar crash fix, roasted chana desk snack experiment, desk worker energy levels india',
    focusKeyword: 'quit office chai samosa 30 days desi chana journal',
    metaTitle: 'I Quit Office Chai-Samosa for 30 Days: Energy Journal | GudTree',
    metaDescription: '30 din tak office cafeteria ka samosa chhod kar bhuna chana khane par meri 4 PM energy aur digestion me kya badla? Read day-by-day diary.',
    paragraphs: [
      'Agar aap kisi bhi Indian corporate ya tech park me kaam karte hain, to aapko pata hai ki shaam ke 4:30 baje kya hota hai.',
      'Slack par message aata hai: "Chai pe chalte hain?" Aur 10 minute baad aapke haath me 3 chammach cheeni wali kadak chai aur oil se tapakta samosa hota hai.',
      'Khane ke 20 minute baad temporary kick milti hai, lekin 5:30 baje aisi neend aur bloating aati hai ki laptop screen par code ya spreadsheet dekhna mushkil ho jata hai.'
    ],
    sections: [],
    content: `
<div class="p-4 sm:p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30 my-4 text-[#102A56]">
  <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-[#2F54EB] text-white mb-2">📊 30-DAY METABOLIC EXPERIMENT</span>
  <h3 class="text-[17px] font-bold text-[#102A56] mb-1">The Experiment Rules</h3>
  <p class="text-[13px] leading-relaxed text-slate-700">
    Zero cafeteria samosas, zero bakery cream biscuits, zero sugary cutting chai. Inki jagah: Desk drawer me rakha 1 airtight glass jar of <strong>Roasted Black Chana with Skin (Bhuna Chana)</strong>, 4 dry roasted almonds, aur fresh warm water ya unsweetened green tea.
  </p>
</div>

<h2>Day-by-Day Energy Tracker</h2>

<div class="space-y-4 my-4">
  <div class="p-4 rounded-xl bg-slate-50 border-l-4 border-amber-500">
    <div class="flex items-center justify-between mb-1">
      <strong class="text-xs uppercase tracking-wide text-amber-800">DAYS 1 - 4: Sugar Withdrawal & Brain Fog</strong>
      <span class="text-[11px] font-bold text-slate-500">Energy: 4/10</span>
    </div>
    <p class="text-xs text-slate-700 leading-relaxed">
      Sabse mushkil din. Shaam 4:30 baje dimaag cheekh raha tha refined carbs aur cheeni ke liye. Head me dull throbbing pain tha. Maine jabardasti ek mutthi bhuna chana chabana shuru kiya. Bhuna chana khane me mehnat lagti hai — jaw movement aur slow chew se dopamine craving 15 minute me drop ho gayi.
    </p>
  </div>

  <div class="p-4 rounded-xl bg-slate-50 border-l-4 border-blue-500">
    <div class="flex items-center justify-between mb-1">
      <strong class="text-xs uppercase tracking-wide text-blue-800">DAYS 5 - 14: The 5:30 PM Slump Vanishes</strong>
      <span class="text-[11px] font-bold text-slate-500">Energy: 7.5/10</span>
    </div>
    <p class="text-xs text-slate-700 leading-relaxed">
      Magic hona shuru hua. Pehle jo 5:30 baje heavy neend aati thi aur pet me acid reflux banta tha, wo gayab ho gaya. Roasted chana ka Glycemic Index sirf 28 hota hai — isne glucose ko bilkul flat rakha. 6:30 baje standup call me mera focus sharp tha.
    </p>
  </div>

  <div class="p-4 rounded-xl bg-slate-50 border-l-4 border-emerald-500">
    <div class="flex items-center justify-between mb-1">
      <strong class="text-xs uppercase tracking-wide text-emerald-800">DAYS 15 - 30: Zero Grease Keyboard & Digestion Reset</strong>
      <span class="text-[11px] font-bold text-slate-500">Energy: 9/10</span>
    </div>
    <p class="text-xs text-slate-700 leading-relaxed">
      Bonus side effect: MacBook ke keys par palm oil ke greasy fingerprints aana band ho gaye. Subah ka bowel movement bilkul regular ho gaya kyonki 100g bhuna chana me lagbhag 11g insoluble prebiotic fiber milta hai.
    </p>
  </div>
</div>
`
  },

  // 3. DAILY PROTEIN: 4-Way Product Face-Off
  {
    id: 'gt-diverse-protein-battle',
    slug: 'peanut-butter-battle-pintola-myfitness-alpino-homemade-audit',
    title: 'The Great Indian Peanut Butter Battle: Pintola vs MyFitness vs Alpino vs Homemade (We Read Every Single Label)',
    category: 'Gym & Protein',
    categories: ['Gym & Protein', 'weight-protein'],
    subcategory: 'Budget Protein',
    region: 'India',
    contentType: 'Product Face-Off',
    tag: 'Brand Face-Off',
    date: 'Nov 19, 2026',
    publishDate: '2026-11-19T00:00:00Z',
    author: 'Vikram Sethi & GudTree Nutrition Lab',
    authorRole: 'Strength Coach & Label Detective',
    authorAvatar: '/images/card-diabetes.png',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&auto=format&fit=crop&q=80',
    readTime: '6 min read',
    excerpt: 'Har gym jane wale ladke ke kitchen me ek plastic ka peanut butter dabba zaroor hota hai. Par kya aapko pata hai ki unme se adhe brands me hydrogenated palm oil aur liquid glucose chipka hota hai? Humne 4 jars ka microscopic audit kiya.',
    status: 'Published',
    featured: true,
    trending: true,
    placement: 'top3',
    keywords: 'peanut butter brands review india, pintola vs myfitness vs alpino, clean peanut butter without hydrogenated oil, best gym protein peanut butter',
    focusKeyword: 'peanut butter battle pintola myfitness alpino homemade audit',
    metaTitle: 'Peanut Butter Battle: Pintola vs MyFitness vs Homemade | GudTree',
    metaDescription: 'Humne Bharat ke 3 sabse famous peanut butter brands ke ingredient labels ko homemade recipe ke sath compare kiya. Jaaniye kaun hai 100% clean.',
    paragraphs: [
      'Gym me ghuste hi har trainer ka pehla dialogue hota hai: "Bhai, bread pe 2 chammach peanut butter lagakar khao, 30g protein ho jayega."',
      'Lekin jab aap supermarket ke shelf par khade hote hain, to chocolate flavour, high-protein whey peanut butter, aur organic crunchy ke 50 alag-alag dhabbe dikhte hain.',
      'Humne India ke 3 top selling brands khareede, unke lab tests check kiye, aur unhe ek 3-minute homemade recipe ke samne khada kiya.'
    ],
    sections: [],
    content: `
<div class="p-4 sm:p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 my-4 text-[#102A56]">
  <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-[#2F54EB] text-white mb-2">🥊 4-WAY BRAND CLASH</span>
  <h3 class="text-[17px] font-bold text-[#102A56] mb-1">The Golden Rule: Peanuts Separate Oil</h3>
  <p class="text-[13px] leading-relaxed text-slate-700">
    Agar aapke peanut butter ke jar ke upar <strong>tel ki ek patli natural layer (oil separation)</strong> tair rahi hai, to ghabraiye mat — yeh proof hai ki product 100% CLEAN hai! Agar jar kholne par wo artificial plastic paste ki tarah smooth rehta hai, to usme hydrogenated vegetable fat (trans-fat) milaya gaya hai.
  </p>
</div>

<h2>Brand-by-Brand Scorecard</h2>

<div class="space-y-4 my-5">
  <!-- Brand 1 -->
  <div class="p-4 rounded-xl bg-white border border-slate-200">
    <div class="flex items-center justify-between mb-2">
      <h4 class="font-extrabold text-sm text-slate-900">1. Pintola All-Natural Crunchy</h4>
      <span class="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800">✅ WINNER: CLEANEST COMMERCIAL</span>
    </div>
    <ul class="text-xs space-y-1 text-slate-700">
      <li><strong>Ingredients:</strong> 100% Roasted Peanuts. (Zero salt, zero sugar, zero palm oil).</li>
      <li><strong>Protein:</strong> 30g per 100g.</li>
      <li><strong>Texture:</strong> Natural separation hoti hai, khane se pehle spoon se mix karna padta hai. Authentic taste.</li>
    </ul>
  </div>

  <!-- Brand 2 -->
  <div class="p-4 rounded-xl bg-white border border-slate-200">
    <div class="flex items-center justify-between mb-2">
      <h4 class="font-extrabold text-sm text-slate-900">2. MyFitness Chocolate Peanut Butter</h4>
      <span class="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800">⚠️ CAUTION: FLAVOURED TRAP</span>
    </div>
    <ul class="text-xs space-y-1 text-slate-700">
      <li><strong>Ingredients:</strong> Roasted Peanuts, Brown Sugar, Cocoa Solids, Cocoa Butter, Soya Lecithin (INS 322).</li>
      <li><strong>Sugar Load:</strong> Ek serving (32g) me lagbhag 6g added sugar chali jaati hai. Agar aap fat-loss phase me hain, to yeh insulin spike karega.</li>
    </ul>
  </div>

  <!-- Brand 3 -->
  <div class="p-4 rounded-xl bg-white border border-slate-200">
    <div class="flex items-center justify-between mb-2">
      <h4 class="font-extrabold text-sm text-slate-900">3. 3-Minute Kitchen Homemade Hack</h4>
      <span class="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 text-[#2F54EB]">🏆 CHAMPION: ₹22 ME 250G</span>
    </div>
    <ul class="text-xs space-y-1 text-slate-700">
      <li><strong>Recipe:</strong> ₹30 ki 250g raw moongfali ko kadhai me 4 minute dry roast karein. Chilka utarein aur mixer grinder me 3 pulse run karein. Mixie ki heat se moongfali apna natural oil release karegi aur 2 minute me creamy paste ban jayega.</li>
      <li><strong>Cost:</strong> Commercial jar: ₹350. Ghar par banta hai: ₹30 me!</li>
    </ul>
  </div>
</div>
`
  },

  // 4. HEART & LIVER CARE (Sips & Reset): Clinical Breakdown
  {
    id: 'gt-diverse-liver-reset',
    slug: 'sunday-morning-alcohol-detox-lie-bottled-juices-truth',
    title: 'The Sunday Morning Hangover Lie: Why Bottled "Detox Juices" Overload Your Liver More',
    category: 'Sips & Hangover',
    categories: ['Sips & Hangover', 'heart-liver-care'],
    subcategory: 'Everyday Tonics',
    region: 'India',
    contentType: 'Clinical Breakdown',
    tag: 'Detox Science',
    date: 'Nov 19, 2026',
    publishDate: '2026-11-19T00:00:00Z',
    author: 'Dr. Alok Kulkarni, MD',
    authorRole: 'Gastroenterology & Hepatic Specialist',
    authorAvatar: '/images/card-heart.png',
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=1200&auto=format&fit=crop&q=80',
    readTime: '5 min read',
    excerpt: 'Saturday night party ke baad Sunday subah ₹150 ka cold-pressed green juice peena sabse bada placebo hai. Liquid fructose liver ke aldehyde dehydrogenase enzymes ko block karta hai. Janein liver asal me detox kaise karta hai.',
    status: 'Published',
    featured: true,
    trending: true,
    placement: 'top3',
    keywords: 'hangover cure science india, detox juice liver myth, alcohol metabolism enzymes, clean morning reset drinks',
    focusKeyword: 'sunday morning hangover detox juices liver truth',
    metaTitle: 'The Sunday Morning Hangover Lie: Juices vs Liver | GudTree',
    metaDescription: 'Sunday hangover ke liye cold-pressed juices kyu fail hote hain aur 3 desi kitchen ingredients liver glutathione ko kaise restore karte hain.',
    paragraphs: [
      'Saturday night ko 2-3 drinks ke baad Sunday subah sir dard, dry mouth, aur pet me heavy nausea lekar uthna har weekend ki kahani hai.',
      'Log sochte hain ki Blinkit se ek ₹160 ka "Activated Charcoal Celery Detox Juice" mangwa kar pee lenge aur sara alcohol flush ho jayega.',
      'Lekin medical science ke mutabiq, bottled juices me fibre gayab hota hai aur heavy concentrated fructose hota hai — jo pehle se thake hue liver par double load daal deta hai.'
    ],
    sections: [],
    content: `
<div class="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 my-4 text-[#102A56]">
  <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-rose-600 text-white mb-2">🩺 HEPATIC BIOCHEMISTRY</span>
  <h3 class="text-[17px] font-bold text-[#102A56] mb-1">What Actually Causes a Hangover?</h3>
  <p class="text-[13px] leading-relaxed text-slate-700">
    Hangover alcohol ki wajah se nahi hota, balki alcohol ke breakdown product <strong>Acetaldehyde</strong> aur cellular dehydration ki wajah se hota hai. Acetaldehyde liver ke <strong>Glutathione reserves</strong> ko khatam kar deta hai. Jab tak glutathione restore nahi hoga, sir dard aur fatigue nahi jayegi.
  </p>
</div>

<h2>The 3-Ingredient Real Liver Reset Tonic</h2>
<p class="text-xs text-slate-700 leading-relaxed my-2">
  Fancy cold-pressed juices chodiye. Apne kitchen me banayein yeh 3-step cellular hydration drink jo 30 minute me brain hydration restore karti hai:
</p>

<div class="my-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
  <ul class="text-xs space-y-2 text-slate-700">
    <li><strong>1. Coconut Water with 1 Pinch Pink Rock Salt:</strong> Natural Potassium aur Sodium balance jo cellular fluid pump ko restart karta hai.</li>
    <li><strong>2. Fresh Lemon (Nimbu) Juice:</strong> Natural Vitamin C aur bioflavonoids jo liver Phase-1 detox pathway ko stimulate karte hain.</li>
    <li><strong>3. 1/4 Tsp Haldi (Turmeric) with Black Pepper:</strong> Curcumin liver ki acute alcohol-induced inflammation ko 40% suppress karta hai.</li>
  </ul>
</div>
`
  },

  // 5. WOMEN'S HEALTH (PCOS & Hormones): Medical Myth-Buster
  {
    id: 'gt-diverse-pcos-myths',
    slug: 'pcos-carbs-bandh-karo-4-dangerous-myths-indian-women',
    title: '"Carbs Bandh Karo": The 4 Dangerous PCOS Myths Indian Women Are Told (And What Endocrinologists Actually Recommend)',
    category: "Women's Health",
    categories: ["Women's Health", 'pcos-hormones'],
    subcategory: 'Hormone Balance',
    region: 'India',
    contentType: 'Clinical Guide',
    tag: 'PCOS Truth',
    date: 'Nov 19, 2026',
    publishDate: '2026-11-19T00:00:00Z',
    author: 'Dr. Radhika Sen, MBBS, DNB',
    authorRole: 'Endocrinology & Women Health Specialist',
    authorAvatar: '/images/card-pcos.png',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=1200&auto=format&fit=crop&q=80',
    readTime: '6 min read',
    excerpt: '"Roti bandh kar do, ghee chhod do, aur roz 2 ghante cardio karo" — yeh wo galat advice hai jo 80% PCOS diagnose hui Indian ladkiyon ko di jaati hai. Janein endocrinology is par kya kehti hai.',
    status: 'Published',
    featured: true,
    trending: true,
    placement: 'top3',
    keywords: 'pcos diet myths india, carbs in pcos insulin resistance, ghee safe in pcos, seed cycling truth endocrinology',
    focusKeyword: 'pcos carbs bandh karo 4 dangerous myths indian women',
    metaTitle: 'PCOS Carbs Bandh Karo: 4 Dangerous Myths Debunked | GudTree',
    metaDescription: 'PCOS me carbs bandh karna kyu Cortisol aur hair fall badha deta hai? Dr. Radhika Sen ke scientific endocrinology facts aur clean swaps.',
    paragraphs: [
      'Jab kisi 22 saal ki ladki ko PCOS diagnose hota hai, to sabse pehle use society aur internet se daraya jata hai.',
      'Par kya aapko pata hai ki extreme carb restriction aapke stress hormone Cortisol ko 40% badha deta hai, jisse period cycle aur irregular ho jata hai?',
      'Aaiye dekhte hain wo 4 myths jinhone lakho Indian women ki hormonal health ko nuksan pahunchaya hai.'
    ],
    sections: [],
    content: `
<p class="text-[14px] leading-relaxed text-slate-700 my-2">
  Instagram reels aur generic gym trainers aksar PCOS ko sirf "weight loss" ki bimari samajhte hain. Lekin PCOS ek <strong>Endocrine (Hormonal) & Metabolic condition</strong> hai, jise starve karke nahi balki cell-level nutrition de kar theek kiya jata hai.
</p>

<!-- Myth 1 -->
<div class="my-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
  <div class="flex items-center gap-2 text-red-600 font-extrabold text-xs uppercase mb-1">
    <span>❌ MYTH #1:</span> "PCOS Me Carbs Khana Bandh Kar Do"
  </div>
  <div class="text-xs text-slate-700 leading-relaxed pl-4 border-l-2 border-red-500">
    <strong class="text-slate-900 block mb-1">🩺 MEDICAL REALITY:</strong>
    Jab aap carbs zero kar dete hain, to aapki thyroid gland (T3 conversion) slow ho jaati hai aur Adrenal glands <strong>Cortisol (Stress Hormone)</strong> pump karti hain. Cortisol badhne se hair fall aur stubborn belly fat badhta hai. Solution zero-carb nahi, balki <strong>Complex Low-GI Carbs</strong> (jaise Ragi, Jowar, Bhuna Chana) hain.
  </div>
</div>

<!-- Myth 2 -->
<div class="my-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
  <div class="flex items-center gap-2 text-red-600 font-extrabold text-xs uppercase mb-1">
    <span>❌ MYTH #2:</span> "Ghee Aur Fats Se Wazan Aur Pimple Badhenge"
  </div>
  <div class="text-xs text-slate-700 leading-relaxed pl-4 border-l-2 border-red-500">
    <strong class="text-slate-900 block mb-1">🩺 MEDICAL REALITY:</strong>
    Aapke female sex hormones (Estrogen aur Progesterone) <strong>Healthy Fats aur Cholesterol</strong> se bante hain! Agar aap tel-ghee bilkul band kar dengi, to body hormones bana hi nahi payegi. Factory refined vegetable oil (Palm/Soy) nuksan karta hai, lekin <strong>1-2 chammach Pure A2 Desi Ghee</strong> intestine ko heal karta hai.
  </div>
</div>

<h2>The 4 Indian Kitchen Foods That Sensitize Insulin</h2>
<ol class="list-decimal pl-5 space-y-2 text-xs text-slate-700 my-3 font-medium">
  <li><strong>Dalchini (Ceylon Cinnamon):</strong> Roz subah 1/4 chammach cinnamon powder paani me lene se insulin receptors tezi se glucose absorb karte hain.</li>
  <li><strong>Methi Dana (Fenugreek Water):</strong> Raat ko bhigoya hua methi paani subah peene se ovarian cysts me insulin load kam hota hai.</li>
  <li><strong>Spearmint Tea:</strong> Sham ko ek cup spearmint tea extra male androgen hormones ko suppress karke facial hair aur chin acne rokti hai.</li>
  <li><strong>Roasted Pumpkin Seeds:</strong> Natural Zinc ka sabse bada source jo progesterone ko naturally boost karta hai.</li>
</ol>
`
  },

  // 6. GUT HEALTH (Gut & Bloat): Diagnostic Elimination
  {
    id: 'gt-diverse-gut-bloat',
    slug: 'post-lunch-bloat-brain-fog-hidden-emulsifiers-audit',
    title: 'Post-Lunch Bloat & Brain Fog: Is It Gluten, Milk, or the Hidden Emulsifiers in Your Packaged Roti?',
    category: 'Gut & Bloat',
    categories: ['Gut & Bloat', 'gut-health'],
    subcategory: 'Bloat Busters',
    region: 'India',
    contentType: 'Diagnostic Protocol',
    tag: 'Gut Healing',
    date: 'Nov 19, 2026',
    publishDate: '2026-11-19T00:00:00Z',
    author: 'Dr. Tarun Nambiar & GudTree Microbiome Desk',
    authorRole: 'Gastroenterologist & Microbiome Researcher',
    authorAvatar: '/images/card-gut.png',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&auto=format&fit=crop&q=80',
    readTime: '5 min read',
    excerpt: 'Dopahar ke lunch ke theek 30 minute baad pet gas cylinder ki tarah fool jana aur dimaag par bhaari dhuandhaar aana (brain fog) koi normal baat nahi hai. Padiye kaise commercial packaged foods aapki gut mucus lining ko dissolve kar rahe hain.',
    status: 'Published',
    featured: true,
    trending: true,
    placement: 'top3',
    keywords: 'post lunch bloat cure india, why do i feel bloated after lunch, gut emulsifiers ins 471 leaky gut, traditional curd jeera reset',
    focusKeyword: 'post lunch bloat brain fog hidden emulsifiers audit',
    metaTitle: 'Post-Lunch Bloat & Brain Fog: The Emulsifier Trap | GudTree',
    metaDescription: 'Lunch ke baad pet kyu foolta hai? Commercial sauces aur breads ke emulsifiers (INS 471) gut lining ko kaise irritate karte hain aur 7-day desi reset.',
    paragraphs: [
      'Aapne ghar se daal-chawal ya office canteen se saaf lunch khaya. Lekin 2 baje meeting me baithte hi lagta hai jaise pet me kisi ne football fit kar di ho.',
      'Aksar log turant khud ko "Gluten Intolerant" ya "Lactose Intolerant" label kar dete hain.',
      'Par asli culprit aksar gluten nahi, balki un packaged foods aur dips me maujood artificial emulsifiers aur stabilizers hote hain jo hamari intestine ke protective mucus barrier ko strip kar dete hain.'
    ],
    sections: [],
    content: `
<div class="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 my-4 text-[#102A56]">
  <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-amber-600 text-white mb-2">🔬 MICROBIOME SCIENCE</span>
  <h3 class="text-[17px] font-bold text-[#102A56] mb-1">The Detergent Effect of Food Emulsifiers</h3>
  <p class="text-[13px] leading-relaxed text-slate-700">
    Commercial packaged snacks, store-bought salad dressings, aur mayonnaise me <strong>Polysorbate 80, INS 471, aur Carrageenan</strong> daale jaate hain taaki oil aur water alag na hon. Nature me yeh chemicals detergents ki tarah kaam karte hain: yeh aapki gut lining ke bacteria-protective mucus ko pighla dete hain, jisse systemic inflammation aur instant bloating hoti hai.
  </p>
</div>

<h2>The 7-Day Indian Kitchen Gut Reset</h2>
<div class="my-4 p-4 rounded-xl bg-white border border-slate-200">
  <ul class="text-xs space-y-2 text-slate-700">
    <li><strong>1. Bhuna Jeera + Kala Namak Chaas:</strong> Lunch ke 15 minute baad 1 glass taaza chach jisme bhuna hua jeera powder ho. Jeera me Thymol hota hai jo digestive enzymes ko stimulate karta hai.</li>
    <li><strong>2. Saunf & Mishri After Food:</strong> Khane ke baad 1/2 chammach moti green saunf chabayein. Saunf me Anethole oil hota hai jo intestinal gas spasms ko relax karta hai.</li>
    <li><strong>3. Warm Water Only:</strong> Khana khane ke doran chilled fridge ka paani peena bilkul bandh karein. Chilled paani digestive fire (Jatharagni) ko douse kar deta hai.</li>
  </ul>
</div>
`
  },

  // 7. PACKET TRUTH (Label Audits): Investigative Scam Expose
  {
    id: 'gt-diverse-makhana-scam',
    slug: 'great-makhana-scam-palm-oil-cheese-flavour-audit',
    title: 'The Great Makhana Scam: Why Your ₹180 "Cheese & Herb" Packet Has Only 2% Herbs & 28% Palm Oil',
    category: 'Packet Truth',
    categories: ['Packet Truth', 'label-audits'],
    subcategory: 'Chips & Namkeen',
    region: 'India',
    contentType: 'Audit',
    tag: 'Scam Investigation',
    date: 'Nov 19, 2026',
    publishDate: '2026-11-19T00:00:00Z',
    author: 'Kabir Mehta & GudTree Lab Desk',
    authorRole: 'Investigative Food Journalist',
    authorAvatar: '/images/card-diabetes.png',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=1200&auto=format&fit=crop&q=80',
    readTime: '5 min read',
    excerpt: 'Aap ₹180 ka "Artisanal Cheese Makhana" khareedte hain yeh soch kar ki yeh superfood hai. Par jab humne barcode ko lab me test kiya, to 28% sasta palm oil aur chemical seasoning dust nikli. Padiye pura expose.',
    status: 'Published',
    featured: true,
    trending: true,
    placement: 'top3',
    keywords: 'makhana scam india, flavored makhana palm oil truth, cheese herb makhana ingredients, healthy snack expose, gudtree audits',
    focusKeyword: 'flavored makhana scam palm oil audit',
    metaTitle: 'The Great Makhana Scam: Why ₹180 Packets Are 28% Palm Oil | GudTree',
    metaDescription: 'Front par Foxnut Superfood aur peeche 28% Palm Oil aur MSG? Padiye GudTree ka investigative expose flavored makhana packets par.',
    paragraphs: [
      'Blinkit ya Zepto par "Roasted Makhana - Cheese & Herbs" ka 70g packet lagbhag ₹175 se ₹210 me bikta hai.',
      'Front label par aisi packaging hoti hai jaise seedhe Bihar ke kisan se organic lake se nikaal kar pack kiya gaya ho.',
      'Par humne jab 4 leading brands ke packets ka ingredient analysis kiya, to pata chala ki makhana sirf ek carrier hai — asli product sasta palm oil spray aur synthetic seasoning hai.'
    ],
    sections: [],
    content: `
<div class="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 my-4 text-[#102A56]">
  <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-amber-500 text-white mb-2">🔍 INVESTIGATIVE REPORT</span>
  <h3 class="text-[17px] font-bold text-[#102A56] mb-1">Receipts & Raw Economics: ₹180 Ka Packet Banta Kitne Me Hai?</h3>
  <p class="text-[13px] leading-relaxed text-slate-700">
    Raw Phool Makhana wholesale me lagbhag ₹650/kg milta hai. Ek 70g packet me raw makhana ki keemat sirf <strong>₹16 se ₹18</strong> hoti hai. Bacha hua ₹160 kis cheez ka hai? Palmolein oil spray, synthetic cheese dust, fancy matte-finish pouch, aur quick-commerce listing fee!
  </p>
</div>

<h2>The "Flavour Dust" Secret: Cheeni Aur Tel Chipkane Ka Formula</h2>
<p class="text-xs text-slate-700 leading-relaxed my-2">
  Kisan ke khet se nikla raw makhana porous hota hai. Factory me commercial brands makhana ko rotating drum me daal kar uske upar <strong>reheated Refined Palmolein Oil</strong> spray karte hain taaki <strong>Synthetic Seasoning Dust (35% Maltodextrin + Cheese Flavour INS 627, 631)</strong> chipak sake.
</p>

<h2>How to Roast 100% Clean Ghee Makhana at Home in 5 Minutes</h2>
<div class="my-4 p-4 rounded-xl bg-white border border-slate-200">
  <ol class="list-decimal pl-5 space-y-2 text-xs text-slate-700 font-medium">
    <li>Kadhai me 1 chammach pure A2 Desi Ghee garam karein.</li>
    <li>1 bada katora phool makhana daalein aur low flame par 4-5 minute slow roast karein jab tak finger se dabane par crisp crush na ho.</li>
    <li>Gas bandh karein, chammach se 1 pinch sendha namak, kali mirch powder, aur thoda chaat masala chhidkein.</li>
  </ol>
</div>
`
  },

  // 8. LOW SUGAR (Diabetes & Low GI): CGM Real-Time Test
  {
    id: 'gt-diverse-digestive-biscuit',
    slug: 'sugar-free-digestive-biscuit-audit-cgm-blood-sugar-spike',
    title: 'The "Sugar-Free" Digestive Biscuit Audit: How 1 "Healthy" Cookie Spikes Blood Sugar Faster Than Gulab Jamun',
    category: 'Low Sugar',
    categories: ['Low Sugar', 'diabetes-low-gi'],
    subcategory: 'Fibre & Crunch',
    region: 'India',
    contentType: 'CGM Real Test',
    tag: 'Blood Sugar Audit',
    date: 'Nov 19, 2026',
    publishDate: '2026-11-19T00:00:00Z',
    author: 'Dr. Sameer Pathak, Diabetologist',
    authorRole: 'Clinical Diabetologist & Metabolic Researcher',
    authorAvatar: '/images/card-diabetes.png',
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=1200&auto=format&fit=crop&q=80',
    readTime: '5 min read',
    excerpt: 'Agar aapke ghar me kisi ko diabetes ya pre-diabetes hai, to unke chai ke sath "Digestive" ya "Sugar-Free" biscuit zaroor hoga. Humne Continuous Glucose Monitor (CGM) sensor lagakar in biscuits ka live spike test kiya.',
    status: 'Published',
    featured: true,
    trending: true,
    placement: 'top3',
    keywords: 'digestive biscuit diabetes truth india, sugar free biscuits spike glucose cgm, maltitol in diabetic biscuits, clean low gi snacks india',
    focusKeyword: 'sugar free digestive biscuit audit cgm blood sugar spike',
    metaTitle: 'Sugar-Free Digestive Biscuit Audit: CGM Spike Test | GudTree',
    metaDescription: 'Humne CGM sensor lagakar commercial Digestive Biscuits ka blood sugar test kiya. Jaaniye kyu inme Maltitol aur Refined Wheat blood glucose spike karte hain.',
    paragraphs: [
      'Bharat me lagbhag 10 crore log diabetes aur 13 crore log pre-diabetes se jujh rahe hain.',
      'Doctor ke pass jaate hi pehli salah milti hai: "Meetha bandh karein." Aur agle din se ghar par red aur green color ke "High-Fiber Digestive Biscuits" ke pack aane lagte hain.',
      'Par jab humne ek non-diabetic aur ek pre-diabetic volunteer ko CGM (Continuous Glucose Monitor) sensor lagaya aur 2 "Sugar-Free" biscuits khilaye, to reading ne sabko hairaan kar diya.'
    ],
    sections: [],
    content: `
<div class="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 my-4 text-[#102A56]">
  <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-emerald-600 text-white mb-2">📈 CGM LIVE SENSOR TEST</span>
  <h3 class="text-[17px] font-bold text-[#102A56] mb-1">The 45-Minute Glucose Spike Graph</h3>
  <p class="text-[13px] leading-relaxed text-slate-700">
    Fasting baseline: 92 mg/dL. <br/>
    2 Digestive Biscuits khane ke 35 minute baad: <strong>148 mg/dL (a spike of 56 points!)</strong>. <br/>
    Comparison ke liye, 1 chota gulab jamun khane par spike lagbhag 48 points tha. Kyun? Kyonki commercial digestive biscuit me <strong>60% Maida + Liquid Inverted Sugar Syrup + Maltitol</strong> hota hai jo bina kisi intact cellular matrix ke sidha blood me absorb ho jata hai!
  </p>
</div>

<h2>What to Eat With Evening Chai Instead (Real Zero-Spike Crunch)</h2>
<div class="my-4 p-4 rounded-xl bg-white border border-slate-200">
  <ul class="text-xs space-y-2 text-slate-700">
    <li><strong>1. Bhuna Kala Chana (Roasted Bengal Gram):</strong> GI sirf 28. Iska intact outer skin seed coat glucose absorption ko 3x slow down kar deta hai.</li>
    <li><strong>2. Roasted Almonds & Walnuts:</strong> Zero sugar spike, rich in Magnesium jo cell ke insulin receptors ko unlock karta hai.</li>
    <li><strong>3. Methi & Flaxseed Khakhra:</strong> 100% whole wheat with crushed roasted fenugreek leaves.</li>
  </ul>
</div>
`
  },

  // 9. CLEAN PANTRY (Fasting Munch / Desi Pantry): Historical Food Truth
  {
    id: 'gt-diverse-pantry-oil',
    slug: 'refined-sunflower-oil-vs-kachi-ghani-mustard-oil-history-audit',
    title: 'Refined Sunflower Oil vs Kachi Ghani Mustard Oil: The 1990s Heart Disease Marketing Lie Finally Debunked',
    category: 'Clean Pantry',
    categories: ['Clean Pantry', 'desi-pantry'],
    subcategory: 'Cold-Pressed Oils',
    region: 'India',
    contentType: 'Historical Food Expose',
    tag: 'Pantry Purity',
    date: 'Nov 19, 2026',
    publishDate: '2026-11-19T00:00:00Z',
    author: 'Sunil Rao & GudTree Food Heritage Desk',
    authorRole: 'Food Historian & Traditional Nutritionist',
    authorAvatar: '/images/card-heart.png',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&auto=format&fit=crop&q=80',
    readTime: '6 min read',
    excerpt: '1990 ke dashak me TV par ads aate the ki Desi Ghee aur Sarson ka tel dil ke dushman hain, aur factory-made crystal clear Refined Sunflower Oil "Heart Friendly" hai. 30 saal baad cardiologists kya bol rahe hain? Padiye asli sach.',
    status: 'Published',
    featured: true,
    trending: true,
    placement: 'top3',
    keywords: 'refined oil vs cold pressed mustard oil india, kachi ghani sarson oil benefits, why refined oils cause inflammation, hexane extraction edible oil',
    focusKeyword: 'refined sunflower oil vs kachi ghani mustard oil history audit',
    metaTitle: 'Refined Oil vs Kachi Ghani Mustard Oil: 1990s Lie Debunked | GudTree',
    metaDescription: '1990s ke TV commercials ne kaise traditional kachi ghani sarson aur ghee ko villain banaya aur refined solvent-extracted oils ko dil ke liye becha. Scientific truth.',
    paragraphs: [
      'Agar aap 1980s ke Indian kitchens ko yaad karein, to North India me Sarson ka tel (Mustard oil), South me Nariyal aur Til ka tel (Coconut & Sesame), aur West me Moongfali ka tel (Groundnut) istemaal hota tha.',
      'Lekin 1990s me achanak TV par white coat pehne actors aane lage jo bolte the ki desi tel heavy hain aur blood vessels block karte hain.',
      'Unhone hume sikhaya ki transparent, odorless, chemically bleached "Refined Vegetable Oil" hi modern health hai. Par yeh tel factory me banta kaise hai?'
    ],
    sections: [],
    content: `
<div class="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 my-4 text-[#102A56]">
  <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-amber-600 text-white mb-2">🏭 THE INDUSTRIAL SOLVENT PROCESS</span>
  <h3 class="text-[17px] font-bold text-[#102A56] mb-1">How Refined Oil Is Actually Made</h3>
  <p class="text-[13px] leading-relaxed text-slate-700">
    Beedjo se tel nikaalne ke liye unhe 200°C par heat kiya jata hai, fir petroleum byproduct <strong>Hexane Solvent</strong> se har aakhri boond nichodi jaati hai. Iske baad uski badboo nikalne ke liye <strong>Phosphoric Acid aur Caustic Soda (Sodium Hydroxide)</strong> se neutralize aur bleach kiya jata hai. Jo bottle aapke ghar aati hai, wo dead lipid hoti hai jisme natural antioxidants aur Vitamin E khatam ho chuke hote hain.
  </p>
</div>

<h2>Why Kachi Ghani (Cold-Pressed) Oils Win in Indian Cooking</h2>
<div class="my-4 p-4 rounded-xl bg-white border border-slate-200">
  <ul class="text-xs space-y-2 text-slate-700">
    <li><strong>1. Real Smoke Point for Indian Tarka:</strong> Traditional Kachi Ghani Mustard oil ka smoke point ~250°C hota hai — jo Indian tadka aur deep frying ke high heat par break nahi hota.</li>
    <li><strong>2. Natural Allyl Isothiocyanate:</strong> Sarson ke tel ki teekhi khushboo natural antimicrobial aur gut-stimulating compound se aati hai jo food safety protect karti hai.</li>
    <li><strong>3. Perfect Omega-3 to Omega-6 Balance:</strong> Sarson aur A2 Ghee me inflammatory Omega-6 bohot kam hota hai, jabki refined sunflower oil me 70% inflammatory Omega-6 hota hai.</li>
  </ul>
</div>
`
  }
];

// DIVERSE UNSPLASH FOOD IMAGES LIBRARY (Category & Theme Specific, NEVER Repeated)
const curatedImagesPool = {
  'kids-tiffin': [
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1200&q=80',
    'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=1200&q=80',
    'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=1200&q=80',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80',
    'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=1200&q=80',
    'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=1200&q=80',
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1200&q=80',
    'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=1200&q=80',
  ],
  'clean-snacks': [
    'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=1200&q=80',
    'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=1200&q=80',
    'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=1200&q=80',
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
    'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=1200&q=80',
    'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=1200&q=80',
    'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=1200&q=80',
  ],
  'weight-protein': [
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&q=80',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80',
    'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1200&q=80',
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&q=80',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&q=80',
    'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?w=1200&q=80',
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=1200&q=80',
    'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1200&q=80',
  ],
  'heart-liver-care': [
    'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=1200&q=80',
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=1200&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&q=80',
    'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=1200&q=80',
    'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=1200&q=80',
    'https://images.unsplash.com/photo-1556881286-fc6915169721?w=1200&q=80',
  ],
  'pcos-hormones': [
    'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=1200&q=80',
    'https://images.unsplash.com/photo-1588767763768-4500908861d8?w=1200&q=80',
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&q=80',
    'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1200&q=80',
    'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=1200&q=80',
    'https://images.unsplash.com/photo-1516824711718-9c1e683412ac?w=1200&q=80',
  ],
  'gut-health': [
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=80',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80',
    'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=1200&q=80',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&q=80',
    'https://images.unsplash.com/photo-1576402187878-974f70c890a5?w=1200&q=80',
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80',
  ],
  'label-audits': [
    'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=1200&q=80',
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80',
    'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1200&q=80',
    'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1200&q=80',
    'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1200&q=80',
  ],
  'diabetes-low-gi': [
    'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=1200&q=80',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80',
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&q=80',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&q=80',
    'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=1200&q=80',
  ],
  'desi-pantry': [
    'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80',
    'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=1200&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80',
    'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1200&q=80',
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&q=80',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&q=80',
  ],
};

// Filter out old flagship slugs
const flagshipSlugs = new Set(flagshipArticles.map(a => a.slug));
const oldWithoutFlagships = articles.filter(a => !flagshipSlugs.has(a.slug));

// Combine
const combinedArticles = [...flagshipArticles, ...oldWithoutFlagships];

// Now update every single article so it has a UNIQUE photo from its category pool
const categoryCounters = {};
combinedArticles.forEach((art) => {
  const cat = (art.categories && art.categories[1]) || (art.category && art.category.toLowerCase().replace(/[^a-z0-9]/g, '-')) || 'clean-snacks';
  const poolKey = Object.keys(curatedImagesPool).find(k => cat.includes(k) || (art.categories||[]).some(c => c.includes(k))) || 'clean-snacks';
  const pool = curatedImagesPool[poolKey] || curatedImagesPool['clean-snacks'];
  
  if (!categoryCounters[poolKey]) categoryCounters[poolKey] = 0;
  
  // If the article is already one of our bespoke flagship articles, keep its intended image
  if (!flagshipSlugs.has(art.slug)) {
    const chosenIndex = categoryCounters[poolKey] % pool.length;
    art.image = pool[chosenIndex];
    categoryCounters[poolKey]++;
  }
});

fs.writeFileSync(articlesFilePath, JSON.stringify(combinedArticles, null, 2), 'utf-8');
console.log(`Successfully updated all articles! Total articles: ${combinedArticles.length}`);
console.log(`Flagship articles placed on top across all 9 categories.`);
