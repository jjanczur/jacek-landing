export type Lang = 'en' | 'pl' | 'de';

/**
 * Languages that are currently published. Site owner's instruction: only
 * English is live; Polish and German routes still build (so their URLs
 * exist and can serve redirect shells) but are not offered as real content.
 */
export const PUBLISHED_LANGS: Lang[] = ['en'];

/**
 * Whether a given language is currently published (i.e. should render its
 * normal document body rather than a redirect shell to English).
 */
export function isPublished(lang: Lang): boolean {
  return PUBLISHED_LANGS.includes(lang);
}

// Default return type for translation JSON blobs.
// Many pages don't provide a typed schema yet, so we intentionally use a permissive type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TranslationBlob = Record<string, any>;

/**
 * Get translations for a specific page and language
 */
export async function getTranslations<T = TranslationBlob>(
  page: string,
  lang: Lang,
): Promise<T> {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - Prevent massive union type inference that causes TS memory leaks
    const translations = await import(`../i18n/${lang}/${page}.json`);
    return translations.default as T;
  } catch {
    // Fallback to English if translation file doesn't exist
    if (lang !== 'en') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - Prevent massive union type inference that causes TS memory leaks
      const fallback = await import(`../i18n/en/${page}.json`);
      return fallback.default as T;
    }
    throw new Error(
      `Translation file not found: ${page} for language: ${lang}`,
    );
  }
}

/**
 * Extract language from URL pathname
 * Supports paths like: /en/contact, /pl/contact, /de/contact
 */
export function getLangFromPath(pathname: string): Lang {
  const match = pathname.match(/^\/(en|pl|de)/);
  return (match?.[1] || 'en') as Lang;
}

/**
 * Get all supported languages
 */
export function getSupportedLangs(): Lang[] {
  return ['en', 'pl', 'de'];
}
