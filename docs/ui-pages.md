# UI Pages Documentation

## Phase 1: Basic UI Implementation

### Common Elements

- Sidebar navigation with:
  - Logo (heart-shaped, green #22c55e)
  - Navigation links with Lucide icons
  - Active state indicators

### Dashboard Pages

#### Analytics Dashboard

- Date range selector
- Metrics cards displaying:
  - Total tasks
  - Completed tasks
  - Pending tasks
  - Active employees
  - Total travel time
  - Completion rate
- Mock data for development

#### Employees Page

- List of employees in card format
- Each card shows:
  - Employee name
  - Role
  - Status
  - Tasks today
  - Completed tasks
- "Add Employee" button
- Mock data for development

#### Schedule Page

- List of scheduled tasks
- Each task card shows:
  - Time
  - Client
  - Employee
  - Status
  - Task type
- "View Calendar" and "Add Task" buttons
- Mock data for development

#### Clients Page

- List of clients in card format
- Each card shows:
  - Client name
  - Address
  - Contact info
  - Active tasks
  - Last visit
- "Add Client" button
- Mock data for development

#### Settings Page

- Organization settings section:
  - Company name
  - Email
  - Phone
  - Address
- User preferences section:
  - Language
  - Timezone
  - Notification preferences
- Mock data for development

## Implementation Details

### Components

- All pages use shadcn/ui components
- Tailwind CSS for styling
- Responsive design (mobile-first)
- Loading states
- Error handling

### Navigation

- Locale-based routing (/[locale]/...)
- Protected routes under (auth) group
- Dynamic navigation based on user role

### Data Handling

- Mock data for Phase 1
- Structured for easy replacement with real data in Phase 2

### Accessibility

- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast compliance

### Future Phases

- Phase 2: Database integration
- Phase 3: Business logic
- Phase 4: Advanced features
