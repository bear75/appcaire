'use client';

import { useParams } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/utils/i18n/translations';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

// Mock data - replace with actual data fetching
const mockVehicle = {
  id: 'abc123',
  name: 'Volvo XC40',
  registration: 'ABC123',
  type: 'SUV',
  status: 'available',
};

export function VehicleProfile() {
  const { _vehicleId } = useParams();
  const t = useTranslations('Vehicles');

  return (
    <div className="space-y-6">
      <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
        <CardHeader>
          <CardTitle>{mockVehicle.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-slate-600">{mockVehicle.registration}</p>
            <p className="text-sm text-slate-600">{t('status.available')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
