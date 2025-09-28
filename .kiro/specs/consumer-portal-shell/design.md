# Design Document

## Overview

The consumer portal shell is a minimal PWA foundation that provides responsive navigation and three core pages. The design emphasizes simplicity, using modern web standards for PWA functionality and CSS Grid/Flexbox for responsive layouts. The architecture supports future extensibility while maintaining a lightweight footprint.

## Architecture

### Technology Stack
- **Frontend Framework**: Next.js with TypeScript (App Router)
- **Styling**: Tailwind CSS (already configured)
- **Routing**: Next.js App Router (file-based routing)
- **PWA**: Web App Manifest + Service Worker for basic PWA functionality
- **UI Components**: Existing shadcn/ui components in src/components/ui/

### Application Structure (Using Existing Structure)
```
src/
├── app/
│   └── portal/
│       └── consumer-demo/
│           ├── page.tsx (main consumer shell)
│           ├── home/
│           │   └── page.tsx
│           ├── order/
│           │   └── page.tsx
│           └── profile/
│               └── page.tsx
├── components/
│   ├── ui/ (existing shadcn components)
│   └── consumer/ (new consumer-specific components)
│       ├── Navigation.tsx
│       ├── Layout.tsx
│       └── MobileMenu.tsx
├── hooks/ (existing)
├── lib/ (existing utilities)
└── types/ (in lib/types.ts)
```

## Components and Interfaces

### Navigation Component (`src/components/consumer/Navigation.tsx`)
- **Desktop**: Horizontal navigation bar with logo and menu items
- **Mobile**: Bottom navigation tabs or hamburger menu (collapsible)
- **Responsive breakpoint**: 768px for mobile/desktop transition using Tailwind breakpoints
- **Active state**: Visual indication of current page using Next.js usePathname
- **Integration**: Uses existing Logo component from src/components/ui/

### Layout Component (`src/components/consumer/Layout.tsx`)
- **Header**: Contains navigation and branding
- **Main**: Content area with proper spacing and max-width constraints using Tailwind
- **Footer**: Optional minimal footer
- **Responsive**: Tailwind CSS Grid for overall layout, Flexbox for component internals
- **Toast Integration**: Uses existing toast system from src/lib/toast.tsx

### Page Components (Next.js App Router Pages)
- **Consumer Shell** (`src/app/portal/consumer-demo/page.tsx`): Main entry point with navigation
- **Home Page** (`src/app/portal/consumer-demo/home/page.tsx`): Welcome message, basic overview cards, mock statistics
- **Order Page** (`src/app/portal/consumer-demo/order/page.tsx`): Mock order list/grid, basic filtering placeholder, empty states
- **Profile Page** (`src/app/portal/consumer-demo/profile/page.tsx`): Mock user info form, basic settings toggles, placeholder avatar

### UI Components (Using Existing Components)
- **Toast Notifications**: Use existing toast system from src/lib/toast.tsx and src/components/ui/toast.tsx
- **Error Boundary**: Create simple error boundary using Next.js error.tsx convention
- **Loading States**: Use existing UI components and Tailwind for spinners/skeleton screens
- **Buttons**: Use existing Button component from src/components/ui/button.tsx

## Data Models

### Mock Data Structures (Add to existing src/lib/types.ts)
```typescript
interface ConsumerUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}
```

### State Management
- **Local State**: React useState for component-level state
- **Mock Data**: Extend existing src/lib/mockDataService.ts with consumer data
- **No External APIs**: All data is mocked for this shell implementation

## Error Handling

### Error Boundaries
- **Page Level**: Catch rendering errors, display fallback UI
- **Component Level**: Graceful degradation for non-critical components

### Toast System
- **Success Messages**: "Profile updated", "Order placed" (mock actions)
- **Error Messages**: "Something went wrong", "Please try again"
- **Position**: Top-right corner on desktop, bottom on mobile
- **Styling**: Minimal design with appropriate colors (green/red/blue)

## Testing Strategy

### Unit Testing
- **Components**: Test rendering and basic interactions
- **Navigation**: Test route changes and active states
- **Responsive**: Test breakpoint behavior with viewport mocking

### Integration Testing
- **Page Navigation**: Test full navigation flow between pages
- **PWA Features**: Test manifest loading and service worker registration
- **Error Handling**: Test error boundary and toast functionality

### Manual Testing
- **Device Testing**: Test on actual mobile devices and desktop browsers
- **PWA Installation**: Test install prompt and standalone mode
- **Responsive Design**: Test at various viewport sizes

## PWA Implementation

### Web App Manifest
```json
{
  "name": "Consumer Portal",
  "short_name": "Portal",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### Service Worker
- **Basic Caching**: Cache static assets (HTML, CSS, JS)
- **Offline Fallback**: Show offline page when network unavailable
- **Update Strategy**: Show update available notification

### Responsive Design Strategy
- **Mobile First**: Design for mobile, enhance for desktop
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px  
  - Desktop: > 1024px
- **Touch Targets**: Minimum 44px for mobile interactions
- **Typography**: Scalable font sizes using rem units