const http = require('http');
var mysql = require('mysql');
const fs = require('fs');


//Database file names
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Maggie' 
});
//database connetion 
con.connect(function(err){
  if (err) throw err;
  console.log("Connected to Database")
});

//starting the server and will let us know in terminal if the server connects successfully
http.createServer(function (req, res) {
  
}).listen(8080, function(error){
  if (error) {
    console.log('Error connecting to server', error)
  }else {
    console.log('server is listening on port 8080')
  }
});

