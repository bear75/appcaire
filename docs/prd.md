Below is a **comprehensive, merged PRD** that **retains** all original sections from your latest POD (447+ lines) **and** incorporates:

1. **Advanced Analytics & Upsell** details.  
2. **Database Schema & Considerations** (from the separate DB conversation).  

The result is a **longer** document that merges all relevant pieces of information into one cohesive product requirements document.

---

# Product Requirements Document (PRD)

## 1. Introduction & Context

### 1.1 Overview

Caire is a **SaaS platform** that empowers home care providers by optimizing staff scheduling, reducing administrative overhead, and increasing efficiency. It combines **AI-driven** schedule optimization, route planning, and analytics to tackle the persistent challenges in the home care sector.

- **Website:** [caire.se](https://caire.se) – Marketing site for lead generation  
- **Platform:** [app.caire.se](https://app.caire.se) – Web application for trial/demo or client accounts  
- **Last Updated:** 2025-01-11  

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

1. **AI Scheduling:** Automates staff scheduling, factoring in qualifications, staff preferences, and travel routing.  
2. **Analytics & Insights:** Provides actionable KPIs for better operational decisions and cost savings.  
3. **Trial Capabilities:** Offers a sandbox/demo environment showcasing clear ROI through measurable improvements.

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
- 98% schedule completion rate (i.e., minimal last-minute changes)  
- 95% constraint satisfaction (hard vs. medium vs. soft)

---

## 4. User Stories & Roles

### 4.1 Primary Organization Users

1. **Samordnare (Schedulers)**
   - Create and review AI-optimized schedules  
   - Compare manual vs. AI-generated schedules  
   - Oversee real-time changes and final approvals  

2. **Enhetschef (Team Managers)**
   - Analyze scheduling efficiency (travel time, staff capacity)  
   - Manage resource allocation, e.g., vehicles or additional staff  
   - Monitor team performance metrics  

3. **Verksamhetschef (Operations Managers)**
   - Track higher-level KPIs (client satisfaction, municipality requirements)  
   - Adjust overall staffing strategy based on workload projections  
   - Oversee multiple teams and ensure consistent quality  

4. **VD & CFO (Executive Management)**
   - Evaluate business-level metrics (cost per client, billable hours)  
   - Compare performance with industry benchmarks  
   - Make strategic decisions for expansion or cost reduction  

### 4.2 Caire Super Admin Users

1. **Super Administrator**
   - Full access to all organizations  
   - Manage system-wide settings, pricing, and trial durations  
   - Monitor platform-wide usage metrics  

2. **Support Staff**
   - Handle support tickets  
   - Basic analytics view to assist users  
   - Limited cross-organization read permissions  

### 4.3 Trial Users

1. **Self-Onboarding**
   - Create a trial account and upload (or generate) schedule data  
   - Test AI scheduling features in a sandbox environment  

2. **Conversion**
   - Visualize improvements (time or cost saved) to encourage paid subscriptions  

### 4.4 Domain Users (Database-Managed)

1. **Care Employees**
   - View schedules  
   - Log visits and tasks  
   - Provide feedback on assignments  

2. **Clients**
   - View upcoming visits and assigned caregivers  
   - Set preferences or constraints (time windows, caregiver gender, etc.)  

3. **Client Family Members**
   - Monitor scheduled visits  
   - Communicate updates or concerns to the care team  

---

## 5. MVP Scope & Features

### 5.1 Scheduling

#### 5.1.1 AI-Optimized Scheduling

- **Timefold.ai Integration:** Automates scheduling, factoring in qualifications, preferences, and travel times  
- **Manual Override:** Users can edit suggestions and finalize assignments  
- **Constraint Handling:**
  - **Hard:** Working hours, mandatory skills, client time windows  
  - **Medium:** Preferred staff, staff availability  
  - **Soft:** Workload balancing, cost optimization, employee preferences  

#### 5.1.2 Real-Time Updates

- Display instant changes to schedules across user roles  
- Conflict detection and resolution  
- Route optimization to reduce travel time  

#### 5.1.3 Constraints & Real-Time Data Flow

**Organization-Wide Constraints**  
- Aligned with labor laws (e.g.,

Below is a **comprehensive, merged PRD** that **retains** all sections from your latest POD (over 447 lines) **and** integrates:

1. **Advanced Analytics & Premium Upsell** details.  
2. **Database Schema & Considerations** (key insights from the DB conversation).  

The goal is to produce one **fully combined** document that covers **everything** from constraints and scheduling to analytics, potential premium features, and how the database supports these capabilities.

---

# Product Requirements Document (PRD)

## 1. Introduction & Context

### 1.1 Overview

Caire is a **SaaS platform** that empowers home care providers by optimizing staff scheduling, reducing administrative overhead, and increasing efficiency. It combines **AI-driven** schedule optimization, route planning, and analytics to tackle the persistent challenges in the home care sector.

- **Website:** [caire.se](https://caire.se) – Marketing site for lead generation  
- **Platform:** [app.caire.se](https://app.caire.se) – Web application for trial/demo or client accounts  
- **Last Updated:** 2025-01-11  

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

Caire aspires to become the **leading AI-powered scheduling platform** for home care. Its goal is to **save time**, **reduce costs**, and **improve employee and client satisfaction**.

### 2.2 Core Value Proposition

1. **AI Scheduling:** Automates staff scheduling, factoring in qualifications, staff preferences, and travel routing.  
2. **Analytics & Insights:** Provides actionable KPIs for better operational decisions and cost savings.  
3. **Trial Capabilities:** Offers a sandbox/demo environment showcasing clear ROI through measurable improvements.

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

_Additional (Longer-Term)_

- 5% improvement in overall staff efficiency  
- 98% schedule completion rate (minimal last-minute changes)  
- 95% constraint satisfaction (hard vs. medium vs. soft)

---

## 4. User Stories & Roles

### 4.1 Primary Organization Users

1. **Samordnare (Schedulers)**
   - Create and review AI-optimized schedules  
   - Compare manual vs. AI-generated schedules  
   - Oversee real-time changes and final approvals  

2. **Enhetschef (Team Managers)**
   - Analyze scheduling efficiency (travel time, staff capacity)  
   - Manage resource allocation, e.g., vehicles or additional staff  
   - Monitor team performance metrics  

3. **Verksamhetschef (Operations Managers)**
   - Track higher-level KPIs (client satisfaction, municipality requirements)  
   - Adjust overall staffing strategy based on workload projections  
   - Oversee multiple teams and ensure consistent quality  

4. **VD & CFO (Executive Management)**
   - Evaluate business-level metrics (cost per client, billable hours)  
   - Compare performance with industry benchmarks  
   - Make strategic decisions for expansion or cost reduction  

### 4.2 Caire Super Admin Users

1. **Super Administrator**
   - Full access to all organizations  
   - Manage system-wide settings, pricing, and trial durations  
   - Monitor platform-wide usage metrics  

2. **Support Staff**
   - Handle support tickets  
   - Basic analytics view to assist users  
   - Limited cross-organization read permissions  

### 4.3 Trial Users

1. **Self-Onboarding**
   - Create a trial account and upload (or generate) schedule data  
   - Test AI scheduling features in a sandbox environment  

2. **Conversion**
   - Visualize improvements (time or cost saved) to encourage paid subscriptions  

### 4.4 Domain Users (Database-Managed)

1. **Care Employees**
   - View schedules  
   - Log visits and tasks  
   - Provide feedback on assignments  

2. **Clients**
   - View upcoming visits and assigned caregivers  
   - Set preferences or constraints (time windows, caregiver gender, etc.)  

3. **Client Family Members**
   - Monitor scheduled visits  
   - Communicate updates or concerns to the care team  

---

## 5. MVP Scope & Features

### 5.1 Scheduling

#### 5.1.1 AI-Optimized Scheduling

- **Timefold.ai Integration**  
  Automates scheduling, factoring in qualifications, preferences, and travel times.

- **Manual Override**  
  Users can edit suggestions and finalize assignments.

- **Constraint Handling**  
  - **Hard:** Working hours, mandatory skills, client time windows  
  - **Medium:** Preferred staff, staff availability  
  - **Soft:** Workload balancing, cost optimization, employee preferences  

#### 5.1.2 Real-Time Updates

- Display instant changes to schedules across user roles  
- Conflict detection and resolution  
- Route optimization to reduce travel time  

#### 5.1.3 Constraints & Real-Time Data Flow

**Organization-Wide Constraints**  
Each organization sets up high-level constraints or policies (e.g., max hours per day, staff-to-client ratios).

**Individual Constraints for Employees**  
Derived from Ecare/Carefox or direct input:  
- Skills, certifications, contract type (hourly vs. fixed), availability

**Requirements & Constraints for Clients**  
Also from Ecare/Carefox:  
- Visit frequency/time windows, special needs, continuity preferences

**Data Ingestion & Scheduling Loop**  
1. **Fetch Constraints** from Ecare/Carefox (employee, client changes)  
2. **Submit** consolidated constraints to Timefold.ai  
3. **Receive** optimized schedule from Timefold.ai  
4. **Push** final schedule back to Ecare/Carefox for live reference  
5. **Real-Time Updates** whenever data changes

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

1. **Employee Profiles**  
   - Skills, certifications, availability, references to eCare  
   - Shift preferences and contract details  

2. **Client Profiles**  
   - Service needs, time window constraints  
   - Integration with eCare for up-to-date data  

### 5.4 Language Support

- **Swedish** as the only language interface in MVP  
- All UI text managed via internal translation utility  
- Potential for additional languages in the future  

### 5.5 Navigation Structure

- Single `Navbar` component  
- Main navigation:  
  1. Dashboard (Översikt)  
  2. Schedule (Schema)  
  3. Employees (Personal)  
  4. Clients (Klienter)  
  5. Analytics (Analys)  
  6. Settings (Inställningar)  

### 5.6 UI Structure

- **Global.CSS** for styling  
- **Tailwind** utility classes  
- **shadcn/ui** for standard UI elements  
- **Responsive design** (all screen sizes)  

### 5.7 Trial Environment

- **30-day free trial** with sandbox data  
- **Super Admin** can extend/terminate  
- Onboarding wizard (<5 minutes)  

---

## 6. Technical Overview

### 6.1 Architecture

- **React / Next.js 13+** using the new App Router  
- **TypeScript** for type safety  
- **Tailwind CSS** for rapid, consistent UI  
- **Multi-tenant** SaaS with strict data isolation  

### 6.2 Authentication & Authorization

1. **Clerk.dev** (Organization Users)  
   - Login, sign-up, organization switching, RBAC  
   - Integrates seamlessly with Next.js  

2. **Supabase** (Domain Users)  
   - Separate auth for employees, clients, family members  
   - Custom RBAC logic in DB  
   - Row-level security for privacy  

### 6.3 Database

- **Supabase** (Postgres) with **Drizzle ORM** for schema management  
- **Key Entities**:  
  - **Users**: Org-level (Clerk) or domain-level (Supabase)  
  - **Organizations**: Tracks trial expiration, status (active, suspended)  
  - **Employees**: Linked to user, stores skills, availability, contract  
  - **Clients**: Preference data, location (encrypted lat/long), special needs  
  - **Schedules**: Assigns employee to client for a given time, date range, status  
  - **Constraints & Preferences**: Hard/medium/soft definitions, possible overrides  
  - **Analytics**: Generic metric table plus specialized scheduling metrics  
  - **Vehicles** (if needed for route optimization)  
  - **Shift Templates** & **Employee Shifts**: Manage staff coverage blocks  
- **GDPR Compliance**: Pseudonymized data for trials, encryption at rest

#### 6.3.1 Schema Considerations

1. **Multi-Employee Visits**  
   - If needed, either store multiple employees per schedule record or create a join table. Current approach is single `employeeId` per schedule row.

2. **Authentication**  
   - The `passwordHash` in `users` table is optional if using external auth only.

3. **Constraints**  
   - `constraintDefinitionSchema` + `constraintValueSchema` allow flexible rule creation (HARD, MEDIUM, SOFT), referencing org, employee, or client.

4. **Scheduling Solutions**  
   - `scheduleSolutionSchema` logs each optimization run (inputData, outputSolution, score).  
   - Perfect for comparing different “what-if” scenarios or re-optimizing as constraints change.

5. **Analytics**  
   - **analyticsSchema**: Generic metrics (e.g., staff utilization, daily tasks)  
   - **scheduleMetricSchema**: Focused on schedule-specific stats (constraint impacts, travel time)  
   - Combined, they can power the dashboards described in section 5.2.

### 6.4 Integrations

1. **Timefold.ai**  
   - Core scheduling engine  
   - REST API for constraint-based optimization  

2. **Alfa eCare**  
   - Sync for employee/client data  
   - Real-time updates for changes in availability or client needs  

3. **Potential Future**: Carefox, other e-health systems  

### 6.5 Security & Compliance

- **Row-Level Security** per organization  
- **Data Encryption** (in transit and at rest)  
- **Audit Logging** for user actions, super admin overrides  
- Fully **GDPR**-compliant  

---

## 7. Implementation Timeline

### Phase 1: Foundation (Weeks 1–4)

- Setup project structure (Next.js, Tailwind, TypeScript)  
- Clerk + Supabase authentication flows  
- Basic DB schema with Drizzle ORM  
- Core RBAC roles (super admin, admin)

### Phase 2: Scheduling (Weeks 5–8)

- Integrate Timefold.ai for basic schedule creation  
- Implement constraints (hard, medium, soft)  
- Deploy initial scheduling UI (Samordnare focus)  
- Manual overrides, conflict resolution

### Phase 3: Analytics (Weeks 9–12)

- Dashboards for staff utilization, travel time  
- Real-time updates and route optimization metrics  
- Trial usage metrics  
- Fine-tuning performance (<500ms API)

### Phase 4: Polish & Beta Launch (Weeks 13–16)

- Enhanced reporting (exports, additional charts)  
- Potential multi-language foundation  
- User testing and iterative improvements  
- Prepare MVP for Nova Omsorg pilot & additional beta clients

---

## 8. Narrative

Imagine a **Samordnare** logging into Caire on Monday morning. Instead of juggling spreadsheets, they simply input constraints—working hours, staff skills, and client preferences—and the system generates an optimized schedule. Travel time is minimized, and employees see more consistent assignments. A **Trial User** can do the same in a sandbox environment and measure time/cost savings by comparing manual vs. AI scheduling. Meanwhile, a **Super Admin** can see which organizations are active, monitor trial conversions, and manage advanced analytics for top-tier clients.

---

## 9. Success Metrics (Extended)

### 9.1 Business Metrics

- 1–2% immediate improvement in billed hours (MVP pilot)  
- 5% improvement or more in staff efficiency (longer-term)  
- 15% reduction in travel time overall  
- 30%+ trial-to-paid conversion rate  

### 9.2 Technical Metrics

- 99.9% system uptime  
- <2s page load time  
- <500ms API response  
- <1s schedule optimization in Timefold.ai for typical data sets  

### 9.3 User Metrics

- 90% user satisfaction for scheduling/admin  
- <5 minutes for end-to-end onboarding  
- <2 support tickets per user per month  

---

## 10. Future Considerations

### 10.1 Additional Feature Ideas

- **Mobile Application:** A dedicated mobile app for on-the-go scheduling or status updates  
- **Advanced AI/ML:** Predictive staff shortages, high-need times, automatic shift reassignments  
- **Additional Integrations:** Carefox, other e-health or municipal systems  
- **International Expansion:** Multi-lingual support for other Nordic countries  
- **Custom Optimization Rules:** Deeper constraint logic (continuity for certain clients, specialized skill sets)

### 10.2 Advanced Analytics as Premium Upsell

As the platform matures, **Advanced Analytics** can be introduced as a **premium** or **enterprise** tier:

1. **Predictive Scheduling & Cost Forecasts**  
   - Forecast future staffing needs based on historical data  
   - Highlight peak hours/days and cost drivers

2. **Scenario Testing**  
   - "What if" modeling (e.g., adding employees or vehicles)  
   - Potential cost/time impact

3. **Custom Dashboards**  
   - Self-service analytics for large orgs to design their own KPI boards  
   - Real-time alerts for threshold breaches

4. **Extended Data Retention & Trends**  
   - 6–12+ months of historical data  
   - Long-term pattern analysis

**Value Proposition**  
- Higher **revenue potential** by offering deeper data insights to large or data-savvy customers  
- **Differentiate** from competitors who only provide static or basic reports

**Implementation Outline**  
- Retain **core analytics** in base plan (staff utilization, travel time, basic constraints)  
- Introduce **premium analytics** with advanced predictive features, cost breakdowns, scenario tools  
- Potentially manage it via role/plan-based access in the same multi-tenant environment

---

**End of Merged & Extended PRD**