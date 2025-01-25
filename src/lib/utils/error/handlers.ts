/**
 * Error handling utilities for consistent error management
 */

/**
 * Custom error class for application-specific errors
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Creates a standardized error object
 * @param message - Error message
 * @param code - Error code
 * @param statusCode - HTTP status code
 * @param details - Additional error details
 * @returns AppError instance
 */
export function createError(
  message: string,
  code: string,
  statusCode: number = 500,
  details?: Record<string, unknown>,
): AppError {
  return new AppError(message, code, statusCode, details);
}

/**
 * Safely parses JSON with error handling
 * @param json - JSON string to parse
 * @returns Parsed object or null if invalid
 */
export function safeJsonParse(json: string): unknown {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Wraps an async function to handle errors consistently
 * @param fn - Async function to wrap
 * @returns Wrapped function that returns [error, result]
 */
export function wrapAsync<T, Args extends any[]>(
  fn: (...args: Args) => Promise<T>,
): (...args: Args) => Promise<[Error | null, T | null]> {
  return async (...args: Args): Promise<[Error | null, T | null]> => {
    try {
      const result = await fn(...args);
      return [null, result];
    } catch (error) {
      return [error instanceof Error ? error : new Error(String(error)), null];
    }
  };
}

/**
 * Formats an error for logging or display
 * @param error - Error to format
 * @returns Formatted error object
 */
export function formatError(error: unknown): Record<string, unknown> {
  if (error instanceof AppError) {
    return {
      name: error.name,
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    name: 'UnknownError',
    message: String(error),
  };
}
