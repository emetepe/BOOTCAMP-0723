const { deleteImgCloudinary } = require('../../middleware/files.middleware');
const Breed = require('../models/Breed.model');
const Dog = require('../models/Dog.model');
const FeedBrand = require('../models/FeedBrand.model');
const User = require('../models/User.model');

//! ---------------------------------------------------------------------
//? ------------------------------ POST create --------------------------
//! ---------------------------------------------------------------------

const createBreed = async (req, res, next) => {
  let catchImage = req.file?.path;
  try {
    // sincronizamos los index (los elementos unicos) con los posibles cambios que hay en el modelo
    // mirar captura: https://res.cloudinary.com/dhkbe6djz/image/upload/v1691053331/index_cwtcx5.jpg
    await Breed.syncIndexes();
    // creamos una instancia del modelo con el req.body que es el cuerpo de la peticion
    const newBreed = new Breed(req.body);
    // //vamos a valorar si tenemos imagen y si no la tenemos una por defecto
    if (req.file) {
      newBreed.image = catchImage;
    } else {
      newBreed.image =
        'https://res.cloudinary.com/dhninncj6/image/upload/v1691855387/NODEProject/pawprint_wrldq5.png';
    }

    // vamos a guardar en la bdo el objeto de la instancia del modelo dde character
    const savedBreed = await newBreed.save();

    if (savedBreed) {
      return res.status(200).json(savedBreed);
    } else {
      return res.status(404).json('No se ha podido guardar la raza en la bd');
    }
  } catch (error) {
    req.file?.path && deleteImgCloudinary(catchImage);
    return next(error);
  }
};

//! ---------------------------------------------------------------------
//? --------------------------- ADD and DELETE DOG ----------------------
//! ---------------------------------------------------------------------

const addDog = async (req, res, next) => {
  try {
    let arrayDogs;
    const { id } = req.params;
    const { dogs } = req.body;

    const breedById = await Breed.findById(id);

    if (breedById) {
      arrayDogs = dogs.split(',');
      arrayDogs.forEach(async (element) => {
        if (breedById.dogs.includes(element)) {
          console.log('💖');
          try {
            await Breed.findByIdAndUpdate(id, {
              $pull: { dogs: element },
            });
            await Breed.findById(id);
            try {
              await Dog.findByIdAndUpdate(element, {
                $pull: { breeds: id },
              });

              await Dog.findById(element);
            } catch (error) {
              return res.status(404).json(error);
            }
          } catch (error) {
            return res.status(404).json(error);
          }
        } else {
          console.log('💙');
          try {
            await Breed.findByIdAndUpdate(id, {
              $push: { dogs: element },
            });
            await Breed.findById(id);
            try {
              await Dog.findByIdAndUpdate(element, {
                $push: { breeds: id },
              });
              await Dog.findById(element);
            } catch (error) {
              return res.status(404).json(error);
            }
          } catch (error) {
            return res.status(404).json(error);
          }
        }
      });

      setTimeout(async () => {
        return res.status(200).json({
          update: await Breed.findById(id).populate({
            path: 'dogs',
            populate: {
              path: 'breeds',
            },
          }),
        });
      }, 600);

      // POPULATE DE VARIAS CLAVES DEL MODELO CON PUNTOS: https://res.cloudinary.com/dhkbe6djz/image/upload/v1691401628/POPULATE_CON_PUNTOS_mfbngz.jpg
      // POPULATE EN LINEA DE VARIAS CLAVES DEL MODELO: https://res.cloudinary.com/dhkbe6djz/image/upload/v1691401628/POPULATE_EN_LINEA_kmmnid.jpg
    } else {
      return res.status(404).json('breed not found');
    }
  } catch (error) {
    return next(error);
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------get All ------------------------------
//! ---------------------------------------------------------------------
const getAll = async (req, res, next) => {
  try {
    const breedAll = await Breed.find();

    if (breedAll.length > 0) {
      return res.status(200).json({ data: breedAll });
    } else {
      res.status(404).json('breed not found');
    }
  } catch (error) {
    return next(error);
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------Get By Name---------------------------
//! ---------------------------------------------------------------------
const getByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    const breedByName = await Breed.find({ name });

    if (breedByName.length > 0) {
      return res.status(200).json({ data: breedByName });
    } else {
      res.status(404).json('breed not found');
    }
  } catch (error) {
    return next(error);
  }
};

//! ---------------------------------------------------------------------
//? ----------------------------- Get By Origin -------------------------
//! ---------------------------------------------------------------------
const getByOrigin = async (req, res, next) => {
  try {
    const { origin } = req.query;
    const breedByOrigin = await Breed.find({ origin });

    if (breedByOrigin.length > 0) {
      return res.status(200).json({ data: breedByOrigin });
    } else {
      res.status(404).json('breed not found');
    }
  } catch (error) {
    return next(error);
  }
};

//! ---------------------------------------------------------------------
//? ------------------------ Get highest expectancy ---------------------
//! ---------------------------------------------------------------------
// const getHighestExpectancy = async (req, res) => {
//   try {
//     const { lifeExpectancy } = req.query;
//     const highestBreed = await Breed.find({ lifeExpectancy });

//     let max = highestBreed.reduce(function (a, b)) {
//       return Math.max(a, b);
//     }

//     return res.status(200).json(highestBreed);
//   } catch (error) {
//     return res
//       .status(404)
//       .json('Error al obtener la raza con mayor esperanza de vida');
//   }
// };

//! ---------------------------------------------------------------------
//? -------------------------------DELETE -------------------------------
//! ---------------------------------------------------------------------

const deleteBreed = async (req, res, next) => {
  try {
    // este id es el id de la raza que quiero borrar
    const { id } = req.params;
    const breedDelete = await Breed.findByIdAndDelete(id);
    try {
      // updateOne le tengo que dar el elemento exacto que quiero actualizar el cual lo busco antes por id
      // updateMany lo que hace es apuntar al modelo general y todos los que cumplan la condicion se modifican

      const test = await Dog.updateMany(
        { breeds: id },
        { $pull: { breeds: id } }
      );

      if (test.modifiedCount === test.matchedCount) {
        try {
          const testUser = await User.updateMany(
            { breedsFav: id },
            { $pull: { breedsFav: id } }
          );

          if (testUser.modifiedCount === testUser.matchedCount) {
            return res.status(200).json({
              testOkDelete: (await Breed.findById(id)) ? false : true,
            });
          } else {
            return res.status(404).json({
              message: 'error updating User model',
              feedBrandFav: breedDelete.feedBrandFav,
              userFav: breedDelete.userFav,
              idBreedDelete: id,
            });
          }
        } catch (error) {
          return res
            .status(404)
            .json({ error: 'failed updating users', message: error.message });
        }
      } else {
        return res.status(404).json({
          message: 'error updating FeedBrand model',
          breeds: breedDelete.feedBrandFav,
          userFav: breedDelete.userFav,
          idBreed: id,
        });
      }
    } catch (error) {
      return res.status(404).json({
        error: 'error deleting breed',
        message: error.message,
        idBreed: id,
      });
    }
  } catch (error) {
    return next(error);
  }
};

//! ---------------------------------------------------------------------
//? ------------------------- Errores Solve -----------------------------
//! ---------------------------------------------------------------------
const erroresSolve = async (req, res, next) => {
  const { id } = req.params;
  try {
    // actualizar las breeds parq que no tengan el id de la breed borrada y recibido por el param

    try {
      await FeedBrand.updateMany({ breeds: id }, { $pull: { breeds: id } });

      try {
        /// actualizar los usuarios para que no tengan id del character borrrado y recibido por el param

        await User.updateMany({ breedsFav: id }, { $pull: { breedsFav: id } });

        return res.status(200).json('solve error ok');
      } catch (error) {
        return res.status(404).json({ message: error.message, idBreed: id });
      }
    } catch (error) {
      return res.status(404).json({ message: error.message, idBreed: id });
    }
  } catch (error) {
    return next({ message: error.message, idBreed: id });
  }
};

module.exports = {
  createBreed,
  addDog,
  getAll,
  getByName,
  getByOrigin,
  //getHighestExpectancy,
  deleteBreed,
  erroresSolve,
};
