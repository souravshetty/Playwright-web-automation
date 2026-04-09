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

test("Add to cart", async ({ page }) => {
	const email = "anshika@gmail.com";
	await page.goto("https://rahulshettyacademy.com/client");
	await page.locator("#userEmail").fill(email);
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
			//locator using test
			await productBox.nth(i).locator("text= Add To Cart").click();
			break;
		}
	}
	await page.locator("[routerlink*='cart']").click();
	//wait till the cart page is loaded through li
	await page.locator("div li").first().waitFor();

	const bol = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
	expect(bol).toBeTruthy();
	await page.locator("text=Checkout").click();
	await page.locator("div.field.small input.txt").first().waitFor();
	await page.locator("div.field.small input.txt").first().fill("234");
	await page
		.locator("div.title:has-text('Name on Card') +input")
		.fill("anshika");
	await page
		.locator("[placeholder*='Country']")
		.pressSequentially("Ind", { delay: 100 });
	const dropdown = await page.locator(".ta-results");
	await dropdown.waitFor();
	const optionCount = await dropdown.locator("button").count();
	for (let i = 0; i < optionCount; i++) {
		const text = await dropdown.locator("[type='button']").nth(i).textContent();
		console.log(text);
		if (text.trim() === "India") {
			await dropdown.locator("button").nth(i).click();
			break;
		}
	}
	await expect(page.locator(".user__name [type='text']").first()).toHaveText(
		email,
	);
	await page.locator(".btnn").click();
	await expect(page.locator(".hero-primary")).toHaveText(
		" Thankyou for the order. ",
	);
	const orderId = await page
		.locator(".em-spacer-1 .ng-star-inserted")
		.textContent();
	console.log(orderId);
	await page.locator("button[routerlink*= 'myorders']").click();
	await page.waitForSelector("tbody tr");
	const tableCount = await page.locator("tbody tr").count();
	console.log(tableCount);
	// await page.pause();

	for (let i = 0; i < tableCount; i++) {
		const id = await page.locator("tbody tr th").nth(i).textContent();
		console.log(id);
		console.log(id?.length, orderId?.length);

		if (orderId.includes(id)) {
			console.log("order id is present in the table");
			await page
				.locator("tbody tr")
				.nth(i)
				.locator("td button")
				.first()
				.click();
		
			break;
		}
	}
});
