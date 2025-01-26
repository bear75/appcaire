/**
 * i18n configuration
 */

import type { I18nConfig } from '../types';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../types';

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

export * from './locales';
