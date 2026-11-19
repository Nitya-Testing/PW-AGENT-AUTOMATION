import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly pageHeading: import('@playwright/test').Locator;
  readonly inventoryItems: import('@playwright/test').Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByText('Products', { exact: true });
    this.inventoryItems = page.getByRole('button', { name: 'Add to cart' });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }
}
