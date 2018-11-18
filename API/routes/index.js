const express = require('express');
const router = express.Router();
const { catchErrors } = require('../../middleware/errors');

const test = (req, res) => {
  res.send('Dev Job Finder - API');
};

router.get('/test', test);

module.exports = router;
