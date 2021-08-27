const express = require("express");
const { postController } = require("../controllers");

const router = express.Router();

router.get("/", postController.getAllPosts);
router.post("/create", postController.createPost);
router.post("/findById", postController.getPostById); // should be get
router.post("/delete", postController.deletePost);
router.post("/update", postController.updatePost);

module.exports = router;
