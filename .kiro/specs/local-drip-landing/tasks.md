# Implementation Plan

- [x] 1. Initialize Next.js 14 project with TypeScript and Tailwind CSS





  - Create new Next.js 14 project with App Router and TypeScript
  - Install and configure Tailwind CSS with custom theme colors
  - Set up project structure with components and lib directories
  - _Requirements: 8.1, 8.2_

- [x] 2. Install and configure shadcn/ui components





  - Initialize shadcn/ui in the project
  - Install required components: Button, Dialog, Input, Label, Separator
  - Configure components with custom theme colors
  - _Requirements: 9.3_

- [x] 3. Set up Firebase project and install SDK




  - Create new Firebase project in Firebase Console
  - Enable Firestore database with appropriate security rules
  - Install Firebase SDK and configure environment variables
  - Create Firebase configuration file
  - _Requirements: 8.1, 9.4_

- [x] 4. Configure custom Tailwind theme with brand colors





  - Update tailwind.config.js with primary, secondary, accent1, and accent2 colors
  - Add custom font family configuration for system-ui stack
  - Test color classes are working correctly
  - _Requirements: 7.1, 7.2_

- [x] 5. Create Firebase utility functions





  - Create lib/firebase.ts with Firebase app initialization
  - Create lib/firestore.ts with signup data storage functions
  - Implement error handling and TypeScript types for Firestore operations
  - _Requirements: 8.1, 8.2_

- [x] 6. Create base layout and global styles





  - Set up app/layout.tsx with proper HTML structure and metadata
  - Configure app/globals.css with Tailwind imports and smooth scrolling
  - Add base typography and spacing utilities
  - _Requirements: 7.3, 9.5_

- [x] 7. Implement SiteHeader component





  - Create components/SiteHeader.tsx with sticky positioning
  - Add "Local Drip" branding with primary color styling
  - Implement navigation items with smooth-scroll anchor links
  - Style header with secondary background and primary border at 12% opacity
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 8. Create SignupModal component with Firebase integration









  - Build components/SignupModal.tsx using shadcn/ui Dialog
  - Implement email input field with proper labels and validation
  - Add role-based submit button styling (accent1 for local, accent2 for cafe)
  - Integrate Firebase Firestore to save email, role, and timestamp
  - Add loading states, success messages, and error handling
  - Implement duplicate email detection
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 9. Implement hero section





  - Create hero section in app/page.tsx with secondary background
  - Add headline "Neighborhood coffee, fair & easy." with primary color styling
  - Implement subheading with primary color at 80% opacity
  - Create two centered CTA buttons with proper accent colors and modal triggers
  - Add hover states using accent colors at appropriate opacity
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 10. Build story section





  - Implement story section with id="story" and secondary background
  - Add H2 heading "Built to keep our cafés thriving." in primary color
  - Create short paragraph content with primary color at 90% opacity
  - Add optional image placeholder with primary overlay at 6% opacity
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 11. Create locals section





  - Build locals section with id="locals" and secondary background
  - Add H3 heading "For Locals" in primary color
  - Implement one-line description with primary color at 85% opacity
  - Create CTA button with accent1 color that opens signup modal with role="local"
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 12. Implement cafés section





  - Build cafés section with id="cafes" and secondary background
  - Add H3 heading "For Cafés" in primary color
  - Implement one-line description with primary color at 85% opacity
  - Create CTA button with accent2 color that opens signup modal with role="cafe"
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
-

- [x] 13. Create footer component




  - Implement footer with secondary background
  - Add centered text content with primary color at 70% opacity
  - Ensure consistent spacing and typography
  - _Requirements: 7.4_

- [x] 14. Integrate all components in main page





  - Wire up SiteHeader with smooth-scroll navigation
  - Connect SignupModal to all CTA buttons with proper role passing
  - Ensure proper section IDs for navigation anchors
  - Test all interactive elements and modal functionality
  - _Requirements: 1.3, 4.5, 5.5, 6.1_

- [x] 15. Implement responsive design and accessibility





  - Add responsive breakpoints for mobile, tablet, and desktop
  - Ensure proper keyboard navigation and focus management
  - Test color contrast ratios meet WCAG guidelines
  - Verify semantic HTML structure and heading hierarchy
  - _Requirements: 7.2, 8.4_

- [ ] 16. Final testing and optimization




  - Test smooth scrolling functionality across browsers
  - Verify all brand colors are used correctly without introducing new hues
  - Test modal functionality with both local and cafe roles
  - Test Firebase integration with successful and failed submissions
  - Verify data is correctly stored in Firestore with proper structure
  - Validate TypeScript compilation and build process
  - _Requirements: 7.1, 7.3, 8.1, 8.2, 8.3, 8.4, 9.1, 9.5_