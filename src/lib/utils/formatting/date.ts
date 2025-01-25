/**
 * Date formatting utilities for consistent date handling across the application.
 * All functions use Swedish locale by default as per requirements.
 */

const DEFAULT_LOCALE = 'sv-SE';

/**
 * Formats a date to YYYY-MM-DD format using Swedish locale
 * @param date - The date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/**
 * Formats a time to HH:mm format using Swedish locale
 * @param date - The date to format
 * @returns Formatted time string
 */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Formats a date and time using Swedish locale
 * @param date - The date to format
 * @returns Formatted date and time string
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Formats a relative time (e.g., "2 days ago") using Swedish locale
 * @param date - The date to format
 * @returns Formatted relative time string
 */
export function formatRelativeTime(date: Date): string {
  const rtf = new Intl.RelativeTimeFormat(DEFAULT_LOCALE, { numeric: 'auto' });
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.round(diff / (1000 * 60 * 60 * 24));

  return rtf.format(days, 'day');
}
