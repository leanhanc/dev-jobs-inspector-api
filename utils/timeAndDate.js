const subMonths = require('date-fns/sub_months');
const cache = require('memory-cache');

const { CACHE_TTL } = require('../config/constants/');

const timeAndDate = () => {
  return {
    // Restar un mes a la fecha actual
    thisDayPastMonth() {
      const itIsCached = cache.get('thisDayPastMonh');

      if (itIsCached) return itIsCached;

      const date = subMonths(new Date(), 1).toISOString();

      cache.put('thisDayPastMonh', date, CACHE_TTL);

      return date;
    }
  };
};

module.exports = timeAndDate;
