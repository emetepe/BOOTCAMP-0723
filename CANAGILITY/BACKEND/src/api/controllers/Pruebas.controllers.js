/* ---------------------------------------------------------------- */
/* -----------------   REQUERIMOS LOS TRES MODELOS  --------------- */
/* ---------------------------------------------------------------- */
const Prueba = require('../models/Pruebas.model');
const User = require('../models/User.model');
const Scores = require('../models/Scores.model');

/* ---------------------------------------------------------------- */
/* ----------------------   CREAR PRUEBA   ------------------------ */
/* ---------------------------------------------------------------- */
const createPrueba = async (req, res, next) => {
  try {
    await Prueba.syncIndexes();
    const newPrueba = new Prueba(req.body);
    const PruebaSave = await newPrueba.save();
    if (PruebaSave) {
      return res.status(200).json({ [PruebaSave.name]: 'Prueba creada correctamente' });
    } else {
      return res.status(404).json('Error al crear la prueba');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* ---------------------   ELIMINAR PRUEBA   ---------------------- */
/* ---------------------------------------------------------------- */
const deletePrueba = async (req, res, next) => {
  try {
    const { id } = req.params;
    const PruebaDelete = await Prueba.findByIdAndDelete(id);

    const dogs = await User.find({ pruebas: id });
    dogs.forEach(async (element) => {
      await element.updateOne({
        $pull: { pruebas: id },
      });
    });
    if (PruebaDelete) {
      if (await Prueba.findById(id)) {
        next('Error al borrar la prueba');
      }
      return res.status(200).json({
        deleteObject: PruebaDelete,
        test: (await Prueba.findById(id)) ? 'Error al borrar la prueba' : 'La prueba se ha eliminado correctamente',
      });
    } else {
      return res.status(404).json('No se ha encontrado el id de la prueba');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* -------------------   AÑADIR PERRO A PRUEBA  ------------------- */
/* ---------------------------------------------------------------- */
const addDog = async (req, res, next) => {
  try {
    const { id } = req.params; //id prueba
    const { idDog } = req.body;

    const dog = await User.findById(idDog);
    const pruebaNoUpdate = await Prueba.findById(id);
    if (!pruebaNoUpdate.dog.includes(dog._id)) {
      await pruebaNoUpdate.updateOne({
        $push: { dog: dog._id },
      });
      await dog.updateOne({
        $push: { pruebas: pruebaNoUpdate._id },
      });
      return res.status(200).json('Perro añadido correctamente');
    } else {
      await pruebaNoUpdate.updateOne({
        $pull: { dog: dog._id },
      });
      await dog.updateOne({
        $pull: { pruebas: pruebaNoUpdate._id },
      });
      return res.status(200).json('Se ha eliminado el perro');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* ------------------   AÑADIR MONITOR A PRUEBA  ------------------ */
/* ---------------------------------------------------------------- */
const addCoach = async (req, res, next) => {
  try {
    const { id } = req.params; //id prueba
    const { idcoach } = req.body;
    const pruebaNoUpdate = await Prueba.findById(id);
    const coach = await User.findById(idcoach);

    if (!pruebaNoUpdate.coach.includes(coach._id)) {
      await pruebaNoUpdate.updateOne({
        $push: { coach: coach._id },
      });
      await coach.updateOne({
        $push: { pruebas: pruebaNoUpdate._id },
      });
      return res.status(200).json('Entrenador añadido correctamente');
    } else {
      await pruebaNoUpdate.updateOne({
        $pull: { coach: coach._id },
      });
      await coach.updateOne({
        $pull: { pruebas: pruebaNoUpdate._id },
      });
      return res.status(200).json('Se ha eliminado el entrenador');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* ------------------   VER PUNTUACIONES POR NIVEL  --------------- */
/* ---------------------------------------------------------------- */
const getScoresNivel = async (req, res, next) => {
  try {
    const { nivel } = req.params;
    const findScores = await Scores.find({ dog: req.user._id }).populate(
      'prueba'
    );
    const arrayAux = [];
    findScores.forEach((element) => {
      if (element.prueba.nivel === nivel) {
        arrayAux.push({
          prueba: element.prueba.name,
          score: element.score,
        });
      }
    });
    return res.status(200).json(arrayAux);
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* --------------------   VER PERROS POR PRUEBA  ------------------ */
/* ---------------------------------------------------------------- */
const getDogsPrueba = async (req, res, next) => {
  try {
    const { pruebas } = req.user;
    const scoresMiPrueba = await Scores.find({
      prueba: pruebas.toString(),
    }).populate('dog');
    const miPrueba = await Prueba.findById(pruebas.toString());
    const scoresDogs = [];
    scoresMiPrueba.forEach((element) => {
      console.log(element);
      scoresDogs.push({
        _id: element.dog._id,
        score: element.score,
        name: element.dog.name,
        image: element.dog.image,
      });
    });
    if (scoresDogs) {
      return res.status(200).json({
        nivel: miPrueba.nivel,
        name: miPrueba.name,
        scoresDogs,
      });
    } else {
      return res
        .status(404)
        .json('No ha sido posible obtener la puntuación de los perros');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* --------------------   VER TODAS LAS PRUEBAS  ------------------ */
/* ---------------------------------------------------------------- */
const getAllPruebas = async (req, res, next) => {
  try {
    const getAllPruebas = await Prueba.find();
    if (getAllPruebas) {
      return res.status(200).json(getAllPruebas);
    } else {
      return res.status(404).json('No ha sido posible obtener las pruebas');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* --------------------   VER PRUEBAS POR PERRO  ------------------ */
/* ---------------------------------------------------------------- */
const getAllPruebasDog = async (req, res, next) => {
  try {
    const getAllPruebas = await Prueba.find({ dog: req.user._id });
    if (getAllPruebas) {
      return res.status(200).json(getAllPruebas);
    } else {
      return res.status(404).json('Error al buscar pruebas');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* --------------------   OBTENER PRUEBA POR ID  ------------------ */
/* ---------------------------------------------------------------- */
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prueba = await Prueba.findById(id);
    if (prueba) {
      return res.status(200).json(prueba);
    } else {
      return res.status(404).json('Error al buscar la prueba');
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createPrueba,
  deletePrueba,
  addDog,
  addCoach,
  getScoresNivel,
  getDogsPrueba,
  getAllPruebas,
  getAllPruebasDog,
  getById,
};