const { test, expect } = require('@playwright/test');
const { login } = require('../../helpers/loginHelper');

test('TC2: Valid Login and verify product listing', async ({ page }) => {
  const email = "kalra.sneha243@gmail.com";
  const password = "Playwright11!";

  await page.goto("https://rahulshettyacademy.com/client");
  await login(page, email, password);

  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();

  const titles = await page.locator(".card-body").allTextContents();
  console.log("Products:", titles);
});
