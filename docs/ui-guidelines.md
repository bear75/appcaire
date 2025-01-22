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

### Navigation

### Navbar

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
