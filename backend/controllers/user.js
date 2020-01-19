const express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken');


module.exports = {


    addUser: (req, res) => {
        console.log(req.body);
        const today = new Date()
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            created: today
        }

        console.log(userData)

        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (!user) {

                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        userData.password = hash;

                        User.create(userData)
                            .then(user => { res.json({ status: "success", message: 'registered sucessfully' }) })
                            .catch(err => { res.json({ status: "failure", message: err }) })
                    })
                } else {
                    res.json({ status: "registered", message: 'User already exists' });
                }
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    },


    loginUser: (req, res) => {
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    canAccess = bcrypt.compareSync(req.body.password, user.password);
                    if (canAccess) {
                        const payload = {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            wishlist: user.wishlist
                        }


                        //TO DO : FIX SECRET KEY ISSUE 

                        let token = jwt.sign(payload, "secret", {
                            expiresIn: 9999999999
                        })
                        res.json({ token: token })
                    } else {
                        res.json({ status: "failure", message: 'Wrong password' })
                    }
                } else {
                    res.status(400).json({ status: "failure", message: 'User does not exist' })
                }
            })
            .catch(err => {
                res.json({ status: "error", message: err })
            })
    },
    getShoppingCart: async(req, res, next) => {
        const token = req.headers.authorization
        if (!token) {
            res.send(400).json({ status: 'failed', message: 'No token sent' })
        }
        try {
            var payload = jwt.verify(token, 'secret');
            console.log(payload.email)
            const user = await User.find({ email: payload.email })
            res.send({ status: 'success', cart: user[0].cart })

        } catch (err) {
            console.log(err)
        }
    },
    updateCart: async(req, res, next) => {
        const token = req.headers.authorization
        if (!req.headers.authorization) {
            res.send(400).json({ status: 'failed', message: 'No token set' })
        }
        try {
            const payload = await jwt.verify(token, 'secret');
            console.log(req.body)
            const user = await User.findOne({ email: payload.email })
            user.cart[req.body.itemIndex].quantity = req.body.quantity
            const updatedCart = await User.updateOne({ email: payload.email }, user)
            res.send({
                status: 'success',
                message: 'Cart updated successfully',
                cart: user.cart
            })
        } catch (err) {
            console.log(err)
        }
    }
}