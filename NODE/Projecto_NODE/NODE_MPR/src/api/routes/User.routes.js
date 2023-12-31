const {
  isAuth,
  isAuthAdmin,
  isAuthUser,
} = require('../../middleware/auth.middleware');
const { upload } = require('../../middleware/files.middleware');

const {
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
  update,
  addFavDog,
  addFavBreed,
  getAllUsers,
  getAllAdmins,
  userTopFav,
} = require('../controllers/User.controllers');

const UserRoutes = require('express').Router();

UserRoutes.post('/registerUtil', upload.single('image'), register);
UserRoutes.post('/register', upload.single('image'), registerSlow);
UserRoutes.post('/login', login);
UserRoutes.post('/login/autologin', autoLogin);
UserRoutes.post('/resend', resendCode);
UserRoutes.post('/check', checkNewUser);
UserRoutes.patch('/forgotpassword/forgotpassword', changePassword);
UserRoutes.patch('/changepassword', [isAuth], modifyPassword);
UserRoutes.patch('/update/update', [isAuth], upload.single('image'), update);
UserRoutes.patch('/addFavDog/', addFavDog);
UserRoutes.patch('/addFavBreed', [isAuthUser], addFavBreed);
UserRoutes.get('/getAllUsers', [isAuthAdmin], getAllUsers);
UserRoutes.get('/getAllAdmins', [isAuthAdmin], getAllAdmins);
UserRoutes.get('/userTopFav', userTopFav);

//! --------------------- rutas que sirven como un redirects ---------------------
UserRoutes.post('/register/sendMail/:id', sendCode);
UserRoutes.patch('/sendPassword/:id', sendPassword);

module.exports = UserRoutes;
