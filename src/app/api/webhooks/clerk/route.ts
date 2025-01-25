import { clerkClient, type WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { db } from '@/lib/db';
import { organizations } from '@/lib/db/schema/organizations';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

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

// Organization status types
const OrgStatus = {
  TRIAL: 'trial',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  EXPIRED: 'expired',
  DELETED: 'deleted'
} as const;

type OrgStatusType = typeof OrgStatus[keyof typeof OrgStatus];

// Helper function to update organization status
async function updateOrgStatus(orgId: string, status: OrgStatusType, metadata: Record<string, any> = {}) {
  try {
    // Update Clerk metadata
    await fetch(`https://api.clerk.com/v1/organizations/${orgId}/metadata`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        publicMetadata: {
          status,
          ...metadata
        }
      })
    });

    // Update our database
    await db.update(organizations)
      .set({ 
        status,
        ...metadata,
        updatedAt: new Date()
      })
      .where(eq(organizations.id, orgId));

  } catch (error) {
    console.error('Error updating organization status:', error);
    throw error;
  }
}

// Helper function to send notifications
async function notifyTeam(message: string, metadata: Record<string, any> = {}) {
  // TODO: Implement your notification system (e.g., email, Slack, etc.)
  console.log('Team notification:', message, metadata);
}

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt: WebhookEvent;

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  
  if (eventType === 'organization.created') {
    try {
      const { id: clerkId, name, created_at } = evt.data;
      
      // Create organization in our database
      await db.insert(organizations).values({
        clerkId,
        name,
        status: OrgStatus.TRIAL,
        trialExpirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        createdAt: new Date(created_at),
        updatedAt: new Date()
      });

      // Set Clerk metadata
      await updateOrgStatus(clerkId, OrgStatus.TRIAL, {
        trialStartedAt: new Date().toISOString(),
        trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });

      // Notify team
      await notifyTeam('New trial organization created', {
        orgId: clerkId,
        name,
      });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error creating organization:', error);
      return NextResponse.json({ error: 'Failed to create organization' }, { status: 500 });
    }
  }

  if (eventType === 'organization.updated') {
    const { id, name, slug } = evt.data;
    
    // Update basic info
    await db.update(organizations)
      .set({ name, slug, updatedAt: new Date() })
      .where(eq(organizations.id, id));
  }

  if (eventType === 'organization.deleted') {
    const { id, name } = evt.data;
    
    // Update status to deleted
    await updateOrgStatus(id, OrgStatus.DELETED);

    // Notify team
    await notifyTeam('Organization deleted', {
      orgId: id,
      name,
    });
  }

  // Handle status transitions (you'll need to create custom events for these)
  if (eventType === 'organization.trial_ending') {
    const { id, name } = evt.data;
    // Notify team and organization admin
    await notifyTeam('Organization trial ending', {
      orgId: id,
      name,
    });
  }

  if (eventType === 'organization.trial_expired') {
    const { id, name } = evt.data;
    // Update status to expired
    await updateOrgStatus(id, OrgStatus.EXPIRED);
    // Notify team and organization admin
    await notifyTeam('Organization trial expired', {
      orgId: id,
      name,
    });
  }

  if (eventType === 'organization.activated') {
    const { id, name, subscriptionId } = evt.data;
    // Update status to active
    await updateOrgStatus(id, OrgStatus.ACTIVE, { subscriptionId });
    // Notify team
    await notifyTeam('Organization activated', {
      orgId: id,
      name,
      subscriptionId,
    });
  }

  if (eventType === 'organization.suspended') {
    const { id, name, reason } = evt.data;
    // Update status to suspended
    await updateOrgStatus(id, OrgStatus.SUSPENDED);
    // Notify team
    await notifyTeam('Organization suspended', {
      orgId: id,
      name,
      reason,
    });
  }

  return NextResponse.json({ success: true });
}
