const User = require('../api/models/User.model');
const { verifyToken } = require('../utils/token');
const dotenv = require('dotenv');
dotenv.config();

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return next(new Error('Acceso no autorizado'));
  }
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(error);
  }
};

const isAuthAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return next(new Error('Acceso no autorizado'));
  }
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (req.user.rol !== 'admin') {
      return next(new Error('Acceso no autorizado, solo para administradores'));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

const isAuthDog = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return next(new Error('Acceso no autorizado'));
  }
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (req.user.rol !== 'dog') {
      return next(new Error('Acceso no autorizado, solo para mascotas'));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

const isAuthCoach = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return next(new Error('Acceso no autorizado'));
  }
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (req.user.rol !== 'coach') {
      return next(new Error('Acceso no autorizado, solo para monitores'));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isAuth,
  isAuthAdmin,
  isAuthDog,
  isAuthCoach,
};