const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;
const CONFLICT_ERROR_CODE = 409;
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const ALLOWED_CORS = [
  'http://localhost:3000',
  'http://movies.moulavy.nomoredomains.rocks',
  'https://movies.moulavy.nomoredomains.rocks',
];

module.exports = {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  UNAUTHORIZED_CODE,
  CONFLICT_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  DEFAULT_ALLOWED_METHODS,
  ALLOWED_CORS,
};
