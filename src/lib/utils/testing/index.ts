import { type ClassValue } from 'clsx';

/**
 * Mock implementation of the cn utility for testing
 */
export function mockCn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(' ');
}

/**
 * Create a mock date for testing
 */
export function createMockDate(isoString: string): Date {
  return new Date(isoString);
}

/**
 * Create a mock error for testing
 */
export function createMockError(message: string): Error {
  return new Error(message);
} 