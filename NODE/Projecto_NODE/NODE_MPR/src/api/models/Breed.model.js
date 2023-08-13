//! ---------- nos requerimos mongoose
const mongoose = require('mongoose');

//! ---------- nos traemos de la libreria mongoose schema
const Schema = mongoose.Schema;

//! ---------- creamos el schema

// Definimos el modelo de datos
// ----------> Tenmos las diferentes claves con su TYPE
// ----------> tenemos que definir las propiedades de los datos: limite de longuitud, si es requerido, si es unico...

const BreedSchema = new Schema(
  {
    name: { type: String, required: false, unique: true },
    size: {
      type: String,
      enum: ['Mini', 'Pequeño', 'Mediano', 'Grande', 'Gigante'],
      required: false,
    },
    lifeExpectancy: { type: Number, required: false, unique: true },
    weightAverage: { type: Number, required: false, unique: true },
    origin: {
      type: String,
      enum: ['Europa', 'América', 'África', 'Asia', 'Oceanía', 'Antártida'],
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    dogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dog' }],
    // feedBrandFav: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }],
    userFav: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
//! ---------- creamos el modelo

const Breed = mongoose.model('Breed', BreedSchema);

//! ----------- exportamos el modelo
module.exports = Breed;
