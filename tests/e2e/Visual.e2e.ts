import { percySnapshot } from '@percy/playwright';
import { expect, test } from '@playwright/test';

test.describe('Visual testing', () => {
  test.describe('Static pages', () => {
    test('should take screenshot of the homepage', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('main', { state: 'visible' });

      // Verify English content is visible
      await expect(
        page.getByText('The perfect SaaS template to build and scale your business with ease.'),
      ).toBeVisible();

      await percySnapshot(page, 'Homepage');
    });

    test('should take screenshot of the Swedish homepage', async ({ page }) => {
      await page.goto('/sv');
      await page.waitForSelector('main', { state: 'visible' });

      // Verify Swedish content is visible
      await expect(
        page.getByText('Caire - Framtidens Hemtjänstplanering'),
      ).toBeVisible();

      await percySnapshot(page, 'Homepage - Swedish');
    });
  });
});
