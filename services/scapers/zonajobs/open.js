const {
  ZONAJOBS_URL,
  ZONAJOBS_FIRST_SELECTOR_TO_WAIT_FOR
} = require('../config');
const { puppetPageConfig } = require('../config');

// Abrir Zonajobs y esperar selector

const open = async browser => {
  const page = await browser.newPage();
  await puppetPageConfig(page);
  await page.goto(ZONAJOBS_URL);
  await page.waitForSelector(ZONAJOBS_FIRST_SELECTOR_TO_WAIT_FOR);

  return { browser, page };
};

module.exports = open;
