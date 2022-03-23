const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const e = require('express');
const exp = require('constants');
const { request } = require('http');

const app = express();

dotenv.config({ path: './config.env'})

const db = mysql.createConnection({
  host : process.env.DATABASE_HOST,
  user : process.env.DATABASE_USER,
  password :  process.env.DATABASE_PASSWORD, 
  database :  process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//parse url-encoded bodys
app.use(express.urlencoded({ extended: false}));
//parse JSON bodies (as send by api clients)
app.use(express.json());

app.set('view engine', 'hbs');

app.use(express.json());

db.connect(function(error){
  if(error) throw error
  else console.log('MYSQL is connected...')
});



//defind routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

//host
app.listen(8080, () => {
  console.log("Server started on port 8080");
});

