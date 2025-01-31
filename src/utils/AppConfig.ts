import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/routing/types';

const localePrefix: LocalePrefix = 'always';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'caire',
  site_name: 'caire',
  title: 'Caire - AI-Driven Schemaläggning för hemtjänst',
  description:
    'Optimera din hemtjänst med AI-driven schemaläggning. Hantera personal, klienter och scheman effektivt.',
  locales: [
    {
      id: 'sv',
      name: 'Svenska',
    },
    { id: 'en', name: 'English' },
  ] as const,
  defaultLocale: 'sv',
  localePrefix,
  /** the second parameter is the default value if the environment variable is not found */
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
} as const;

export const AllLocales = AppConfig.locales.map(locale => locale.id);

export const PLAN_ID = {
  FREE: 'free',
  STARTER: 'starter',
  PRO: 'pro',
} as const;

export const PricingPlanList = [
  {
    id: PLAN_ID.FREE,
    price: 0,
    interval: 'month',
    features: {
      teamMember: 1,
      website: 1,
      storage: 1,
      transfer: 1,
    },
  },
  {
    id: PLAN_ID.STARTER,
    price: 99,
    interval: 'month',
    features: {
      teamMember: 5,
      website: 5,
      storage: 10,
      transfer: 10,
    },
  },
  {
    id: PLAN_ID.PRO,
    price: 199,
    interval: 'month',
    features: {
      teamMember: 10,
      website: 10,
      storage: 25,
      transfer: 25,
    },
  },
] as const;
