import {expect, Page} from "@playwright/test";

export class LoginPage {
    esperarUrl(arg0: RegExp) {
        throw new Error('Method not implemented.');
    }
    private page : Page;

    constructor(page: Page) {
        this.page = page
    }
      
        async goto() {
            await this.page.goto('https://www.saucedemo.com/')
        }

        async login(username: string, password: string) {
            await this.page.locator('#user-name').fill(username)
            await this.page.locator('#password').fill(password)
            await this.page.locator('#login-button').click()
        }

        async  expectLoginSuccess(url: string | RegExp) {
             await expect(this.page).toHaveURL(url);
        }

        async esperarError(mensaje: string) {
            const error = this.page.locator('[data-test="error"]');
            await expect(error).toBeVisible();
            await expect(error).toContainText(mensaje);
        }
}