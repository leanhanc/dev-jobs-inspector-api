exports.wrapAsync = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

exports.notFound = (req, res, next) => {
  return res
    .status(404)
    .send({ message: 'No se econtró el recurso que solicitase' });
};

// Handler para errores en desarrollo
exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    error: err.message,
    status: err.status
  };
  res.status(err.status || 500).json(errorDetails);
};

// Handler para errores en producción
exports.productionErrors = (err, req, res, next) =>
  res.status(err.status || 500).json({ error: err.message });
