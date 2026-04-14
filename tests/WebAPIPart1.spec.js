// const { test, expect, request } = require("@playwright/test");
// const { APIUtils } = require("./utils/APIUtils");
// const loginPayload = {
// 	userEmail: "souravdummy18@gmail.com",
// 	userPassword: "Test@123",
// };
// const orderPayload = {
// 	country: "Cuba",
// 	productOrderedId: "6960eac0c941646b7a8b3e68",
// };
// let orderId;
// let token;
// let respones;
// test.beforeAll(async () => {
// 	const apiContext = await request.newContext();
// 	const apiUtils = new APIUtils(apiContext, loginPayload);
// 	respones = await apiUtils.createOrder(orderPayload);

// });
// //it will search for the order id through api and then it will match hhat with orders
// test("Add to cart", async ({ page }) => {

// 	// const email = "anshika@gmail.com";
// 	// await page.goto("https://rahulshettyacademy.com/client");
// 	// await page.locator("#userEmail").fill(email);
// 	// await page.locator("#userPassword").fill("Iamking@000");
// 	page.addInitScript((value) => {
// 		window.localStorage.setItem("token", value);
// 	}, respones.token);
// 	// const productBox = await page.locator(".card-body");
// 	const productName = "ZARA COAT 3";
// 	await page.goto("https://rahulshettyacademy.com/client");
// 	// await page.locator("[value='Login']").click();
// 	// await page.locator(".card-body b").first().waitFor();
// 	// const products = await page.locator(".card-body b").allTextContents();
// 	// console.log(products);
// 	// const count = await productBox.count();
// 	// for (let i = 0; i < count; i++) {
// 	// 	if ((await productBox.nth(i).locator("b").textContent()) === productName) {
// 	// 		//locator using test
// 	// 		await productBox.nth(i).locator("text= Add To Cart").click();
// 	// 		break;
// 	// 	}
// 	// }
// 	// await page.locator("[routerlink*='cart']").click();
// 	// //wait till the cart page is loaded through li
// 	// await page.locator("div li").first().waitFor();

// 	// const bol = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
// 	// expect(bol).toBeTruthy();
// 	// await page.locator("text=Checkout").click();
// 	// await page.locator("div.field.small input.txt").first().waitFor();
// 	// await page.locator("div.field.small input.txt").first().fill("234");
// 	// await page
// 	// 	.locator("div.title:has-text('Name on Card') +input")
// 	// 	.fill("anshika");
// 	// await page
// 	// 	.locator("[placeholder*='Country']")
// 	// 	.pressSequentially("Ind", { delay: 100 });
// 	// const dropdown = await page.locator(".ta-results");
// 	// await dropdown.waitFor();
// 	// const optionCount = await dropdown.locator("button").count();
// 	// for (let i = 0; i < optionCount; i++) {
// 	// 	const text = await dropdown.locator("[type='button']").nth(i).textContent();
// 	// 	console.log(text);
// 	// 	if (text.trim() === "India") {
// 	// 		await dropdown.locator("button").nth(i).click();
// 	// 		break;
// 	// 	}
// 	// }
// 	// await expect(page.locator(".user__name [type='text']").first()).toHaveText(
// 	// 	email,
// 	// );
// 	// await page.locator(".btnn").click();
// 	// await expect(page.locator(".hero-primary")).toHaveText(
// 	// 	" Thankyou for the order. ",
// 	// );
// 	// const orderId = await page
// 	// 	.locator(".em-spacer-1 .ng-star-inserted")
// 	// 	.textContent();
// 	// console.log(orderId);
// 	await page.locator("button[routerlink*= 'myorders']").click();
// 	await page.waitForSelector("tbody tr");
// 	const tableCount = await page.locator("tbody tr").count();
// 	console.log(tableCount);
// 	// await page.pause();

// 	for (let i = 0; i < tableCount; i++) {
// 		const id = await page.locator("tbody tr th").nth(i).textContent();
// 		console.log(id);
// 		console.log(id?.length, orderId?.length);

// 		if (respones.orderId.includes(id)) {
// 			console.log("order id is present in the table");
// 			await page
// 				.locator("tbody tr")
// 				.nth(i)
// 				.locator("td button")
// 				.first()
// 				.click();

// 			break;
// 		}
// 	}
//     const orderDetails = await page.locator(".col-text").TextContent();

// });
const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./utils/APiUtils");
const loginPayLoad = {
	userEmail: "anshika@gmail.com",
	userPassword: "Iamking@000",
};
const orderPayLoad = {
	orders: [{ country: "Cuba", productOrderedId: "69f11838f86ba51a65906ef2" }],
};

let response;
test.beforeAll(async () => {
	const apiContext = await request.newContext();
	const apiUtils = new APIUtils(apiContext, loginPayLoad);
	response = await apiUtils.createOrder(orderPayLoad);
});

//create order is success
test("@API Place the order", async ({ page }) => {
	await page.addInitScript((value) => {
		window.localStorage.setItem("token", value);
	}, response.token);
	await page.goto("https://rahulshettyacademy.com/client");
	await page.locator("button[routerlink*='myorders']").click();
	await page.locator("tbody").waitFor();
	const rows = await page.locator("tbody tr");

	for (let i = 0; i < (await rows.count()); ++i) {
		const rowOrderId = await rows.nth(i).locator("th").textContent();
		if (response.orderId.includes(rowOrderId)) {
			await rows.nth(i).locator("button").first().click();
			break;
		}
	}
	const orderIdDetails = await page.locator(".col-text").textContent();
	//await page.pause();
	expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});

//Verify if order created is showing in history page
// Precondition - create order -
