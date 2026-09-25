import { test, expect } from '@playwright/test';

test('should render the workspace heading', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Interview workspace' })).toBeVisible();
  await expect(page.getByRole('status')).toBeVisible();
});
