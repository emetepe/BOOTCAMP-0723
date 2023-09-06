const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema(
  {
    prueba: { type: mongoose.Schema.Types.ObjectId, ref: 'Prueba' },
    dog: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const Scores = mongoose.model('Score', ScoreSchema);
module.exports = Scores;