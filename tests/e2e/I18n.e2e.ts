import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test.describe('Language Switching', () => {
    test('should switch language from English to Swedish using dropdown and verify text on the homepage', async ({ page }) => {
      await page.goto('/');

      // Wait for the page to be loaded
      await page.waitForSelector('body', { state: 'visible' });

      // Switch to Swedish
      await page.getByRole('button', { name: 'lang-switcher' }).click();
      await page.getByText('Svenska').click();

      // Wait for navigation and content update
      await page.waitForURL('**/sv');
      await page.waitForSelector('body', { state: 'visible' });

      // Verify Swedish text
      await expect(
        page.getByText('Caire - Framtidens Hemtjänstplanering'),
      ).toBeVisible();
    });

    test('should switch language from English to Swedish using URL and verify text on the sign-in page', async ({ page }) => {
      // Visit English sign-in
      await page.goto('/sign-in');
      await page.waitForSelector('body', { state: 'visible' });

      // Verify English text
      await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

      // Visit Swedish sign-in
      await page.goto('/sv/sign-in');
      await page.waitForSelector('body', { state: 'visible' });

      // Verify Swedish text
      await expect(page.getByRole('heading', { name: 'Logga in' })).toBeVisible();
    });
  });
});
