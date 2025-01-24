/**
 * @deprecated This file has been moved to src/lib/utils/helpers/date.ts
 * Please update your imports to use the new location.
 * This file will be removed once all dependencies are updated.
 */

import { format } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export function convertToDate(dateString: string | Date): Date {
  if (dateString instanceof Date) {
    return dateString;
  }
  return new Date(dateString);
} 