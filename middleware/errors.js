// ! Handler de erros en async/await
exports.catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

exports.notFound = (req, res, next) => {
  const err = new Error('No se encontró el recurso que solicitaste');
  next(err);
};

// ! Handler para errores en desarrollo
exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    error: err.message,
    status: err.status
  };
  res.status(err.status || 500);
  res.json(errorDetails);
};

// ! Handler para errores en producción
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
};
