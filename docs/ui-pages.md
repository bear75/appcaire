# Caire Platform: UI Pages Documentation (Latest Revision)

This version incorporates **additional dashboard metrics** (employees, vehicles, and KPI schedule optimization), along with **clickable sections** for detailed drill-downs. The document is intended for **designers and developers** to implement the UI in line with the broader product vision.
follow the instructions and the technology stack as outlined in the document tech–stack.MD follow the file structure in the file–dir.md and follow the instructions in .cursorrules

---

## 1. Layout & Navigation

### 1.1 Top Navigation Bar

- **Right-Aligned Components**
- **Caire Logo and name**
  - **User Profile Menu** (Clerk-powered)
    - Profile settings (name, avatar, notification preferences)
    - Language selection (Swedish/English)
    - Sign out
  - **Notifications Icon**: Dropdown of recent alerts or scheduling changes
  - **(Optional) Search Bar**: Quick lookup for employees, clients, or tasks

### 1.2 Sidebar Navigation

- **top left above sidebar - organization logo and name**

1. **Primary Navigation**

   - **Dashboard**
   - **Analytics**
   - **Schedule**
   - **Employees**
   - **Clients**
   - **Settings** (admin privileges only)

2. **Organization Navigation** (ClerkOrganization)

   - Current organization name as header
   - Organization management (member invites, role assignments)
   - Billing information (admins)

3. **Footer Navigation**
   - **Support** (Help center, documentation, contact support)
   - **Feedback** (Feature requests, bug reports)
   - **Logout** (Optional location)

### 1.3 Visual & Layout Inspiration

- **Clean Card Layouts**: Summaries or stats in card components
- **Flat, Minimalist Design**: Light backgrounds, bold accent colors for key metrics
- **Dashboard Tiles**: Quick glimpses of daily schedules, upcoming tasks, real-time alerts
- **see @docs/ui-inspo/hospital/ screenshots for inspiration**

---

## 2. Dashboard

### 2.1 Overview Section

Each **Dashboard Card** is **clickable**, allowing users to drill down into the relevant page (e.g., Employees, Analytics, Vehicles, Scheduling).

- **Key KPI Cards**:

  1. **Total Clients**

     - Shows the number of active clients
     - Color coded based on efficiency threshold
     - Clicking opens the **Clients** page for a complete list

  2. **Total Employees**

     - Shows total active staff members
     - Color coded based on efficiency threshold
     - Clicking navigates to the **Employees** page

  3. **Vehicles**

     - Shows how many vehicles are currently in operation
     - Color coded based on efficiency threshold
     - Clicking opens the **Resource Management** sub-page

  4. **Scheduled Visits**

     - Displays the count of visits for today
     - Color coded based on efficiency threshold
     - Clicking drills down into the **Schedule**

  5. **Travel Time**

     - Shows average travel time per visit
     - Color coded based on efficiency threshold
     - Clicking opens the **Route Optimization** view

  6. **Critical Alerts**

     - Shows number of issues needing attention
     - Color coded based on severity
     - Clicking navigates to the **Alerts** page

  7. **Schedule Optimization**
     - Shows overall optimization percentage
     - Color coded based on efficiency threshold
     - Clicking opens detailed optimization metrics

### 2.2 Today's Schedule

- **Hour-Based Timeline** (no minutes, e.g., 8, 9, 10)
- Each slot shows aggregated metrics:
  - Time range (8–9, 9–10, etc.)
  - Number of visits
  - Number of employees
  - Number of clients
  - Vehicles and km travelled
  - Employee efficiency
- Color coded based on efficiency:
  - Red: <65%
  - Yellow: 65-70%
  - Green: >70%

### 2.3 Traffic-Light Action Recommendations

- **Colored Indicators** (Green/Yellow/Red) for recommendations:
  - **Clients**
    - Service review needs
    - Schedule conflicts
    - Satisfaction levels
  - **Staffing**
    - Hourly staff requirements
    - Regular caregiver recruitment
  - **Training**
    - Required certifications
    - Skill development needs
  - **Vehicle Resources**
    - Fleet optimization
    - Route efficiency
- Each recommendation is **clickable**:
  - Opens a **detail view** with suggested actions
  - Shows potential impact (cost/time savings)
  - Provides implementation steps

### 2.4 Financial Overview

- **Four Key Metrics** displayed as separate graphs:

  1. **Revenue**

     - Monthly trend
     - Currency in SEK
     - Purple line (#7C3AED)

  2. **Costs**

     - Monthly breakdown
     - Currency in SEK
     - Red line (#EF4444)

  3. **Billable Hours**

     - Monthly totals
     - Shown in hours
     - Blue line (#3B82F6)

  4. **Efficiency**
     - Monthly percentage
     - Shows optimization trend
     - Green line (#22C55E)

### 2.5 Latest Activities / Alerts

- **Recent Changes** in scheduling or constraints
- **Notifications** for upcoming tasks or approvals
- **Clickable Entries** linking to relevant pages

---

## 3. Analytics

### 3.1 Overview Tab

- **Page Header**
  - Title: "Analys"
  - Subtitle: "Översikt över verksamhetens nyckeltal"
  - RealId/AI-Driven toggle badges

- **Organization Overview Card**
  - White background with 3D hover effect
  - Rounded corners (rounded-xl)
  - Shadow on hover
  - Title: "Organisationsöversikt"

- **KPI Grid Layout**
  - 3-column grid on desktop, 2 columns on tablet, 1 column on mobile
  - Gap: 1rem (gap-4)
  - Each KPI card:
    - 3D hover effect (translateY(-2px))
    - Shadow transition
    - Scale effect on hover (1.01)
    - Icon placement top right
    - Large value display
    - Label below value

- **KPI Cards**
  1. **Personalutnyttjande**
     - Value: Percentage (e.g., "75%")
     - Icon: User icon
     - 3D hover effect

  2. **Genomsnittlig restid**
     - Value: Time format (e.g., "45 min")
     - Icon: Clock icon
     - 3D hover effect

  3. **Slutförandegrad**
     - Value: Percentage (e.g., "92%")
     - Icon: Check icon
     - 3D hover effect

- **Chart Section**
  - Two-column grid layout
  - Gap between charts: 1.5rem

  1. **Kostnadsbesparingar över tid**
     - Bar chart
     - Purple bars (#7C3AED)
     - Monthly data (Jan-Jun)
     - Y-axis: Currency values
     - 3D card effect on container
     - Hover effects on bars

  2. **Effektivitetstrend**
     - Line chart
     - Green line (#22C55E)
     - Monthly data points
     - Y-axis: Percentage
     - 3D card effect on container
     - Hover tooltip with details

- **Categories Section**
  - Title: "Uppgiftskategorier"
  - Donut chart
  - Legend with values
  - 3D card effect
  - Interactive segments

### 3.2 Navigation

- **Tab Navigation**
  - Grid layout
  - Equal width tabs
  - Purple active state (bg-purple-50 text-purple-600)
  - Hover state (bg-slate-50)
  - Tabs:
    - Översikt
    - Personal
    - Schema
    - Kontinuitet
    - Klienter

### 3.3 Staff Tab

- Performance metrics bar chart showing tasks and travel time
- Skills distribution donut chart with labeled segments (name : value)
- Certification tracking table

### 3.4 Client Tab

- Visit completion rates bar chart
- Time window adherence line chart
- Special needs fulfillment table
- Missed visits tracking

### 3.5 Continuity Tab

- Continuity trend data
- Client warnings
- Top continuity performance metrics

All charts follow consistent data structure and styling:

- Clear labels and values
- Tooltips for detailed information
- Responsive design
- Swedish language support
- Proper color coding for different metrics

### 3.6 Trial Metrics (Trial Organizations Only)

- **Potential Improvements**: Staff utilization increase, cost savings
- **Feature Usage**: Modules used in the trial
- **ROI Calculator**: Based on local labor costs, time saved

### 3.7 Super Admin Analytics

- **Cross-Organization Metrics**
- **System-Wide Performance**
- **Trial Conversion Rates**
- **Audit Logs & Activities**

---

## 4. Schedule

### 4.1 Calendar / Timeline View

- **Daily/Weekly/Monthly** toggle
- **Hour-Based** blocks (8, 9, 10, etc.)
- Color-coding for status or urgency (read-only indicators)
- Hover for details:
  - Client info
  - Employee assigned
  - Constraints (if any)

### 4.2 Task Details & Read-Only Modal

- **Task Title** (e.g., "Medicin Administration")
- **Assigned Caregiver**
- **Constraints**: Hard vs. soft
- **Conflict Warnings**: Overlapping tasks
- **Completion**: Only shown (read-only) if updated by eCare

### 4.3 Constraint Management & Timefold Integration

- **Organization Constraints**: Working hours, resource limits
- **Employee Constraints**: Availability, qualifications, preferences
- **Client Constraints**: Time windows, special needs, location
- **API Calls**: Consolidated constraints → Timefold for scheduling
- **Real-Time Updates**: Re-trigger schedule on data changes

---

## 5. Employees

### 5.1 Employee Directory

- **List** or **Card** view
- **Search & Filters**: By skill, role, status

### 5.2 Employee Profile

- **Picture, Contact Info, Role**
- **Skills & Certifications**
- **Availability**
- **Performance Metrics**

### 5.3 eCare Integration

- **Sync Status**: Last sync time
- **Temporary Restrictions**: Out of office, etc.
- **Conflict Warnings**: If schedule changes mismatch with constraints

---

## 6. Clients

### 6.1 Client Directory

- **List View**: Name, ID, needs, next visit
- **Filters & Search**: By location, needs

### 6.2 Client Profile

- **Personal Info**, risk factors
- **Service Requirements** (time windows, preferences)
- **Constraints** (medical or personal)
- **Visit History** (from eCare)

---

## 7. Settings

### 7.1 Organization Settings

- **Basic Info**: Name, address, contact
- **Member Management**: Invite roles via Clerk
- **Notifications**: Email, SMS, in-app

### 7.2 Scheduling Preferences

- **Working Hours** (hour-based), max hours
- **Service Delivery**: Min/Max visit duration, travel allowances
- **Qualifications**: Required certs, min experience
- **Resource Management**: Vehicles, usage recommendations

### 7.3 Admin Settings (Role-Based)

- **Access Control**: Fine-tune permissions
- **System Preferences**: UI theme, language, time zone
- **Audit Logs**: Changes to scheduling, employee data

### 7.4 Super Admin Settings

- **Organization Management**: Activate/suspend, usage stats
- **System-Wide Config**: Global constraints, branding
- **Trial Conversions & Metrics**: Track usage, upsell prompts

---

## 8. Data Flow & Real-Time Sync

- **eCare** Integration
  - Incoming: Employee data, client requirements, visit completions
  - Outgoing: Optimized schedules, route details
- **Timefold.ai**
  - Automated scheduling with constraints
  - Real-time triggers on data changes
- **Debouncing** & conflict resolution: Hard constraints first

---

## 9. Implementation Phases

1. **Phase 1: Basic UI**

   - Main layout (top nav, sidebar, common pages)
   - Role-based access restrictions
   - Initial constraint management UI

2. **Phase 2: Timefold Integration**

   - Advanced scheduling page, route optimization
   - Manual vs. auto triggers
   - Conflict warnings & resolution suggestions
   - Constraint mapping to Timefold's API

3. **Phase 3: eCare Integration**

   - Data syncing & webhooks
   - Real-time updates (employee leaves, new client constraints, completed visits)
   - Error handling & conflict resolution

4. **Phase 4: Analytics & Reporting**
   - Charts, KPI dashboards, exports
   - **Continuity KPI** & traffic-light recommendations
   - Deeper performance tracking & schedule optimization

---

## 10. Accessibility & Performance

- **ARIA Labels & Keyboard Navigation**: Full accessibility for interactive elements
- **Responsive Layout**: Works on desktops, tablets, possibly mobile
- **Lazy Loading**: Large lists (employees, clients)
- **Caching & Debounce**: To handle real-time updates smoothly
- **Monitoring**: Error logs, audit trails, performance stats

---

## 11. Conclusion

With these **expanded dashboard metrics** and **clickable KPI cards**, the Caire platform ensures quick, intuitive access to essential data (employees, vehicles, cost/revenue, billable hours, schedule optimization trend). By removing direct scheduling completions from the UI (which remain in eCare) and focusing on **read-only** scheduling data for optimization, Caire cleanly supports real-time scheduling improvements and robust analytics while leaving visit execution to the eCare system.

This **detailed spec** should serve as a clear guide for **designers and developers** to implement the **UI** in alignment with Caire's MVP and future phases.

```

```
