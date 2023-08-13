//! ---------- nos requerimos mongoose
const mongoose = require('mongoose');

//! ---------- creamos el schema

// Definimos el modelo de datos
// ----------> Tenmos las diferentes claves con su TYPE
// ----------> tenemos que definir las propiedades de los datos: limite de longuitud, si es requerido, si es unico...

const FeedBrandSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ['dry', 'wet', 'raw'],
      required: false,
    },
    breedsFav: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Breed' }],
    view: { type: Boolean, default: false },
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

const FeedBrand = mongoose.model('FeedBrand', FeedBrandSchema);

//! ----------- exportamos el modelo
module.exports = FeedBrand;
