var express = require('express')
var app = express()

// static files
// var path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("SERVER STARTING AT: http://%s:%s", host, port)
})