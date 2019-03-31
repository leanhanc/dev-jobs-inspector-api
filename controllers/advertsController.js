const mongoose = require('mongoose');
const Advert = mongoose.model('Advert');

const timeAndDate = require('../utils/timeAndDate')();

exports.search = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(401).json({ error: 'Query string empty' });
  }

  const allAdverts = await Advert.find({
    createdAt: {
      $gte: timeAndDate.thisDayPastMonth(),
      $lte: new Date().toISOString()
    },
    title: { $regex: q, $options: 'i' }
  }).sort({ createdAt: -1 });
  res.status(200).json(allAdverts);
};
