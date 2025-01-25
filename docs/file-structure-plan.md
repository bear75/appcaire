# File Structure Migration Plan

## Current Status ⚠️
- UI Prototype stage - some warnings/errors acceptable
- Import paths need fixing (e.g., @/libs/utils → @/lib/utils)
- Multiple utility files need consolidation
- Translation files need organization

## Immediate Actions (Current Sprint)
1. Fix Critical Import Paths
   - [x] Update traffic-light.tsx imports
   - [ ] Document all @/libs/utils imports that need updating
   - [ ] Fix ImportWizard split error
   - [ ] Test each component after path updates

2. Utils Consolidation Analysis
   Current Locations:
   ```
   src/
   ├── utils/
   │   ├── date.ts
   │   ├── AppConfig.ts
   │   ├── translations.ts
   │   └── Helpers.ts
   ├── libs/utils/
   │   ├── service-error.ts
   │   └── test-utils.ts
   └── lib/utils/
       └── helpers/
   ```

   Plan:
   1. Document each util's purpose
   2. Identify overlapping functionality
   3. Plan merged structure
   4. Test impact on imports

3. Translation File Organization
   - [ ] Compare contents of messages/ and locales/
   - [ ] Document translation key usage
   - [ ] Plan consolidated structure

## Refactoring Process ⚠️

### Step 1: Analysis Phase
1. Identify Duplicates
   - [ ] List all duplicate directories and files
   - [ ] Document locations and purposes of each duplicate
   - [ ] Compare contents and identify unique code in each location
   Example duplicates found:
   - `lib/` vs `libs/`
   - `messages/` vs `locales/`
   - Multiple utility files across directories

2. Code Review
   - [ ] Review each duplicate file's contents
   - [ ] Document dependencies and imports
   - [ ] Identify which version is most current/complete
   - [ ] Note any conflicts or inconsistencies

### Step 2: Merge Planning
1. Create Merge Strategy
   - [ ] Determine target location for each merged file
   - [ ] List all code that needs to be combined
   - [ ] Document import path updates needed
   - [ ] Plan for handling conflicting code

2. Test Planning
   - [ ] List affected components
   - [ ] Plan test cases for merged code
   - [ ] Document expected behavior

### Step 3: Implementation
1. Code Merging
   - [ ] Copy unique code to target files
   - [ ] Update imports in target files
   - [ ] Run tests to verify functionality
   - [ ] Fix any failing tests
   - NO file moves or deletions at this stage

2. Verification
   - [ ] Test all affected features
   - [ ] Verify all imports work
   - [ ] Check for runtime errors
   - [ ] Validate build process

### Step 4: Cleanup (Only after successful verification)
1. File Removal
   - [ ] Document files to be removed
   - [ ] Get approval for removal
   - [ ] Remove duplicate files
   - [ ] Verify removal didn't break anything

## Current Focus: Utils Consolidation

### Analysis of Utils Duplicates
1. Current Locations:
   - `src/utils/`
   - `src/libs/utils/`

2. Files to Review:
   - `src/utils/date.ts`
   - `src/utils/AppConfig.ts`
   - `src/utils/translations.ts`
   - `src/utils/Helpers.ts`
   - `src/libs/utils/service-error.ts`
   - `src/libs/utils/test-utils.ts`

3. Merge Strategy:
   - [ ] Compare functionality in each utils file
   - [ ] Document unique functions
   - [ ] Plan combined file structure
   - [ ] List all required imports

## Completed Steps ✅

### 1. Initial Setup
- ✅ Basic Next.js 13+ App Router structure
- ✅ Basic feature module structure
- ✅ shadcn/ui components setup
- ✅ Authentication routes organization ((auth)/(unauth))
- ✅ Basic API structure with webhooks

### 2. Schedule Feature Progress
- ✅ Basic component structure
- ✅ Translation system setup
- ✅ Schedule view components
- ✅ Constraint management
- ✅ Import wizard structure

### 3. Component Organization
- ✅ Basic UI components with shadcn
- ✅ Schedule feature components
- ✅ Basic layout templates

## In Progress 🔄

### Current Focus: Schedule Feature Cleanup
1. Import Path Fixes
   - [ ] Fix ScheduleView import in ScheduleContent
   - [ ] Update component import paths
   - [ ] Verify all imports resolve correctly

2. Component Organization
   - [ ] Move ScheduleContent.tsx to proper location
   - [ ] Organize ScheduleView hierarchy
   - [ ] Clean up ImportWizard structure

## Next Steps (Prioritized)

### 1. Immediate Actions (Next 24-48 hours)
1. Fix Schedule Feature
   - [ ] Restore ScheduleContent.tsx
   - [ ] Fix ScheduleView import
   - [ ] Test schedule page functionality

2. Clean Up Translations
   - [ ] Move `src/messages/` → `src/locales/`
   - [ ] Move `src/app/messages/` → `src/locales/`
   - [ ] Update translation imports

### 2. Short Term (Next Week)
1. Core Library Organization
   - [ ] Create `lib/clerk/`
     ```
     lib/clerk/
     ├── client.ts
     ├── webhooks/
     ├── utils.ts
     └── index.ts
     ```
   - [ ] Create `lib/timefold/`
     ```
     lib/timefold/
     ├── client.ts
     ├── types.ts
     ├── utils/
     └── index.ts
     ```
   - [ ] Create `lib/supabase/`
     ```
     lib/supabase/
     ├── client.ts
     ├── migrations/
     ├── utils/
     └── index.ts
     ```

2. Utility Consolidation
   - [ ] Move `utils/` → `lib/utils/`
     ```
     lib/utils/
     ├── date/
     ├── string/
     ├── validation/
     ├── formatting/
     └── index.ts
     ```
   - [ ] Move feature-specific utils to features

### 3. Medium Term (Next 2 Weeks)
1. Feature Module Organization
   - [ ] Complete Schedule feature
   - [ ] Set up Client feature
   - [ ] Set up Employee feature
   - [ ] Set up Analytics feature

2. Type System Organization
   - [ ] Move global types to `types/`
   - [ ] Move feature types to features
   - [ ] Create proper type exports

### 4. Long Term (Next Month)
1. Testing Infrastructure
   - [ ] Set up Vitest for unit tests
   - [ ] Configure Playwright for E2E
   - [ ] Add test coverage reporting

2. Documentation
   - [ ] API documentation
   - [ ] Component documentation
   - [ ] Architecture documentation

## Testing Requirements

### For Schedule Feature (Current Focus)
1. **Component Tests**
   - [ ] ScheduleView renders correctly
   - [ ] ConstraintManager functions properly
   - [ ] ImportWizard works as expected

2. **Integration Tests**
   - [ ] Schedule page loads
   - [ ] Navigation works
   - [ ] Data flow is correct

3. **Regression Tests**
   - [ ] Existing features still work
   - [ ] No new errors introduced
   - [ ] Performance remains good

## Rollback Plan

### For Current Changes
1. Keep copies of:
   - Original ScheduleContent.tsx
   - Original import paths
   - Current translation structure

2. Backup Steps:
   ```bash
   # Before making changes
   cp -r src/features/schedule src/features/schedule.bak
   cp -r src/locales src/locales.bak
   ```

3. Rollback Commands:
   ```bash
   # If needed
   mv src/features/schedule.bak src/features/schedule
   mv src/locales.bak src/locales
   ```

## Progress Tracking
- [x] Initial Setup (3/3)
- [x] Basic Feature Structure (2/2)
- [x] Component Setup (2/2)
- [ ] Schedule Feature (2/5)
- [ ] Core Libraries (0/4)
- [ ] Feature Modules (1/6)
- [ ] Testing Setup (0/3)

## Next Action Items
1. ✨ Fix ScheduleContent.tsx and its imports
2. 🔄 Clean up translation structure
3. 📦 Begin core library organization
4. 🔄 Add initial tests
