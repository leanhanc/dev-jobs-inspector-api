const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize({ colors: { info: 'blue', error: 'red' } }),
    winston.format.json()
  ),
  level: 'info',
  transports: [
    new winston.transports.File({
      filename: './temp/logs/errors.log',
      level: 'error'
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

module.exports = logger;
