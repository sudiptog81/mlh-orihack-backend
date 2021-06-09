const express = require("express");
const passport = require("passport");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.send({
    message: "/",
  });
});
/* GET dashboard page. */
router.get("/dashboard", (req, res) => {
  res.send({
    message: "/dashboard",
  });
});

/**
 * On authentication error route.
 */
router.get("/auth/error", (req, res) => res.send("Unknown Error"));
/**
 * Github authentication route.
 */
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
/**
 * On authentication success route.
 */
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/error" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

/**
 * Logout user.
 */
router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

module.exports = router;
