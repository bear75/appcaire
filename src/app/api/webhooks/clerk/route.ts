import { clerkClient, type WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

import { db } from '@/lib/db';
import { ORG_ROLE } from '@/types/Auth';

// Define the type for super admin users from database
type SuperAdmin = {
  clerkId: string;
  role: string;
  active: boolean;
};

// Define the permissions for regular admins (home care company admins)
// These are organization-level permissions, NOT system-level
const ADMIN_PERMISSIONS = [
  // Organization management
  'org:profile:read', // Can view org profile
  'org:profile:manage', // Can update org profile (but not delete)

  // Member management (within their org)
  'org:members:invite', // Can invite new members
  'org:members:manage', // Can manage existing members
  'org:members:remove', // Can remove members

  // Business operations
  'org:schedule:manage', // Can manage schedules
  'org:clients:manage', // Can manage clients
  'org:employees:manage', // Can manage employees
  'org:analytics:read', // Can view analytics

  // Settings & billing
  'org:settings:read', // Can view settings
  'org:settings:manage', // Can manage settings
  'org:billing:read', // Can view billing
  'org:billing:manage', // Can manage billing
] as const;

// Define system-level permissions (only for super admins)
const SUPER_ADMIN_PERMISSIONS = [
  ...ADMIN_PERMISSIONS,
  // System level permissions
  'org:sys_domains:manage',
  'org:sys_domains:read',
  'org:sys_memberships:manage',
  'org:sys_memberships:read',
  'org:sys_profile:delete',
  'org:sys_profile:manage',
] as const;

export async function POST(req: Request) {
  // 1. Validate webhook secret
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET || typeof WEBHOOK_SECRET !== 'string') {
    throw new Error('Missing or invalid CLERK_WEBHOOK_SECRET');
  }

  // 2. Get and validate headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', {
      status: 400,
    });
  }

  // 3. Get the body
  let payload: WebhookEvent;
  try {
    payload = await req.json();
  } catch {
    return new Response('Error parsing webhook body', {
      status: 400,
    });
  }

  // 4. Verify webhook signature
  try {
    const wh = new Webhook(WEBHOOK_SECRET);
    payload = wh.verify(JSON.stringify(payload), {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    // Log error for debugging but don't expose details in response
    const error = err as Error;
    console.error('[Webhook] Verification failed:', error.message);
    return new Response('Error verifying webhook signature', {
      status: 400,
    });
  }

  // 5. Handle webhook events
  try {
    switch (payload.type) {
      case 'organization.created': {
        const { id: organizationId, name: _name } = payload.data;

        // 1. Set up permissions for the creator (regular admin)
        try {
          await clerkClient.organizations.updateOrganizationMetadata(organizationId, {
            privateMetadata: {
              permissions: ADMIN_PERMISSIONS, // Regular admin permissions only
              isHomeCareCo: true,
              createdAt: new Date().toISOString(),
            },
          });
        } catch (error) {
          console.error('[Webhook] Failed to set organization metadata:', error);
        }

        // 2. Get super admins from database and add them with elevated permissions
        const superAdmins = await db.query.users.findMany({
          where: {
            role: ORG_ROLE.SUPER_ADMIN,
            active: true,
          },
        }) as SuperAdmin[];

        // Add each super admin to the organization with full permissions
        const addMembershipPromises = superAdmins.map((admin: SuperAdmin) =>
          clerkClient.organizations.createOrganizationMembership({
            organizationId,
            userId: admin.clerkId,
            role: ORG_ROLE.SUPER_ADMIN,
            metadata: {
              permissions: SUPER_ADMIN_PERMISSIONS, // Super admin gets all permissions
            },
          }).catch((error) => {
            const err = error as Error;
            console.error(
              `[Webhook] Failed to add super admin ${admin.clerkId} to organization ${organizationId}:`,
              err.message,
            );
          }),
        );

        await Promise.allSettled(addMembershipPromises);
        break;
      }

      case 'organization.updated': {
        const { id: _organizationId } = payload.data;
        // Handle organization updates if needed
        break;
      }

      case 'organization.deleted': {
        const { id: _organizationId } = payload.data;
        // Handle organization deletion if needed
        break;
      }

      // Add more event handlers as needed
    }

    return new Response('Webhook processed successfully', { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error('[Webhook] Processing failed:', err.message);
    return new Response('Error processing webhook', { status: 500 });
  }
}
