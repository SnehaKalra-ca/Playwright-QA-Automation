const { expect } = require('@playwright/test');

async function verifyOrderInHistory(page, orderID) {
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();

  const rows = await page.locator("tbody tr");

  for (let i = 0; i < await rows.count(); i++) {
    const rowOrderID = await rows.nth(i).locator("th").textContent();
    if (orderID.includes(rowOrderID)) {
      await rows.nth(i).locator("button").first().click();
      const orderIdDetails = await page.locator(".col-text").textContent();
      expect(orderID.includes(orderIdDetails)).toBeTruthy();
      console.log(`Order ID matched: ${orderID}`);
      return;
    }
  }

  throw new Error(`Order ID not found in order history: ${orderID}`);
}

module.exports = { verifyOrderInHistory };