# API Routes

## Overview
Next.js API route handlers for the Exuma Outpost backend.

## Patterns

### Response Format
All API routes should return `NextResponse.json()` with consistent structure:
- Success: `{ success: true, ...data }`
- Error: `{ success: false, error: 'message' }` with appropriate status code

### Server-Side Logging
Use `console.log` and `console.error` for server-side debugging:
- Prefix logs with context: `[Availability]`, `[Inquire]`
- These appear in server logs, not browser console

## Active Endpoints

### /api/availability
- GET: Fetch calendar availability
- Returns: `{ blockedDates: string[], lastUpdated: string }`
- Uses 1-hour revalidation cache
- **Currently uses mock data** (US-003/US-004): Returns hardcoded blocked dates until OwnerRez integration
- Mock data pattern: next 2 weeks blocked, plus bookings at 6 and 10 weeks out

### /api/inquire
- POST: Submit booking inquiry
- Accepts: `{ name, email, guests?, checkIn, checkOut, addOns?, message? }`
- Returns: `{ success: true, inquiryId: string, message: string }`
- Validates: required fields (name, email, checkIn, checkOut), email format, date format (YYYY-MM-DD)
- **Currently logs to console** (US-005): Placeholder for OwnerRez guest/quote creation
- Error response: `{ success: false, error: string }` with 400/500 status

## Deprecated/Removed Endpoints

### /api/chat (DELETED - US-001)
Removed as part of OwnerRez integration. AI chat replaced with direct WhatsApp contact.

### /api/create-payment-link (DELETED - US-002)
Removed - had security vulnerabilities, was unused after chat removal.

### /api/notify (DELETED - US-002)
Removed - unused notification endpoint that depended on deleted chat system.

## Gotchas
- API routes run on server, not client - console.log appears in terminal, not browser
- WhatsApp phone numbers need digits-only for wa.me URLs
