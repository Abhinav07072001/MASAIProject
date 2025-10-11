const express= require('express');
const router=express.Router();
const User=require('../models/user.model');
const Address=require('../models/address.model');

router.post('/users', async(req,res)=>{
    try{
        const user= new User(req.body);
        await user.save();
        res.status(201).json({message:'User created', user});
    }catch(err){
        res.status(400).json({error:error.message});
    }
});

router.get('/users/summary', async(req, res)=>{
    try{
        const totalUsers= await User.countDocuments();
        const totalAddress= await Address.countDocuments();
        const addresses= await User.find().populate('addresses');

        const UserList= users.map(u=>({
            name:u.name,
            addressCount: u.addresses.length
        }));
        res.json({totalUsers, totalAddress, UserList})
    }catch(error){
        res.status(500).json({error:error.message})
    }
});
