const { puppetLaunch } = require('../../config');
const open_zona_jobs = require('./open');
const close_zona_jobs = require('./close');
const search_jobs = require('./search_jobs');
const read_jobs = require('./read_jobs');
const read_jobs_details = require('./read_job_details');

module.exports = async query => {
  /* Iniciar Puppeteer */
  const browser = await puppetLaunch();
  /* Entrar a Zona Jobs */
  let { page } = await open_zona_jobs(browser);
  /* Tomar la query que viene por parámetros y buscar en la página */
  page = await search_jobs(page, query);
  /* Hacer el scraping de los trabajos */
  const today_zonajob_jobs = await read_jobs(page);
  /* Tomar cada trabajo y obtener su detalle */
  const zonajobs_jobs = await read_jobs_details(today_zonajob_jobs, page);
  /* Cerrar el navegador y devolver la lista de trabajos que se obtuvieron */
  await close_zona_jobs(browser);

  return zonajobs_jobs;
};
