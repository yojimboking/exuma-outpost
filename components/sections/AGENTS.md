# Components: Sections - Agent Guide

## Overview
Section components are full-page sections used on the homepage and other pages.

## Key Components

### InquiryForm.tsx
The booking inquiry form with calendar, guest details, and add-on selection.

**Form Submission Flow:**
1. User fills out form (dates, guests, add-ons, message)
2. Click "SEND INQUIRY" button
3. POST to `/api/inquire` with JSON payload
4. On success: show inline thank you message with inquiry ID
5. On error: show error banner (dismissible)

**State Variables:**
- `isSubmitting` - true during API call
- `isSubmitted` - true after successful submission (switches to thank you view)
- `submissionError` - error message to display
- `inquiryId` - returned from API for reference

**API Payload Format:**
```typescript
{
  name: string,
  email: string,
  guests: number,
  checkIn: string,  // YYYY-MM-DD
  checkOut: string, // YYYY-MM-DD
  addOns: string[], // service IDs
  message: string
}
```

**WhatsApp as Secondary Option:**
After form submission succeeds, user can optionally click "Message on WhatsApp" for faster response. The WhatsApp message is pre-formatted with all booking details.

**Dependencies:**
- `/api/inquire` - inquiry submission endpoint
- `/api/availability` - blocked dates for calendar
- `@/lib/constants` - BOOKING_MANAGER, SERVICES, PRICING, etc.

## Styling Patterns
- Tailwind CSS with custom colors (ink, paper, warm-gray)
- Framer Motion for animations
- Responsive: mobile-first with lg: breakpoints

## Date Handling
- Dates stored as Date objects in state
- Formatted to YYYY-MM-DD strings for API calls
- Calendar uses local timezone (no UTC conversion issues)
