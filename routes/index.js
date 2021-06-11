const createError = require("http-errors");
const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  if (!req.user) {
    next(createError(401, "Unauthorized"));
  }

  res.send({
    message: "/",
  });
});

module.exports = router;
