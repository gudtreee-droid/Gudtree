import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      action = 'generate-draft', // 'generate-draft' | 'continue-writing' | 'polish' | 'key-takeaways' | 'generate-sections'
      title = '',
      category = 'Clean Snacks',
      existingContent = '',
      customPrompt = '',
    } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    // Clean plain text from existing HTML content
    const cleanExisting = existingContent.replace(/<[^>]*>?/gm, ' ').trim();

    // Fallback Generator
    const generateSmartFallback = () => {
      const topic = title.trim() || 'Clean Indian Snacking & Honest Food Label Swaps';
      
      if (action === 'key-takeaways') {
        return `<blockquote><strong>GudTree Clean Nutrition Takeaways:</strong><ul><li><strong>Hidden Additives Check:</strong> Many packaged snacks market themselves as 'healthy' while packing up to 30% palm oil and hidden maltodextrin.</li><li><strong>Zero Blood Sugar Spikes:</strong> Swapping ultra-processed snacks for roasted makhana, chana, or sprouted millets stabilizes 4 PM energy slumps.</li><li><strong>The Clean Swap Rule:</strong> If an ingredient list has words you wouldn't keep in your home kitchen, leave the packet on the shelf.</li></ul></blockquote>`;
      }

      if (action === 'continue-writing') {
        return `<p>When analyzing packet labels, always compare total dietary fiber against added sugars and saturated fats. In traditional Indian kitchens, wholesome ingredients like roasted chana, sattu, and cold-pressed mustard or coconut oils provided clean, sustained satiety without spiking triglycerides.</p><p>By prioritizing whole-grain swaps and eliminating industrial palm oils, families can safeguard daily metabolic health without sacrificing taste or crunch.</p>`;
      }

      if (action === 'polish') {
        return `<p>${cleanExisting || `${topic} represents an honest shift toward transparent food choices, helping Indian families ditch misleading marketing and embrace clean, wholesome eating.`}</p>`;
      }

      // Default: Full editorial story draft
      return `<h2>The Reality Behind the Packet Label</h2><p>Walk down any supermarket snack aisle in India, and almost every colourful wrapper screams 'high fiber', 'roasted', or 'diet friendly'. Yet, turning the packet over reveals the uncomfortable truth about <strong>${topic}</strong>: cheap palm olein, hidden maltodextrin, and artificial flavor enhancers (INS codes) engineered to keep you reaching for more.</p><blockquote>"Real health food doesn't need six chemical additives to taste good. If your snack contains industrial palm oil and liquid glucose, it is ultra-processed junk disguised in clean packaging."</blockquote><h2>Decoding the Fine Print: What Big Brands Hide</h2><p>Most commercial brands replace wholesome ingredients with cheap industrial fillers to extend shelf life and maximize profit margins. Palm oil is loaded with saturated fats that trigger sluggish afternoon fatigue, while refined flours (maida) spike blood sugar and trigger vicious hunger cycles within 45 minutes.</p><p>For children's school lunchboxes and office desks alike, these hidden additives quietly erode metabolic health, promote belly bloating, and disrupt natural gut microbiomes.</p><h2>The Honest Clean Swap: What to Eat Instead</h2><p>Eating clean doesn't mean eating boring. Traditional Indian superfoods like slow-roasted makhana (foxnuts), roasted black chana, and unpolished millets (ragi, jowar) offer superior crunch with zero palm oil. Pair them with real palm jaggery (gud) or cold-pressed oils for clean, honest energy that lasts all day.</p>`;
    };

    if (!apiKey) {
      return NextResponse.json({
        success: true,
        content: generateSmartFallback(),
        source: 'local_engine',
      });
    }

    let systemInstruction = '';

    if (action === 'generate-draft') {
      systemInstruction = `You are the chief food investigator and clinical nutrition editor for GudTree (https://www.gudtree.in — India's Clean Snacking & Food Label Audit Publication).
Write a comprehensive, search-intent-first, Google Top-10 ranking article for: "${title}".
Category: ${category}.
${customPrompt ? `Special Editor Instructions: ${customPrompt}` : ''}

STRICT COMPETITOR-BEATING SEO & E-E-A-T REQUIREMENTS:
1. Language: Write in clear, natural, authoritative Indian English (readers can translate to Hindi/Hinglish with the built-in switcher). Never write thin boilerplate.
2. Length: Aim for 1,400 to 1,800 words of genuinely useful, topic-specific data and practical guidance.
3. Structure & Format (Clean Semantic HTML: <p>, <h2>, <h3>, <table>, <ul>, <ol>, <blockquote>):
   - Direct Answer Hook: First 2 sentences must directly answer the user's core search question for Featured Snippets.
   - Key Takeaways Box: A <blockquote> summarizing 3-4 concrete data-backed takeaways.
   - 6 to 7 Search-Intent <h2> Sections tailored specifically to "${title}":
     a) Ingredient & Label Reality Check (decode palmolein, maltodextrin, INS codes, or glycemic load specific to this food)
     b) Exact Nutritional / Macro Comparison Table (<table> comparing commercial packaged versions vs clean home/brand alternatives with realistic numbers per 100g or per serving)
     c) Metabolic & Health Impact (blood sugar/insulin, gut microbiome, heart/liver, or child growth)
     d) Recommended Daily Portion, Best Timing & Side Effects / Who Should Avoid
     e) Step-by-Step Clean Indian Kitchen Swap / DIY Recipe (under 10 mins, exact quantities)
     f) Frequently Asked Questions (<h2>Frequently Asked Questions</h2> followed by 4 real question <h3> headings ending with '?' and concise 2-3 sentence <p> answers — these power FAQPage schema!)
4. Contextual Internal Links: Naturally include 3 internal HTML links inside body paragraphs using relative paths such as <a href="/focus/diabetes">diabetes & low-GI snack guide</a>, <a href="/focus/pcos">PCOS food swaps</a>, <a href="/focus/gut">gut health & bloating hub</a>, <a href="/focus/weight">budget protein hub</a>, or <a href="/category/label-audits">packaged food label audits</a> where topically relevant.
5. Output ONLY valid HTML without markdown code fences.`;
    } else if (action === 'continue-writing') {
      systemInstruction = `You are GudTree's senior nutrition editor continuing an in-depth Indian clean-eating article.
Article Title: "${title}"
Existing Draft Content:
"${cleanExisting.slice(-1500)}"

TASK:
Write 400-600 words of concrete, data-rich continuation (specific Indian gram quantities, FSSAI label checks, side effects/upper limits, or FAQ Q&As ending in '?'). Output clean HTML (<p>, <h2>, <h3>, <ul>). Do NOT repeat existing text.`;
    } else if (action === 'polish') {
      systemInstruction = `You are GudTree's senior medical & nutrition copy editor.
Upgrade the draft below into crisp, authoritative, high-E-E-A-T Indian English with clearer nutritional precision, zero fluff, and direct actionable guidance:
"${cleanExisting}"

Output clean HTML paragraphs (<p>).`;
    } else if (action === 'key-takeaways') {
      systemInstruction = `Generate a high-value "Key Nutrition Takeaways" summary box for "${title}".
Output a <blockquote> with <strong>Key Takeaways:</strong> and 4 specific bullet points (<ul><li>...) covering exact ingredient red flags, glycemic/macro numbers, recommended daily serving, and the #1 clean Indian kitchen swap.`;
    } else {
      systemInstruction = `Write a deep, 1,400+ word Indian nutrition and food label audit article for: "${title}". Output clean HTML (<p>, <h2>, <h3>, <table>, <blockquote>) in authoritative Indian English.`;
    }

    const models = [
      'gemini-2.5-flash-lite',
      'gemini-flash-lite-latest',
      'gemini-flash-latest',
      'gemini-2.5-flash',
    ];

    let rawResponseText = '';

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: systemInstruction }],
                },
              ],
              generationConfig: {
                temperature: 0.4,
              },
            }),
          }
        );

        if (!response.ok) continue;

        const data = await response.json();
        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (candidateText) {
          rawResponseText = candidateText;
          break;
        }
      } catch (err) {
        // try next model
      }
    }

    if (!rawResponseText) {
      return NextResponse.json({
        success: true,
        content: generateSmartFallback(),
        source: 'smart_fallback',
      });
    }

    // Clean potential markdown wrap
    let cleanedHtml = rawResponseText.trim();
    if (cleanedHtml.startsWith('```html')) {
      cleanedHtml = cleanedHtml.replace(/^```html\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedHtml.startsWith('```')) {
      cleanedHtml = cleanedHtml.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    return NextResponse.json({
      success: true,
      content: cleanedHtml,
      source: 'gemini_ai',
    });
  } catch (error: any) {
    console.error('AI Writer API Route Error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Error generating AI content.',
      },
      { status: 500 }
    );
  }
}
