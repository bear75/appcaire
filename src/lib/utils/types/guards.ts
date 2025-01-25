/**
 * Type checking utilities and type guards
 */

/**
 * Checks if a value is defined (not undefined)
 * @param value - Value to check
 * @returns Whether the value is defined
 */
export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

/**
 * Checks if a value is null
 * @param value - Value to check
 * @returns Whether the value is null
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Checks if a value is undefined
 * @param value - Value to check
 * @returns Whether the value is undefined
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * Checks if a value is null or undefined
 * @param value - Value to check
 * @returns Whether the value is null or undefined
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return isNull(value) || isUndefined(value);
}

/**
 * Checks if a value is a string
 * @param value - Value to check
 * @returns Whether the value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Checks if a value is a number
 * @param value - Value to check
 * @returns Whether the value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

/**
 * Checks if a value is a boolean
 * @param value - Value to check
 * @returns Whether the value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Checks if a value is an object (and not null)
 * @param value - Value to check
 * @returns Whether the value is an object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * Checks if a value is an array
 * @param value - Value to check
 * @returns Whether the value is an array
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/**
 * Checks if a value is a function
 * @param value - Value to check
 * @returns Whether the value is a function
 */
export function isFunction(
  value: unknown,
): value is (...args: unknown[]) => unknown {
  return typeof value === 'function';
}
