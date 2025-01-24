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