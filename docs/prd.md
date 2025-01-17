# Product Requirements Document (PRD) - Caire Platform

## Overview

### Introduction
Caire is a SaaS platform designed to optimize home care scheduling using AI-driven solutions. The platform integrates with existing systems (Alfa eCare, Timefold.ai) to provide efficient scheduling while considering various constraints and preferences.

### Problem Statement
Home care providers face challenges in:
- Efficiently scheduling staff to meet client needs
- Managing complex constraints (skills, preferences, time windows)
- Optimizing travel routes and time
- Maintaining high service quality while reducing costs

### Target Audience
- Home care organizations (private and public)
- Scheduling coordinators (Samordnare)
- Unit managers (Enhetschef)
- Operations managers (Verksamhetschef)
- Executive management (VD/CFO)

### Business Overview
The platform aims to achieve a 5% improvement in staff efficiency, translating to significant cost savings for clients. Key metrics include:
- Reduced travel time
- Improved schedule completion rates
- Higher client and staff satisfaction
- Better constraint satisfaction rates

## Core Features

### 1. User Management
- Role-based access control (RBAC)
- Organization management
- User profiles and preferences
- Trial user management

### 2. Schedule Management
#### Schedule Optimization
- Integration with Timefold.ai
- Real-time schedule updates
- Manual override capabilities
- Route optimization
- Conflict detection and resolution

#### Constraint Management
- Hard constraints (must be satisfied)
  - Working hours limits
  - Required qualifications
  - Time windows for visits
- Medium constraints (should be satisfied)
  - Client preferences
  - Staff preferences
  - Travel time optimization
- Soft constraints (nice to have)
  - Preferred staff assignments
  - Workload balancing
  - Cost optimization

### 3. Employee Management
- Employee profiles and skills
- Availability management
- Constraint preferences
- Schedule viewing and updates
- Integration with Alfa eCare

### 4. Client Management
- Client profiles and needs
- Visit requirements
- Preference management
- Service history tracking
- Integration with Alfa eCare

### 5. Analytics & Reporting
#### Key Performance Indicators
- Schedule efficiency metrics
- Travel time analysis
- Constraint satisfaction rates
- Staff utilization rates
- Client satisfaction metrics

#### Reports
- Daily/weekly/monthly schedules
- Resource utilization reports
- Constraint analysis reports
- Cost optimization reports
- Trial performance metrics

## Technical Overview

### Architecture
- Next.js 13+ with App Router
- TypeScript for type safety
- Supabase for database and auth
- Timefold.ai for scheduling
- Real-time updates via WebSocket

### Database Design
- Multi-tenant architecture
- Role-based access control
- Efficient constraint storage
- Analytics data modeling
- Drizzle ORM for schema management
- Migrations in `/migrations` directory
- See `db-design.md` for details

### Integrations
1. Timefold.ai
   - Schedule optimization
   - Constraint handling
   - Route optimization
   - Field service routing model
   - REST API integration

2. Alfa eCare
   - Employee data sync
   - Client data sync
   - Visit requirements sync
   - Real-time updates

### Security
- GDPR compliance
- Data encryption
- Secure API access
- Row-level security
- Audit logging

## User Interface

### Design Principles
- Clean, professional aesthetic
- Mobile-responsive design
- Accessibility compliance
- Swedish language interface
- See `ui-guidelines.md` for details

### Key Interfaces
1. Dashboard
   - KPI overview
   - Quick actions
   - Recent activity
   - Alerts and notifications

2. Schedule Management
   - Interactive schedule board
   - Drag-and-drop interface
   - Constraint visualization
   - Route mapping

3. Employee/Client Management
   - List and detail views
   - Filter and search
   - Bulk actions
   - Import/export

4. Analytics
   - Interactive charts
   - Custom reports
   - Export capabilities
   - Real-time updates

## Implementation Timeline

### Phase 1: Foundation (Weeks 1-4)
- [ ] Project setup
- [ ] Authentication & authorization
- [ ] Basic UI components
- [ ] Database schema

### Phase 2: Core Features (Weeks 5-8)
- [ ] Employee management
- [ ] Client management
- [ ] Basic scheduling
- [ ] Constraint management

### Phase 3: Optimization (Weeks 9-12)
- [ ] Timefold.ai integration
- [ ] Advanced scheduling
- [ ] Route optimization
- [ ] Real-time updates

### Phase 4: Analytics & Polish (Weeks 13-16)
- [ ] Analytics dashboard
- [ ] Custom reports
- [ ] Performance optimization
- [ ] User testing & feedback

## Success Metrics

### Business Metrics
- 5% improvement in staff efficiency
- 15% reduction in travel time
- 98% schedule completion rate
- 95% constraint satisfaction rate

### Technical Metrics
- 99.9% system uptime
- <2s page load time
- <500ms API response time
- <1s schedule optimization time

### User Metrics
- 90% user satisfaction
- <5min onboarding time
- 80% feature adoption
- <2 support tickets/user/month

## Future Considerations
- Mobile app development
- AI-powered predictions
- Additional integrations
- Advanced analytics
- Custom optimization rules
