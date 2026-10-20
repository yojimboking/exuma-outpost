# lib/

## Overview
Core utilities and constants for the Exuma Outpost booking system.

## Key Files

### constants.ts
Property data, pricing, services, and policies.
- `PROPERTY`: Property details (name, location, capacity, amenities)
- `PRICING`: Nightly rates by season, minimum nights, cleaning fee
- `SERVICE_CATEGORIES`: Available add-on services with pricing
- `PAYMENT_POLICY`: Deposit percentage, balance due days, cancellation tiers
- `BOOKING_MANAGER`: Sharell's info including WhatsApp number

### animations.ts
Framer Motion animation utilities.

### utils.ts
General utility functions (cn for classnames, etc).

## Deleted Files (OwnerRez Migration)

### sharell-prompt.ts (DELETED - US-003)
Was: AI system prompt builder for Sharell chat.
Removed: AI chat system replaced with direct inquiry form.

### booking-context.ts (DELETED - US-003)
Was: Types for chat-based booking flow.
Removed: No longer needed without AI chat.

### calendar-sync.ts (DELETED - US-003)
Was: iCal feed parsing for Airbnb/VRBO calendars.
Removed: Will be replaced with OwnerRez API integration.

### sharell-knowledge.ts (DELETED - US-007)
Was: Q&A knowledge bank for AI Sharell responses.
Removed: Final cleanup - was orphaned after chat removal.

### rate-limit.ts (DELETED - US-007)
Was: In-memory rate limiter for chat/payment endpoints.
Removed: Final cleanup - was orphaned after API route deletions.

## Patterns

### Constants Usage
- Constants are imported by components for property info, pricing calculations
- `BOOKING_MANAGER.whatsapp` used for WhatsApp deep links
- `PRICING` used in InquiryForm for estimate calculations

## Gotchas
- WhatsApp number in constants must be digits-only for wa.me URL
