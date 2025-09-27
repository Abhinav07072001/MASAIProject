const boxen= require("boxen");

const title="Hurray!!!"
const message="I am using the first External Module"

const classicBox= boxen(message,{
    title: title,
    padding: 1,
    borderStyle: "classic"
});

const singleDoubleBox=boxen(message,{
    title:title,
    padding:1,
    margin:1,
    borderStyle:"singleDouble"
});

const roundDouble=boxen(message,{
    title:title,
    margin:1,
    padding:1,
    borderStyle:"round",
    borderColor:"yellow",
    backgroundColor:"blue"
});
console.log(classicBox);
console.log(singleDoubleBox);
console.log(roundDouble);