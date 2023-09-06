const express = require('express');
const {
  createPrueba,
  deletePrueba,
  addDog,
  addCoach,
  getScoresNivel,
  getDogsPrueba,
  getAllPruebas,
  getAllPruebasDog,
  getById,
} = require('../controllers/Pruebas.controllers');

const {
  isAuthAdmin,
  isAuthDog,
  isAuthCoach,
} = require('../../middleware/auth.middleware');

const PruebasRoutes = express.Router();

PruebasRoutes.post('/createPrueba', [isAuthAdmin], createPrueba);
PruebasRoutes.delete('/delete/:id', [isAuthAdmin], deletePrueba);
PruebasRoutes.post('/addDog/:id', [isAuthAdmin], addDog);
PruebasRoutes.post('/addCoach/:id', [isAuthAdmin], addCoach);
PruebasRoutes.get('/nivel/:nivel', [isAuthDog], getScoresNivel);
PruebasRoutes.get('/dogs', [isAuthCoach], getDogsPrueba);
PruebasRoutes.get('/getAllPruebas', [isAuthAdmin], getAllPruebas);
PruebasRoutes.get(
  '/getAllPruebasDog',
  [isAuthDog],
  getAllPruebasDog
);
PruebasRoutes.get('/getById/:id', [isAuthAdmin], getById);

module.exports = PruebasRoutes;