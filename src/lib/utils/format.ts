/**
 * Formatting utilities for consistent value handling across the application.
 * All functions use Swedish locale by default as per requirements.
 */

const DEFAULT_LOCALE = 'sv-SE';
const DEFAULT_CURRENCY = 'SEK';

// Currency formatting types and functions
type CurrencyFormatOptions = {
  /** The currency code to use (defaults to SEK) */
  currency?: string;
  /** Number of decimal places to show */
  decimals?: number;
  /** Whether to show the currency symbol */
  showSymbol?: boolean;
};

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

export function parseCurrency(value: string): number {
  const normalized = value.replace(/[^0-9,.-]/g, '').replace(',', '.');
  return Number.parseFloat(normalized);
}

// Percentage formatting types and functions
type PercentageFormatOptions = {
  /** Minimum number of decimal places */
  minimumDecimals?: number;
  /** Maximum number of decimal places */
  maximumDecimals?: number;
  /** Whether to include the % symbol */
  showSymbol?: boolean;
};

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

export function formatPercentageWithSign(value: number): string {
  const formatted = formatPercentage(Math.abs(value));
  return value >= 0 ? `+${formatted}` : `-${formatted}`;
}

export function parsePercentage(value: string): number {
  const normalized = value.replace(/[^0-9,.-]/g, '').replace(',', '.');
  return Number.parseFloat(normalized) / 100;
}

// String formatting
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str: string, length: number = 50): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

// Number formatting
export function formatNumber(
  value: number,
  minimumDecimals: number = 0,
  maximumDecimals: number = 2,
): string {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    minimumFractionDigits: minimumDecimals,
    maximumFractionDigits: maximumDecimals,
  }).format(value);
} 