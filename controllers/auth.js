const mysql = require('mysql');
const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const async = require('hbs/lib/async');
const { CLIENT_MULTI_RESULTS } = require('mysql/lib/protocol/constants/client');
const { application } = require('express');

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password :  process.env.DATABASE_PASSWORD, 
    database :  process.env.DATABASE
  });

const app = express();

//to push data into database
exports.register = (req,res) => {
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
            return res.render('register', {
                message : 'User registered'
            });
        }
    })
}

// exports.login = (req,res) => {
//     console.log(req.body);

//     const {email, password} = req.body;
    
//     if (email || password) {
//         db.query('SELECT * FROM Users WHERE email = ? and passcode =?', [email, password], async (error, result, fields) => {
//             if (error) {
//                 console.log(error);
//             }
//             if (result.length == 0) {
//                 req.session.loggedin = true;
//                 req.session.email = email;

//                 res.send("Logged in");
//             } else {
//                 res.send("Incorrect information");
//             }
//             // result.end();
//          });
//     }
//     else {
//         // res.end();
//         res.send("Please enter username and password");
//         }
// }

exports.login = ('/auth', function(request, response) {
	const email = request.body.emaillogin;
	const password = request.body.passwordlogin;
	if (email && password) {
		db.query('SELECT * FROM Users WHERE email = ? AND passcode = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				// request.session.passwordlogin = password;
				// request.session.emailloggin = email;
                console.log(results);
				response.send("Yay, you're logged in!")
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

// exports.login = (req,res) =>  {
//     const {email, password} = req.body;
  
//     db.query(
//       'SELECT * FROM users WHERE email =? AND passcode =? ',
//       [email, password], (error, result) => {
//        if (error) {
//          res.send({ err : err})
//          console.log(error);
//          }
  
//          else {
//            if (result) {
//              res.send(result)
//            }
//            else {
//              res.send({ message : "Wrong credentials"});
//            }
//          }
//        }
//     )
//   };