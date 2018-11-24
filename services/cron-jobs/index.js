const { AREAS, TECHNOLOGIES } = require('../config');
const cron = require('node-cron');
const get = require('./get_today_jobs');

module.exports = () => {
  const job = cron.schedule(
    '0 48 21 * * *',
    () => {
      /**
       * Los trabajos se indexan por área (Front-End, Back-End, Full-Stack) o
       * por tecnología (lenguaje o framework)
       */
      console.log('executed');
      const responses = [];
      (async function processAreasAndTechnologies(AREAS, TECHNOLOGIES) {
        try {
          /**
           * Indexar por área
           */
          for (const tech of TECHNOLOGIES) {
            const todays_jobs = await get(tech, 'technology');
            console.log(todays_jobs);
          }
          /**
           * Indexar por tecnología
           */
          for (const area of AREAS) {
            const todays_jobs = await get(area, 'area');
          }
        } catch (e) {
          console.log(e);
        }
      })(AREAS, TECHNOLOGIES);
    },
    null
  );
  // Iniciar cron job
  job.start();
};
