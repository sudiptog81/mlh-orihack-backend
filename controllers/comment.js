const Comment = require("../models/comment");
const logger = require("../util/logger");

const createComment = async (req, res) => {
  try {
    const { post, body } = req.body;

    const comment = Comment.create({
      post,
      body,
      user: req.user.id,
    });

    res.status(201).send({
      message: "Comment created successfully",
      body: comment,
    });
  } catch (err) {
    logger.error("Error creating comment", { err });
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
    logger.error("Error deleting comment", { err });
    res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = {
  createComment,
  deleteComment,
};
