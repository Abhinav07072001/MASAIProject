const fs=require("fs");
const DB_PATH= "db.json";

function readFile(){
    const data= fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
}

function writeFile(){
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null , 2));
}
module.exports={readFile, writeFile};