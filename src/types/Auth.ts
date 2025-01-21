import type { EnumValues } from './Enum';

export const ORG_ROLE = {
  SUPER_ADMIN: 'org:super_admin',  // Custom role for Caire employees
  ADMIN: 'org:admin',              // Default Clerk admin (home care company admin)
  MEMBER: 'org:member',            // Default Clerk member
} as const;

export type OrgRole = EnumValues<typeof ORG_ROLE>;

export const ORG_PERMISSION = {
  MANAGE_ALL_ORGS: 'manage:all_organizations',  // Only for super_admin
  MANAGE_ORG: 'manage:organization',           // For admin and super_admin
  MANAGE_USERS: 'manage:users',                // For admin and super_admin
  MANAGE_SCHEDULES: 'manage:schedules',        // For admin and super_admin
} as const;

export type OrgPermission = EnumValues<typeof ORG_PERMISSION>;
