Below is the **complete PRD** with the **new** additions in **Section 5.1.4** (regarding **monthly leftover hours** and **auto-optimization** of constraints) and **Section 5.1.5** (regarding **trial org flow** for comparing **manual** vs. **AI-optimized** schedules). All other PRD content remains unchanged.

---

# Product Requirements Document (PRD)

## 1. Introduction & Context

### 1.1 Overview
Caire is a **SaaS platform** that empowers home care providers by optimizing staff scheduling, reducing administrative overhead, and increasing efficiency. It combines **AI-driven** schedule optimization, route planning, and analytics to tackle the persistent challenges in the home care sector.

- **Website:** [caire.se](https://caire.se) – Marketing site for lead generation  
- **Pitch:** [Revolutionizing Home Care Presentation](https://revolutionizing-home-car-cg3s3ue.gamma.site/)  
- **Platform:** (Coming soon) [app.caire.se](https://app.caire.se) – SaaS platform  
- **Last Updated:** 2025-01-23  
- **Author:** Björn Evers  

### 1.2 Problem Statement
Home care providers often deal with:

- **High administrative costs** due to manual scheduling and coordination  
- **Low staff utilization** (~66% billed hours) with excessive travel time  
- **Tight or nonexistent profit margins** in a highly competitive market  
- **Employee dissatisfaction** due to unpredictable or suboptimal schedules  

### 1.3 Target Audience
Caire targets **small-to-mid-sized** home care providers (<500 employees) lacking extensive in-house IT capabilities. Typical users include:

- **Samordnare (Schedulers)**  
- **Enhetschef (Team Managers)**  
- **Verksamhetschef (Operations Managers)**  
- **Executive Management (VD/CFO)**  

### 1.4 Market Context
- Sweden's home care market is valued at ~80B SEK annually, with ~40% going to administration  
- An aging population increases demand, exposing inefficiencies in scheduling and staff management  
- Limited competition offering **end-to-end solutions** for schedule planning, routing, and analytics  

---

## 2. Vision & Value Proposition

### 2.1 Vision
Caire aspires to become the **leading AI-powered scheduling platform** for home care. Its goal is to **save time**, **reduce costs**, and **improve both employee and client satisfaction**.

### 2.2 Core Value Proposition
- **AI Scheduling:** Automates staff scheduling, factoring in qualifications, staff preferences, and travel routing.  
- **Analytics & Insights:** Provides actionable KPIs for better operational decisions and cost savings.  
- **Trial Capabilities:** Offers a sandbox/demo environment showcasing clear ROI through measurable improvements.  

---

## 3. Goals & Success Criteria

### 3.1 Goals
1. **Launch MVP within 3 months** for pilot testing with Nova Omsorg.  
2. **Demonstrate +1–2% efficiency improvement** in billed hours during the pilot.  
3. **Onboard 5–10 beta clients** within 6 months post-MVP, proving scalability and market potential.  

### 3.2 Success Metrics

**Business Metrics**  
- 1–2% improvement in billed hours  
- 15% reduction in travel time  
- 30% trial-to-paid conversion rate  

**User Metrics**  
- 90% admin satisfaction with the scheduling interface  
- <5 minutes for trial onboarding  

**Technical Metrics**  
- <2s page load time  
- <500ms API response time  
- 99.9% uptime  

_(Additional / Longer-Term)_  
- 5% improvement in overall staff efficiency  
- 98% schedule completion rate (minimal last-minute changes)  
- 95% constraint satisfaction (hard vs. medium vs. soft)  

---

## 4. User Stories & Roles

### 4.1 Primary Organization Users (Managed via Clerk)

#### Samordnare (Schedulers)
- Create and review AI-optimized schedules  
- Compare manual vs. AI-generated schedules  
- Oversee real-time changes and final approvals  

#### Enhetschef (Team Managers)
- Analyze scheduling efficiency (travel time, staff capacity)  
- Manage resource allocation (vehicles, additional staff)  
- Monitor team performance metrics  

#### Verksamhetschef (Operations Managers)
- Track higher-level KPIs (client satisfaction, municipality requirements)  
- Adjust overall staffing strategy based on workload projections  
- Oversee multiple teams and ensure consistent quality  

#### VD & CFO (Executive Management)
- Evaluate business-level metrics (cost per client, billable hours)  
- Compare performance with industry benchmarks  
- Make strategic decisions for expansion or cost reduction  

### 4.2 Caire Super Admin Users (Managed via Clerk)

#### Super Administrator
- Full access to all organizations  
- Manage system-wide settings, pricing, and trial durations  
- Monitor platform-wide usage metrics  

#### Support Staff
- Handle support tickets  
- Basic analytics view to assist users  
- Limited cross-organization read permissions  

### 4.3 Trial Users (Managed via Clerk)

#### Self-Onboarding
- Create a trial account and upload (or generate) schedule data  
- Test AI scheduling features in a sandbox environment  

#### Conversion
- Visualize improvements (time or cost saved) to encourage paid subscriptions  

### 4.4 Domain Users (Managed via Internal Database — Not using Caire UI)

#### Care Employees
- View schedules  
- Log visits and tasks  
- Provide feedback on assignments  

#### Clients
- View upcoming visits and assigned caregivers  
- Set preferences or constraints (time windows, caregiver gender, etc.)  

#### Client Family Members
- Monitor scheduled visits  
- Communicate updates or concerns to the care team  

---

## 5. MVP Scope & Features

### 5.1 Scheduling

#### 5.1.1 AI-Optimized Scheduling
- **Timefold.ai Integration**: Uses the Field Service Routing model to automate and optimize scheduling, factoring in constraints (qualifications, preferences, travel times).  
- **Manual Override**: Users can edit suggestions and finalize assignments.  
- **Constraint Handling**:
  - **Hard**: Working hours, mandatory skills, client time windows  
  - **Medium**: Preferred staff, staff availability  
  - **Soft**: Workload balancing, cost optimization, employee preferences  

- Constraints can be set on multiple levels:
  - **Caire-wide** (managed by Super Admins)  
  - **Organization**  
  - **Employees**  
  - **Vehicles**  
  - **Clients**  

- **Custom constraints** can be added and configured in the system, mapped to Timefold’s constraints.  
- Each constraint has a **priority** and **weight**; the schedule solution will display scores on these constraints.  

#### 5.1.2 Real-Time Updates
- Display instant changes to schedules across user roles  
- Conflict detection and resolution  
- Route optimization to reduce travel time  

#### 5.1.3 Constraints & Real-Time Data Flow

- **Caire-Wide Constraints**: System default values for orgs, employees, clients, vehicles  
- **Organization-Wide Constraints**: e.g., max hours/day, staff-to-client ratios  
- **Employee Constraints** (from Ecare, Carefox, or direct input): Skills, certifications, hourly vs. fixed, availability  
- **Client Constraints** (from Ecare/Carefox): Time windows, special needs, continuity preferences  

**Data Flow**  
1. **Fetch Constraints** from Ecare/Carefox (employee, client changes)  
2. **Submit** consolidated constraints to Timefold.ai  
3. **Receive** optimized schedule from Timefold.ai  
4. **Push** schedule back to Ecare/Carefox for a consistent record  
5. **Real-Time Updates** on any changes  

#### 5.1.4 Additional Advanced Scheduling Requirements

##### **A. Unused Hours Recapture**
**User Story**  
> “As a home care org admin, I want the scheduling logic to track and recapture unused monthly hours for each client, ensuring we schedule them before the new month resets. Unused hours result in lost billable time if not utilized.”

**Details**  
1. **Leftover Hours**  
   - Each client’s monthly hours (e.g., 100 hrs/month, 25 hrs/month) are monitored.  
   - If visits are canceled, leaving “unused hours,” the system shows these hours as “remaining.”  

2. **Scheduling Priority**  
   - Add an **Unused Hours Recapture** constraint that attempts to schedule leftover time before month’s end.  

3. **Analytics & KPI**  
   - A KPI for leftover hour usage appears in:
     - **Analytics** page (detailed leftover hour usage)  
     - **Dashboard** overview (alert if leftover hours are at risk)  

4. **UI Indication**  
   - In the **Schedule** section (and/or client profile), display leftover monthly hours  
   - Highlight newly inserted “extra” tasks or time slots meant to recapture them  

**Technical Notes**  
- This leftover-hour constraint can be **Medium** or **High** priority (admin-configurable).  
- If leftover hours cannot be rescheduled, log it in analytics as a shortfall or missed opportunity.

##### **B. Over-Time Optimization of Constraints**
**User Story**  
> “As a home care org admin, I want the scheduling logic to learn from past data—employee usage, continuity, travel time—and automatically adjust constraint weights to better match goals (staff efficiency, client continuity, or margin).”

**Details**  
1. **Historical Data Evaluation**  
   - The system observes past scheduling outcomes and proposes new weight/priority values for constraints.  

2. **Default vs. Manual vs. Optimized Constraint Values**  
   - Each constraint can hold three potential values:  
     - **Default** (system-supplied)  
     - **Manual** (admin sets custom)  
     - **Optimized** (auto-generated from historical data)  

3. **Admin Selection**  
   - An admin can choose which version to **use**.  
   - Once chosen, the schedule re-runs with those constraint weights, and KPI changes are reflected in analytics.  

4. **Database Storage**  
   - Store each constraint’s three values plus a note on how the “optimized” value was derived (e.g., Q2 usage data).  

**Technical Notes**  
- The system might run a “learning” job periodically to refine constraints.  
- Admin sees improvements in staff utilization, continuity, or travel time from new auto-optimized weights.

#### 5.1.5 Trial Org Flow: Manual vs. Optimized Schedules
> **Note**: This flow can also be used by **active** organizations to compare manual vs. optimized schedules, as well as compare how different constraint weights affect the KPIs.

**Overall Recommendation**  
- **Reuse the existing Schedule page** but add a **“Compare View”** or **toggle** for manual vs. AI schedules.  

**UI/UX Flow**  
1. **Single Schedule Page**  
   - Both trial and paying orgs can see “Manual” vs. “Optimized” if data is present.  
2. **Comparison Toggle/Tab**  
   - A **“Compare Manual vs. AI”** button or tab displays a split-screen or toggle between “Manual” and “Optimized.”  
3. **Differences Highlight**  
   - Highlight reassignments, different time windows, reduced travel times, etc.  
4. **Trial-Specific UI Elements**  
   - If the org is in trial, show a banner or “trial mode” label.  
   - Encourage adopting the AI schedule if results are beneficial.  
5. **Read-Only or Merge**  
   - Decide if the user can “publish” the AI schedule as final, overwriting or replacing the manual version.  

**Data Architecture**  
- **Import Existing Schedule**: From Ecare/Carefox or CSV, stored in something like `schedule_imported`.  
- **Generate AI Schedule**: Store in a separate table (e.g., `schedule_optimized`) or the same `Schedules` table but flagged.  
- **Comparison Logic**: Query both for the same date range, align them side by side.  
- **Publishing/Overwriting**: If the AI schedule is adopted, update or create a final schedule, then push to Ecare/Carefox.

**Why This Approach Works**  
- Minimizes code duplication (no separate “trial compare” page).  
- Intuitive flow for both **trial** and **active** organizations wanting to see the difference in cost/time savings.  
- Flexible for future expansions (scenario testing, advanced analytics).

---

### 5.2 Analytics & Reporting

1. **Dashboards**  
   - Key metrics (staff utilization, schedule efficiency, travel time)  
   - Drill-down for deeper performance insights  

2. **Reporting**  
   - Daily/weekly/monthly schedules  
   - Resource utilization, cost optimization  
   - Constraint satisfaction reports  

3. **Trial Metrics**  
   - Track trial usage frequency, ROI  
   - Compare manual vs. AI-optimized schedules  

### 5.3 Employee & Client Management

- **Employee Profiles**: Skills, certifications, availability, references to eCare  
- **Client Profiles**: Service needs, time window constraints, integration with eCare  

### 5.4 Language Support
- **Swedish** as the only language interface in MVP  
- UI text managed via an **internal translation utility**  
- Potential for more languages in the future  

### 5.5 Navigation Structure
- **Single Navbar** component  
- **Main Navigation**:
  - **Dashboard** (Översikt)  
  - **Schedule** (Schema)  
  - **Employees** (Personal)  
  - **Clients** (Klienter)  
  - **Analytics** (Analys)  
  - **Settings** (Inställningar)  

### 5.6 UI Structure
- **Global.CSS** for styling  
- **Tailwind** utility classes  
- **shadcn/ui** for standard UI elements  
- **Responsive design** (all screen sizes)  

### 5.7 Trial Environment
- **30-day free trial** with sandbox data  
- **Super Admin** can extend or terminate  
- Onboarding wizard (<5 minutes)  

---

## 6. Technical Overview

### 6.1 Architecture
- **React / Next.js 13+** (new App Router)  
- **TypeScript** for type safety  
- **Tailwind CSS** for consistent UI development  
- **Multi-tenant** SaaS with strict data isolation  

### 6.2 Authentication & Authorization

**Clerk.dev (Organization Users)**  
- Login, sign-up, org switching, RBAC  
- Roles: Super Admin (all orgs), Admin (one org), Member (restricted)  
- Trial user flows

**Supabase (Domain Users)**  
- Employees, clients, family members  
- Custom RBAC logic in DB  
- Row-level security  

### 6.3 Database
- **Supabase** (Postgres) + **Drizzle ORM**  
- **Key Entities**:
  - **Users**: Org-level (Clerk) or domain-level (Supabase)  
  - **Organizations**: trial expiration, statuses  
  - **Employees**: linked to user, skills, availability  
  - **Clients**: preferences, encrypted lat/long, special needs  
  - **Schedules**: employee-client assignments, statuses  
  - **Constraints & Preferences**: Hard/medium/soft definitions  
  - **Analytics**: metric tables for scheduling & usage  
  - **Vehicles** (if used), **Shift Templates**, **Employee Shifts**  
- **GDPR Compliance**: pseudonymized data, encryption at rest  

#### 6.3.1 Schema Considerations
- **Multi-Employee Visits**: single or multiple employees per row  
- **Constraints**: `constraintDefinitionSchema` + `constraintValueSchema`  
- **Scheduling Solutions**: `scheduleSolutionSchema` logs each run  
- **Analytics**: `analyticsSchema` + `scheduleMetricSchema`

### 6.4 Integrations

1. **Timefold.ai**  
   - Field service routing model  
   - REST API for constraint-based optimization  

2. **Alfa eCare**  
   - Employee/client data sync  
   - Real-time updates  

3. **Future**: Carefox, other e-health  

### 6.5 Security & Compliance
- Row-level security (org-based isolation)  
- Data encryption (rest & transit)  
- Audit logging  
- GDPR compliance  

---

## 7. Implementation Timeline

### Phase 1: Foundation (Weeks 1–4)
- Next.js + TypeScript + Tailwind setup  
- Clerk + Supabase auth flows  
- Basic DB schema (Drizzle ORM)  
- RBAC roles (super admin, admin)

### Phase 2: Scheduling (Weeks 5–8)
- Timefold.ai integration for schedule creation  
- Constraints (hard, medium, soft)  
- Basic scheduling UI (Samordnare focus)  
- Manual overrides, conflict resolution

### Phase 3: Analytics (Weeks 9–12)
- Dashboards (staff utilization, travel time)  
- Real-time updates, route optimization metrics  
- Trial usage metrics  
- Fine-tuning performance (<500ms API)

### Phase 4: Polish & Beta Launch (Weeks 13–16)
- Enhanced reporting (exports, additional charts)  
- Possible multi-language foundation  
- User testing & iterative improvements  
- MVP pilot with Nova Omsorg + additional beta clients  

---

## 8. Narrative
Imagine a **Samordnare** logging into Caire on Monday morning. Instead of juggling spreadsheets, they simply input constraints—working hours, staff skills, client preferences—and the system **generates an optimized schedule**. This includes recapturing leftover monthly hours for clients at risk of losing them. Over time, constraints can **auto-optimize** for better efficiency. A **Trial User** can see side-by-side comparisons (manual vs. AI) in a sandbox environment. Meanwhile, a **Super Admin** manages organization-level settings, extends trials, and can eventually delve into advanced analytics.

---

## 9. Success Metrics (Extended)

### 9.1 Business Metrics
- 1–2% improvement in billed hours (pilot)  
- 5%+ improvement in staff efficiency (long-term)  
- 15% reduction in travel time overall  
- 30%+ trial-to-paid conversion  

### 9.2 Technical Metrics
- 99.9% system uptime  
- <2s page load time  
- <500ms API response  
- <1s schedule optimization (Timefold.ai)  

### 9.3 User Metrics
- 90% user satisfaction (scheduling/admin)  
- <5 minutes for onboarding  
- <2 support tickets per user per month  

---

## 10. Future Considerations

### 10.1 Additional Feature Ideas
- **Mobile Application** for real-time scheduling updates  
- **Advanced AI/ML**: predictive staff shortages, complex scheduling  
- **Additional Integrations**: Carefox, municipal e-health  
- **International Expansion**: multi-lingual  
- **Custom Optimization Rules**: continuity constraints, specialized skill sets  

### 10.2 Advanced Analytics as Premium Upsell
- **Predictive Scheduling & Cost Forecasts**  
- **Scenario Testing** (“What if we add more employees or vehicles?”)  
- **Custom Dashboards** for large org data insights  
- **Extended Data Retention & Trends** (6–12+ months)

**Value Proposition**  
- Potential for higher revenue with deeper data insights  
- Differentiates from simple competitor solutions  

**Implementation Outline**  
- Keep **core analytics** in base plan  
- Offer advanced analytics (predictive, scenario testing) as premium tier  
- Possibly restrict via role-based or plan-based gating  

---

**End of Updated PRD**