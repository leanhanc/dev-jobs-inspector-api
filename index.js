/* Variables de entorno */
require('dotenv').config();

/* Express App */
const app = require('./app');

/* Servir API */
app.set('port', process.env.PORT || 7788);
const server = app.listen(app.get('port'), () => {
  console.log(` ✅  Servidor escuchando en el puerto ${server.address().port}`);
});
