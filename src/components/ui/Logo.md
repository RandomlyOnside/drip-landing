# Logo Component

A reusable Logo component for the Local Drip brand with variant system and responsive behavior.

## Features

- **Multiple Variants**: header, hero, footer, inline
- **Size Presets**: small, medium, large, custom
- **Responsive Design**: Automatic scaling based on screen size
- **Accessibility**: Proper alt text, keyboard navigation, focus indicators
- **Fallback System**: SVG → PNG → Text fallback for reliability
- **Next.js Optimization**: Uses Next.js Image component for performance

## Usage

```tsx
import { Logo } from '@/components/ui/Logo';

// Basic usage
<Logo />

// Header logo (small, clickable)
<Logo variant="header" size="medium" clickable onClick={() => scrollToTop()} />

// Hero logo (large, with priority loading)
<Logo variant="hero" size="large" priority />

// Custom size
<Logo size="custom" width={100} height={100} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'header' \| 'hero' \| 'footer' \| 'inline'` | `'inline'` | Logo variant with predefined styling |
| `size` | `'small' \| 'medium' \| 'large' \| 'custom'` | `'medium'` | Size preset |
| `width` | `number` | - | Custom width (used with size='custom') |
| `height` | `number` | - | Custom height (used with size='custom') |
| `className` | `string` | - | Additional CSS classes |
| `clickable` | `boolean` | `false` | Makes logo clickable with hover effects |
| `onClick` | `() => void` | - | Click handler function |
| `priority` | `boolean` | `false` | Next.js Image priority loading |
| `alt` | `string` | `'Local Drip Logo'` | Alt text for accessibility |

## Variants

### Header
- **Purpose**: Navigation bar logo
- **Sizes**: 32px (small), 40px (medium), 48px (large)
- **Responsive**: Scales down on smaller screens

### Hero
- **Purpose**: Large promotional logo
- **Sizes**: 80px (small), 120px (medium), 200px (large)
- **Responsive**: Significant scaling on mobile devices

### Footer
- **Purpose**: Footer branding
- **Sizes**: 24px (small), 32px (medium), 40px (large)
- **Responsive**: Minimal scaling

### Inline
- **Purpose**: Content integration
- **Sizes**: 20px (small), 24px (medium), 32px (large)
- **Responsive**: No scaling

## Accessibility

- Proper alt text for screen readers
- Keyboard navigation support for clickable logos
- Focus indicators with ring styling
- Fallback text maintains semantic meaning

## Fallback System

1. **Primary**: SVG logo (`/images/logo.svg`)
2. **Secondary**: PNG logo based on size (`/images/logo-small.png` or `/images/logo-large.png`)
3. **Tertiary**: Text fallback ("Local Drip")

## Testing

Visit `/test/logo` to see all variants and features in action.