const express = require('express');
const router = express.Router();
const { catchErrors } = require('../../middleware/errors');

const ct_scraper = require('../../services/scapers/computrabajo/');
const zj_scraper = require('../../services/scapers/zonajobs/');

const test = (req, res) => {
  res.send('Dev Job Finder - API');
};

const ct_sraping_test = async (req, res) => {
  const { query } = req.body;
  const jobs = await ct_scraper(query);
  res.json(jobs);
};

const zj_sraping_test = async (req, res) => {
  const { query } = req.body;
  const jobs = await zj_scraper(query);
  res.json(jobs);
};

router.get('/test', test);
router.post('/ct', catchErrors(ct_sraping_test));
router.post('/zj', catchErrors(zj_sraping_test));

module.exports = router;
