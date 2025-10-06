const mongoose = require("mongoose");
const validator = require("validator");

// Nested profile schema
const profileSchema = new mongoose.Schema({
  profileName: {
    type: String,
    required: true,
    enum: ["fb", "twitter", "github", "instagram"],
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isURL(value);
      },
      message: "Invalid URL format",
    },
  },
});

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email format"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  profiles: [profileSchema], // nested subdocument array
});

const User = mongoose.model("User", userSchema);
module.exports = User;
