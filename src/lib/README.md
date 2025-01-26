# Library Directory

This directory contains core utilities, services, and shared code used throughout the application. It provides the foundation for the application's functionality.

## Directory Structure

- `hooks/` - Shared React hooks
- `utils/` - Utility functions and helpers
  - `error/` - Error handling utilities
  - `date/` - Date formatting and validation
  - `css/` - CSS and styling utilities
  - `testing/` - Test utilities
- `services/` - Core services
  - `analytics/` - Analytics service
  - `scheduling/` - Scheduling service
  - `tasks/` - Task management service
- `db/` - Database utilities and migrations
- `i18n/` - Internationalization utilities
- `timefold/` - Timefold.ai integration
- `clerk/` - Clerk.dev authentication utilities

## Core Services

### Analytics Service

Handles analytics data collection and reporting. See `services/analytics/` for implementation details.

### Scheduling Service

Manages schedule creation and optimization using Timefold.ai. See `services/scheduling/` for implementation details.

### Task Service

Handles task management and tracking. See `services/tasks/` for implementation details.

## Utilities

### Error Handling

- `ServiceError` class for service-level errors
- Error creation and formatting utilities
- Error boundary helpers

### Date Utilities

- Date formatting with Swedish locale
- Date validation helpers
- Date range utilities

### Testing Utilities

- Mock data generators
- Test helpers
- Common test utilities

## Best Practices

### Code Organization

- Keep utilities focused and pure
- Use TypeScript for type safety
- Document public APIs
- Add proper error handling
- Write unit tests

### Service Implementation

- Follow single responsibility principle
- Implement proper error handling
- Add logging and monitoring
- Document service interfaces
- Write comprehensive tests

### Database Access

- Use Drizzle ORM for type safety
- Follow migration best practices
- Implement proper connection pooling
- Add proper error handling
- See `db/README.md` for details

### Authentication

- Use Clerk.dev for auth
- Implement proper role management
- Follow security best practices
- Document auth flows
- Add proper error handling

## Adding New Code

1. Place code in appropriate subdirectory
2. Follow existing patterns and conventions
3. Add proper documentation
4. Write unit tests
5. Update this README if needed

## Examples

### Service Implementation

```typescript
// services/example/example-service.ts
import { ServiceError } from "@/lib/utils/error";

export class ExampleService {
  async getData(id: string) {
    try {
      // Implementation
    } catch (error) {
      throw ServiceError.fromError(error);
    }
  }
}
```

### Utility Function

```typescript
// utils/example/helpers.ts
/**
 * Helper function description
 * @param input - Input parameter description
 * @returns Output description
 */
export function helperFunction(input: string): string {
  // Implementation
}
```
