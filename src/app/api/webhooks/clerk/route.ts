import type { WebhookEvent } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

import { db } from '@/lib/db';
import { organizations } from '@/lib/db/schema/organizations';

// Organization status types
type OrgStatus = 'trial' | 'active' | 'suspended' | 'expired';

// Helper function to update organization status
async function updateOrgStatus(orgId: string, status: OrgStatus) {
  await db
    .update(organizations)
    .set({ status })
    .where(eq(organizations.id, orgId));
}

// Helper function to notify team about status changes
async function notifyTeam(orgId: string, status: OrgStatus) {
  // Implement notification logic here
  // For now, we'll just update the status
  await updateOrgStatus(orgId, status);
}

export async function POST(req: Request) {
  try {
    const headerPayload = headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are missing headers, return error
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error occured -- no svix headers', {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(process.env.WEBHOOK_SECRET || '');

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;
    } catch {
      return new Response('Error occured', {
        status: 400,
      });
    }

    // Handle the webhook
    const eventType = evt.type;

    if (eventType === 'organization.created') {
      // Set initial trial status
      await updateOrgStatus(evt.data.id, 'trial');
    }

    if (eventType === 'organization.updated') {
      // Handle organization updates
      // This could include changes to metadata, name, etc.
      const orgId = evt.data.id;
      const publicMetadata = evt.data.public_metadata;

      if (publicMetadata?.status) {
        await updateOrgStatus(orgId, publicMetadata.status as OrgStatus);
      }
    }

    if (eventType === 'organization.deleted') {
      // Handle organization deletion
      // This might involve cleaning up related data
      await updateOrgStatus(evt.data.id, 'expired');
    }

    // Handle custom events for trial management
    if (eventType === 'organization.trial_ending') {
      await notifyTeam(evt.data.id, 'trial');
    }

    if (eventType === 'organization.trial_expired') {
      await updateOrgStatus(evt.data.id, 'expired');
    }

    if (eventType === 'organization.activated') {
      await updateOrgStatus(evt.data.id, 'active');
    }

    if (eventType === 'organization.suspended') {
      await updateOrgStatus(evt.data.id, 'suspended');
    }

    return new Response('', { status: 200 });
  } catch {
    return new Response('Error occurred', { status: 500 });
  }
}
