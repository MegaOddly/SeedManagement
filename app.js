var http = require('http');
var mysql = require('mysql');
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Maggie' 
});

con.connect(function(err){
  if (err) throw err;
  console.log("Connected to Database")
})


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);

