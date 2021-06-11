const express = require("express");

const { meController } = require("../controllers");

const router = express.Router();

router.get("/", meController.getUser);
module.exports = router;
