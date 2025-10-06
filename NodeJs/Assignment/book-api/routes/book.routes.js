const express=require("express");
const router= express.Router();
const {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
}= require("../controllers/book.controller.js");

// Crud Routes
router.get("/", getAllBooks);
router.post("/",addBook);
router.get("/:id",getBookById);
router.put("/:id",updateBook);
router.delete("/:id",deleteBook);

module.exports=router;