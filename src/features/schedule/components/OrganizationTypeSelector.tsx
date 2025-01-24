'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

export type OrganizationTypeSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function OrganizationTypeSelector({
  value,
  onChange,
}: OrganizationTypeSelectorProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3"
    >
      <div>
        <RadioGroupItem value="trial" id="trial" className="peer sr-only" />
        <Label
          htmlFor="trial"
          className={cn(
            'flex flex-col gap-2 rounded-lg border-2 border-muted p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple-600 [&:has([data-state=checked])]:border-purple-600 cursor-pointer',
            value === 'trial' && 'border-purple-600 ring-2 ring-purple-600',
          )}
        >
          <span className="text-lg font-semibold">Testorganisation</span>
          <span className="text-sm text-slate-600">Prova med exempeldata</span>
        </Label>
      </div>

      <div>
        <RadioGroupItem value="new" id="new" className="peer sr-only" />
        <Label
          htmlFor="new"
          className={cn(
            'flex flex-col gap-2 rounded-lg border-2 border-muted p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple-600 [&:has([data-state=checked])]:border-purple-600 cursor-pointer',
            value === 'new' && 'border-purple-600 ring-2 ring-purple-600',
          )}
        >
          <span className="text-lg font-semibold">Ny aktiv organisation</span>
          <span className="text-sm text-slate-600">Skapa nytt schema</span>
        </Label>
      </div>

      <div>
        <RadioGroupItem value="existing" id="existing" className="peer sr-only" />
        <Label
          htmlFor="existing"
          className={cn(
            'flex flex-col gap-2 rounded-lg border-2 border-muted p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple-600 [&:has([data-state=checked])]:border-purple-600 cursor-pointer',
            value === 'existing' && 'border-purple-600 ring-2 ring-purple-600',
          )}
        >
          <span className="text-lg font-semibold">Befintlig organisation</span>
          <span className="text-sm text-slate-600">Demodata</span>
        </Label>
      </div>
    </RadioGroup>
  );
}
