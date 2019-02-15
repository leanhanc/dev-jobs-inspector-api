exports.COMPUTRABAJO_URL = 'http://www.computrabajo.com.ar';
exports.COMPUTRABAJO_FIRST_SELECTOR_TO_WAIT_FOR = '#sq';
exports.ZONAJOBS_URL = 'https://www.zonajobs.com.ar';
exports.ZONAJOBS_FIRST_SELECTOR_TO_WAIT_FOR = '.main-footer';
exports.BUMERAN_URL = 'https://www.bumeran.com.ar';
exports.BUMERAN_FIRST_SELECTOR_TO_WAIT_FOR = '.more';

/**
 * Palabras a buscar en los portales de trabajo
 */

exports.AREAS = ['Full-stack', 'Backend', 'Frontend'];
exports.TECHNOLOGIES = [
  'Android',
  'Angular',
  'Desarrollador C',
  'Cordova',
  'DevOps',
  'Ionic',
  'iOS',
  'Java',
  'Javascript',
  'Laravel',
  'MySQL',
  'MS SQL Server',
  'Desarrolador .Net',
  'Node',
  'Php',
  'PostgreSQL',
  'Python',
  'React',
  'React Native',
  'Spring',
  'SQL',
  'Vue JS'
];

/**
 * Puppeter Config
 */

const puppeteer = require('puppeteer');

// Instanciar Chromium, guardar la conexión
exports.puppetLaunch = async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 50000,
    headless: process.env.NODE_ENV === 'production' ? true : false,
    defaultViewport: { width: 1200, height: 720 }
  });

  return browser;
};

// Configurar el tab de Chromium, simular que es Firefox
exports.puppetPageConfig = async page => {
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:66.0) Gecko/20100101 Firefox/66.0'
  );
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url().includes('tail')) interceptedRequest.abort();
    else interceptedRequest.continue();
  });

  return page;
};
