'use client';

import {
  BarChartIcon,
  CalendarIcon,
  GearIcon,
  HomeIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Link } from '@/libs/i18nNavigation';
import { cn } from '@/utils/Helpers';

const navigation = [
  {
    icon: HomeIcon,
    href: '/dashboard',
    translationKey: 'dashboard',
  },
  {
    icon: CalendarIcon,
    href: '/dashboard/schedule',
    translationKey: 'schedule',
  },
  {
    icon: PersonIcon,
    href: '/dashboard/employees',
    translationKey: 'employees',
  },
  {
    icon: HomeIcon,
    href: '/dashboard/clients',
    translationKey: 'clients',
  },
  {
    icon: BarChartIcon,
    href: '/dashboard/analytics',
    translationKey: 'analytics',
  },
  {
    icon: GearIcon,
    href: '/dashboard/settings',
    translationKey: 'settings',
  },
];

export function Sidebar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-64 border-r bg-background">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            {/* Add your logo here */}
            <span className="text-lg font-semibold">Caire</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                  isActive
                    ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                    : 'text-muted-foreground',
                )}
              >
                <item.icon
                  className={cn('size-4', isActive && 'text-inherit')}
                  aria-hidden="true"
                />
                {t(item.translationKey)}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
