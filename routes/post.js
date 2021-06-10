const express = require("express");
const { getAll } = require("../controllers/post");

const router = express.Router();

router.get("/", getAll);

module.exports = router;
