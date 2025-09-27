# Implementation Plan

- [x] 1. Create mock data service and types





  - Create TypeScript interface for MockData with message, currentTime, userCount, and cafeCount
  - Implement MockDataService class with getMockData method that returns sample data
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 2. Create fake sign-in page





  - Create /portal/signin page component with LocalDrip branding
  - Add two demo buttons: "Consumer Demo" and "Cafe Demo" with proper styling
  - Integrate mock data display under the demo buttons in a clean card format
  - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4_

- [x] 3. Create consumer demo placeholder page





  - Create /portal/consumer-demo page with simple "Consumer Demo" heading
  - Add back navigation to return to sign-in page
  - Apply consistent styling with existing portal layout
  - _Requirements: 1.3_

- [x] 4. Create cafe demo placeholder page





  - Create /portal/cafe-demo page with simple "Cafe Demo" heading
  - Add back navigation to return to sign-in page
  - Apply consistent styling with existing portal layout
  - _Requirements: 1.4_

- [x] 5. Update portal navigation





  - Modify existing /portal page to redirect to /portal/signin
  - Ensure proper routing between all portal pages
  - Test navigation flow between sign-in and demo pages
  - _Requirements: 1.1, 1.2, 1.3, 1.4_