# Technology Stack

## Frontend

### Core

- Next.js 13+ (App Router)
- React 18+
- TypeScript 5.x

### UI & Styling

- Tailwind CSS
- shadcn/ui components
- Lucide icons
- Single global.css for all styles
- No CSS Modules

### Navigation

- Single Navbar component in src/templates/Navbar.tsx
- No separate TopNav components
- Consistent navigation across all pages

### State Management

- React Context for global state
- React Query for server state
- React Hook Form for form state

### Authentication & Authorization

- Clerk for authentication
  - ClerkProvider wrapping the application in root layout
  - Organization management via OrganizationSwitcher
  - User profile management via UserButton
  - Role-based access control
  - User profiles
  - Session management
  - Secure token handling

### Language Support

- Swedish only
- Internal translation system:
  - Translation keys stored in `src/locales/sv.json`
  - Custom `useTranslations` hook in `src/utils/translations.ts`
  - Type-safe translation keys
  - Component-based translation organization
- No external translation libraries
- All UI text managed through internal translation utility

### Data Visualization

- Recharts for charts
- react-table for data grids

### Performance

- Next.js Image optimization
- Dynamic imports
- Route-based code splitting
- Suspense boundaries
- React.memo for expensive components

## Backend

### Database

- PostgreSQL via Supabase
- Connection pooling enabled
- Row-level security
- Real-time subscriptions

### ORM

- Drizzle ORM
- Type-safe queries
- Migration management
- Schema validation

### API Layer

- Next.js API routes
- Server components
- Server actions
- Edge functions where applicable

### Caching

- Redis for session store
- Vercel's edge caching
- SWR for client-side caching

## Infrastructure

### Hosting

- Vercel for frontend and API
- Supabase for database
- AWS S3 for file storage

### CI/CD

- GitHub Actions
- Automated testing
- Code quality checks
- Preview deployments

### Monitoring

- Sentry for error tracking
- Better Stack for logs
- Checkly for uptime
- Performance monitoring

## Development Tools

### Code Quality

- ESLint
- Prettier
- TypeScript strict mode
- Husky pre-commit hooks

### Testing

- Vitest for unit tests
- Playwright for E2E tests
- Testing Library
- MSW for API mocking

### Documentation

- TypeDoc for API docs
- Storybook for components
- Markdown for guides
- Swagger for API specs

## External Services

### Scheduling

- Timefold.ai for optimization
- Custom constraints engine
- Real-time updates

### Integration

- Alfa eCare Business Intelligence API
- Future Carefox integration
- Webhook support

## Security

### Authentication

- Clerk security features
- JWT token management
- RBAC implementation
- Session management

### Data Protection

- GDPR compliance
- Data encryption
- Secure headers
- CORS policies

### Monitoring

- Security logs
- Audit trails
- Rate limiting
- DDoS protection

## Development Workflow

### Version Control

- Git
- Feature branches
- Pull request reviews
- Semantic versioning

### Environment Management

- Development
- Staging
- Production
- Feature flags

### Quality Assurance

- Automated tests
- Manual testing
- Performance testing
- Security scanning

## Deployment

### Strategy

- Blue-green deployments
- Automatic rollbacks
- Database migrations
- Zero-downtime updates

### Environments

- Development: dev.caire.se
- Staging: staging.caire.se
- Production: caire.se

### Monitoring

- Uptime tracking
- Error reporting
- Performance metrics
- User analytics

## Best Practices

### Code

- TypeScript strict mode
- ESLint rules
- Code formatting
- Documentation

### Security

- Regular updates
- Dependency scanning
- Security headers
- Access controls

### Performance

- Lighthouse scores
- Core Web Vitals
- Bundle analysis
- Load testing

### Testing

- Unit test coverage
- Integration tests
- E2E scenarios
- Performance tests

## Frontend Components

### Charts

We use Recharts for data visualization with the following custom components:

- `DoughnutChart`: For distribution data with labeled segments showing both name and value
- `BarChart`: For comparative data with clear axis labels and tooltips
- `LineChart`: For trend visualization with smooth curves and data points

Data structure for all charts follows a consistent format:

```typescript
type ChartData = {
  data: Array<{ name: string; value: number }>;
  datasets: Array<{
    dataKey: string;
    label?: string;
    backgroundColor?: string | string[];
    borderColor?: string;
  }>;
};
```

Key features:

- Server-side rendering compatible
- Responsive containers
- Consistent styling and tooltips
- Swedish language labels
- Proper data formatting
