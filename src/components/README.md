# Components Directory

This directory contains all React components used throughout the application. The components are organized into several subdirectories based on their purpose and scope.

## Directory Structure

- `ui/` - shadcn/ui components and base UI elements
- `layout/` - Layout components (RSC - React Server Components)
- `features/` - Feature-specific components
- `shared/` - Shared components used across multiple features

## Conventions

### Component Organization

- One component per file
- Use PascalCase for component names and files
- Keep components focused and single-responsibility
- Use TypeScript for all components
- Document props with JSDoc comments

### Server vs Client Components

- Use React Server Components (RSC) by default
- Add 'use client' directive only when needed
- Place client components in separate files
- Document why a component needs to be a client component

### Styling

- Use Tailwind CSS for styling
- Follow shadcn/ui patterns for consistency
- Use CSS variables for theming
- Keep styles maintainable and responsive

### Best Practices

- Write self-documenting code
- Keep components small and focused
- Use proper TypeScript types
- Follow accessibility guidelines
- Add proper error boundaries
- Implement proper loading states

## Examples

### Server Component

```tsx
// UserProfile.tsx
import type { User } from "@/types";

type Props = {
  user: User;
};

export function UserProfile({ user }: Props) {
  return (
    <div className="p-4">
      <h1>{user.name}</h1>
      {/* ... */}
    </div>
  );
}
```

### Client Component

```tsx
// InteractiveForm.tsx
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export function InteractiveForm() {
  const [data, setData] = useState("");

  return <form>{/* ... */}</form>;
}
```
