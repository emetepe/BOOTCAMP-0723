// Files management
// Require: multer, cloudinary, cloudinary-storage, dotenv
const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();

// Set images storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "NODEProject",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
  },
});

// Cloudinary upload function
const upload = multer({ storage });

// Cloudinary delete function
const deleteImgCloudinary = (imgUrl) => {
  const imgSplitted = imgUrl.split("/");
  const nameSplitted = imgSplitted[imgSplitted.length - 1].split(".");
  const folderSplitted = imgSplitted[imgSplitted.length - 2];
  const public_id = `${folderSplitted}/${nameSplitted[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log("Image deleted in Cloudinary");
  });
};

// Config Cloudinary settings
const configCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY,
  });
};
// Export functions
module.exports = { upload, deleteImgCloudinary, configCloudinary };
