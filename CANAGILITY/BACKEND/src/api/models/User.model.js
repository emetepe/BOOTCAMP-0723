const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: false },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validator.isEmail, 'Email no válido'],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isStrongPassword],
      minlength: [8, 'Min 8 characters'],
    },
    gender: {
      type: String,
      enum: ['masculino', 'femenino'],
      required: true,
    },
    rol: {
      type: String,
      enum: ['dog', 'coach', 'admin'],
      default: 'dog',
    },
    image: {
      type: String,
    },
    pruebas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prueba' }],
    scores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Score' }],
    confirmationCode: {
      type: Number,
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', function (next) {
  try {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  } catch (error) {
    next('Error hashing password', error);
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;