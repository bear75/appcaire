export const SUPPORTED_LOCALES = ['sv', 'en', 'no', 'da'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];
export type Locale = SupportedLocale;

export interface TranslationValues {
  [key: string]: string | number;
}

export interface I18nConfig {
  defaultLocale: Locale;
  locales: readonly Locale[];
  defaultNamespace: string;
  debug?: boolean;
}

export type TranslationFunction = (
  key: string,
  values?: TranslationValues,
) => string;

export type UseTranslationResponse = {
  t: TranslationFunction;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}; 