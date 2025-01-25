/**
 * Organization membership roles
 */
export type OrganizationRole = 'admin' | 'member' | 'guest';

/**
 * Organization membership permissions
 */
export type OrganizationPermission =
  | 'org:settings:manage'
  | 'org:users:manage'
  | 'org:schedule:manage'
  | 'org:schedule:view'
  | 'org:clients:manage'
  | 'org:clients:view'
  | 'org:employees:manage'
  | 'org:employees:view';

/**
 * Organization membership information
 */
export type OrganizationMembership = {
  id: string;
  name: string;
  role: OrganizationRole;
  permissions: OrganizationPermission[];
};

/**
 * User profile information
 */
export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  organizations: OrganizationMembership[];
};
