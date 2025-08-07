const { test, expect } = require('@playwright/test');
const { login } = require('../../helpers/loginHelper');
const { addToCart } = require('../../helpers/cartHelper');
const { selectCountry } = require('../../helpers/checkoutHelper');
const { verifyOrderInHistory } = require('../../helpers/orderHelper');

test('TC5: Confirm order and verify order history', async ({ page }) => {
  const email = "kalra.sneha243@gmail.com";
  const password = "Playwright11!";
  const productName = "ADIDAS ORIGINAL";

  await page.goto("https://rahulshettyacademy.com/client");
  await login(page, email, password);
  await page.waitForLoadState('networkidle');

  await addToCart(page, productName);

  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();

  await page.locator("text=Checkout").click();
  await selectCountry(page, "India");

  await expect(page.locator(".user__name input").first()).toHaveValue(email);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log("Order ID:", orderID);

  await verifyOrderInHistory(page, orderID);
});
