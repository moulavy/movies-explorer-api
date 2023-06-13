const router = require('express').Router();
const { validateUpdateUser } = require('../utils/validate/validateUser');
const { getInfoUser, updateInfoUser } = require('../controllers/users');

router.get('/me', getInfoUser);
router.patch('/me', validateUpdateUser, updateInfoUser);

module.exports = router;
