import { useOrganizationList } from '@clerk/nextjs';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslations } from '@/utils/translations';

interface Organization {
  id: string;
  name: string;
}

interface OrganizationMembership {
  organization: Organization;
}

export function MultiOrgAnalytics() {
  const { userMemberships, isLoaded } = useOrganizationList();
  const [selectedOrgs, setSelectedOrgs] = useState<string[]>([]);
  const t = useTranslations('Analytics');

  if (!isLoaded) return null;

  const organizationList = userMemberships.data || [];

  const toggleOrg = (orgId: string) => {
    setSelectedOrgs(prev =>
      prev.includes(orgId)
        ? prev.filter(id => id !== orgId)
        : [...prev, orgId],
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('multi_org.title')}</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">{t('multi_org.select_orgs')}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('multi_org.select_orgs')}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {organizationList.map((membership: OrganizationMembership) => (
                  <div
                    key={membership.organization.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={membership.organization.id}
                      checked={selectedOrgs.includes(membership.organization.id)}
                      onCheckedChange={() => toggleOrg(membership.organization.id)}
                    />
                    <label
                      htmlFor={membership.organization.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {membership.organization.name}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {selectedOrgs.length === 0 ? (
        <p>{t('multi_org.no_selection')}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {selectedOrgs.map(orgId => {
            const membership = organizationList.find(
              (m: OrganizationMembership) => m.organization.id === orgId,
            );
            const org = membership?.organization;
            if (!org) return null;

            return (
              <Card key={orgId} className="p-4">
                <h3 className="font-semibold">{org.name}</h3>
                {/* Add your analytics components here */}
                {/* Example: */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>{t('metrics.total_clients')}</span>
                    <span>342</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('metrics.active_employees')}</span>
                    <span>45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('metrics.schedule_efficiency')}</span>
                    <span>68%</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
} 