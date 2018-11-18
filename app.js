const express = require('express');
const bodyParser = require('body-parser');

/* Iniciar Express */
const app = express();

/* Implementar Body Parser */
app.use(bodyParser.json());

/* Cargar rutas */
const api_routes = require('./API/routes');
app.use('/api', api_routes);

// ! Implementar error handlers ! //
const errorHandlers = require('./middleware/errors');
/* Eror 404 */
app.use(errorHandlers.notFound);
/* Erores en entorno desarrollo */
if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}
/* Erores en entorno de producción */
app.use(errorHandlers.productionErrors);

module.exports = app;
