const mongoose = require('mongoose');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  const  userId  = req.user._id;
  Movie.find({ owner: userId })
    .then((movies) => {
      res.send(movies)
    })
  .catch(next)
}

module.exports.createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;
  const userId = req.user._id;
  Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,owner:userId })
    .then((movie) => {
      res.status(201).send({ data: movie });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании фильма.'))
      }
      return next(err);
    });
}

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieSaveId)
    .orFail()
    .then((movie) => {
      if (movie.owner._id.toString() !== req.user._id) {
        return next(new ForbiddenError('Нельзя удалить чужой фильм.'));
      }
      return Movie.deleteOne({ _id: movie._id })
        .then((movieDel) => {
          res.send({ data: movie });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Фильм по указанному id не найден в сохраненных.'))
      }
      return next(err);
    });
}