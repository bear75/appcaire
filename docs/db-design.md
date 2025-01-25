# Database Design

## Overview
This document outlines the database schema and setup for the Caire platform, focusing on scheduling and organization management.

## Project Structure
```
📦 src/lib/db
 ├ 📂 schema
 │  ├ 📜 tables.ts        # Core table definitions
 │  ├ 📜 types.ts         # Shared types and enums
 │  └ 📜 index.ts         # Schema exports
 ├ 📂 migrations
 │  └ 📜 index.ts         # Migration utilities
 ├ 📜 client.ts           # Database client setup
 └ 📜 index.ts            # Main database exports

📦 drizzle
 ├ 📂 meta               # Migration metadata
 │  └ 📜 _journal.json
 └ 📂 migrations         # Generated migrations
    └ 📜 *.sql
```

## Configuration
The database is configured using Drizzle ORM with PostgreSQL. Configuration is managed in `drizzle.config.ts`:

```typescript
import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/db/schema/*.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

## Database Commands
```bash
# Generate migrations
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Test database setup
pnpm db:test
```

## Tables

### Organization
The core table for multi-tenant functionality.

```typescript
export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  trialExpirationDate: timestamp('trial_expiration_date', { withTimezone: true }),
  status: text('status').default('ACTIVE'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
});
```

Key features:
- UUID-based primary key
- Trial period tracking
- Status tracking (ACTIVE, SUSPENDED)
- Automatic timestamps
- Row Level Security enabled for multi-tenant isolation

### Schedules
Stores schedule entries for both manual and optimized schedules.

```sql
CREATE TABLE schedules (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES organization(id),
    client_id uuid NOT NULL,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    status text DEFAULT 'DRAFT'::text,
    schedule_type text NOT NULL,
    ecare_task_id text,
    timefold_score text,
    optimization_metrics jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
```

Key features:
- Supports both manual and AI-optimized schedules
- Tracks optimization metrics and scores
- Links to eCare tasks when imported
- Status tracking (DRAFT, PUBLISHED, ARCHIVED)

### Schedule Assignments
Links schedules to employees, supporting multiple employees per visit.

```sql
CREATE TABLE schedule_assignments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    schedule_id uuid NOT NULL REFERENCES schedules(id),
    employee_id uuid NOT NULL,
    assignment_type text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
```

Key features:
- Enables multiple employees per schedule entry
- Tracks assignment types
- Maintains relationship history

### Visit Requirements
Stores requirements for client visits.

```sql
CREATE TABLE visit_requirements (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id uuid NOT NULL,
    required_employee_count integer DEFAULT 1,
    ecare_visit_type text,
    ecare_requirements jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
```

Key features:
- Specifies number of employees needed
- Stores eCare-specific requirements
- Flexible requirements storage using JSONB

## Security

### Row Level Security
All tables implement Row Level Security (RLS) policies using Drizzle's policy builder:

```typescript
export const organizationPolicy = policy(auth => ({
  organization_id: equals(auth.organization_id)
}));
```

### Automatic Updates
Timestamps are handled automatically by Drizzle:

```typescript
export const baseColumns = {
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
};
```

## Migrations
Migrations are managed using Drizzle Kit:
1. Schema changes are made in TypeScript files
2. Run `pnpm db:generate` to create migration files
3. Review generated SQL in `./drizzle/migrations`
4. Apply migrations using `pnpm db:migrate`

## Best Practices
1. Always use TypeScript for schema definitions
2. Generate migrations for all schema changes
3. Test migrations locally before deployment
4. Use prepared statements for queries
5. Implement proper error handling
6. Follow naming conventions:
   - Table names: plural, snake_case
   - Column names: camelCase in TypeScript, snake_case in DB
   - Foreign keys: entityName_id format

## Development Workflow
1. Make schema changes in TypeScript files
2. Generate and review migrations
3. Test locally with `pnpm db:test`
4. Commit both schema and migration files
5. Deploy with zero-downtime migration strategy

## Indexes
Key indexes for performance optimization:
- Primary keys (UUID-based)
- Foreign keys for relationships
- Composite indexes for common queries
- Temporal indexes on schedule dates

## Data Types
- UUIDs for primary keys
- Timestamps with time zone for all temporal data
- JSONB for flexible data storage
- Text for enumerated values with constraints
