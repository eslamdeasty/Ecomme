var express = require('express');
var router = express.Router();
const multer = require('multer');
var mongoose = require('mongoose');
const User = require('../models/user');
const Product = require('../models/product');
const productController = require('../controllers/product');
// Get All Products
//Save Product

// Delete Task
router.delete('/task/:id/:userid', function(req, res, next) {
    Task.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }, function(
        err,
        task
    ) {
        if (err) {
            res.send(err)
        }


        User.findOne({ _id: mongoose.Types.ObjectId(req.params.userid) }).then(
            (user) => {
                const removedTask = {
                    _id: mongoose.Types.ObjectId(req.params.id),
                }
                var index = user.tasks.indexOf(removedTask)
                user.tasks.splice(index, 1)
                user.updateOne(user, (err, raw) => {})
            }
        ).catch(
            (err) => console.log(err)
        )

        res.json(task)
    })
})

// Update Task
router.put('/task/:id', function(req, res, next) {
    const upTask = req.body;

    if (!upTask) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        Task.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) }, { title: req.body.title },
            function(err, task) {
                if (err) {
                    res.send(err)
                }
                res.json(task)
            })

    }
});


// Multer File upload settings
const DIR = 'backend/public';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage,
    // limits: {
    //   fileSize: 1024 * 1024 * 5
    // },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// upload files

router.post('/add', upload.single('file'), (req, res, next) => {

    const reqFiles = []
    const url = req.protocol + '://' + req.get('host')
    console.log(url)

    var newProduct = new Product({
        name: req.body.productName,
        image: url + '/public/' + req.file.filename,
        price: req.body.price,
        description: req.body.description,
        size: req.body.size,

    });

    newProduct.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Done upload!",
            result: result
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
});


router.get("/getproducts", (req, res, next) => {
    Product.find().then(data => {
        res.status(200).json({
            message: "Products list retrieved successfully!",
            products: data
        });
    });
});

router.post("/addtocart", async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw new Error("Couldn't find user")
        }
        const product = await Product.findOne({ name: req.body.name })
        if (!product) {
            return res.send({ status: "failed", message: "Couldn't find product" })
        } else if (user.cart.some(e => e.name === req.body.name)) {
            i = user.cart.findIndex(e => e.name === req.body.name)
            user.cart[i].quantity = user.cart[i].quantity + 1
            const updatedUser = await User.updateOne({ email: user.email }, user)
            return res.send({ status: "success", message: "Producted quantity increased successfully" })
        } else {
            await user.cart.push(product)
            const updatedUser = await User.updateOne({ email: user.email }, user)
            return res.send({ status: "success", message: "Product added successfully" })
        }
    } catch (e) {
        res.status(400).send(e);
    }


})

router.get("/getproducts/:name", (req, res, next) => {

    Product.findOne({ name: req.params.name }).then(data => {
        res.status(200).json({
            message: "Product retrieved successfully!",
            product: data
        });
    });
});

module.exports = router;