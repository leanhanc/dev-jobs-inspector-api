const router = require('express').Router();
const { catchErrors } = require('../../middleware/errors');

const test = (req, res) => {
  res.json({ data: 'Dev Job Finder - API' });
};

router.get('/test', test);

module.exports = router;
