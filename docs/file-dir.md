# File Directory Structure

## Root Structure
```
📦 appcaire
├── 📂 app                  # Next.js 13 App Router pages
├── 📂 components          # React components
├── 📂 docs                # Project documentation
├── 📂 drizzle             # Database migrations
├── 📂 public              # Static assets
├── 📂 src                 # Source code
└── 📂 tests               # Test files
```

## Core Libraries (/src/lib)
```
📦 lib
├── 📂 clerk               # Authentication
│   ├── 📜 client.ts       # Clerk client setup
│   ├── 📜 config.ts       # Configuration
│   └── 📜 utils.ts        # Auth utilities
├── 📂 db                  # Database (Drizzle)
│   ├── 📂 schema          # Database schema
│   │   ├── 📜 tables.ts   # Table definitions
│   │   ├── 📜 types.ts    # Schema types
│   │   └── 📜 index.ts    # Schema exports
│   ├── 📂 migrations      # Migration utilities
│   ├── 📜 client.ts       # Database client
│   └── 📜 index.ts        # Database exports
├── 📂 timefold           # Scheduling
│   ├── 📜 client.ts       # Timefold client
│   ├── 📜 types.ts        # Scheduling types
│   └── 📜 utils.ts        # Scheduling utilities
├── 📂 hooks              # Custom hooks
│   ├── 📂 auth           # Authentication hooks
│   ├── 📂 db             # Database hooks
│   └── 📂 schedule       # Scheduling hooks
└── 📂 utils              # Shared utilities
    ├── 📜 date.ts         # Date utilities
    ├── 📜 format.ts       # Formatting utilities
    └── 📜 validation.ts   # Validation utilities
```

## Database Files
```
📦 drizzle
├── 📂 meta               # Migration metadata
│   └── 📜 _journal.json  # Migration journal
└── 📂 migrations         # SQL migrations
    └── 📜 *.sql          # Migration files
```

## Documentation Files
```
📦 docs
├── 📜 db-design.md       # Database design
├── 📜 tech-stack.md      # Technology stack
├── 📜 file-dir.md        # This file
└── 📜 file-structure-plan.md  # Migration plan
```

## Component Organization
```
📦 components
├── 📂 ui                 # shadcn/ui components
├── 📂 layout            # Layout components
├── 📂 features          # Feature components
└── 📂 shared            # Shared components
```

## Test Organization
```
📦 tests
├── 📂 unit              # Unit tests
├── 📂 integration       # Integration tests
└── 📂 e2e               # End-to-end tests
```

## Configuration Files
```
📦 root
├── 📜 .env.local         # Local environment variables
├── 📜 drizzle.config.ts  # Drizzle configuration
├── 📜 next.config.js     # Next.js configuration
├── 📜 tailwind.config.js # Tailwind configuration
└── 📜 tsconfig.json      # TypeScript configuration
```

## Notes
- All paths are relative to project root
- Use consistent naming conventions
- Keep documentation updated
- Follow modular organization
- Maintain clear separation of concerns
