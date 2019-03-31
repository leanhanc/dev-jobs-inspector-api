const mongoose = require('mongoose');

const advertSchema = new mongoose.Schema(
  {
    site: {
      type: String,
      required:
        'No se proveyó nombre del sitio web que publicó originalmente el aviso'
    },
    location: {
      type: String,
      required: 'No se proveyó la ciudad del trabajo publicado',
      trim: true
    },
    title: {
      type: String,
      index: true,
      required: 'No se proveyó el título del aviso publicado',
      trim: true
    },
    url: {
      type: String,
      required: 'No se preveyó la URL del aviso',
      unique: true
    },
    description: {
      type: String,
      required: 'No se proveyó el cuerpo textual del aviso',
      trim: true
    },
    publisher: {
      type: String,
      required:
        'No se proveyó el nombre la consultora o de la empresa que publicó el aviso'
    }
  },
  { timestamps: { createdAt: 'createdAt' } }
);

advertSchema.cache = {};

module.exports = mongoose.model('Advert', advertSchema);
