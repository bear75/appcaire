/**
 * Utility for combining class names with Tailwind CSS support
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind CSS classes intelligently
 * @param inputs - Class names to combine (strings, objects, or arrays)
 * @returns Merged class string
 *
 * @example
 * ```tsx
 * // Basic usage
 * cn('px-4 py-2', 'bg-blue-500', { 'text-white': true })
 * // => 'px-4 py-2 bg-blue-500 text-white'
 *
 * // Merging Tailwind classes
 * cn('px-2 py-1 bg-red-500', 'px-4 bg-blue-500')
 * // => 'py-1 px-4 bg-blue-500'
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
