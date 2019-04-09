const http = require('http');
const logger = require('./services/logger');
const express = require('express');
const applyMiddleware = require('./middleware/common');
const applyRouting = require('./routes');

/* Cargar Variables de entorno */
require('dotenv').config();

// Inicializar conexión a Base de Datos
require('./db/connection');

// Crear Servidor HTTP
const app = express();
const { PORT = 7300 } = process.env;

// Cargar middleware
applyMiddleware(app);

// Cargar rutas
applyRouting(app);

// Iniciar Servidor HTTP
const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`escuchando en el puerto ${PORT}`);
});
