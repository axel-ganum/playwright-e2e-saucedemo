import { expect } from '@playwright/test';
import { test } from '../fixtures/testBase';

import { loginAndOpenInventory } from '../utils/flows';

import { CartPage } from '../pages/CartPage';

test.describe('Cart', () => {

  test('producto agregado aparece en el carrito', async ({ page }) => {
    const inventoryPage = await loginAndOpenInventory(page);

    const cartPage = new CartPage(page);

    await inventoryPage.addItemToCartByName('sauce-labs-backpack');

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart/);

    await cartPage.expectItemCount(1);
  });

  test('producto agregado tiene nombre correcto en el carrito', async ({ page }) => {
    const inventoryPage = await loginAndOpenInventory(page);

    const cartPage = new CartPage(page);

    await inventoryPage.addItemToCartByName('sauce-labs-backpack');

    await inventoryPage.openCart();

    await cartPage.expectItemNameVisible('Sauce Labs Backpack');
  });

  test('usuario elimina producto del carrito', async ({ page }) => {
    const inventoryPage = await loginAndOpenInventory(page);

    const cartPage = new CartPage(page);

    await inventoryPage.addItemToCartByName('sauce-labs-backpack');

    await inventoryPage.openCart();

    await cartPage.removeFirstItem();

    await cartPage.expectItemCount(0);
  });

  test('usuario vuelve a inventory desde carrito', async ({ page }) => {
    const inventoryPage = await loginAndOpenInventory(page);

    const cartPage = new CartPage(page);

    await inventoryPage.addItemToCartByName('sauce-labs-backpack');

    await inventoryPage.openCart();

    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory/);

    await expect(inventoryPage.getItems().first()).toBeVisible();
  });

});
