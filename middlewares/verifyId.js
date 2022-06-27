const { isValidObjectId } = require('mongoose');

const validateId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next({ status: 400, message: 'Bad id' });
  }
  next();
};

module.exports = {
  validateId,
};
