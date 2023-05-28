const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const regexURL = require('../utils/regex')

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(regexURL).required(),
    trailerLink: Joi.string().regex(regexURL).required(),
    thumbnail: Joi.string().regex(regexURL).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nammeEN: Joi.string().required()
  }),
}), createMovie);
router.delete('/id', celebrate({
  params: Joi.object().keys({
    movieSaveId: Joi.string().hex().length(24).required(),
  }),
}), deleteMovie);

module.exports = router;