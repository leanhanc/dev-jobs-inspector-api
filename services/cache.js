const cache = require('memory-cache');

let memCache = new cache.Cache();
let cacheMiddleware = duration => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url;
    let cacheContent = memCache.get(key);
    if (cacheContent) {
      console.log('se uso cache');
      res.json(cacheContent);
      return;
    } else {
      res.sendResponse = res.json;
      res.json = body => {
        console.log('se guarda en cache');
        memCache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

module.exports = cacheMiddleware;
