# Design Document

## Overview

The Local Drip landing page will be built as a single-page application using Next.js 14 with App Router, TypeScript, and Tailwind CSS. The design follows a clean, minimal aesthetic with a carefully curated brand color palette. The page structure includes a sticky header, hero section, three content sections, and a reusable signup modal component.

## Architecture

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom theme configuration
- **UI Components**: shadcn/ui (Button, Dialog, Input, Label, Separator)
- **Database**: Firebase Firestore for email storage
- **Backend**: Firebase SDK for client-side database operations
- **Deployment**: Vercel or similar (with Firebase integration)

### Project Structure
```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/ (shadcn/ui components)
│   ├── SiteHeader.tsx
│   └── SignupModal.tsx
├── lib/
│   ├── utils.ts
│   ├── firebase.ts
│   └── firestore.ts
└── tailwind.config.js
```

## Components and Interfaces

### 1. SiteHeader Component
**Purpose**: Sticky navigation header with smooth-scroll links

**Props Interface**:
```typescript
interface SiteHeaderProps {
  // No props needed - static content
}
```

**Key Features**:
- Fixed positioning with z-index for overlay
- Smooth scroll behavior for navigation links
- Responsive design for mobile/desktop
- Brand colors: secondary background, primary text

### 2. SignupModal Component
**Purpose**: Reusable modal for user registration

**Props Interface**:
```typescript
interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'local' | 'cafe';
}

interface SignupFormData {
  email: string;
  role: 'local' | 'cafe';
}
```

**Key Features**:
- shadcn/ui Dialog component base
- Role-based button styling (accent1 for local, accent2 for cafe)
- Form validation for email input
- Firebase Firestore integration for data storage
- Loading states and success/error feedback
- Duplicate email handling

### 3. Main Page Layout
**Purpose**: Single page with multiple sections

**Section Structure**:
- Hero: Value proposition and primary CTAs
- Story: Company mission and background
- Locals: Information for coffee enthusiasts
- Cafés: Information for business owners
- Footer: Simple branding footer

## Data Models

### SignupFormData
```typescript
interface SignupFormData {
  email: string;
  role: 'local' | 'cafe';
}

interface SignupDocument {
  email: string;
  role: 'local' | 'cafe';
  createdAt: Timestamp;
}
```

### Firebase Configuration
```typescript
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
```

### Navigation Items
```typescript
interface NavItem {
  label: string;
  href: string; // anchor link (e.g., "#story")
}
```

## Styling and Theme Configuration

### Tailwind Custom Theme
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#4B2E2E',
        secondary: '#F7F1E3', 
        accent1: '#D35400', // Local CTA
        accent2: '#7D9A6D', // Café CTA
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      }
    }
  }
}
```

### Color Usage Strategy
- **Primary (#4B2E2E)**: All text, headings, borders
- **Secondary (#F7F1E3)**: All backgrounds, neutral areas
- **Accent1 (#D35400)**: Local-specific CTAs and interactions
- **Accent2 (#7D9A6D)**: Café-specific CTAs and interactions
- **Opacity Variations**: 
  - 70% for footer text
  - 80% for hero subheading
  - 85% for section descriptions
  - 90% for story paragraph
  - 12% for header border
  - 6% for image overlays

### Typography Scale
- **Headlines**: Large, bold, primary color
- **Subheadings**: Medium, primary color
- **Body Text**: Regular, primary color with opacity variations
- **Labels**: Small, primary color

## Error Handling

### Form Validation and Submission
- Email format validation using HTML5 input type="email"
- Required field validation
- User feedback for validation errors
- Loading states during Firebase operations
- Success/error messaging for database operations
- Duplicate email detection and handling

### Firebase Integration
- Firestore database connection and configuration
- Error handling for network issues and Firebase errors
- Proper TypeScript types for Firestore operations
- Environment variable management for Firebase config

### Modal State Management
- Proper open/close state handling
- Escape key and backdrop click handling via shadcn/ui Dialog
- Focus management for accessibility

### Smooth Scrolling
- CSS scroll-behavior: smooth
- Fallback for browsers without smooth scroll support
- Proper anchor link handling

## Testing Strategy

### Component Testing
- Unit tests for SignupModal component
- Props validation and state management
- Form submission behavior
- Modal open/close functionality

### Integration Testing
- Smooth scroll navigation functionality
- Modal triggering from different CTAs
- Responsive design across breakpoints
- Color theme consistency

### Accessibility Testing
- Keyboard navigation support
- Screen reader compatibility
- Focus management in modal
- Color contrast validation (WCAG compliance)

### Visual Testing
- Cross-browser compatibility
- Mobile responsiveness
- Brand color accuracy
- Typography rendering

## Implementation Considerations

### Performance Optimizations
- Next.js 14 App Router for optimal loading
- Static generation where possible
- Minimal JavaScript bundle size
- Optimized CSS with Tailwind's purge functionality

### Responsive Design
- Mobile-first approach
- Breakpoint strategy: sm, md, lg, xl
- Flexible grid layouts
- Touch-friendly button sizes

### SEO and Accessibility
- Semantic HTML structure
- Proper heading hierarchy (h1, h2, h3)
- Alt text for images
- Meta tags and Open Graph data
- ARIA labels where needed

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support
- ES6+ JavaScript features
- Progressive enhancement approach