const os=require("os");

function getSystemInfo(){
    console.log("System Information:");
    console.log("---------------------");

    // Architecture
    console.log(`Architecture ${os.arch()}`);

    // CPU info
    const cpus=os.cpus()
    console.log(`CPU Cores: ${cpus.length}`)
    console.log(`CPU Cores: ${cpus[0].model}`);
    console.log(`CPU Cores: ${(cpus[0].speed / 1000).toFixed(2)} GHz`)

    // Memory info
    console.log(`Total Memory ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`)
    console.log(`Free Memory ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`)

    // heap memory from Node process
    const memoryUsage= process.memoryUsage()
    console.log(`Heap Memory Used ${(memoryUsage.heapUsed / (1024 ** 3)).toFixed(2)} MB`)
    console.log(`Heap Memory Total ${(memoryUsage.heapTotal / (1024 ** 3)).toFixed(2)} MB`)

    // HostName and OS type
    console.log(`HostName ${os.hostname()}`);
    console.log(`OS type ${os.type()}`);
}
module.exports ={getSystemInfo}