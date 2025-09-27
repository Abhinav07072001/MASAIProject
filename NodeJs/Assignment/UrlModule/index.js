const express=require("express");
const {getFileInfo}=require('./fileinfo')
const {parserUrlDetails} = require('./urlparser')
const app=express();
app.get("/test",(req,res)=>{
    res.send("This is a test route")
});
// File info route
app.get("/fileinfo",(req,res)=>{
    const filePath= req.query.filePath;
    if(!filePath){
        return res.status(400).json({error:"Misisng Filepath query parameter"})
    }
    const details=getFileInfo(filePath);
    res.json(details)
});

// url pareser details
app.get("/parseurl",(req,res)=>{
    const fullUrl= req.query.url;
    if(!fullUrl){
        return res.status(400).json({error:"Misisng url query parameter"})
    }
    const details=parserUrlDetails(fullUrl)
    res.json(details);
});

app.listen(3000, ()=>{
    console.log("Port is working on 3000")
});