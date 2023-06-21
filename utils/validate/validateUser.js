const { celebrate, Joi } = require('celebrate');

module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().error((errors) => {
      errors.forEach((err) => {
        err.message = 'Пожалуйста, введите корректный email';
      });
      return errors;
    }),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().error((errors) => {
      errors.forEach((err) => {
        err.message = 'Пожалуйста, введите корректный email';
      });
      return errors;
    }),
    password: Joi.string().required(),
  }),
});

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().error((errors) => {
      errors.forEach((err) => {
        err.message = 'Пожалуйста, введите корректный email';
      });
      return errors;
    }),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});
