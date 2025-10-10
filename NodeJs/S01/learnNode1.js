// Inbuilt function 
const os=require('os');

let cps=os.cpus();
console.log(cps.length)
console.log(os.arch())

// Read File inbuilt function
const fs=require("fs").promises
async function readFileEx() {
    try{
        const data=await fs.readFile("data.txt", "utf-8")
        console.log("Data Cotnet: ", data);
    }catch(err){
        console.error("Error is ", err)
    }
}
readFileEx()
console.log("Reading Started");

// Write file function
fs.writeFile("data.txt","Hello","utf-8" ,(err)=>{
    if(err){
        console.log("Error of Written is", err)
        return
    }
    console.log("Written Successfully")
})