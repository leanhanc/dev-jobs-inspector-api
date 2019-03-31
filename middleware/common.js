const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const enforce = require('express-sslify');
const helmet = require('helmet');
const morgan = require('morgan');

const {
  developmentErrors,
  productionErrors,
  notFound
} = require('./errorHandling');

module.exports = app => {
  /* Implementar Body Parser */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  /* Implementar manejo de CORS */
  app.use(cors());

  /* Implementar seguridad en encabezados */
  app.use(helmet());

  /* Forzar HTTPS */
  if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
  }

  /* Implementar Compresión */
  app.use(compression());

  /* Implementar Logging */
  app.use(morgan('dev'));

  /* Implementar middlware de errores */

  app.get('env') === 'development'
    ? app.use(developmentErrors)
    : app.use(productionErrors);

  app.use(notFound);
};
