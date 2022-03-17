const http = require('http');
const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Maggie' 
});

con.connect(function(err){
  if (err) throw err;
  console.log("Connected to Database")
})


http.createServer(function (req, res) {
  
}).listen(8080, function(error){
  if (error) {
    console.log('Error connecting to server', error)
  }else {
    console.log('server is listening on port 8080')
  }
});

