const { AREAS, TECHNOLOGIES } = require('../config');
const cron = require('node-cron');
const get = require('./get_today_jobs');
const save = require('./save_today_jobs');

module.exports = () => {
  const job = cron.schedule(
    '00 0 */5 * * *',
    () => {
      /**
       * Los trabajos se indexan por área (Front-End, Back-End, Full-Stack) o
       * por tecnología (lenguaje o framework)
       */
      (async function processAreasAndTechnologies(AREAS, TECHNOLOGIES) {
        try {
          /**
           * Indexar por área
           */
          for (const tech of TECHNOLOGIES) {
            const found_by_tech = await get(tech);
            await save(found_by_tech, tech);
          }
          /**
           * Indexar por tecnología
           */
          for (const area of AREAS) {
            const found_by_area = await get(area);
            await save(found_by_area, area);
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
