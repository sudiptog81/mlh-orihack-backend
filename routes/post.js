const express = require("express");
const { getAll, add } = require("../controllers/post");

const router = express.Router();

router.get("/", getAll);
router.post("/", add);

module.exports = router;
