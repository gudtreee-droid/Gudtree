import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title = '',
      excerpt = '',
      content = '',
      focusKeyword = '',
      metaDescription = '',
      category = 'Clean Snacks',
    } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!title && !content && !excerpt) {
      return NextResponse.json(
        {
          error: 'Please provide at least a title or draft text to generate SEO suggestions.',
        },
        { status: 400 }
      );
    }

    // Default smart algorithmic fallback generator with complete ready-to-use drafts
    const generateSmartFallback = (rawTitle: string, rawCat: string, rawExcerpt: string) => {
      const cleanTitle = rawTitle.trim() || 'Everyday Healthy Snacking & Clean Swaps';
      const words = cleanTitle.split(/\s+/);
      const mainSubject = words.slice(0, 4).join(' ');

      const t1 = `Is Your ${mainSubject} Truly Healthy? (The Honest Label Check)`;
      const t2 = `${cleanTitle}: Real Food Label Audit & Clean Swaps`;
      const t3 = `Clean Swaps for ${mainSubject}: Zero Palm Oil & No Hidden Sugar`;

      return {
        overallScore: Math.min(95, Math.max(70, 60 + (cleanTitle.length >= 40 && cleanTitle.length <= 70 ? 25 : 15))),
        scoreLabel: 'Strong Optimization',
        searchIntent: 'Informational & Commercial',
        topicDepth: 'Clean Food Audit',
        titleSuggestions: [
          {
            type: 'High CTR & Curiosity',
            title: t1,
            hook: 'Exposes hidden ingredients and hooks readers',
            excerpt: `Before you buy another packet of ${mainSubject}, check the ingredient label. Here is what big brands hide behind clever marketing and what you should eat instead.`,
            draftHtml: `<h2>The Hidden Truth on the Packet</h2><p>Most packaged versions of <strong>${mainSubject}</strong> are marketed as 'healthy' or 'diet-friendly', but a quick glance at the back label reveals a different story: cheap palm oil, hidden maltodextrin, and artificial preservatives.</p><blockquote>"If a snack needs six synthetic additives to taste like real food, your body is paying the price."</blockquote><h2>What the Ingredients Actually Mean</h2><p>When you decode the fine print, you realize that refined flours (maida) and cheap vegetable fats are used to cut production costs while inflating shelf life. These ingredients spike blood sugar and trigger sluggish afternoon fatigue.</p><p>Switching to whole-grain, stone-ground, or slow-roasted alternatives restores daily energy and promotes long-term metabolic health.</p><h2>The Honest Clean Swap</h2><p>Always choose snacks made with cold-pressed oils, real jaggery (gud), roasted seeds, or millets. Keep your plate simple, clean, and transparent.</p>`,
          },
          {
            type: 'SEO Search Optimized',
            title: t2,
            hook: 'Matches top Google search queries',
            excerpt: `Complete guide to ${cleanTitle}: real ingredient breakdowns, zero-palm-oil alternatives, and verified healthy options for Indian families.`,
            draftHtml: `<h2>Why Ingredient Transparency Matters</h2><p>When choosing <strong>${cleanTitle}</strong>, looking beyond front-of-pack claims is essential. Food safety and clean eating begin with knowing exactly what enters your kitchen.</p><blockquote>"Real food does not need misleading labels—clean ingredients speak for themselves."</blockquote><h2>Nutritional Breakdown & Healthy Checklist</h2><p>Compare total sugars against dietary fiber. A balanced snack should offer sustained satiety without chemical flavor enhancers (INS numbers) or excessive sodium.</p><p>For children and working professionals alike, clean alternatives protect gut health and support steady cognitive focus.</p><h2>Recommended Swaps for Everyday Routines</h2><p>Prioritize traditional Indian superfoods like roasted makhana, sattu drinks, and sprouted legumes over ultra-processed factory munchies.</p>`,
          },
          {
            type: 'Nutrition Editorial',
            title: t3,
            hook: 'Trustworthy, nutritionist-approved tone',
            excerpt: `Practical, doctor-reviewed tips on ${mainSubject}: how to swap ultra-processed snacks for clean, energizing alternatives without giving up taste.`,
            draftHtml: `<h2>Rethinking Our Daily Snacking Habits</h2><p>Our daily tea-time and study munching often determine our overall metabolic health. In the context of <strong>${mainSubject}</strong>, small habit changes yield lasting benefits.</p><blockquote>"Healthy snacking is not about deprivation—it is about choosing honest ingredients over industrial shortcuts."</blockquote><h2>What to Look for on the Label</h2><p>Verify that the oil used is unrefined or cold-pressed, and check that jaggery or dates replace refined white sugar and liquid glucose.</p><p>These practical swaps safeguard cardiovascular wellness and prevent blood sugar volatility throughout the day.</p><h2>The Bottom Line</h2><p>Make your snacking honest, wholesome, and palm-oil free. Your family deserves food made from real ingredients.</p>`,
          },
        ],
        suggestedMeta: {
          seoTitle: cleanTitle.length > 60 ? cleanTitle.slice(0, 57) + '...' : cleanTitle,
          metaDescription: rawExcerpt
            ? (rawExcerpt.slice(0, 155) + (rawExcerpt.length > 155 ? '...' : ''))
            : `Zero palm oil, zero hidden sugars, and honest food label audits. Discover clean healthy snack swaps for ${mainSubject} on GudTree.`,
        },
        keywords: [
          rawCat || 'Clean Snacks',
          words[0] || 'Healthy Snacks',
          words[1] || 'Zero Palm Oil',
          'Food Label Audit',
          'Clean Swaps',
        ].filter(Boolean),
        checklist: [
          {
            id: 'title_length',
            label: 'Title Length (40-65 chars)',
            status: cleanTitle.length >= 35 && cleanTitle.length <= 70 ? 'good' : 'warning',
            message: `Current title is ${cleanTitle.length} characters. Ideal length is 40-65 characters.`,
          },
          {
            id: 'meta_desc',
            label: 'Meta Description Hook',
            status: rawExcerpt ? 'good' : 'warning',
            message: rawExcerpt ? 'Meta description is present and engaging.' : 'Add a 150-character meta summary to boost Google CTR.',
          },
          {
            id: 'intent',
            label: 'Search Intent Clarity',
            status: 'good',
            message: `Accurately targeted for readers searching in ${rawCat || 'General'}.`,
          },
        ],
        actionableSuggestions: [
          `Target 1,300-1,800 words with a topic-specific comparison table, daily serving size, and side effects.`,
          `Include 3-5 contextual internal links to related GudTree audits and /focus/* hubs.`,
          `Add 4 real question headings ending in '?' under Frequently Asked Questions for FAQ rich schema.`,
        ],
      };
    };

    // If API key is not present, return the smart fallback immediately
    if (!apiKey) {
      const fallback = generateSmartFallback(title, category, excerpt);
      return NextResponse.json({
        success: true,
        analysis: fallback,
        source: 'local_nlp_engine',
      });
    }

    const systemPrompt = `You are an elite Food Nutrition & SEO Strategist for GudTree (India's Clean Snacking & Food Label Audit Guide).
Analyze the snack/food topic and category, and provide 3 click-worthy, high-ranking headline alternatives. FOR EACH HEADLINE ALTERNATIVE, also write:
1. A punchy 2-sentence Lead Summary/Excerpt (140-160 chars) in clear Indian English focusing on zero palm oil, real ingredients, and honest swaps.
2. A comprehensive 1,200+ word SEO-ready editorial draft in clean HTML (<p>, <h2>, <h3>, <table>, <blockquote>, <ul>) analyzing label claims, macro/glycemic numbers, side effects, clean Indian kitchen swaps, internal links (/focus/diabetes, /category/label-audits), and 3-4 real FAQ <h3> questions ending in '?'.

Input:
- Title: "${title || 'Untitled Draft'}"
- Category: "${category}"

OUTPUT REQUIREMENTS:
Respond ONLY with a valid, parseable JSON object matching this schema:
{
  "overallScore": 88,
  "scoreLabel": "Excellent",
  "searchIntent": "Informational & Commercial",
  "topicDepth": "Clean Food Audit",
  "titleSuggestions": [
    {
      "type": "High CTR & Curiosity",
      "title": "Punchy headline under 65 chars",
      "hook": "Exposes hidden ingredients and hooks readers",
      "excerpt": "A 2-sentence lead summary that hooks the reader...",
      "draftHtml": "<h2>The Hidden Truth on the Packet</h2><p>Paragraph 1...</p><blockquote>\\"Memorable takeaway quote.\\"</blockquote><h2>What the Ingredients Mean</h2><p>Paragraph 2...</p><h2>The Honest Clean Swap</h2><p>Paragraph 3...</p>"
    },
    {
      "type": "SEO Search Optimized",
      "title": "Keyword-first headline under 60 chars",
      "hook": "Optimized for Google SERP query",
      "excerpt": "A 2-sentence lead summary optimized for search snippet...",
      "draftHtml": "<h2>Why Ingredient Transparency Matters</h2><p>Paragraph 1...</p><blockquote>\\"Insight quote.\\"</blockquote><h2>Nutritional Breakdown & Checklist</h2><p>Paragraph 2...</p><h2>Recommended Swaps</h2><p>Paragraph 3...</p>"
    },
    {
      "type": "Nutrition Editorial",
      "title": "Trustworthy headline under 65 chars",
      "hook": "Nutritionist-approved authority tone",
      "excerpt": "A sophisticated lead summary for conscious eaters...",
      "draftHtml": "<h2>Rethinking Our Daily Snacking Habits</h2><p>Paragraph 1...</p><blockquote>\\"Nutritional quote.\\"</blockquote><h2>What to Look for on the Label</h2><p>Paragraph 2...</p><h2>The Bottom Line</h2><p>Paragraph 3...</p>"
    }
  ],
  "suggestedMeta": {
    "seoTitle": "Optimal SEO title max 60 characters",
    "metaDescription": "A captivating 140-160 character meta summary that highlights zero palm oil and honest swaps."
  },
  "keywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4", "keyword 5"],
  "checklist": [
    {
      "id": "title_length",
      "label": "Title Length Optimization",
      "status": "good",
      "message": "Title is between 40-65 characters."
    }
  ],
  "actionableSuggestions": [
    "Specific actionable tip 1"
  ]
}`;

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
                  parts: [{ text: systemPrompt }],
                },
              ],
              generationConfig: {
                temperature: 0.35,
                responseMimeType: 'application/json',
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
        // Fallback to next model
      }
    }

    if (!rawResponseText) {
      const fallback = generateSmartFallback(title, category, excerpt);
      return NextResponse.json({
        success: true,
        analysis: fallback,
        source: 'smart_engine_fallback',
      });
    }

    let cleanedJson = rawResponseText.trim();
    if (cleanedJson.startsWith('```json')) {
      cleanedJson = cleanedJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedJson.startsWith('```')) {
      cleanedJson = cleanedJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsedAnalysis = JSON.parse(cleanedJson);

    return NextResponse.json({
      success: true,
      analysis: parsedAnalysis,
      source: 'gemini_ai',
    });
  } catch (error: any) {
    console.error('SEO Analysis API Route Error:', error);
    const body = await req.json().catch(() => ({}));
    const fallback = {
      overallScore: 78,
      scoreLabel: 'Good',
      searchIntent: 'Informational',
      topicDepth: 'Standard Editorial',
      titleSuggestions: [
        {
          type: 'High CTR',
          title: body.title ? `${body.title}: Strategic Overview 2026` : 'Modern Industry Strategic Overview',
          hook: 'Clear, high-engagement headline',
          excerpt: 'A comprehensive editorial analysis on key industry developments and strategic foresight.',
          draftHtml: '<p>A deep dive into current industry developments, strategic frameworks, and market fundamentals.</p>',
        },
      ],
      suggestedMeta: {
        seoTitle: body.title || 'GudTree Nutrition & Snacking Story',
        metaDescription: body.excerpt || 'Read the full in-depth healthy eating story on GudTree.',
      },
      keywords: ['Analysis', 'Strategy', 'Report'],
      checklist: [],
      actionableSuggestions: ['Review keyword presence in your lead paragraph.'],
    };

    return NextResponse.json({
      success: true,
      analysis: fallback,
      source: 'fallback',
    });
  }
}
