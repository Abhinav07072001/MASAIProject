const fs=require("fs");

const db_File="db.json";

// Read books
function readBooks()
{
    const data= fs.readFileSync(db_File, "utf-8");
    return JSON.parse(data);
}
// Write books
function writeBooks(){
    fs.writeFileSync(db_File, JSON.stringify(data, null , 2));
}

module.exports={readBooks, writeBooks};