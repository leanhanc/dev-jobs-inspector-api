const adverts = require('./controllers/advertsController');
const useCache = require('./services/cache');
const { CACHE_TTL } = require('./config/constants/');
const { wrapAsync } = require('./middleware/errorHandling');

module.exports = app => {
  // TEST
  app.get('/api/test', (req, res) => res.status(200).send());

  // ADVERTS
  app.get('/api/search', useCache(CACHE_TTL), wrapAsync(adverts.search));

  return app;
};
