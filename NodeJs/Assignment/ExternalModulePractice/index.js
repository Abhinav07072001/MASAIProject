const express=require("express");
const os=require("os");
const dns=require("dns");
const {readFileContent}=require("./read");
const app= express();

// Routes
// Test Route
app.get("/test",(req,res)=>{
    res.send("Test route is working");
})
// Read Route
app.get("/readfile",async(req,res)=>{
    try{
        const content=await readFileContent();
        res.send(content)
    }catch(err){
        res.status(500).send("Error in DataFile",err)
    }
})
// System Detail Route
app.get("/systemdetails",(req,res)=>{
    const details={
        platform:os.platform(),
        totalmemory:`${(os.totalmem()/(1024 ** 3)).toFixed(2)} GB`,
        freeMemory:`${(os.freemem()/(1024 ** 3)).toFixed(2)} GB`,
        cpuModel: os.cpus()[0].model,
        cpuCores: os.cpus().length
    };
    res.json(details);
});

// Get IP Routes
app.get("/getip",(req,res)=>{
     dns.lookup("masaischool.com", (err, address)=>{
        if(err){
            res.status(500).send("Error in Dns",err)
        }
        else{
            res.json({hostname:"masaischool.com", ipAdddres:address});
        }
     });
});

// Start Server
app.listen(3000, ()=>{
    console.log("Server is workin on prt 3000");
})