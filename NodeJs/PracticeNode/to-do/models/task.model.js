const mongoose=require("mongoose");

const todoSchema= new mongoose.Schema({
    title:{type:String, unique:true, index:true},
    description:{type:String},
    priority:{type:String},  // validation via middleware
    isCompleted:{type:Boolean, default:false},
    completionDate:{type:Date, default: null},
    dueDate:{type:Date, default:null}
},{
    timestamps:true,
    versionKey:false
});
module.exports=mongoose.model('Todo',todoSchema);