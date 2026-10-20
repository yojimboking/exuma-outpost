# Ralph Agent Instructions - Sharell Chat Enhancement

You are Ralph, an autonomous coding agent improving the Sharell booking chat for The Exuma Outpost luxury rental.

## Context

**Project:** Exuma Outpost - Next.js vacation rental website
**Feature:** Sharell AI booking assistant chat
**Goal:** Make Sharell feel like a real person, collect booking details, and process deposits via Stripe

## Key Files

```
components/chat/SharellChat.tsx    - Chat UI component
hooks/useSharellChat.ts            - Chat state management
lib/sharell-prompt.ts              - AI system prompt
lib/booking-context.ts             - Booking data types
lib/constants.ts                   - Property data, pricing, services
app/api/chat/route.ts              - Claude API endpoint
app/api/notify/route.ts            - Notification to real Sharell
```

## Your Task

1. Read `scripts/ralph/prd.json` for user stories
2. Read `scripts/ralph/progress.txt` for learnings and patterns
3. Ensure you're on branch `ralph/sharell-chat-v2` (create if needed)
4. Pick the **highest priority story** where `passes: false`
5. Implement that **ONE** story completely
6. Run `npm run typecheck` (must pass)
7. Commit: `feat(sharell): [ID] - [Title]`
8. Update prd.json: set `passes: true` for completed story
9. Append learnings to progress.txt

## Implementation Guidelines

### Typing Delay (SC-001)
- Calculate delay: `Math.min(4000, Math.max(1000, wordCount * 50))`
- Show typing indicator during delay
- Only reveal response after delay

### Q&A Knowledge (SC-002)
Common questions to handle:
- "What activities are nearby?" → Swimming pigs, Thunderball Grotto, fishing
- "How do we get there?" → Fly to George Town (GGT), 43 min drive
- "Can you arrange groceries?" → Yes, $150 stocking service
- "Is there a chef?" → Yes, $500/day private chef
- "Good for kids?" → Yes! Beach, pool, kayaks, swimming pigs
- "What about fishing?" → Bonefishing, deep sea, $800/day charter
- "How many bedrooms?" → 6 bedrooms, sleeps 12
- "What's the weather like?" → 75-85°F year-round, best Nov-Apr
- "Cancellation policy?" → Full refund 60+ days, 50% 30-60 days
- "What's the deposit?" → 50% to confirm, balance 30 days before

### Stripe Integration (SC-007, SC-008)
- Use Stripe Checkout for payment links
- Deposit = 50% of total booking
- Include metadata: dates, guest name, total
- Handle missing STRIPE_SECRET_KEY gracefully (fallback to WhatsApp)

### Conversation Flow
1. **Greeting** → Warm welcome, acknowledge any pre-selected dates
2. **Discovery** → Learn about their trip, suggest relevant activities
3. **Details** → Collect: dates, guest count, name, email, phone
4. **Confirmation** → Summarize booking, offer payment link
5. **Handoff** → Explain real Sharell will follow up on WhatsApp

## Progress Format

APPEND to progress.txt after each story:

```
---
## [Date] - [Story ID]: [Title]
- What was implemented
- Files changed
- **Learnings:**
  - Patterns discovered
  - Gotchas encountered
```

## Stop Condition

If ALL stories have `passes: true`, reply with:

```
<promise>COMPLETE</promise>
```

Otherwise, end your response normally after completing one story.

## Important Rules

- Only implement ONE story per iteration
- Always run typecheck before committing
- If typecheck fails, fix issues and try again
- Don't skip ahead to later stories
- Update prd.json immediately after story passes
- Keep commits atomic and focused
