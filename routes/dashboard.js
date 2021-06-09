const express = require("express");

const router = express.Router();

/* GET Dashboard page. */
router.get("/", (req, res) => {
  res.send({
    message: "/Dashboard",
  });
});

module.exports = router;
