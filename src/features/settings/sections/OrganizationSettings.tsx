'use client';

import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslations } from '@/utils/translations';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { cn } from '@/lib/utils';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

const ICON_STYLES = 'size-4 text-purple-600';

export function OrganizationSettings() {
  const t = useTranslations('Settings');

  return (
    <PageContainer>
      <PageHeader
        title={t('organization.details.title')}
        description={t('organization.details.description')}
      />

      <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
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
          <form className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-slate-900">
                  {t('organization.details.name')}
                </Label>
                <Input
                  id="name"
                  placeholder={t('organization.details.name')}
                  className="bg-white border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="org_number" className="text-sm font-medium text-slate-900">
                  {t('organization.details.number')}
                </Label>
                <Input
                  id="org_number"
                  placeholder={t('organization.details.number')}
                  className="bg-white border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-900">
                  <span className="flex items-center gap-2">
                    <Mail className={ICON_STYLES} />
                    {t('organization.details.email')}
                  </span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('organization.details.email')}
                  className="bg-white border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-slate-900">
                  <span className="flex items-center gap-2">
                    <Phone className={ICON_STYLES} />
                    {t('organization.details.phone')}
                  </span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t('organization.details.phone')}
                  className="bg-white border-slate-200"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="text-sm font-medium text-slate-900">
                  <span className="flex items-center gap-2">
                    <MapPin className={ICON_STYLES} />
                    {t('organization.details.address')}
                  </span>
                </Label>
                <Textarea
                  id="address"
                  placeholder={t('organization.details.address')}
                  className="min-h-[100px] bg-white border-slate-200 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md"
              >
                {t('organization.save')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
