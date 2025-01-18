// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'Caire',
  site_name: 'Caire',
  title: 'Caire - AI-Driven Home Care Scheduling',
  description:
    'Optimize your home care scheduling with AI-driven solutions. Manage staff, clients, and schedules efficiently.',
  locales: [
    { id: 'sv', name: 'Svenska' },
    { id: 'en', name: 'English' },
  ] as const,
  defaultLocale: 'sv',
  locale: 'sv',
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
