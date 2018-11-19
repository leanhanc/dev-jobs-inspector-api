const { puppetLaunch } = require('../config');
const open_computrabajo = require('./open');
const close_computrabajo = require('./close');
const search_jobs = require('./search_jobs');
const read_jobs = require('./read_jobs');
const read_jobs_details = require('./read_job_details');

module.exports = async query => {
  /* Iniciar Puppeteer */
  const browser = await puppetLaunch();
  /* Entrar a Computrabajo */
  let { page } = await open_computrabajo(browser);
  /* Tomar la query que viene por parámetros y buscar en la página */
  page = await search_jobs(page, query);
  /* Hacer el scraping de los trabajos */
  const today_computrabajo_jobs = await read_jobs(page);
  /* Tomar cada trabajo y obtener su detalle */
  const computrabajo_jobs = await read_jobs_details(
    today_computrabajo_jobs,
    page
  );
  /* Cerrar el navegador y devolver la lista de trabajos que se obtuvieron */
  await close_computrabajo(browser);

  return computrabajo_jobs;
};
