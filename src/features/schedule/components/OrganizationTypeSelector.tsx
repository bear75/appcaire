'use client';

import { Check } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTranslations } from '@/utils/translations';

type OrganizationTypeSelectorProps = {
  value: 'trial' | 'new' | 'existing';
  onChange: (value: 'trial' | 'new' | 'existing') => void;
};

export function OrganizationTypeSelector({ value, onChange }: OrganizationTypeSelectorProps) {
  const t = useTranslations('Schedule');

  return (
    <RadioGroup
      value={value}
      onValueChange={onChange as (value: string) => void}
      className="grid grid-cols-1 gap-4 md:grid-cols-3"
    >
      {[
        {
          id: 'trial',
          title: 'Testorganisation',
          description: 'Prova med exempeldata',
          icon: '🔬',
        },
        {
          id: 'new',
          title: 'Ny aktiv organisation',
          description: 'Skapa nytt schema',
          icon: '✨',
        },
        {
          id: 'existing',
          title: 'Befintlig organisation',
          description: 'Demodata',
          icon: '📊',
        },
      ].map(option => (
        <Card
          key={option.id}
          className={`group relative cursor-pointer overflow-hidden border-2 p-6 transition-all duration-300
            ${value === option.id
          ? 'border-purple-600 bg-purple-50/50 shadow-lg ring-2 ring-purple-600 ring-offset-2'
          : 'border-slate-200 bg-white hover:border-purple-200 hover:bg-purple-50/30 hover:shadow-lg'
        }
            hover:-translate-y-1 hover:scale-[1.02]
            active:scale-[0.98] active:shadow-sm
          `}
        >
          <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
          <Label htmlFor={option.id} className="flex cursor-pointer flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl" role="img" aria-label={option.title}>
                {option.icon}
              </span>
              {value === option.id && (
                <span className="rounded-full bg-purple-600 p-1 text-white">
                  <Check className="size-4" />
                </span>
              )}
            </div>
            <div className="space-y-1">
              <span className="block text-lg font-semibold text-slate-900">
                {option.title}
              </span>
              <span className="block text-sm text-slate-600">
                {option.description}
              </span>
            </div>
          </Label>
          {/* 3D effect overlay */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent to-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Card>
      ))}
    </RadioGroup>
  );
}
