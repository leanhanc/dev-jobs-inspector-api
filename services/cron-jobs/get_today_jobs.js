const scrapers = require('../scrapers/');

module.exports = async (query, index_type) => {
  for (let scraper of scrapers) {
    const adverts = await scraper(query);
    console.log(adverts);
  }
};
