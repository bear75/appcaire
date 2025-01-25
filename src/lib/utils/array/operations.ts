/**
 * Array utilities for common array operations
 */

/**
 * Checks if an array is empty
 * @param arr - Array to check
 * @returns Whether the array is empty
 */
export function isEmpty<T>(arr: T[]): boolean {
  return arr.length === 0;
}

/**
 * Removes duplicates from an array
 * @param arr - Array to deduplicate
 * @returns Array with duplicates removed
 */
export function removeDuplicates<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Groups an array of objects by a key
 * @param arr - Array to group
 * @param key - Key to group by
 * @returns Object with grouped arrays
 */
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce(
    (groups, item) => {
      const groupKey = String(item[key]);
      return {
        ...groups,
        [groupKey]: [...(groups[groupKey] || []), item],
      };
    },
    {} as Record<string, T[]>,
  );
}

/**
 * Chunks an array into smaller arrays of a specified size
 * @param arr - Array to chunk
 * @param size - Size of each chunk
 * @returns Array of chunks
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size));
}

/**
 * Sorts an array by a key
 * @param arr - Array to sort
 * @param key - Key to sort by
 * @param direction - Sort direction ('asc' or 'desc')
 * @returns Sorted array
 */
export function sortBy<T>(
  arr: T[],
  key: keyof T,
  direction: 'asc' | 'desc' = 'asc',
): T[] {
  return [...arr].sort((a, b) => {
    if (a[key] < b[key]) {
      return direction === 'asc' ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
}
