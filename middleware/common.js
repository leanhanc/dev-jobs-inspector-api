const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const enforce = require('express-sslify');
const helmet = require('helmet');
const morgan = require('morgan');

module.exports = app => {
  /* Implementar manejo de CORS */
  app.use(cors());

  /* Implementar Body Parser */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

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
};
