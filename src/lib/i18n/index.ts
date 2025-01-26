// Config exports
export { i18nConfig } from './config';
export { getLocaleDisplayName, isValidLocale } from './config/locales';

// Type exports
export type {
  I18nConfig,
  Locale,
  SupportedLocale,
  TranslationFunction,
  TranslationValues,
  UseTranslationResponse,
} from './types';
export { DEFAULT_LOCALE, LOCALE_NAMES, SUPPORTED_LOCALES } from './types';

// Hook exports
export { useTranslation } from './hooks/useTranslation';

// Utility exports
export { loadTranslations } from './utils/loadTranslations';
