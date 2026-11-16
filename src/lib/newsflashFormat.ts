export function formatNfDate(dateStr?: string): string {
  if (!dateStr) return 'Nov 15, 2026';
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const LEGACY_CAT_NAMES: Record<string, string> = {
  lifestyle: 'Clean Snacks',
  health: 'Gut Health',
  opinion: 'Label Audits',
  news: 'Clean Snacks',
  world: 'Desi Pantry',
  business: 'Label Audits',
  interview: 'Desi Pantry',
  technology: 'Label Audits',
  career: 'Weight & Protein',
  biography: 'PCOS & Hormones',
  crypto: 'Clean Snacks',
  metaverse: 'Gut Health',
  'real-estate': 'Desi Pantry',
  'press-release': 'Clean Snacks',
};

export function normalizeCatName(cat?: string): string {
  if (!cat) return 'Clean Snacks';
  const low = cat.toLowerCase().trim();
  if (LEGACY_CAT_NAMES[low]) return LEGACY_CAT_NAMES[low];
  return cat;
}
