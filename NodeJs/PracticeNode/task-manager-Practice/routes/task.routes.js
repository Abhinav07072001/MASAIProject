const express=require("express");
const Task= require('../models/task.model.js');
const router= express.Router();

// create 
router.post('/',async (req,res)=>{
    try{
        const newTask= await Task.create(req.body);
        res.status(201).json(newTask);
    }catch(err){
        res.status(400).json({messgae:err.messgae});
    }
});
// read
router.get('/',async (req,res)=>{
    const {status, dueDate}=req.query;
    let filter={};
    if(status) filter.status= status;
    if(dueDate) filter.dueDate={$lte: new Date(dueDate)};

    const tasks=await Task.find(filter);
    res.json(tasks);
});
// update
router.patch('/:id', async(req,res)=>{
    try{
        const id=Number(req.params.id);
        const updatedTask= await Task.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updatedTask);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});
// delete
router.delete('/:id', async(req,res)=>{
    try{
        const id=Number(req.params.id);
        await Task.findByIdAndDelete(id);
        res.json({message:"Task deleted sucessfully"});
    }catch(err){
        res.status(400).json({message:err.message});
    }
});
module.exports=router;