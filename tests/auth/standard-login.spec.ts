import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import users from '../data/users.json';

test.describe('Standard user login', () => {
  test('lands on inventory after successful login @smoke @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open the login page', async () => {
      await loginPage.goto();
    });

    await test.step('Log in with the standard user', async () => {
      const inventoryPage = await loginPage.loginAs(users.standard);

      await test.step('Verify inventory page', async () => {
        await expect(page).toHaveURL(/\/inventory\.html$/);
        await expect(inventoryPage.pageHeading).toBeVisible();
        await expect(inventoryPage.inventoryItems).toHaveCount(6);
      });
    });
  });
});
