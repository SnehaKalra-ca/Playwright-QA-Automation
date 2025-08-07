// playwright.config.js
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure'
  }
};

module.exports = config;
