import { test, expect } from '@playwright/test';

/**
 * Smoke test to verify Playwright is working correctly with the Exuma Outpost site.
 */
test.describe('Smoke Test', () => {
  test('homepage loads successfully', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');

    // Verify page title contains expected text
    await expect(page).toHaveTitle(/Exuma/i);
  });

  test('inquiry form is visible on homepage', async ({ page }) => {
    await page.goto('/');

    // Look for the inquiry form section
    // The form should have date picker or service checkboxes
    const inquirySection = page.locator('[data-testid="inquiry-form"]').or(
      page.getByRole('button', { name: /chat with sharell/i })
    );

    // At least one should be visible on the page
    await expect(inquirySection.first()).toBeVisible({ timeout: 10000 });
  });
});
