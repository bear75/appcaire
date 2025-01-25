# Task Breakdown Document (Revised)

## Phase 1: Foundation (Weeks 1–4)

### 1. Project Setup & Core Infrastructure

1. **Initialize Project & UI Framework** ✅
   - **Ref. PRD Sections**: 6.1 Architecture, 5.6 UI Structure
   - **Tasks**:
     - Create Next.js 13+ project (App Router) ✅
     - Set up Tailwind CSS ✅
     - Integrate shadcn/ui ✅
     - Ensure responsive design ✅
     - Implement internal translation system with type-safe keys ✅
     - Set up Swedish language support with sv.json ✅

2. **Translation System & UI Components** ✅
   - **Tasks**:
     - Implement type-safe translation utility ✅
     - Create interpolation support for dynamic values ✅
     - Set up translation key structure ✅
     - Define component-specific translation namespaces ✅
     - Ensure proper error handling for missing keys ✅
     - Document translation usage patterns ✅

3. **RBAC & Authentication (Clerk + Supabase)** ✅
   - **Ref. PRD Sections**: 6.2 Authentication & Authorization
   - **Tasks**:
     - Integrate Clerk.dev for Super Admin, Admin, Member, Trial User ✅
     - Set up Supabase for employees, clients, family members ✅
     - Implement row-level security for org data ✅

4. **Database Schema (Drizzle ORM + Supabase)** ✅
   - **Ref. PRD Sections**: 6.3 Database, 6.3.1 Schema Considerations
   - **Tasks**:
     - Define migrations for Organizations, Users, Employees, Clients, Schedules, etc. ✅
     - Include trial status, GDPR compliance fields ✅
     - Possibly add vehicles/shift templates if required ✅

5. **Core RBAC (Super Admin, Admin, Member)** ✅
   - **Ref. PRD Sections**: 4.2 Caire Super Admin, 5.5 Navigation
   - **Tasks**:
     - Ensure Super Admin can switch orgs ✅
     - Admin sees only their org data; can invite new members ✅
     - Members have limited read/write ✅

### 2. Basic UI & Sidebar Navigation ✅

1. **Sidebar Layout & Structure** ✅
   - **Ref. PRD Sections**: 5.5 Navigation Structure
   - **Tasks**:
     - Logo/name at top ✅
     - Main links: Overview, Schedule, Employees, Clients, Analytics, Settings ✅
     - Bottom section: Clerk org switching (Super Admin), member management ✅
     - No top nav bar ✅
     - Implement translated navigation labels ✅
     - Add proper aria-labels for accessibility ✅

2. **Initial Pages & UI Components** ✅
   - **Ref. PRD**: 5.5
   - **Tasks**:
     - Create base components with translation support ✅
     - Implement proper type-safe translation keys ✅
     - Set up component-specific translation namespaces ✅
     - Add loading states and error boundaries ✅
     - Schedule page with radio buttons for trial/new/existing ✅
     - Metrics cards with proper styling ✅
     - Timeline, Grid, and Map views with tabs ✅
     - Import wizard for schedule comparison ✅

3. **Trial Environment Setup** ✅
   - **Ref. PRD**: 5.7 Trial Environment
   - **Tasks**:
     - Mark orgs as trial with expiration ✅
     - Trial banners or labeling ✅
     - Basic 30-day countdown or UI indicator ✅

---

## Phase 2: Scheduling (Weeks 5–8) 🔄 [IN PROGRESS]

### 1. Timefold.ai Integration [NEXT]
- **Ref. PRD & Docs**: 5.1.1 AI-Optimized Scheduling, scheduling-logic.md
- **Tasks**:
  - Set up Timefold.ai API client
  - Define solver configuration
  - Create scheduling model
  - Implement constraint mapping
  - Test with sample data
  - Add error handling and retries
  - Implement schedule optimization endpoints

### 2. Schedule Comparison UI Implementation
- **Ref. PRD & Docs**: 5.1.1 AI-Optimized Scheduling, scheduling-logic.md
- **Tasks**:
  - Implement Schedule page layout with comparison toggle
  - Create ManualSchedulePanel and OptimizedSchedulePanel components
  - Add DifferenceHighlighter component for visual comparison
  - Implement synchronized scrolling between panels
  - Add trial-specific UI elements (ROI metrics, upgrade CTA)
  - Create schedule import wizard for manual schedules
  - Implement basic metrics calculation and display
  - Add schedule publishing workflow
  - Test with sample data before Timefold integration

### 2. Timefold.ai Integration & Scheduling Core

1. **Constraint Definitions & Management**
   - **Ref. PRD**: 5.1.1 AI-Optimized Scheduling, 5.1.3 Constraints
   - **Tasks**:
     - Model constraints (org, employee, client) in DB
     - Provide minimal UI for constraint editing (hard, medium, soft)
     - Stub out eCare/Carefox sync if partial

2. **Timefold.ai Service Layer**
   - **Ref. PRD**: 5.1.1, 6.4 Integrations
   - **Tasks**:
     - Call Timefold API with consolidated constraints
     - Handle request/response, errors
     - Possibly store schedule solution in `scheduleSolutionSchema`

3. **Schedule Page & UI**
   - **Ref. PRD**: 4.1 Samordnare, 5.1.2 Real-Time Updates
   - **Tasks**:
     - Day/week view of tasks
     - Conflict warnings, route suggestions
     - Manual overrides

4. **Real-Time Updates (Ecare/Carefox)**
   - **Ref. PRD**: 5.1.3 Data Ingestion & Scheduling Loop
   - **Tasks**:
     - Webhook or polling for changes
     - Automatic partial or full re-optimization
     - Debounce or queue updates

---

## Phase 3: Analytics (Weeks 9–12)

### 1. Analytics DB & Dashboards

1. **Analytics Schema**
   - **Ref. PRD**: 5.2 Analytics & Reporting, 6.3
   - **Tasks**:
     - Implement `analyticsSchema`, `scheduleMetricSchema`
     - Store staff utilization, travel time, completion rates
     - Add translation support for metrics and KPIs
     - Implement interpolation for dynamic values

2. **Dashboard UI**
   - **Ref. PRD**: 5.2.1 (Dashboards)
   - **Tasks**:
     - Main Overview page w/ KPI cards (utilization, travel time, efficiency)
     - Drill-down graphs (bar/line)
     - Side-by-side comparison for manual vs. AI
     - Implement translated metrics and descriptions
     - Add proper aria-labels for accessibility
     - Support dynamic value interpolation in status messages

3. **Reporting & Exports**
   - **Ref. PRD**: 5.2.2
   - **Tasks**:
     - Generate daily/weekly/monthly schedule reports (CSV/PDF)
     - Resource utilization, constraint satisfaction

4. **Trial Metrics**
   - **Ref. PRD**: 5.2.3
   - **Tasks**:
     - Track usage frequency
     - Compare manual vs. AI schedule savings
     - Show ROI to trial users

### 2. Performance & Real-Time Monitoring

1. **Performance Tuning**
   - **Ref. PRD**: 3.2 Success Metrics, 9.2 Technical Metrics
   - **Tasks**:
     - DB indexing, check API times (<500ms)
     - Optimize Timefold calls (<1s typical scenario)
     - Cache or memoize repeated queries if needed

2. **Real-Time Monitoring & Logging**
   - **Ref. PRD**: 6.5 Security & Compliance
   - **Tasks**:
     - Implement audit logging for scheduling changes
     - Possibly store usage logs for advanced analytics or debugging

---

## Phase 4: Polish & Beta Launch (Weeks 13–16)

### 1. Enhanced Reporting & Multi-Language (Optional)

1. **Advanced Reports & Visualizations**
   - **Ref. PRD**: 5.2.2, 10.1 Additional Feature Ideas
   - **Tasks**:
     - Possibly add continuity KPI (how many caregivers per client)
     - Investigate multi-language if requested

2. **User Testing & Feedback**
   - **Ref. PRD**: 8. Narrative, Beta Launch
   - **Tasks**:
     - Conduct pilot w/ Nova Omsorg
     - Gather Samordnare, Manager feedback
     - Iterate on scheduling UI, analytics clarity

3. **Beta Client Onboarding**
   - **Ref. PRD**: 3.1 Goals (5–10 beta clients)
   - **Tasks**:
     - Final subscription or billing integration
     - Document admin workflows (vehicle mgmt, invites, etc.)
     - Track user satisfaction metrics

---

## Ongoing / Future

### 1. Advanced Analytics & Premium Upsell

- **Ref. PRD**: 10.2 Advanced Analytics
- **Tasks**:
  - Predictive scheduling, cost forecasts
  - Scenario testing w/ "what-if" modeling
  - Long-term data retention (6–12+ months)
  - Custom dashboards for large orgs

### 2. Additional Integrations & International Expansion

- **Ref. PRD**: 10.1 Additional Feature Ideas
- **Tasks**:
  - Integrate Carefox or other e-health
  - Multi-lingual UI beyond Swedish
  - Possibly build a mobile app

### Roles & Responsibilities

- **Lead Developer / Tech Lead**
  - Overall architecture, code reviews, data consistency

- **Frontend Developer(s)**
  - Implement Next.js pages (Schedule, Analytics)
  - Ensure responsive, minimal CSS conflicts

- **Backend / Integration Engineer**
  - Timefold.ai, eCare/Carefox syncing
  - Drizzle migrations, data ingestion
  - Performance & logging

- **QA / Tester**
  - Validate scheduling logic
  - Test analytics data & performance

- **Product Manager**
  - Prioritize features, coordinate sprints
  - Gather user feedback
  - Plan advanced analytics rollout

---

## Authentication & Organization Management (Clerk Integration)

### 1. Database Schema Updates (2-3 hours)
- [ ] Add organization status tracking
- [ ] Implement trial period management
- [ ] Add role-based access tables
- [ ] Update employee and client schemas

### 2. Webhook Implementation (2-3 hours)
- [ ] Organization lifecycle events
  - Organization creation
  - Organization updates
  - Organization deletion
- [ ] Member management events
  - Member invitations
  - Role changes
  - Member removals
- [ ] Trial management events
  - Trial start
  - Trial ending notification
  - Trial expiration
- [ ] Status change notifications

### 3. Role-Based Access Control (3-4 hours)
- [ ] Implement role checks in middleware
- [ ] Add permission guards to routes
- [ ] Create role-specific layouts
- [ ] Add role management UI
- [ ] Implement organization roles:
  ```typescript
  roles:
    - super_admin: ["all"]
    - admin: ["org:*"]
    - scheduler: ["schedule:*", "employees:view", "clients:view"]
    - team_manager: ["employees:*", "schedule:view"]
    - ops_manager: ["clients:*", "schedule:view"]
    - support: ["view:*"]
  ```

### 4. Trial Management (2-3 hours)
- [ ] Add trial status tracking
- [ ] Implement trial expiration notifications
- [ ] Create trial-specific UI elements
- [ ] Add upgrade flow
- [ ] Handle organization statuses:
  - trial (30 days)
  - active (paid)
  - suspended
  - expired

## AI Scheduling Integration (Timefold)

### 1. Integration Setup (3-4 hours)
- [ ] Create Timefold client structure:
  ```typescript
  src/lib/timefold/
  ├── client.ts        # API client
  ├── types.ts         # Type definitions
  ├── utils.ts         # Helper functions
  └── config.ts        # Configuration
  ```
- [ ] Set up API authentication
- [ ] Define core interfaces
- [ ] Add error handling

### 2. Constraint Management (4-5 hours)
- [ ] Implement constraint levels:
  - Caire-wide constraints
  - Organization constraints
  - Employee constraints
  - Vehicle constraints
  - Client constraints
- [ ] Add constraint configuration UI
- [ ] Create constraint validation
- [ ] Set up priority system

### 3. Schedule Optimization (4-5 hours)
- [ ] Implement schedule submission
- [ ] Handle optimization responses
- [ ] Add real-time updates
- [ ] Create schedule comparison views
- [ ] Implement manual override options

### 4. Analytics Integration (3-4 hours)
- [ ] Add optimization metrics tracking
- [ ] Create performance dashboards
- [ ] Implement schedule quality scoring
- [ ] Add travel time optimization metrics

### 5. Trial Comparison Features (2-3 hours)
- [ ] Create manual vs. AI schedule comparison
- [ ] Add metric comparison views
- [ ] Implement trial-specific analytics
- [ ] Create conversion prompts

## Future Tasks

### 1. Mobile Responsiveness (2-3 hours)
- [ ] Optimize layouts for mobile
- [ ] Add touch interactions
- [ ] Test on various devices

### 2. Performance Optimization (2-3 hours)
- [ ] Implement caching strategies
- [ ] Optimize API calls
- [ ] Add loading states
- [ ] Improve error handling

### 3. Analytics Expansion (3-4 hours)
- [ ] Add advanced metrics
- [ ] Create custom reports
- [ ] Implement data exports
- [ ] Add visualization options

### 4. Integration Extensions (4-5 hours)
- [ ] Prepare for Carefox integration
- [ ] Add more e-health system connections
- [ ] Implement data synchronization
- [ ] Add audit logging

---
