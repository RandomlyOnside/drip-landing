# Design Document

## Overview

Local Drip is a Next.js 14 web application with TypeScript that serves as a landing page and lead capture system for a neighborhood coffee platform. The application uses the App Router architecture and features a main landing page with specific brand styling and two dedicated signup pages (/locals and /cafes) with tailored forms and messaging. The app uses Tailwind CSS for styling, shadcn/ui for components, and integrates with Firebase Hosting and Firestore using the v10 modular SDK.

## Architecture

### Technology Stack
- **Frontend Framework**: Next.js 14 with App Router and TypeScript
- **Styling**: Tailwind CSS with custom brand color configuration
- **UI Components**: shadcn/ui (Button, Card, Dialog, Input, Label)
- **Backend**: Firebase v10 modular SDK (Firestore for database, Hosting for deployment)
- **Build Process**: Next.js static export for Firebase Hosting compatibility

### Application Structure
```
local-drip/
├── app/
│   ├── (marketing)/
│   │   └── page.tsx           # Main landing page
│   ├── locals/
│   │   └── page.tsx           # Local signup page
│   ├── cafes/
│   │   └── page.tsx           # Café signup page
│   ├── layout.tsx             # Root layout with Tailwind and fonts
│   └── globals.css            # Global styles and Tailwind imports
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   └── SignupModal.tsx        # Custom success modal component
├── lib/
│   ├── firebase.ts            # Firebase v10 modular SDK configuration
│   └── utils.ts               # shadcn/ui utility functions
├── tailwind.config.js         # Tailwind configuration with brand colors
├── components.json            # shadcn/ui configuration
├── next.config.js             # Next.js configuration for static export
├── firebase.json              # Firebase hosting configuration
└── .firebaserc                # Firebase project configuration
```

### Routing Strategy
Next.js App Router will handle routing:
- `/` → app/(marketing)/page.tsx (main landing page)
- `/locals` → app/locals/page.tsx (local signup page)
- `/cafes` → app/cafes/page.tsx (café signup page)

## Components and Interfaces

### 1. Main Landing Page (app/(marketing)/page.tsx)
**Purpose**: Brand introduction and navigation to signup pages

**Key Elements**:
- Hero section with "Local Drip" headline in Söhne Halbfett font
- Subheading: "Neighborhood coffee, fair & easy."
- Two large shadcn/ui Button components linking to respective signup pages
- Cream background (bg-secondary) with subtle texture using Tailwind
- Minimal, centered responsive layout using Tailwind utilities

**TypeScript Interface**:
```typescript
interface LandingPageProps {
  // No props needed for static page
}
```

### 2. Locals Signup Page (app/locals/page.tsx)
**Purpose**: Capture local coffee drinker signups

**Key Elements**:
- Warm community-focused messaging
- Single shadcn/ui Input field for email with Label
- shadcn/ui Button styled with accent1 color (#D35400)
- SignupModal component for success state
- Light cream background using Tailwind

**TypeScript Interface**:
```typescript
interface LocalSignupData {
  email: string;
  role: 'local';
  createdAt: Timestamp;
}
```

### 3. Cafés Signup Page (app/cafes/page.tsx)
**Purpose**: Capture café owner partnership signups

**Key Elements**:
- Business-focused messaging about fair terms
- Multi-field form using shadcn/ui Input and Label components
- shadcn/ui Button styled with accent2 color (#7D9A6D)
- SignupModal component for success state
- Light cream background using Tailwind

**TypeScript Interface**:
```typescript
interface CafeSignupData {
  name: string;
  email: string;
  cafeName: string;
  posSystem?: string;
  role: 'cafe';
  createdAt: Timestamp;
}
```

### 4. SignupModal Component (components/SignupModal.tsx)
**Purpose**: Reusable success modal for both signup flows

**Key Elements**:
- shadcn/ui Dialog component
- Customizable success message
- Brand-consistent styling
- TypeScript props interface

**TypeScript Interface**:
```typescript
interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  title?: string;
}
```

### 5. Firebase Integration (lib/firebase.ts)
**Purpose**: Handle data persistence and configuration using v10 modular SDK

**Key Functions**:
```typescript
// Firebase configuration and initialization
export const app: FirebaseApp;
export const db: Firestore;

// Type-safe signup functions
export const submitLocalSignup: (email: string) => Promise<void>;
export const submitCafeSignup: (data: CafeSignupData) => Promise<void>;

// Error handling
export interface FirebaseError {
  code: string;
  message: string;
}
```

## Data Models

### Firestore Collection: `signups`

**TypeScript Interfaces:**

```typescript
import { Timestamp } from 'firebase/firestore';

// Base signup interface
interface BaseSignup {
  email: string;
  createdAt: Timestamp;
  id?: string; // Auto-generated document ID
}

// Local signup document
interface LocalSignup extends BaseSignup {
  role: 'local';
}

// Café signup document
interface CafeSignup extends BaseSignup {
  name: string;
  cafeName: string;
  posSystem?: string; // Optional POS system
  role: 'cafe';
}

// Union type for all signup types
type SignupDocument = LocalSignup | CafeSignup;
```

**Firestore Document Structure:**

**Local Signup Document:**
```typescript
{
  email: string,              // User's email address
  role: "local",              // Fixed value for locals
  createdAt: Timestamp,       // Firebase server timestamp
  id?: string                 // Auto-generated document ID
}
```

**Café Signup Document:**
```typescript
{
  name: string,               // Café owner's name
  email: string,              // Café owner's email
  cafeName: string,           // Name of the café
  posSystem?: string,         // POS system (optional)
  role: "cafe",               // Fixed value for cafés
  createdAt: Timestamp,       // Firebase server timestamp
  id?: string                 // Auto-generated document ID
}
```

## User Interface Design

### Brand Color Palette (Tailwind Configuration)
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#4B2E2E',     // Dark brown text
        secondary: '#F7F1E3',   // Cream background
        accent1: '#D35400',     // Orange (locals)
        accent2: '#7D9A6D',     // Green (cafés)
      }
    }
  }
}
```

### Typography Hierarchy
- **Primary Headline**: Söhne Halbfett (bold) via Next.js font optimization, fallback to system sans-serif
- **Body Text**: System font stack optimized by Next.js
- **Button Text**: shadcn/ui default typography with medium weight

### Layout Principles
- **Centered Design**: Tailwind utilities (mx-auto, max-w-*) for content centering
- **Minimal Approach**: Clean layouts using shadcn/ui Card components
- **Responsive**: Tailwind responsive utilities (sm:, md:, lg:)
- **Consistent Spacing**: Tailwind spacing scale for harmonious rhythm

### Visual Hierarchy
1. **Main Landing**: Hero headline → subheading → shadcn/ui Button CTAs
2. **Signup Pages**: Headline → subtext → shadcn/ui form components → submit button
3. **Success States**: SignupModal with shadcn/ui Dialog component

### Responsive Breakpoints (Tailwind)
- **Mobile (default)**: Single column, stacked elements, touch-friendly buttons
- **Tablet (md:768px+)**: Maintained single column with increased spacing
- **Desktop (lg:1024px+)**: Centered content with maximum width constraints

### shadcn/ui Component Usage
- **Button**: Primary CTAs with custom brand colors
- **Card**: Content containers with subtle shadows
- **Dialog**: Success modals and confirmations
- **Input**: Form fields with proper validation styling
- **Label**: Accessible form labels with proper associations

## Error Handling

### Client-Side Validation (TypeScript)
- **Email Validation**: TypeScript type checking with runtime validation
- **Required Fields**: shadcn/ui Input components with proper validation states
- **Real-time Feedback**: React state management for immediate validation feedback
- **Form Validation**: Custom hooks for form state and validation logic

### Firebase Error Handling (v10 Modular SDK)
- **Network Issues**: Graceful handling using try-catch with proper TypeScript error types
- **Firestore Errors**: User-friendly error messages with FirebaseError interface
- **Configuration Errors**: TypeScript compile-time error prevention

### Error Display Strategy
- **Inline Messages**: shadcn/ui Input error states with descriptive messages
- **Modal Notifications**: SignupModal component for error display
- **TypeScript Safety**: Compile-time error prevention with strict typing

### Error Types (TypeScript)
```typescript
interface ValidationError {
  field: string;
  message: string;
}

interface FirebaseError {
  code: string;
  message: string;
}

interface FormError {
  type: 'validation' | 'firebase' | 'network';
  message: string;
  field?: string;
}
```

## Testing Strategy

### Manual Testing Checklist
- [ ] Landing page displays correctly with Tailwind brand colors
- [ ] Next.js App Router navigation to /locals and /cafes pages works
- [ ] Local signup form submits and stores data correctly in Firestore
- [ ] Café signup form handles all fields including optional POS system
- [ ] SignupModal displays success messages appropriately for each user type
- [ ] Responsive design works across device sizes using Tailwind utilities
- [ ] Font fallbacks work when Söhne Halbfett unavailable with Next.js font optimization
- [ ] Firebase v10 modular SDK connection and Firestore writes function properly
- [ ] TypeScript error handling works for various failure scenarios
- [ ] shadcn/ui components render and function correctly

### TypeScript Testing
- **Type Safety**: Compile-time error checking for all interfaces
- **Component Props**: Proper typing for all React component props
- **Firebase Types**: Correct typing for Firestore operations
- **Form Validation**: Type-safe form handling and validation

### Browser Compatibility
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Next.js Support**: Full compatibility with Next.js 14 App Router

### Performance Considerations
- **Next.js Optimization**: Automatic code splitting and optimization
- **Font Loading**: Next.js font optimization with system fallbacks
- **Static Export**: Optimized static build for Firebase Hosting
- **Tailwind CSS**: Purged CSS for minimal bundle size
- **shadcn/ui**: Tree-shakable component library for optimal performance

## Implementation Notes

### Next.js Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### Firebase Hosting Configuration
```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4B2E2E',
        secondary: '#F7F1E3',
        accent1: '#D35400',
        accent2: '#7D9A6D',
      }
    }
  },
  plugins: [],
}
```

### TypeScript Architecture
- **Strict Typing**: Full TypeScript strict mode enabled
- **Interface-Driven**: Clear interfaces for all data structures
- **Component Props**: Proper typing for all React components
- **Firebase Types**: Type-safe Firebase v10 modular SDK usage

### React Architecture
- **App Router**: Next.js 14 App Router for file-based routing
- **Server Components**: Default server components where possible
- **Client Components**: Explicit 'use client' for interactive components
- **Component Composition**: Reusable components with shadcn/ui