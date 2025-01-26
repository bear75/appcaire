import type { SupportedLocale } from '../types';
import { LOCALE_NAMES, SUPPORTED_LOCALES } from '../types';

/**
 * Check if a locale is supported (only Swedish)
 */
export function isValidLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

/**
 * Get the display name for a locale (only Swedish)
 */
export function getLocaleDisplayName(locale: SupportedLocale): string {
  return LOCALE_NAMES[locale];
}
