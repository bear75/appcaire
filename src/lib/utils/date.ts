import { format, parseISO, isValid } from 'date-fns';
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

/**
 * Validate if a string is a valid date
 */
export const isValidDate = (dateString: string): boolean => {
  const date = parseISO(dateString);
  return isValid(date);
};

/**
 * Validate if a date string is in the correct format
 */
export const isValidDateFormat = (dateString: string, formatStr: string = 'yyyy-MM-dd'): boolean => {
  try {
    const date = parseISO(dateString);
    const formatted = format(date, formatStr, { locale: sv });
    return formatted === dateString;
  } catch {
    return false;
  }
}; 