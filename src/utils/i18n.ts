export type Lang = 'en' | 'pl' | 'de';

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
    const translations = await import(`../i18n/${lang}/${page}.json`);
    return translations.default as T;
  } catch {
    // Fallback to English if translation file doesn't exist
    if (lang !== 'en') {
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
