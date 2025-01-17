# UI Guidelines for Caire Platform

## Design System

### Colors
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
}
```

### Typography
- Primary Font: Inter
- Headings: Font weights 600-700
- Body: Font weight 400
- Sizes follow Tailwind's scale

### Components

#### Core Components (shadcn/ui)
- Button
- Card
- Form
- Input
- Select
- Tabs
- Dialog
- Sheet
- Table
- Toast

#### Layout Components
```tsx
// Example Card Layout
<Card className="p-6">
  <h2 className="mb-4 text-lg font-semibold">{title}</h2>
  <div className="grid grid-cols-2 gap-4">
    {children}
  </div>
</Card>;
```

### Page Layouts

#### Dashboard Layout
```tsx
<div className="container mx-auto p-6">
  <DashboardHeader />
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    <DashboardOverview />
    <QuickActions />
    <RecentActivity />
  </div>
</div>;
```

### Navigation

#### Button Links
```tsx
<Button
  variant="outline"
  asChild
  className="justify-start gap-2"
>
  <Link href={href}>
    <Icon className="size-4" />
    {label}
  </Link>
</Button>;
```

### Forms

#### Form Layout
```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormField
      control={form.control}
      name="field"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Label</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription>Helper text</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>;
```

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast ratios following WCAG guidelines
- Focus management in modals and forms

### Icons
- Use @radix-ui/react-icons
- Consistent sizing: h-4 w-4 for inline, h-5 w-5 for standalone
- Meaningful alt text or aria-label

### Loading States
- Skeleton loaders for content
- Disabled states for buttons during actions
- Loading spinners for async operations

### Error Handling
- Form validation messages
- Toast notifications for system messages
- Error boundaries for component failures

### Animations
- Use tailwindcss-animate for transitions
- Subtle hover effects
- Loading state animations

### Best Practices
1. Consistent spacing using Tailwind's scale
2. Semantic HTML structure
3. Mobile-first responsive design
4. Accessible interactive elements
5. Swedish language for all user-facing content
6. Clear visual hierarchy
7. Consistent component patterns

### Example Components

#### KPI Card
```tsx
<Card className="p-4">
  <div className="flex items-start justify-between">
    <div>
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className={cn('text-sm', trendVariant)}>
      <Icon className="size-4" />
      <span>{trendLabel}</span>
    </div>
  </div>
  {chart && <div className="mt-4">{chart}</div>}
</Card>;
```

#### Action Button
```tsx
<Button
  variant="outline"
  size="lg"
  className="w-full justify-start gap-2"
>
  <Icon className="size-4" />
  <span>{label}</span>
</Button>;
```

These guidelines ensure consistency across the platform while maintaining a professional and accessible user interface.
