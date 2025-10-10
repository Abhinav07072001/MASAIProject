const mongoose=require("mongoose");

const connectDB= async()=>{
    try{
        const uri= process.env.MONGO_URI ||'mongodb://127.0.0.1:27017/TodoDB';
        await mongoose.connect(uri,{
            
        });
        console.log("MongoDB connected Successfully");

     }catch(err){
        console.error("MongoDb not connect", err.message);
        process.exit(1);
     }
};
module.exports=connectDB;