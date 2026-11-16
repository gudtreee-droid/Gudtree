import { NextRequest, NextResponse } from 'next/server';
import { devanagariToHinglish } from '@/lib/hindiToHinglish';
import { isSupportedLang } from '@/lib/languages';

const translationCache = new Map<string, string>();

function decodeBasicEntities(text: string): string {
  return text
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&nbsp;/g, ' ');
}

/**
 * Calls Google Translate via POST form body (no GET URL length truncation!)
 */
async function translatePostSegment(
  segmentText: string,
  googleTarget: string
): Promise<string> {
  const clean = decodeBasicEntities(segmentText).trim();
  if (!clean) return segmentText;

  const cacheKey = `${googleTarget}::${clean}`;
  const cached = translationCache.get(cacheKey);
  if (cached) return cached;

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(
    googleTarget
  )}&dt=t`;

  const body = new URLSearchParams({ q: clean }).toString();

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body,
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    return segmentText;
  }

  const data = await res.json();
  const translated = Array.isArray(data?.[0])
    ? data[0]
        .map((seg: unknown) => (Array.isArray(seg) ? String(seg[0] || '') : ''))
        .join('')
    : clean;

  // Normalize accidental spaces around closing inline HTML tags after translation
  const polished = translated
    .replace(/<\s*\/\s*(strong|em|b|i|a|code|span)\s*>/gi, '</$1>')
    .replace(/<\s*(strong|em|b|i|code)\s*>/gi, '<$1>');

  translationCache.set(cacheKey, polished);
  return polished;
}

/**
 * Translates complete semantic leaf HTML blocks (<p>, <h2>, <h3>, <li>, <th>, <td>)
 * preserving inline tags inside the full sentence context for natural grammar accuracy.
 */
async function translateHtmlBlockPreservingInline(
  html: string,
  targetLang: string
): Promise<string> {
  const googleLang = targetLang === 'hinglish' ? 'hi' : targetLang;

  // Match leaf block tags whose inner body has NO nested block elements
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
  while ((m = leafBlockRegex.exec(html)) !== null) {
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

  if (matches.length === 0) {
    const t = await translatePostSegment(html, googleLang);
    return targetLang === 'hinglish' ? devanagariToHinglish(t) : t;
  }

  // Translate all leaf blocks with bounded concurrency (6 at a time)
  const results = new Array<string>(matches.length);
  const CONCURRENCY = 6;
  for (let i = 0; i < matches.length; i += CONCURRENCY) {
    const chunk = matches.slice(i, i + CONCURRENCY);
    await Promise.all(
      chunk.map(async (item, offset) => {
        try {
          const translatedInner = await translatePostSegment(
            item.inner,
            googleLang
          );
          const finalInner =
            targetLang === 'hinglish'
              ? devanagariToHinglish(translatedInner)
              : translatedInner;
          results[i + offset] = `<${item.tag}${item.attrs}>${finalInner}</${item.tag}>`;
        } catch {
          results[i + offset] = `<${item.tag}${item.attrs}>${item.inner}</${item.tag}>`;
        }
      })
    );
  }

  // Reconstruct full HTML cleanly preserving wrapper tags (blockquote, ul, table, etc.)
  let rebuilt = '';
  let cursor = 0;
  matches.forEach((item, idx) => {
    rebuilt += html.slice(cursor, item.start);
    rebuilt += results[idx];
    cursor = item.end;
  });
  rebuilt += html.slice(cursor);

  return rebuilt;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const targetLang = String(body?.targetLang || 'en').trim();

    if (!isSupportedLang(targetLang) || targetLang === 'en') {
      return NextResponse.json({
        targetLang: 'en',
        title: body?.title || '',
        excerpt: body?.excerpt || '',
        content: body?.content || '',
      });
    }

    const googleLang = targetLang === 'hinglish' ? 'hi' : targetLang;
    const rawTitle = String(body?.title || '');
    const rawExcerpt = String(body?.excerpt || '');
    const rawContent = String(body?.content || '');

    const [tTitle, tExcerpt, tContent] = await Promise.all([
      rawTitle
        ? translatePostSegment(rawTitle, googleLang).then((r) =>
            targetLang === 'hinglish' ? devanagariToHinglish(r) : r
          )
        : Promise.resolve(''),
      rawExcerpt
        ? translatePostSegment(rawExcerpt, googleLang).then((r) =>
            targetLang === 'hinglish' ? devanagariToHinglish(r) : r
          )
        : Promise.resolve(''),
      rawContent
        ? translateHtmlBlockPreservingInline(rawContent, targetLang)
        : Promise.resolve(''),
    ]);

    return NextResponse.json({
      targetLang,
      title: tTitle,
      excerpt: tExcerpt,
      content: tContent,
    });
  } catch {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
