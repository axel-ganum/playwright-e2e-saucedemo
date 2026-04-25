import { expect } from "@playwright/test";
import { test } from "../fixtures/testBase";
import { CartPage } from "../pages/CartPage";
import { InventoryPage } from "../pages/InventoryPage";



test('priducto agregado aparece en el carrito', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('standard_user ', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  
    await inventoryPage.addItemToCartByName('sauce-labs-backpack');
    await inventoryPage.openCart();

    await cartPage.expectItemCount(1);
  
});


test('producto agregado tiene nombre correcto en el carrito', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('standard_user ', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  
    await inventoryPage.addItemToCartByName('sauce-labs-backpack');
    await inventoryPage.openCart();

    await cartPage.expectItemNameVisible('Sauce Labs Backpack');
  
}); 

test('usuario elimina producto del carrito', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('standard_user ', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  
    await inventoryPage.addItemToCartByName('sauce-labs-backpack');
    await inventoryPage.openCart();

    await cartPage.removeFirstItem();
    await cartPage.expectItemCount(0);
  
});

test('usuario vuelve a inventory desde carrito', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('standard_user ', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  
    await inventoryPage.addItemToCartByName('sauce-labs-backpack');
    await inventoryPage.openCart();

    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory/);
   await expect(inventoryPage.getItems().first()).toBeVisible();
});
