'use client';

import { OrganizationList, useOrganizationList } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function OrganizationSelectionContent() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get('redirectUrl') ?? '/dashboard';
  const { isLoaded, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  // If user has no memberships, they can create a new org
  // If they have memberships, they can only join via invitation
  const canCreateOrganization = isLoaded && userMemberships.count === 0;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[800px] p-4">
        <h1 className="mb-6 text-center text-2xl font-bold">
          {canCreateOrganization 
            ? 'Skapa din organisation' 
            : 'Välj organisation'}
        </h1>
        <p className="mb-8 text-center text-muted-foreground">
          {canCreateOrganization 
            ? 'Skapa en ny organisation för att börja använda Caire' 
            : 'Du kan bara gå med i en organisation via inbjudan'}
        </p>
        <OrganizationList
          hidePersonal
          afterSelectOrganizationUrl={redirectUrl}
          afterCreateOrganizationUrl={redirectUrl}
          skipInvitationScreen
          createOrganizationMode={canCreateOrganization ? 'modal' : 'none'}
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'w-full shadow-none border border-border',
              organizationSwitcherTrigger: 'hidden',
              organizationPreview: !canCreateOrganization ? 'hidden' : undefined,
            },
          }}
        />
      </div>
    </div>
  );
} 