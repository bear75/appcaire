# UI Pages Documentation

## Overview
This document outlines the structure and components of each page in the Caire Platform.

## Pages

### 1. Dashboard (`/dashboard`)
Main overview page showing key metrics and quick actions.

#### Components
- `DashboardHeader`: Title and user/organization info
- `DashboardOverview`: KPI cards showing:
  - Active employees
  - Active clients
  - Weekly schedule completion rate
  - Average travel time
- `QuickActions`: Quick access buttons for common tasks
- `RecentActivity`: Timeline of recent changes and events

### 2. Schedule Management (`/dashboard/schedule`)
Schedule visualization and optimization interface.

#### Components
- Schedule view with timeline
- Employee/client assignment grid
- Optimization controls
- Constraint satisfaction indicators
- Route visualization
- Schedule metrics

### 3. Employee Management (`/dashboard/employees`)
Employee information and scheduling preferences.

#### Components
- Employee list with filters
- Employee details view
- Skill matrix
- Availability calendar
- Constraint management
- Integration with eCare system

### 4. Client Management (`/dashboard/clients`)
Client information and visit requirements.

#### Components
- Client list with filters
- Client details view
- Visit requirements
- Special needs/preferences
- Service history
- Integration with eCare system

### 5. Settings (`/dashboard/settings`)
Organization and system settings.

#### Components
- Organization details
- Constraint management
- Integration settings
- User management
- Role permissions
- System preferences

### 6. Analytics (`/dashboard/analytics`)
Performance metrics and reporting.

#### Components
- KPI dashboard
- Efficiency metrics
- Travel optimization stats
- Staff utilization charts
- Client satisfaction metrics
- Custom report builder

### 7. Organization Profile (`/dashboard/organization-profile`)
Organization management interface.

#### Components
- Organization details form
- Billing information
- Subscription management
- API keys and integration tokens
- Team member management

### 8. User Profile (`/dashboard/user-profile`)
Individual user settings and preferences.

#### Components
- Personal information
- Notification preferences
- Language settings
- Theme preferences
- Security settings

## Common Elements

### Headers
```tsx
<header className="mb-6">
  <h1 className="text-2xl font-bold">{t('title_bar')}</h1>
  <p className="text-muted-foreground">{t('title_bar_description')}</p>
</header>;
```

### Data Tables
```tsx
<DataTable
  columns={columns}
  data={data}
  searchable
  sortable
  pagination
/>;
```

### Forms
```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormFields />
    <Button type="submit">
      {t('submit_button')}
    </Button>
  </form>
</Form>;
```

### Filters
```tsx
<div className="mb-6 flex gap-4">
  <Input
    placeholder={t('search_placeholder')}
    onChange={e => setSearch(e.target.value)}
  />
  <Select
    options={filterOptions}
    onChange={setFilter}
    placeholder={t('filter_placeholder')}
  />
</div>;
```

## Responsive Behavior

### Mobile View
- Single column layout
- Collapsible navigation
- Simplified tables
- Full-width forms
- Touch-friendly controls

### Tablet View
- Two column layout where appropriate
- Sidebar navigation
- Responsive tables
- Optimized forms

### Desktop View
- Multi-column layout
- Persistent navigation
- Full feature set
- Advanced visualizations

## State Management

### Loading States
```tsx
{ isLoading
  ? (
      <LoadingSkeleton />
    )
  : (
      <PageContent data={data} />
    ); }
```

### Error States
```tsx
{ error
  ? (
      <ErrorMessage message={error.message} />
    )
  : (
      <PageContent data={data} />
    ); }
```

### Empty States
```tsx
{ items.length === 0
  ? (
      <EmptyState
        icon={<Icon />}
        title={t('empty_state_title')}
        description={t('empty_state_description')}
      />
    )
  : (
      <ItemsList items={items} />
    ); }
```

## Internationalization
All pages use the `useTranslations` hook from `next-intl` for Swedish language support:

```tsx
// Example component using translations
function PageTitle() {
  const t = useTranslations('PageNamespace');

  return (
    <h1>{t('title')}</h1>
  );
}
```

## Performance Considerations
- Implement virtualization for long lists
- Use pagination for large datasets
- Lazy load images and heavy components
- Cache API responses
- Optimize bundle size with code splitting

## Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support
- High contrast mode support

These pages form the core interface of the Caire Platform, providing a comprehensive solution for home care scheduling and management.
