const {
  ZONAJOBS_URL,
  ZONAJOBS_FIRST_SELECTOR_TO_WAIT_FOR
} = require('../../config');
const { puppetPageConfig } = require('../../config');

// Abrir Zonajobs y esperar selector

const open = async browser => {
  const page = await browser.newPage();
  await puppetPageConfig(page);
  await page.goto(ZONAJOBS_URL);
  setTimeout(async () => {
    await page.waitForSelector(ZONAJOBS_FIRST_SELECTOR_TO_WAIT_FOR);
  }, 1000);

  return { browser, page };
};

module.exports = open;
