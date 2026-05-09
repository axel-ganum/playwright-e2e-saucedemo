import { test } from '../fixtures/testBase';
import { expect } from '@playwright/test';
import { loginAndOpenInventory } from '../utils/flows';

test.describe('Inventory', () => {

  test('usuario ve productos del login', async ({ page }) => {
    const inventoryPage = await loginAndOpenInventory(page);

    await inventoryPage.expectItemsVisible();
  });

  test('usuario agrega producto al carrito', async ({ page }) => {
    const inventoryPage = await loginAndOpenInventory(page);

    await inventoryPage.addFirstItemToCart();

    await expect(inventoryPage.getCartBadge()).toHaveText('1');
  });

  test('boton cambia a remove al agregar producto', async ({ page }) => {
    const inventoryPage = await loginAndOpenInventory(page);

    const button = inventoryPage.getFirstItemButton();

    await button.click();

    await expect(button).toHaveText('Remove');
  });

  test('usuario agrega multiples productos al carrito', async ({ page }) => {
    const inventoryPage = await loginAndOpenInventory(page);

    await inventoryPage.addItemToCartByName('sauce-labs-backpack');
    await inventoryPage.addItemToCartByName('sauce-labs-bike-light');

    await expect(inventoryPage.getCartBadge()).toHaveText('2');
  });

  test('producto tiene nombre y precio', async ({ page }) => {
    const inventoryPage = await loginAndOpenInventory(page);

    const firstItem = inventoryPage.getItems().first();

    await expect(firstItem.locator('.inventory_item_name')).toBeVisible();
    await expect(firstItem.locator('.inventory_item_price')).toBeVisible();
  });

});