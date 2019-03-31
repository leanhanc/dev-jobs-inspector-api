const logger = require('./services/logger');
const express = require('express');
const middleware = require('./middleware/common');

/* Cargar Variables de entorno */
require('dotenv').config();

// Inicializar conexión a Base de Datos
require('./db/connection');

// Iniciar Express
const app = express();

// Crear Servidor HTTP
const { PORT = 7300 } = process.env;

// Cargar rutas
require('./routes')(app);

// Cargar middleware
middleware(app);

// Iniciar Servidor HTTP
app.listen(PORT, () => {
  logger.info(`escuchando en el puerto ${PORT}`);
});
