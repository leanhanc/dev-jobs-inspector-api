const notFound = (req, res, next) => {
  return res
    .status(404)
    .send({ message: 'No se econtró el recurso que solicitase' });
};

// Handler para errores en desarrollo
const developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    error: err.message,
    status: err.status
  };
  res.status(err.status || 500).json(errorDetails);
};

// Handler para errores en producción
const productionErrors = (err, req, res, next) =>
  res.status(err.status || 500).json({ error: err.message });

/* Implementar middlware de errores */

module.exports = app => {
  app.get('env') === 'development'
    ? app.use(developmentErrors)
    : app.use(productionErrors);

  app.use(notFound);
};
