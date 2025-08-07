const { test, expect } = require('@playwright/test');

test('TC1: Invalid Login should show error message', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator('#userEmail').fill("kalra.sneha243@gmail.com");
  await page.locator('#userPassword').fill("Playwright11"); // incorrect
  await page.locator("#login").click();

  const toast = page.locator("div[role='alert']"); // ⬅️ precise toast locator
  await toast.waitFor(); // wait until it's visible

  const errorText = await toast.textContent();
  console.log("Error Message:", errorText);

  await expect(errorText).toContain('Incorrect email or password.');
});