const express = require("express");
const path = require("path");

const authRouter = require("./auth");
const commentRouter = require("./comment");
const likeRouter = require("./like");
const meRouter = require("./me");

const isAuthenticated = require("../middleware/auth");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/comment", isAuthenticated, commentRouter);
router.use("/like", isAuthenticated, likeRouter);
router.use("/me", isAuthenticated, meRouter);

/* Catch all endpoint. */
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

module.exports = router;
