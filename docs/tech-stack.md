# Caire Platform – Technical Stack

This document outlines the technical stack for the Caire platform, including the selected SaaS boilerplate, third-party integrations, and tools used for development, deployment, and monitoring.

---

## 1. SaaS Boilerplate
The Caire platform is built using the **[React SaaS Boilerplate](https://react-saas.com/)**. This boilerplate provides:

- Built-in **multi-tenancy** support for multiple organizations.
- Authentication and user management with **Clerk**.
- Role-based access control (RBAC) with support for admin, scheduler, employee, and client roles.
- Modular UI components with **Tailwind CSS** and **Shadcn**.
- Database integration using **Drizzle ORM** and **Supabase**.
- Internationalization support using **NextIntl** and **Crowdin** for multi-language capabilities.
- Pre-configured testing, error monitoring, and CI/CD tools for efficient development.

### Key Features Supporting Multi-Organization Setup:
- **Organization Management**: Each Caire client is set up as a separate organization (home care company).
- **User Roles**:
  - **Admin**: Manages schedules, employees, clients, and analytics.
  - **Employee**: Caregivers working with clients.
  - **Client**: Patients receiving care.
  - **Scheduler**: Users responsible for schedule creation and optimization.
- **Built-in Modules**:
  - User authentication and permissions.
  - Dashboards and settings management.
  - Analytics views for admin users.

---

## 2. Custom Features (Caire-Specific)

### 2.1 AI-Optimized Scheduling
- **Integration**: Leverages **Timefold.ai** for scheduling optimization.
  - Uses the **Field Service Routing Model** ([documentation](https://docs.timefold.ai/field-service-routing/latest/getting-started-with-field-service-routing)).
  - Optimizes routes, caregiver assignments, and shift timings based on constraints such as skills, availability, and travel times.

### 2.2 Integration with Alfa eCare
- **API**: Data is synchronized with Alfa eCare’s **Business Intelligence API** ([documentation](https://api.mobilomsorg.se/help)).
  - Fetches caregiver and client data, including:
    - Employee details: skills, availability, transport mode, contracts.
    - Client details: preferences, allergies, language requirements, assistance needs.
  - Real-time updates via webhooks for dynamic scheduling adjustments.

### 2.3 Analytics Dashboards
- **Key Metrics**:
  - Employee efficiency (e.g., billable vs. non-billable hours).
  - Travel time and distance.
  - Scheduling KPIs: total hours, gaps, cancellations.
- **Features**:
  - Compare AI-optimized schedules with manual schedules.
  - Drill-down views for individual employees and clients.
  - Predictive analytics for resource planning and supply-demand trends.

---

## 3. Development Tools

### Core Technologies
- **Frontend**: Next.js and React.
- **Styling**: Tailwind CSS and Shadcn UI.
- **Database**: PostgreSQL managed via Supabase with **Drizzle ORM** for type-safe operations.
- **Authentication**: Clerk for user and organization-level authentication.

### Localization
- **i18n**: NextIntl for internalization.
- **Crowdin**: Translation management for multi-language support.

### Testing
- **Unit Testing**: Vitest.
- **End-to-End Testing**: Playwright.
- **Code Coverage**: Codecov integration.

### Error Monitoring and Performance
- **Sentry**: Monitors errors and exceptions in both development and production environments.
- **Better Stack**: Log management and monitoring.
- **Checkly**: Ensures uptime and application performance.

### Optimization Tools
- **Bundle Analyzer**: Tracks and optimizes JavaScript bundle sizes.

---

## 4. Deployment & CI/CD

### Deployment
- Hosted on **Vercel** with:
  - Automatic preview deployments for pull requests.
  - Production deployments triggered by merges to the main branch.

### CI/CD
- **GitHub Actions**:
  - Automated testing with Vitest and Playwright.
  - Code coverage reports via Codecov.
  - Continuous integration for database migrations and backend/frontend tests.

---

## 5. Integrations Overview

### Timefold.ai
- **Purpose**: AI-powered scheduling with route optimization.
- **Core Functionality**:
  - Employees (vehicles) visit clients (locations) based on constraints.
  - Optimization minimizes travel and balances workloads.

### Alfa eCare
- **Purpose**: Employee and client data management.
- **Functionality**:
  - Sync caregiver and client data.
  - Push finalized schedules back to Alfa eCare.

---

## 6. Advantages of the Selected Stack

### Efficiency
- Pre-built components reduce development time.
- Role-based access control simplifies multi-tenancy.

### Scalability
- Designed to support growing user bases with isolated organization data.

### Flexibility
- Modular design allows easy customization for Caire-specific features.

### Reliability
- Proven integrations with Clerk, Supabase, and Timefold.ai ensure stable performance.

---

## 7. Future Considerations
- **Advanced Predictive Analytics**: Extend dashboards to include future trends and resource forecasts.
- **Additional Integrations**: Explore compatibility with systems like Carefox.
- **Mobile Apps**: Potential PWA or native app development for caregiver and client interactions.
