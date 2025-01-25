import { format, isValid, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

/**
 * Check if a date string is valid
 */
export const isValidDateString = (dateStr: string): boolean => {
  try {
    return isValid(parseISO(dateStr));
  } catch {
    return false;
  }
};

/**
 * Check if a date is in the future
 */
export const isFutureDate = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return dateObj > new Date();
};

/**
 * Check if a date is in the past
 */
export const isPastDate = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return dateObj < new Date();
};

/**
 * Validate if a date string is in the correct format
 */
export const isValidDateFormat = (
  dateString: string,
  formatStr: string = 'yyyy-MM-dd',
): boolean => {
  try {
    const date = parseISO(dateString);
    const formatted = format(date, formatStr, { locale: sv });
    return formatted === dateString;
  } catch {
    return false;
  }
};
