const { auth } = require('./auth');
const { validateId } = require('./verifyId');
const { validateRequest } = require('./validateRequest');
const upload = require('./upload');
module.exports = {
  auth,
  validateId,
  validateRequest,
  upload
};
