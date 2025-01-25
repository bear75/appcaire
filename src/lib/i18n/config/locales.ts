import type { Locale } from '../types';

export const SUPPORTED_LOCALES = ['sv', 'en', 'no', 'da'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

export const LOCALE_NAMES: Record<SupportedLocale, string> = {
  sv: 'Svenska',
  en: 'English',
  no: 'Norsk',
  da: 'Dansk',
} as const;

export const DEFAULT_LOCALE: SupportedLocale = 'sv';

export function isValidLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

export function getLocaleDisplayName(locale: SupportedLocale): string {
  return LOCALE_NAMES[locale];
} 