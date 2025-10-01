module.exports = (action) => {
  return (req, res, next) => {
    const now = new Date().toISOString();
    if (action === "borrow") {
      console.log(`[${now}] ${req.body.readerName} borrowed book ID ${req.params.id}`);
    } else if (action === "return") {
      console.log(`[${now}] Book ID ${req.params.id} returned by ${req.body.readerName || "Unknown"}`);
    }
    next();
  };
};
