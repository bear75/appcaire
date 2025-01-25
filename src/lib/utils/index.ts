/**
 * Central export point for all utility functions
 */

// Date utilities
export * from './date';

// Formatting utilities
export * from './format';

// Validation utilities
export * from './validation';

// Helper utilities
export * from './helpers';

// Re-export commonly used types
export type { ClassValue } from 'clsx';

// Constants
export const DEFAULT_LOCALE = 'sv-SE';
export const DEFAULT_CURRENCY = 'SEK';

// Version information
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '0.0.0';
