import translations from '@/locales/sv.json';

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
        : never;
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<typeof translations>;

export function t(key: TranslationKey): string {
  const keys = key.split('.');
  let value: any = translations;

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}

// Helper function to replace useTranslations hook
export function useTranslations(namespace: keyof typeof translations) {
  return function translate(key: string): string {
    const fullKey = `${namespace}.${key}` as TranslationKey;
    return t(fullKey);
  };
}

// Server-side translation function for metadata
export async function getTranslations(namespace: keyof typeof translations) {
  return function translate(key: string): string {
    const fullKey = `${namespace}.${key}` as TranslationKey;
    return t(fullKey);
  };
}
