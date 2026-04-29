import {test} from '../fixtures/testBase';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/ChackoutPage';
import { InventoryPage } from '../pages/InventoryPage';

test('usario inicia checkout', async({loginPage, page}) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce'); 

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.addFirstItemToCart();
  await inventoryPage.openCart();

  await cartPage.startCheckout();
  await checkoutPage.expectOnCheckoutStepOne();
})

test('usuario completa datos y continua al overview', async({loginPage, page}) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

 const inventoryPage = new InventoryPage(page);
 const cartPage = new CartPage(page);
 const checkoutPage = new CheckoutPage(page);

 await inventoryPage.addFirstItemToCart();
 await inventoryPage.openCart();

 await cartPage.startCheckout();
 await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
 await checkoutPage.continue();
 
 await checkoutPage.expectOnCheckoutOverview();
 });

 test('usuario finaliza compra con exito', async({loginPage, page}) => {
   await loginPage.goto();
   await loginPage.login('standard_user', 'secret_sauce');

   const inventoryPage = new InventoryPage(page);
   const cartPage = new CartPage(page);
   const checkoutPage = new CheckoutPage(page);

   await inventoryPage.addFirstItemToCart();
   await inventoryPage.openCart();

   await cartPage.startCheckout();
   await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
   await checkoutPage.continue();

   await checkoutPage.expectOnCheckoutOverview();

   await checkoutPage.finish();
   await checkoutPage.expectSuccessMessage();
 });

 test('error si falta first name', async({loginPage, page}) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.addFirstItemToCart();
  await inventoryPage.openCart();

  await cartPage.startCheckout();
  await checkoutPage.fillCheckoutForm('', 'Doe', '12345');
  await checkoutPage.continue();

  await checkoutPage.expectErrorMessage('Error: First Name is required');
});

test('error si falta last name', async({loginPage, page}) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.addFirstItemToCart();
  await inventoryPage.openCart();

  await cartPage.startCheckout();
  await checkoutPage.fillCheckoutForm('John', '', '12345');
  await checkoutPage.continue();

  await checkoutPage.expectErrorMessage('Error: Last Name is required');
});

test('error si falta postal code', async({loginPage, page}) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.addFirstItemToCart();
  await inventoryPage.openCart();

  await cartPage.startCheckout();
  await checkoutPage.fillCheckoutForm('John', 'Doe', '');
  await checkoutPage.continue();

  await checkoutPage.expectErrorMessage('Error: Postal Code is required');
}); 

test('producto aparece en checkout overview', async({loginPage, page}) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.addFirstItemToCart();
  await inventoryPage.openCart();

  await cartPage.startCheckout();
  await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
  await checkoutPage.continue();

  const productName = await inventoryPage.getFirstProductName();
  await checkoutPage.expectProductInOverview(productName);
});

test('usuario cancela checkout y vuelve al carrito', async({loginPage, page}) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page); 

  await inventoryPage.addFirstItemToCart();
  await inventoryPage.openCart();

  await cartPage.startCheckout();
  await checkoutPage.cancel();

  await cartPage.expectOnCartPage();
}); 

test('usuario completa compra end to end', async({loginPage, page}) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.addFirstItemToCart();
  await inventoryPage.openCart();

  await cartPage.startCheckout();
  await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
  await checkoutPage.continue();
  await checkoutPage.finish();

  await checkoutPage.expectSuccessMessage();
}); 