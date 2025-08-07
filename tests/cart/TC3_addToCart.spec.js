const { test, expect } = require('@playwright/test');
const { login } = require('../../helpers/loginHelper');

test('TC3: Add product to cart and verify', async ({ page }) => {
  const email = "kalra.sneha243@gmail.com";
  const password = "Playwright11!";
  const productName = 'ADIDAS ORIGINAL';

  await page.goto("https://rahulshettyacademy.com/client");
  await login(page, email, password);
  await page.waitForLoadState('networkidle');

  const products = page.locator(".card-body");
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if (await products.nth(i).locator("b").textContent() === productName) {
      await products.nth(i).locator("text=Add To Cart").click();
      console.log("Product added to cart:", productName);
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();

  const isVisible = await page.locator(`h3:has-text("${productName}")`).isVisible();
  expect(isVisible).toBeTruthy();
});
