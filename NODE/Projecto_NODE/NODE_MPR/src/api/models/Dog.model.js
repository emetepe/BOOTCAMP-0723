//! ---------- Requerimos mongoose
const mongoose = require('mongoose');

//! ---------- Traemos de la libreria mongoose schema
const Schema = mongoose.Schema;

//! ---------- creamos el schema

// Definimos el modelo de datos
// ----------> Tenmos las diferentes claves con su TYPE
// ----------> tenemos que definir las propiedades de los datos: limite de longuitud, si es requerido, si es unico...

const DogSchema = new Schema(
  {
    name: { type: String, required: false, unique: true },
    gender: {
      type: String,
      enum: ['Macho', 'Hembra'],
      required: false,
    },
    age: { type: Number, required: false, unique: true },
    image: {
      type: String,
      required: false,
    },
    breeds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Breed' }],
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

const Dog = mongoose.model('Dog', DogSchema);

//! ----------- exportamos el modelo
module.exports = Dog;
