import { clerkClient } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { organizationId } = await req.json();
    
    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    const organization = await clerkClient.organizations.updateOrganization(organizationId, {
      publicMetadata: {
        status: 'TRIAL',
        trialStartDate: new Date().toISOString(),
        trialExpirationDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days
      },
    });

    return NextResponse.json({ organization });
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Failed to set organization metadata',
        details: error.message,
        organizationId: req.body?.organizationId 
      }, 
      { status: 500 }
    );
  }
}
