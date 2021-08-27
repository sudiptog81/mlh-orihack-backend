const Post = require("../models/post");
const logger = require("../util/logger");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "user comments likes",
        populate: {
          path: "user",
        },
      })
      .sort({ createdAt: -1 });

    res.status(201).send({
      message: `Found ${posts.length} post(s).`,
      body: posts,
    });
  } catch (err) {
    logger.error("GET /post", { err });
    res.status(500).send({
      error: err.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, body } = req.body;

    const post = Post.create({
      user: req.user.id,
      title,
      body,
    });

    res.status(201).send({
      message: "Post created successfully",
      body: post,
    });
  } catch (err) {
    logger.error("POST /post/create", { err });
    res.status(500).send({
      error: err.message,
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.body;
    const post = await Post.findById({ _id: id })
      .populate("user", "username")
      .populate("comment")
      .populate("like");

    res.status(201).send({
      message: `Post found`,
      body: post,
    });
  } catch (err) {
    logger.error("POST /post/findById", { err });
    res.status(500).send({
      error: err.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findOneAndDelete({
      _id: req.body.id,
    });

    res.status(200).send({
      message: "Post deleted successfully",
    });
  } catch (err) {
    logger.error("POST /post/delete", { err });
    res.status(500).send({
      error: err.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id, title, body } = req.body;
    const post = await Post.findById({ _id: id })
    await Post.updateOne({ _id: id },
      {
        title: title || post.title,
        body: body || post.body
      });

    res.status(201).send({
      message: "Post updated successfully"
      // check if update needs a response
    });
  } catch (err) {
    logger.error("POST /post/update", { err });
    res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  deletePost,
  updatePost
};
