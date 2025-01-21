import { useOrganization as useClerkOrganization } from '@clerk/nextjs';

export function useOrganization() {
  const organization = useClerkOrganization();

  return {
    ...organization,
    organization: organization.organization ?? null,
  };
}
