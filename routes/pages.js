const express = require('express');

const { authpage, authuser } = require('../controllers/auth');



const router = express.Router();

router.get('/', (req, res) =>{
    res.render('index');
});

router.get('/register',authpage(['Administrator']) , (req, res) =>{
    res.render('register');
});

router.get('/dashboard' , (req, res) =>{
    res.send('Dashboard');
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;

