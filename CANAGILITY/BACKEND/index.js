const { connect } = require('./src/utils/db');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { configCloudinary } = require('./src/middleware/files.middleware');

connect();
configCloudinary();
const app = express();
const PORT = process.env.PORT;

// FICHEROS DE RUTAS
const cors = require('cors');
const PruebasRoutes = require('./src/api/routes/Pruebas.routes');
const ScoresRoutes = require('./src/api/routes/Scores.routes');
const UserRoutes = require('./src/api/routes/User.routes');
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// LÍMITES DE ARCHIVO 
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: false }));

// RUTAS
app.use('/api/v1/pruebas/', PruebasRoutes);
app.use('/api/v1/scores/', ScoresRoutes);
app.use('/api/v1/user/', UserRoutes);

app.use('*', (req, res, next) => {
  const error = new Error('No se ha encontrado la ruta');
  error.status = 404;
  return next(error);
});

app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || 'Error inesperado');
});

app.disable('x-powered-by');
app.listen(PORT, () => {
  console.log(`Listening on PORT http://localhost:${PORT}`);
});