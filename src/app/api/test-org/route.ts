import { clerkClient } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
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
    // Get current session
    const session = await auth();
    const userId = session?.userId;
    const orgId = session?.orgId;

    console.log('Current user:', userId, 'Current org:', orgId);

    // Initialize arrays for organizations
    let clerkOrgs = [];
    let dbOrgs = [];
    let dbError = null;

    // Get organizations from Clerk
    try {
      clerkOrgs = await clerkClient.organizations.getOrganizationList();
    } catch (error: any) {
      console.error('Error fetching Clerk organizations:', error);
    }

    // Get organizations from database
    try {
      dbOrgs = await db.select().from(organization);
    } catch (error: any) {
      console.error('Error fetching database organizations:', error);
      dbError = error.message;
    }

    return NextResponse.json({
      currentUser: userId,
      currentOrg: orgId,
      clerkOrganizations: clerkOrgs,
      databaseOrganizations: dbOrgs,
      databaseError: dbError
    });
  } catch (error: any) {
    console.error('Error in test-org route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch organizations',
        details: error.message 
      }, 
      { status: 500 }
    );
  }
} 