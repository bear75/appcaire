'use client';

import { Car, Grid, List } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/utils/i18n/translations';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200 cursor-pointer',
  small: 'hover:scale-[1.02]',
  large: 'hover:scale-[1.01]',
  grid: 'grid',
  list: 'list',
};

export function VehicleDirectory() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const router = useRouter();
  const t = useTranslations('Vehicles');

  const handleVehicleClick = (id: string) => {
    router.push(`/dashboard/vehicles/${id}`);
  };

  const handleKeyPress
    = (vehicleId: string) => (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        handleVehicleClick(vehicleId);
      }
    };

  return (
    <Card className="mt-6">
      <Tabs
        defaultValue={view}
        onValueChange={v => setView(v as 'grid' | 'list')}
      >
        <div className="flex items-center justify-between border-b p-4">
          <TabsList className="grid w-[200px] grid-cols-2">
            <TabsTrigger value="grid">
              <Grid className="mr-2 size-4" />
              {t('views.grid')}
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="mr-2 size-4" />
              {t('views.list')}
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Car className="size-4" />
              {t('actions.add_vehicle')}
            </Button>
          </div>
        </div>

        <TabsContent value="grid" className="m-0">
          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Vehicle cards will be mapped here */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleVehicleClick('abc123')}
              onKeyDown={handleKeyPress('abc123')}
              className={cn(CARD_STYLES.base, CARD_STYLES.grid)}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold">Volvo XC40</h3>
                <p className="mt-2 text-sm text-slate-600">ABC123</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    {t('status.available')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list" className="m-0">
          <div className="p-4">
            {/* Vehicle list will be rendered here */}
            <div className="divide-y divide-slate-100">
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleVehicleClick('abc123')}
                onKeyDown={handleKeyPress('abc123')}
                className={cn(CARD_STYLES.base, CARD_STYLES.list)}
              >
                <div>
                  <h3 className="font-medium">Volvo XC40</h3>
                  <p className="text-sm text-slate-600">ABC123</p>
                </div>
                <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                  {t('status.available')}
                </span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
