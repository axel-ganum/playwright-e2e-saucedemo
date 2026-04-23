import { Page, expect } from "@playwright/test";

export class InventoryPage {
    getCartBadge(): any {
        throw new Error("Method not implemented.");
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
  await this.page.locator('.inventory_item button').first().click();
}
 
    async openCart() {
        await this.page.locator('.shopping_cart_link').click();
    }

    getFirstItemButton() {
        return this.page.locator('.inventory_item button').first();
    }

    async addItemToCartByName(name: string) {
        await this.page.locator(`[data-test="add-to-cart-${name}"]`).click();
    }

}