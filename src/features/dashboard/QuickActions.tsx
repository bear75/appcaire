'use client';

import { CalendarIcon, GearIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function QuickActions() {
  const t = useTranslations('QuickActions');

  const actions = [
    {
      icon: CalendarIcon,
      label: t('view_schedule'),
      href: '/dashboard/schedule',
    },
    {
      icon: PersonIcon,
      label: t('manage_employees'),
      href: '/dashboard/employees',
    },
    {
      icon: HomeIcon,
      label: t('manage_clients'),
      href: '/dashboard/clients',
    },
    {
      icon: GearIcon,
      label: t('settings'),
      href: '/dashboard/settings',
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t('quick_actions')}</h2>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            {t('quick_actions')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {actions.map(action => (
              <Button
                key={action.href}
                variant="outline"
                asChild
                className="h-auto justify-start gap-2 px-4 py-3"
              >
                <Link href={action.href}>
                  <action.icon className="size-5" />
                  {action.label}
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
