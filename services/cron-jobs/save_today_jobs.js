const knex = require('../../db/knex');

/**
 * Si hay nuevos avisos, guardarlos en la base de datos
 * @param {array} jobs_to_save - Los trabajos nuevos que se encontraron
 * @param {string} area_or_technology - Nombre de la tecnología que se buscó,
 * requerida solamente para dar feedback.
 */

module.exports = async (jobs_to_save, area_or_technology) => {
  if (jobs_to_save.length) {
    const query = knex('jobs').insert(jobs_to_save);
    const result = await knex.raw('? ON CONFLICT DO NOTHING', [query]);
    if (!result.rowCount) {
      console.log(
        'No se encontraron nuevas publicaciones de ' + area_or_technology
      );
    }
    if (result.rowCount === 1) {
      console.log(
        'Se encontró y guardó una nueva publicación de ' + area_or_technology
      );
    }
    if (result.rowCount > 1) {
      console.log(
        `Se encontraron y guardaron ${
          result.rowCount
        } nuevas publicaciones de ${area_or_technology}`
      );
    }
  }
  console.log(
    'No se encontraron nuevas publicaciones de ' + area_or_technology
  );
};
