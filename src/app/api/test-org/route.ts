import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const organizations = await clerkClient.organizations.getOrganizationList();
    return NextResponse.json({ organizations });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch organizations', details: error.message },
      { status: 500 },
    );
  }
}
