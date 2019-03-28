const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cron_jobs = require('./services/cron-jobs/');

/* Iniciar Express */
const app = express();

/* Implementar CORS  */
app.use(cors());

/* Implementar Body Parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Cargar rutas */
const api_routes = require('./API/routes/');
app.use('/api', api_routes);

/* Cargar cron-jobs*/
cron_jobs();

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
