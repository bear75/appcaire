import { useCallback, useEffect, useState } from 'react';

import { i18nConfig } from '../config';
import type { Locale, TranslationFunction, TranslationValues } from '../types';
import { loadTranslations } from '../utils/loadTranslations';

export function useTranslation(namespace: string) {
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [locale, setLocale] = useState<Locale>(i18nConfig.defaultLocale);

  useEffect(() => {
    loadTranslations(locale, namespace).then(setTranslations);
  }, [locale, namespace]);

  const t: TranslationFunction = useCallback(
    (key: string, values?: TranslationValues) => {
      const keys = key.split('.');
      let value: any = translations;

      for (const k of keys) {
        value = value?.[k];
      }

      if (!value) {
        if (i18nConfig.debug) {
          console.warn(`Missing translation: ${namespace}.${key}`);
        }
        return key;
      }

      if (values) {
        return Object.entries(values).reduce((str, [key, val]) => {
          return str.replace(new RegExp(`{${key}}`, 'g'), String(val));
        }, value);
      }

      return value;
    },
    [translations],
  );

  return { t, locale, setLocale };
} 