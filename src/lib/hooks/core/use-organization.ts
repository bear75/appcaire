import { useOrganization as useClerkOrganization } from '@clerk/nextjs';

/**
 * Hook for accessing organization data
 * Wraps Clerk's useOrganization hook for easier access and future extensibility
 */
export function useOrganization() {
  return useClerkOrganization();
} 