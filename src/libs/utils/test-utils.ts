import { vi } from 'vitest';

export const mockSupabase = () => ({
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn().mockReturnThis(),
  gte: vi.fn().mockReturnThis(),
  lte: vi.fn().mockReturnThis(),
});

export const mockCache = () => ({
  get: vi.fn(),
  set: vi.fn(),
  delete: vi.fn(),
});

export const mockLogger = () => ({
  info: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn(),
});

export const mockMonitoring = () => ({
  captureError: vi.fn(),
  captureMessage: vi.fn(),
});

export const createTestData = {
  generic: <T>(data: T) => ({
    data,
    error: null,
  }),
  employee: (overrides = {}) => ({
    id: 'test-employee-id',
    name: 'Test Employee',
    email: 'test@example.com',
    organization_id: 'test-org-id',
    skills: ['skill1', 'skill2'],
    availability: [
      {
        start: new Date('2024-01-01T09:00:00Z'),
        end: new Date('2024-01-01T17:00:00Z'),
      },
    ],
    ...overrides,
  }),
};

export const resetMocks = () => {
  vi.clearAllMocks();
};
