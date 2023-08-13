const { upload } = require('../../middleware/files.middleware');
const {
  createDog,
  getById,
  getAll,
  getByName,
  updateDog,
} = require('../controllers/Dog.controllers');

const DogRoutes = require('express').Router();

DogRoutes.post('/', upload.single('image'), createDog);
DogRoutes.get('/:id', getById);
DogRoutes.get('/', getAll);
DogRoutes.get('/getByName/name', getByName);
DogRoutes.patch('/update/:id', upload.single('image'), updateDog);
//DogRoutes.delete('/delete/:id', deleteCharacter);
//DogRoutes.patch('/error/:id', erroresSolve);

module.exports = DogRoutes;
