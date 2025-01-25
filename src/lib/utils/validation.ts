/**
 * Validation utilities for common data types and formats
 */

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone number validation (Swedish format)
export function isValidPhoneNumber(phone: string): boolean {
  // Supports formats: +46701234567, 0701234567, 070-123 45 67
  const phoneRegex = /^(\+46|0)[\s-]?7[02369][\s-]?\d{4}[\s-]?\d{3}$/;
  return phoneRegex.test(phone);
}

// Personal number validation (Swedish format)
export function isValidPersonalNumber(personalNumber: string): boolean {
  // Supports formats: YYYYMMDD-XXXX, YYMMDD-XXXX
  const cleaned = personalNumber.replace(/[^\d-]/g, '');
  const regex = /^(\d{8}|\d{6})-\d{4}$/;
  return regex.test(cleaned);
}

// Organization number validation (Swedish format)
export function isValidOrganizationNumber(orgNumber: string): boolean {
  // Supports format: XXXXXX-XXXX
  const cleaned = orgNumber.replace(/[^\d-]/g, '');
  const regex = /^\d{6}-\d{4}$/;
  return regex.test(cleaned);
}

// Postal code validation (Swedish format)
export function isValidPostalCode(postalCode: string): boolean {
  // Supports format: XXX XX
  const cleaned = postalCode.replace(/\s/g, '');
  const regex = /^\d{5}$/;
  return regex.test(cleaned);
}

// String length validation
export function isValidLength(str: string, min: number, max: number): boolean {
  return str.length >= min && str.length <= max;
}

// Number range validation
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

// URL validation
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Password strength validation
export function isStrongPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Empty value validation
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
} 