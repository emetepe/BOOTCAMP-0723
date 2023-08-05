// Import upload images, createCharacter and express
const { upload } = require("../middleware/files.middleware");
const { createCharacter } = require("../controllers/Character.controller");
const express = require("express")

// Constant to save all the routes
const CharacterRoutes = express.Router();

// Make routes
CharacterRoutes.post("/create", upload.single("image"), createCharacter)
// Export it
module.exports = CharacterRoutes;
