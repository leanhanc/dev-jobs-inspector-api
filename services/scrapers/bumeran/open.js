const {
  BUMERAN_URL,
  BUMERAN_FIRST_SELECTOR_TO_WAIT_FOR
} = require('../../config');
const { puppetPageConfig } = require('../../config');

/* Abrir Bumeran y esperar selector */

const open = async browser => {
  const page = await browser.newPage();
  await puppetPageConfig(page);
  await page.goto(BUMERAN_URL);
  await page.waitForSelector(BUMERAN_FIRST_SELECTOR_TO_WAIT_FOR);
  return { browser, page };
};

module.exports = open;
