const createError = require("http-errors");

/**
 * Check user logged in status.
 */
const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(createError(401, "Unauthenticated"));
  }
};

module.exports = isAuthenticated;
