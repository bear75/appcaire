# File Structure Migration Plan

## Current Focus: Core Cleanup 🧹

### 1. Utility Consolidation (Next 2-3 hours)
- [ ] Review and merge duplicate utilities
  ```
  src/utils/ → src/lib/utils/
  src/libs/utils/ → src/lib/utils/
  ```
- [ ] Organize by functionality:
  - date.ts
  - string.ts
  - validation.ts
  - formatting.ts

### 2. Library Organization (2-3 hours)
- [ ] Consolidate core integrations
  ```
  src/lib/
  ├── clerk/      # Auth
  ├── timefold/   # Scheduling
  ├── supabase/   # Database
  └── utils/      # Shared utilities
  ```
- [ ] Remove duplicate implementations
- [ ] Clean up unused code

### 3. Hook Consolidation (1-2 hours)
- [ ] Review all custom hooks
- [ ] Remove duplicate functionality
- [ ] Merge shared logic
- [ ] Document core hooks

### 4. Database Layer (2-3 hours)
- [ ] Clean up database models
- [ ] Consolidate database utilities
- [ ] Remove unused tables/columns
- [ ] Document core schemas

## Progress Tracking ✅

### Completed
- [x] Initial project setup
- [x] Core library organization
- [x] Translation system
- [x] Basic UI prototypes

### In Progress
- [ ] Utility consolidation
- [ ] Library cleanup
- [ ] Hook organization
- [ ] Database cleanup

## Next Steps

1. Start with utility consolidation
2. Move to library organization
3. Clean up hooks
4. Finalize database layer

## Notes
- Focus on cleanup, not new features
- Remove duplicates and unused code
- Maintain only what's needed for prototype
- Document core functionality
