# Requirements Document

## Introduction

Local Drip is a Next.js 14 web application with TypeScript, Tailwind CSS, and shadcn/ui components that serves as a landing page and lead capture system for a neighborhood coffee platform. The application uses the App Router architecture and features a main landing page with brand-specific styling and two dedicated signup pages for locals and cafés. All submissions are stored in Firestore with proper categorization and timestamps for future outreach and business development.

## Requirements

### Requirement 1

**User Story:** As a visitor to Local Drip, I want to see an attractive landing page that clearly explains the service so that I can decide whether to sign up as a local or café.

#### Acceptance Criteria

1. WHEN a user visits the main landing page at app/(marketing)/page.tsx THEN the system SHALL display a cream background (#F7F1E3) with subtle texture using Tailwind CSS
2. WHEN the page loads THEN the system SHALL display "Local Drip" as the main headline in #4B2E2E color using bold Söhne Halbfett font
3. WHEN displaying the subheading THEN the system SHALL show "Neighborhood coffee, fair & easy."
4. WHEN presenting navigation options THEN the system SHALL display two large shadcn/ui Button components: "I'm a Local" and "I'm a Café"
5. WHEN styling the "I'm a Local" button THEN the system SHALL use #D35400 as the brand color configured in Tailwind
6. WHEN styling the "I'm a Café" button THEN the system SHALL use #7D9A6D as the brand color configured in Tailwind
7. WHEN displaying the layout THEN the system SHALL use a minimal, centered design that is fully responsive using Tailwind CSS classes

### Requirement 2

**User Story:** As a local coffee drinker, I want to sign up for early access to Local Drip so that I can get my neighborhood café in my pocket.

#### Acceptance Criteria

1. WHEN a user clicks "I'm a Local" THEN the system SHALL navigate to the /locals page using Next.js App Router
2. WHEN the /locals page loads at app/locals/page.tsx THEN the system SHALL display a light cream background (#F7F1E3) with warm community vibe using Tailwind CSS
3. WHEN displaying the headline THEN the system SHALL show "Be the first to sip with Local Drip."
4. WHEN showing the subtext THEN the system SHALL display "Get your neighborhood café in your pocket. Early access in [Neighborhood]."
5. WHEN presenting the form THEN the system SHALL provide a single shadcn/ui Input field for email and shadcn/ui Button for submit
6. WHEN a user submits the form THEN the system SHALL write to Firestore collection "signups" with fields { email, role: "local", createdAt: serverTimestamp() } using Firebase v10 modular SDK
7. WHEN submission is successful THEN the system SHALL show "You're on the list — your first cup's on us at launch." using a shadcn/ui Dialog component
8. WHEN styling the submit button THEN the system SHALL use accent color #D35400 configured in Tailwind

### Requirement 3

**User Story:** As a café owner, I want to sign up to partner with Local Drip so that I can reach locals directly on fair terms without big-app fees.

#### Acceptance Criteria

1. WHEN a user clicks "I'm a Café" THEN the system SHALL navigate to the /cafes page using Next.js App Router
2. WHEN the /cafes page loads at app/cafes/page.tsx THEN the system SHALL display a light cream background (#F7F1E3) using Tailwind CSS
3. WHEN displaying the headline THEN the system SHALL show "Keep your café thriving, without big-app fees."
4. WHEN showing the subtext THEN the system SHALL display "Join the neighborhood co-op. Reach locals directly, on fair terms."
5. WHEN presenting the form THEN the system SHALL provide shadcn/ui Input and Label components for name, email, café name, and POS system (optional)
6. WHEN a user submits the form THEN the system SHALL write to Firestore collection "signups" with fields { name, email, cafeName, posSystem, role: "cafe", createdAt: serverTimestamp() } using Firebase v10 modular SDK
7. WHEN submission is successful THEN the system SHALL show "We'll be in touch soon. Thanks for keeping coffee local." using a shadcn/ui Dialog component
8. WHEN styling the submit button THEN the system SHALL use accent color #7D9A6D configured in Tailwind

### Requirement 4

**User Story:** As a business owner, I want all lead data stored systematically in Firestore so that I can follow up with interested parties effectively.

#### Acceptance Criteria

1. WHEN any form is submitted THEN the system SHALL store the data in a Firestore collection named "signups"
2. WHEN storing local signup data THEN the system SHALL include email, role: "local", and createdAt: serverTimestamp() fields
3. WHEN storing café signup data THEN the system SHALL include name, email, cafeName, posSystem, role: "cafe", and createdAt: serverTimestamp() fields
4. WHEN a form submission occurs THEN the system SHALL use Firebase serverTimestamp() for consistent timestamp generation

### Requirement 5

**User Story:** As a business owner, I want the app hosted on Firebase Hosting with proper routing so that users can access different pages directly.

#### Acceptance Criteria

1. WHEN the app is deployed THEN the system SHALL be hosted on Firebase Hosting with Next.js static export
2. WHEN users navigate to different routes THEN the system SHALL properly serve /locals and /cafes pages using Next.js App Router
3. WHEN the app is configured THEN the system SHALL include Firebase v10 modular SDK configuration in lib/firebase.ts for Firestore integration
4. WHEN the app initializes THEN the system SHALL properly connect to Firestore for data storage using TypeScript interfaces

### Requirement 6

**User Story:** As a user on any device, I want all pages to be responsive and accessible so that I can easily navigate and sign up regardless of my screen size.

#### Acceptance Criteria

1. WHEN a user accesses any page on any device THEN the system SHALL display a responsive layout using Tailwind CSS responsive utilities
2. WHEN displaying content THEN the system SHALL maintain the brand color scheme (primary:#4B2E2E, secondary:#F7F1E3, accent1:#D35400, accent2:#7D9A6D) configured in Tailwind config
3. WHEN presenting forms THEN the system SHALL include proper TypeScript validation and error handling with shadcn/ui components
4. WHEN styling components THEN the system SHALL ensure accessibility compliance with proper contrast ratios using shadcn/ui accessible components
5. WHEN loading fonts THEN the system SHALL gracefully fallback if Söhne Halbfett is unavailable using Next.js font optimization
6. WHEN displaying on mobile devices THEN the system SHALL maintain usability and readability with Tailwind responsive design

### Requirement 7

**User Story:** As a developer, I want the application built with modern React patterns and TypeScript so that the codebase is maintainable and type-safe.

#### Acceptance Criteria

1. WHEN setting up the project THEN the system SHALL use Next.js 14 with App Router and TypeScript
2. WHEN styling components THEN the system SHALL use Tailwind CSS with custom brand color configuration
3. WHEN building UI components THEN the system SHALL use shadcn/ui components: Button, Card, Dialog, Input, Label
4. WHEN creating reusable components THEN the system SHALL implement a SignupModal.tsx component for success states
5. WHEN initializing Firebase THEN the system SHALL use Firebase v10 modular SDK in lib/firebase.ts with proper TypeScript types
6. WHEN organizing the project THEN the system SHALL follow the specified structure: app/(marketing)/page.tsx, app/locals/page.tsx, app/cafes/page.tsx