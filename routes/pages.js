// const express = require('express');

// // const { authpage, authuser, showDB } = require('../controllers/auth');

// const router = express.Router();

// router.get('/', (req, res) =>{
//     res.render('index');
// });

// router.get('/register',authpage(['Administrator']) , (req, res) =>{
//     res.render('register');
// });

// // router.get('/dashboard' , (req, res) =>{
// //     res.send('Dashboard');
// // });

// router.get('/login', (req, res) => {
//     res.render('login');
// });

// router.get('/adminDashboard.ejs',showDB, (req,res)=> {
//     res.render('adminDashboard', function(err,data,fields) {
//         ejs.render('<tr><$= adminDashboard.join(" | "); $></tr>', {users: data});
//     });
// })

// module.exports = router;

