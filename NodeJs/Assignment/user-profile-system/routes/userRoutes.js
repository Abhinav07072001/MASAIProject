const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ➤ 1. POST /add-user
router.post("/add-user", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ➤ 2. POST /add-profile/:userId
router.post("/add-profile/:userId", async (req, res) => {
  try {
    const { profileName, url } = req.body;
    const user = await User.findById(req.params.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if that profileName already exists for this user
    const existing = user.profiles.find((p) => p.profileName === profileName);
    if (existing)
      return res.status(400).json({ message: "Profile already exists" });

    user.profiles.push({ profileName, url });
    await user.save();

    res.status(201).json({ message: "Profile added", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ➤ 3. GET /get-users
router.get("/get-users", async (req, res) => {
  try {
    const { profile } = req.query;

    let users = await User.find();

    // Filter users having specific profile
    if (profile) {
      users = users.filter((user) =>
        user.profiles.some((p) => p.profileName === profile)
      );
    }

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ 4. GET /search?name=Alice&profile=fb
router.get("/search", async (req, res) => {
  try {
    const { name, profile } = req.query;
    const user = await User.findOne({ name });

    if (!user) return res.status(404).json({ message: "User not found" });

    const foundProfile = user.profiles.find(
      (p) => p.profileName === profile
    );

    if (foundProfile) {
      return res.json({ user: user.name, profile: foundProfile });
    } else {
      return res.json({
        message: "User found, but profile not found",
        user,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ 5. PUT /update-profile/:userId/:profileName
router.put("/update-profile/:userId/:profileName", async (req, res) => {
  try {
    const { url } = req.body;
    const { userId, profileName } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = user.profiles.find(
      (p) => p.profileName === profileName
    );

    if (!profile)
      return res.status(404).json({ message: "Profile not found" });

    profile.url = url;
    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ➤ 6. DELETE /delete-profile/:userId/:profileName
router.delete("/delete-profile/:userId/:profileName", async (req, res) => {
  try {
    const { userId, profileName } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const initialLength = user.profiles.length;
    user.profiles = user.profiles.filter(
      (p) => p.profileName !== profileName
    );

    if (user.profiles.length === initialLength)
      return res.status(404).json({ message: "Profile not found" });

    await user.save();

    res.json({ message: "Profile deleted successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
