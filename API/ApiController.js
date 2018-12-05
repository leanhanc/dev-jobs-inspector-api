const knex = require('../db/knex');

// PAGINATION OPTIONS
const { itemsPerPage } = require('../db/config');

exports.search = async (query, currentPage) => {
  // Validar solicitud
  if (!query) {
    throw new Error('Solicitud inválida');
  }
  if (query.length < 3) {
    throw new Error('Solicitud inválida. Se requieren al menos 3 caracteres');
  }

  const [{ count }] = await knex('jobs')
    .where('title', 'ilike', `%${query}%`)
    .count();

  /**
   * Si los resultados son mayores a una página de items se los devuelve todos.
   * Caso contrario se implementa paginación
   */

  if (count > itemsPerPage) {
    const result = {};
    result.data = await knex('jobs')
      .where('title', 'ilike', `%${query}%`)
      .orderBy('created_at', 'desc')
      .limit(itemsPerPage)
      .offset((currentPage - 1) * itemsPerPage);

    result.totalItems = count;
    result.hasMoreItems = itemsPerPage * currentPage < count;

    return result;
  }

  return await knex('jobs')
    .where('title', 'ilike', `%${query}%`)
    .orderBy('created_at', 'desc');
};
