const express=require("express");
const app=express();
const booksRoutes=require("./routes/book.routes.js");
app.use(express.json());
app.use("/books",booksRoutes);

// handled undefined error
app.use((req,res)=>{
    res.status(404).json({msg:"404 no link found"});
})


app.listen(3000,()=>{
    console.log("Port is working on 3000");
})