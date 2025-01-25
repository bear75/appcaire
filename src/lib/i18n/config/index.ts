/**
 * i18n configuration
 */

import type { I18nConfig } from '../types';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './locales';

/**
 * i18n configuration object
 */
export const i18nConfig: I18nConfig = {
  /** Default locale for the application */
  defaultLocale: DEFAULT_LOCALE,

  /** All supported locales */
  locales: SUPPORTED_LOCALES,

  /** Default namespace for translations */
  defaultNamespace: 'common',

  /** Whether to show missing translation warnings in development */
  debug: process.env.NODE_ENV === 'development',
} as const;

/**
 * Get the display name for a locale
 * @param locale - The locale code
 * @returns The display name in Swedish
 */
export function getLocaleDisplayName(locale: string): string {
  const names: Record<string, string> = {
    sv: 'Svenska',
    en: 'Engelska',
    no: 'Norska',
    da: 'Danska',
  };
  return names[locale] || locale;
}

/**
 * Check if a locale is supported
 * @param locale - The locale to check
 * @returns Whether the locale is supported
 */
export function isValidLocale(locale: string): boolean {
  return i18nConfig.locales.includes(locale as string);
}

export * from './locales';
