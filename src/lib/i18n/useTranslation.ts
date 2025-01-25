/**
 * React hooks for using translations in components
 */

import { useMemo } from 'react';

import type translations from '@/locales/sv.json';

import { createNamespaceTranslation, t, type TranslationKey } from './translate';
import type { InterpolationValues } from './types';

/**
 * Hook for using translations in components
 * Maintains compatibility with existing code
 * @param namespace - The translation namespace
 * @returns Translation function scoped to the namespace
 */
export function useTranslations(namespace: keyof typeof translations) {
  return useMemo(() => {
    return createNamespaceTranslation(namespace);
  }, [namespace]);
}

/**
 * Alternative hook with additional features
 * @param namespace - Optional namespace to scope translations
 * @returns Translation functions and utilities
 */
export function useTranslation(namespace?: keyof typeof translations) {
  return useMemo(() => {
    if (namespace) {
      return {
        t: createNamespaceTranslation(namespace),
        translate: t,
      };
    }

    return {
      t,
      translate: t,
    };
  }, [namespace]);
}

/**
 * Hook for using translations with a specific namespace
 * @param namespace - The translation namespace
 * @returns Translation function scoped to the namespace
 */
export function useNamespaceTranslation<T extends string>(namespace: T) {
  return useMemo(() => {
    return {
      t: (key: string, values?: InterpolationValues) => {
        const fullKey = `${namespace}.${key}` as TranslationKey;
        return t(fullKey, values);
      },
    };
  }, [namespace]);
}
