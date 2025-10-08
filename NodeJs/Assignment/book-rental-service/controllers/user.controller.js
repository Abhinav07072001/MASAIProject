const User = require('../models/user.model');
const Book = require('../models/book.model');

// Add User
exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and Email are required' });
    }

    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
};

// Get User Rentals
exports.getUserRentals = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('rentedBooks');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user, rentedBooks: user.rentedBooks });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
