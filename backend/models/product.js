const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

// Create Schema
const ProductSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    image: {
        type: Array,
        default: null
    },
    rate: {
        type: Number,
        default: null
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    size: {
        type: String
    },
    uploadDate: {
        type: Date,
        default: Date.now()
    },
    reviews: [{ rating: Number, comment: String }],
    quantity: {
        type: Number,
        default: 0
    },
    subtotal: {
        type: Number,
        default: function() {
            return this.quantity * this.price
        }
    }
})

ProductSchema.plugin(mongooseUniqueValidator);

module.exports = products = mongoose.model('products', ProductSchema, "products");