const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'Неправильный формат email.'],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};


module.exports = mongoose.model('user', userSchema);
