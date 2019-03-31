const subDays = require('date-fns/sub_days');
const cache = require('memory-cache');

const { CACHE_TTL } = require('../config/constants/');

const timeAndDate = () => {
  return {
    // Restar un mes a la fecha actual
    substractDays(numberOfDays = 30) {
      const itIsCached = cache.get('withSubstractedDays');

      if (itIsCached) return itIsCached;

      const date = subDays(new Date(), numberOfDays).toISOString();

      cache.put('withSubstractedDays', date, CACHE_TTL);

      return date;
    }
  };
};

module.exports = timeAndDate;
