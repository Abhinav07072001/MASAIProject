const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
