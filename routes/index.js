const express = require("express");
const path = require("path");

const authRouter = require("./auth");

const router = express.Router();

router.use("/auth", authRouter);

/* Catch all endpoint. */
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

module.exports = router;
