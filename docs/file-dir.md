# File Directory Structure

```
appcaire/
├── docs/                      # Documentation files
│   ├── file-dir.md           # This file - directory structure
│   ├── prd.md                # Product Requirements Document
│   ├── tech-stack.md         # Technology stack details
│   ├── ui-guidelines.md      # UI design system and guidelines
│   └── ui-pages.md           # UI pages specifications
├── public/                    # Static files
│   ├── heart-logo.svg        # Main logo SVG
│   ├── favicon-16x16.png     # Small favicon
│   ├── favicon-32x32.png     # Medium favicon
│   ├── favicon-192x192.png   # Large favicon for PWA
│   └── apple-touch-icon.png  # iOS touch icon
├── scripts/                   # Utility scripts
│   └── generate-favicons.js  # Favicon generation script
├── src/
│   ├── app/                  # Next.js app directory
│   │   └── [locale]/        # Internationalized routes
│   │       └── (auth)/      # Authenticated routes group
│   │           └── dashboard/# Dashboard pages
│   │               ├── analytics/    # Analytics pages
│   │               │   ├── page.tsx  # Main analytics page
│   │               │   └── layout.tsx# Analytics layout
│   │               ├── clients/      # Clients pages
│   │               ├── employees/    # Employees pages
│   │               ├── schedule/     # Schedule pages
│   │               └── settings/     # Settings pages
│   ├── components/          # Shared components
│   │   ├── layout/         # Layout components
│   │   │   ├── Sidebar.tsx # Main navigation sidebar
│   │   │   └── Navigation.tsx # Navigation components
│   │   └── ui/            # UI components from shadcn/ui
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── charts/    # Chart components
│   │       │   ├── BarChart.tsx
│   │       │   ├── DoughnutChart.tsx
│   │       │   └── LineChart.tsx
│   │       └── table.tsx
│   ├── features/          # Feature-specific components
│   │   ├── analytics/     # Analytics features
│   │   │   ├── AnalyticsDashboard.tsx
│   │   │   ├── ClientInsights.tsx
│   │   │   ├── ContinuityKPI.tsx
│   │   │   ├── MultiOrgAnalytics.tsx
│   │   │   ├── ScheduleOptimization.tsx
│   │   │   └── StaffAnalysis.tsx
│   │   ├── dashboard/     # Dashboard features
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── DashboardMetrics.tsx
│   │   │   └── traffic-light.tsx
│   │   └── settings/      # Settings features
│   ├── libs/             # Library integrations
│   ├── locales/          # Translation files
│   │   └── sv.json      # Swedish translations
│   ├── styles/           # Global styles
│   │   └── global.css  # Global CSS including Tailwind
│   ├── templates/        # Page templates
│   │   └── Navbar.tsx   # Main navigation template
│   └── utils/           # Utility functions
│       ├── translations.ts # Translation utility
│       └── helpers.ts    # Helper functions
├── package.json         # Project dependencies
└── README.md           # Project overview

## Translation Structure

src/locales/sv.json:
```json
{
  "Analytics": {
    "title": "Analys",
    "overview": "Översikt",
    "staff": {
      "performanceTitle": "Personalutnyttjande",
      "skillsTitle": "Kompetenser"
    },
    "clients": {
      "completionRate": "Slutförandegrad",
      "timeWindowTitle": "Tidsfönster följsamhet"
    },
    "table": {
      "client": "Klient",
      "date": "Datum",
      "status": "Status"
    },
    "status": {
      "success": "Godkänd",
      "warning": "Varning"
    }
  }
}
```

## Component Organization

### Analytics Components

```
features/analytics/
├── AnalyticsDashboard.tsx  # Main analytics dashboard
├── ClientInsights.tsx      # Client analytics
├── ContinuityKPI.tsx      # Continuity metrics
├── MultiOrgAnalytics.tsx  # Multi-organization view
├── ScheduleOptimization.tsx# Schedule metrics
└── StaffAnalysis.tsx      # Staff performance
```

### Dashboard Components

```
features/dashboard/
├── DashboardHeader.tsx    # Dashboard header
├── DashboardMetrics.tsx   # KPI metrics
└── traffic-light.tsx      # Traffic light recommendations
```

### UI Components

```
components/ui/
├── button.tsx            # Button component
├── card.tsx             # Card component
├── charts/              # Chart components
│   ├── BarChart.tsx     # Bar chart
│   ├── DoughnutChart.tsx# Doughnut chart
│   └── LineChart.tsx    # Line chart
└── table.tsx           # Table component
```

## Key Files

### Translation Files

- `src/locales/sv.json`: Swedish translations
- `src/utils/translations.ts`: Translation utility functions

### Navigation

- `src/templates/Navbar.tsx`: Main navigation component
- `src/components/layout/Navigation.tsx`: Navigation utilities

### Analytics

- `features/analytics/*.tsx`: Analytics components
- `app/dashboard/analytics/page.tsx`: Analytics page
- `app/dashboard/analytics/layout.tsx`: Analytics layout

## Import Conventions

```typescript
// Translation imports
// Component imports
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BarChart } from '@/components/ui/charts/BarChart';
// Feature imports
import { AnalyticsDashboard } from '@/features/analytics/AnalyticsDashboard';
import { t } from '@/utils/translations';
```

## Style Organization

- `styles/global.css`: Global styles and Tailwind
- Component-specific styles using Tailwind classes
- No CSS modules or separate stylesheets
