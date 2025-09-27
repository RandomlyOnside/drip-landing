# Requirements Document

## Introduction

This feature creates the foundational portal shell for LocalDrip that will serve as the entry point for both consumers and cafes. The shell will include basic navigation, user type detection, and mock data structures that establish the foundation for future consumer and cafe-specific features. The system will use mock data structures that can later be replaced with Supabase database connections, allowing for rapid development and validation of the data architecture.

## Requirements

### Requirement 1

**User Story:** As a user, I want to access a fake sign-in page with demo links, so that I can explore consumer and cafe mock experiences.

#### Acceptance Criteria

1. WHEN a user accesses the portal THEN the system SHALL display a fake sign-in page
2. WHEN a user sees the sign-in page THEN the system SHALL show two demo buttons: "Consumer Demo" and "Cafe Demo"
3. WHEN a user clicks "Consumer Demo" THEN the system SHALL navigate to a consumer mock page
4. WHEN a user clicks "Cafe Demo" THEN the system SHALL navigate to a cafe mock page

### Requirement 2

**User Story:** As a developer, I want to display simple mock data on the sign-in page, so that I can test data structures and have something to experiment with.

#### Acceptance Criteria

1. WHEN the sign-in page loads THEN the system SHALL display a "Hello World" message
2. WHEN the sign-in page loads THEN the system SHALL show the current time
3. WHEN the sign-in page loads THEN the system SHALL display 2 additional simple data points that can be easily modified
4. WHEN mock data is shown THEN the system SHALL format it in a clean, readable way under the demo buttons