/**
 * Percentage formatting utilities for consistent percentage handling across the application.
 * All functions use Swedish locale by default as per requirements.
 */

const DEFAULT_LOCALE = 'sv-SE';

/**
 * Options for percentage formatting
 */
type PercentageFormatOptions = {
  /** Minimum number of decimal places */
  minimumDecimals?: number;
  /** Maximum number of decimal places */
  maximumDecimals?: number;
  /** Whether to include the % symbol */
  showSymbol?: boolean;
};

/**
 * Formats a number as a percentage using Swedish locale
 * @param value - The value to format (0.75 for 75%)
 * @param options - Formatting options
 * @returns Formatted percentage string
 */
export function formatPercentage(
  value: number,
  options: PercentageFormatOptions = {},
): string {
  const {
    minimumDecimals = 1,
    maximumDecimals = 1,
    showSymbol = true,
  } = options;

  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: showSymbol ? 'percent' : 'decimal',
    minimumFractionDigits: minimumDecimals,
    maximumFractionDigits: maximumDecimals,
  }).format(value);
}

/**
 * Formats a decimal value to a percentage with sign
 * @param value - The decimal value to format (-0.15 for -15%)
 * @returns Formatted percentage string with sign
 */
export function formatPercentageWithSign(value: number): string {
  const formatted = formatPercentage(Math.abs(value));
  return value >= 0 ? `+${formatted}` : `-${formatted}`;
}

/**
 * Parses a percentage string back to a decimal
 * @param value - The percentage string to parse (e.g., "75%")
 * @returns Decimal value (0.75 for "75%")
 */
export function parsePercentage(value: string): number {
  // Remove % symbol and spaces, then parse
  const normalized = value.replace(/[^0-9,.-]/g, '').replace(',', '.');
  return Number.parseFloat(normalized) / 100;
}

/**
 * Format a number as a percentage
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return new Intl.NumberFormat('sv-SE', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Format a decimal as a percentage with custom locale
 */
export const formatCustomPercentage = (
  value: number,
  decimals: number = 1,
  locale: string = 'sv-SE'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};
