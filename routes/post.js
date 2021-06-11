const express = require("express");
const { getAll, add, findById, deletePost } = require("../controllers/post");

const router = express.Router();

router.get("/", getAll);
router.post("/", add);
router.get("/:id", findById);
router.delete("/:postId", deletePost);

module.exports = router;
