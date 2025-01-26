'use client';

import { Building2, Mail, MapPin, Phone } from 'lucide-react';

import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
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
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/utils/i18n/translations';

// Add type definitions for organization form data
export type OrganizationFormData = {
  name: string;
  orgNumber: string;
  email: string;
  phone: string;
  address: string;
};

export type OrganizationSettingsProps = {
  initialData?: Partial<OrganizationFormData>;
  onSubmit?: (data: OrganizationFormData) => Promise<void>;
  className?: string;
};

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

const ICON_STYLES = 'size-4 text-purple-600';

const DEFAULT_INITIAL_DATA: Partial<OrganizationFormData> = {};

export function OrganizationSettings({
  initialData = DEFAULT_INITIAL_DATA,
  onSubmit,
  className,
}: OrganizationSettingsProps) {
  const t = useTranslations('Settings');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      const formData = new FormData(e.currentTarget);
      await onSubmit({
        name: formData.get('name') as string,
        orgNumber: formData.get('org_number') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
      });
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title={t('organization.details.title')}
        description={t('organization.details.description')}
      />

      <Card className={cn(CARD_STYLES.base, CARD_STYLES.large, className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <Building2 className={ICON_STYLES} />
            {t('organization.details.title')}
          </CardTitle>
          <CardDescription className="text-sm text-slate-600">
            {t('organization.details.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-900"
                >
                  {t('organization.details.name')}
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={initialData.name}
                  placeholder={t('organization.details.name_placeholder')}
                  className="border-slate-200 bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="org_number"
                  className="text-sm font-medium text-slate-900"
                >
                  {t('organization.details.org_number')}
                </Label>
                <Input
                  id="org_number"
                  name="org_number"
                  defaultValue={initialData.orgNumber}
                  placeholder={t('organization.details.org_number_placeholder')}
                  className="border-slate-200 bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-900"
                >
                  <span className="flex items-center gap-2">
                    <Mail className={ICON_STYLES} />
                    {t('organization.details.email')}
                  </span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={initialData.email}
                  placeholder={t('organization.details.email_placeholder')}
                  className="border-slate-200 bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-slate-900"
                >
                  <span className="flex items-center gap-2">
                    <Phone className={ICON_STYLES} />
                    {t('organization.details.phone')}
                  </span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={initialData.phone}
                  placeholder={t('organization.details.phone_placeholder')}
                  className="border-slate-200 bg-white"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="address"
                  className="text-sm font-medium text-slate-900"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className={ICON_STYLES} />
                    {t('organization.details.address')}
                  </span>
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  defaultValue={initialData.address}
                  placeholder={t('organization.details.address_placeholder')}
                  className="min-h-[100px] resize-none border-slate-200 bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-purple-600 text-white shadow-sm hover:bg-purple-700 hover:shadow-md"
              >
                {t('save')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
