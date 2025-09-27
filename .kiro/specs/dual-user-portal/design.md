# Design Document

## Overview

The portal shell is a simple entry point that provides a fake sign-in interface with demo access to consumer and cafe mock experiences. It serves as a foundation for testing basic data structures and navigation patterns before building out full features.

## Architecture

### Page Structure
```
/portal (existing)
├── /portal/signin (new fake sign-in page)
├── /portal/consumer-demo (new consumer mock page)
└── /portal/cafe-demo (new cafe mock page)
```

### Component Hierarchy
- **SignInPage**: Main fake sign-in interface
  - **DemoButtons**: Consumer and Cafe demo navigation
  - **MockDataDisplay**: Shows Hello World and test data
- **ConsumerDemoPage**: Simple placeholder for consumer experience
- **CafeDemoPage**: Simple placeholder for cafe experience

## Components and Interfaces

### Mock Data Structure
```typescript
interface MockData {
  message: string;           // "Hello World"
  currentTime: string;       // Current timestamp
  userCount: number;         // Sample data point 1
  cafeCount: number;         // Sample data point 2
}
```

### SignInPage Component
- Displays LocalDrip branding
- Shows two prominent demo buttons
- Renders mock data in a clean card below buttons
- Uses existing Tailwind styling from current portal

### Demo Pages
- **ConsumerDemoPage**: Simple page with "Consumer Demo" heading and back navigation
- **CafeDemoPage**: Simple page with "Cafe Demo" heading and back navigation
- Both pages will be minimal placeholders for future development

## Data Models

### Mock Data Service
```typescript
class MockDataService {
  static getMockData(): MockData {
    return {
      message: "Hello World",
      currentTime: new Date().toLocaleString(),
      userCount: 42,
      cafeCount: 7
    };
  }
}
```

## Error Handling

- No complex error handling needed for this simple shell
- Basic navigation error handling through Next.js routing
- Mock data will always return valid data (no API calls)

## Testing Strategy

### Manual Testing
- Verify navigation between sign-in and demo pages
- Confirm mock data displays correctly and updates on page refresh
- Test responsive design on mobile and desktop
- Validate that demo buttons work as expected

### Future Testing Considerations
- Mock data service can be easily unit tested
- Component rendering can be tested with React Testing Library
- Navigation flow can be tested with integration tests