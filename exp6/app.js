const http = require("http");
const os = require("os");
const path = require("path");
const eventEmitter = require("events");

//os module
console.log("platform:",os.platform());
console.log("Free Memory:",os.freemem());

//Path module
console.log("File Name:",path.basename(__filename));

//Event module
const event = new eventEmitter();
event.on("welcome",()=> console.log("Welcome Event triggered!"));

//HTTP Module
const server=http.createServer((req,res)=>{
    event.emit("welcome");
    res.end("Hello! Welcome to node.js server");
});
server.listen(3000,()=>{
    console.log("Server running at http://localhost:3000");
});
