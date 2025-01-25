/**
 * URL and path utilities for consistent URL handling
 */

/**
 * Gets the base URL for the application based on environment
 * @returns Base URL string
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
 * Converts a relative path to an absolute URL
 * @param path - Relative path to convert
 * @returns Absolute URL string
 */
export function absoluteUrl(path: string): string {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Gets the localized path for a URL
 * @param url - Original URL
 * @param locale - Target locale
 * @param defaultLocale - Default locale (defaults to 'sv')
 * @returns Localized URL path
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
 * @param url - URL to check
 * @returns Whether the URL is external
 */
export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//.test(url);
}
