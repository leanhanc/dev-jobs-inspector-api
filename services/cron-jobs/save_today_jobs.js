const knex = require('../../db/knex');

/**
 * Si hay nuevos avisos, guardarlos en la base de datos
 * @param {array} jobs_to_save - Los trabajos nuevos que se encontraron
 * @param {string} table - El nombre del portal, que corresponde con una tabla de la DB
 */

module.exports = async (jobs_to_save, table) => {
  if (jobs_to_save.length) {
    const query = knex(table).insert(jobs_to_save);
    const result = await knex.raw('? ON CONFLICT DO NOTHING', [query]);
    if (!result.rowCount) {
      return 'No se encontraron nuevas publicaciones de ' + area_or_technology;
    }
    if (result.rowCount === 1) {
      return (
        'Se encontró y guardó una nueva publicación de ' + area_or_technology
      );
    }
    if (result.rowCount > 1) {
      return `Se encontraron y guardaron ${
        result.rowCount
      } nuevas publicaciones de ${area_or_technology}`;
    }
  }
  return 'No se encontraron nuevas publicaciones de ' + area_or_technology;
};
