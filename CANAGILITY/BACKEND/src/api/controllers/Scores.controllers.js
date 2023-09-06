/* ---------------------------------------------------------------- */
/* -----------------   REQUERIMOS LOS TRES MODELOS  --------------- */
/* ---------------------------------------------------------------- */
const Prueba = require('../models/Pruebas.model');
const Scores = require('../models/Scores.model');
const User = require('../models/User.model');

/* ---------------------------------------------------------------- */
/* ---------------------   CREAR PUNTUACIÓN   --------------------- */
/* ---------------------------------------------------------------- */
const createScore = async (req, res, next) => {
  try {
    await Scores.syncIndexes();
    const { pruebas } = req.user;
    const pruebaString = pruebas.toString();
    const newScore = new Scores({ ...req.body, prueba: pruebaString });
    const scoreSave = await newScore.save();
    const { dog } = req.body;
    const scoreCreado = await Scores.findOne({
      prueba: pruebaString,
      dog: req.body.alumn,
    });
    console.log(scoreCreado);
    const dogNoUpdate = await User.findById(dog);
    await dogNoUpdate.updateOne({
      $push: { scores: scoreCreado._id },
    });
    console.log(pruebas.toString());
    const pruebasNoUpdate = await Prueba.findById(
      pruebas.toString()
    );
    await pruebasNoUpdate.updateOne({
      $push: { score: scoreCreado._id },
    });
    if (scoreSave) {
      return res.status(200).json({ score: 'Puntuación creada' });
    } else {
      return res.status(404).json('No se ha podido crear la puntuación');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* --------------   OBTENER TODAS LAS PUNTUACIONES   -------------- */
/* ---------------------------------------------------------------- */
const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const allScores = await Scores.find({ dog: _id }).populate(
      'dog prueba'
    ); 
    const arrayAux = [];
    allScores.forEach((element) => {
      console.log(1, element);
      arrayAux.push({
        [element.prueba.year]: element.prueba.nivel,
        [element.prueba.name]: element.score,
      });
    });
    if (allScores) {
      return res.status(200).json(arrayAux);
    } else {
      return res.status(404).json('El perro no tiene puntuaciones');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* ----------------   OBTENER PUNTUACIONES POR ID  ---------------- */
/* ---------------------------------------------------------------- */
const getById = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const score = await Scores.findOne({
      dog: req.user._id,
      prueba: id,
    }).populate('dog prueba');

    if (score) {
      return res.status(200).json({
        nivel: score.prueba.nivel,
        score: score.score,
        year: score.prueba.year,
        name: score.prueba.name,
      });
    } else {
      return res.status(404).json('Puntuación no encontrada');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* ------------------   OBTENER PUNTUACIÓN MEDIA  ----------------- */
/* ---------------------------------------------------------------- */
const getAvg = async (req, res, next) => {
  try {
    const allScores = await Scores.find({ dog: req.user._id });
    let acc = 0;
    allScores.forEach((element) => {
      const valor = element.score;
      acc += valor;
    });
    const avg = acc / allScores.length;
    if (avg) {
      const avgRound = avg.toFixed(2);
      return res.status(200).json(`La puntuación media es: ${avgRound}`);
    } else {
      return res.status(404).json('Error al calcular la puntuación media');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* --------------------   ELIMINAR PUNTUACIONES  ------------------ */
/* ---------------------------------------------------------------- */
const deleteScores = async (req, res, next) => {
  try {
    const { id } = req.params; //id perro
    const idPrueba = req.user.pruebas[0]._id;

    const score = await Scores.findOne({
      dog: id,
      pruebas: idPrueba.toString(),
    });
    const idScore = score._id;
    const idScoreString = idScore;
    console.log(idScoreString);
    const scoreToDelete = await Scores.findByIdAndDelete(idScore);
    if (scoreToDelete) {
      const dog = await User.findOne({ scores: idScore });
      await dog.updateOne({
        $pull: { scores: idScore },
      });
      const prueba1 = await Prueba.findOne({ scores: idScore });
      await prueba1.updateOne({
        $pull: { scores: idScore },
      });
      return res.status(200).json('Eliminación correcta');
    } else {
      return res.status(404).json('Error en la eliminación');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* --------------   OBTENER PUNTUACIONES DEL MONITOR -------------- */
/* ---------------------------------------------------------------- */
const getMisScores = async (req, res, next) => {
  try {
    const coach = await User.findById(req.user._id).populate('pruebas');
    const id = coach.pruebas;

    const scores = await Scores.find({
      prueba: id,
    }).populate('dog prueba');
    if (scores) {
      return res.status(200).json(scores);
    } else {
      return res.status(404).json('No se han encontrado puntuaciones');
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createScore,
  getAll,
  getById,
  getAvg,
  deleteScores,
  getMisScores,
};