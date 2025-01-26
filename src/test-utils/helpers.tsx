import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';

// Custom render function that includes providers if needed
function render(ui: ReactElement, options = {}) {
  return {
    ...rtlRender(ui, options),
    user: userEvent.setup(),
  };
}

// Helper to create a mock organization
function mockOrganization(overrides = {}) {
  return {
    id: 'test-org-id',
    name: 'Test Organization',
    slug: 'test-org',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

// Helper to create a mock user
function mockUser(overrides = {}) {
  return {
    id: 'test-user-id',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    role: 'admin',
    organizationId: 'test-org-id',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

// Helper to create a mock employee
function mockEmployee(overrides = {}) {
  return {
    id: 'test-employee-id',
    firstName: 'Test',
    lastName: 'Employee',
    email: 'employee@example.com',
    role: 'care_assistant',
    organizationId: 'test-org-id',
    status: 'active',
    skills: ['medicin', 'sårvård'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

// Helper to create a mock client
function mockClient(overrides = {}) {
  return {
    id: 'test-client-id',
    firstName: 'Test',
    lastName: 'Client',
    email: 'client@example.com',
    organizationId: 'test-org-id',
    status: 'active',
    carePlan: {
      id: 'test-care-plan-id',
      name: 'Standard Care Plan',
      description: 'Basic care needs',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export { mockClient, mockEmployee, mockOrganization, mockUser, render };
