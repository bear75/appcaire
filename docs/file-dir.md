# File Structure

basic structure:
├── README.md                       # README file
├── .github                         # GitHub folder
├── .husky                          # Husky configuration
├── .storybook                      # Storybook folder
├── .vscode                         # VSCode configuration
├── migrations                      # Database migrations
├── public                          # Public assets folder
├── scripts                         # Scripts folder
├── src
│   ├── app                         # Next JS App (App Router)
│   ├── components                  # Reusable components
│   ├── features                    # Components specific to a feature
│   ├── libs                        # 3rd party libraries configuration
│   ├── locales                     # Locales folder (i18n messages)
│   ├── models                      # Database models
│   ├── styles                      # Styles folder
│   ├── templates                   # Templates folder
│   ├── types                       # Type definitions
│   └── utils                       # Utilities folder
├── tests
│   ├── e2e                         # E2E tests, also includes Monitoring as Code
│   └── integration                 # Integration tests
├── tailwind.config.js              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration

```shell
.
├── README.md                       # README file
├── .github                         # GitHub folder
├── .husky                          # Husky configuration
├── .storybook                      # Storybook folder
├── .vscode                         # VSCode configuration
├── .cursorrules                    # AI assistant rules and guidelines
├── docs                           # Documentation folder
│   ├── db-design.md               # Database design documentation
│   ├── file-dir.md               # File structure documentation
│   ├── prd.md                    # Product Requirements Document
│   ├── ui-guidelines.md          # UI/UX guidelines and components
│   └── ui-pages.md               # UI pages documentation
├── migrations                      # Database migrations
├── public                          # Public assets folder
├── scripts                         # Scripts folder
├── src
│   ├── app                         # Next JS App (App Router)
│   │   └── [locale]               # Localized routes
│   │       └── (auth)             # Authenticated routes
│   │           ├── dashboard      # Dashboard pages
│   │           ├── employees      # Employee management
│   │           ├── clients        # Client management
│   │           ├── schedule       # Schedule management
│   │           ├── analytics      # Analytics and reports
│   │           └── settings       # Organization settings
│   ├── components                  # Reusable components
│   │   ├── ui                     # Shadcn UI components
│   │   ├── forms                  # Form components
│   │   ├── charts                 # Chart components
│   │   └── analytics              # Analytics components
│   ├── features                    # Feature-specific components
│   │   ├── dashboard              # Dashboard components
│   │   ├── employees              # Employee management components
│   │   ├── clients                # Client management components
│   │   ├── schedule               # Schedule management components
│   │   └── settings               # Settings components
│   ├── libs                        # 3rd party libraries configuration
│   │   ├── supabase               # Supabase client config
│   │   └── timefold               # Timefold.ai integration
│   ├── locales                     # Locales folder (i18n messages)
│   ├── models                      # Database models and schemas
│   ├── styles                      # Global styles
│   ├── types                       # TypeScript type definitions
│   └── utils                       # Utility functions
├── tests
│   ├── e2e                         # E2E tests
│   └── integration                 # Integration tests
├── tailwind.config.js              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

## Key Directories

### `/docs`
Contains all project documentation including database design, UI guidelines, and product requirements.

### `/src/app/[locale]/(auth)`
Contains all authenticated routes organized by feature (dashboard, employees, clients, etc.).

### `/src/components`
Reusable UI components organized by type (ui, forms, charts, analytics).

### `/src/features`
Feature-specific components organized by domain (dashboard, employees, clients, etc.).

### `/src/libs`
Third-party library configurations and integrations (Supabase, Timefold.ai).

### `/src/models`
Database models and schemas using Drizzle ORM.
- `Schema.ts` - Main database schema definitions
- `types.ts` - TypeScript types for database entities

### `/migrations`
Database migrations and metadata:
- SQL migration files (e.g., `0001_migration_name.sql`)
- `/meta` - Migration metadata and snapshots
- Generated and managed by Drizzle ORM

### `/src/libs`
Third-party library configurations and integrations:
- `DB.ts` - Database configuration and client
- `Env.ts` - Environment configuration
- `supabase.ts` - Supabase client setup
- `timefold.ts` - Timefold.ai integration

## File Naming Conventions

- React Components: PascalCase (e.g., `DashboardOverview.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Pages: kebab-case (e.g., `organization-settings.tsx`)
- Documentation: kebab-case (e.g., `ui-guidelines.md`)
