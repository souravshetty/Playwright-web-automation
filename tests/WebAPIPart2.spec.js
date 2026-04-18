const { test, expect, request } = require("@playwright/test");

test.beforeAll(async ({ browser }) => {
	const Context = await browser.newContext();
	const page = await Context.newPage();
	const products = page.locator(".card-body");
	const email = "anshika@gmail.com";
	await page.goto("https://rahulshettyacademy.com/client");
	await page.locator("#userEmail").fill(email);
	await page.locator("#userPassword").type("Iamking@000");
	await page.locator("[value='Login']").click();
	await page.waitForLoadState("networkidle");
	await Context.storageState({ path: "state.json" });
});
test("First Playwright test", async ({ page }) => {
	// await page.goto("https://rahulshettyacademy.com/client")
	// await page.locator(".login-wrapper-footer-text .text-reset").click();
	// await page.locator(".form-group #firstName").waitFor();
	// await page.locator(".form-group #firstName").fill("shetty")
    const products = page.locator(".card-body");

	const productName = "zara coat 3";

	await page.locator(".card-body b").first().waitFor();
	const titles = await page.locator(".card-body b").allTextContents();
	console.log(titles);
});
