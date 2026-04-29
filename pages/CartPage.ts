import { Page, expect } from "@playwright/test";

export class CartPage {


   constructor(private page: Page) {}
 
 async startCheckout() {
        await this.page.locator('[data-test="checkout"]').click();      
    }

   getCartItems() {
      return this.page.locator('.cart_item');
   }

   getItemName() {
      return this.page.locator('.inventory_item_name');
   }

   getRemoveButton() {
      return this.page.locator('.cart_item button:has-text("Remove")');
   }

   async removeFirstItem() {
      await this.getRemoveButton().first().click();
   }

   async expectItemCount(count: number) {
      await expect(this.getCartItems()).toHaveCount(count);
   }

   async expectItemNameVisible(name: string) {
      await expect(this.page.locator('.inventory_item_name', { hasText: name })).toBeVisible();
   }

   async expectOnCartPage() {
      await expect(this.page).toHaveURL(/cart/);
   }

   getContinueShoppingButton() {
      return this.page.locator('#continue-shopping');
   }

   async continueShopping() {
      await this.getContinueShoppingButton().click();
   }



}