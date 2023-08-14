//! ---------------------- requerimos express y dotenv
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
//! ----------------------- conectar con MONGO DB gracias a MONGOOSE
const { connect } = require('./src/utils/db');
connect();
//!------------------------ configurar cloudinary
const { configCloudinary } = require('./src/middleware/files.middleware');
configCloudinary();
//! ---------------------- crear una variable  con el puerto
const PORT = process.env.PORT;
//! ---------------------- creamos el servidor web
const app = express();
// https://www.npmjs.com/package/cors
app.use(cors());
//! ---------------------- limitaciones de recepcion y de acceso
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: false }));

//! --------------------- RUTAS---------------------------------
//const FeedBrandRoutes = require('./src/api/routes/FeedBrand.routes');
const UserRoutes = require('./src/api/routes/User.routes');
const DogRoutes = require('./src/api/routes/Dog.routes');
const BreedRoutes = require('./src/api/routes/Breed.routes');

app.use('/api/v1/dogs/', DogRoutes);
app.use('/api/v1/users/', UserRoutes);
app.use('/api/v1/breeds/', BreedRoutes);
//app.use('/api/v1/feedbrand/', FeedBrandRoutes);
//! ---------------------- crear error cuando la url no se encuentre --LA ROUTA NO SE ENCUENTRE ---
app.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  return next(error);
});

//! ----------------------- crear error 500 para saber cuando el server ha crasheado
app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || 'unexpected error');
});

//! ---------------------- escuchamos en el puerto el servidor
// ------> x-powered-by revela las tecnologias en el backend
app.disable('x-powered-by');
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
