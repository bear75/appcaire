export function convertToDate(dateString: string | Date): Date {
  if (dateString instanceof Date) {
    return dateString;
  }
  return new Date(dateString);
} 