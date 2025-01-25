# File Structure Migration Plan

## Current Status ✅
- Next.js 15.1.6 with App Router setup complete
- TypeScript 5.x configured
- Tailwind CSS and shadcn/ui v2 integrated
- Basic file structure established
- Layout structure finalized
- Component organization started

## Tech Stack 🛠
- **Framework**: Next.js 15.1.6 with App Router and Server Actions
- **Language**: TypeScript 5.x
- **UI**: React 18+, Tailwind CSS, shadcn/ui v2
- **State**: React Server Components + Client Hooks + Partial Prerendering
- **Styling**: Utility-first with Tailwind + shadcn/ui components
- **Database**: PostgreSQL (Supabase) + Drizzle ORM
- **Auth**: Clerk.dev (multi-tenant)

## Next Steps 🔄

### 1. Code Organization (2-3 hours)
- [ ] Audit existing files and their locations
- [ ] Identify duplicate code and components
- [ ] Create plan for merging similar functionality
- [ ] Document components to be kept/removed

### 2. Component Consolidation (3-4 hours)
- [ ] Merge duplicate components
- [ ] Standardize component props
- [ ] Create shared component library
- [ ] Update component documentation

### 3. Utility Functions (2 hours)
- [ ] Review all utility files
- [ ] Remove duplicates
- [ ] Organize into categories:
  ```
  src/lib/utils/
  ├── date.ts          # Date manipulation
  ├── format.ts        # Text/data formatting
  ├── validation.ts    # Input validation
  └── helpers.ts       # General utilities
  ```

### 4. Custom Hooks (2 hours)
- [ ] Review all hooks
- [ ] Remove duplicates
- [ ] Organize into categories:
  ```
  src/lib/hooks/
  ├── useAuth.ts       # Authentication hooks
  ├── useData.ts       # Data fetching hooks
  ├── useUI.ts         # UI-related hooks
  └── useCommon.ts     # Shared hooks
  ```

### 5. Types and Interfaces (2 hours)
- [ ] Review all type definitions
- [ ] Remove duplicate types
- [ ] Create shared type library
- [ ] Update type documentation

## File Structure 📁
```
src/
├── app/                    # Next.js 15 App Router pages
│   ├── (auth)/            # Authenticated routes (RSC)
│   │   └── _components/   # Route group components
│   ├── (unauth)/          # Public routes (RSC)
│   │   └── _components/   # Route group components
│   └── api/               # Route Handlers
├── components/            # UI components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components (RSC)
│   ├── features/         # Feature-specific components
│   └── shared/           # Shared components
├── lib/                  # Core libraries
│   ├── hooks/           # Custom React hooks
│   └── utils/           # Utility functions
├── styles/              # Global styles
│   └── globals.css      # Tailwind directives
└── types/               # TypeScript types
```

## Guidelines 📋
- Use React Server Components by default
- Implement Partial Prerendering where beneficial
- Client Components only when needed ('use client')
- Keep related code together
- Use TypeScript strict mode
- Document as you go
- Follow consistent naming
- Consider maintainability
- Implement proper error handling
- Add logging for important events
- Follow security best practices

## Best Practices
1. Component Organization:
   - Use Server Components by default
   - Implement Partial Prerendering for dynamic content
   - Mark Client Components explicitly
   - One component per file
   - Clear, descriptive names
   - Consistent prop interfaces
   - Proper TypeScript types
   - Use _components directory for route groups

2. Code Style:
   - Use TypeScript strict mode
   - Follow ESLint rules
   - Consistent formatting
   - Clear documentation
   - Use Server Actions for forms
   - Leverage Next.js 15 features:
     - Partial Prerendering
     - Parallel Routes
     - Intercepting Routes
     - Route Groups

3. File Naming:
   - Use kebab-case for files
   - Use PascalCase for components
   - Use camelCase for utilities
   - Descriptive, purpose-based names
   - Add .server or .client suffix when helpful
   - Use _components for route-specific components

4. Testing:
   - Keep test files alongside components
   - Use meaningful test descriptions
   - Test component interfaces
   - Test utility functions
   - Test Server Actions
   - Test Partial Prerendering boundaries

## Performance Optimization
- Implement Partial Prerendering for dynamic content
- Use route groups for code organization
- Leverage parallel routes for complex layouts
- Implement proper loading states
- Use suspense boundaries effectively
- Optimize images with next/image
- Implement proper caching strategies

## After Cleanup
Once the codebase is organized and duplicates are removed, we'll follow the task breakdown document for implementing new features and integrations.
