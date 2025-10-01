const { readBooks, writeBooks } = require("../models/bookModel");

exports.getAllBooks = (req, res) => {
  const books = readBooks();
  res.json(books);
};

exports.addBook = (req, res) => {
  const books = readBooks();
  const newBook = {
    id: books.length + 1,
    ...req.body,
    status: "available",
    borrowedBy: null,
    borrowedDate: null,
  };
  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
};

exports.updateBook = (req, res) => {
  let books = readBooks();
  const { id } = req.params;
  const bookIndex = books.findIndex((b) => b.id == id);

  if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });

  books[bookIndex] = { ...books[bookIndex], ...req.body };
  writeBooks(books);
  res.json(books[bookIndex]);
};

exports.deleteBook = (req, res) => {
  let books = readBooks();
  const { id } = req.params;

  const filtered = books.filter((b) => b.id != id);
  if (filtered.length === books.length) {
    return res.status(404).json({ error: "Book not found" });
  }

  writeBooks(filtered);
  res.json({ message: "Book deleted successfully" });
};
