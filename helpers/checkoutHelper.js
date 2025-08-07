async function selectCountry(page, country = "India") {
  await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 });

  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();

  const options = dropdown.locator("button");
  const countOptions = await options.count();

  for (let i = 0; i < countOptions; i++) {
    const text = await options.nth(i).textContent();
    if (text.trim() === country) {
      await options.nth(i).click();
      console.log(`Country "${country}" selected`);
      return;
    }
  }

  throw new Error(`Country "${country}" not found in dropdown`);
}

module.exports = { selectCountry };