const mongoose= require("mongoose");
const validator= require('validator');

const userSchema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String, required:true, unique:true, validate:[validator.isEmail, 'Invalid Email']},
    age:{type:Number, required:true},
    addresses:[{type:mongoose.Schema.Types.ObjectId, ref:'address'}]
});
module.exports=mongoose.model('User', userSchema);