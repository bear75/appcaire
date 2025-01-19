import '@testing-library/jest-dom/vitest';

import { vi } from 'vitest';
import failOnConsole from 'vitest-fail-on-console';

failOnConsole({
  shouldFailOnDebug: true,
  shouldFailOnError: true,
  shouldFailOnInfo: true,
  shouldFailOnLog: true,
  shouldFailOnWarn: true,
});

// Set up environment variables for testing
process.env.BILLING_PLAN_ENV = 'test';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
    set: vi.fn(),
  }),
  usePathname: () => '/test',
}));

// Mock Clerk
vi.mock('@clerk/nextjs', () => ({
  useOrganization: () => ({
    organization: { id: 'test-org', name: 'Test Org' },
    isLoaded: true,
    isLoading: false,
  }),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:54321';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
