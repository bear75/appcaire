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

- PostgreSQL (via Supabase)
- Drizzle ORM
- Row Level Security

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
```

### Data Fetching

```typescript
// React Query
import { useQuery, useMutation } from "@tanstack/react-query";
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
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
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
