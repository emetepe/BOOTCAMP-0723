const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
dotenv.config();

// CREACIÓN DEL ALMACÉN
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'nodeProyect',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'],
  },
});

// FUNCIÓN PARA SUBIR IMÁGENES
const upload = multer({ storage });

// FUNCIÓN PARA BORRAR IMÁGENES
const deleteImgCloudinary = (imgUrl) => {
  const imgSplited = imgUrl.split('/');
  const nameSplited = imgSplited[imgSplited.length - 1].split('.');
  const folderSplited = imgSplited[imgSplited.length - 2];
  const public_id = `${folderSplited}/${nameSplited[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log('Image delete in cloudinary');
  });
};

// FUNCIÓN PARA CONFIGURAR CLOUDINARY
const configCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY,
  });
};

module.exports = { upload, deleteImgCloudinary, configCloudinary };