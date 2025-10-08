const express = require('express');
const router = express.Router();
const Profile = require('../models/profile.model');
const User = require('../models/user.model');

// POST /api/profiles/add-profile
router.post('/add-profile', async (req, res) => {
  try {
    const { bio, socialMediaLinks, user } = req.body;

    // check valid user
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ensure user doesn't already have a profile
    const existingProfile = await Profile.findOne({ user });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile for this user already exists' });
    }

    const newProfile = new Profile({ bio, socialMediaLinks, user });
    await newProfile.save();

    res.status(201).json({ message: 'Profile added successfully', profile: newProfile });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// GET /api/profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', 'name email');
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

module.exports = router;
