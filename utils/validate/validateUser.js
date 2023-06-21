const { celebrate, Joi } = require('celebrate');

module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().error(new Error('Пожалуйста, введите корректный email')),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().error(new Error('Пожалуйста, введите корректный email')),
    password: Joi.string().required(),
  }),
});

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().error(new Error('Пожалуйста, введите корректный email')),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});
