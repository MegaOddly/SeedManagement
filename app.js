const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql');
// const { Http2ServerRequest } = require('http2');

dotenv.config({ path: './.env'})

const app = express();

const db = mysql.createConnection({
  host : process.env.DATABASE_HOST,
  user : process.env.DATABASE_USER,
  password :  process.env.DATABASE_PASSWORD, 
  database :  process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

db.connect(function(error){
  if (error) throw error
  else console.log('MYSQL is connected...')
});

// db.connect (function(err){
//   if (error) {
//     console.log(err)
//   } else {
//     console.log("MYSQL Connected...")
//   }
// })

// app.get('/createdb', (req, res) => {
//   let sql ='CREATE DATABASE projectsql';
//   db.query(sql, () => {
//     if(error) throw err;
//     console.log(result);
//     res.send('database created...');
//   })
// })

//open login page...this will be home page.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/HTML/login.html'))
});

//host
app.listen(8080, () => {
  console.log("Server started on port 8080");
});