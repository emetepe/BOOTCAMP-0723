//! ----- IMPORTACIONES
const bcrypt = require('bcrypt');
const validator = require('validator');
const mongoose = require('mongoose');

//! ----- MONGOOSE SCHEMA

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validator.isEmail, 'Email not valid'],
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isStrongPassword],
    },
    gender: {
      type: String,
      enum: ['Hombre', 'Mujer', 'Otros'],
      required: true,
    },
    rol: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    confirmationCode: {
      type: Number,
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    dogsFav: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Dog', default: [] },
    ],
    ownDogs: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Dog', default: [] },
    ],
    breedsFav: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Breed', default: [] },
    ],
  },
  {
    timestamps: true,
  }
);

//! --------- PRESAVE PARA ENCRYPTAR LA CONTRASEÑA
// UserSchema.pre('save', function (next) {
UserSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next('Error hashing password', error);
  }
});

//! ----- CREAR MODELO
const User = mongoose.model('User', UserSchema);

//! ------ EXPORTARLO

module.exports = User;
