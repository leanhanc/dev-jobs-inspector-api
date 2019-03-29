const adverts = require('./controllers/advertsController');

const { wrapAsync } = require('./middleware/errorHandling');

module.exports = app => {
  // TEST
  app.get('/api/test', (req, res) => res.status(200).send());

  // ADVERTS
  app.get('/api/search', wrapAsync(adverts.search));

  return app;
};
