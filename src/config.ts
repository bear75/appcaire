import type { Pathnames } from 'next-intl/navigation';

export const locales = ['sv', 'en'] as const;

export type Locale = (typeof locales)[number];

export const pathnames = {
  '/': '/',
  '/dashboard': '/dashboard',
  '/dashboard/schedule': '/dashboard/schedule',
  '/dashboard/employees': '/dashboard/employees',
  '/dashboard/clients': '/dashboard/clients',
  '/dashboard/settings': '/dashboard/settings',
  '/dashboard/analytics': '/dashboard/analytics',
  '/dashboard/organization-profile': '/dashboard/organization-profile',
  '/dashboard/user-profile': '/dashboard/user-profile',
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
