const mongoose = require('mongoose');

const PruebaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ['Muros', 'Viaductos', 'Rueda', 'Slalom', 'Túnel de tubo', 'Túnel plano', 'Túnel de tubo', 'Salto de vallas'], 
      required: true,
    },
    coach: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dog: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    year: { type: Number, required: true, trim: true },
    score: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Score' }],
    nivel: {
      type: String,
      enum: ['Iniciación', 'Intermedio', 'Avanzado', 'Profesional'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Prueba = mongoose.model('Prueba', PruebaSchema);
module.exports = Prueba;