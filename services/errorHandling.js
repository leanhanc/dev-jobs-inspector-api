const logger = require('./logger');

// Escuchar errores no atrapados o manejados
process.on('uncaughtException', e => {
  logger.error(e);
  process.exit(1);
});

process.on('unhandledRejection', e => {
  logger.error(e);
  process.exit(1);
});
