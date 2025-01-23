'use client';

import { Key, LockKeyhole, Shield } from 'lucide-react';
import { useTranslations } from '@/utils/translations';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { PageContainer, PageHeader } from '@/components/shared';
import { cn } from '@/lib/utils';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

const ICON_STYLES = 'size-4 text-purple-600';

export function SecuritySettings() {
  const t = useTranslations('Settings');

  return (
    <PageContainer>
      <PageHeader
        title={t('security.title')}
        description={t('security.description')}
      />

      <div className="grid gap-6">
        {/* Authentication */}
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Key className={ICON_STYLES} />
              {t('security.authentication.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('security.authentication.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="two_factor" className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-slate-900">{t('security.authentication.two_factor')}</span>
                <span className="text-sm text-slate-600">
                  {t('security.authentication.two_factor_description')}
                </span>
              </Label>
              <Switch id="two_factor" className="data-[state=checked]:bg-purple-600" />
            </div>

            <div className="flex items-center justify-between space-x-4">
              <Label
                htmlFor="session_timeout"
                className="flex flex-col space-y-1"
              >
                <span className="text-sm font-medium text-slate-900">{t('security.authentication.session_timeout')}</span>
                <span className="text-sm text-slate-600">
                  {t('security.authentication.session_timeout_description')}
                </span>
              </Label>
              <Switch id="session_timeout" className="data-[state=checked]:bg-purple-600" />
            </div>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Shield className={ICON_STYLES} />
              {t('security.data_protection.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('security.data_protection.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="encryption" className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-slate-900">{t('security.data_protection.encryption')}</span>
                <span className="text-sm text-slate-600">
                  {t('security.data_protection.encryption_description')}
                </span>
              </Label>
              <Switch 
                id="encryption" 
                defaultChecked 
                disabled 
                className="data-[state=checked]:bg-purple-600 data-[disabled]:opacity-50"
              />
            </div>

            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="audit_log" className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-slate-900">{t('security.data_protection.audit_log')}</span>
                <span className="text-sm text-slate-600">
                  {t('security.data_protection.audit_log_description')}
                </span>
              </Label>
              <Switch id="audit_log" className="data-[state=checked]:bg-purple-600" />
            </div>
          </CardContent>
        </Card>

        {/* Password Policy */}
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <LockKeyhole className={ICON_STYLES} />
              {t('security.password_policy.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('security.password_policy.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-4">
              <Label
                htmlFor="strong_password"
                className="flex flex-col space-y-1"
              >
                <span className="text-sm font-medium text-slate-900">{t('security.password_policy.strong_password')}</span>
                <span className="text-sm text-slate-600">
                  {t('security.password_policy.strong_password_description')}
                </span>
              </Label>
              <Switch id="strong_password" defaultChecked className="data-[state=checked]:bg-purple-600" />
            </div>

            <div className="flex items-center justify-between space-x-4">
              <Label
                htmlFor="password_expiry"
                className="flex flex-col space-y-1"
              >
                <span className="text-sm font-medium text-slate-900">{t('security.password_policy.password_expiry')}</span>
                <span className="text-sm text-slate-600">
                  {t('security.password_policy.password_expiry_description')}
                </span>
              </Label>
              <Switch id="password_expiry" className="data-[state=checked]:bg-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md"
        >
          {t('security.save')}
        </Button>
      </div>
    </PageContainer>
  );
}
