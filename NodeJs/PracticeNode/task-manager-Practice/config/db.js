const mongoose=require("mongoose");

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected Successfully");
    }catch(err){
        console.error("Mongodb not connected", err.message);
    }
};
module.exports=connectDB;