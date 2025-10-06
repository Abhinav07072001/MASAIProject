const {readBooks, writeBooks}= require('../models/book.model.js');

// CRUD Operations + serach 
function getAllBooks(req, res){
    let books=readBooks();
    res.status(200).json(books);
}

// Search book

// Add book
function addBook(req,res){
    let books=readBooks();
    let newBook=req.body;

    newBook.id=books.length ? books[books.length - 1].id +1 : 1;

    books.push(newBook);
    writeBooks(books);
    res.status(200).json(newBook);
}



// Get book by id or get one book only
function getBookById(req,res){
    let books=readBooks();
    const id= Number(req.params.id)
    let book= books.find(t=> t.id ===id);

    if(book){
        res.status(200).json(book)
    }else{
        res.status(404).json({msg: "404 one book not found"});
    }
}
// update book
function updateBook(req, res){
    let books=readBooks();
    const id=Number(req.params.id);
    let index=books.findIndex(t=> t.id===id);

    if(index!==-1){
        books[index]={...books[index], ...req.body};
        writeBooks(books);
        res.status(200).json(books);
    }else{
        res.status(404).json({msg:"404 book not update"});
    }
}
// delete by id
function deleteBook(req,res){
    let books=readBooks();
    const id=Number(req.params.id);
    let index=books.findIndex(t=> t.id===id);

    if(index!==-1){
        let deleted= books.splice(index, 1);
        writeBooks(books);
        res.status(200).json(deleted[0]);
    }else{
        res.status(404).json({msg:"404 book not deleted"});
    }
}

module.exports={
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};