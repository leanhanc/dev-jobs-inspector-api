const knex = require('../db/knex');

exports.search = async query => {
  // Validar solicitud
  if (!query) {
    throw new Error('Solicitud inválida');
  }
  if (query.length < 3) {
    throw new Error('Solicitud inválida. Se requieren al menos 3 caracteres');
  }
  // Ejecutar solicitud
  return await knex('jobs').where('title', 'ilike', `%${query}%`);
};
