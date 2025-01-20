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

- Sidebar:
  - Minimal icons in collapsed state
  - Full text in expanded state
  - Purple highlight for active items
  - Subtle hover states
  - Grouped navigation items
  - Nested items with indentation

### Components

- Cards:

  - Clean white background
  - Subtle border
  - Rounded corners (lg)
  - Optional header with actions
  - Consistent padding
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

## Typography

- Font: Inter
- Headings:
  - H1: 24px, Bold
  - H2: 20px, Semibold
  - H3: 16px, Semibold
- Body:
  - Regular: 14px
  - Small: 12px
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
    { name: "Category 1", value: 30 },
    { name: "Category 2", value: 25 },
  ],
  datasets: [
    {
      dataKey: "value",
      backgroundColor: ["#7C3AED", "#3B82F6"],
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
    { name: "Jan", value: 12000 },
    { name: "Feb", value: 19000 },
  ],
  datasets: [
    {
      dataKey: "value",
      label: "Chart Label",
      backgroundColor: "#7C3AED",
    },
  ],
};
```

### Line Charts

- Use for showing trends over time
- Include data points and smooth curves
- Show grid lines for better readability
- Data structure matches bar chart format
