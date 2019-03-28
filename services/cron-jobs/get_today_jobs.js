const scrapers = require('../scrapers/');

module.exports = async query => {
  const jobs = [];
  const scrapAllSites = async () => {
    for (let scraper of scrapers) {
      let adverts = await scraper(query);
      if (adverts.length) {
        jobs.push(...adverts);
      }
    }
  };
  await scrapAllSites();
  return jobs;
};
