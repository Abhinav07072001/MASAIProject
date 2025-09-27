const { rejects } = require("assert");
const fs=require("fs");
const { resolve } = require("path");

function readFileContent(){
    return new Promise((resolve,reject)=>{
        fs.readFile("Data.txt", "utf-8",(err, data)=>{
            if (err) reject("Error Reading file",err)

           else resolve(data);     
        });
    });
}
module.exports={readFileContent}