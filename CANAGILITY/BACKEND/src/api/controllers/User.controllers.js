const { deleteImgCloudinary } = require('../../middleware/files.middleware');
const randomCode = require('../../utils/randomCode');
const User = require('../models/User.model');
const Prueba = require('../models/Pruebas.model');
const Scores = require('../models/Scores.model');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { generateToken } = require('../../utils/token');
const randomPassword = require('../../utils/randomPassword');

dotenv.config();


/* ---------------------------------------------------------------- */
/* ------------------------   REGISTER   -------------------------- */
/* ---------------------------------------------------------------- */
const register = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();
    let confirmationCode = randomCode();

    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );
    if (!userExist) {
      console.log(req.body);
      const newUser = new User({
        ...req.body,
        confirmationCode,
      });
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image =
          'https://res.cloudinary.com/dhninncj6/image/upload/v1693571671/FinalProject/favicon_efgqz8.png';
      }

      const userSave = await newUser.save();
      if (userSave) {
        return res.redirect(
          307,
          `http://localhost:8080/api/v1/user/register/sendMail/${userSave._id}`
        );
      }
    } else {
      deleteImgCloudinary(catchImg);
      return res.status(409).json('El usuario ya existe');
    }
  } catch (error) {
    return next(error);
  }
};
/* ---------------------------------------------------------------- */
/* -------------------   REDIRECT - SENDCODE   -------------------- */
/* ---------------------------------------------------------------- */
const sendCode = async (req, res, next) => {
  try {
    const { id } = req.params; // id user
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
      subject: 'Código de confirmación',
      text: `Gracias por registrarte en Can Agility, ${userDB.name}. A continuación encontrarás tu código de verificación: ${userDB.confirmationCode}.`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(404).json({
          user: userDB,
          confirmationCode: 'Error, reenviar código',
        });
      } else {
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

/* ---------------------------------------------------------------- */
/* ---------------------   ENVIAR NUEVO CÓDIGO   ------------------ */
/* ---------------------------------------------------------------- */
const sendNewCode = async (req, res, next) => {
  try {
    const { id } = req.params; // id user
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
      subject: 'Código de confirmación',
      text: `Hola, ${userDB.name}. Has cambiado tu email de Can Agility, aquí tienes tu nuevo código de verificación: ${userDB.confirmationCode} `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(404).json({
          user: userDB,
          confirmationCode: 'Error al reenviar código',
        });
      } else {
        console.log('Email enviado: ' + info.response);
        return res.status(200).json({
          email: 'enviado',
          code: userDB.confirmationCode,
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* ---------------------   VERIFICAR CÓDIGO   --------------------- */
/* ---------------------------------------------------------------- */
const verificarCodigo = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const userFalse = await User.findById(id);
    console.log(userFalse);
    const { code } = req.body;
    if (userFalse.confirmationCode === code) {
      try {
        await User.findByIdAndUpdate(id, { check: true });
      } catch (error) {
        return res.status(404).json(error.message);
      }
      const checkUser = await User.findById(id);
      return res.status(200).json({
        testCheckOk: checkUser.check == true ? true : false,
      });
    } else {
      const userNotExist = await User.findByIdAndDelete(id);
      if (userNotExist) {
        if (await User.findById(id)) {
          next('Error en el borrado');
        } else {
          deleteImgCloudinary(userFalse.image);
          return res.status(200).json({
            userNotExist,
            check: false,
            delete: (await User.findById(userNotExist._id))
              ? 'Error al eliminar el usuario'
              : 'Eliminación de usuario correcta',
          });
        }
        return res.status(200).json({
          deleteObject: deleteUser,
          test: (await User.findById(id)) ? 'Error al eliminar el usuario' : 'Eliminación de usuario correcta',
        });
      } else {
        return res.status(404).json('No se ha encontrado el usuario');
      }
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* ------------------------   LOGIN USER   ------------------------ */
/* ---------------------------------------------------------------- */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userToLogin = await User.findOne({ email });

    if (userToLogin) {
      if (bcrypt.compareSync(password, userToLogin.password)) {
        const token = generateToken(userToLogin._id, email);
        return res.status(200).json({
          user: userToLogin,
          token,
        });
      } else {
        return res.status(404).json('Las contraseñas no coinciden');
      }
    } else {
      return res.status(404).json('Usuario no registrado');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* ------------------------   AUTOLOGIN  -------------------------- */
/* ---------------------------------------------------------------- */
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
        return res.status(404).json('Las contraseñas no coinciden');
      }
    } else {
      return res.status(404).json('Usuario no registrado');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* ---------------------   FORGOT PASSWORD   ---------------------- */
/* ---------------------------------------------------------------- */
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userDb = await User.findOne({ email });
    if (userDb) {
      return res.redirect(
        307,
        `https://localhost:8080/api/v1/user/sendPassword/${userDb._id}`
      );
    } else {
      return res.status(404).json('uUuario no registrado');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* ------------------   REDIRECT - SEND PASSWORD   ---------------- */
/* ---------------------------------------------------------------- */
const sendPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const EMAIL = process.env.EMAIL;
    const PASSWORD = process.env.PASSWORD;

    let password2 = randomPassword();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    const mailOptions = {
      from: EMAIL,
      to: user.email,
      subject: 'Contraseña nueva de Can Agility',
      text: `Hola, ${user.name}. Te enviamos una contraseña de un solo uso: ${password2}. Por favor, cámbiala una vez inicies sesión.`,
    };

    transporter.sendMail(mailOptions, async (error) => {
      if (error) {
        return res.status(404).json('No se ha enviado el email');
      } else {
        const newPasswordHash = bcrypt.hashSync(password2, 10);
        await User.findByIdAndUpdate(id, { password: newPasswordHash });
        const userUpdate = await User.findById(id);
        if (bcrypt.compareSync(password2, userUpdate.password)) {
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
      }
    });
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* -----------------------   CHANGE PASSWORD   -------------------- */
/* ---------------------------------------------------------------- */
const changePassword = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;
    const { _id } = req.user;
    if (bcrypt.compareSync(password, req.user.password)) {
      const newPasswordHashed = bcrypt.hashSync(newPassword, 10);
      await User.findByIdAndUpdate(_id, { password: newPasswordHashed });
      const newUserUpdate = await User.findById(_id);
      if (bcrypt.compareSync(newPassword, newUserUpdate.password)) {
        return res.status(200).json({
          userUpdate: true,
        });
      } else {
        return res.status(200).json({
          userUpdate: false,
        });
      }
    } else {
      return res.status(404).json('Las contraseñas no coinciden');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* -------------------------   UPDATE USER   ---------------------- */
/* ---------------------------------------------------------------- */
const update = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();
    const newUser = new User(req.body);
    if (req.file) {
      newUser.image = req.file.path;
    }
    newUser._id = req.user._id;
    newUser.password = req.user.password;
    newUser.rol = req.user.rol;
    newUser.gender = req.user.gender;
    newUser.pruebas = req.user.pruebas;
    newUser.scores = req.user.scores;
    newUser.email = req.user.email;
    newUser.confirmationCode = req.user.confirmationCode;
    newUser.check = req.user.check;
    await User.findByIdAndUpdate(req.user._id, newUser);
    if (req.file) {
      deleteImgCloudinary(req.user.image);
    }

    const updateUser = await User.findById(req.user._id);
    const updateKeys = Object.keys(req.body);

    const testUpdate = [];
    updateKeys.forEach((item) => {
      if (updateUser[item] === req.body[item]) {
        testUpdate.push({
          [item]: true,
        });
      }
    });

    if (req.file) {
      updateUser.image == req.file.path
        ? testUpdate.push({
            file: true,
          })
        : testUpdate.push({
            file: false,
          });
    }
    return res.status(200).json({
      testUpdate,
    });
  } catch (error) {
    deleteImgCloudinary(catchImg);
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* ------------------------   UPDATE EMAIL   ---------------------- */
/* ---------------------------------------------------------------- */
const updateEmail = async (req, res, next) => {
  try {
    await User.syncIndexes();
    let confirmationCode = randomCode();
    const { email } = req.body;
    if (req.user.email != email) {
      await User.findByIdAndUpdate(req.user._id, {
        email: email,
        check: false,
        confirmationCode: confirmationCode,
      });
      return res.redirect(
        `https://localhost:8080/api/v1/user/sendNewCode/${req.user._id}`
      );
    } else {
      return res.status(404).json('Debes introducir un email diferente al anterior');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* -----------------------   DELETE USER   ------------------------ */
/* ---------------------------------------------------------------- */
const deleteUser = async (req, res, next) => {
  try {
    const { _id, image } = req.user;
    const deleteUser = await User.findByIdAndDelete(_id);
    if (deleteUser) {
      if (await User.findById(_id)) {
        next('Error al borrar usuario');
      } else {
        deleteImgCloudinary(image);

        const prueba = await Prueba.find({ dog: _id });
        prueba.forEach(async (element) => {
          await element.updateOne({
            $pull: { dog: _id },
          });
        });

        req.user.scores.forEach(async (element) => {
          await Scores.findByIdAndDelete(element._id);
          await Prueba.updateMany(
            { score: element },
            { $pull: { score: element } }
          );
        });
      }
      return res.status(200).json({
        deleteObject: deleteUser,
        test: (await User.findById(_id)) ? 'No se ha podido eliminar' : 'Eliminación correcta',
      });
    } else {
      return res.status(404).json('No se ha encontrado el usuario');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* -----------------------   GET DOG BY ID   ---------------------- */
/* ---------------------------------------------------------------- */
const getById = async (req, res, next) => {
  try {
    const dog = await User.findById(req.user._id).populate(
      'pruebas scores'
    );
    if (dog) {
      return res.status(200).json(dog);
    } else {
      return res
        .status(404)
        .json('El id introducido no corresponde a ningún usuario');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* -------------------------   GET ALL     ------------------------ */
/* ---------------------------------------------------------------- */
const getAll = async (req, res, next) => {
  try {
    const allDogs = await User.find({ rol: 'dog' }).populate(
      'pruebas scores'
    );
    if (allDogs) {
      return res.status(200).json(allDogs);
    } else {
      return res.status(404).json('No existen perros');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* ----------------------   GET ALL DOGS   ------------------------ */
/* ---------------------------------------------------------------- */
const getAllDog = async (req, res, next) => {
  try {
    const allDog = await User.find({ rol: 'dog' });
    if (allDog) {
      return res.status(200).json(allDog);
    } else {
      return res.status(404).json('Error al encontrar perros');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* ---------------------   GET ALL COACHES   ---------------------- */
/* ---------------------------------------------------------------- */
const getAllCoach = async (req, res, next) => {
  try {
    const allCoach = await User.find({ rol: 'coach' }).populate(
      'pruebas'
    );
    if (allCoach) {
      return res.status(200).json(allCoach);
    } else {
      return res.status(404).json('Error al encontrar monitores');
    }
  } catch (error) {
    return next(error);
  }
};

/* ---------------------------------------------------------------- */
/* -----------------------   GET MIS PERROS ----------------------- */
/* ---------------------------------------------------------------- */
const getMyDogs = async (req, res, next) => {
  try {
    const coach = await User.findById(req.user._id).populate('pruebas');
    const idPrueba = coach.pruebas[0]._id.toString();
    const prueba = await Prueba.findById(idPrueba).populate('dog');
    if (prueba) {
      return res.status(200).json(prueba);
    } else {
      return res.status(404).json('No existe la prueba');
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  sendCode,
  sendNewCode,
  verificarCodigo,
  loginUser,
  autoLogin,
  forgotPassword,
  sendPassword,
  changePassword,
  update,
  updateEmail,
  deleteUser,
  getById,
  getAll,
  getAllDog,
  getAllCoach,
  getMyDogs,
};