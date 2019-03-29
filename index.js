const logger = require('./services/logger');
const express = require('express');

/* Cargar Variables de entorno */
require('dotenv').config();

// Iniciar Express
const app = express();

// Cargar rutas
require('./routes')(app);

// Crear Servidor HTTP
const { PORT = 7300 } = process.env;

// Inicializar conexión a Base de Datos
require('./db/connection');

// Iniciar Servidor HTTP
app.listen(PORT, () => {
  logger.info(`escuchando en el puerto ${PORT}`);
});
