const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");

function readBooks() {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data).books;
}

function writeBooks(books) {
  fs.writeFileSync(dbPath, JSON.stringify({ books }, null, 2));
}

module.exports = { readBooks, writeBooks };
