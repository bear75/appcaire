/**
 * Currency formatting utilities for consistent monetary value handling across the application.
 * All functions use Swedish locale and SEK currency by default as per requirements.
 */

const DEFAULT_LOCALE = 'sv-SE';
const DEFAULT_CURRENCY = 'SEK';

/**
 * Options for currency formatting
 */
type CurrencyFormatOptions = {
  /** The currency code to use (defaults to SEK) */
  currency?: string;
  /** Number of decimal places to show */
  decimals?: number;
  /** Whether to show the currency symbol */
  showSymbol?: boolean;
};

/**
 * Formats a number as currency using Swedish locale and SEK by default
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  options: CurrencyFormatOptions = {},
): string {
  const {
    currency = DEFAULT_CURRENCY,
    decimals = 2,
    showSymbol = true,
  } = options;

  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: showSymbol ? 'currency' : 'decimal',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/**
 * Formats a number as a compact currency (e.g., 1.5M SEK)
 * @param amount - The amount to format
 * @param currency - The currency code to use
 * @returns Formatted compact currency string
 */
export function formatCompactCurrency(
  amount: number,
  currency: string = DEFAULT_CURRENCY,
): string {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
}

/**
 * Parses a currency string back to a number
 * @param value - The currency string to parse
 * @returns Parsed number value
 */
export function parseCurrency(value: string): number {
  // Remove currency symbol, spaces, and use dots for decimal
  const normalized = value.replace(/[^0-9,.-]/g, '').replace(',', '.');
  return Number.parseFloat(normalized);
}
