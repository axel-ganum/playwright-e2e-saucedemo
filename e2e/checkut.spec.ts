import {test} from '../fixtures/testBase';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/ChackoutPage';
import { InventoryPage } from '../pages/InventoryPage';

test('usario inicia checout', async({loginPage, page}) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce  '); 

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.addFirstItemToCart();
  await inventoryPage.openCart();

  await cartPage.startCheckout();
  await checkoutPage.expectOnCheckoutStepOne();
})