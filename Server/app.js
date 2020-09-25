const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

io.on("connection", socket => {
  console.log("A device connected to Express server. Id: "+socket.id);
  // random number re
  socket.on("send-random-number", function(data){
    console.log("Re a random number: "+data);
  })
  // string re
  socket.on("send-string", function(data){
    console.log("Re a string: "+data);
  })
  // action re
  socket.on("send-string", function(data){
    console.log("Re a string: "+data);
  })
});

server.listen(port, () => console.log("Server START at PORT: " + port));