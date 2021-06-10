const express = require("express");
const path = require("path");
const authRouter = require("./auth");
const dashboardRouter = require("./dashboard");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

router.use("/auth", authRouter);
router.use("/dashboard", dashboardRouter);

module.exports = router;
