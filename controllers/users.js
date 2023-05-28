require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
    email,password:hash,name
    }))
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже существует'));
      } if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      }
      return next(err);
  })
}

module.exports.login = (req, res, next) => {
  console.log("Зашли в логин")
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      console.log({ email, password });
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key-123', { expiresIn: '7d' });
      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true, // чтобы к кукам не было доступа из JavaScript
        sameSite: true,//запрос исходит от того же домена
      })
        .send({ message: "Успешно вошли!" });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('token').send('Вышли');
};

//возвращает информацию о пользователе
module.exports.getInfoUser = (req, res, next) => {
  const { _id } = req.user._id;
  User.findById(_id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Пользователь по указанному id не найден'))
      }
      return next(err);
    });
};

module.exports.updateInfoUser = (req, res, next) => {
  const { _id } = req.user._id;
  const { email, name } = req.body;
  User.findByIdAndUpdate(_id,{email,name},{new:true,runValidators:true})
    .orFail()
    .then((user) => { res.send({ data: user }) })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Пользователь по указанному id не найден.'));
      }
      else if (err instanceof mongoose.Error.ValidationError)
      {
        return next(new BadRequestError('При обновлении информации пользователя переданы некорректные данные'))
      }
      return next(err);
  })
}