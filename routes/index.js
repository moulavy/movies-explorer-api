const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { validateSignUp, validateSignIn } = require('../utils/validate/validateUser');

router.post('/signin', validateSignIn, login);

router.post('/signup', validateSignUp, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/signout', logout);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Страницы не существует.'));
});

module.exports = router;
