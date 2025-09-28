const express=require("express");
const app=express();

app.get("/users/get",(req,res)=>{
    const user={
        id:1,
        name:"vipin",
        email:"vipin12@gmail.com"
    };
    console.log("postman ma hit hua");
    res.status(200).json(user);
});

app.get("/users/list",(req,res)=>{
    const list=[
        {
            id:2,
            name:"anshul",
            email:"anshul22@.com"
        },
        {
            id:3,
            name:"abhi",
            email:"abhi26@gmail.com"
        },
        {
            id:4,
            name:"sheela",
            email:"shella44@gmail.com"
        },
    ];
    res.status(200).json(list);
});

// handle bad request
app.use((req,res)=>{
    res.status(404).send("<h1>404 Error found </h2>")
});

app.listen(4000, ()=>{
    console.log("Server is working on 4000 port");
});