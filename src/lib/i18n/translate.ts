/**
 * Core translation functionality
 */

import translations from '@/locales/sv.json';

import { i18nConfig } from './config';
import type { InterpolationValues, NestedKeyOf } from './types';

export type TranslationKey = NestedKeyOf<typeof translations>;

/**
 * Get a translation by key with optional interpolation
 * @param key - The translation key (dot notation)
 * @param values - Optional values to interpolate
 * @returns The translated string
 */
export function t(key: TranslationKey, values?: InterpolationValues): string {
  const keys = key.split('.');
  let value: any = translations;

  // Traverse the translations object using the key path
  for (const k of keys) {
    value = value?.[k];
  }

  // Return the key if no translation is found
  if (!value) {
    if (i18nConfig.debug) {
      console.warn(`Missing translation for key: ${key}`);
    }
    return key;
  }

  // Handle interpolation if values are provided
  if (values) {
    return Object.entries(values).reduce((str, [key, val]) => {
      return str.replace(new RegExp(`{${key}}`, 'g'), String(val));
    }, value);
  }

  return value;
}

/**
 * Create a translation function for a specific namespace
 * Maintains compatibility with existing useTranslations hook
 * @param namespace - The translation namespace
 * @returns A translation function bound to the namespace
 */
export function createNamespaceTranslation(namespace: keyof typeof translations) {
  return function translate(key: string, values?: InterpolationValues): string {
    const fullKey = `${namespace}.${key}` as TranslationKey;
    return t(fullKey, values);
  };
}

/**
 * Server-side translation function for metadata
 * @param namespace - The translation namespace
 * @returns A translation function bound to the namespace
 */
export async function getTranslations(namespace: keyof typeof translations) {
  return function translate(key: string, values?: InterpolationValues): string {
    const fullKey = `${namespace}.${key}` as TranslationKey;
    return t(fullKey, values);
  };
}
