const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    accessToken: String,
    refreshToken: String,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: String,
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    avatar: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
