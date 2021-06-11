const Like = require("../models/like");
const Post = require("../models/post");
const logger = require("../util/logger");

const createLike = async (req, res) => {
  try {
    const { post } = req.body;

    const like = await Like.create({
      post,
      user: req.user.id,
    });

    const postDoc = await Post.findById(post);
    postDoc.likes.push(like);
    await postDoc.save();

    res.status(201).send({
      message: "Post liked successfully",
      body: like,
    });
  } catch (err) {
    logger.error("POST /like/create", { err });
    res.status(500).send({
      error: err.message,
    });
  }
};

const deleteLike = async (req, res) => {
  try {
    await Like.findOneAndDelete({
      _id: req.body.id,
    });

    res.status(200).send({
      message: "Post unliked successfully",
    });
  } catch (err) {
    logger.error("DELETE /like/delete", { err });
    res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = {
  createLike,
  deleteLike,
};
