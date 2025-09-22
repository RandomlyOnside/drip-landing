# Logo Component Usage Guidelines

## Overview

The Logo component provides a flexible, accessible way to display the Local Drip brand identity throughout the application. It supports both the full logo and icon-only variants with consistent styling and behavior.

## Variants

### Full Logo Variants

#### `header`
- **Usage**: Navigation bars, site headers
- **Asset**: `ld-color.svg` (full logo)
- **Sizing**: 32-48px height
- **Responsive**: Scales down on smaller screens
- **Example**: 
```tsx
<Logo variant="header" size="medium" clickable onClick={scrollToTop} />
```

#### `hero`
- **Usage**: Hero sections, landing pages, prominent branding
- **Asset**: `ld-color.svg` (full logo)
- **Sizing**: 80-200px height
- **Responsive**: Scales significantly on mobile
- **Example**:
```tsx
<Logo variant="hero" size="large" priority />
```

#### `footer`
- **Usage**: Site footers, secondary branding areas
- **Asset**: `ld-color.svg` (full logo)
- **Sizing**: 24-40px height
- **Responsive**: Fixed scaling
- **Example**:
```tsx
<Logo variant="footer" size="small" />
```

#### `inline`
- **Usage**: Within content, inline with text
- **Asset**: `ld-color.svg` (full logo)
- **Sizing**: 20-32px height
- **Responsive**: Fixed scaling
- **Example**:
```tsx
<Logo variant="inline" size="small" />
```

### Icon-Only Variant

#### `icon`
- **Usage**: Compact spaces, mobile interfaces, buttons, badges
- **Asset**: `ld-color-drip.svg` (drip icon only)
- **Sizing**: 16-32px height
- **Responsive**: Fixed scaling
- **Best for**: Limited space contexts where brand recognition is maintained
- **Example**:
```tsx
<Logo variant="icon" size="medium" clickable />
```

## When to Use Full Logo vs Icon

### Use Full Logo When:
- First-time brand introduction
- Primary navigation areas
- Hero sections and landing pages
- Footer branding
- Sufficient horizontal space available
- Brand recognition is critical

### Use Icon When:
- Mobile navigation (hamburger menus, tabs)
- Compact UI elements (buttons, badges)
- Secondary navigation areas
- Loading states or placeholders
- Space-constrained layouts
- User is already familiar with the brand

## Size Guidelines

### Small (`small`)
- **Full Logo**: 20-32px height
- **Icon**: 16px height
- **Usage**: Inline content, compact spaces

### Medium (`medium`)
- **Full Logo**: 24-40px height  
- **Icon**: 24px height
- **Usage**: Standard UI elements, navigation

### Large (`large`)
- **Full Logo**: 32-200px height (varies by variant)
- **Icon**: 32px height
- **Usage**: Prominent display, hero sections

### Custom (`custom`)
- **Usage**: Specific design requirements
- **Implementation**: Provide explicit `width` and `height` props

## Accessibility Considerations

### Alt Text
- Full logo variants use descriptive alt text: "Local Drip logo"
- Icon variant uses: "Local Drip icon"
- Clickable logos include navigation context in alt text

### Interactive Elements
- All clickable logos are keyboard accessible
- Focus indicators are clearly visible
- Minimum 44px touch target for mobile accessibility

### Screen Readers
- Proper ARIA labels and roles
- Fallback text when images fail to load
- Context-appropriate announcements

## Code Examples

### Basic Usage
```tsx
import { Logo } from '@/components/ui/Logo';

// Standard header logo
<Logo variant="header" size="medium" clickable onClick={handleHomeClick} />

// Hero section logo
<Logo variant="hero" size="large" priority />

// Compact icon for mobile
<Logo variant="icon" size="small" />
```

### Advanced Usage
```tsx
// Custom sizing
<Logo 
  variant="custom" 
  width={60} 
  height={60} 
  alt="Custom Local Drip logo"
  ariaLabel="Navigate to homepage"
/>

// With custom styling
<Logo 
  variant="icon" 
  size="medium"
  className="hover:opacity-80 transition-opacity"
  clickable
  onClick={handleClick}
/>
```

## Performance Notes

- Use `priority={true}` for above-the-fold logos (hero, header)
- Icon variant loads faster due to smaller file size
- SVG format ensures crisp rendering at all sizes
- Automatic fallback to text if images fail to load

## Migration from Text Branding

When replacing text-based "Local Drip" branding:

1. **Header**: Use `variant="header"` with `clickable={true}`
2. **Hero**: Use `variant="hero"` with `priority={true}`
3. **Compact spaces**: Consider `variant="icon"` for better fit
4. **Maintain accessibility**: Ensure alt text provides equivalent information

## Browser Support

- SVG support: All modern browsers
- Fallback: Text-based branding for unsupported browsers
- High contrast mode: Automatic contrast adjustments
- Screen readers: Full compatibility with ARIA standards