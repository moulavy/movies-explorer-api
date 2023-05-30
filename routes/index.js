const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser, logout } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30)
  }),
}), createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/signout', logout);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Страницы не существует.'));
});

module.exports = router;