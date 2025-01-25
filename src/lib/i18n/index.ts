/**
 * Main i18n exports
 * Maintains backward compatibility with existing code while providing new features
 */

export * from './config';
export * from './translate';
export * from './types';
export * from './useTranslation';

// Re-export commonly used utilities
export { t } from './translate';
export { useTranslations } from './useTranslation';

// Backward compatibility exports
export { useTranslations as default } from './useTranslation';
