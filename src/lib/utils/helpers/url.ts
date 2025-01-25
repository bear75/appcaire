/**
 * URL and path manipulation utilities
 */

/**
 * Gets the base URL for the application based on the environment
 * @returns The base URL for the application
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (
    process.env.VERCEL_ENV === 'production'
    && process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
}

/**
 * Creates an absolute URL by combining the base URL with a path
 * @param path - The path to combine with the base URL
 * @returns The absolute URL
 */
export function absoluteUrl(path: string): string {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Gets the i18n path for a given URL and locale
 * @param url - The URL to get the i18n path for
 * @param locale - The locale to use
 * @param defaultLocale - The default locale (optional)
 * @returns The i18n path
 */
export function getI18nPath(
  url: string,
  locale: string,
  defaultLocale: string = 'sv',
): string {
  if (locale === defaultLocale) {
    return url;
  }

  return `/${locale}${url.startsWith('/') ? url : `/${url}`}`;
}

/**
 * Checks if a URL is external (starts with http:// or https://)
 * @param url - The URL to check
 * @returns Whether the URL is external
 */
export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//.test(url);
}
