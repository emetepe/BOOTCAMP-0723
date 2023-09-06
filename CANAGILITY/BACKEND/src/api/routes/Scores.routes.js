const express = require('express');
const {
  createScore,
  getAll,
  getById,
  getAvg,
  deleteScores,
  getMisScores,
} = require('../controllers/Scores.controllers');
const {
  isAuthCoach,
  isAuthDog,
} = require('../../middleware/auth.middleware');
const ScoresRoutes = express.Router();

ScoresRoutes.post('/createScore', [isAuthCoach], createScore);
ScoresRoutes.get('/allScores', [isAuthDog], getAll);
ScoresRoutes.get('/oneScore/:id', [isAuthDog], getById);
ScoresRoutes.get('/media', [isAuthDog], getAvg);
ScoresRoutes.delete('/delete/:id', [isAuthCoach], deleteScores);
ScoresRoutes.get('/getMisScores', [isAuthCoach], getMisScores);
module.exports = ScoresRoutes;