const knex = require('../db/knex');
const helpers = require('./helpers');

/**
 * 1 - Se valida que la solicitud no esté vacía.
 * 2 - Se realiza una primera consulta ("prelimary") para tener el total
 * bruto de resultados (sin filrar por fecha).
 * 3 - Se chequea si se filtra por fecha. En tal caso
 * los items totales siguen siendo los obtenidos preliminarmente, pero se
 * envían los datos filtrados y paginados si corresponde.
 */

// PAGINATION OPTIONS
const { itemsPerPage } = require('../db/config');

/**
 * Los paramétros deben llegar como query strings.
 * @param {string} query - La consulta. Se busca la cadena de texto
 * que aquí se reciba en el cuerpo/descripción de los avisos.
 * @param {number} currentPage - Los resultados se devuelven paginados (default:1).
 * La página requerida debe llegar como "page" en la query string.
 * @param {string} locationFilter - Para filtrar por provincia. Ver opciones en la
 * documentación:
 * @param {string} dateFilter - Para filtrar por fecha de publicación. Ver
 * opciones en la documentación:
 */
exports.search = async (query, currentPage = 1, locationFilter, dateFilter) => {
  // Validar solicitud
  if (!query) {
    throw new Error('Solicitud inválida');
  }
  if (query.length < 3) {
    throw new Error('Solicitud inválida. Se requieren al menos 3 caracteres');
  }

  const preliminary = await knex('jobs')
    .where('description', 'ilike', `%${query}%`)
    .andWhere('location', 'ilike', `%${locationFilter}%`);

  // Chequear si se va a filtrar por fecha
  if (dateFilter) {
    const filteredJobsByDate = helpers.filterByDate(dateFilter, preliminary);

    preliminary.data = filteredJobsByDate;
    preliminary.totalItems = filteredJobsByDate.length;

    // Paginación
    if (preliminary.totalItems > itemsPerPage) {
      const result = {};
      result.data = await knex('jobs')
        .where('description', 'ilike', `%${query}%`)
        .andWhere('location', 'ilike', `%${locationFilter}%`)
        .orderBy('created_at', 'desc')
        .limit(itemsPerPage)
        .offset((currentPage - 1) * itemsPerPage);

      result.totalItems = preliminary.totalItems;
      result.hasMoreItems = itemsPerPage * currentPage < preliminary.totalItems;

      return result;
    }

    let filteredJobsSinglePage = {};
    filteredJobsSinglePage.data = await knex('jobs')
      .where('description', 'ilike', `%${query}%`)
      .andWhere('location', 'ilike', `%${locationFilter}%`)
      .orderBy('created_at', 'desc');
    filteredJobsSinglePage.totalItems = preliminary.totalItems;
    filteredJobsSinglePage.data = helpers.filterByDate(
      dateFilter,
      filteredJobsSinglePage.data
    );

    return filteredJobsSinglePage;
  } else {
    const [{ count }] = await knex('jobs')
      .where('description', 'ilike', `%${query}%`)
      .andWhere('location', 'ilike', `%${locationFilter}%`)
      .count();

    // Paginación
    if (count > itemsPerPage) {
      const result = {};
      result.data = await knex('jobs')
        .where('description', 'ilike', `%${query}%`)
        .andWhere('location', 'ilike', `%${locationFilter}%`)
        .orderBy('created_at', 'desc')
        .limit(itemsPerPage)
        .offset((currentPage - 1) * itemsPerPage);

      result.totalItems = count;
      result.hasMoreItems = itemsPerPage * currentPage < count;

      return result;
    }

    const singlePageResults = {};
    singlePageResults.data = await knex('jobs')
      .where('description', 'ilike', `%${query}%`)
      .andWhere('location', 'ilike', `%${locationFilter}%`)
      .orderBy('created_at', 'desc');
    singlePageResults.totalItems = count;

    return singlePageResults;
  }
};
