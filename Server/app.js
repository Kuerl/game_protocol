const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

var path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//connect html file
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/clientTest.html'));
});

io.on("connection", (socket) => {
  console.log("A device connected to Express server. Id: "+socket.id);
  // random number re
  socket.on("send-random-number", function(data){
    console.log("Re a random number: ", data);
    socket.emit("rNum-sv-to-client", data);
  })
  // string re
  socket.on("send-string", function(data){
    console.log("Re a string: "+data);
    socket.emit("string-sv-to-client", data);
  })
  // action re
  socket.on("send-action", function(data){
    console.log("Re a string: "+data);
    socket.emit("action-sv-to-client", data);
  })
});

server.listen(port, () => console.log("Server START at PORT: " + port));