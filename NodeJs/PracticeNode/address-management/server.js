const express= require('express');
const connectDB= require('./config/db');
const userRoute= require('./routes/user.routes');

const app= express();
app.use(express.json());

connectDB();
app.use('/', userRoute);

const PORT=5000;
app.listen(PORT,()=>console.log(`Server is working fine ${PORT}`));