import { BILLING_INTERVAL, type PricingPlan } from '@/types/Subscription';

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
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise',
} as const;

export const PricingPlanList: Record<string, PricingPlan> = {
  [PLAN_ID.FREE]: {
    id: PLAN_ID.FREE,
    price: 0,
    interval: BILLING_INTERVAL.MONTH,
    testPriceId: '',
    devPriceId: '',
    prodPriceId: '',
    features: {
      teamMember: 2,
      website: 2,
      storage: 2,
      transfer: 2,
    },
  },
  [PLAN_ID.PREMIUM]: {
    id: PLAN_ID.PREMIUM,
    price: 79,
    interval: BILLING_INTERVAL.MONTH,
    testPriceId: 'price_premium_test',
    devPriceId: 'price_1PNksvKOp3DEwzQlGOXO7YBK',
    prodPriceId: '',
    features: {
      teamMember: 5,
      website: 5,
      storage: 5,
      transfer: 5,
    },
  },
  [PLAN_ID.ENTERPRISE]: {
    id: PLAN_ID.ENTERPRISE,
    price: 199,
    interval: BILLING_INTERVAL.MONTH,
    testPriceId: 'price_enterprise_test',
    devPriceId: 'price_1PNksvKOp3DEwzQli9IvXzgb',
    prodPriceId: '',
    features: {
      teamMember: 100,
      website: 100,
      storage: 100,
      transfer: 100,
    },
  },
};

export type PricingType = {
  id: string;
  name: string;
  href: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
  cta: string;
  interval: keyof typeof BILLING_INTERVAL;
  plan: PricingPlan;
};
