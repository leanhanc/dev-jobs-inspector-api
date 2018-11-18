const router = require('express').Router();
const { catchErrors } = require('../../middleware/errors');

const test = (req, res) => {
  res.send('Job Inspector - API');
};

router.get('/test', test);

module.exports = router;
