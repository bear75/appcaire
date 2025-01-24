'use client';

import { Calendar, Settings, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function ExampleScheduleHeader() {
  return (
    <Card className="bg-gradient-to-br from-slate-50 to-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-900">Schema</h2>
          </div>
          <p className="text-sm text-slate-600">Översikt över verksamhetens schemaläggning</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Users className="size-4" />
            Personal
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="size-4" />
            Inställningar
          </Button>
        </div>
      </div>
    </Card>
  );
}
