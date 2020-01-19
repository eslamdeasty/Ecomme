const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    userController = require('../controllers/user');

//Home page for the server 
router.get('/', function(req, res, next) {
    res.render('index.html');
});


router.post('/register', userController.addUser)

router.post('/login', userController.loginUser)

router.get('/getshoppingcart', userController.getShoppingCart)

router.put('/updateCart', userController.updateCart)

module.exports = router;