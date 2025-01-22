# Task Breakdown Document (Revised)

## Phase 1: Foundation (Weeks 1–4)

### 1. Project Setup & Core Infrastructure

1. **Initialize Project & UI Framework**
   - **Ref. PRD Sections**: 6.1 Architecture, 5.6 UI Structure
   - **Tasks**:
     - Create Next.js 13+ project (App Router)
     - Set up Tailwind CSS
     - Integrate shadcn/ui
     - Ensure responsive design

2. **RBAC & Authentication (Clerk + Supabase)**
   - **Ref. PRD Sections**: 6.2 Authentication & Authorization
   - **Tasks**:
     - Integrate Clerk.dev for Super Admin, Admin, Member, Trial User
     - Set up Supabase for employees, clients, family members
     - Implement row-level security for org data

3. **Database Schema (Drizzle ORM + Supabase)**
   - **Ref. PRD Sections**: 6.3 Database, 6.3.1 Schema Considerations
   - **Tasks**:
     - Define migrations for Organizations, Users, Employees, Clients, Schedules, etc.
     - Include trial status, GDPR compliance fields
     - Possibly add vehicles/shift templates if required

4. **Core RBAC (Super Admin, Admin, Member)**
   - **Ref. PRD Sections**: 4.2 Caire Super Admin, 5.5 Navigation
   - **Tasks**:
     - Ensure Super Admin can switch orgs
     - Admin sees only their org data; can invite new members
     - Members have limited read/write

### 2. Basic UI & Sidebar Navigation

1. **Sidebar Layout & Structure**
   - **Ref. PRD Sections**: 5.5 Navigation Structure
   - **Tasks**:
     - Logo/name at top
     - Main links: Overview, Schedule, Employees, Clients, Analytics, Settings
     - Bottom section: Clerk org switching (Super Admin), member management
     - No top nav bar

2. **Initial Pages (Placeholders)**
   - **Ref. PRD**: 5.5
   - **Tasks**:
     - Create `<OverviewPage />`, `<SchedulePage />`, `<EmployeesPage />`, `<ClientsPage />`, `<AnalyticsPage />`, `<SettingsPage />`
     - Simple placeholders for now

3. **Trial Environment Setup**
   - **Ref. PRD**: 5.7 Trial Environment
   - **Tasks**:
     - Mark orgs as trial with expiration
     - Trial banners or labeling
     - Basic 30-day countdown or UI indicator

---

## Phase 2: Scheduling (Weeks 5–8)

### 1. Timefold.ai Integration & Scheduling Core

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

2. **Dashboard UI**
   - **Ref. PRD**: 5.2.1 (Dashboards)
   - **Tasks**:
     - Main Overview page w/ KPI cards (utilization, travel time, efficiency)
     - Drill-down graphs (bar/line)
     - Possibly a side-by-side comparison for manual vs. AI

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
  - Scenario testing w/ “what-if” modeling
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
