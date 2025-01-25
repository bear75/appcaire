/**
 * i18n configuration
 */

import type { Locale } from '../types';

/**
 * i18n configuration object
 */
export const i18nConfig = {
  /** Default locale for the application */
  defaultLocale: 'sv' as const,

  /** All supported locales */
  locales: ['sv', 'en', 'no', 'da'] as const,

  /** Default namespace for translations */
  defaultNamespace: 'common' as const,

  /** Whether to show missing translation warnings in development */
  debug: process.env.NODE_ENV === 'development',
} as const;

/**
 * Get the display name for a locale
 * @param locale - The locale code
 * @returns The display name in Swedish
 */
export function getLocaleDisplayName(locale: Locale): string {
  const names: Record<Locale, string> = {
    sv: 'Svenska',
    en: 'Engelska',
    no: 'Norska',
    da: 'Danska',
  };
  return names[locale];
}

/**
 * Check if a locale is supported
 * @param locale - The locale to check
 * @returns Whether the locale is supported
 */
export function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale);
} 