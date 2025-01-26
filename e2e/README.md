# End-to-End Tests

This directory contains Playwright-based end-to-end tests for complete user journeys.

## Test Structure

```
e2e/
├── auth/                           # Authentication flows
│   ├── login.spec.ts              # Login scenarios
│   ├── signup.spec.ts             # Signup scenarios
│   └── organization.spec.ts       # Organization management
├── scheduling/                     # Scheduling flows
│   ├── create-schedule.spec.ts    # Schedule creation
│   └── manage-shifts.spec.ts      # Shift management
├── employees/                      # Employee management
│   ├── add-employee.spec.ts       # Adding new employees
│   └── assign-shifts.spec.ts      # Shift assignments
├── clients/                        # Client management
│   ├── add-client.spec.ts         # Adding new clients
│   └── care-plans.spec.ts         # Care plan management
└── utils/                         # Test utilities
    ├── setup.ts                   # Global setup
    └── test-data.ts              # Test data helpers
```

## Guidelines

1. Group tests by feature domain
2. Use .spec.ts extension for E2E tests
3. Focus on complete user journeys
4. Test real user scenarios
5. Include error cases
6. Test across different viewports

## Running Tests

Note: E2E tests are currently disabled during the prototype phase.
They will be implemented when moving to production code.
