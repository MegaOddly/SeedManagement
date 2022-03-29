// const mysql = require('mysql');
// const path = require('path');
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const async = require('hbs/lib/async');
// const { CLIENT_MULTI_RESULTS } = require('mysql/lib/protocol/constants/client');
// const { application } = require('express');
// const router = require('../routes/pages');

// const db = mysql.createConnection({
//     host : process.env.DATABASE_HOST,
//     user : process.env.DATABASE_USER,
//     password :  process.env.DATABASE_PASSWORD, 
//     database :  process.env.DATABASE
//   });

// const app = express();

// app.set('view engine', 'ejs');

// //to push data into database
// exports.register = (req,res) => {
//     console.log(req.body);

//     const { email, password, passwordconfirm, position} = req.body;

//     db.query('SELECT email FROM users WHERE email = ? and position = ? and passcode =?', [email,position,password], async (error, result) => {
//         if (error) {
//             console.log(error);
//         }
//         if ( result.length > 0) {
//             return res.render('register', {
//                 message : 'That email has already been registered'
//             })
//         } else if (password !== passwordconfirm) {
//             return res.render('register', {
//                 message : 'Passwords need to match!'
//             });
//         }

//         let hashpassword = await bcrypt.hash(password, 8);
//         console.log(hashpassword);

//     })

//     db.query('INSERT INTO Users SET ? ', {email: email, passcode: password, position: position}, (error, result, fields) =>{
//         if (error) {
//             console.log(error);
//         } else {
//             return res.render('register', {
//                 message : 'User registered'
//             });
//         }
//     })
// }

// //To get login information, and if correct it will show adminDashboard page. 
// exports.login = ('/auth', function(request, response) {
// 	const email = request.body.emaillogin;
// 	const password = request.body.passwordlogin;
// 	if (email && password) {
// 		db.query('SELECT * FROM Users WHERE email = ? AND passcode = ?', [email, password], function(error, results, fields) {
// 			if (results.length > 0) {
// 				// request.session.passwordlogin = password;
// 				// request.session.emailloggin = email;
//                 console.log(results);
// 				return response.render('adminDashboard');
// 			} else {
// 				response.send('Incorrect Username and/or Password!');
// 			}			
// 			response.end();
// 		});
// 	} else {
// 		response.send('Please enter Username and Password!');
// 		response.end();
// 	}
// });

// exports.authpage = (permission) => {
//     return (req, res, next) =>{
//         const userRole = db.query("SELECT * FROM Roles WHERE position = 'Administrator'");
//         if (permission.includes(userRole)){
//             next();
//         } else {
//             return res.status(401).json("You dont have permission!")
//         }
//     }
// };

// exports.showDB = ('adminDashboard', function(req,res,next) {
//     const expirationDate = req.body.expirationDate;
//     const receivedDate = req.body.receivedDate;
//     const weight = req.body.weight;
//     const quantity = req.body.quantity;
//     const seedID = req.body.seedID;

//     db.query('SELECT * FROM SeedsInStock WHERE expirationDate =? AND receivedDate =? AND weight = ?', 
//     [expirationDate, receivedDate, weight],function(err,data,fields) {
//         console.log(data);
//         res.render('adminDashboard', { results: data });
//     })
// })