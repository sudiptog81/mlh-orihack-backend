const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
