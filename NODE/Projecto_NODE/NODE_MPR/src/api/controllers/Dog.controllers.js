const Dog = require('../models/Dog.model');
const User = require('../models/User.model');
const Breed = require('../models/Breed.model');
const { deleteImgCloudinary } = require('../../middleware/files.middleware');

//! -------------------------------------------------------------------------
//? -------------------------------POST Create ------------------------------
//! -------------------------------------------------------------------------
const createDog = async (req, res, next) => {
  let catchImage = req.file?.path;
  try {
    // sincronizamos los index (los elementos unicos) con los posibles cambios que hay en el modelo
    // mirar captura: https://res.cloudinary.com/dhkbe6djz/image/upload/v1691053331/index_cwtcx5.jpg
    await Dog.syncIndexes();
    // creamos una instancia del modelo con el req.body que es el cuerpo de la peticion
    const newDog = new Dog(req.body);
    // vamos a valorar si tenemos imagen y si no la tenemos una por defecto
    if (req.file) {
      newDog.image = catchImage;
    } else {
      newDog.image =
        'https://res.cloudinary.com/dhninncj6/image/upload/v1691855387/NODEProject/pawprint_wrldq5.png';
    }

    // vamos a guardar en la bdo el objeto de la instancia del modelo de dog
    const savedDog = await newDog.save();

    if (savedDog) {
      return res.status(200).json(savedDog);
    } else {
      return res
        .status(404)
        .json('No se ha podido guardar el perro en la base de datos');
    }
  } catch (error) {
    // Borramos la imagen, ya que se ha subido
    req.file?.path && deleteImgCloudinary(catchImage);
    return next(error);
  }
};

//! -------------------------------------------------------------------------
//? ------------------------------- Get by ID -------------------------------
//! -------------------------------------------------------------------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dogById = await Dog.findById(id);

    // si no encuentra manda null en el find() si no encuentra manda un array vacio
    if (dogById) {
      return res.status(200).json({ data: dogById });
    } else {
      res.status(404).json('dog not found');
    }
  } catch (error) {
    return next(error);
  }
};

//! -------------------------------------------------------------------------
//? -------------------------------- Get All --------------------------------
//! -------------------------------------------------------------------------
const getAll = async (req, res, next) => {
  try {
    const dogAll = await Dog.find();

    if (dogAll.length > 0) {
      return res.status(200).json({ data: dogAll });
    } else {
      res.status(404).json('dog not found');
    }
  } catch (error) {
    return next(error);
  }
};

//! ---------------------------------------------------------------------
//? ---------------------------- Get By name ----------------------------
//! ---------------------------------------------------------------------
const getByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    const dogByName = await Dog.find({ name });

    if (dogByName.length > 0) {
      return res.status(200).json({ data: dogByName });
    } else {
      res.status(404).json('dog not found');
    }
  } catch (error) {
    return next(error);
  }
};

//! ---------------------------------------------------------------------
//? ------------------------------ UPDATE -------------------------------
//! ---------------------------------------------------------------------
const updateDog = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    const { id } = req.params;

    const dogById = await Dog.findById(id);
    if (dogById) {
      // guardamos la antigua imagen por si me ha metido una imagen imagen nueva borrrar la antigua de cloudinary
      //! importante consistencia de datos
      const oldImg = dogById.image;
      const customBody = {
        _id: dogById._id,
        image: req.file?.path ? req.file?.path : dogById.image,
        gender: req.body?.gender ? req.body?.gender : dogById.gender,
        name: req.body?.name ? req.body?.name : dogById.name,
      };
      await Dog.findByIdAndUpdate(id, customBody);
      if (req.file?.path) {
        deleteImgCloudinary(oldImg);
      }

      /// vamos a testear que se haya actualizado todo correctamente
      const updateNewDog = await Dog.findById(id);
      const elementUpdate = Object.keys(req.body);
      // ------------> acceder a la clave name updateNewCharacter["name"] updateNewCharacter.name
      let test = {};
      elementUpdate.forEach((item) => {
        if (req.body[item] == updateNewDog[item]) {
          test[item] = true;
        } else {
          test[item] = false;
        }

        if (req.file) {
          updateNewDog.image == req.file?.path
            ? (test = { ...test, file: true })
            : (test = { ...test, file: false });
        }
      });

      // vamos a lanzar la respuesta, tenemos en cuenta que haya o no algun false, si hay algun false se lanza un 404
      let acc = 0;
      for (let clave in test) {
        if (test[clave] == false) acc++;
      }

      if (acc > 0) {
        return res.status(404).json({
          dataTest: test,
          update: false,
        });
      } else {
        return res.status(200).json({
          dataTest: test,
          update: updateNewDog,
        });
      }
    } else {
      return res.status(404).json('dog not found');
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//! Obtener los perros que pesen menos que el peso introducido
const weightDog = async (req, res) => {
  try {
    const dogs = await Dog.find();
    const dogsByWeight = dogs.filter(
      (item) => item.weight <= Number(req.params.weight)
    );
    // Sort by weigth
    dogsByWeight.sort((a, b) => a.weight - b.weight);
    return res.status(200).json(dogsByWeight);
  } catch (error) {
    return res.status(400).json('Error al obtener el perror con mayor peso');
  }
};

//! Obtener los perros que sean mayores que determinado año
const ageDog = async (req, res) => {
  try {
    const dogs = await Dog.find();
    const dogsByYobt = dogs.filter(
      (item) => item.yearOfBirth >= Number(req.params.yearOfBirth)
    );
    // Sort by year
    dogsByYobt.sort((a, b) => a.yearOfBirth - b.yearOfBirth);
    return res.status(200).json(dogsByYobt);
  } catch (error) {
    return res.status(400).json('Error al obtener el perror menos joven');
  }
};

module.exports = {
  createDog,
  getById,
  getAll,
  getByName,
  updateDog,
  weightDog,
  ageDog,
};
