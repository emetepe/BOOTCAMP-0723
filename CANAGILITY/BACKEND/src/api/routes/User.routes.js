const express = require('express');
const {
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
} = require('../controllers/User.controllers');
const { upload } = require('../../middleware/files.middleware');
const {
  isAuth,
  isAuthDog,
  isAuthAdmin,
  isAuthCoach,
} = require('../../middleware/auth.middleware');
const UserRoutes = express.Router();

UserRoutes.post('/register', upload.single('image'), register);
UserRoutes.post('/confirm/:id', verificarCodigo);
UserRoutes.post('/login', loginUser);
UserRoutes.post('/resendCode', sendNewCode);
UserRoutes.delete('/', [isAuth], deleteUser);
UserRoutes.patch('/changePassword', [isAuth], changePassword);
UserRoutes.patch('/forgotpassword', forgotPassword);
UserRoutes.patch('/update', [isAuth], upload.single('image'), update);
UserRoutes.get('/getById', [isAuthDog], getById);
UserRoutes.get('/getAll', [isAuthAdmin], getAll);
UserRoutes.get('/updateEmail', [isAuth], updateEmail);
UserRoutes.get('/getAllDogs', [isAuthAdmin], getAllDog);
UserRoutes.get('/getAllCoaches', [isAuthAdmin], getAllCoach);
UserRoutes.post('/login/autologin', autoLogin);
UserRoutes.get('/getMyDogs', [isAuthCoach], getMyDogs);
//-------------------------redirects------------------------
UserRoutes.post('/register/sendMail/:id', sendCode);
UserRoutes.patch('/sendPassword/:id', sendPassword);
UserRoutes.get('/sendNewCode/:id', sendNewCode);

module.exports = UserRoutes;