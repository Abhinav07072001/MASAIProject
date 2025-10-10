// Acceptable priority values
const ALLOWED_PRIORITIES= ['low', 'medium', 'high'];

const validateTaskCreation=(req,res, next)=>{
    const {title, description, priority}= req.body || {};

    // presence check
    if(!title || !description || !priority){
        return res.status(400).json({message:"Incomplete Data Recieved"});
    }
    // all good
    next();
};

const validateTaskUpdate=(req,res,next)=>{
    // when update, ensure priority is present it must be valid
    const {priority}=req.body;
    fi(priority!== undefined && !ALLOWED_PRIORITIES.includes(priority))
}