const passport = require("passport");
require("../passport");

function initPassport(app) {
  app.use(passport.initialize());
  app.use(passport.session());
}

exports.default = initPassport;
