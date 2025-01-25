import translations from '@/locales/sv.json';

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
        : never;
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<typeof translations>;

interface InterpolationValues {
  [key: string]: string | number;
}

export function t(key: TranslationKey, values?: InterpolationValues): string {
  const keys = key.split('.');
  let value: any = translations;

  for (const k of keys) {
    value = value?.[k];
  }

  if (!value) return key;

  if (values) {
    return Object.entries(values).reduce((str, [key, val]) => {
      return str.replace(new RegExp(`{${key}}`, 'g'), String(val));
    }, value);
  }

  return value;
}

// Helper function to replace useTranslations hook
export function useTranslations(namespace: keyof typeof translations) {
  return function translate(key: string, values?: InterpolationValues): string {
    const fullKey = `${namespace}.${key}` as TranslationKey;
    return t(fullKey, values);
  };
}

// Server-side translation function for metadata
export async function getTranslations(namespace: keyof typeof translations) {
  return function translate(key: string, values?: InterpolationValues): string {
    const fullKey = `${namespace}.${key}` as TranslationKey;
    return t(fullKey, values);
  };
} 