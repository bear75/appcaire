import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

/**
 * Format a date string or Date object to a localized date string
 */
export const formatDate = (date: string | Date, formatStr: string = 'yyyy-MM-dd'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: sv });
};

/**
 * Format a date string or Date object to a localized time string
 */
export const formatTime = (date: string | Date, formatStr: string = 'HH:mm'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: sv });
};

/**
 * Format a date string or Date object to a localized date and time string
 */
export const formatDateTime = (date: string | Date, formatStr: string = 'yyyy-MM-dd HH:mm'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: sv });
}; 