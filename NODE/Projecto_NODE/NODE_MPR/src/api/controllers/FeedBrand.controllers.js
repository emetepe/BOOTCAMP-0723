const Breed = require('../models/Breed.model');
const FeedBrand = require('../models/FeedBrand.model');
const User = require('../models/User.model');

//! ---------------------------------------------------------------------
//? -------------------------------POST create --------------------------
//! ---------------------------------------------------------------------
const createFeedBrand = async (req, res, next) => {
  try {
    await FeedBrand.syncIndexes();
    const newFeedBrand = new FeedBrand(req.body);
    const savedFeedBrand = await newFeedBrand.save();
    if (savedFeedBrand) {
      return res.status(200).json(savedFeedBrand);
    } else {
      return res.status(404).json('Feed brand not saved');
    }
  } catch (error) {
    return next(error);
  }
};

//! ---------------------------------------------------------------------
//? --------------------------- ADD and DELETE BREED ----------------
//! ---------------------------------------------------------------------

const addBreed = async (req, res, next) => {
  try {
    let arrayBreeds;
    const { id } = req.params;
    const { breeds } = req.body;

    const FeedBrandById = await FeedBrand.findById(id);

    //let updateCharacter = [];
    if (FeedBrandById) {
      arrayBreeds = breeds.split(',');
      arrayBreeds.forEach(async (element) => {
        if (FeedBrandById.breeds.includes(element)) {
          console.log('💖');
          try {
            await FeedBrand.findByIdAndUpdate(id, {
              $pull: { breeds: element },
            });
            await FeedBrand.findById(id);
            try {
              await Breed.findByIdAndUpdate(element, {
                $pull: { FeedBrand: id },
              });

              await Breed.findById(element);
              //updateCharacter.push(updateChar);
            } catch (error) {
              return res.status(404).json(error);
            }
          } catch (error) {
            return res.status(404).json(error);
          }
        } else {
          console.log('💙');
          try {
            await FeedBrand.findByIdAndUpdate(id, {
              $push: { breeds: element },
            });
            await FeedBrand.findById(id);
            try {
              await Breed.findByIdAndUpdate(element, {
                $push: { FeedBrand: id },
              });
              await Breed.findById(element);
              //updateCharacter.push(updateChar);
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
          update: await FeedBrand.findById(id).populate({
            path: 'breeds',
            populate: {
              path: 'feedBrand',
            },
          }),
        });
      }, 500);

      // POPULATE DE VARIAS CLAVES DEL MODELO CON PUNTOS: https://res.cloudinary.com/dhkbe6djz/image/upload/v1691401628/POPULATE_CON_PUNTOS_mfbngz.jpg
      // POPULATE EN LINEA DE VARIAS CLAVES DEL MODELO: https://res.cloudinary.com/dhkbe6djz/image/upload/v1691401628/POPULATE_EN_LINEA_kmmnid.jpg
    } else {
      return res.status(404).json('feed brand not found');
    }
  } catch (error) {
    return next(error);
  }
};

//! ---------------------------------------------------------------------
//? --------------------------- view feedBrand------------------------------
//! ---------------------------------------------------------------------

const changeView = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { view } = req.body;
    const FeedBrandById = await FeedBrand.findById(id);
    if (FeedBrandById) {
      try {
        await FeedBrandById.updateOne({ view });
        const updateView = await FeedBrand.findById(id);

        return res.status(200).json({
          testUpdateView: updateView.view === view ? true : false,
        });
      } catch (error) {
        return res.status(404).json('failed update view to feed brand');
      }
    } else {
      return res.status(404).json('feed brand not found');
    }
  } catch (error) {
    return next(error);
  }
};

//! ---------------------------------------------------------------------
//? --------------------------- delete feed brand -----------------------
//! ---------------------------------------------------------------------

const deleteFeedBrand = async (req, res, next) => {
  try {
    // este id es el id de la pelicula que quiero borrar
    const { id } = req.params;
    const feedBrandDelete = await FeedBrand.findByIdAndDelete(id);
    try {
      // updateOne le tengo que dar el elemento exacto que quiero actualizar el cual lo busco antes por id
      // updateMany lo que hace es apuntar al modelo general y todos los que cumplan la condicion se modifican

      const test = await Breed.updateMany(
        { feedBrands: id },
        { $pull: { feedBrands: id } }
      );

      if (test.modifiedCount === test.matchedCount) {
        try {
          const testUser = await User.updateMany(
            { feedBrandFav: id },
            { $pull: { feedBrandFav: id } }
          );

          if (testUser.modifiedCount === testUser.matchedCount) {
            return res.status(200).json({
              testOkDelete: (await FeedBrand.findById(id)) ? false : true,
            });
          } else {
            return res.status(404).json({
              message: 'error updating User model',
              breed: feedBrandDelete.breeds,
              userFav: feedBrandDelete.userFav,
              idFeedBrandDelete: id,
            });
          }
        } catch (error) {
          return res
            .status(404)
            .json({ error: 'failed updating Users', message: error.message });
        }
      } else {
        return res.status(404).json({
          message: 'error updating Character model',
          breed: feedBrandDelete.breeds,
          userFav: feedBrandDelete.userFav,
          idFeedBrandDelete: id,
        });
      }
    } catch (error) {
      return res.status(404).json({
        error: 'error deleting feed brand',
        message: error.message,
        idFeedBrand: id,
      });
    }
  } catch (error) {
    return next(error);
  }
};

//! ---------------------------------------------------------------------
//? -------------------------- ERRORES INCONSISTENCIA DE DATOS-----------
//! ---------------------------------------------------------------------
const erroresSolve = async (req, res, next) => {
  const { id } = req.params;
  try {
    // actualizar las razas parq que no tengan el id de la marca de pienso borrada recibida por el param
    try {
      await Breed.updateMany({ feedBrand: id }, { $pull: { feedBrand: id } });

      try {
        /// actualizar los usuarios para que no tengan el characters
        await User.updateMany(
          { feedBrandFav: id },
          { $pull: { feedBrandFav: id } }
        );

        return res.status(200).json('solve error ok');
      } catch (error) {
        return res
          .status(404)
          .json({ message: error.message, idFeedBrand: id });
      }
    } catch (error) {
      return res.status(404).json({ message: error.message, idFeedBrand: id });
    }
  } catch (error) {
    return next({ message: error.message, idFeedBrand: id });
  }
};

module.exports = {
  createFeedBrand,
  addBreed,
  changeView,
  deleteFeedBrand,
  erroresSolve,
};
