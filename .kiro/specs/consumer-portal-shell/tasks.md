# Implementation Plan

- [x] 1. Set up consumer-specific types and mock data





  - Add ConsumerUser, Order, and OrderItem interfaces to src/lib/types.ts
  - Extend src/lib/mockDataService.ts with consumer mock data functions
  - Create mock user profile, orders, and home page data
  - _Requirements: 2.2, 3.2, 4.2_

- [x] 2. Create consumer layout and navigation components





  - Create src/components/consumer/Layout.tsx with responsive shell structure
  - Create src/components/consumer/Navigation.tsx with desktop/mobile navigation
  - Create src/components/consumer/MobileMenu.tsx for mobile hamburger menu
  - Implement responsive breakpoints using Tailwind CSS classes
  - _Requirements: 1.1, 1.3, 1.4_

- [x] 3. Implement main consumer shell page





  - Update src/app/portal/consumer-demo/page.tsx to use new Layout component
  - Add navigation integration with proper routing setup
  - Implement default redirect to home page
  - Add basic error boundary for the consumer section
  - _Requirements: 1.1, 1.2, 5.1_

- [x] 4. Create home page with mock content





  - Create src/app/portal/consumer-demo/home/page.tsx
  - Implement responsive home page layout with welcome message
  - Add mock statistics cards and overview content
  - Ensure mobile-responsive design using Tailwind
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 5. Create order page with mock data





  - Create src/app/portal/consumer-demo/order/page.tsx
  - Implement order list/grid layout with mock order data
  - Add basic filtering placeholder and empty states
  - Ensure responsive design for mobile and desktop
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 6. Create profile page with mock user data





  - Create src/app/portal/consumer-demo/profile/page.tsx
  - Implement profile form layout with mock user data
  - Add basic settings toggles and placeholder avatar
  - Ensure responsive form design
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 7. Implement error handling and toast notifications





  - Add error.tsx files for each route using Next.js error boundary convention
  - Integrate existing toast system from src/lib/toast.tsx
  - Add basic error messages and success notifications for mock actions
  - Test error handling across all pages
  - _Requirements: 5.1, 5.2, 5.3_

- [x] 8. Add PWA configuration





  - Create public/manifest.json with consumer portal PWA settings
  - Add basic service worker for static asset caching
  - Update src/app/layout.tsx to include PWA meta tags
  - Add install prompt functionality
  - _Requirements: 6.1, 6.2, 6.3_

- [x] 9. Implement responsive design testing and refinement





  - Test navigation behavior across mobile/tablet/desktop breakpoints
  - Verify touch targets meet 44px minimum on mobile
  - Test PWA installation and standalone mode
  - Ensure all pages work properly with responsive layouts
  - _Requirements: 1.3, 1.4, 6.4_

- [x] 10. Add navigation active states and routing integration





  - Implement active page highlighting in navigation using usePathname
  - Add smooth transitions between pages
  - Test deep linking and browser back/forward functionality
  - Verify navigation works correctly in PWA standalone mode
  - _Requirements: 1.1, 1.2_