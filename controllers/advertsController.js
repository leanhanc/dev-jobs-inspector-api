const mongoose = require('mongoose');
const Advert = mongoose.model('Advert');

const timeAndDate = require('../utils/timeAndDate')();

/**
 * 1 - Se valida que la solicitud no esté vacía.
 * 2 - Se realiza una primera consulta para tener el total
 * bruto de resultados sin aplicar filtros.
 * 3 - Se devuelve la consulta final aplicando filtros.
 */

exports.search = async (req, res) => {
  /**
   * * Los paramétros deben llegar como query strings. Tanto la consulta principal (Ej: "Python")
   * * como el filtro por provincia son case insensitive.
   *
   * @function
   * @param { string } req.q - La consulta principal. Se busca la cadena de texto
   * que aquí se reciba en el título de los avisos.
   * @param { number } req.currentPage - Indica la página requerida, dado que los resultados se paginan.
   * @param { string } req.locationFilter - Para filtrar por provincia.
   * @param { string } req.dateFilter - Cantidad de días a tomar para filtrar avisos. Ej: "7", toma
   * los avisos de la última semana.
   */

  const { q, dateFilter } = req.query;
  const currentPage = req.query.currentPage || 1;

  const itemsPerPage = 12;

  if (!q) {
    return res.status(401).json({ error: 'Query string empty' });
  }

  const count = await Advert.find({
    createdAt: {
      $gte: timeAndDate.substractDays(dateFilter),
      $lte: new Date().toISOString()
    },
    title: { $regex: q, $options: 'i' },
    location: { $regex: req.query.location, $options: 'i' }
  }).countDocuments();

  const adverts = await Advert.find({
    createdAt: {
      $gte: timeAndDate.substractDays(dateFilter),
      $lte: new Date().toISOString()
    },
    title: { $regex: q, $options: 'i' },
    location: { $regex: req.query.location, $options: 'i' }
  })
    .skip((currentPage - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .sort({ createdAt: -1 });

  const hasMoreItems = itemsPerPage * currentPage < count;

  res.status(200).json({ totalItems: count, hasMoreItems, data: adverts });
};
