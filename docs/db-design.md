# Database Design

## Overview
This document outlines the database schema and setup for the Caire platform, focusing on scheduling and organization management with Clerk integration.

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
  clerkId: text('clerk_id').notNull().unique(),
  name: text('name').notNull(),
  status: text('status', { enum: ['TRIAL', 'ACTIVE', 'SUSPENDED', 'EXPIRED'] }).default('TRIAL'),
  trialStartDate: timestamp('trial_start_date', { withTimezone: true }).defaultNow(),
  trialExpirationDate: timestamp('trial_expiration_date', { withTimezone: true }),
  subscriptionId: text('subscription_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
});
```

Key features:
- UUID-based primary key
- Trial period tracking
- Status tracking (TRIAL, ACTIVE, SUSPENDED, EXPIRED)
- Automatic timestamps
- Row Level Security enabled for multi-tenant isolation

### Organization Members
```typescript
export const organizationMembers = pgTable('organization_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  clerkId: text('clerk_id').notNull(),
  role: text('role', { 
    enum: ['SUPER_ADMIN', 'ADMIN', 'SCHEDULER', 'TEAM_MANAGER', 'OPS_MANAGER', 'SUPPORT'] 
  }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
});
```

### Required Webhooks

1. Organization Lifecycle
```typescript
// Organization Created
{
  type: 'organization.created',
  data: {
    id: string;
    name: string;
    created_at: string;
  }
}

// Organization Updated
{
  type: 'organization.updated',
  data: {
    id: string;
    name: string;
    slug: string;
  }
}

// Organization Deleted
{
  type: 'organization.deleted',
  data: {
    id: string;
    name: string;
  }
}
```

2. Member Management
```typescript
// Member Invited
{
  type: 'organizationMembership.created',
  data: {
    organization: { id: string; name: string; };
    public_user_data: { user_id: string; };
    role: string;
  }
}

// Member Role Updated
{
  type: 'organizationMembership.updated',
  data: {
    organization: { id: string; };
    public_user_data: { user_id: string; };
    role: string;
  }
}
```

3. Trial Management
```typescript
// Custom events to implement
{
  type: 'organization.trial_ending',
  data: {
    id: string;
    name: string;
    trial_ends_at: string;
  }
}

{
  type: 'organization.trial_expired',
  data: {
    id: string;
    name: string;
  }
}
```

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

### Role-Based Access
```typescript
export const RolePermissions = {
  SUPER_ADMIN: [
    'org:sys_domains:manage',
    'org:sys_memberships:manage',
    'org:sys_profile:manage',
    // ... all permissions
  ],
  ADMIN: [
    'org:profile:manage',
    'org:members:manage',
    'org:schedule:manage',
    // ... organization level permissions
  ],
  SCHEDULER: [
    'org:schedule:manage',
    'org:schedule:view',
    // ... scheduling permissions
  ],
  // ... other roles
} as const;
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

## Clerk Integration

### Security Implementation

#### Row Level Security
```sql
-- Enable RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- Organization access policy
CREATE POLICY org_access_policy ON organizations
  USING (clerk_id = current_user_id());

-- Member access policy
CREATE POLICY member_access_policy ON organization_members
  USING (organization_id IN (
    SELECT organization_id 
    FROM organization_members 
    WHERE clerk_id = current_user_id()
  ));
```

#### Role-Based Access
```typescript
export const RolePermissions = {
  SUPER_ADMIN: [
    'org:sys_domains:manage',
    'org:sys_memberships:manage',
    'org:sys_profile:manage',
    // ... all permissions
  ],
  ADMIN: [
    'org:profile:manage',
    'org:members:manage',
    'org:schedule:manage',
    // ... organization level permissions
  ],
  SCHEDULER: [
    'org:schedule:manage',
    'org:schedule:view',
    // ... scheduling permissions
  ],
  // ... other roles
} as const;
```

### Webhook Implementation

1. Create webhook endpoint:
```typescript
// src/app/api/webhooks/clerk/route.ts
import { verifyWebhook } from '@/lib/clerk/webhooks';

export async function POST(req: Request) {
  const evt = await verifyWebhook(req);
  
  switch (evt.type) {
    case 'organization.created':
      // Handle organization creation
      break;
    case 'organization.updated':
      // Handle organization update
      break;
    // ... handle other events
  }
}
```

2. Set up webhook in Clerk Dashboard:
- Endpoint: `/api/webhooks/clerk`
- Events to subscribe:
  - organization.created
  - organization.updated
  - organization.deleted
  - organizationMembership.created
  - organizationMembership.updated
  - organizationMembership.deleted
