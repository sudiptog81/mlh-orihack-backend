/**
 * Check user logged in status.
 */
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send({
      message: "Not Logged In",
    });
  }
};

module.exports = isLoggedIn;
