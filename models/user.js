const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  accessToken: String,
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
