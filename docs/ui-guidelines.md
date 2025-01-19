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

- Primary: Green (#22c55e)
- Background: White
- Text: Slate-900 for headings, Slate-700 for body
- Accents:
  - Success: Green-500
  - Warning: Yellow-500
  - Error: Red-500
  - Info: Blue-500

## Layout

### Navigation

- Sidebar with:
  - Logo at top
  - Main navigation links
  - Icons from Lucide React

### Components

- Cards for content grouping
- Buttons following shadcn/ui patterns
- Forms using shadcn/ui components
- Tables for data display
- Progress indicators
- Tabs for content organization

## Typography

- Font: Inter (system fallback)
- Headings: Bold, Slate-900
- Body: Regular, Slate-700
- Links: Primary color with hover states

## Responsive Design

- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

## Accessibility

- ARIA labels on interactive elements
- Sufficient color contrast
- Keyboard navigation support
- Focus indicators
- Alt text for images

## Icons

- Lucide React for consistent icon set
- 24x24 default size
- Stroke width: 2
- Color matches text or specified theme color

## Loading States

- Skeleton loaders for content
- Spinner for actions
- Disabled states for buttons during loading

## Error States

- Clear error messages
- Visual indicators (red)
- Recovery actions where applicable

## Animation

- Subtle transitions for hover states
- Smooth page transitions
- Loading animations

## Forms

- Clear labels
- Validation feedback
- Required field indicators
- Error states
- Success confirmation

## Best Practices

- Consistent spacing (Tailwind classes)
- Responsive images
- Progressive enhancement
- Performance optimization
- Semantic HTML
