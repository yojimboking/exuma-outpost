# hooks/

## Overview
Custom React hooks for the Exuma Outpost application.

## Patterns

### Hook Organization
- Each hook should be in its own file
- Export named functions (not default exports)
- Use TypeScript interfaces for options and return types

### Error Handling
For hooks that make API calls, use a consistent error pattern:
- Return error state with user-friendly message
- Include retry capability when applicable
- Provide fallback behavior (e.g., WhatsApp contact)

## Removed Files

### useSharellChat.ts (DELETED - US-001)
The Sharell AI chat hook was removed as part of the OwnerRez integration.
The InquiryForm now uses direct WhatsApp contact instead of AI chat.
