import { currentUser } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/server';

import type { OrganizationMembership } from './types';

/**
 * Get the current user's organization memberships
 * @returns Array of organization memberships
 */
export async function getCurrentUserOrganizations(): Promise<
  OrganizationMembership[]
> {
  const user = await currentUser();
  if (!user) {
    return [];
  }

  return user.organizationMemberships.map(membership => ({
    id: membership.organization.id,
    name: membership.organization.name,
    role: membership.role,
    permissions: membership.permissions,
  }));
}

/**
 * Get the current user's primary organization
 * @returns The primary organization or undefined if none exists
 */
export async function getPrimaryOrganization(): Promise<
  OrganizationMembership | undefined
> {
  const organizations = await getCurrentUserOrganizations();
  return organizations[0]; // First org is primary
}

/**
 * Check if user has required permission in organization
 */
export function hasPermission(
  user: User,
  organizationId: string,
  permission: string,
): boolean {
  const membership = user.organizationMemberships.find(
    m => m.organization.id === organizationId,
  );
  return membership?.permissions.includes(permission) ?? false;
}
