const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// POST /api/users/add-user
router.post('/add-user', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    const newUser = new User({ name, email });
    await newUser.save();

    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email must be unique' });
    } else {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
});

module.exports = router;
