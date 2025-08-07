const { test, expect } = require('@playwright/test');
const { login } = require('../../helpers/loginHelper');

test('TC4: Checkout after reviewing cart', async ({ page }) => {
  const email = "kalra.sneha243@gmail.com";
  const password = "Playwright11!";
  const productName = "ADIDAS ORIGINAL";

  await page.goto("https://rahulshettyacademy.com/client");
  await login(page, email, password);
  await page.waitForLoadState('networkidle');

  // Add product to cart
  const products = page.locator(".card-body");
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    if (await products.nth(i).locator("b").textContent() === productName) {
      await products.nth(i).locator("text=Add To Cart").click();
      break;
    }
  }

  // Navigate to Cart
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();

  // Proceed to Checkout
  await page.locator("text=Checkout").click();
  await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 });

  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();

  const options = dropdown.locator("button");
  const countOptions = await options.count();
  for (let i = 0; i < countOptions; i++) {
    const text = await options.nth(i).textContent();
    if (text.trim() === "India") {
      await options.nth(i).click();
      break;
    }
  }

  // Validate email auto-filled
  await expect(page.locator(".user__name input").first()).toHaveValue(email);



});
