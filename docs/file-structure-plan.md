# File Structure Migration Plan

## Current Status ✅
- Next.js 13+ App Router setup complete
- Authentication with Clerk integrated
- Database with Drizzle ORM configured
- Basic file structure established

## Cleanup Steps (In Order) 🔄

### 1. Utility Functions (2-3 hours)
- [ ] Review all utility files
- [ ] Remove duplicates
- [ ] Organize into categories:
  ```typescript
  src/lib/utils/
  ├── date.ts          # Date manipulation
  ├── format.ts        # Text/data formatting
  ├── validation.ts    # Input validation
  └── helpers.ts       # General utilities
  ```

### 2. Custom Hooks (2 hours)
- [ ] Review all hooks
- [ ] Remove duplicates
- [ ] Organize into categories:
  ```typescript
  src/lib/hooks/
  ├── useAuth.ts       # Authentication hooks
  ├── useData.ts       # Data fetching hooks
  ├── useUI.ts         # UI-related hooks
  └── useCommon.ts     # Shared hooks
  ```

### 3. Components (2-3 hours)
- [ ] Remove unused components
- [ ] Merge similar components
- [ ] Standardize props
- [ ] Update documentation
- [ ] Organize styles

### 4. Types (2 hours)
- [ ] Remove duplicate types
- [ ] Organize shared types
- [ ] Update documentation
- [ ] Ensure consistency

### 5. Prepare Timefold Integration (2-3 hours)
- [ ] Create integration structure:
  ```typescript
  src/lib/timefold/
  ├── client.ts        # API client
  ├── types.ts         # Type definitions
  ├── utils.ts         # Helper functions
  └── config.ts        # Configuration
  ```
- [ ] Define interfaces
- [ ] Document integration points

## File Structure 📁
```typescript
src/
├── app/              # Pages
├── components/       # UI components
├── lib/             # Core libraries
│   ├── clerk/       # Authentication
│   ├── db/          # Database
│   ├── timefold/    # Scheduling
│   ├── hooks/       # Custom hooks
│   └── utils/       # Utilities
└── types/           # TypeScript types
```

## Guidelines 📋
- Remove all duplicate code
- Keep related code together
- Use TypeScript strict mode
- Document as you go
- Follow consistent naming
- Consider maintainability
