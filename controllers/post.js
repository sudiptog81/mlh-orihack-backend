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

async function add(req, res) {
  const { userId, title, body } = req.body;

  let post = new Post({
    user: userId,
    title,
    body,
  });

  try {
    post = await post.save();

    if (!post) {
      return res.status(400).json({
        status: "failed",
        message: "Operation failed",
      });
    }
    return res.status(200).json({
      status: "success",
      body: post,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: "An error occured",
      error: err,
    });
  }
}

async function findById(req, res) {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        status: "failed",
        message: "Post not found",
      });
    }
    return res.status(200).json({
      status: "success",
      body: post,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: "An error occured",
      error: err,
    });
  }
}

module.exports = {
  getAll,
  add,
  findById,
};
