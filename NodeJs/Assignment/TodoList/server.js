const express=require("express");
const app=express();
const todoRoutes=require('./routes/todoRoutes');
const notFound=require('./middleware/notFound');

app.use(express.json());
app.use("/todos",todoRoutes);

app.use(notFound);

app.listen(3000,()=>{
    console.log("Port working fine on 3000");
})