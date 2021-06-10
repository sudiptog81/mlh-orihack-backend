const express = require("express");
const authRouter = require("./auth");
const dashboardRouter = require("./dashboard");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.send({
    message: "/",
  });
});

router.use("/auth", authRouter);
router.use("/dashboard", dashboardRouter);

module.exports = router;
