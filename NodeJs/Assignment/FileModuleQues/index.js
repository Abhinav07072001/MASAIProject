const {readFileData, appendFileData}=require('./fileOperation')

console.log("Initial File Content");
readFileData();

appendFileData()

console.log("Updated File Content\n:");
readFileData()