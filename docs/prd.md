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

**(Additional / Longer-Term)**  
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

- **Constraints can be set on multiple levels**:
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

### 5.2 Analytics & Reporting

1. **Dashboards**  
   - Key metrics (staff utilization, schedule efficiency, travel time)  
   - Drill-down for performance insights  

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
- Integrates with Next.js

**Supabase (Domain Users)**  
- Employees, clients, family members  
- Custom RBAC logic in DB  
- Row-level security for privacy  

### 6.3 Database
- **Supabase** (Postgres) + **Drizzle ORM** for schema management  
- **Key Entities**:
  - **Users**: Org-level (Clerk) or domain-level (Supabase)  
  - **Organizations**: Tracks trial expiration, statuses  
  - **Employees**: Linked to user, skills, availability  
  - **Clients**: Preferences, encrypted lat/long, special needs  
  - **Schedules**: Employee → client assignments, time ranges, statuses  
  - **Constraints & Preferences**: Hard/medium/soft definitions  
  - **Analytics**: Metric tables for scheduling and general usage  
  - **Vehicles** (optional for route optimization)  
  - **Shift Templates & Employee Shifts** (manage coverage)  
- **GDPR Compliance**: Pseudonymized trial data, encryption at rest  

#### 6.3.1 Schema Considerations

**Multi-Employee Visits**  
- Possibly store multiple employees per schedule row or use a junction table.

**Authentication**  
- `passwordHash` optional if fully external auth.

**Constraints**  
- `constraintDefinitionSchema` + `constraintValueSchema` for flexible rule sets.

**Scheduling Solutions**  
- `scheduleSolutionSchema` logs each optimization run (inputData, outputSolution, score).

**Analytics**  
- `analyticsSchema` + `scheduleMetricSchema` to power dashboards.

### 6.4 Integrations

1. **Timefold.ai**  
   - Field service routing model for constraint-based scheduling  
   - REST API integration  

2. **Alfa eCare**  
   - Employee/client data sync  
   - Real-time updates for changes  

3. **Potential Future**: Carefox, other e-health systems  

### 6.5 Security & Compliance
- **Row-Level Security** (org-based data isolation)  
- **Data Encryption** at rest and in transit  
- **Audit Logging** for user actions  
- Full **GDPR** compliance  

---

## 7. Implementation Timeline

### **Phase 1: Foundation (Weeks 1–4)**
- Project setup (Next.js + TypeScript + Tailwind)  
- Clerk + Supabase authentication flows  
- Basic DB schema (Drizzle ORM)  
- Core RBAC (super admin, admin)  

### **Phase 2: Scheduling (Weeks 5–8)**
- Integrate Timefold.ai for schedule creation  
- Implement constraints (hard, medium, soft)  
- Deploy scheduling UI (Samordnare focus)  
- Manual overrides, conflict resolution  

### **Phase 3: Analytics (Weeks 9–12)**
- Dashboards (staff utilization, travel time)  
- Real-time updates/route optimization metrics  
- Trial usage metrics  
- Fine-tuning performance (<500ms API)  

### **Phase 4: Polish & Beta Launch (Weeks 13–16)**
- Enhanced reporting (exports, additional charts)  
- Possible multi-language foundation  
- User testing & iterative improvements  
- Prepare MVP for Nova Omsorg pilot + additional beta clients  

---

## 8. Narrative
Imagine a **Samordnare** logging into Caire on Monday morning. Instead of juggling spreadsheets, they simply input constraints (working hours, staff skills, client preferences), and the system **generates an optimized schedule**—reducing travel time and improving employee assignments. Meanwhile, a **Trial User** can experiment in a sandbox environment to see potential savings (time/cost) vs. manual scheduling. A **Super Admin** can oversee multiple organizations, manage trials, and eventually expand into advanced analytics for top-tier clients.

---

## 9. Success Metrics (Extended)

### 9.1 Business Metrics
- 1–2% immediate improvement in billed hours (MVP pilot)  
- 5%+ improvement in staff efficiency (longer term)  
- 15% reduction in travel time overall  
- 30%+ trial-to-paid conversion  

### 9.2 Technical Metrics
- 99.9% system uptime  
- <2s page load time  
- <500ms API response  
- <1s schedule optimization (Timefold.ai)  

### 9.3 User Metrics
- 90% user satisfaction for scheduling/admin  
- <5 minutes for onboarding  
- <2 support tickets per user per month  

---

## 10. Future Considerations

### 10.1 Additional Feature Ideas
- **Mobile Application** for on-the-go scheduling  
- **Advanced AI/ML**: predictive staff shortages, high-need times  
- **Additional Integrations**: Carefox, municipal e-health  
- **International Expansion**: multi-lingual support  
- **Custom Optimization Rules**: advanced continuity constraints, specialized skill sets  

### 10.2 Advanced Analytics as Premium Upsell
As Caire matures, **Advanced Analytics** could be introduced as a premium or enterprise tier:

1. **Predictive Scheduling & Cost Forecasts**  
2. **Scenario Testing** (“What if we add more employees/vehicles?”)  
3. **Custom Dashboards** and **Real-time Alerts**  
4. **Extended Data Retention & Trends** (6–12+ months)

**Value Proposition**  
- High revenue potential by offering deeper data insights  
- Differentiates from simpler competitor solutions  

**Implementation Outline**  
- Keep core analytics in base plan  
- Offer advanced analytics with predictive features, cost breakdowns, scenario tools in premium tier  
- Role/plan-based gating in multi-tenant environment  