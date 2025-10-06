const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ➤ Create new user
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ➤ Add address to a user
router.post("/users/:userId/address", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.addresses.push(req.body);
    await user.save();

    res.status(201).json({ message: "Address added", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ➤ Get all users summary
router.get("/users/summary", async (req, res) => {
  try {
    const users = await User.find();

    const totalUsers = users.length;
    const totalAddresses = users.reduce(
      (sum, user) => sum + user.addresses.length,
      0
    );

    const summary = users.map((u) => ({
      name: u.name,
      numberOfAddresses: u.addresses.length,
    }));

    res.json({ totalUsers, totalAddresses, summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ Get full details of one user
router.get("/users/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
