const express = require("express");
const { getAll, add, findById } = require("../controllers/post");

const router = express.Router();

router.get("/", getAll);
router.post("/", add);
router.get("/:id", findById);

module.exports = router;
