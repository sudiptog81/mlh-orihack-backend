const Comment = require("../models/comment");
const Post = require("../models/post");
const logger = require("../util/logger");

const createComment = async (req, res) => {
  try {
    const { post, body } = req.body;

    const comment = await Comment.create({
      post,
      body,
      user: req.user.id,
    });

    const postDoc = await Post.findById(post);
    postDoc.comments.push(comment);
    await postDoc.save();

    res.status(201).send({
      message: "Comment created successfully",
      body: comment,
    });
  } catch (err) {
    logger.error("POST /comment/create", { err });
    res.status(500).send({
      error: err.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    await Comment.findOneAndDelete({
      _id: req.body.id,
    });

    res.status(200).send({
      message: "Comment deleted successfully",
    });
  } catch (err) {
    logger.error("DELETE /comment/delete", { err });
    res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = {
  createComment,
  deleteComment,
};
