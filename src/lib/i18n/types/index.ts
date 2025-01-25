/**
 * Type definitions for the i18n system
 */

/**
 * Utility type to get all possible nested key paths in an object
 */
export type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
        : never;
    }[keyof T]
  : never;

/**
 * Values that can be interpolated into translations
 */
export interface InterpolationValues {
  [key: string]: string | number;
}

/**
 * Translation function type
 */
export type TranslateFunction = (
  key: string,
  values?: InterpolationValues
) => string;

/**
 * Supported locales
 */
export type Locale = 'sv' | 'en' | 'no' | 'da';

/**
 * Translation namespace
 */
export type Namespace =
  | 'Index'
  | 'Navbar'
  | 'Footer'
  | 'Analytics'
  | 'Schedule'
  | 'Settings'
  | 'Auth'; 