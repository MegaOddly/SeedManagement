const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const e = require('express');
const exp = require('constants');
const { request } = require('http');

ejs.delimiter = '/';
ejs.openDelimiter = '[';
ejs.closeDelimiter = ']';

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

app.set('view engine', 'ejs');

app.use(express.json());

db.connect(function(error){
  if(error) throw error
  else console.log('MYSQL is connected...')
});

const register = (req,res) => {
  console.log(req.body);

  const { email, password, passwordconfirm, position} = req.body;

  db.query('SELECT email FROM users WHERE email = ? and position = ? and passcode =?', [email,position,password], async (error, result) => {
      if (error) {
          console.log(error);
      }
      if ( result.length > 0) {
          return res.render('register', {
              message : 'That email has already been registered'
          })
      } else if (password !== passwordconfirm) {
          return res.render('register', {
              message : 'Passwords need to match!'
          });
      }

      let hashpassword = await bcrypt.hash(password, 8);
      console.log(hashpassword);

  })

  db.query('INSERT INTO Users SET ? ', {email: email, passcode: password, position: position}, (error, result, fields) =>{
      if (error) {
          console.log(error);
      } else {
          return result.render('register', {
              message : 'User registered'
          });
      }
  })
}

//To get login information, and if correct it will show adminDashboard page. 
const login = ('login', function(request, response) {
const email = request.body.emaillogin;
const password = request.body.passwordlogin;
if (email && password) {
  db.query('SELECT * FROM Users WHERE email = ? AND passcode = ?', [email, password], function(error, results, fields) {
    if (results.length > 0) {
      // request.session.passwordlogin = password;
      // request.session.emailloggin = email;
              console.log(results);
      return response.render('adminDashboard');
    } else {
      response.send('Incorrect Username and/or Password!');
    }			
    response.end();
  });
} else {
  response.send('Please enter Username and Password!');
  response.end();
}
});

const authpage = (permission) => {
  return (req, res, next) =>{
      const userRole = db.query("SELECT * FROM Roles WHERE position = 'Administrator'");
      if (permission.includes(userRole)){
          next();
      } else {
          return res.status(401).json("You dont have permission!")
      }
  }
};

// const showDB = ('adminDashboard', function(req,res,next) {
//   // const expirationDate = req.body.expirationDate;
//   // const receivedDate = req.body.receivedDate;
//   // const weight = req.body.weight;
//   // const quantity = req.body.quantity;
//   // const seedID = req.body.seedID;

//   })

// db.query('SELECT * FROM SeedsInStock',function(err,results,fields) {
//       console.log(results);
//       results.render('adminDashboard', { title: 'Seeds', userData: data});
// });

app.get('/', (req, res) =>{
  res.render('index');
});

app.get('/register', (req, res) =>{
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/adminDashboard', (req,res)=> {
  res.render('adminDashboard');
});

app.post('/register', register )
app.post('/login', login)

//host
app.listen(8080, () => {
  console.log("Server started on port 8080");
});




