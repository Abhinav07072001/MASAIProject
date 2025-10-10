const express=require("express");
const connectDB=require('./config/db.js');
const taskRoutes= require('./routes/task.routes.js');
require('dotenv').config();

const app=express();
app.use(express.json());

connectDB();
app.use('/tasks',taskRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on port ${process.env.PORT}`);
});
