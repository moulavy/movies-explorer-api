const mongoose = require('mongoose');
const regexURL = require('../utils/regex');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validator: {
        validator: (value) => regexURL.test(value),
        message: 'Неправильный формат ссылки',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validator: {
        validator: (value) => regexURL.test(value),
        message: 'Неправильный формат ссылки',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validator: {
        validator: (value) => regexURL.test(value),
        message: 'Неправильный формат ссылки',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
);
module.exports = mongoose.model('movie', movieSchema);
