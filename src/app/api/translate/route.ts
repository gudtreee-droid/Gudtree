import { NextRequest, NextResponse } from 'next/server';
import { devanagariToHinglish } from '@/lib/hindiToHinglish';
import { isSupportedLang } from '@/lib/languages';

// Server-side in-memory cache to make repeated requests instantaneous (<1ms)
const translationMemoryCache = new Map<string, { title: string; excerpt: string; content: string }>();

function decodeBasicEntities(text: string): string {
  return text
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');
}

function cleanHtmlTagsPolishing(html: string): string {
  return html
    .replace(/<\s*\/\s*(strong|em|b|i|a|code|span|h[1-6]|p|li|th|td)\s*>/gi, '</$1>')
    .replace(/<\s*(strong|em|b|i|code)\s*>/gi, '<$1>')
    .replace(/<\s*(h[1-6]|p|li|th|td)([^>]*)>/gi, '<$1$2>');
}

/**
 * Call Google Translate with specified client identifier and realistic headers
 */
async function callGoogleTranslate(text: string, targetLang: string, client: string): Promise<string> {
  const url = `https://translate.googleapis.com/translate_a/single?client=${encodeURIComponent(
    client
  )}&sl=en&tl=${encodeURIComponent(targetLang)}&dt=t`;

  const body = new URLSearchParams({ q: text }).toString();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Accept: '*/*',
      },
      body,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Google Translate HTTP ${res.status}`);
    }

    const textData = await res.text();
    let data: unknown;
    try {
      data = JSON.parse(textData);
    } catch {
      throw new Error('Google Translate returned non-JSON response');
    }

    if (!Array.isArray(data) || !Array.isArray(data[0])) {
      throw new Error('Google Translate returned unexpected response structure');
    }

    return (data[0] as Array<unknown>)
      .map((seg) => (Array.isArray(seg) ? String(seg[0] || '') : ''))
      .join('');
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Fallback to MyMemory API if Google endpoint is temporarily rate-limited
 */
async function callMyMemoryFallback(text: string, targetLang: string): Promise<string> {
  const clean = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!clean) return text;

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    clean.slice(0, 480)
  )}&langpair=en|${encodeURIComponent(targetLang)}`;

  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
  });

  if (!res.ok) throw new Error(`MyMemory HTTP ${res.status}`);
  const json = await res.json();
  const translated = json?.responseData?.translatedText;
  if (!translated || typeof translated !== 'string') {
    throw new Error('MyMemory translation empty');
  }
  return translated;
}

/**
 * Translates an indexed chunk of text segments in ONE single HTTP request
 * using delimiter tokens `[[[0]]]`, `[[[1]]]`, ... which survive translation
 * across all Indic scripts without phonetic transliteration.
 */
async function translateChunkWithTokens(
  chunkSegments: string[],
  targetLang: string
): Promise<string[]> {
  if (chunkSegments.length === 0) return [];

  const textWithTokens = chunkSegments
    .map((seg, idx) => `[[[${idx}]]]\n${seg}`)
    .join('\n\n');

  const clients = ['dict-chrome-ex', 'gtx'];
  let rawTranslated: string | null = null;
  let lastErr: unknown = null;

  for (const client of clients) {
    try {
      rawTranslated = await callGoogleTranslate(textWithTokens, targetLang, client);
      if (rawTranslated && rawTranslated.trim()) break;
    } catch (err) {
      lastErr = err;
    }
  }

  // If primary engines failed, attempt MyMemory fallback segment by segment
  if (!rawTranslated) {
    console.warn('Google engines failed, falling back to MyMemory API. Reason:', (lastErr as Error)?.message);
    const fallbackResults = await Promise.all(
      chunkSegments.map(async (seg) => {
        try {
          return await callMyMemoryFallback(seg, targetLang);
        } catch {
          return seg;
        }
      })
    );
    return fallbackResults;
  }

  // Parse extracted tokens [[[0]]], [[[1]]], etc.
  const results = new Array<string>(chunkSegments.length).fill('');
  for (let i = 0; i < chunkSegments.length; i++) {
    const pattern = new RegExp(
      `\\[\\s*\\[\\s*\\[\\s*${i}\\s*\\]\\s*\\]\\s*\\]([\\s\\S]*?)(?=\\[\\s*\\[\\s*\\[\\s*\\d+\\s*\\]\\s*\\]\\s*\\]|$)`,
      'i'
    );
    const match = rawTranslated.match(pattern);
    if (match && match[1] && match[1].trim()) {
      results[i] = cleanHtmlTagsPolishing(match[1].trim());
    } else {
      results[i] = chunkSegments[i];
    }
  }

  return results;
}

/**
 * Translates any number of segments safely by chunking them into safe batch sizes
 * (max 15 segments or 3000 chars per batch).
 */
async function translateBatchSafe(
  segments: string[],
  targetLang: string
): Promise<string[]> {
  if (segments.length === 0) return [];

  const googleLang = targetLang === 'hinglish' ? 'hi' : targetLang;

  const chunks: string[][] = [];
  let currentChunk: string[] = [];
  let currentLen = 0;

  for (const seg of segments) {
    const cleanSeg = decodeBasicEntities(seg).trim();
    if (currentChunk.length >= 15 || currentLen + cleanSeg.length > 3000) {
      if (currentChunk.length > 0) {
        chunks.push(currentChunk);
        currentChunk = [];
        currentLen = 0;
      }
    }
    currentChunk.push(cleanSeg);
    currentLen += cleanSeg.length;
  }
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  const translatedSegments: string[] = [];
  for (let i = 0; i < chunks.length; i++) {
    if (i > 0) {
      // 120ms pause between chunks avoids any burst rate-limiter
      await new Promise((r) => setTimeout(r, 120));
    }
    const chunkTranslated = await translateChunkWithTokens(chunks[i], googleLang);
    translatedSegments.push(...chunkTranslated);
  }

  if (targetLang === 'hinglish') {
    return translatedSegments.map((item) => devanagariToHinglish(item));
  }

  return translatedSegments;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const targetLang = String(body?.targetLang || 'en').trim().toLowerCase();

    const rawTitle = String(body?.title || '').trim();
    const rawExcerpt = String(body?.excerpt || '').trim();
    const rawContent = String(body?.content || '').trim();

    if (!isSupportedLang(targetLang) || targetLang === 'en') {
      return NextResponse.json({
        targetLang: 'en',
        title: rawTitle,
        excerpt: rawExcerpt,
        content: rawContent,
      });
    }

    // Check in-memory cache
    const cacheKey = `${targetLang}::${rawTitle}::${rawContent.length}`;
    const cached = translationMemoryCache.get(cacheKey);
    if (cached) {
      return NextResponse.json({
        targetLang,
        title: cached.title,
        excerpt: cached.excerpt,
        content: cached.content,
      });
    }

    // Extract all leaf semantic blocks (<p>, <h2>, <h3>, <li>, <th>, <td>, etc.)
    const leafBlockRegex =
      /<(h[1-6]|p|li|th|td|figcaption)([^>]*)>((?:(?!<\/?(?:h[1-6]|p|li|th|td|ul|ol|blockquote|table|thead|tbody|tr|div|section|figcaption)\b)[\s\S])*?)<\/\1>/gi;

    const matches: Array<{
      start: number;
      end: number;
      tag: string;
      attrs: string;
      inner: string;
    }> = [];

    let m: RegExpExecArray | null;
    while ((m = leafBlockRegex.exec(rawContent)) !== null) {
      const inner = m[3];
      if (inner && inner.replace(/<[^>]+>/g, '').trim()) {
        matches.push({
          start: m.index,
          end: m.index + m[0].length,
          tag: m[1],
          attrs: m[2] || '',
          inner,
        });
      }
    }

    let tTitle = rawTitle;
    let tExcerpt = rawExcerpt;
    let tContent = rawContent;

    if (matches.length === 0) {
      // Content has no standard leaf tags (e.g. raw text or simple block)
      const segmentsToTranslate: string[] = [];
      if (rawTitle) segmentsToTranslate.push(rawTitle);
      if (rawExcerpt) segmentsToTranslate.push(rawExcerpt);
      if (rawContent) segmentsToTranslate.push(rawContent);

      const translated = await translateBatchSafe(segmentsToTranslate, targetLang);

      let cursor = 0;
      if (rawTitle) tTitle = translated[cursor++] || rawTitle;
      if (rawExcerpt) tExcerpt = translated[cursor++] || rawExcerpt;
      if (rawContent) tContent = translated[cursor++] || rawContent;
    } else {
      // Build unified batch: [title, excerpt, ...matches.map(m => m.inner)]
      const unifiedBatch: string[] = [rawTitle, rawExcerpt, ...matches.map((item) => item.inner)];
      const translatedBatch = await translateBatchSafe(unifiedBatch, targetLang);

      tTitle = translatedBatch[0] || rawTitle;
      tExcerpt = translatedBatch[1] || rawExcerpt;
      const translatedBlocks = translatedBatch.slice(2);

      // Reconstruct full HTML cleanly preserving container markup (tables, blockquotes, lists)
      let rebuilt = '';
      let cursor = 0;
      matches.forEach((item, idx) => {
        rebuilt += rawContent.slice(cursor, item.start);
        const transInner = translatedBlocks[idx] || item.inner;
        rebuilt += `<${item.tag}${item.attrs}>${transInner}</${item.tag}>`;
        cursor = item.end;
      });
      rebuilt += rawContent.slice(cursor);
      tContent = rebuilt;
    }

    const result = {
      targetLang,
      title: tTitle,
      excerpt: tExcerpt,
      content: tContent,
    };

    // Save to memory cache
    translationMemoryCache.set(cacheKey, result);

    return NextResponse.json(result);
  } catch (err) {
    console.error('Translation route error:', err);
    return NextResponse.json(
      { error: 'Translation service is temporarily busy. Please retry.' },
      { status: 503 }
    );
  }
}
