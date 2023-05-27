require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');


//возвращает информацию о пользователе
module.exports.getInfoUser = (req, res, next) => {
  const { _id } = req.user._id;
  User.findById(_id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
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
      if (err instanceof DocumentNotFoundError) {
        return next(new NotFoundError('Пользователь по указанному id не найден.'));
      }
      else if (err instanceof ValidationError)
      {
        return next(new BadRequestError('При обновлении информации пользователя переданы некорректные данные'))
      }
      return next(err);
  })
}