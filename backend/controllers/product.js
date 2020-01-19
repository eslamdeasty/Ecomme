const Product = require('../models/product')
const express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken');

module.exports = {
    addProduct: (req, res) => {

        var newProduct = new Product({
            name: req.body.productName,
            price: req.body.price,
            description: req.body.description,
            size: req.body.size
        })
        if (!newProduct.name) {
            res.status(400)
            res.json({
                error: 'Bad Data'
            })

        } else {
            console.log(newProduct)
            newProduct.save(function(err, product) {
                if (err) {
                    res.send(err)
                }
                console.log(product);
                res.json(product)
            })
        }
    }
}