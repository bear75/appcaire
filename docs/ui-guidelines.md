# UI Guidelines

## Branding

### Logo

- Primary logo: Heart-shaped logo in green (#22c55e)
- Used in:
  - Browser favicon (16x16, 32x32)
  - Apple touch icon (180x180)
  - PWA icon (192x192)
  - Sidebar navigation (24x24)

### Colors

- Primary: Purple (#7C3AED)
- Secondary: Slate-100 (#F1F5F9)
- Background: White (#FFFFFF)
- Text:
  - Primary: Slate-900 (#0F172A)
  - Secondary: Slate-600 (#475569)
  - Muted: Slate-400 (#94A3B8)
- Accents:
  - Success: Green-500 (#22C55E)
  - Warning: Yellow-500 (#EAB308)
  - Error: Red-500 (#EF4444)
  - Info: Blue-500 (#3B82F6)

## Layout

### Shared Components

#### Page Layout Components

To maintain consistency across all pages, use these shared layout components:

##### PageContainer
```tsx
import { PageContainer } from '@/components/shared';

// Provides consistent padding and background
<PageContainer>
  {/* Page content */}
</PageContainer>
```

Properties:
- Base padding: `p-8 pt-6`
- Background: `bg-slate-50`
- Spacing between sections: `space-y-8`
- Flex layout: `flex-1`

##### PageHeader
```tsx
import { PageHeader } from '@/components/shared';

<PageHeader
  title="Page Title"
  description="Optional page description"
>
  {/* Optional right-side content */}
</PageHeader>
```

Properties:
- Title: `text-2xl font-semibold text-slate-900`
- Description: `text-sm text-slate-600`
- Layout: Flexbox with space between title and optional content

### Navigation

### Navbar

- only visible for users not logged in
- Single navigation component (`src/templates/Navbar.tsx`)
- Consistent across all pages
- Contains:
  - Organization logo and name
  - Main navigation links
  - User profile menu
  - Notifications
  - Search (optional)
- Styling:
  - Background: White (#FFFFFF)
  - Border bottom: 1px solid Slate-200
  - Height: 64px
  - Responsive on all screen sizes

### Main Navigation Items

### Sidebar Navigation

- only visible for users logged in
- Dashboard (Översikt)
- Schedule (Schema)
- Employees (Personal)
- Clients (Klienter)
- Analytics (Analys)
- Settings (Inställningar)

## Styling

### Global CSS

- Single `global.css` file in `src/styles/`
- Contains:
  - Tailwind base, components, and utilities
  - Root variables for theming
  - Dark mode selectors
  - Global resets and defaults

### Component Styling

#### Shared Component Constants

Use these predefined styles for consistent component styling:

```tsx
const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

const ICON_STYLES = 'size-4 text-purple-600';
```

#### Form Elements

##### Inputs
```tsx
<Input className="bg-white border-slate-200" />
```

##### Select
```tsx
<SelectTrigger className="bg-white border-slate-200">
  <SelectValue />
</SelectTrigger>
```

##### Switch
```tsx
<Switch className="data-[state=checked]:bg-purple-600" />
```

#### Buttons

Primary:
```tsx
<Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md">
  Button Text
</Button>
```

Ghost:
```tsx
<Button 
  variant="ghost"
  className="text-slate-600 hover:text-slate-900 hover:bg-slate-50"
>
  Button Text
</Button>
```

#### Badges

Default:
```tsx
<Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200">
  Badge Text
</Badge>
```

Status:
```tsx
<Badge className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200/50">
  Status
</Badge>
```

### Component Styling

- Use Tailwind utility classes exclusively
- No component-specific CSS files
- shadcn/ui components for common UI elements

#### Cards
- Base styling:
  - Background: White
  - Border: 1px solid rgb(226, 232, 240)
  - Border Radius: 0.75rem (rounded-xl)
  - Padding: p-6
  - Shadow: shadow-sm
- Hover effects:
  - Transform: scale(1.01)
  - Shadow: shadow-lg
  - Transition: all 0.2s ease-in-out
- 3D effects:
  - Transform: translateY(-2px)
  - Box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
  - Transition: transform 0.2s, box-shadow 0.2s

#### Stats Cards
- Layout:
  - Grid: 2 columns on mobile, 3-4 on desktop
  - Gap: 1rem (gap-4)
- Content:
  - Large number (text-3xl font-bold)
  - Label (text-sm text-slate-600)
  - Optional icon (top right)
- Hover:
  - Scale effect: scale(1.02)
  - Elevated shadow
  - Smooth transition

#### Charts
- Container:
  - Background: White
  - Padding: p-6
  - Border radius: rounded-xl
  - Shadow: shadow-sm
- Colors:
  - Bar charts: Purple (#7C3AED)
  - Line charts: Green (#22C55E) for trends
  - Area charts: Purple with opacity
- Hover effects:
  - Tooltip with detailed data
  - Highlight active data point

#### Tabs
- Layout:
  - Grid layout for tab lists
  - Gap: 1rem between items
  - Padding: px-3 py-2
- States:
  - Default: text-slate-600
  - Hover: bg-slate-50 text-slate-900
  - Active: bg-purple-50 text-purple-600
  - Border bottom for active state
- Transitions:
  - Smooth color transitions
  - 0.2s duration

### Components

- Cards:

  - Clean white background
  - Subtle border
  - Rounded corners (lg)
  - Optional header with actions
  - Consistent padding (p-6)
  - Shadow on hover for interactive cards

- Stats Cards:

  - Large numbers with unit display
  - Secondary label
  - Trend indicators (up/down arrows)
  - Percentage changes in green/red
  - Efficiency indicator (color-coded)
  - Icon in top right

- Charts:

  - Clean axes with minimal grid lines
  - Smooth curves for line charts
  - Interactive tooltips with formatted values
  - Consistent color scheme:
    - Revenue: Purple (#7C3AED)
    - Costs: Red (#EF4444)
    - Efficiency: Green (#22C55E)
    - Billable Hours: Blue (#3B82F6)
  - Responsive containers
  - Optional legend

- Tables:
  - Zebra striping
  - Compact rows
  - Column sorting
  - Status indicators with badges
  - Action buttons
  - Hover states

- Tabs:
  - Layout:
    - Grid layout for tab lists
    - 2 columns on mobile, 5 columns on desktop
    - Gap of 16px (gap-4) between tabs
    - Light background with padding
  - Styling:
    - Active state: Purple-50 background (#F5F3FF) with Purple-600 text (#7C3AED)
    - Hover state: Slate-50 background with Slate-900 text
    - Rounded corners (rounded-md)
    - Consistent padding (px-3 py-2)
    - Font: Text-sm with medium weight
    - Icons: Consistent size-4 (16px)
  - Variants:
    - Settings tabs: Include icons with labels
    - Analytics tabs: Text only with full width
    - All tabs use consistent purple active state

## Typography

- Font: Inter
- Headings:
  - H1: text-2xl font-semibold
  - H2: text-xl font-semibold
  - H3: text-lg font-medium
- Body:
  - Regular: text-base
  - Small: text-sm
  - Muted: text-slate-600
- Weights:
  - Regular: 400
  - Medium: 500
  - Semibold: 600
  - Bold: 700

## Spacing

- Base unit: 4px
- Common spacing:
  - xs: 8px (2 units)
  - sm: 12px (3 units)
  - md: 16px (4 units)
  - lg: 24px (6 units)
  - xl: 32px (8 units)

## Icons

- Style: Line icons (Lucide)
- Size:
  - Default: 20px
  - Small: 16px
  - Large: 24px
- Stroke: 1.5px
- Colors:
  - Default: Slate-600
  - Active: Purple-600
  - Muted: Slate-400

## Interactive States

- Buttons:

  - Primary: Purple-600
  - Secondary: Slate-100
  - Hover: Darken 10%
  - Active: Darken 15%
  - Disabled: Opacity 50%

- Links:
  - Default: Purple-600
  - Hover: Purple-700
  - Visited: Purple-800

- Tabs:
  - Default:
    - Text: Slate-600
    - Background: Transparent
  - Hover:
    - Text: Slate-900
    - Background: Slate-50
  - Active:
    - Text: Purple-600
    - Background: Purple-50
  - Transition: All properties with smooth animation

## Data Visualization

- Charts:

  - Primary: Purple-500
  - Secondary: Slate-300
  - Success: Green-500
  - Warning: Yellow-500
  - Grid: Slate-100
  - Tooltips: White background with shadow
  - Axis labels: Slate-600
  - Chart types:
    - Line: Smooth curves for trends
    - Bar: Solid fills for comparisons
    - Doughnut: For distribution
    - Area: For cumulative data

- Progress:
  - Track: Slate-100
  - Fill: Purple-600
  - Success: Green-500
  - Warning: Yellow-500
  - Animated transitions

## Loading States

- Skeleton:

  - Background: Slate-100
  - Animation: Pulse
  - Duration: 2s
  - Card-shaped placeholders

- Spinners:
  - Color: Purple-600
  - Size: 20px
  - Duration: 1s
  - Centered in container

## Responsive Design

- Breakpoints:

  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

- Layout:
  - Mobile: Single column
  - Tablet: Two columns
  - Desktop: Multi-column
  - Grid system with gap-4 spacing
  - Responsive card layouts

## Accessibility

- Focus states:

  - Ring color: Purple-400
  - Ring width: 2px
  - Ring offset: 2px
  - Visible keyboard navigation

- Color contrast:
  - Text: WCAG AA+
  - Interactive elements: WCAG AAA
  - Status indicators: Clear distinction

## Analytics Components

### KPI Cards

- Three-column grid on desktop
- Single column on mobile
- Consistent height
- Icon indicators
- Trend arrows
- Percentage changes
- Efficiency color coding:
  - Green: >70%
  - Yellow: 65-70%
  - Red: <65%

### Chart Layouts

- Two-column grid for main charts
- Full width for detailed views
- Consistent height (300px)
- Responsive scaling
- Loading states with skeleton
- Error states with retry

### Data Tables

- Sortable columns
- Pagination
- Search/filter
- Status badges
- Action buttons
- Mobile-responsive

## Best Practices

- Use consistent spacing
- Maintain visual hierarchy
- Ensure responsive behavior
- Optimize for performance
- Follow accessibility guidelines
- Use semantic HTML
- Implement smooth transitions
- Provide feedback on actions
- Use loading states for async operations
- Handle error states gracefully

## Charts

### Donut Charts

- Use for displaying distribution data (e.g., task categories, skill distribution)
- Labels should show both name and value (e.g., "Medicinsk : 30")
- Colors:
  - Primary: #7C3AED (Purple)
  - Secondary: #3B82F6 (Blue)
  - Success: #22C55E (Green)
  - Warning: #EAB308 (Yellow)
  - Neutral: #94A3B8 (Gray)
- Data structure:

```typescript
const chartData = {
  data: [
    { name: 'Category 1', value: 30 },
    { name: 'Category 2', value: 25 },
  ],
  datasets: [
    {
      dataKey: 'value',
      backgroundColor: ['#7C3AED', '#3B82F6'],
    },
  ],
};
```

### Bar Charts

- Use for comparing values across categories
- Show clear axis labels and grid lines
- Include tooltips with formatted values
- Data structure:

```typescript
const chartData = {
  data: [
    { name: 'Jan', value: 12000 },
    { name: 'Feb', value: 19000 },
  ],
  datasets: [
    {
      dataKey: 'value',
      label: 'Chart Label',
      backgroundColor: '#7C3AED',
    },
  ],
};
```

### Line Charts

- Use for showing trends over time
- Include data points and smooth curves
- Show grid lines for better readability
- Data structure matches bar chart format

```

## Translation System

### Key Structure

- Namespace-based organization (e.g., 'Analytics', 'Schedule')
- Dot notation for nested keys
- Type-safe implementation using TypeScript

### Translation Usage

```typescript
// Direct translation
const title = t('Analytics.title');

// With interpolation
const warning = t('Analytics.warnings.message', {
  client: 'Anna Nilsson',
  caregivers: 8,
  period: 'senaste 30 dagarna'
});

// Component-specific translations
const tableHeaders = {
  client: t('Analytics.table.client'),
  date: t('Analytics.table.date'),
  status: t('Analytics.table.status')
};
```

### Status Messages

- Success messages: t('Analytics.status.success')
- Warning messages: t('Analytics.status.warning')
- Error messages: t('Analytics.status.error')
- Dynamic values using interpolation

### Component Labels

- Button text: t('Analytics.buttons.[action]')
- Table headers: t('Analytics.table.[column]')
- Form labels: t('Analytics.form.[field]')
- Chart labels: t('Analytics.charts.[type]')

### Charts

- Labels and titles use translation keys
- Tooltips with formatted values
- Status indicators with translated states
- Proper aria-labels for accessibility

### Tables

- Headers use translation keys
- Status badges with translated states
- Pagination text translated
- Empty state messages localized

## Page Structure & Layout

### Standard Page Layout
```typescript
// src/components/layout/PageLayout.tsx
type PageLayoutProps = {
  title: string; // Page title
  description?: string; // Optional description
  actions?: ReactNode; // Optional action buttons
  children: ReactNode; // Page content
};
```

Every page should follow this structure:
1. PageHeader (consistent spacing and styling)
2. Content sections (standardized gaps)
3. Optional footer

### Spacing System
- Page padding: p-6 (desktop), p-4 (mobile)
- Section gaps: space-y-6
- Card gaps: gap-4
- Internal padding: p-4 (cards), p-6 (sections)

### Header Pattern
```tsx
<div className="mb-8">
  <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
  {description && (
    <p className="mt-2 text-sm text-slate-600">{description}</p>
  )}
  {actions && (
    <div className="mt-4 flex items-center gap-3">{actions}</div>
  )}
</div>;
```

## Component Styling

### Cards
- Base styling:
  ```tsx
  <Card className="overflow-hidden bg-white hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1">
  ```
- Header:
  ```tsx
  <CardHeader className="bg-slate-50 border-b border-slate-100">
  ```
- Content:
  ```tsx
  <CardContent className="p-6">
  ```

### Status Badges
```tsx
const STATUS_STYLES = {
  success: 'bg-green-50 text-green-700 border-green-100',
  warning: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  error: 'bg-red-50 text-red-700 border-red-100',
  info: 'bg-blue-50 text-blue-700 border-blue-100'
};
```

### Interactive Elements

#### Buttons
- Primary:
  ```tsx
  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
  ```
- Secondary:
  ```tsx
  <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
  ```
- Ghost:
  ```tsx
  <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
  ```

#### Links
```tsx
<Link className="text-purple-600 hover:text-purple-700 underline-offset-4 hover:underline">
```

### Data Display

#### Tables
```tsx
<Table>
  <TableHeader className="bg-slate-50">
    <TableRow className="hover:bg-slate-100">
      <TableHead className="font-medium text-slate-600">
  // ... content
```

#### Charts
- Container styling:
  ```tsx
  <div className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-all duration-200">
  ```
- Chart colors:
  ```typescript
  const CHART_COLORS = {
    primary: '#7C3AED', // Purple
    secondary: '#3B82F6', // Blue
    success: '#22C55E', // Green
    warning: '#EAB308', // Yellow
    error: '#EF4444' // Red
  };
  ```

## Section Patterns

### Metric Cards Grid
```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {metrics.map(metric => (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{metric.title}</CardTitle>
        {metric.icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        <p className="text-sm text-slate-600">{metric.description}</p>
      </CardContent>
    </Card>
  ))}
</div>;
```

### Data Section
```tsx
<section className="space-y-6">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-slate-900">
      {sectionTitle}
    </h2>
    <div className="flex items-center gap-3">
      {actions}
    </div>
  </div>
  <div className="rounded-xl border border-slate-200 bg-white">
    {children}
  </div>
</section>;
```

## Theme Configuration

### Colors
```typescript
const colors = {
  primary: {
    50: '#F5F3FF', // Light purple
    100: '#EDE9FE',
    500: '#8B5CF6',
    600: '#7C3AED', // Main purple
    700: '#6D28D9', // Dark purple
  },
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    600: '#475569',
    900: '#0F172A',
  }
};
```

### Shadows
```typescript
const shadows = {
  sm: 'shadow-sm',
  DEFAULT: 'shadow',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};
```

### Animation
```typescript
const animation = {
  DEFAULT: 'transition-all duration-200',
  slow: 'transition-all duration-300',
  fast: 'transition-all duration-150',
};
```

## Implementation Guide

1. Create base layout components:
   ```
   src/components/layout/
   ├── PageLayout.tsx
   ├── PageHeader.tsx
   ├── SectionHeader.tsx
   └── ContentSection.tsx
   ```

2. Use consistent class patterns:
   ```typescript
   const COMMON_CLASSES = {
     card: 'rounded-xl border border-slate-200 bg-white hover:shadow-lg transition-all duration-200',
     header: 'text-2xl font-semibold text-slate-900',
     description: 'text-sm text-slate-600',
     section: 'space-y-6',
   };
   ```

3. Implement shared hover effects:
   ```typescript
   const HOVER_EFFECTS = {
     card: 'hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1',
     button: 'hover:shadow-md hover:scale-[1.02]',
     link: 'hover:text-purple-700 hover:underline',
   };
   ```

4. Use consistent spacing:
   ```typescript
   const SPACING = {
     page: 'p-6',
     section: 'space-y-6',
     card: 'p-4',
     header: 'mb-8',
   };
   ```

This system ensures:
- Consistent visual hierarchy
- Predictable spacing
- Unified interactive states
- Maintainable theme updates
- Responsive behavior
- Accessible components

## Common Component Patterns

### Card Base Styles
```typescript
const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  small: 'hover:scale-[1.02]',
  large: 'hover:scale-[1.01]',
};
```

### Layout Patterns

#### Grid Layouts
- KPI Cards: `grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3`
- Chart Grid: `grid gap-4 md:grid-cols-2`
- Full Width: `w-full`

#### Spacing
- Page Container: `space-y-8`
- Section Spacing: `space-y-6`
- Card Padding: `p-6`
- Card Content Split: `pb-2` for header, `pt-2` for content

### Card Components

#### KPI Cards
```tsx
<div className={cn(CARD_STYLES.base, CARD_STYLES.small)}>
  <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
    <h3 className="text-sm font-medium">{title}</h3>
    <Icon className="size-4 text-muted-foreground" />
  </div>
  <div className="p-6 pt-2">
    <div className="text-2xl font-bold">{value}</div>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
</div>;
```

#### Chart Cards
```tsx
<div className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
  <div className="p-6">
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
  <div className="p-6 pt-2">
    <Chart data={chartData} height={300} />
  </div>
</div>;
```

### Typography Patterns

#### Card Headers
- KPI Cards: `text-sm font-medium`
- Chart Cards: `text-lg font-semibold`
- Section Headers: `text-xl font-semibold`

#### Values and Metrics
- KPI Values: `text-2xl font-bold`
- Descriptions: `text-xs text-muted-foreground`
- Chart Labels: `text-sm text-slate-600`

### Icon Usage
- KPI Cards: `size-4 text-muted-foreground`
- Navigation: `size-5`
- Buttons: `size-4`
- Consistent set from Lucide icons

### Chart Styling

#### Bar Charts
```typescript
const chartConfig = {
  data: Array<DataPoint>,
  datasets: [
    {
      dataKey: string,
      label: string,
      backgroundColor: string, // Use theme colors
    }
  ]
};
```

#### Color Scheme
- Primary Data: `#7C3AED` (Purple)
- Secondary Data: `#94A3B8` (Slate)
- Success Data: `#22C55E` (Green)
- Accent Colors: `#3B82F6` (Blue)

### Interactive States

#### Hover Effects
- Small Cards: `hover:scale-[1.02]`
- Large Cards: `hover:scale-[1.01]`
- All Cards:
  - `hover:shadow-xl`
  - `hover:-translate-y-1`
  - `hover:border-slate-200`

#### Transitions
```css
transition-all duration-300 ease-out transform-gpu
```

### Responsive Design

#### Breakpoints
- Mobile: 1 column
- Tablet: 2 columns (`md:grid-cols-2`)
- Desktop: 3 columns for KPIs (`lg:grid-cols-3`)

#### Chart Responsiveness
- Height: 300px (consistent across breakpoints)
- Width: 100% of container
- Maintain aspect ratio

### Best Practices

1. Use consistent spacing with Tailwind's spacing scale
2. Implement hover states for interactive elements
3. Ensure smooth transitions for all interactive states
4. Use semantic HTML structure
5. Maintain consistent padding and margins
6. Follow the established color scheme
7. Use responsive design patterns
8. Implement proper accessibility attributes
