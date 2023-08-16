const { isAuthAdmin } = require('../../middleware/auth.middleware');
const { upload } = require('../../middleware/files.middleware');
const {
  createBreed,
  addDog,
  getAll,
  getByName,
  getByOrigin,
  getByExpectancy,
  deleteBreed,
} = require('../controllers/Breed.controllers');

const BreedRoutes = require('express').Router();

BreedRoutes.post('/', upload.single('image'), createBreed);
BreedRoutes.patch('/add/:id', addDog);
BreedRoutes.get('/', getAll);
BreedRoutes.get('/getByName/name', getByName);
BreedRoutes.get('/getByOrigin/origin', getByOrigin);
BreedRoutes.get('/getByExpectancy/lifeExpectancy', getByExpectancy);
BreedRoutes.delete('/delete/:id', [isAuthAdmin], deleteBreed);
//BreedRoutes.patch('/error/:id', erroresSolve);

module.exports = BreedRoutes;
