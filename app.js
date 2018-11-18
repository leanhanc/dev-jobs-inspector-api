const express = require('express');
const bodyParser = require('body-parser');

/* Iniciar Express */
const app = express();

/* Implementar Body Parser */
app.use(bodyParser.json());

// ! Implementar error handlers ! //
const errorHandlers = require('./middleware/errors');
app.use(errorHandlers.notFound);
if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}
app.use(errorHandlers.productionErrors);

module.exports = app;
