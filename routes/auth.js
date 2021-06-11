const createError = require("http-errors");
const express = require("express");
const passport = require("passport");

const logger = require("../util/logger");

const router = express.Router();

/**
 * Github authentication route.
 */
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

/**
 * On authentication success route.
 */
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/error" }),
  (req, res) => {
    res.redirect(
      `${
        process.env.NODE_ENV === "development" ? "http://localhost:8080" : ""
      }/?success=true`
    );
  }
);

/**
 * On authentication error route.
 */
router.get("/error", (req, res, next) => {
  logger.error("Failed to authenticate user");
  next(createError(401, "Failed to authenticate"));
});

/**
 * Logout user.
 */
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect(
      `${
        process.env.NODE_ENV === "development" ? "http://localhost:8080" : ""
      }/`
    );
  });
});

module.exports = router;
