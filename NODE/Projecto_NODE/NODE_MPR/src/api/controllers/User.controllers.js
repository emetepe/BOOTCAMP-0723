const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const setError = require('../helpers/handle-error');
const randomCode = require('../../utils/randomCode');
const { deleteImgCloudinary } = require('../../middleware/files.middleware');
const sendEmail = require('../../utils/sendEmail');
const { getTestEmailSend, setTestEmailSend } = require('../state/state.data');
dotenv.config();
const nodemailer = require('nodemailer');
const { generateToken } = require('../../utils/token');
const validator = require('validator');
const randomPassword = require('../../utils/randomPassword');
const Dog = require('../models/Dog.model');
const Breed = require('../models/Breed.model');

//! -----------------------------------------------------------------------------
//? ----------------------------REGISTER CORTO EN CODIGO ------------------------
//! -----------------------------------------------------------------------------

const register = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();

    // gestionar la generacion de un codigo random para que se pueda verificar
    let confirmationCode = randomCode();

    // Destructuring del email y el animation-name:
    const { email, name } = req.body;

    // vamos a comprobar que el usuario existe
    const userExist = await User.findOne({ email: email }, { name: name });

    // condicionamos el codigo a que este usuario exista o no
    if (!userExist) {
      // istanciamos al modelo y creamos una nueva instancia del mismo
      const newUser = new User({ ...req.body, confirmationCode });

      // vamos a ver si tenemos imagen subida por el form y si exsite la metemos al modelo instanciado
      if (req.file) {
        newUser.image = catchImg;
      } else {
        newUser.image = 'https://pic.onlinewebfonts.com/svg/img_181369.png';
      }

      // guardar el nuevo usuario dentro de mongo const {second} =

      try {
        const userSave = await newUser.save();
        if (userSave) {
          // si hemos guardado el usuario, llamamos a una funct que nos envie el email

          sendEmail(email, name, confirmationCode);
          setTimeout(() => {
            if (getTestEmailSend()) {
              setTestEmailSend(false);
              return res.status(200).json({ user: userSave, confirmationCode });
            } else {
              setTestEmailSend(false);
              return res.status(404).json({
                user: userSave,
                confirmationCode: 'error, resend code',
              });
            }
          }, 1400);
        } else {
          return res.status(404).json('not saved user');
        }
      } catch (error) {
        return res.status(404).json('not saved user', error.message);
      }
    } else {
      /// si no existe lanzamos un error y borramos la imagen subida en caso que la haya
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json('this user already exist');
    }
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------REGISTER LARGO EN CODIGO ------------------------
//! -----------------------------------------------------------------------------

const registerSlow = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();
    let confirmationCode = randomCode();
    const { email, name } = req.body;

    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );
    if (!userExist) {
      const newUser = new User({ ...req.body, confirmationCode });
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = 'https://pic.onlinewebfonts.com/svg/img_181369.png';
      }
      try {
        const userSave = await newUser.save();

        if (userSave) {
          const emailEnv = process.env.EMAIL;
          const password = process.env.PASSWORD;

          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: emailEnv,
              pass: password,
            },
          });

          const mailOptions = {
            from: emailEnv,
            to: email,
            subject: 'Confirmation code',
            text: `tu codigo es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              return res.status(404).json({
                user: userSave,
                confirmationCode: 'error, resend code',
              });
            } else {
              console.log('Email sent: ' + info.response);
              return res.status(200).json({
                user: userSave,
                confirmationCode,
              });
            }
          });
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json('this user already exist');
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//! ---------------------------------------------------------------------------
//? ------------------REDIRECT SEND CODE --------------------------------------
//! ---------------------------------------------------------------------------
const sendCode = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDB = await User.findById(id);

    const emailEnv = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailEnv,
        pass: password,
      },
    });

    const mailOptions = {
      from: emailEnv,
      to: userDB.email,
      subject: 'Confirmation code',
      text: `Tu codigo es ${userDB.confirmationCode}, gracias por confiar en nosotros ${userDB.name}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json({
          user: userDB,
          confirmationCode: 'error, resend code',
        });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({
          user: userDB,
          confirmationCode: userDB.confirmationCode,
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? --------------------------------LOGIN ---------------------------------------
//! -----------------------------------------------------------------------------
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDb = await User.findOne({ email });

    if (userDb) {
      if (bcrypt.compareSync(password, userDb.password)) {
        const token = generateToken(userDb._id, email);
        return res.status(200).json({
          user: userDb,
          token,
        });
      } else {
        return res.status(404).json('password dont match');
      }
    } else {
      return res.status(404).json('user not register');
    }
  } catch (error) {
    return next(error);
  }
};
//! -----------------------------------------------------------------------------
//? --------------------------------AUTOLOGIN -----------------------------------
//! -----------------------------------------------------------------------------
const autoLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      if ((password, userDB.password)) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json('password dont match');
      }
    } else {
      return res.status(404).json('User no register');
    }
  } catch (error) {
    return next(error);
  }
};
//! -----------------------------------------------------------------------------
//? ------------------------------RESEND CODE -----------------------------------
//! -----------------------------------------------------------------------------
const resendCode = async (req, res, next) => {
  try {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });

    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      const mailOptions = {
        from: email,
        to: req.body.email,
        subject: 'Confirmation code',
        text: `tu codigo es ${userExist.confirmationCode}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({
            resend: true,
          });
        }
      });
    } else {
      return res.status(404).json('User not found');
    }
  } catch (error) {
    return next(setError(500, error.message || 'Error general to send code'));
  }
};
//! -----------------------------------------------------------------------------
//? ---------------------------- CHECK NEW USER----------------------------------
//! -----------------------------------------------------------------------------
const checkNewUser = async (req, res, next) => {
  try {
    const { email, confirmationCode } = req.body;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(404).json('User not found');
    } else {
      if (userExists.confirmationCode === confirmationCode) {
        try {
          await userExists.updateOne({ check: true });
          const updateUser = await User.findOne({ email });
          return res.status(200).json({
            testCheckUser: updateUser.check == true ? true : false,
          });
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else {
        await User.findByIdAndDelete(userExists._id);
        deleteImgCloudinary(userExists.image);
        return res.status(404).json({
          userExists,
          check: false,
          delete: (await User.findById(userExists._id))
            ? 'error delete user'
            : 'ok delete user',
        });
      }
    }
  } catch (error) {
    return next(setError(500, error.message));
  }
};

//! -----------------------------------------------------------------------------
//? -----------------------CONTRASEÑAS Y SUS CAMBIOS-----------------------------
//! -----------------------------------------------------------------------------

//? -----------------------------------------------------------------------------
//! ------------------CAMBIO DE CONTRASEÑA CUANDO NO ESTAS LOGADO---------------
//? -----------------------------------------------------------------------------

const changePassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userDb = await User.findOne({ email });

    if (userDb) {
      return res.redirect(
        307,
        `http://localhost:8080/api/v1/users/sendPassword/${userDb._id}`
      );
    } else {
      return res.status(404).json('User no register');
    }
  } catch (error) {
    return next(error);
  }
};

//? --------------------------- redirect envio de nueva password -------------------
const sendPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDb = await User.findById(id);
    const passwordSecure = randomPassword();

    // enviamos el correo
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });

    const mailOptions = {
      from: email,
      to: userDb.email,
      subject: '-----',
      text: `User: ${userDb.name}. Your new code login is ${passwordSecure} Hemos enviado esto porque tenemos una solicitud de cambio de contraseña, si no has sido ponte en contacto con nosotros, gracias.`,
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json('dont send email and dont update user');
      } else {
        console.log('Email sent: ' + info.response);
        const newPasswordBcrypt = bcrypt.hashSync(passwordSecure, 10);

        try {
          await User.findByIdAndUpdate(id, { password: newPasswordBcrypt });
          const userUpdatePassword = await User.findById(id);
          if (bcrypt.compareSync(passwordSecure, userUpdatePassword.password)) {
            return res.status(200).json({
              updateUser: true,
              sendPassword: true,
            });
          } else {
            return res.status(404).json({
              updateUser: false,
              sendPassword: true,
            });
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      }
    });
  } catch (error) {
    return next(error);
  }
};

//? -----------------------------------------------------------------------------
//! ------------------CAMBIO DE CONTRASEÑA CUANDO YA SE ESTA ESTA LOGADO---------
//? -----------------------------------------------------------------------------
const modifyPassword = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;

    const validado = validator.isStrongPassword(newPassword);

    if (validado) {
      const { _id } = req.user;
      if (bcrypt.compareSync(password, req.user.password)) {
        const newPasswordHashed = bcrypt.hashSync(newPassword, 10);
        try {
          await User.findByIdAndUpdate(_id, { password: newPasswordHashed });
          const userUpdate = await User.findById(_id);
          if (bcrypt.compareSync(newPassword, userUpdate.password)) {
            return res.status(200).json({
              updateUser: true,
            });
          } else {
            return res.status(200).json({
              updateUser: false,
            });
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else {
        return res.status(404).json('password dont match');
      }
    } else {
      return res.status(404).json('password not valid');
    }
  } catch (error) {
    return next(error);
  }
};
//! -----------------------------------------------------------------------------
//? ------------------------------- Forgot Pass ---------------------------------
//! -----------------------------------------------------------------------------
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userDb = await User.findOne({ email });
    if (userDb) {
      return res.redirect(
        307,
        `http://localhost:8080/api/v1/users/sendPassword/${userDb._id}`
      );
    } else {
      return res.status(404).json('usuario no registrado');
    }
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ---------------------------------UPDATE--------------------------------------
//! -----------------------------------------------------------------------------
const update = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();

    const patchUser = new User(req.body);

    if (req.file) {
      patchUser.image = catchImg;
    }

    // ------------------- importanteeeeee para que no se carge propiedades del elemento
    patchUser._id = req.user._id;
    patchUser.password = req.user.password;
    patchUser.rol = req.user.rol;
    patchUser.confirmationCode = req.user.confirmationCode;
    patchUser.email = req.user.email;
    patchUser.check = req.user.check;

    try {
      await User.findByIdAndUpdate(req.user._id, patchUser);
      if (req.file) deleteImgCloudinary(req.user.image);

      /// EMPEZAMOS CON LOS TEST PARA SABER QUE TODO ESTA OK
      const updateUser = await User.findById(req.user._id);
      // -------------> keys del body
      const updateKeys = Object.keys(req.body);

      const testUpdate = [];
      updateKeys.forEach((item) => {
        if (updateUser[item] == req.body[item]) {
          if (updateUser[item] != req.user[item]) {
            testUpdate.push({
              [item]: true,
            });
          } else {
            testUpdate.push({
              [item]: 'sameOldInfo',
            });
          }
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });

      // vamos a hacer el pero para cuando haya un archivo en el req.file
      if (req.file) {
        updateUser.image == catchImg
          ? testUpdate.push({
              image: true,
            })
          : testUpdate.push({
              image: false,
            });
      }

      return res.status(200).json({
        updateUser,
        testUpdate,
      });
    } catch (error) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
    return next(error);
  }
};
//! -----------------------------------------------------------------------------
//? --------------------------------- ADD FAV DOG -------------------------------
//! -----------------------------------------------------------------------------

const addFavDog = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { dogs } = req.body;
    const arrayDogs = dogs.split(',');
    arrayDogs.forEach(async (element) => {
      if (req.user.dogsFav.includes(element)) {
        // si lo incluye lo sacamos
        try {
          await User.findByIdAndUpdate(_id, {
            $pull: { dogsFav: element },
          });

          try {
            await Dog.findByIdAndUpdate(element, {
              $pull: { userFav: _id },
            });
          } catch (error) {
            return res.status(404).json({
              error: 'error updating pull id User in model dog',
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: 'error updating pull dog',
            element,
            message: error.message,
          });
        }
      } else {
        // si no lo incluye lo metemos
        try {
          await User.findByIdAndUpdate(_id, {
            $push: { dogsFav: element },
          });
          try {
            await Dog.findByIdAndUpdate(element, {
              $push: { userFav: _id },
            });
          } catch (error) {
            return res.status(404).json({
              error: 'error updating push id User in model dog',
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: 'error updating push dog',
            element,
            message: error.message,
          });
        }
      }
    });

    setTimeout(async () => {
      return res.status(200).json(await User.findById(_id).populate('dogsFav'));
    }, 100);
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? --------------------------------- ADD FAV BREED -----------------------------
//! -----------------------------------------------------------------------------

const addFavBreed = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { breeds } = req.body;
    const arrayBreeds = breeds.split(',');
    arrayBreeds.forEach(async (element) => {
      if (req.user.breedsFav.includes(element)) {
        // si lo incluye lo sacamos
        try {
          await User.findByIdAndUpdate(id, {
            $pull: { breedsFav: element },
          });

          try {
            await Breed.findByIdAndUpdate(element, {
              $pull: { userFav: id },
            });
          } catch (error) {
            return res.status(404).json({
              error: 'error updating pull id User in model breed',
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: 'error updating pull breed',
            element,
            message: error.message,
          });
        }
      } else {
        // si no lo incluye lo metemos
        try {
          await User.findByIdAndUpdate(id, {
            $push: { breedsFav: element },
          });
          try {
            await Breed.findByIdAndUpdate(element, {
              $push: { userFav: id },
            });
          } catch (error) {
            return res.status(404).json({
              error: 'error updating push id User in model breed',
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: 'error updating push breed',
            element,
            message: error.message,
          });
        }
      }
    });

    setTimeout(async () => {
      return res
        .status(200)
        .json({ user: await User.findById(id).populate('breedsFav') });
    }, 100);
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------- User Top Fav ----------------------------------
//! -----------------------------------------------------------------------------
const userTopFav = async (req, res) => {
  try {
    const users = await User.find();
    users.sort((a, b) => b.breedsFav.length - a.breedsFav.length);
    const userTopFav = users.slice(0, 3);
    return res.status(200).json(userTopFav);
  } catch (error) {
    return res
      .status(400)
      .json('Error al sacar los tres usuarios con más favoritos');
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------- DELETE USER -----------------------------------
//! -----------------------------------------------------------------------------
const deleteUser = async (req, res, next) => {
  try {
    const { _id, image } = req.user;
    await User.findByIdAndDelete(_id);
    //
    try {
      await Dog.updateMany({ dogsFav: _id }, { $pull: { dogsFav: _id } });
      try {
        await Breed.updateMany(
          { breedsFav: _id },
          { $pull: { breedsFav: _id } }
        );
      } catch (error) {
        return res
          .status(400)
          .json('Error al borrar la raza mientras se borra el usuario');
      }
    } catch (error) {
      return res
        .status(400)
        .json('Error al borrar los perros mientras se borra el usuario');
    }
    //
    if (await User.findById(_id)) {
      return res.status(404).json('Not deleted');
    } else {
      deleteImgCloudinary(image);
      return res.status(200).json('Deleted');
    }
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------- Get All Users ---------------------------------
//! -----------------------------------------------------------------------------
const getAllUsers = async (req, res, next) => {
  try {
    const allUser = await User.find({ rol: 'user' });
    if (allUser) {
      return res.status(200).json(allUser);
    } else {
      return res.status(404).json('Error al buscar usuarios');
    }
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------- Get All Admins ---------------------------------
//! -----------------------------------------------------------------------------
const getAllAdmins = async (req, res, next) => {
  try {
    const allAdmin = await User.find({ rol: 'admin' });
    if (allAdmin) {
      return res.status(200).json(allAdmin);
    } else {
      return res.status(404).json('Error al buscar administradores');
    }
  } catch (error) {
    return next(error);
  }
};

//! --------------EXPORTACIONES ----------------------------

module.exports = {
  register,
  registerSlow,
  sendCode,
  login,
  autoLogin,
  resendCode,
  checkNewUser,
  changePassword,
  sendPassword,
  modifyPassword,
  forgotPassword,
  update,
  addFavDog,
  addFavBreed,
  deleteUser,
  getAllUsers,
  getAllAdmins,
  userTopFav,
};
