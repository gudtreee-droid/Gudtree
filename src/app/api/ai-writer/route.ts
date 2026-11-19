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
      systemInstruction = `You are the chief food investigator and nutrition editor for GudTree (India's Clean Snacking & Food Label Audit Guide: READ CLEAN. SNACK HONEST.).
Write an engaging, brutally honest, and deeply practical food article for: "${title}".
Category: ${category}.
${customPrompt ? `Special Editor Instructions: ${customPrompt}` : ''}

GUIDELINES:
- Focus on Indian consumers, daily snacking routines (4 PM office chai, school lunchbox, late-night study, gym protein, diabetic low-GI).
- Brutally decode package labels: call out hidden palm oil, maltodextrin, refined sugar, INS emulsifiers, and fake 'diet/healthy' claims.
- Recommend clean, accessible Indian kitchen swaps (makhana, sattu, chana, millets, jaggery/gud, cold-pressed oils).
- Tone: Authoritative yet accessible, scientifically accurate, empathetic to busy Indian families, zero fluff.
- Format: Clean semantic HTML (<p>, <h2>, <blockquote>, <ul><li>). No markdown fences. Aim for 350-500 words.`;
    } else if (action === 'continue-writing') {
      systemInstruction = `You are GudTree's clean nutrition editor continuing an article on Indian healthy snacking and food label audits.
Article Title: "${title}"
Existing Draft Content:
"${cleanExisting.slice(-1200)}"

TASK:
Write the natural, high-quality next 2-3 paragraphs continuing this story seamlessly with clean snack swaps, label reality checks, and practical kitchen tips. Output clean HTML (<p>, <h2>). Do NOT repeat existing text.`;
    } else if (action === 'polish') {
      systemInstruction = `You are GudTree's senior nutrition copy editor.
Elevate the draft text to make it punchy, engaging, science-backed, and focused on clean ingredients and zero palm oil:
"${cleanExisting}"

Output clean HTML paragraphs (<p>).`;
    } else if (action === 'key-takeaways') {
      systemInstruction = `Generate a sleek "GudTree Clean Nutrition Takeaways" summary box for an article titled "${title}".
Output a <blockquote> with a bold title and 3-4 concise, high-value bullet points (<ul><li>...) highlighting palm oil reality, blood sugar impact, and the best clean swap.`;
    } else {
      systemInstruction = `Write a compelling clean snacking and food label audit draft for: "${title}". Output clean HTML (<p>, <h2>, <blockquote>).`;
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
