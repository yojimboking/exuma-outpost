# Exuma Outpost - Comprehensive Bug Report

Generated: 2026-01-18
Status: Ready for fixes

This document contains all identified vulnerabilities, bugs, and issues requiring attention. Each item includes the file path, line number, detailed description, and suggested fix.

---

## Table of Contents

1. [Critical Issues](#critical-issues)
2. [High Priority Issues](#high-priority-issues)
3. [Medium Priority Issues](#medium-priority-issues)
4. [Low Priority Issues](#low-priority-issues)
5. [Open Questions](#open-questions)
6. [Action Plan Summary](#action-plan-summary)

---

## Critical Issues

### CRIT-001: Client-Controlled Payment Totals Enable Underpayment

**Files:**
- `app/api/create-payment-link/route.ts:122`
- `app/api/create-payment-link/route.ts:135`

**Description:**
The payment link creation endpoint trusts client-supplied `bookingContext.grandTotal` to compute the Stripe deposit amount. A malicious user can craft a request with a lower `grandTotal` value and pay less than the actual booking cost.

**Current Code Pattern:**
```typescript
// Line 122-135: Deposit calculated from untrusted client data
const deposit = bookingContext.grandTotal * 0.5; // or similar calculation
```

**Impact:**
- Financial loss from underpayments
- Booking integrity compromised
- Potential for systematic fraud

**Fix:**
1. Never trust client-provided totals for payment calculations
2. Recalculate the total server-side using trusted pricing data from `lib/constants.ts`
3. Validate dates, guest counts, and service selections against known prices
4. Store verified booking context server-side before creating Stripe session

**Suggested Implementation:**
```typescript
// Server-side price recalculation
import { calculateStayTotal, SERVICES } from '@/lib/constants';

function calculateTrustedTotal(booking: BookingContext): number {
  const stayTotal = calculateStayTotal(booking.checkIn, booking.checkOut, booking.guestCount);
  const servicesTotal = booking.services.reduce((sum, serviceId) => {
    const service = SERVICES.find(s => s.id === serviceId);
    return sum + (service?.price ?? 0);
  }, 0);
  return stayTotal + servicesTotal;
}

// In route handler:
const trustedTotal = calculateTrustedTotal(bookingContext);
const deposit = trustedTotal * 0.5;
```

---

## High Priority Issues

### HIGH-001: Null Spread of extractedContext Causes Runtime Crash

**Files:**
- `hooks/useSharellChat.ts:495`
- `hooks/useSharellChat.ts:508`

**Description:**
The API response `data.extractedContext` can be `null`, but the code spreads it directly into an object. This throws a TypeError, triggers the catch block, removes the user's message even after a successful AI response, and prevents `/api/notify` and `onBookingConfirmed` from executing.

**Current Code:**
```typescript
// Line 495
setBookingContext(prev => ({ ...prev, ...data.extractedContext }));

// Line 508
onBookingConfirmed?.({ ...bookingContext, ...data.extractedContext });
```

**Impact:**
- Runtime crashes on null context
- Lost user messages
- Failed booking confirmations
- Notifications not sent

**Fix:**
Normalize `extractedContext` before use:
```typescript
const extracted = data.extractedContext ?? {};
setBookingContext(prev => ({ ...prev, ...extracted }));
// ...
onBookingConfirmed?.({ ...bookingContext, ...extracted });
```

Or ensure the API always returns `{}` instead of `null`.

---

### HIGH-002: Invalid Stripe API Version Causes Runtime Failure

**Files:**
- `app/api/create-payment-link/route.ts:61`

**Description:**
The Stripe client is initialized with `apiVersion: '2024-12-18.acacia'`, which is not a valid Stripe API version string. The `.acacia` suffix will cause Stripe SDK to throw an error at runtime.

**Current Code:**
```typescript
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia', // Invalid version
});
```

**Impact:**
- Stripe payments completely broken
- Payment link creation fails
- No bookings can be completed

**Fix:**
Use a valid Stripe API version or omit to use account default:
```typescript
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16', // Valid version
});
// Or omit apiVersion to use account default
```

---

### HIGH-003: Availability API Exists But Not Integrated in UI

**Files:**
- `components/sections/InquiryForm.tsx:134`
- `app/api/availability/route.ts:1-24`

**Description:**
The `/api/availability` endpoint exists and returns blocked dates from calendar sync, but the InquiryForm uses hardcoded blackout dates instead. Users can select dates that are actually blocked.

**Current Code in InquiryForm:**
```typescript
// Line 134: Hardcoded blackout dates
const blackoutDates = ['2024-12-25', '2024-12-31']; // Static, not from API
```

**Impact:**
- Double bookings possible
- Calendar sync data unused
- Manual date blocking ineffective

**Fix:**
1. Fetch availability from API on component mount
2. Pass blocked dates to date picker
3. Re-validate availability server-side before payment link creation

```typescript
useEffect(() => {
  fetch('/api/availability')
    .then(res => res.json())
    .then(data => setBlockedDates(data.blockedDates));
}, []);
```

---

### HIGH-004: iCal Parsing Ignores Line Endings and Timezones

**Files:**
- `lib/calendar-sync.ts:44`
- `lib/calendar-sync.ts:77`

**Description:**
The iCal parser uses naive string splitting that ignores:
1. RFC 5545 line folding (`\r\n` followed by whitespace)
2. Timezone semantics (VTIMEZONE components)
3. DATE vs DATE-TIME value types

This causes off-by-one date errors and missed blocked dates.

**Current Code:**
```typescript
// Line 44: Naive line splitting
const lines = icalData.split('\n');

// Line 77: No timezone handling
const dateStr = line.split(':')[1];
```

**Impact:**
- Dates shifted by timezone offset
- Blocked dates missed or wrong
- Double bookings from calendar sync failures

**Fix:**
Use a proper iCal parser library:
```typescript
import ical from 'node-ical';

async function parseICalFeed(url: string): Promise<Date[]> {
  const events = await ical.async.fromURL(url);
  return Object.values(events)
    .filter(e => e.type === 'VEVENT')
    .map(e => normalizeToUTC(e.start));
}
```

---

### HIGH-005: PII Logged to Console in Production

**Files:**
- `app/api/notify/route.ts:18`
- `app/api/create-payment-link/route.ts:94`

**Description:**
Full booking details including guest names, email addresses, phone numbers, and chat transcripts are logged to console. In production environments, these logs may be stored and accessible.

**Current Code:**
```typescript
// Line 18 in notify/route.ts
console.log('Booking notification:', bookingContext);
// Logs: { name: "John Doe", email: "john@example.com", phone: "+1234567890", ... }
```

**Impact:**
- Privacy violation (GDPR, CCPA concerns)
- PII exposure in log aggregators
- Security audit failures

**Fix:**
1. Remove PII from logs or redact sensitive fields
2. Implement proper logging with redaction
3. Use structured logging that excludes sensitive data

```typescript
console.log('Booking notification received', {
  checkIn: bookingContext.checkIn,
  checkOut: bookingContext.checkOut,
  guestCount: bookingContext.guestCount,
  // Omit: name, email, phone, transcript
});
```

---

### HIGH-006: Public API Endpoints Lack Authentication and Rate Limiting

**Files:**
- `app/api/chat/route.ts:18`
- `app/api/create-payment-link/route.ts:122`
- `app/api/notify/route.ts:10`

**Description:**
All API endpoints are publicly accessible with no authentication, CSRF protection, or rate limiting. This enables:
1. Spam abuse of `/api/notify`
2. Cost attacks via `/api/chat` (burns Anthropic API credits)
3. Fraudulent payment links via `/api/create-payment-link`

**Impact:**
- Uncontrolled API costs
- Spam/abuse vulnerability
- No audit trail of requests

**Fix:**
1. Add rate limiting (e.g., using Vercel Edge Config or upstash/ratelimit)
2. Implement CSRF tokens for state-changing endpoints
3. Consider API key or session-based authentication

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return new Response('Rate limited', { status: 429 });
  }
  // ... rest of handler
}
```

---

### HIGH-007: eval() Used for Dynamic Stripe Import

**Files:**
- `app/api/create-payment-link/route.ts:50-54`

**Description:**
The code uses `eval()` to dynamically import Stripe, which is unnecessary, creates security policy conflicts, and may fail in strict environments.

**Current Code:**
```typescript
// Line 50-54
const Stripe = eval('require')('stripe');
```

**Impact:**
- CSP violations in strict environments
- Potential code injection if module name is ever user-influenced
- Build/bundle issues

**Fix:**
Use standard import:
```typescript
import Stripe from 'stripe';
// Or for conditional loading:
const Stripe = (await import('stripe')).default;
```

---

## Medium Priority Issues

### MED-001: Booking Context State Doesn't Sync with Prop Changes

**Files:**
- `hooks/useSharellChat.ts:327`

**Description:**
`bookingContext` is initialized via `useState(initialContext)` but never updates when `initialContext` prop changes. Reopening the chat modal after changing services/dates shows stale data.

**Current Code:**
```typescript
// Line 327
const [bookingContext, setBookingContext] = useState(initialContext);
// Missing: useEffect to sync when initialContext changes
```

**Fix:**
Add effect to sync state:
```typescript
useEffect(() => {
  setBookingContext(initialContext);
}, [initialContext]);
```

Or make the hook fully controlled by props.

---

### MED-002: Guest Count of 2 Treated as "Not Provided"

**Files:**
- `hooks/useSharellChat.ts:152`
- `hooks/useSharellChat.ts:231`

**Description:**
The default `guestCount` is 2, but `hasGuestCount` checks truthiness. Since 2 is truthy, but the logic treats it as "not provided," parties of exactly 2 guests get repeatedly asked for guest count.

**Current Code:**
```typescript
// Line 152
const hasGuestCount = Boolean(bookingContext.guestCount); // 2 is truthy but means "default"

// Line 231
if (bookingContext.guestCount) { // Triggers even for default value
```

**Fix:**
Track whether user explicitly provided guest count:
```typescript
const [guestCountProvided, setGuestCountProvided] = useState(false);
// Or use 0/null as default and validate explicitly
const hasGuestCount = guestCountProvided || bookingContext.guestCount !== 2;
```

---

### MED-003: Duplicate Notification Triggers

**Files:**
- `hooks/useSharellChat.ts:487`
- `components/sections/InquiryForm.tsx:315`

**Description:**
Both the chat hook (on payment/handoff) and `handleBookingConfirmed` in InquiryForm send notifications to `/api/notify`. This can result in duplicate notifications being sent.

**Fix:**
Choose a single notification path:
- Option A: Only notify in the hook, remove from InquiryForm
- Option B: Only notify in InquiryForm, add flag to prevent hook notification
- Option C: Add deduplication key to prevent double sends

---

### MED-004: Add-ons Charged Per-Day Even Without Dates Selected

**Files:**
- `components/sections/InquiryForm.tsx:166-168`

**Description:**
Add-on totals use `Math.max(nights, 1)` for per-day pricing, so charges appear even before dates are selected (nights = 0).

**Current Code:**
```typescript
// Line 166-168
const addOnTotal = addOns.reduce((sum, addon) => {
  return sum + addon.price * Math.max(nights, 1); // Always at least 1
}, 0);
```

**Fix:**
Only calculate per-day add-ons when nights > 0:
```typescript
const addOnTotal = nights > 0
  ? addOns.reduce((sum, addon) => sum + addon.price * nights, 0)
  : 0;
```

---

### MED-005: WhatsApp Fallback Shows "null" for Missing Dates

**Files:**
- `app/api/create-payment-link/route.ts:22-24`

**Description:**
When dates are not set, the WhatsApp message template includes literal "null" text.

**Current Code:**
```typescript
const message = `Booking: ${checkIn} to ${checkOut}`; // Shows "null to null"
```

**Fix:**
Format missing values appropriately:
```typescript
const formatDate = (d: string | null) => d ?? 'TBD';
const message = `Booking: ${formatDate(checkIn)} to ${formatDate(checkOut)}`;
```

---

### MED-006: Phone Extraction Regex Too Permissive

**Files:**
- `app/api/chat/route.ts:117-121`

**Description:**
The phone number extraction regex is too broad and matches dates, prices, and other numeric patterns as phone numbers.

**Fix:**
Use a phone number parsing library:
```typescript
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

function extractPhone(text: string): string | null {
  const match = text.match(/[\d\s\-\+\(\)]{10,}/);
  if (match && isValidPhoneNumber(match[0], 'US')) {
    return parsePhoneNumber(match[0], 'US').format('E.164');
  }
  return null;
}
```

---

### MED-007: Duplicated ConversationPhase Types

**Files:**
- `hooks/useSharellChat.ts:10-22`
- `lib/sharell-prompt.ts:206-214` (or 241)

**Description:**
`ConversationPhase` type is defined in two places. If one changes without the other, type mismatches and bugs occur.

**Fix:**
Consolidate to single source:
```typescript
// lib/types.ts
export type ConversationPhase = 'greeting' | 'gathering' | 'confirming' | 'payment' | 'complete';

// In other files:
import { ConversationPhase } from '@/lib/types';
```

---

### MED-008: Remote Images Marked as Unoptimized

**Files:**
- `components/sections/ExploreArea.tsx:96`

**Description:**
Remote images use `unoptimized={true}`, disabling Next.js image optimization and hurting Largest Contentful Paint (LCP) performance.

**Fix:**
Remove `unoptimized` flag and ensure domain is in `next.config.mjs`:
```javascript
// next.config.mjs
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
  ],
},
```

---

### MED-009: Missing Unit Tests for Critical Functions

**Files:**
- `tests/` (only e2e tests exist)
- `lib/constants.ts` - `calculateStayTotal` untested
- `lib/calendar-sync.ts` - parsing untested
- `app/api/chat/route.ts` - extraction logic untested

**Description:**
No unit tests exist for critical business logic including pricing calculations, date parsing, and booking context extraction.

**Fix:**
Add unit tests:
```typescript
// tests/unit/constants.test.ts
import { calculateStayTotal } from '@/lib/constants';

describe('calculateStayTotal', () => {
  it('calculates correct total for 3-night stay', () => {
    expect(calculateStayTotal('2024-03-01', '2024-03-04', 2)).toBe(expectedTotal);
  });

  it('handles invalid dates gracefully', () => {
    expect(calculateStayTotal(null, null, 2)).toBe(0);
  });
});
```

---

### MED-010: Timezone Issues in Availability API

**Files:**
- `app/api/availability/route.ts:16`

**Description:**
Using `toISOString()` converts dates to UTC, which can shift the date by a day depending on timezone. A date blocked as "March 15" could appear as "March 14" or "March 16".

**Current Code:**
```typescript
const dateStr = date.toISOString().split('T')[0]; // Timezone shift possible
```

**Fix:**
Format in local time:
```typescript
const dateStr = date.toLocaleDateString('en-CA'); // YYYY-MM-DD format, local time
// Or normalize all dates to UTC at creation time
```

---

## Low Priority Issues

### LOW-001: Zero Price Treated as Null/Missing

**Files:**
- `components/sections/InquiryForm.tsx:289-295`
- `lib/booking-context.ts:145-147`

**Description:**
Code uses `||` instead of `??` for price checks, treating legitimate `0` prices as "missing" and showing "Inquire for pricing" instead of "$0".

**Current Code:**
```typescript
const price = service?.price || null; // 0 becomes null
const display = s.price ? `$${s.price}` : 'Inquire'; // 0 shows "Inquire"
```

**Fix:**
```typescript
const price = service?.price ?? null;
const display = s.price !== null ? `$${s.price}` : 'Inquire';
```

---

### LOW-002: Lightbox Swipe Fails at Screen Edge

**Files:**
- `components/gallery/Lightbox.tsx:72-73`

**Description:**
Touch swipe uses falsy check `if (!touchStart || !touchEnd)` which fails when `touchStart = 0` (left edge of screen).

**Fix:**
```typescript
if (touchStart === null || touchEnd === null) return;
```

---

### LOW-003: Empty Images Array Causes Crash

**Files:**
- `components/ui/Lightbox.tsx:29-35`
- `components/ui/Lightbox.tsx:67`

**Description:**
Navigation uses `% images.length` without guarding for empty arrays, causing division by zero and undefined access.

**Fix:**
Add early return:
```typescript
if (images.length === 0) return null;
// Or disable navigation when empty
```

---

### LOW-004: Contact Section Hard-Codes WhatsApp Number

**Files:**
- `components/sections/Contact.tsx:7`

**Description:**
WhatsApp link uses hard-coded number instead of `CONTACT.whatsapp` constant, risking mismatch if constant is updated.

**Fix:**
```typescript
import { CONTACT } from '@/lib/constants';
const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}`;
```

---

### LOW-005: README Port Mismatch

**Files:**
- `README.md:7`
- `playwright.config.ts:28`

**Description:**
README says dev server runs on port 3001, but Playwright config uses port 3000.

**Fix:**
Align both to same port (likely 3000).

---

### LOW-006: Unresolved TODOs

**Files:**
- `lib/calendar-sync.ts:18` - TODO for iCal URLs
- `app/api/notify/route.ts:26` - TODO for email integration

**Fix:**
Complete TODO items or convert to GitHub issues for tracking.

---

### LOW-007: Unused formatDate Helper

**Files:**
- `components/sections/InquiryForm.tsx:12`

**Description:**
`formatDate` is defined but never used.

**Fix:**
Remove unused code.

---

### LOW-008: No Security Headers Configured

**Files:**
- `next.config.mjs`

**Description:**
Missing security headers: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security.

**Fix:**
Add headers in next.config.mjs:
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ];
},
```

---

### LOW-009: Potential SSRF via iCal URLs

**Files:**
- `lib/calendar-sync.ts:18`
- `lib/calendar-sync.ts:106`

**Description:**
iCal feed URLs are fetched from environment variables without allowlisting. If env values can be influenced, internal network resources could be accessed.

**Fix:**
Validate URLs against allowlist:
```typescript
const ALLOWED_HOSTS = ['calendar.google.com', 'airbnb.com', 'vrbo.com'];
const url = new URL(icalUrl);
if (!ALLOWED_HOSTS.includes(url.hostname)) {
  throw new Error('Invalid calendar URL');
}
```

---

## Open Questions

1. **Payment Link Authority**: Is `/api/create-payment-link` intended for real payments or just a placeholder? Remediation priority depends on this.

2. **Availability Enforcement**: Should availability be enforced UI-only, or also validated server-side before payment links/notifications?

3. **Duplicate Notifications**: Is the duplicate notification on booking confirmation intentional (belt-and-suspenders) or a bug to fix?

4. **Chat State Persistence**: Should the chat reset (messages + greeting) whenever the modal is closed and reopened?

---

## Action Plan Summary

### Immediate (Critical)
1. [x] Implement server-side price validation in payment link creation
2. [x] Fix Stripe API version and remove eval import

### This Week (High)
3. [x] Fix null spread crash in useSharellChat
4. [x] Integrate availability API into UI
5. [x] Fix iCal parsing with proper library
6. [x] Remove PII from logs
7. [x] Add rate limiting to API endpoints

### Next Sprint (Medium)
8. [x] Fix booking context state sync
9. [x] Fix guest count detection logic
10. [x] Deduplicate notification triggers
11. [x] Fix add-on pricing for zero nights
12. [x] Add unit tests for critical functions
13. [x] Consolidate duplicated types
14. [x] Fix phone extraction regex (MED-006)
15. [x] Fix remote images unoptimized (MED-008)
16. [x] Fix timezone issues in availability API (MED-010)
17. [x] Fix WhatsApp null dates (MED-005)

### Backlog (Low)
18. [x] Fix zero price handling
19. [x] Fix Lightbox edge cases
20. [x] Update Contact to use constants
21. [x] Align documentation
22. [x] Add security headers
23. [x] Clean up unused code

---

*Report generated by Codex agents on 2026-01-18*
