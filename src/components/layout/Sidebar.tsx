'use client';

import { cn, getI18nPath } from '@/lib/utils/helpers/utils';
import {
  BarChartIcon,
  CalendarIcon,
  GearIcon,
  HomeIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo } from '@/templates/Logo';

const navigation = [
  {
    icon: HomeIcon,
    href: '/dashboard',
    label: 'Översikt',
  },
  {
    icon: CalendarIcon,
    href: '/dashboard/schedule',
    label: 'Schema',
  },
  {
    icon: PersonIcon,
    href: '/dashboard/employees',
    label: 'Personal',
  },
  {
    icon: HomeIcon,
    href: '/dashboard/clients',
    label: 'Klienter',
  },
  {
    icon: BarChartIcon,
    href: '/dashboard/analytics',
    label: 'Analys',
  },
  {
    icon: GearIcon,
    href: '/dashboard/settings',
    label: 'Inställningar',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-64 border-r bg-background">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard">
            <Logo />
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
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
