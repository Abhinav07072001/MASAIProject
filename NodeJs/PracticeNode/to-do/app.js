const express=require("express");
const connectDB= require('./config/db');

const app=express();
app.use(express.json());

// connect Db
connectDB();

const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server start working on ${PORT}`);
});