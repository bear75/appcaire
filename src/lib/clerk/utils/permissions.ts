import type { User } from '@clerk/nextjs/server';
import { ORG_PERMISSION, ORG_ROLE } from '@/types/Auth';

/**
 * Default permissions for each role
 */
export const ROLE_PERMISSIONS = {
  [ORG_ROLE.SUPER_ADMIN]: [
    ORG_PERMISSION.MANAGE_ALL_ORGS,
    ORG_PERMISSION.MANAGE_ORG,
    ORG_PERMISSION.MANAGE_USERS,
    ORG_PERMISSION.MANAGE_SCHEDULES,
  ],
  [ORG_ROLE.ADMIN]: [
    ORG_PERMISSION.MANAGE_ORG,
    ORG_PERMISSION.MANAGE_USERS,
    ORG_PERMISSION.MANAGE_SCHEDULES,
  ],
  [ORG_ROLE.MEMBER]: [
    ORG_PERMISSION.MANAGE_SCHEDULES,
  ],
} as const;

/**
 * Check if a user has a specific permission in an organization
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

/**
 * Check if a user has a specific role in an organization
 */
export function hasRole(
  user: User,
  organizationId: string,
  role: string,
): boolean {
  const membership = user.organizationMemberships.find(
    m => m.organization.id === organizationId,
  );
  return membership?.role === role;
}

/**
 * Get all permissions for a user in an organization
 */
export function getUserPermissions(
  user: User,
  organizationId: string,
): string[] {
  const membership = user.organizationMemberships.find(
    m => m.organization.id === organizationId,
  );
  return membership?.permissions ?? [];
} 