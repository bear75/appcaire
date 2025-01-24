# Database Design

## Overview
This document outlines the database schema for the Caire platform, focusing on scheduling and organization management.

## Tables

### Organization
The core table for multi-tenant functionality.

```sql
CREATE TABLE organization (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    trial_expiration_date timestamp with time zone,
    status text DEFAULT 'ACTIVE'::text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
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
All tables implement Row Level Security (RLS) policies to ensure data isolation between organizations:

```sql
ALTER TABLE [table_name] ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON [table_name]
    USING (organization_id = current_setting('app.current_tenant')::uuid)
    WITH CHECK (organization_id = current_setting('app.current_tenant')::uuid);
```

### Automatic Updates
All tables include `created_at` and `updated_at` timestamps, with triggers to maintain `updated_at`:

```sql
CREATE TRIGGER update_updated_at_column
    BEFORE UPDATE ON [table_name]
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## Migrations
Migrations are managed using Drizzle ORM with the following structure:
- Sequential migration files in `/migrations`
- Metadata tracking in `/migrations/meta`
- Migration state in `drizzle_migrations` table

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
