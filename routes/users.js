const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {getInfoUser, updateInfoUser}=require('../controllers/users')

router.get('/me', getInfoUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email:Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required()
  }),
}) ,updateInfoUser);