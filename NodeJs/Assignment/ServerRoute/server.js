const express=require("express");
const app=express();

const PORT=3000;

app.get("/home", (req,res)=>{
    res.status(200).send("<h1>Welcome to the Home Page</h1>")
})

app.get("/aboutus",(req,res)=>{
    res.status(200).json({message: "Welcome to the About Page"})
});

app.get("/contactus", (req,res)=>{
    res.status(200).json({
        email:"abhisharma12@gmail.com",
        phone:"123-456-789",
        address:"xyz-block"
    })
});

// handle undefined routes
app.use((req,res)=>{
    res.status(404).send("<h2>404 Not Found </h2>");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});