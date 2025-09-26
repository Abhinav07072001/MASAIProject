const fs=require("fs")

function readFileData(){
    try{
        const data= fs.readFileSync("data.txt", "utf-8")
        console.log(data)
    }catch(err){
        console.error("Error reading file", err);
    }
}

// funtion to update
function appendFileData(){
    try{
        fs.appendFileSync("data.txt", "This is the appended data\n");
        console.log("Appending Data...")
    }catch(err){
        console.error("Error appending file", err)
    }
}
module.exports={readFileData, appendFileData}