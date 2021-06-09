const express = require("express");
const passport = require("passport");

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
    res.redirect("/dashboard");
  }
);

/**
 * On authentication error route.
 */
router.get("/error", (req, res) => res.send("Unknown Error"));

/**
 * Logout user.
 */
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
