const express=require("express");

const app= express();

// Routes define karo
app.get("/home",(req,res)=>{
    res.send("This is a Home Page");
});

app.get("/contactus",(req,res)=>{
    res.send("This is a contactUs Page");
});

app.get("/about",(req,res)=>{
    res.json({msg:"Welcome to the About Page"})
})



// Listen/port define
app.listen(3000,()=>{
    console.log("Server is running on localhost 3000")
})