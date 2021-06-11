const express = require("express");
const { commentController } = require("../controllers");

const router = express.Router();

router.post("/create", commentController.createComment);
router.post("/delete", commentController.deleteComment);

module.exports = router;
