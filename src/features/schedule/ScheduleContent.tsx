'use client';

import { Calendar, Plus, Users } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslations } from '@/utils/translations';

import { OrganizationTypeSelector } from './components/OrganizationTypeSelector';
import ImportWizard from './ImportWizard/index';
import ScheduleView from './ScheduleView';

function ScheduleContent() {
  const t = useTranslations('Schedule');
  const [orgType, setOrgType] = useState<'trial' | 'new' | 'existing'>('trial');
  const [hasImportedSchedule, setHasImportedSchedule] = useState(false);

  const renderContent = () => {
    switch (orgType) {
      case 'trial':
        if (!hasImportedSchedule) {
          return (
            <ImportWizard
              onImportComplete={() => setHasImportedSchedule(true)}
            />
          );
        }
        return <ScheduleView />;

      case 'new':
        return (
          <Card className="mx-auto max-w-2xl p-8">
            <div className="text-center">
              <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                Skapa nytt schema
              </h2>
              <p className="mb-8 text-slate-600">
                Börja med att lägga till personal och klienter för att skapa ett nytt schema från grunden
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Button
                variant="outline"
                size="lg"
                className="flex h-auto flex-col gap-3 p-6 hover:border-purple-200 hover:bg-purple-50/30"
              >
                <Users className="size-8 text-purple-600" />
                <div>
                  <div className="font-semibold">Lägg till personal</div>
                  <div className="text-sm text-slate-600">
                    Hantera vårdgivare och deras tillgänglighet
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="flex h-auto flex-col gap-3 p-6 hover:border-purple-200 hover:bg-purple-50/30"
              >
                <Calendar className="size-8 text-purple-600" />
                <div>
                  <div className="font-semibold">Lägg till klienter</div>
                  <div className="text-sm text-slate-600">
                    Hantera klienter och deras vårdscheman
                  </div>
                </div>
              </Button>
            </div>

            <div className="mt-6">
              <Button
                className="w-full bg-purple-600 text-white hover:bg-purple-700"
                size="lg"
                disabled
              >
                <Plus className="mr-2 size-4" />
                Skapa schema
              </Button>
              <p className="mt-2 text-center text-sm text-slate-600">
                Lägg till personal och klienter först för att skapa schema
              </p>
            </div>
          </Card>
        );

      case 'existing':
        return <ScheduleView showConstraints />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <OrganizationTypeSelector
        value={orgType}
        onChange={setOrgType}
      />
      {renderContent()}
    </div>
  );
}

export default ScheduleContent;
