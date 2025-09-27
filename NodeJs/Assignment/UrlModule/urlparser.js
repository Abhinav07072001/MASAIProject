const { hostname } = require("os");
const url=require("url");

function parserUrlDetails(fullUrl){
    
    try{
        const parsed= url.parse(fullUrl, true);
        return{
            hostname:parsed.hostname,
            pathname:parsed.pathname,
            query:parsed.query
        };

    }catch(err){
        return{error:"Inavalid URL"}
    }
}

module.exports={parserUrlDetails}