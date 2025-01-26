// Only Swedish language support as per .cursorrules
export const SUPPORTED_LOCALES = ['sv'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export type Locale = SupportedLocale;

export const LOCALE_NAMES: Record<SupportedLocale, string> = {
  sv: 'Svenska',
} as const;

export const DEFAULT_LOCALE: SupportedLocale = 'sv';

export type TranslationValues = {
  [key: string]: string | number;
};

export type I18nConfig = {
  defaultLocale: Locale;
  locales: readonly Locale[];
  defaultNamespace: string;
  debug?: boolean;
};

export type TranslationFunction = (
  key: string,
  values?: TranslationValues,
) => string;

export type UseTranslationResponse = {
  t: TranslationFunction;
  locale: Locale;
  setLocale: (locale: Locale) => void;
};
