# tests/

## Overview
End-to-end tests using Playwright for the Exuma Outpost site.

## Patterns
- Use `test.describe()` to group related tests
- Tests should be independent and not rely on each other's state
- Use page.locator() for element selection, prefer accessibility attributes
- Use `await expect().toBeVisible()` for visibility checks with reasonable timeouts
- Use `test.use({ viewport: { width, height } })` inside describe blocks to set custom viewport sizes
- For modal-heavy flows, use a taller viewport (e.g., 900px height) to ensure buttons are clickable

## Test Structure
```
tests/
  smoke.spec.ts              - Basic smoke tests for site health
  sharell-services.spec.ts   - Service selection → chat flow tests (TO BE UPDATED)
  unit/                      - Unit tests using Vitest
```

## Deleted Tests (OwnerRez Migration)

### unit/calendar-sync.test.ts (DELETED - US-003)
Was: Unit tests for iCal parsing and date blocking logic.
Removed: calendar-sync.ts was deleted, tests no longer applicable.

## Commands
- `npm run test` - Run all tests headless
- `npm run test:ui` - Run tests with Playwright UI (debugging)
- `npm run test:headed` - Run tests in visible browser
- `npm run test -- --grep "pattern"` - Run tests matching pattern

## Configuration
- `playwright.config.ts` at project root
- Uses localhost:3000 as baseURL
- Automatically starts dev server before tests
- Only Chromium browser enabled (for speed)

## Selectors for Common Elements

### Inquiry Form
- Date inputs: `page.locator('input[type="date"]').first()` (check-in), `.nth(1)` (check-out)
- Name input: `page.locator('input[placeholder="Your name"]')`
- Service checkboxes: `page.locator('button').filter({ hasText: 'Service Name' })`
- Chat button: `page.getByRole('button', { name: /chat with sharell/i })`

### Confirmation Modal
- Modal title: `page.locator('text=Inquiry Received!')`
- Continue button: `page.getByRole('button', { name: /chat with sharell now/i })`

### Sharell Chat Modal
- Chat input: `page.locator('input[placeholder="Type a message..."]')`
- User messages: `page.locator('.rounded-2xl.bg-ink.text-white, .bg-ink.text-white.rounded-br-md')`
- Assistant messages: `page.locator('.bg-warm-gray\\/50, [class*="bg-paper"]')` - need to filter for substantial content

## Gotchas
- The dev server must be running or will be auto-started (can take ~30s on first run)
- Use `{ timeout: 10000 }` for elements that may take time to appear
- The inquiry form may or may not have `data-testid` - use `.or()` for fallbacks
- **Modals with animations**: Wait for animation to settle with `page.waitForTimeout(500)` before clicking buttons
- **Modal button outside viewport**: Use `scrollIntoViewIfNeeded()` and `click({ force: true })` for animated modals
- **Multiple overlapping modals**: Wait for the first modal to close with `expect().not.toBeVisible()` before interacting with the second
- **Date selection**: Use ISO date format `YYYY-MM-DD` when filling date inputs, and ensure check-out is at least 7 days after check-in (minimum stay requirement)
- **Multiple service selection**: Use a `for...of` loop to click services sequentially; verify each with `toHaveClass(/border-ink/)` after clicking
- **Message content verification**: For multiple services, use `expect(text).toContain()` for each keyword rather than a single regex
- **Service checkbox selected state**: Check for `toHaveClass(/border-ink bg-ink/)` for selected buttons. Don't use `not.toHaveClass(/border-ink/)` for unselected - the hover class `hover:border-ink` causes false matches. Use `toHaveClass(/border-light-gray/)` instead to verify unselected state.
- **Baseline tests (no selection)**: When testing that nothing is selected, verify the unselected class (`border-light-gray`) is present rather than verifying the selected class is absent
- **Parameterized tests**: Use `for...of` loop over an array of test data to generate multiple test cases from a single test template. Each item should have `label` (UI text) and `keyword` (pattern to verify). Use regex alternation (`|`) for services with multiple keywords (e.g., `'diving|snorkeling'`).
- **Testing AI responses**: Sharell's response appears after the API call + typing delay (can take 15-30s). Use `{ timeout: 30000 }` for AI responses. Filter assistant messages by substantial content (`.filter({ hasText: /.{20,}/ })`) to avoid matching typing indicators or empty elements.
- **Follow-up question verification**: AI responses should contain questions - check for `?` character or question patterns like "would you", "have you", "are you", "interested", "let me know", "tell me".
