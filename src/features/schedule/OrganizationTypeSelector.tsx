import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export interface OrganizationTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function OrganizationTypeSelector({
  value,
  onChange,
}: OrganizationTypeSelectorProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
    >
      <Card className="relative p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 data-[state=checked]:border-purple-600 data-[state=checked]:ring-2 data-[state=checked]:ring-purple-600">
        <RadioGroupItem value="trial" id="trial" className="sr-only" />
        <Label htmlFor="trial" className="flex flex-col gap-2 cursor-pointer">
          <span className="text-lg font-semibold">Testorganisation</span>
          <span className="text-sm text-slate-600">Prova med exempeldata</span>
        </Label>
      </Card>

      <Card className="relative p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 data-[state=checked]:border-purple-600 data-[state=checked]:ring-2 data-[state=checked]:ring-purple-600">
        <RadioGroupItem value="new" id="new" className="sr-only" />
        <Label htmlFor="new" className="flex flex-col gap-2 cursor-pointer">
          <span className="text-lg font-semibold">Ny aktiv organisation</span>
          <span className="text-sm text-slate-600">Skapa nytt schema</span>
        </Label>
      </Card>

      <Card className="relative p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 data-[state=checked]:border-purple-600 data-[state=checked]:ring-2 data-[state=checked]:ring-purple-600">
        <RadioGroupItem value="existing" id="existing" className="sr-only" />
        <Label htmlFor="existing" className="flex flex-col gap-2 cursor-pointer">
          <span className="text-lg font-semibold">Befintlig organisation</span>
          <span className="text-sm text-slate-600">Demodata</span>
        </Label>
      </Card>
    </RadioGroup>
  );
} 