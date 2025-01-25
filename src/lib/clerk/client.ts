import { clerkClient } from '@clerk/nextjs';
import type { OrganizationMembership, UserProfile } from './types';

/**
 * Get the Clerk client instance
 */
export const getClerkClient = () => clerkClient;

/**
 * Get user profile by ID
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const client = getClerkClient();
    const user = await client.users.getUser(userId);
    
    return {
      id: user.id,
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      email: user.emailAddresses[0]?.emailAddress ?? '',
      imageUrl: user.imageUrl,
      organizations: user.organizationMemberships?.map(membership => ({
        id: membership.organization.id,
        name: membership.organization.name,
        role: membership.role as OrganizationMembership['role'],
        permissions: (membership.permissions ?? []) as OrganizationMembership['permissions'],
      })) ?? [],
    };
  } catch (error) {
    console.error('Failed to get user profile:', error);
    return null;
  }
}

/**
 * Get organization by ID
 */
export async function getOrganization(orgId: string) {
  try {
    const client = getClerkClient();
    return await client.organizations.getOrganization({ organizationId: orgId });
  } catch (error) {
    console.error('Failed to get organization:', error);
    return null;
  }
}

/**
 * Get organization members
 */
export async function getOrganizationMembers(orgId: string) {
  try {
    const client = getClerkClient();
    return await client.organizations.getOrganizationMembershipList({ organizationId: orgId });
  } catch (error) {
    console.error('Failed to get organization members:', error);
    return [];
  }
}
