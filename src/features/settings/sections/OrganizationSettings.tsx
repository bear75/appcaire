import { useTranslations } from '@/utils/translations';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function OrganizationSettings() {
  const t = useTranslations('Settings');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('organization.title')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('organization.description')}
        </p>
      </div>

      <form className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">{t('organization.fields.name')}</Label>
            <Input
              id="name"
              placeholder={t('organization.placeholders.name')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="org_number">
              {t('organization.fields.org_number')}
            </Label>
            <Input
              id="org_number"
              placeholder={t('organization.placeholders.org_number')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('organization.fields.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('organization.placeholders.email')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t('organization.fields.phone')}</Label>
            <Input
              id="phone"
              type="tel"
              placeholder={t('organization.placeholders.phone')}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">{t('organization.fields.address')}</Label>
            <Textarea
              id="address"
              placeholder={t('organization.placeholders.address')}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">{t('organization.save')}</Button>
        </div>
      </form>
    </div>
  );
}
