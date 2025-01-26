import '@testing-library/jest-dom';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

import MockNextImage from './mocks/next-image';

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock Next.js image
vi.mock('next/image', () => ({
  default: MockNextImage,
}));

// Mock Clerk authentication
vi.mock('@clerk/nextjs', () => ({
  auth: () => ({
    userId: 'test-user-id',
    orgId: 'test-org-id',
  }),
  currentUser: () => ({
    id: 'test-user-id',
    firstName: 'Test',
    lastName: 'User',
    emailAddresses: [{ emailAddress: 'test@example.com' }],
  }),
  clerkClient: {
    users: {
      getUser: () => ({
        id: 'test-user-id',
        firstName: 'Test',
        lastName: 'User',
      }),
    },
    organizations: {
      getOrganization: () => ({
        id: 'test-org-id',
        name: 'Test Org',
      }),
    },
  },
}));
