// Import mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema creation
const CharacterSchema = new Schema(
  {
    name: { type: String, unique: true, require: true },
    gender: {
      type: String,
      enum: ["Hombre", "Mujer", "Otros"],
      require: true,
    },
    image: {
      type: String,
    },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  },
  {
    timestamps: true,
  }
);
// Invoke the model
const Character = mongoose.model("Character", CharacterSchema);
// Export it
module.exports = Character;
