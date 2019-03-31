const mongoose = require('mongoose');
const Advert = mongoose.model('Advert');

const timeAndDate = require('../utils/timeAndDate')();

exports.search = async (req, res) => {
  const { q, dateFilter } = req.query;
  const currentPage = req.query.currentPage || 1;

  const itemsPerPage = 12;

  if (!q) {
    return res.status(401).json({ error: 'Query string empty' });
  }

  const count = await Advert.find({
    createdAt: {
      $gte: timeAndDate.substractDays(dateFilter),
      $lte: new Date().toISOString()
    },
    title: { $regex: q, $options: 'i' },
    location: req.query.location
  }).countDocuments();

  const adverts = await Advert.find({
    createdAt: {
      $gte: timeAndDate.substractDays(dateFilter),
      $lte: new Date().toISOString()
    },
    title: { $regex: q, $options: 'i' },
    location: req.query.location
  })
    .skip((currentPage - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .sort({ createdAt: -1 });

  const hasMoreItems = itemsPerPage * currentPage < count;

  res.status(200).json({ totalItems: count, hasMoreItems, data: adverts });
};
