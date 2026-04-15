const { test, expect } = require("@playwright/test");

test("First Playwright test", async ({ page }) => {
	// await page.goto("https://rahulshettyacademy.com/client")
	// await page.locator(".login-wrapper-footer-text .text-reset").click();
	// await page.locator(".form-group #firstName").waitFor();
	// await page.locator(".form-group #firstName").fill("shetty")
	const email = "anshika@gmail.com";
	const productName = "zara coat 3";
	const products = page.locator(".card-body");
	await page.goto("https://rahulshettyacademy.com/client");
	await page.locator("#userEmail").fill(email);
	await page.locator("#userPassword").type("Iamking@000");
	await page.locator("[value='Login']").click();
	await page.waitForLoadState("networkidle");
	await page.locator(".card-body b").first().waitFor();
	const titles = await page.locator(".card-body b").allTextContents();
	console.log(titles);
});

test.only("Add to cart", async ({ page }) => {
	await page.goto("https://rahulshettyacademy.com/client");
	await page.locator("#userEmail").fill("anshika@gmail.com");
	await page.locator("#userPassword").fill("Iamking@000");
	const productBox = await page.locator(".card-body");
	const productName = "ZARA COAT 3";
	await page.locator("[value='Login']").click();
	await page.locator(".card-body b").first().waitFor();
	const products = await page.locator(".card-body b").allTextContents();
	console.log(products);
	const count = await productBox.count();
	for (let i = 0; i < count; i++) {
		if ((await productBox.nth(i).locator("b").textContent()) === productName) {
			await productBox.nth(i).locator("text= Add To Cart").click();
			break;
		}
	}
   await page.locator("[routerlink*='cart']").click();
});
