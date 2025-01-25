/**
 * Utility functions for the application
 * Re-exports all utility functions for easy importing
 */

// Array utilities
export * from './array/operations';

// Object utilities
export * from './object/operations';

// Type checking utilities
export * from './types/guards';

// Error handling utilities
export * from './error/handlers';

// General utilities
export * from './general/misc';

// URL and path utilities
export * from './url/paths';

// Formatting utilities
export * from './formatting';

// CSS utilities
export * from './css/tailwind';

// Date utilities
export * from './date';

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
