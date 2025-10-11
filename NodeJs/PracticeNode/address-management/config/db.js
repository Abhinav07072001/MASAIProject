const mongoose=require("mongoose");

const connectDB= async ()=>{
    try{
        await mongoose.connect(' mongodb://127.0.0.1:27017/userAddressDB');
        console.log("MongoDb connect Successfully");
    }catch(err){
        console.error("MongoDb not connect", err.message);
        process.exit(1);
    }
};
module.exports=connectDB;