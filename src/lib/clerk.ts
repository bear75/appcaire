import { clerkClient } from "@clerk/nextjs";

// Use function-based approach for Clerk client
export const getClerkClient = () => clerkClient();

// Helper function for getting user
export const getUser = async (userId: string) => {
  const client = getClerkClient();
  return await client.users.getUser(userId);
};

// Helper function for getting organization
export const getOrganization = async (orgId: string) => {
  const client = getClerkClient();
  return await client.organizations.getOrganization({ organizationId: orgId });
}; 