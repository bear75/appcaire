import type { Locale } from '../types';

const NAMESPACES = ['common', 'settings', 'dashboard', 'errors', 'schedule'] as const;
type Namespace = typeof NAMESPACES[number];

type TranslationCache = {
  [locale in Locale]?: {
    [namespace in Namespace]?: Record<string, any>;
  };
};

const translationCache: TranslationCache = {};

export async function loadTranslations(
  locale: Locale,
  namespace: Namespace,
): Promise<Record<string, any>> {
  // Check cache first
  if (translationCache[locale]?.[namespace]) {
    return translationCache[locale]![namespace]!;
  }

  try {
    // Dynamic import of translation file
    const translations = await import(`@/locales/${locale}/${namespace}.json`);

    // Cache the translations
    if (!translationCache[locale]) {
      translationCache[locale] = {};
    }
    translationCache[locale]![namespace] = translations;

    return translations;
  } catch (error) {
    console.error(`Failed to load translations for ${locale}/${namespace}:`, error);
    return {};
  }
} 