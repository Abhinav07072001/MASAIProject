const { readBooks, writeBooks } = require("../models/bookModel");

exports.getAvailableBooks = (req, res) => {
  const books = readBooks();
  res.json(books.filter((b) => b.status === "available"));
};

exports.borrowBook = (req, res) => {
  const { id } = req.params;
  const { readerName } = req.body;

  let books = readBooks();
  const book = books.find((b) => b.id == id);

  if (!book) return res.status(404).json({ error: "Book not found" });
  if (book.status !== "available") return res.status(400).json({ error: "Book already borrowed" });

  book.status = "borrowed";
  book.borrowedBy = readerName;
  book.borrowedDate = new Date().toISOString();

  writeBooks(books);
  res.json(book);
};

exports.returnBook = (req, res) => {
  const { id } = req.params;
  let books = readBooks();
  const book = books.find((b) => b.id == id);

  if (!book) return res.status(404).json({ error: "Book not found" });
  if (book.status !== "borrowed") return res.status(400).json({ error: "Book is not borrowed" });

  book.status = "available";
  book.borrowedBy = null;
  book.borrowedDate = null;

  writeBooks(books);
  res.json({ message: "Book returned successfully", book });
};
