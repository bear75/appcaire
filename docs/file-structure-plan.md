# File Structure Migration Plan

## Refactoring Process 🔄

### Safe Migration Strategy

When refactoring the codebase structure, follow these steps to ensure stability:
Confirm these steps before starting the process

1. **Keep Original Files**

   - Never delete original files immediately
   - Create new directory structure first
   - Copy (don't move) files to their new locations
   - Keep both old and new files during transition

2. **Update Incrementally**

   - Work on one component/feature at a time
   - Update imports to point to new locations
   - Test that everything still works
   - Commit after each successful change

3. **Verify Dependencies**

   - Before removing any original file:
     - Search for all imports of that file
     - Update all references to use new location
     - Test thoroughly
     - Only remove original after verification

4. **Commit Strategy**

   - Commit after each successful component move
   - Keep commit messages clear and concise
   - Follow conventional commit format
   - Makes it easy to revert if issues arise

5. **Testing**

   - Test after each component move
   - Verify all features still work
   - Check for broken imports
   - Ensure no runtime errors

6. **Task Tracking**
   - Mark tasks as completed in this document after each successful change
   - Use ✅ for completed tasks
   - Use 🚧 for in-progress tasks
   - Use ⏳ for pending tasks
   - Add completion dates for tracking

This process ensures we can safely refactor without breaking functionality and easily revert if needed.

## Current Status ✅

- Next.js 15.1.6 with App Router setup complete
- TypeScript 5.x configured
- Tailwind CSS and shadcn/ui v2 integrated
- Basic file structure established
- Layout structure finalized
- Component organization started
- [✅] Large logo removed from landing page (2024-01-25)
- [✅] Move Hero to components/features/landing (2024-01-25)

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

- [✅] Create new directory structure (2024-01-25)
- [✅] Move Navbar to components/layout/navbar (2024-01-25)
- [✅] Move Logo to components/layout/shared (2024-01-25)
- [✅] Fix footer logo sizing (2024-01-25)
- [✅] Move Footer to components/layout/footer (2024-01-25)
- [✅] Move Hero to components/features/landing
- [✅] Move Features to components/features/landing (2024-01-25)
- [⏳] Move FAQ to components/features/landing
- [⏳] Audit remaining files and their locations
- [⏳] Document components to be kept/removed

### 2. Component Consolidation (3-4 hours)

- [⏳] Merge duplicate components
- [⏳] Standardize component props
- [⏳] Create shared component library
- [⏳] Update component documentation

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
   - Use \_components directory for route groups

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
   - Use \_components for route-specific components

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

## Commit Message Structure 📝

We follow the conventional commit format as defined in our commitlint configuration:

### Format

```
type(scope?): subject
```

### Types

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Updates to build process, tools, etc
- `ci`: Changes to CI configuration files and scripts

### Rules

- Subject line must not be longer than 100 characters
- Subject line should be in present tense ("add feature" not "added feature")
- Subject line should not end with a period
- Scope is optional and should be in parentheses

### Examples

```
feat(auth): add organization role management
fix(dashboard): resolve data loading issue
refactor(components): move navbar to new structure
docs(readme): update installation instructions
style(lint): apply prettier formatting
```

## After Cleanup

Once the codebase is organized and duplicates are removed, we'll follow the task breakdown document for implementing new features and integrations.

### File Cleanup Tasks

1. **Remove Unnecessary Files**

   - [✅] Remove src/templates directory (moved to new locations) (2024-01-25)
   - [✅] Remove .DS_Store files (2024-01-25)
   - [✅] Remove .old and .bak files (2024-01-25)

2. **Move Components**

   - [✅] Background → layout/shared/Background (2024-01-25)
   - [✅] KPICard → shared/KPICard (2024-01-25)
   - [✅] ToggleMenuButton → layout/shared/ToggleMenuButton (2024-01-25)
   - [ ] ActiveLink → layout/shared/ActiveLink

3. **Consolidate Utilities**

   - [ ] Review and merge duplicate utility functions
   - [ ] Organize utils by category (date, string, formatting)
   - [ ] Create proper index files for utilities
   - [ ] Add proper type definitions

4. **Reorganize Features**

   - [ ] Move dashboard components to features/dashboard
   - [ ] Move analytics components to features/analytics
   - [ ] Ensure proper component organization in features

5. **Clean Up Tests**

   - [ ] Move tests next to their components
   - [ ] Ensure consistent test naming
   - [ ] Update test imports after reorganization

6. **Documentation**
   - [ ] Update component documentation
   - [ ] Document utility functions
   - [ ] Create README files for major directories
   - [ ] Document file structure decisions
