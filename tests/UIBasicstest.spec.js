const { test, expect } = require("@playwright/test");

test("First Playwright test", async ({ browser }) => {
	const context = await browser.newContext();
	const page = await context.newPage();
	const userName = page.locator("#username");
	const signIn = page.locator("#signInBtn");
	const cardTitles = page.locator(".card-body a");
	await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
	console.log(await page.title());
	await userName.fill("learning");
	await page.locator("[name='password']").fill("hey");
	await signIn.click();
	await expect(page.locator("[style*='block']")).toContainText("Incorrect");

	await userName.fill("");
	await page.locator("[name='password']").fill("");
	await userName.fill("rahulshettyacademy");
	await page.locator("[name='password']").fill("Learning@830$3mK2");
	await signIn.click();
	console.log(await cardTitles.nth(0).textContent());
	const allTitles = await cardTitles.allTextContents();
	console.log(allTitles);
});

// test("page playwright test", async ({ page }) => {
// 	await page.goto("https://google.com");
// 	await expect(page).toHaveTitle("Google");
// });

test("UI controls", async ({ page }) => {
	await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
	const userName = page.locator("#username");
	const signIn = page.locator("[href*='documents-request']");
	const documentLink = page.locator("[href*='documents-request']");
	const dropDown = page.locator("select.form-control");
	await dropDown.selectOption("consult");
	await page.locator(".radiotextsty").last().click();
	await page.locator("#okayBtn").click();
	await expect(page.locator(".radiotextsty").last()).toBeChecked();
	await page.locator("#terms").click();
	await expect(page.locator("#terms")).toBeChecked();
	await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test("Child window handler", async ({ browser }) => {
	const context = await browser.newContext();
	const page = await context.newPage();

	await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
	const documentLink = page.locator("[href*='documents-request']");
	const [newPage] = await Promise.all([
		context.waitForEvent("page"),
		documentLink.click(),
	]);
	const text = await newPage.locator(".red").textContent();
	console.log(text);
	const arrayText = text.split("@");
	const domain = arrayText[1].split(" ")[0];
	console.log(domain);
	await page.locator("#username").fill(domain);
	// console.log(await page.locator("#username").textContent());
	console.log(await page.locator("#username").inputValue());
	
});
