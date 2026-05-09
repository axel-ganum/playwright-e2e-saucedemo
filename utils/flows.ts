import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LogingPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';


export async function loginAndOpenInventory(page: Page) {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  return new InventoryPage(page);
}





export async function goToCheckout(page: Page) {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addFirstItemToCart();
  await inventoryPage.openCart();

  await cartPage.startCheckout();
}