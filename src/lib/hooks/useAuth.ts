import { useOrganization, useUser, useAuth } from '@clerk/nextjs';
import { useCallback } from 'react';

// Define available roles
export const Roles = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  SCHEDULER: 'scheduler',
  TEAM_MANAGER: 'team_manager',
  OPS_MANAGER: 'ops_manager',
  SUPPORT: 'support'
} as const;

export type Role = typeof Roles[keyof typeof Roles];

// Define organization status types
export const OrgStatus = {
  TRIAL: 'trial',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  EXPIRED: 'expired'
} as const;

export type OrgStatusType = typeof OrgStatus[keyof typeof OrgStatus];

// Define system permissions
export const SystemPermissions = {
  ALL_ORG_ACCESS: 'org:feature:all_org_access',
  DOMAINS_MANAGE: 'org:sys_domains:manage',
  DOMAINS_READ: 'org:sys_domains:read',
  MEMBERSHIPS_MANAGE: 'org:sys_memberships:manage',
  MEMBERSHIPS_READ: 'org:sys_memberships:read',
  PROFILE_DELETE: 'org:sys_profile:delete',
  PROFILE_MANAGE: 'org:sys_profile:manage'
} as const;

// Organization metadata type
interface OrganizationMetadata {
  status: OrgStatusType;
  trialStartedAt?: string;
  trialEndsAt?: string;
  subscriptionId?: string;
}

/**
 * Extended hook for Clerk authentication with role-based access control
 */
export function useAppAuth() {
  const { isLoaded, userId, sessionId, isSignedIn } = useAuth();
  const { user } = useUser();
  const { organization, membership, isLoaded: isOrgLoaded } = useOrganization();

  // Get organization metadata with type safety
  const orgMetadata = organization?.publicMetadata as OrganizationMetadata;

  const hasPermission = useCallback((permission: string) => {
    return membership?.permissions.includes(permission) ?? false;
  }, [membership]);

  const hasRole = useCallback((role: Role) => {
    return membership?.role === role;
  }, [membership]);

  // Role checks
  const isSuperAdmin = useCallback(() => {
    return hasRole(Roles.SUPER_ADMIN);
  }, [hasRole]);

  const isAdmin = useCallback(() => {
    return hasRole(Roles.ADMIN) || isSuperAdmin();
  }, [hasRole, isSuperAdmin]);

  const isScheduler = useCallback(() => {
    return hasRole(Roles.SCHEDULER);
  }, [hasRole]);

  const isTeamManager = useCallback(() => {
    return hasRole(Roles.TEAM_MANAGER);
  }, [hasRole]);

  const isOpsManager = useCallback(() => {
    return hasRole(Roles.OPS_MANAGER);
  }, [hasRole]);

  const isSupport = useCallback(() => {
    return hasRole(Roles.SUPPORT);
  }, [hasRole]);

  // Multi-organization access checks
  const canAccessMultipleOrgs = useCallback(() => {
    // Only super_admin and support can access multiple organizations
    return isSuperAdmin() || isSupport();
  }, [isSuperAdmin, isSupport]);

  // System permission checks
  const canAccessAllOrgs = useCallback(() => {
    // Only allow if they have the permission AND are in an allowed role
    return hasPermission(SystemPermissions.ALL_ORG_ACCESS) && canAccessMultipleOrgs();
  }, [hasPermission, canAccessMultipleOrgs]);

  const canManageDomains = useCallback(() => {
    return hasPermission(SystemPermissions.DOMAINS_MANAGE);
  }, [hasPermission]);

  const canReadDomains = useCallback(() => {
    return hasPermission(SystemPermissions.DOMAINS_READ) || canManageDomains();
  }, [hasPermission, canManageDomains]);

  const canManageMemberships = useCallback(() => {
    return hasPermission(SystemPermissions.MEMBERSHIPS_MANAGE);
  }, [hasPermission]);

  const canReadMemberships = useCallback(() => {
    return hasPermission(SystemPermissions.MEMBERSHIPS_READ) || canManageMemberships();
  }, [hasPermission, canManageMemberships]);

  const canDeleteProfile = useCallback(() => {
    return hasPermission(SystemPermissions.PROFILE_DELETE);
  }, [hasPermission]);

  const canManageProfile = useCallback(() => {
    return hasPermission(SystemPermissions.PROFILE_MANAGE);
  }, [hasPermission]);

  // Business logic permissions
  const canManageSchedules = useCallback(() => {
    return isScheduler() || isTeamManager() || isAdmin() || isSuperAdmin();
  }, [isScheduler, isTeamManager, isAdmin, isSuperAdmin]);

  const canViewAnalytics = useCallback(() => {
    return isTeamManager() || isOpsManager() || isAdmin() || isSuperAdmin();
  }, [isTeamManager, isOpsManager, isAdmin, isSuperAdmin]);

  // Organization access validation
  const shouldShowOrgSwitcher = useCallback(() => {
    return canAccessMultipleOrgs() && user?.organizationMemberships?.length > 1;
  }, [canAccessMultipleOrgs, user?.organizationMemberships?.length]);

  // Organization status checks
  const getOrgStatus = useCallback((): OrgStatusType => {
    return orgMetadata?.status || OrgStatus.TRIAL;
  }, [orgMetadata]);

  const isTrialOrg = useCallback(() => {
    return getOrgStatus() === OrgStatus.TRIAL;
  }, [getOrgStatus]);

  const isActiveOrg = useCallback(() => {
    return getOrgStatus() === OrgStatus.ACTIVE;
  }, [getOrgStatus]);

  const isSuspendedOrg = useCallback(() => {
    return getOrgStatus() === OrgStatus.SUSPENDED;
  }, [getOrgStatus]);

  const isExpiredOrg = useCallback(() => {
    return getOrgStatus() === OrgStatus.EXPIRED;
  }, [getOrgStatus]);

  const getTrialDaysRemaining = useCallback(() => {
    if (!isTrialOrg() || !orgMetadata?.trialEndsAt) return 0;
    const trialEnd = new Date(orgMetadata.trialEndsAt);
    const now = new Date();
    const days = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, days);
  }, [isTrialOrg, orgMetadata]);

  return {
    // Clerk's built-in auth state
    isLoaded: isLoaded && isOrgLoaded,
    isSignedIn,
    userId,
    sessionId,
    user,
    organization,
    membership,
    
    // Role checks
    hasRole,
    isSuperAdmin: isSuperAdmin(),
    isAdmin: isAdmin(),
    isScheduler: isScheduler(),
    isTeamManager: isTeamManager(),
    isOpsManager: isOpsManager(),
    isSupport: isSupport(),
    
    // Multi-org access
    canAccessMultipleOrgs: canAccessMultipleOrgs(),
    shouldShowOrgSwitcher: shouldShowOrgSwitcher(),
    
    // System permission checks
    hasPermission,
    canAccessAllOrgs: canAccessAllOrgs(),
    canManageDomains: canManageDomains(),
    canReadDomains: canReadDomains(),
    canManageMemberships: canManageMemberships(),
    canReadMemberships: canReadMemberships(),
    canDeleteProfile: canDeleteProfile(),
    canManageProfile: canManageProfile(),
    
    // Business permission checks
    canManageSchedules: canManageSchedules(),
    canViewAnalytics: canViewAnalytics(),
    
    // Organization helpers
    orgId: organization?.id ?? null,
    orgName: organization?.name ?? null,
    orgSlug: organization?.slug ?? null,
    hasOrg: !!organization,
    
    // Organization status
    orgStatus: getOrgStatus(),
    isTrialOrg: isTrialOrg(),
    isActiveOrg: isActiveOrg(),
    isSuspendedOrg: isSuspendedOrg(),
    isExpiredOrg: isExpiredOrg(),
    trialDaysRemaining: getTrialDaysRemaining(),
    orgMetadata,
  };
}

// Re-export Clerk's hooks for convenience
export { useUser, useOrganization, useAuth } from '@clerk/nextjs'; 