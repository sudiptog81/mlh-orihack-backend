const Post = require("../models/post");

async function getAll(req, res) {
  const posts = await Post.find()
    .populate("user", "username")
    .populate("comment")
    .populate("like");

  if (posts) {
    res.status(200).json({
      status: "success",
      body: posts,
    });
  } else {
    res.status(500).json({
      status: "failed",
      message: "An error occured",
    });
  }
}

module.exports = {
  getAll,
};
