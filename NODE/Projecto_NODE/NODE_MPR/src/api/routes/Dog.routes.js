const { isAuth } = require('../../middleware/auth.middleware');
const { upload } = require('../../middleware/files.middleware');
const {
  createDog,
  getById,
  getAll,
  getByName,
  updateDog,
  weightDog,
  ageDog,
} = require('../controllers/Dog.controllers');

const DogRoutes = require('express').Router();

DogRoutes.post('/', upload.single('image'), [isAuth], createDog);
DogRoutes.get('/:id', getById);
DogRoutes.get('/', getAll);
DogRoutes.get('/getByName/name', getByName);
DogRoutes.patch('/update/:id', upload.single('image'), [isAuth], updateDog);
DogRoutes.get('/weightDog/:weight', weightDog);
DogRoutes.get('/ageDog/:yearOfBirth', ageDog);

module.exports = DogRoutes;
