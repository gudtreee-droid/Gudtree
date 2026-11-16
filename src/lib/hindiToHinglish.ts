/**
 * Clean phonetic Devanagari -> Natural Conversational Hinglish transliterator
 * Preserves HTML tags intact and maps common nutrition/Indian kitchen loanwords
 * naturally instead of literal awkward consonant strings.
 */

const VOWELS: Record<string, string> = {
  'अ': 'a',
  'आ': 'aa',
  'इ': 'i',
  'ई': 'ee',
  'उ': 'u',
  'ऊ': 'oo',
  'ऋ': 'ri',
  'ए': 'e',
  'ऐ': 'ai',
  'ओ': 'o',
  'औ': 'au',
  'अं': 'an',
  'अः': 'ah',
  'ऑ': 'o',
};

const MATRAS: Record<string, string> = {
  'ा': 'a',
  'ि': 'i',
  'ी': 'ee',
  'ु': 'u',
  'ू': 'oo',
  'ृ': 'ri',
  'े': 'e',
  'ै': 'ai',
  'ो': 'o',
  'ौ': 'au',
  'ॉ': 'o',
  'ॅ': 'e',
};

const CONSONANTS: Record<string, string> = {
  'क': 'k',
  'ख': 'kh',
  'ग': 'g',
  'घ': 'gh',
  'ङ': 'n',
  'च': 'ch',
  'छ': 'chh',
  'ज': 'j',
  'झ': 'jh',
  'ञ': 'ny',
  'ट': 't',
  'ठ': 'th',
  'ड': 'd',
  'ढ': 'dh',
  'ण': 'n',
  'त': 't',
  'थ': 'th',
  'द': 'd',
  'ध': 'dh',
  'न': 'n',
  'प': 'p',
  'फ': 'ph',
  'ब': 'b',
  'भ': 'bh',
  'म': 'm',
  'य': 'y',
  'र': 'r',
  'ल': 'l',
  'व': 'v',
  'श': 'sh',
  'ष': 'sh',
  'स': 's',
  'ह': 'h',
  'क़': 'q',
  'ख़': 'kh',
  'ग़': 'gh',
  'ज़': 'z',
  'ड़': 'r',
  'ढ़': 'rh',
  'फ़': 'f',
  'य़': 'y',
  'ळ': 'l',
};

const DIGITS: Record<string, string> = {
  '०': '0',
  '१': '1',
  '२': '2',
  '३': '3',
  '४': '4',
  '५': '5',
  '६': '6',
  '७': '7',
  '८': '8',
  '९': '9',
};

// Direct high-frequency Devanagari -> natural Hinglish vocabulary map
const DEVANAGARI_DIRECT_WORDS: Record<string, string> = {
  'हैं': 'hain',
  'है': 'hai',
  'में': 'mein',
  'की': 'ki',
  'के': 'ke',
  'का': 'ka',
  'नहीं': 'nahi',
  'क्यों': 'kyon',
  'मैं': 'main',
  'हूँ': 'hoon',
  'हूं': 'hoon',
  'कोल्ड': 'cold',
  'प्रेस्ड': 'pressed',
  'फॉक्सनट': 'foxnuts',
  'पाउच': 'pouch',
  'करते': 'karte',
  'करती': 'karti',
  'करता': 'karta',
  'रखती': 'rakhti',
  'रखता': 'rakhta',
  'मिलती': 'milti',
  'होती': 'hoti',
  'होते': 'hote',
  'सकते': 'sakte',
  'सकती': 'sakti',
  'मखाना': 'makhana',
  'चना': 'chana',
  'मैदा': 'maida',
  'चाय': 'chai',
  'नाश्ता': 'snack',
  'नाश्ते': 'snacks',
  'स्नैक': 'snack',
  'स्नैक्स': 'snacks',
  'फाइबर': 'fiber',
  'प्रोटीन': 'protein',
  'शुगर': 'sugar',
  'चीनी': 'sugar',
  'शर्करा': 'sugar',
  'रक्त': 'blood',
  'ग्लूकोज': 'glucose',
  'कैलोरी': 'calories',
  'कैलोरीज': 'calories',
  'कार्ब्स': 'carbs',
  'कार्बोहाइड्रेट': 'carbohydrates',
  'ओमेगा': 'omega',
  'विटामिन': 'vitamin',
  'मैग्नीशियम': 'magnesium',
  'कोलेस्ट्रॉल': 'cholesterol',
  'लिवर': 'liver',
  'हृदय': 'heart',
  'दिल': 'heart',
  'पाचन': 'digestion',
  'आंत': 'gut',
  'आंतों': 'gut',
  'माइक्रोबायोम': 'microbiome',
  'सूजन': 'inflammation',
  'मधुमेह': 'diabetes',
  'डायबिटीज': 'diabetes',
  'वजन': 'weight',
  'तेल': 'oil',
  'ऑयल': 'oil',
  'घी': 'ghee',
  'नमक': 'salt',
  'गुड़': 'jaggery (gud)',
  'दही': 'dahi',
  'छाछ': 'chaas',
  'सत्तू': 'sattu',
  'कांजी': 'kanji',
  'रागी': 'ragi',
  'ज्वार': 'jowar',
  'बाजरा': 'bajra',
  'बाजरा/मिलेट': 'millet',
  'बाजरे': 'bajra',
  'चिया': 'chia',
  'सब्जा': 'sabja',
  'बादाम': 'almonds',
  'अखरोट': 'walnuts',
  'अलसी': 'flaxseeds',
  'तिल': 'sesame',
  'चिक्की': 'chikki',
  'खजूर': 'dates',
  'केला': 'banana',
  'मूंगफली': 'peanuts',
  'पनीर': 'paneer',
  'दाल': 'dal',
  'मसाले': 'spices',
  'हल्दी': 'turmeric',
  'जीरा': 'jeera',
  'अमचूर': 'amchur',
  'काली': 'kali',
  'मिर्च': 'mirch',
  'दालचीनी': 'cinnamon',
  'बिस्कुट': 'biscuits',
  'चिप्स': 'chips',
  'पैकेट': 'packet',
  'लेबल': 'label',
  'सामग्री': 'ingredients',
  'पोषण': 'nutrition',
  'आहार': 'diet',
  'भोजन': 'food',
  'स्वास्थ्य': 'health',
  'स्वस्थ': 'healthy',
  'दैनिक': 'daily',
  'शाम': 'evening',
  'सुबह': 'morning',
  'भारतीय': 'Indian',
  'भारत': 'India',
  'शून्य': 'zero',
  'जीरो': 'zero',
  'ज़्यादा': 'zyada',
  'ज्यादा': 'zyada',
  'हमेशा': 'hamesha',
  'आसान': 'aasaan',
  'बेहतर': 'behtar',
  'फायदे': 'fayde',
  'फायदा': 'fayda',
  'नुकसान': 'nuksan',
  'सही': 'sahi',
  'गलत': 'galat',
  'ध्यान': 'dhyan',
  'सलाह': 'advice',
  'डॉक्टर': 'doctor',
  'पोषण विशेषज्ञ': 'nutritionist',
  'अनाज': 'grains',
  'अंकुरित': 'sprouted',
  'भूना': 'bhuna',
  'भुना': 'bhuna',
  'तला': 'fried',
  'ताजा': 'fresh',
  'ताज़ा': 'fresh',
  'प्रोबायोटिक': 'probiotic',
  'प्रीबायोटिक': 'prebiotic',
  'एंटीऑक्सीडेंट': 'antioxidant',
  'इंसुलिन': 'insulin',
  'ऊर्जा': 'energy',
  'ताकत': 'energy',
  'संतुलित': 'balanced',
  'स्थिर': 'steady',
  'नियमित': 'regular',
  'प्राकृतिक': 'natural',
  'कृत्रिम': 'artificial',
  'रिफाइंड': 'refined',
  'कोल्ड-प्रेस्ड': 'cold-pressed',
  'ग्लोबल': 'global',
  'सुपरमार्केट': 'supermarket',
  'परिवार': 'family',
  'रसोई': 'kitchen',
  'दादी': 'dadi',
  'नियम': 'rule',
};

const ROMAN_FIXES: Record<string, string> = {
  men: 'mein',
  nahin: 'nahi',
  naheen: 'nahi',
  kyonki: 'kyunki',
  bhee: 'bhi',
  yeh: 'ye',
  yah: 'ye',
  vah: 'wo',
  woh: 'wo',
  sabh: 'sab',
  sabhee: 'sabhi',
  tatha: 'aur',
  evam: 'aur',
  athva: 'ya',
  krispee: 'crispy',
  krispy: 'crispy',
  jeero: 'zero',
  zeero: 'zero',
  rosted: 'roasted',
  roasteda: 'roasted',
  phet: 'fat',
  paam: 'palm',
  maidaa: 'maida',
  maide: 'maida',
  maaltodekstrin: 'maltodextrin',
  maltodekstrin: 'maltodextrin',
};

function convertDevanagariWord(word: string): string {
  const cleanWord = word.replace(/^[़]+|[़]+$/g, '');
  if (DEVANAGARI_DIRECT_WORDS[cleanWord]) {
    return DEVANAGARI_DIRECT_WORDS[cleanWord];
  }

  const chars = Array.from(cleanWord);
  let out = '';
  let i = 0;

  while (i < chars.length) {
    const ch = chars[i];
    const next = chars[i + 1];

    if (DIGITS[ch]) {
      out += DIGITS[ch];
      i++;
      continue;
    }

    if (ch === '।') {
      out += '.';
      i++;
      continue;
    }

    if (ch === 'ं' || ch === 'ँ') {
      const lookahead = chars[i + 1];
      out += lookahead && 'पफबभम'.includes(lookahead) ? 'm' : 'n';
      i++;
      continue;
    }

    if (ch === 'ः') {
      out += 'h';
      i++;
      continue;
    }

    if (VOWELS[ch]) {
      out += VOWELS[ch];
      i++;
      continue;
    }

    let consKey = ch;
    let step = 1;
    if (next === '\u093c' && CONSONANTS[ch + '\u093c']) {
      consKey = ch + '\u093c';
      step = 2;
    }

    const baseCons = CONSONANTS[consKey];
    if (baseCons) {
      const after = chars[i + step];
      if (after === '्') {
        out += baseCons;
        i += step + 1;
        continue;
      }
      if (after && MATRAS[after]) {
        out += baseCons + MATRAS[after];
        i += step + 1;
        continue;
      }

      const isAtEnd =
        i + step >= chars.length ||
        chars[i + step] === 'ं' ||
        chars[i + step] === 'ँ';
      if (isAtEnd && out.length > 0 && chars[i - 1] !== '्') {
        out += baseCons;
      } else {
        out += baseCons + 'a';
      }
      i += step;
      continue;
    }

    out += ch;
    i++;
  }

  const lower = out.toLowerCase();
  if (ROMAN_FIXES[lower]) {
    return ROMAN_FIXES[lower];
  }
  return out;
}

/**
 * Translates plain text or HTML safely without touching any HTML tag or attribute!
 */
export function devanagariToHinglish(input: string): string {
  if (!input) return '';
  const segments = input.split(/(<[^>]+>)/g);
  const transformed = segments.map((seg) => {
    if (!seg || (seg.startsWith('<') && seg.endsWith('>'))) {
      return seg;
    }
    const romanized = seg.replace(/[\u0900-\u097F]+/g, (word) =>
      convertDevanagariWord(word)
    );
    // Clean common joined phrasing in converted Hinglish
    return romanized
      .replace(/\s+\./g, '.')
      .replace(/(^|[.!?]\s+)([a-z])/g, (m, p, c) => p + c.toUpperCase());
  });

  // Ensure initial character of headline or block text is capitalized cleanly
  return transformed
    .join('')
    .replace(/^(<[a-z0-9]+[^>]*>\s*)([a-z])/i, (_, p, c) => p + c.toUpperCase())
    .replace(/^([a-z])/, (_, c) => c.toUpperCase());
}
