# Database Integration

This project uses a combination of Supabase (PostgreSQL) and Drizzle ORM for database operations.

## Structure

```
/
├── migrations/           # Drizzle migrations (root level)
│   ├── 0000_init-db.sql
│   ├── 0001_add_trial_expiration.sql
│   └── ...
├── supabase/            # Supabase specific files
│   ├── config/          # Supabase configuration
│   │   └── config.toml
│   ├── migrations/      # Supabase migrations
│   │   └── ...
│   └── seed.sql        # Seed data
└── src/
    └── lib/
        └── db/         # Database code
            ├── client.ts        # Supabase client
            ├── drizzle.ts      # Drizzle setup
            ├── types.ts        # Database types
            ├── index.ts        # Main exports
            ├── policies/       # RLS policies
            └── utils/          # Database utilities
```

## Setup

1. **Environment Variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_key
   ```

2. **Database Clients**
   - `db`: Regular Supabase client for client-side operations
   - `dbAdmin`: Admin client with service role for backend operations
   - `drizzle`: Type-safe ORM for database operations

## Usage

```typescript
import { db, dbAdmin } from '@/lib/db';

// Regular client-side operations
const { data, error } = await db
  .from('table')
  .select('*');

// Admin operations (server-side only)
const { data, error } = await dbAdmin
  .from('table')
  .select('*');
```

## Migrations

### Drizzle Migrations
- Located in root `/migrations`
- Run using Drizzle CLI
- Used for schema changes

### Supabase Migrations
- Located in `/supabase/migrations`
- Managed through Supabase CLI
- Used for RLS policies and Supabase-specific features

## Utilities

### Storage
```typescript
import { uploadFile, downloadFile } from '@/lib/db';

// Upload file
const file = await uploadFile('bucket', 'path/to/file', fileData);

// Download file
const blob = await downloadFile('bucket', 'path/to/file');
```

### Real-time Subscriptions
```typescript
import { subscribeToTable, useTableSubscription } from '@/lib/db';

// Subscribe to changes
const unsubscribe = subscribeToTable(
  { table: 'users', event: 'INSERT' },
  (payload) => console.log(payload)
);

// React hook for subscriptions
const items = useTableSubscription({ table: 'users' });
```

## Security

- Row Level Security (RLS) policies in `src/lib/db/policies`
- Separate clients for public and admin operations
- Environment variables for sensitive data 