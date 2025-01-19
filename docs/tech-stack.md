# Technology Stack

## Frontend

### Core

- Next.js 14 (App Router)
- React 18
- TypeScript 5.x
- Tailwind CSS

### UI Components

- shadcn/ui
- Radix UI primitives
- Custom components:
  - Logo (SVG-based)
  - Sidebar navigation
  - Dashboard layout

### State Management

- React Context
- React Hooks
- Clerk for auth state

### Internationalization

- next-intl
- Locale-based routing
- Direct JSON file management for translations

### Assets

- SVG for logo and icons
- PNG for favicons (16x16, 32x32, 180x180, 192x192)
- Sharp for image processing

### Development Tools

- ESLint
- Prettier
- Vitest for testing
- Husky for git hooks
- lint-staged for pre-commit checks

## UI Components

- Lucide Icons
- React Hook Form
- Zod validation

## State Management

- React Query
- Zustand (for complex state)

## Authentication

- Clerk
  - User authentication
  - Organization management
  - Role-based access control

## Database

### Supabase Setup

- PostgreSQL via Supabase
- Connection pooling enabled (port 6543)
- Transaction pool mode
- SSL required for all connections

### ORM and Migrations

- Drizzle ORM for type-safe queries
- Raw SQL migrations for complex schema changes
- Separate dev/prod migration workflows
- Schema validation and type generation

### Environment Configuration

```env
# Development
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require

# Production
DATABASE_URL=postgresql://postgres.[PROD-PROJECT-REF]:[PROD-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

### Migration Scripts

```bash
# Development
npm run db:migrate

# Production
npm run db:migrate:prod        # Dry run
npm run db:migrate:prod:execute # Execute
```

## Analytics & Charts

- Recharts
- D3.js (for complex visualizations)
- CSV export functionality

## Testing

- Playwright (E2E testing)
- MSW (API mocking)

## CI/CD

- GitHub Actions
- Vercel deployment

## Key Features

### Authentication & Authorization

- Email/password login
- Organization management
- Role-based access
- Session management

### Dashboard

- Key metrics display
- Quick actions
- Recent activity
- Schedule overview

### Schedule Management

- Interactive calendar
- Drag-and-drop interface
- Multiple views (timeline, grid, map)
- AI-driven optimization

### Employee Management

- Employee profiles
- Availability tracking
- Skills management
- Performance metrics

### Client Management

- Client profiles
- Visit requirements
- Service history
- Special needs tracking

### Analytics Dashboard

- Key performance indicators
  - Total hours worked
  - Active employees
  - Travel time
  - Completion rate
- Interactive charts
  - Hours trend
  - Completion rate
  - Employee performance
  - Client satisfaction
- Data export functionality
- Multiple view tabs
  - Overview
  - Employee analysis
  - Client insights
  - Route optimization

### Settings Management

- Organization settings
  - Company information
  - Contact details
  - Business settings
- User management
  - User list
  - Role management
  - Access control
- Notification preferences
  - Email notifications
  - SMS alerts
  - Frequency settings
- Security settings
  - Authentication
  - Data protection
  - Password policies
- Localization
  - Language selection
  - Timezone settings
  - Date/time formats

## Component Libraries

### UI Components

```typescript
// Shadcn UI components
import {
  Button,
  Card,
  Dialog,
  Form,
  Input,
  Select,
  Switch,
  Tabs,
  Toast,
} from "@/components/ui";
```

### Form Handling

```typescript
// React Hook Form with Zod
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
```

### Data Fetching

```typescript
// React Query
import { useMutation, useQuery } from "@tanstack/react-query";
```

### Internationalization

```typescript
// next-intl
import { useTranslations } from "next-intl";
```

## API Integration

### Database

```typescript
// Drizzle ORM
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
```

### Authentication

```typescript
// Clerk
import { auth, clerkClient } from "@clerk/nextjs";
```

## Development Setup

### Environment Variables

```env
# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Database
DATABASE_URL=

# API Keys
TIMEFOLD_API_KEY=
```

### Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "e2e": "playwright test"
  }
}
```

## Performance Optimization

- Server components
- Edge runtime
- Image optimization
- Route prefetching
- Bundle optimization

## Security Measures

- HTTPS only
- CSP headers
- API rate limiting
- Input sanitization
- Data encryption

## Monitoring

- Error tracking (Sentry)
- Performance monitoring
- Usage analytics
- Audit logging

## Deployment

- Vercel platform
- Edge functions
- Automatic previews
- Zero-downtime updates
