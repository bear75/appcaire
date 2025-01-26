'use client';

import { Car, Clock, GraduationCap, Timer } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/utils/i18n/translations';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

const ICON_STYLES = 'size-4 text-purple-600';

// Add type definitions for scheduling settings data
export type WorkingHoursSettings = {
  defaultStart: string;
  defaultEnd: string;
  allowWeekends: boolean;
};

export type ServiceDeliverySettings = {
  minDuration: number;
  maxDuration: number;
  travelBuffer: number;
};

export type QualificationSettings = {
  strictMatching: boolean;
  certificationWarnings: boolean;
};

export type ResourceSettings = {
  maxDailyDistance: number;
  maxContinuousDriving: number;
  optimizeRoutes: boolean;
};

export type SchedulingSettingsData = {
  workingHours: WorkingHoursSettings;
  serviceDelivery: ServiceDeliverySettings;
  qualifications: QualificationSettings;
  resources: ResourceSettings;
};

export type SchedulingSettingsProps = {
  initialData?: Partial<SchedulingSettingsData>;
  onSubmit?: (data: SchedulingSettingsData) => Promise<void>;
  className?: string;
};

const DEFAULT_INITIAL_DATA: Partial<SchedulingSettingsData> = {
  workingHours: {
    defaultStart: '08',
    defaultEnd: '17',
    allowWeekends: false,
  },
  serviceDelivery: {
    minDuration: 30,
    maxDuration: 120,
    travelBuffer: 15,
  },
  qualifications: {
    strictMatching: false,
    certificationWarnings: false,
  },
  resources: {
    maxDailyDistance: 200,
    maxContinuousDriving: 240,
    optimizeRoutes: true,
  },
};

export function SchedulingSettings({
  initialData = DEFAULT_INITIAL_DATA,
  onSubmit,
  className,
}: SchedulingSettingsProps) {
  const t = useTranslations('Settings');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      const formData = new FormData(e.currentTarget);
      await onSubmit({
        workingHours: {
          defaultStart: (formData.get('default_start') as string) || '08',
          defaultEnd: (formData.get('default_end') as string) || '17',
          allowWeekends: formData.get('weekend_scheduling') === 'on',
        },
        serviceDelivery: {
          minDuration: Number(formData.get('min_duration')) || 30,
          maxDuration: Number(formData.get('max_duration')) || 120,
          travelBuffer: Number(formData.get('travel_buffer')) || 15,
        },
        qualifications: {
          strictMatching: formData.get('strict_matching') === 'on',
          certificationWarnings:
            formData.get('certification_warnings') === 'on',
        },
        resources: {
          maxDailyDistance: Number(formData.get('max_daily_distance')) || 200,
          maxContinuousDriving:
            Number(formData.get('max_continuous_driving')) || 240,
          optimizeRoutes: formData.get('optimize_routes') === 'on',
        },
      });
    }
  };

  return (
    <div className={cn('flex-1 space-y-8 p-8 pt-6', className)}>
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold text-slate-900">
          {t('scheduling.title')}
        </h3>
        <p className="text-sm text-slate-600">{t('scheduling.description')}</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        {/* Working Hours */}
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Clock className={ICON_STYLES} />
              {t('scheduling.working_hours.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('scheduling.working_hours.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-900">
                  {t('scheduling.working_hours.default_start')}
                </Label>
                <Select
                  name="default_start"
                  defaultValue={initialData?.workingHours?.defaultStart || '08'}
                >
                  <SelectTrigger className="border-slate-200 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                        {i.toString().padStart(2, '0')}
                        :00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-900">
                  {t('scheduling.working_hours.default_end')}
                </Label>
                <Select
                  name="default_end"
                  defaultValue={initialData?.workingHours?.defaultEnd || '17'}
                >
                  <SelectTrigger className="border-slate-200 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                        {i.toString().padStart(2, '0')}
                        :00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Switch
                id="weekend_scheduling"
                name="weekend_scheduling"
                defaultChecked={initialData?.workingHours?.allowWeekends}
                className="data-[state=checked]:bg-purple-600"
              />
              <Label
                htmlFor="weekend_scheduling"
                className="text-sm font-medium text-slate-900"
              >
                {t('scheduling.working_hours.allow_weekends')}
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Service Delivery */}
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Timer className={ICON_STYLES} />
              {t('scheduling.service_delivery.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('scheduling.service_delivery.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-900">
                  {t('scheduling.service_delivery.min_duration')}
                </Label>
                <Input
                  name="min_duration"
                  type="number"
                  min="15"
                  step="15"
                  defaultValue={initialData?.serviceDelivery?.minDuration || 30}
                  className="border-slate-200 bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-900">
                  {t('scheduling.service_delivery.max_duration')}
                </Label>
                <Input
                  name="max_duration"
                  type="number"
                  min="30"
                  step="15"
                  defaultValue={
                    initialData?.serviceDelivery?.maxDuration || 120
                  }
                  className="border-slate-200 bg-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-900">
                {t('scheduling.service_delivery.travel_buffer')}
              </Label>
              <Input
                name="travel_buffer"
                type="number"
                min="5"
                step="5"
                defaultValue={initialData?.serviceDelivery?.travelBuffer || 15}
                className="border-slate-200 bg-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Qualifications */}
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <GraduationCap className={ICON_STYLES} />
              {t('scheduling.qualifications.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('scheduling.qualifications.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Switch
                id="strict_matching"
                name="strict_matching"
                defaultChecked={initialData?.qualifications?.strictMatching}
                className="data-[state=checked]:bg-purple-600"
              />
              <Label
                htmlFor="strict_matching"
                className="text-sm font-medium text-slate-900"
              >
                {t('scheduling.qualifications.strict_matching')}
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <Switch
                id="certification_warnings"
                name="certification_warnings"
                defaultChecked={
                  initialData?.qualifications?.certificationWarnings
                }
                className="data-[state=checked]:bg-purple-600"
              />
              <Label
                htmlFor="certification_warnings"
                className="text-sm font-medium text-slate-900"
              >
                {t('scheduling.qualifications.certification_warnings')}
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Resource Management */}
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Car className={ICON_STYLES} />
              {t('scheduling.resources.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('scheduling.resources.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-900">
                  {t('scheduling.resources.max_daily_distance')}
                </Label>
                <Input
                  name="max_daily_distance"
                  type="number"
                  min="0"
                  step="10"
                  defaultValue={initialData?.resources?.maxDailyDistance || 200}
                  className="border-slate-200 bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-900">
                  {t('scheduling.resources.max_continuous_driving')}
                </Label>
                <Input
                  name="max_continuous_driving"
                  type="number"
                  min="30"
                  step="30"
                  defaultValue={
                    initialData?.resources?.maxContinuousDriving || 240
                  }
                  className="border-slate-200 bg-white"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Switch
                id="optimize_routes"
                name="optimize_routes"
                defaultChecked={initialData?.resources?.optimizeRoutes}
                className="data-[state=checked]:bg-purple-600"
              />
              <Label
                htmlFor="optimize_routes"
                className="text-sm font-medium text-slate-900"
              >
                {t('scheduling.resources.optimize_routes')}
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-purple-600 text-white shadow-sm hover:bg-purple-700 hover:shadow-md"
          >
            {t('scheduling.save')}
          </Button>
        </div>
      </form>
    </div>
  );
}
