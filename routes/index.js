const express = require("express");
const path = require("path");

const authRouter = require("./auth");
const postRouter = require("./post");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/post", postRouter);

/* Catch all endpoint. */
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

module.exports = router;
