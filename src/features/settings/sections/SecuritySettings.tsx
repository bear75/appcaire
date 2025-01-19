import { Key, LockKeyhole, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';

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

export function SecuritySettings() {
  const t = useTranslations('Settings');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('security.title')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('security.description')}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="size-5" />
              {t('security.authentication.title')}
            </CardTitle>
            <CardDescription>
              {t('security.authentication.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="two_factor" className="flex flex-col space-y-1">
                <span>{t('security.authentication.two_factor')}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {t('security.authentication.two_factor_description')}
                </span>
              </Label>
              <Switch id="two_factor" />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label
                htmlFor="session_timeout"
                className="flex flex-col space-y-1"
              >
                <span>{t('security.authentication.session_timeout')}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {t('security.authentication.session_timeout_description')}
                </span>
              </Label>
              <Switch id="session_timeout" />
            </div>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="size-5" />
              {t('security.data_protection.title')}
            </CardTitle>
            <CardDescription>
              {t('security.data_protection.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="encryption" className="flex flex-col space-y-1">
                <span>{t('security.data_protection.encryption')}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {t('security.data_protection.encryption_description')}
                </span>
              </Label>
              <Switch id="encryption" defaultChecked disabled />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="audit_log" className="flex flex-col space-y-1">
                <span>{t('security.data_protection.audit_log')}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {t('security.data_protection.audit_log_description')}
                </span>
              </Label>
              <Switch id="audit_log" />
            </div>
          </CardContent>
        </Card>

        {/* Password Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockKeyhole className="size-5" />
              {t('security.password_policy.title')}
            </CardTitle>
            <CardDescription>
              {t('security.password_policy.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label
                htmlFor="strong_password"
                className="flex flex-col space-y-1"
              >
                <span>{t('security.password_policy.strong_password')}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {t('security.password_policy.strong_password_description')}
                </span>
              </Label>
              <Switch id="strong_password" defaultChecked />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label
                htmlFor="password_expiry"
                className="flex flex-col space-y-1"
              >
                <span>{t('security.password_policy.password_expiry')}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {t('security.password_policy.password_expiry_description')}
                </span>
              </Label>
              <Switch id="password_expiry" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="submit">{t('security.save')}</Button>
      </div>
    </div>
  );
}
