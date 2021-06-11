const express = require("express");
const { likeController } = require("../controllers");

const router = express.Router();

router.post("/create", likeController.createLike);
router.post("/delete", likeController.deleteLike);

module.exports = router;
