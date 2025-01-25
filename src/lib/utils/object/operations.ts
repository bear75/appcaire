/**
 * Object utilities for common object operations
 */

/**
 * Checks if an object is empty
 * @param obj - Object to check
 * @returns Whether the object is empty
 */
export function isEmptyObject(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Picks specified keys from an object
 * @param obj - Source object
 * @param keys - Keys to pick
 * @returns New object with only the specified keys
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  return keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: obj[key],
    }),
    {} as Pick<T, K>,
  );
}

/**
 * Omits specified keys from an object
 * @param obj - Source object
 * @param keys - Keys to omit
 * @returns New object without the specified keys
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
}

/**
 * Deep clones an object
 * @param obj - Object to clone
 * @returns Deep cloned object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Flattens a nested object into a single level object with dot notation keys
 * @param obj - Object to flatten
 * @param prefix - Prefix for nested keys
 * @returns Flattened object
 */
export function flattenObject(
  obj: Record<string, unknown>,
  prefix = '',
): Record<string, unknown> {
  return Object.keys(obj).reduce((acc, key) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (
      typeof obj[key] === 'object'
      && obj[key] !== null
      && !Array.isArray(obj[key])
    ) {
      return {
        ...acc,
        ...flattenObject(obj[key] as Record<string, unknown>, prefixedKey),
      };
    }

    return {
      ...acc,
      [prefixedKey]: obj[key],
    };
  }, {});
}
