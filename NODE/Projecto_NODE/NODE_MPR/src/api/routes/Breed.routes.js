const { upload } = require('../../middleware/files.middleware');
const {
  createBreed,
  addDog,
  getAll,
  getByName,
  getByOrigin,
  getByExpectancy,
  //getHighestExpectancy,
  deleteBreed,
} = require('../controllers/Breed.controllers');

const BreedRoutes = require('express').Router();

BreedRoutes.post('/', upload.single('image'), createBreed);
BreedRoutes.patch('/add/:id', addDog);
BreedRoutes.get('/', getAll);
BreedRoutes.get('/getByName/name', getByName);
BreedRoutes.get('/getByOrigin/origin', getByOrigin);
BreedRoutes.get('/getByExpectancy/lifeExpectancy', getByExpectancy);
//BreedRoutes.get('/getHighestExpectancy/', getHighestExpectancy);
BreedRoutes.delete('/delete/:id', deleteBreed);
//BreedRoutes.patch('/error/:id', erroresSolve);

module.exports = BreedRoutes;
