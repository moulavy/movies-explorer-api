const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateIdMovie, validateCreateMovie } = require('../utils/validate/validateMovie');

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:movieSaveId', validateIdMovie, deleteMovie);

module.exports = router;
