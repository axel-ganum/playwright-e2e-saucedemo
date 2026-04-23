import { expect } from "@playwright/test";
import { test } from "../fixtures/testBase";
import { InventoryPage } from "../pages/InventoryPage";

test('usuario ve productos del login', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.expectItemsVisible();
});

test('usuario agrega producto al carrito', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);

  await inventoryPage.addFirstItemToCart();
  await expect(inventoryPage.getCartBadge()).toHaveText('1');
});

test('boton cambia a remove al agregar producto', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);

  const button = inventoryPage.getFirstItemButton();
  await button.click();

  await expect(button).toHaveText('Remove');
});
test('usuario agrega multiples productos al carrito', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);

  await inventoryPage.addItemToCartByName('sauce-labs-backpack');
  await inventoryPage.addItemToCartByName('sauce-labs-bike-light');

  await expect(inventoryPage.getCartBadge()).toHaveText('2');
});

test('producto tiene nombre y precio', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);

  const firstItem = inventoryPage.getItems().first();

  await expect(firstItem.locator('.inventory_item_name')).toBeVisible();
  await expect(firstItem.locator('.inventory_item_price')).toBeVisible();
});

test('producto agregado aparece en el carrito', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);

  await inventoryPage.addFirstItemToCart();
  await inventoryPage.openCart();

  await expect(page.locator('.cart_item')).toHaveCount(1);
});