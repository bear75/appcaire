import { isValid, parseISO } from 'date-fns';

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