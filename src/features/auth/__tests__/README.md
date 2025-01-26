# Auth Feature Integration Tests

This directory contains integration tests for the authentication feature flows.

## Test Structure

```
auth/
├── __tests__/                    # Integration tests directory
│   ├── flows/                    # Complete user flows
│   │   ├── login-flow.test.tsx   # Login process tests
│   │   ├── signup-flow.test.tsx  # Signup process tests
│   │   └── org-flow.test.tsx     # Organization creation flow tests
│   ├── components/               # Component integration tests
│   │   ├── login-form.test.tsx   # Login form integration
│   │   └── org-form.test.tsx     # Organization form integration
│   └── utils/                    # Test utilities specific to auth
│       └── auth-test-utils.ts    # Auth-specific test helpers
```

## Guidelines

1. Place integration tests in `__tests__` directory
2. Group tests by flows and components
3. Keep auth-specific test utilities in utils/
4. Use descriptive test names
5. Focus on user interactions and workflows
6. Test error states and edge cases

## Running Tests

Note: These tests are currently disabled as we're using a UI prototype.
They will be implemented when moving from prototype to production code.
