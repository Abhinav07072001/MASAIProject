const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const router = express.Router();

// Step 1️⃣: GitHub Login Redirect
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

// Step 2️⃣: GitHub Callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    const { id, username, emails } = req.user;
    const email = emails && emails[0] ? emails[0].value : null;

    // Check if user exists or create new one
    let user = await User.findOne({ githubId: id });
    if (!user) {
      user = await User.create({ githubId: id, username, email });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful!", token });
  }
);

module.exports = router;
