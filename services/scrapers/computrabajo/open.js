const {
  COMPUTRABAJO_URL,
  COMPUTRABAJO_FIRST_SELECTOR_TO_WAIT_FOR
} = require('../../config');
const { puppetPageConfig } = require('../../config');

/* Abrir Computrabajo y esperar selector */

const open = async browser => {
  const page = await browser.newPage();
  await puppetPageConfig(page);
  await page.goto(COMPUTRABAJO_URL);
  await page.waitForSelector(COMPUTRABAJO_FIRST_SELECTOR_TO_WAIT_FOR);
  return { browser, page };
};

module.exports = open;
