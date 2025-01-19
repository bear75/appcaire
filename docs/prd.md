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

- Sweden’s home care market is valued at ~80B SEK annually, with ~40% going to administration
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

_(Additional from second document)_

- 5% improvement in overall staff efficiency (longer term)
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
Each organization sets up high-level constraints or policies that apply to all scheduling within that org. Examples include:

- Maximum working hours per day/week (aligned with labor laws)
- Required staff-to-client ratios
- Vehicle availability or resource limits

These general constraints form the **base layer** of rules that every schedule must respect.

**Individual Constraints for Employees**  
For each employee (caregiver), additional constraints are either managed within or synchronized from **Ecare** or **Carefox**:

1. **Skill & Qualification Requirements**

   - Certain employees may have certifications or special training
   - Only those qualified can handle specific clients or treatments

2. **Availability & Work Preferences**

   - Availability windows (day shifts, evening-only, etc.)
   - Preferred clients or geographies

3. **Contractual or Labor Restrictions**
   - Overtime limits, rest periods, union rules

**Requirements & Constraints for Clients**  
Each client also has constraints, typically maintained in **Ecare** or **Carefox**, such as:

1. **Visit Frequency & Time Windows**

   - Must be visited every morning before 10:00 AM
   - Afternoon check-ins on specific days

2. **Special Needs**

   - Language requirements, preference for a certain caregiver’s gender, or advanced medical skills

3. **Care Preferences**
   - Continuity of care (preferring the same caregiver each day)
   - Sensitivity to travel time or staff changes

**Data Ingestion & Scheduling Loop**

1. **Fetch Constraints**

   - Caire periodically pulls or receives real-time updates (via webhooks or API polling) from **Ecare/Carefox**
   - This includes employee constraints (e.g., new certifications, updated availability) and client constraints (e.g., changed time windows, new requirements)

2. **Submit to Timefold.ai**

   - Once the consolidated constraints (organization-wide + employee + client) are gathered, Caire sends them to **Timefold.ai** for optimization
   - Timefold.ai calculates an **optimal schedule**, considering both hard constraints (e.g., must-have skill matches, legal working hours) and soft constraints (e.g., employee/client preferences, minimizing travel time)

3. **Receive Optimized Schedule**

   - Timefold.ai returns a **proposed schedule** that assigns each visit/task to the best-suited, available caregiver while minimizing travel or idle time
   - Users (Samordnare, managers) can manually override or adjust any assignment

4. **Feed Schedule Back to Ecare/Carefox**

   - Once finalized, Caire pushes the resulting schedule into **Ecare/Carefox**, ensuring the home care provider’s primary system of record is up to date
   - Staff, management, and clients (if applicable) see a **consistent schedule** across both Caire and their legacy platform

5. **Real-Time Updates**
   - Whenever **any data** changes (e.g., a caregiver calls in sick, a client updates their time window in Ecare/Carefox), Caire automatically re-fetches updated constraints and re-triggers the scheduling workflow in Timefold.ai
   - This keeps all systems **in sync** and the schedule as accurate as possible

By **centralizing and automating** this constraint management process, Caire eliminates repetitive manual updates across multiple systems. The **real-time loop** between Caire, Ecare/Carefox, and Timefold.ai ensures that schedules remain **dynamic**, **compliant**, and **optimized** at all times.

### 5.2 Analytics & Reporting

1. **Dashboards**

   - Display key metrics (staff utilization, schedule efficiency, travel time)
   - Drill-down for performance insights

2. **Reporting**

   - Generate daily/weekly/monthly schedules
   - Resource utilization and cost optimization
   - Constraint satisfaction reports

3. **Trial Metrics**
   - Track trial duration, usage frequency, and potential ROI
   - Compare manual vs. AI-optimized schedules to highlight improvements

### 5.3 Employee & Client Management

1. **Employee Profiles**

   - Skills, certifications, qualifications
   - Availability & shift preferences
   - Integration with Alfa eCare to sync data

2. **Client Profiles**
   - Service needs, preferred visit times
   - Medical or personal constraints
   - Integration with Alfa eCare for up-to-date data

### 5.4 Multi-Language Support

- **Swedish** as the primary language interface
- Roadmap to include **additional languages** based on client demand
- Ensure all UI components support **future internationalization (i18n)**

### 5.5 Trial Environment

- **30-day free trial** with a sandbox environment
- Ability for **super admins** to extend or terminate trials
- Onboarding wizard for quick setup (<5 minutes)

---

## 6. Technical Overview

### 6.1 Architecture

- **React / Next.js 13+** with the new App Router
- **TypeScript** for type safety and maintainability
- **Tailwind CSS** for rapid, consistent UI development
- **Multi-tenant** SaaS approach with strict data isolation

### 6.2 Authentication & Authorization

1. **Clerk.dev for Organization Users**

   - Manages login, sign-up, and RBAC
   - Supports organization switching for users tied to multiple orgs
   - Integrates seamlessly with Next.js

2. **Supabase for Domain Users**
   - Separate authentication for employees, clients, and family members
   - Custom RBAC logic stored in the database
   - Row-level security for data privacy

### 6.3 Database

- **Supabase** as the Postgres-based DB layer
- **Drizzle ORM** for schema and migration management
- **Entities** include:
  - Users (Clerk-managed org users, Supabase domain users)
  - Organizations
  - Schedules
  - Constraints & Preferences
  - Metrics / Analytics
- **GDPR Compliance** with pseudonymized data storage for trials

### 6.4 Integrations

1. **Timefold.ai**

   - Core scheduling logic for routes, constraints, and optimization
   - REST API integration for schedule computations

2. **Alfa eCare**

   - Sync for employee and client data
   - Automatic updates for relevant user profiles and constraints

3. **Potential Future:** Carefox, other e-health systems

### 6.5 Security & Compliance

- **Row-Level Security** per organization
- **Data Encryption** at rest and in transit
- **Audit Logging** for user actions, especially super admin operations
- Compliant with **GDPR** and local Swedish data regulations

---

## 7. Implementation Timeline

Below is a combined schedule reflecting both documents’ timelines.

### Phase 1: Foundation (Weeks 1–4)

- Setup project structure (Next.js, Tailwind, TypeScript)
- Clerk and Supabase authentication flows
- Basic DB schema with Drizzle ORM
- Core RBAC (super admin, admin roles) implemented

### Phase 2: Scheduling (Weeks 5–8)

- Integrate Timefold.ai for basic schedule creation
- Implement constraints (hard, medium, soft)
- Deploy initial scheduling UI for Samordnare
- Manual override and conflict resolution

### Phase 3: Analytics (Weeks 9–12)

- Dashboards for staff utilization, travel time
- Real-time schedule updates and route optimization
- Trial usage metrics
- Fine-tuning performance (<500ms API responses)

### Phase 4: Polish & Beta Launch (Weeks 13–16)

- Enhance reporting with custom exports
- Multi-language UI foundation
- User testing & iterative improvements
- Prepare MVP for **Nova Omsorg** pilot and additional beta clients

---

## 8. Narrative

Imagine a **Samordnare** logging into Caire on Monday morning. Instead of juggling spreadsheets, they simply input constraints—working hours, staff skills, client preferences—and the system generates an optimized schedule, minimizing travel time and ensuring compliance with preferences. A **Trial User** can do the same in a sandbox environment and witness immediate improvements in scheduling efficiency. Meanwhile, a **Super Admin** monitors new sign-ups, extends trial periods, and can see platform-wide analytics on how organizations are using the service.

---

## 9. Success Metrics (Extended)

### 9.1 Business Metrics

- 1–2% immediate improvement in billed hours (MVP pilot)
- 5% or more improvement in staff efficiency (longer-term)
- 15% reduction in travel time overall
- 30%+ trial-to-paid conversion rate

### 9.2 Technical Metrics

- 99.9% uptime
- <2s page load time
- <500ms API response
- <1s schedule optimization in Timefold.ai for typical data sets

### 9.3 User Metrics

- 90% user satisfaction for scheduling/admin users
- <5 minutes for end-to-end onboarding
- <2 support tickets per user per month

---

## 10. Future Considerations

- **Mobile Application:** A dedicated mobile app for on-the-go scheduling and updates
- **Advanced AI/ML:** Predictive staff shortages or high-need times
- **Additional Integrations:** Carefox and other e-health or municipal systems
- **International Expansion:** Multi-lingual support for other Nordic countries or beyond
- **Custom Optimization Rules:** Deep support for specialized constraints (e.g., staff continuity for certain clients)

---

**End of PRD**
