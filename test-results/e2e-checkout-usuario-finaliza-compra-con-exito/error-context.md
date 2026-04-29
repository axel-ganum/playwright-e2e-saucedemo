# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/checkout.spec.ts >> usuario finaliza compra con exito
- Location: e2e/checkout.spec.ts:39:6

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.complete-header')
Expected: "THANK YOU FOR YOUR ORDER"
Received: "Thank you for your order!"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('.complete-header')
    9 × locator resolved to <h2 class="complete-header" data-test="complete-header">Thank you for your order!</h2>
      - unexpected value "Thank you for your order!"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
      - generic [ref=e15]: "Checkout: Complete!"
    - generic [ref=e16]:
      - img "Pony Express" [ref=e17]
      - heading "Thank you for your order!" [level=2] [ref=e18]
      - generic [ref=e19]: Your order has been dispatched, and will arrive just as fast as the pony can get there!
      - button "Back Home" [ref=e20] [cursor=pointer]
  - contentinfo [ref=e21]:
    - list [ref=e22]:
      - listitem [ref=e23]:
        - link "Twitter" [ref=e24] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e25]:
        - link "Facebook" [ref=e26] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e27]:
        - link "LinkedIn" [ref=e28] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e29]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import {Page, expect} from "@playwright/test";
  2  | 
  3  | export class CheckoutPage {
  4  |    
  5  |     expectProductInOverview: any;
  6  |     constructor(private page: Page) {}
  7  | 
  8  |    
  9  |     async continue() {
  10 |         await this.page.locator('[data-test="continue"]').click();
  11 |     }
  12 | 
  13 |     async finish() {
  14 |         await this.page.locator('[data-test="finish"]').click();
  15 |     }
  16 | 
  17 |      async cancel() {
  18 |     await this.page.locator('[data-test="cancel"]').click();
  19 |   }
  20 | 
  21 | 
  22 |     async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
  23 |         await this.page.locator('[data-test="firstName"]').fill(firstName);
  24 |         await this.page.locator('[data-test="lastName"]').fill(lastName);
  25 |         await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  26 |     }
  27 | 
  28 |     async expectOnCheckoutStepOne() {
  29 |         await expect(this.page).toHaveURL(/.*checkout-step-one/);   
  30 |     }
  31 | 
  32 |     async expectOnCheckoutOverview() {
  33 |         await expect(this.page).toHaveURL(/.*checkout-step-two/);   
  34 |     }
  35 | 
  36 |     async expectSuccessMessage() {
  37 |         const successMessage = this.page.locator('.complete-header');
  38 |         await expect(successMessage).toBeVisible();
> 39 |         await expect(successMessage).toHaveText('THANK YOU FOR YOUR ORDER');
     |                                      ^ Error: expect(locator).toHaveText(expected) failed
  40 |     }
  41 | 
  42 |     async expectErrorMessage(mensaje: string) {
  43 |         const error = this.page.locator('[data-test="error"]');
  44 |         await expect(error).toBeVisible();
  45 |         await expect(error).toContainText(mensaje);
  46 |     }   
  47 | 
  48 |     async expectItemVisible(name: string) {
  49 |         const item = this.page.locator('.inventory_item_name', { hasText: name });
  50 |         await expect(item).toBeVisible();
  51 |     }
  52 | 
  53 | }
```