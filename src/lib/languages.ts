export interface ReaderLanguage {
  code: string;
  label: string;
  nativeLabel: string;
  shortCode: string;
}

export const READER_LANGUAGES: ReaderLanguage[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', shortCode: 'EN' },
  { code: 'hinglish', label: 'Hinglish', nativeLabel: 'Hinglish', shortCode: 'Hi-En' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', shortCode: 'HI' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা', shortCode: 'BN' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', shortCode: 'TE' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी', shortCode: 'MR' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', shortCode: 'TA' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી', shortCode: 'GU' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', shortCode: 'KN' },
  { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ', shortCode: 'PA' },
  { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം', shortCode: 'ML' },
];

export function isSupportedLang(code: string): boolean {
  return READER_LANGUAGES.some((l) => l.code === code);
}
