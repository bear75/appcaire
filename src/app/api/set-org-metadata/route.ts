import { auth } from '@clerk/nextjs/server';
import { createClerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { organizationId } = await request.json();

    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    console.log('Setting metadata for organization:', organizationId);

    // Initialize Clerk client
    const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

    // Set the metadata
    const updatedOrg = await clerk.organizations.updateOrganization(organizationId, {
      publicMetadata: {
        status: 'trial',
        trialStartedAt: new Date().toISOString(),
        trialExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      }
    });

    return NextResponse.json({ 
      success: true, 
      organization: updatedOrg 
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update organization: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
