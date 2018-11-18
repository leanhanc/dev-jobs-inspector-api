exports.COMPUTRABAJO_URL = 'http://www.computrabajo.com.ar';
exports.COMPUTRABAJO_FIRST_SELECTOR_TO_WAIT_FOR = '#sq';
exports.ZONAJOBS_URL = 'https://www.zonajobs.com.ar';
exports.ZONAJOBS_FIRST_SELECTOR_TO_WAIT_FOR = '#query';

/**
 * Puppeter Config
 */

const puppeteer = require('puppeteer');

// Instanciar Chromium, guardar la conexión
exports.puppetLaunch = async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: process.env.NODE_ENV === 'production' ? true : false,
    defaultViewport: { width: 1200, height: 720 }
  });

  return browser;
};

// Configurar el tab de Chromium, simular que es Firefox
exports.puppetPageConfig = async page => {
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
  );
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url().includes('tail')) interceptedRequest.abort();
    else interceptedRequest.continue();
  });

  return page;
};
