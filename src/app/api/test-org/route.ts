import { auth } from '@clerk/nextjs/server';
import { createClerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { organization } from '@/lib/db/schema/tables';
import { eq } from 'drizzle-orm';

async function syncOrganizationToDb(clerkOrg: any) {
  try {
    // Check if organization exists by clerk_id
    const existingOrg = await db.select().from(organization).where(eq(organization.clerkId, clerkOrg.id));
    
    const orgData = {
      clerkId: clerkOrg.id,
      name: clerkOrg.name,
      status: clerkOrg.publicMetadata?.status || 'ACTIVE',
      trialExpirationDate: clerkOrg.publicMetadata?.trialExpiresAt ? new Date(clerkOrg.publicMetadata.trialExpiresAt) : null,
      updatedAt: new Date()
    };

    if (existingOrg.length === 0) {
      // Insert new organization
      await db.insert(organization).values({
        ...orgData,
        createdAt: new Date(clerkOrg.createdAt)
      });
    } else {
      // Update existing organization
      await db.update(organization)
        .set(orgData)
        .where(eq(organization.clerkId, clerkOrg.id));
    }
  } catch (error) {
    console.error('Error syncing organization:', error);
    throw error;
  }
}

export async function GET() {
  try {
    // Get the current user's auth context
    const session = await auth();
    const userId = session?.userId;
    const orgId = session?.orgId;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Initialize Clerk client
    const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

    // Get organizations from Clerk
    const clerkOrgs = await clerk.organizations.getOrganizationList();
    
    let dbOrgs = [];
    let dbError = null;
    
    try {
      // Sync each Clerk organization to our database
      for (const org of clerkOrgs.data) {
        await syncOrganizationToDb(org);
      }
      
      // Get updated organizations from our database
      dbOrgs = await db.select().from(organization);
    } catch (err) {
      console.error('Database error:', err);
      dbError = err instanceof Error ? err.message : 'Unknown database error';
    }

    return NextResponse.json({
      clerkOrganizations: clerkOrgs,
      databaseOrganizations: dbOrgs,
      databaseError: dbError,
      currentUserId: userId,
      currentOrgId: orgId
    });
  } catch (error: any) {
    console.error('Error fetching organizations:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch organizations',
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
} 