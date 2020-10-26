const { validationResult } = require('express-validator');

function handleValidationErrors(req, res, next) {
  const validationRes = validationResult(req);
  if (validationRes.isEmpty()) {

    return next();
  }
  
  res.status(400).json({ errors: validationRes.errors, });
}

module.exports = handleValidationErrors;