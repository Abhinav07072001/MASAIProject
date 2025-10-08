const Book = require('../models/book.model');
const User = require('../models/user.model');

// Add Book
exports.addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }

    const book = new Book({ title, author, genre });
    await book.save();

    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Rent Book
exports.rentBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book)
      return res.status(404).json({ message: 'User or Book not found' });

    // Prevent duplicate rental
    if (user.rentedBooks.includes(bookId))
      return res.status(400).json({ message: 'Book already rented by user' });

    user.rentedBooks.push(bookId);
    book.rentedBy.push(userId);

    await user.save();
    await book.save();

    res.status(200).json({ message: 'Book rented successfully', user, book });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Return Book
exports.returnBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book)
      return res.status(404).json({ message: 'User or Book not found' });

    user.rentedBooks = user.rentedBooks.filter(id => id.toString() !== bookId);
    book.rentedBy = book.rentedBy.filter(id => id.toString() !== userId);

    await user.save();
    await book.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Get Book Renters
exports.getBookRenters = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId).populate('rentedBy');

    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ book, renters: book.rentedBy });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Update Book
exports.updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true });

    if (!updatedBook)
      return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book updated successfully', updatedBook });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook)
      return res.status(404).json({ message: 'Book not found' });

    // Remove book reference from all users
    await User.updateMany({}, { $pull: { rentedBooks: bookId } });

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
