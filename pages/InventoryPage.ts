import { Page, expect } from "@playwright/test";

export class InventoryPage {
 getFirstProductName() {
  return this.page.locator('.inventory_item_name').first();
}
   getCartBadge() {
    return this.page.locator('.shopping_cart_badge');
}
    addToCartButtons: any;
    static addFirstItemToCart() {
        throw new Error("Method not implemented.");
    }
    goToCart() {
        throw new Error("Method not implemented.");
    }
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

         getItems( )   {
        return this.page.locator('.inventory_item');
    }

    async expectItemsVisible() {
        const count = await this.getItems().count();
        expect(count).toBeGreaterThan(0)
    }
async addFirstItemToCart() {
  const button = this.page.locator('.inventory_item button').first();
  await expect(button).toBeVisible();
  await button.click();
}
 
    async openCart() {
        await this.page.locator('.shopping_cart_link').click();
    }

    getFirstItemButton() {
        return this.page.locator('.inventory_item button').first();
    }

    async addItemToCartByName(name: string) {

        const button = this.page.locator(`[data-test="add-to-cart-${name}"]`);


        await expect(button).toBeVisible();     
        await button.click();
    }

}