// Require cloudinary, Character
const { deletImgCloudinary } = require("../middleware/files.middleware");
const Character = require("../models/Character.model");

// Create the "create" function
const createCharacter = async (req, res, next) => {
  let catchImage = req.file?.path;
  try {
    // Sync MongoDB indexes
    await Character.syncIndexes();
    const newCharacter = new Character(req.body);
    // Check if there is an image. If not, a default img will be uploaded
    if (req.file) {
      newCharacter.image = catchImage;
    } else {
      newCharacter.image =
        "https://res.cloudinary.com/dhkbe6djz/image/upload/v1689099748/UserFTProyect/tntqqfidpsmcmqdhuevb.png";
    }
    // Save the Character
    const savedCharacter = await newCharacter.save();
    if (savedCharacter) {
      return res.status(200).json(savedCharacter);
    } else {
      return res.status(404).json("Error while saving character in db");
    }
  } catch (error) {
    req.file?.path && deletImgCloudinary(catchImage);
    return next(error);
  }
};
// Export
module.exports = { createCharacter };
