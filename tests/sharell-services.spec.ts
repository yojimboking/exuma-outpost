import { test, expect } from '@playwright/test';

/**
 * E2E tests for Sharell chat service context integration.
 * Verifies that services selected in the inquiry form are properly
 * passed to the Sharell chat and acknowledged in the initial message.
 */
test.describe('Sharell Service Context', () => {
  // Use a taller viewport to ensure modals fit
  test.use({ viewport: { width: 1280, height: 900 } });
  // Helper to select dates in the calendar (7+ nights required)
  async function selectDates(page: import('@playwright/test').Page) {
    // Find the check-in date input and enter a date
    // We need to pick dates at least 7 nights apart (minimum stay requirement)
    const today = new Date();

    // Start 14 days from now to avoid blackout dates
    const checkIn = new Date(today);
    checkIn.setDate(checkIn.getDate() + 14);

    // End 21 days from now (7 nights stay)
    const checkOut = new Date(today);
    checkOut.setDate(checkOut.getDate() + 21);

    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    // Fill in check-in date
    const checkInInput = page.locator('input[type="date"]').first();
    await checkInInput.fill(formatDate(checkIn));

    // Fill in check-out date
    const checkOutInput = page.locator('input[type="date"]').nth(1);
    await checkOutInput.fill(formatDate(checkOut));
  }

  // Helper to fill required guest details
  async function fillGuestDetails(page: import('@playwright/test').Page) {
    // Fill in name (required for form submission)
    const nameInput = page.locator('input[placeholder="Your name"]');
    await nameInput.fill('Test User');
  }

  test('SVC-004: Single service selection - Diving / Snorkeling', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Wait for the inquiry form section to be visible
    await page.waitForSelector('#contact', { timeout: 15000 });

    // Step 1: Select dates in calendar (required for valid form)
    await selectDates(page);

    // Step 2: Fill guest name (required for form submission)
    await fillGuestDetails(page);

    // Step 3: Click 'Diving / Snorkeling' checkbox
    // The checkbox button contains the service label text
    const divingCheckbox = page.locator('button').filter({ hasText: 'Diving / Snorkeling' });
    await expect(divingCheckbox).toBeVisible({ timeout: 5000 });
    await divingCheckbox.click();

    // Verify the checkbox is now selected (should have the selected styling)
    // Selected buttons have 'border-ink bg-ink/5' classes
    await expect(divingCheckbox).toHaveClass(/border-ink/);

    // Step 4: Click 'Chat with Sharell' button
    const chatButton = page.getByRole('button', { name: /chat with sharell/i });
    await expect(chatButton).toBeEnabled({ timeout: 5000 });
    await chatButton.click();

    // Step 5: Wait for confirmation modal and click continue
    const confirmationModal = page.locator('text=Inquiry Received!');
    await expect(confirmationModal).toBeVisible({ timeout: 5000 });

    // Wait for modal animation to settle
    await page.waitForTimeout(500);

    // Click the "Chat with Sharell Now" button in the modal
    // Use force: true as modal animation may cause stability issues
    const continueButton = page.getByRole('button', { name: /chat with sharell now/i });
    await expect(continueButton).toBeVisible({ timeout: 3000 });
    await continueButton.scrollIntoViewIfNeeded();
    await continueButton.click({ force: true });

    // Step 6: Verify the chat opens and the initial user message contains 'Diving' or 'Snorkeling'
    // Wait for the confirmation modal to close
    await expect(confirmationModal).not.toBeVisible({ timeout: 5000 });

    // The chat modal should be open - look for the chat input placeholder
    const chatInput = page.locator('input[placeholder="Type a message..."]');
    await expect(chatInput).toBeVisible({ timeout: 5000 });

    // Wait for the initial user message to appear
    // User messages have 'bg-ink text-white' styling and appear in a rounded message bubble
    // The message should contain the selected service
    const userMessage = page.locator('.rounded-2xl.bg-ink.text-white, .bg-ink.text-white.rounded-br-md').filter({ hasText: /(diving|snorkeling)/i });
    await expect(userMessage).toBeVisible({ timeout: 15000 });

    // Verify the message content contains diving or snorkeling
    const messageText = await userMessage.textContent();
    expect(messageText?.toLowerCase()).toMatch(/(diving|snorkeling)/);
  });

  test('SVC-005: Multiple services selection - Private Chef, Boat Charter, Fishing Trip', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Wait for the inquiry form section to be visible
    await page.waitForSelector('#contact', { timeout: 15000 });

    // Step 1: Select dates in calendar (required for valid form)
    await selectDates(page);

    // Step 2: Fill guest name (required for form submission)
    await fillGuestDetails(page);

    // Step 3: Select multiple services
    const services = ['Private Chef', 'Boat Charter', 'Fishing Trip'];

    for (const service of services) {
      const serviceButton = page.locator('button').filter({ hasText: service });
      await expect(serviceButton).toBeVisible({ timeout: 5000 });
      await serviceButton.click();

      // Verify the checkbox is now selected (has border-ink class)
      await expect(serviceButton).toHaveClass(/border-ink/);
    }

    // Step 4: Click 'Chat with Sharell' button
    const chatButton = page.getByRole('button', { name: /chat with sharell/i });
    await expect(chatButton).toBeEnabled({ timeout: 5000 });
    await chatButton.click();

    // Step 5: Wait for confirmation modal and click continue
    const confirmationModal = page.locator('text=Inquiry Received!');
    await expect(confirmationModal).toBeVisible({ timeout: 5000 });

    // Wait for modal animation to settle
    await page.waitForTimeout(500);

    // Click the "Chat with Sharell Now" button in the modal
    const continueButton = page.getByRole('button', { name: /chat with sharell now/i });
    await expect(continueButton).toBeVisible({ timeout: 3000 });
    await continueButton.scrollIntoViewIfNeeded();
    await continueButton.click({ force: true });

    // Step 6: Verify the chat opens and the initial user message contains all services
    // Wait for the confirmation modal to close
    await expect(confirmationModal).not.toBeVisible({ timeout: 5000 });

    // The chat modal should be open - look for the chat input placeholder
    const chatInput = page.locator('input[placeholder="Type a message..."]');
    await expect(chatInput).toBeVisible({ timeout: 5000 });

    // Wait for the initial user message to appear
    // User messages have 'bg-ink text-white' styling
    const userMessage = page.locator('.rounded-2xl.bg-ink.text-white, .bg-ink.text-white.rounded-br-md').first();
    await expect(userMessage).toBeVisible({ timeout: 15000 });

    // Get the message text
    const messageText = await userMessage.textContent();
    const messageLower = messageText?.toLowerCase() || '';

    // Verify all three services appear in the initial message
    expect(messageLower).toContain('chef');
    expect(messageLower).toContain('boat');
    expect(messageLower).toContain('fishing');
  });

  test('SVC-006: No services selected - baseline generic greeting', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Wait for the inquiry form section to be visible
    await page.waitForSelector('#contact', { timeout: 15000 });

    // Step 1: Select dates in calendar (required for valid form)
    await selectDates(page);

    // Step 2: Fill guest name (required for form submission)
    await fillGuestDetails(page);

    // Step 3: Do NOT select any services - this is the baseline test
    // Verify at least one service button exists but is NOT selected
    const anyServiceButton = page.locator('button').filter({ hasText: 'Private Chef' });
    await expect(anyServiceButton).toBeVisible({ timeout: 5000 });
    // Verify it's not selected - unselected buttons have 'border-light-gray' class
    // Selected buttons have 'border-ink bg-ink/5' (note: hover:border-ink exists but isn't the selected state)
    await expect(anyServiceButton).toHaveClass(/border-light-gray/);

    // Step 4: Click 'Chat with Sharell' button
    const chatButton = page.getByRole('button', { name: /chat with sharell/i });
    await expect(chatButton).toBeEnabled({ timeout: 5000 });
    await chatButton.click();

    // Step 5: Wait for confirmation modal and click continue
    const confirmationModal = page.locator('text=Inquiry Received!');
    await expect(confirmationModal).toBeVisible({ timeout: 5000 });

    // Wait for modal animation to settle
    await page.waitForTimeout(500);

    // Click the "Chat with Sharell Now" button in the modal
    const continueButton = page.getByRole('button', { name: /chat with sharell now/i });
    await expect(continueButton).toBeVisible({ timeout: 3000 });
    await continueButton.scrollIntoViewIfNeeded();
    await continueButton.click({ force: true });

    // Step 6: Verify the chat opens with a generic greeting (not service-specific)
    // Wait for the confirmation modal to close
    await expect(confirmationModal).not.toBeVisible({ timeout: 5000 });

    // The chat modal should be open - look for the chat input placeholder
    const chatInput = page.locator('input[placeholder="Type a message..."]');
    await expect(chatInput).toBeVisible({ timeout: 5000 });

    // Wait for the initial user message to appear
    const userMessage = page.locator('.rounded-2xl.bg-ink.text-white, .bg-ink.text-white.rounded-br-md').first();
    await expect(userMessage).toBeVisible({ timeout: 15000 });

    // Get the message text
    const messageText = await userMessage.textContent();
    const messageLower = messageText?.toLowerCase() || '';

    // Verify this is a generic greeting, NOT a service-specific one
    // Service-specific greetings contain "I'd love to add" phrase
    expect(messageLower).not.toContain("i'd love to add");

    // Generic greetings should mention booking, property, or dates
    // Common patterns: "booking", "exuma outpost", "dates", "property", "learn more"
    const hasGenericContent =
      messageLower.includes('booking') ||
      messageLower.includes('exuma') ||
      messageLower.includes('outpost') ||
      messageLower.includes('dates') ||
      messageLower.includes('property') ||
      messageLower.includes('learn more') ||
      messageLower.includes('interested') ||
      messageLower.includes('trip') ||
      messageLower.includes('getaway') ||
      messageLower.includes('planning');

    expect(hasGenericContent).toBe(true);
  });

  /**
   * SVC-007: Parameterized test matrix for ALL service checkboxes.
   * Each service is tested individually to ensure proper selection and chat integration.
   */
  const ALL_SERVICES = [
    { label: 'Private Chef', keyword: 'chef' },
    { label: 'BBQ Grill Master', keyword: 'bbq' },
    { label: 'Pizza Party', keyword: 'pizza' },
    { label: 'Boat Charter', keyword: 'boat' },
    { label: 'Fishing Trip', keyword: 'fishing' },
    { label: 'Diving / Snorkeling', keyword: 'diving|snorkeling' },
    { label: 'In-Villa Spa', keyword: 'spa' },
    { label: 'Yoga / Meditation', keyword: 'yoga|meditation' },
    { label: 'Wedding Planning', keyword: 'wedding' },
    { label: 'Photography / Video', keyword: 'photo' },
    { label: 'Live Music', keyword: 'music' },
  ];

  for (const service of ALL_SERVICES) {
    test(`SVC-007: Service selection matrix - ${service.label}`, async ({ page }) => {
      // Navigate to homepage
      await page.goto('/');

      // Wait for the inquiry form section to be visible
      await page.waitForSelector('#contact', { timeout: 15000 });

      // Step 1: Select dates in calendar (required for valid form)
      await selectDates(page);

      // Step 2: Fill guest name (required for form submission)
      await fillGuestDetails(page);

      // Step 3: Click the specific service checkbox
      const serviceButton = page.locator('button').filter({ hasText: service.label });
      await expect(serviceButton).toBeVisible({ timeout: 5000 });
      await serviceButton.click();

      // Verify the checkbox is now selected (has border-ink class)
      await expect(serviceButton).toHaveClass(/border-ink/);

      // Step 4: Click 'Chat with Sharell' button
      const chatButton = page.getByRole('button', { name: /chat with sharell/i });
      await expect(chatButton).toBeEnabled({ timeout: 5000 });
      await chatButton.click();

      // Step 5: Wait for confirmation modal and click continue
      const confirmationModal = page.locator('text=Inquiry Received!');
      await expect(confirmationModal).toBeVisible({ timeout: 5000 });

      // Wait for modal animation to settle
      await page.waitForTimeout(500);

      // Click the "Chat with Sharell Now" button in the modal
      const continueButton = page.getByRole('button', { name: /chat with sharell now/i });
      await expect(continueButton).toBeVisible({ timeout: 3000 });
      await continueButton.scrollIntoViewIfNeeded();
      await continueButton.click({ force: true });

      // Step 6: Verify the chat opens and the initial user message contains the service
      // Wait for the confirmation modal to close
      await expect(confirmationModal).not.toBeVisible({ timeout: 5000 });

      // The chat modal should be open - look for the chat input placeholder
      const chatInput = page.locator('input[placeholder="Type a message..."]');
      await expect(chatInput).toBeVisible({ timeout: 5000 });

      // Wait for the initial user message to appear
      const userMessage = page.locator('.rounded-2xl.bg-ink.text-white, .bg-ink.text-white.rounded-br-md').first();
      await expect(userMessage).toBeVisible({ timeout: 15000 });

      // Verify the message content contains the service keyword
      const messageText = await userMessage.textContent();
      const messageLower = messageText?.toLowerCase() || '';

      // Use regex for keywords that have alternatives (e.g., "diving|snorkeling")
      const keywordPattern = new RegExp(service.keyword, 'i');
      expect(messageLower).toMatch(keywordPattern);
    });
  }

  /**
   * SVC-008: Verify Sharell's AI response acknowledges selected services.
   * This test waits for the AI to respond (after the initial user message)
   * and verifies the response mentions the selected service and asks a follow-up.
   */
  test('SVC-008: Sharell response acknowledges services and asks follow-up', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Wait for the inquiry form section to be visible
    await page.waitForSelector('#contact', { timeout: 15000 });

    // Step 1: Select dates in calendar (required for valid form)
    await selectDates(page);

    // Step 2: Fill guest name (required for form submission)
    await fillGuestDetails(page);

    // Step 3: Click 'Diving / Snorkeling' checkbox
    const divingCheckbox = page.locator('button').filter({ hasText: 'Diving / Snorkeling' });
    await expect(divingCheckbox).toBeVisible({ timeout: 5000 });
    await divingCheckbox.click();

    // Verify the checkbox is now selected
    await expect(divingCheckbox).toHaveClass(/border-ink/);

    // Step 4: Click 'Chat with Sharell' button
    const chatButton = page.getByRole('button', { name: /chat with sharell/i });
    await expect(chatButton).toBeEnabled({ timeout: 5000 });
    await chatButton.click();

    // Step 5: Wait for confirmation modal and click continue
    const confirmationModal = page.locator('text=Inquiry Received!');
    await expect(confirmationModal).toBeVisible({ timeout: 5000 });

    // Wait for modal animation to settle
    await page.waitForTimeout(500);

    // Click the "Chat with Sharell Now" button in the modal
    const continueButton = page.getByRole('button', { name: /chat with sharell now/i });
    await expect(continueButton).toBeVisible({ timeout: 3000 });
    await continueButton.scrollIntoViewIfNeeded();
    await continueButton.click({ force: true });

    // Step 6: Wait for the chat to open
    await expect(confirmationModal).not.toBeVisible({ timeout: 5000 });

    // The chat modal should be open - look for the chat input placeholder
    const chatInput = page.locator('input[placeholder="Type a message..."]');
    await expect(chatInput).toBeVisible({ timeout: 5000 });

    // Step 7: Wait for the initial user message to appear first
    const userMessage = page.locator('.rounded-2xl.bg-ink.text-white, .bg-ink.text-white.rounded-br-md').first();
    await expect(userMessage).toBeVisible({ timeout: 15000 });

    // Step 8: Wait for Sharell's response to appear
    // Assistant messages have 'bg-paper' or 'bg-warm-gray' styling
    // They appear after the user message in the chat flow
    // We need to wait for the typing indicator to disappear and the response to render

    // First, we might see a typing indicator (three dots animation)
    // Wait for it to appear and then disappear, OR for the response to appear
    const typingIndicator = page.locator('[class*="animate-"], .rounded-full.bg-warm-gray');

    // Wait for Sharell's response - assistant messages are in a different container
    // Look for a message that is NOT the user message (doesn't have bg-ink)
    // Sharell's messages have lighter background and rounded-bl-md
    const sharellMessage = page.locator('.rounded-2xl.bg-warm-gray\\/50, .bg-warm-gray\\/50.rounded-bl-md, [class*="bg-paper"], [class*="bg-warm-gray"]')
      .filter({ hasNotText: /typing/i })
      .locator('p, span, div')
      .filter({ hasText: /.{20,}/ }); // Must have substantial content (>20 chars)

    // Wait for Sharell's response with longer timeout (API call + typing delay)
    await expect(sharellMessage.first()).toBeVisible({ timeout: 30000 });

    // Get the response text
    const responseText = await sharellMessage.first().textContent();
    const responseLower = responseText?.toLowerCase() || '';

    // Step 9: Verify Sharell's response mentions diving or snorkeling
    const mentionsService = responseLower.includes('diving') ||
                            responseLower.includes('snorkeling') ||
                            responseLower.includes('snorkel') ||
                            responseLower.includes('underwater') ||
                            responseLower.includes('thunderball') ||
                            responseLower.includes('reef');

    expect(mentionsService).toBe(true);

    // Step 10: Verify Sharell asks a relevant follow-up question
    // Look for question patterns: "?", "would you", "have you", "are you", "do you", "how about", "interested"
    const hasFollowUpQuestion = responseLower.includes('?') ||
                                responseLower.includes('would you') ||
                                responseLower.includes('have you') ||
                                responseLower.includes('are you') ||
                                responseLower.includes('do you') ||
                                responseLower.includes('how about') ||
                                responseLower.includes('interested') ||
                                responseLower.includes("let me know") ||
                                responseLower.includes('tell me');

    expect(hasFollowUpQuestion).toBe(true);
  });
});
