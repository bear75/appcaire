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
│   │               ├── analytics/    # Analytics page
│   │               ├── clients/      # Clients page
│   │               ├── employees/    # Employees page
│   │               ├── schedule/     # Schedule page
│   │               └── settings/     # Settings page
│   ├── components/          # Shared components
│   │   ├── layout/         # Layout components
│   │   │   └── Sidebar.tsx # Main navigation sidebar
│   │   └── ui/            # UI components from shadcn/ui
│   ├── features/          # Feature-specific components
│   │   ├── analytics/     # Analytics features
│   │   ├── dashboard/     # Dashboard features
│   │   └── settings/      # Settings features
│   ├── libs/             # Library integrations
│   ├── locales/          # Translation files
│   ├── styles/           # Global styles
│   ├── templates/        # Page templates
│   │   └── Logo.tsx     # Logo component
│   └── utils/           # Utility functions
├── package.json         # Project dependencies
└── README.md           # Project overview
```

## Key Directories

- `docs/`: Contains all project documentation
- `public/`: Static assets including logos and favicons
- `src/app/`: Next.js application pages using the App Router
- `src/components/`: Reusable UI components
- `src/features/`: Feature-specific components and logic
- `src/templates/`: Page templates and layouts
- `src/utils/`: Utility functions and helpers

## Notable Files

- `heart-logo.svg`: Main logo file used throughout the application
- `Logo.tsx`: Logo component implementation
- `Sidebar.tsx`: Main navigation component
- `generate-favicons.js`: Script to generate favicon files from SVG

## Root Structure

```
src/
├── app/
│   └── [locale]/
│       ├── (auth)/
│       │   └── dashboard/
│       │       ├── analytics/
│       │       │   └── page.tsx
│       │       ├── clients/
│       │       │   └── page.tsx
│       │       ├── employees/
│       │       │   └── page.tsx
│       │       ├── schedule/
│       │       │   └── page.tsx
│       │       └── settings/
│       │           └── page.tsx
│       ├── (marketing)/
│       └── layout.tsx
├── components/
│   ├── layout/
│   │   ├── ClerkHeader.tsx
│   │   └── Navigation.tsx
│   └── ui/
├── features/
│   ├── analytics/
│   │   ├── AnalyticsDashboard.tsx
│   │   └── AnalyticsHeader.tsx
│   ├── clients/
│   │   ├── ClientHeader.tsx
│   │   └── ClientList.tsx
│   ├── employees/
│   │   ├── EmployeeHeader.tsx
│   │   └── EmployeeList.tsx
│   ├── schedule/
│   │   ├── ScheduleHeader.tsx
│   │   └── ScheduleView.tsx
│   └── settings/
│       ├── SettingsHeader.tsx
│       ├── SettingsTabs.tsx
│       └── sections/
│           ├── OrganizationSettings.tsx
│           ├── UserSettings.tsx
│           ├── NotificationSettings.tsx
│           ├── SecuritySettings.tsx
│           └── LocalizationSettings.tsx
├── lib/
├── locales/
│   ├── en.json
│   └── sv.json
└── styles/
    └── globals.css
```

## Key Directories

### `/app`

Next.js 13+ app directory using the new App Router.

- `[locale]`: Dynamic route for language support
- `(auth)`: Route group for authenticated pages
- `(marketing)`: Route group for public pages

### `/components`

Reusable UI components.

- `layout`: Layout-specific components
- `ui`: Shadcn UI components

### `/features`

Feature-specific components and logic.

- `analytics`: Analytics dashboard components
- `clients`: Client management components
- `employees`: Employee management components
- `schedule`: Schedule management components
- `settings`: Settings management components

### `/lib`

Utility functions and configurations.

### `/locales`

Internationalization files.

- `en.json`: English translations
- `sv.json`: Swedish translations

### `/styles`

Global styles and Tailwind configuration.

## Component Structure

### Analytics

```
features/analytics/
├── AnalyticsDashboard.tsx  # Main analytics dashboard
└── AnalyticsHeader.tsx     # Analytics page header
```

### Settings

```
features/settings/
├── SettingsHeader.tsx      # Settings page header
├── SettingsTabs.tsx       # Settings navigation tabs
└── sections/              # Settings section components
    ├── OrganizationSettings.tsx
    ├── UserSettings.tsx
    ├── NotificationSettings.tsx
    ├── SecuritySettings.tsx
    └── LocalizationSettings.tsx
```

### Clients

```
features/clients/
├── ClientHeader.tsx        # Client page header
└── ClientList.tsx         # Client management interface
```

### Employees

```
features/employees/
├── EmployeeHeader.tsx     # Employee page header
└── EmployeeList.tsx      # Employee management interface
```

### Schedule

```
features/schedule/
├── ScheduleHeader.tsx     # Schedule page header
└── ScheduleView.tsx      # Schedule management interface
```

## File Naming Conventions

- React components: PascalCase (e.g., `AnalyticsDashboard.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Constants: UPPER_CASE (e.g., `API_ENDPOINTS.ts`)
- Pages: lowercase (e.g., `page.tsx`)
- Styles: kebab-case (e.g., `globals.css`)

## Import Conventions

```typescript
// External imports
import { useTranslations } from "next-intl";
import { useState } from "react";

// Internal imports
import { Button } from "@/components/ui/button";
import { AnalyticsHeader } from "@/features/analytics/AnalyticsHeader";
```

## Component Organization

Each feature directory follows a similar structure:

- Main components
- Supporting components
- Feature-specific utilities
- Types and interfaces

## Style Organization

- Tailwind utility classes
- Component-specific styles
- Global styles in `globals.css`

## Testing Structure

```
__tests__/
├── components/
├── features/
└── utils/
```

## Documentation

```
docs/
├── file-dir.md           # This file
├── ui-guidelines.md      # UI/UX guidelines
├── tech-stack.md        # Technology stack
└── prd.md              # Product requirements
```
