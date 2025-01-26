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

4. **Testing Steps**

   - After moving layout components:

     - Test both logged-in and logged-out states
     - Verify navigation works in both states
     - Check responsive menu on mobile
     - Test organization switching if applicable

   - After moving shared components:

     - Test all pages where component appears
     - Verify functionality in different contexts
     - Check both light and dark modes if applicable

   - After moving feature components:

     - Test the specific feature flow end-to-end
     - Verify data loading and error states
     - Test interactions with other features

   - Common test flows:
     - Landing page: Hero, Features, Footer
     - Auth flow: Login, Register, Organization creation
     - Dashboard: Navigation, KPIs, Menu toggle
     - Settings: Organization settings, User profile
     - Support: Help center, Contact forms

5. **Commit Strategy**

   - Commit after each successful component move
   - Keep commit messages clear and concise
   - Follow conventional commit format
   - Makes it easy to revert if issues arise

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
- [✅] Consolidate toast implementations into single source of truth (2024-01-26)
- [✅] Remove legacy pages directory and \_document.tsx (2024-01-26)

## Tech Stack 🛠

- **Framework**: Next.js 15.1.6 with App Router and Server Actions
- **Language**: TypeScript 5.x
- **UI**: React 18+, Tailwind CSS, shadcn/ui v2
- **State**: React Server Components + Client Hooks + Partial Prerendering
- **Styling**: Utility-first with Tailwind + shadcn/ui components
- **Database**: PostgreSQL (Supabase) + Drizzle ORM
- **Auth**: Clerk.dev (multi-tenant)

## Next Steps 🔄

### 1. Final Cleanup (1-2 hours)

- [✅] Create new directory structure (2024-01-25)
- [✅] Move all components to new locations (2024-01-25)
- [✅] Consolidate utilities and hooks (2024-01-26)
- [✅] Move services to lib/services directory (2024-01-26)
- [✅] Clean up duplicate error directories (2024-01-26)

### 2. Import Path Standardization (1 hour)

- [⏳] Verify all imports use @/ alias
- [⏳] Update any relative imports to use alias
- [⏳] Clean up unused imports

### 3. Documentation (2 hours)

- [⏳] Create README files for major directories
- [⏳] Document file structure decisions
- [⏳] Update component documentation where needed

### 4. Testing Setup (Optional)

- [ ] Decide on testing strategy
- [ ] Set up test directory structure
- [ ] Create initial test templates

Note: Many previously listed tasks have been completed during the recent refactoring:

- ✅ Component organization is complete
- ✅ Utility functions are properly categorized
- ✅ Custom hooks are organized
- ✅ Types and interfaces are in place
- ✅ Feature components are in correct locations

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
│   ├── utils/           # Utility functions
│   └── services/        # Core services (analytics, scheduling, tasks)
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

1. **Completed Tasks**

   - [✅] Remove src/templates directory (2024-01-25)
   - [✅] Remove .DS_Store files (2024-01-25)
   - [✅] Remove .old and .bak files (2024-01-25)
   - [✅] Remove legacy pages directory (2024-01-26)
   - [✅] Move all layout components to new locations (2024-01-25)
   - [✅] Consolidate toast implementations (2024-01-26)

2. **Remaining Tasks**

   - [⏳] Review services directory for unused files
   - [⏳] Clean up duplicate error directories
   - [⏳] Verify all imports use @/ alias
   - [⏳] Create README files for major directories

3. **Optional Tasks**
   - [ ] Set up test directory structure
   - [ ] Create test templates
   - [ ] Add component documentation

### Common Pitfalls to Avoid 🚫

1. **Never Skip Import Verification**

   - ALWAYS use grep or codebase search to find ALL references
   - Check for both direct imports and re-exports
   - Include variations of the import path
   - Don't assume you know all the places a component is used

2. **Complete Verification Before Deletion**

   - Never delete original files until ALL imports are updated
   - Never delete original files until the app is tested
   - Keep original files as backup until changes are committed
   - Document which files were moved and their new locations

3. **Thorough Testing Required**

   - Test the specific feature that uses moved components
   - Test any features that might interact with moved components
   - Test both authenticated and unauthenticated states
   - Test all relevant routes and navigation paths

4. **Import Path Consistency**
   - Use consistent import aliases (@/ prefix)
   - Follow the established directory structure
   - Update barrel files (index.ts) if used
   - Keep import paths as short and clear as possible

### Enhanced Verification Steps 🔍

1. **Before Moving Files**

   - Use `grep_search` or similar to find ALL file references
   - Document all locations where the file is imported
   - Create a checklist of files to update
   - Plan the new location carefully

2. **During Migration**

   - Copy files to new location (don't move yet)
   - Update imports one file at a time
   - Test after each file update
   - Keep original files in place

3. **After Updates**

   - Run the development server
   - Test all affected features
   - Check for console errors
   - Verify all imports are updated

4. **Final Cleanup**
   - Remove commented-out old imports
   - Delete original files
   - Update documentation
   - Commit changes with clear message

### Recent Changes Test Instructions (2024-01-26)

#### Dashboard Components Migration Test Plan

1. **Dashboard Overview Page**

   - Visit /dashboard
   - Verify all KPI cards load correctly
   - Check Today's Schedule section
   - Verify Traffic Light recommendations
   - Test Financial Overview charts
   - Confirm Recent Activity updates

2. **Organization Profile**

   - Visit /dashboard/organization-profile
   - Verify TitleBar displays correctly
   - Test organization settings changes
   - Confirm navigation works

3. **User Profile**

   - Visit /dashboard/user-profile
   - Verify TitleBar displays correctly
   - Test profile updates
   - Check navigation

4. **Mobile Testing**

   - Test all above on mobile viewport
   - Verify responsive layout
   - Check touch interactions

5. **Error States**
   - Test with network disconnected
   - Verify loading states
   - Check error boundaries

Please complete all tests before marking this migration as stable.

### File Location Audit (2024-01-26)

1. **Current Structure**

   - [✅] UI prototype pages in src/features/
     - settings/
     - schedule/
     - employees/
     - clients/
     - billing/
     - auth/
   - [✅] Shared components in src/components/layout/shared
   - [✅] UI components in src/components/ui

2. **Decision**

   - Keep UI prototype pages in src/features/
   - No need to move to components/features/ as they are mockups
   - Avoid introducing unnecessary complexity
   - Maintain working prototype state

3. **Components to Review**

   - [🚧] Audit component dependencies
     - [✅] Toast implementation consolidated (2024-01-26)
     - [⏳] Check remaining UI components
   - [⏳] Check for duplicate components
   - [⏳] Verify all imports use @/ alias

4. **Next Actions**
   - Document component dependencies
   - Update import paths to use aliases
   - Remove unused components
   - Add proper type definitions
