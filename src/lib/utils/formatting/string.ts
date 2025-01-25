/**
 * String formatting utilities for consistent text handling across the application.
 */

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The string with its first letter capitalized
 */
export function capitalizeFirstLetter(str: string): string {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 * @param str - The string to truncate
 * @param length - Maximum length before truncation (default: 50)
 * @returns Truncated string with ellipsis if needed
 */
export function truncate(str: string, length: number = 50): string {
  if (!str || str.length <= length) {
    return str;
  }
  return `${str.slice(0, length)}...`;
}

/**
 * Formats a number using Swedish locale
 * @param value - The number to format
 * @param minimumDecimals - Minimum number of decimal places
 * @param maximumDecimals - Maximum number of decimal places
 * @returns Formatted number string
 */
export function formatNumber(
  value: number,
  minimumDecimals: number = 0,
  maximumDecimals: number = 2,
): string {
  return new Intl.NumberFormat('sv-SE', {
    minimumFractionDigits: minimumDecimals,
    maximumFractionDigits: maximumDecimals,
  }).format(value);
}
