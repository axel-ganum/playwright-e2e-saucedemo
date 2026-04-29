import {Page, expect} from "@playwright/test";

export class CheckoutPage {

    constructor(private page: Page) {}


    
  async expectOnCartPage() {
    await expect(this.page).toHaveURL(/cart/);
  }

  getFirstProductName() {
    return this.page.locator('.cart_item .inventory_item_name').first();
  }
    async continue() {
        await this.page.locator('[data-test="continue"]').click();
    }

    async finish() {
        await this.page.locator('[data-test="finish"]').click();
    }

     async cancel() {
    await this.page.locator('[data-test="cancel"]').click();
  }

   
    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator('[data-test="firstName"]').fill(firstName);
        await this.page.locator('[data-test="lastName"]').fill(lastName);
        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    }

    async expectOnCheckoutStepOne() {
        await expect(this.page).toHaveURL(/.*checkout-step-one/);   
    }

    async expectOnCheckoutOverview() {
        await expect(this.page).toHaveURL(/.*checkout-step-two/);   
    }

    async expectSuccessMessage() {
        const successMessage = this.page.locator('.complete-header');
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toHaveText(/thank you for your order/i);
    }

    async expectErrorMessage(mensaje: string) {
        const error = this.page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toContainText(mensaje);
    }   

    async expectItemVisible(name: string) {
        const item = this.page.locator('.inventory_item_name', { hasText: name });
        await expect(item).toBeVisible();
    }

}