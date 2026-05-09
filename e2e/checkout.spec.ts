import { test } from '../fixtures/testBase';
import { goToCheckout } from '../utils/flows';

import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Checkout', () => {

  test('usuario inicia checkout', async ({ page }) => {
    await goToCheckout(page);

    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.expectOnCheckoutStepOne();
  });

  test('usuario completa datos y continua al overview', async ({ page }) => {
    await goToCheckout(page);

    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
    await checkoutPage.continue();

    await checkoutPage.expectOnCheckoutOverview();
  });

  test('usuario finaliza compra con exito', async ({ page }) => {
    await goToCheckout(page);

    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
    await checkoutPage.continue();

    await checkoutPage.expectOnCheckoutOverview();

    await checkoutPage.finish();

    await checkoutPage.expectSuccessMessage();
  });

  test('error si falta first name', async ({ page }) => {
    await goToCheckout(page);

    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillCheckoutForm('', 'Doe', '12345');
    await checkoutPage.continue();

    await checkoutPage.expectErrorMessage('Error: First Name is required');
  });

  test('error si falta last name', async ({ page }) => {
    await goToCheckout(page);

    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillCheckoutForm('John', '', '12345');
    await checkoutPage.continue();

    await checkoutPage.expectErrorMessage('Error: Last Name is required');
  });

  test('error si falta postal code', async ({ page }) => {
    await goToCheckout(page);

    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillCheckoutForm('John', 'Doe', '');
    await checkoutPage.continue();

    await checkoutPage.expectErrorMessage('Error: Postal Code is required');
  });

  test('producto aparece en checkout overview', async ({ page }) => {
    await goToCheckout(page);

    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    const productName = await inventoryPage
      .getFirstProductName()
      .innerText();

    await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
    await checkoutPage.continue();

    await checkoutPage.expectOnCheckoutOverview();

    await checkoutPage.expectProductInOverview(productName);
  });

  test('usuario cancela checkout y vuelve al carrito', async ({ page }) => {
    await goToCheckout(page);

    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.cancel();

    await cartPage.expectOnCartPage();
  });

  test('usuario completa compra end to end', async ({ page }) => {
    await goToCheckout(page);

    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
    await checkoutPage.continue();

    await checkoutPage.finish();

    await checkoutPage.expectSuccessMessage();
  });

});