const { expect } = require('@playwright/test');

async function addToCart(page, productName) {
  const products = page.locator(".card-body");
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const title = await products.nth(i).locator("b").textContent();
    if (title === productName) {
      await products.nth(i).locator("text=Add To Cart").click();
      console.log(`Product "${productName}" added to cart`);
      return;
    }
  }

  throw new Error(`Product "${productName}" not found`);
}

module.exports = { addToCart };
