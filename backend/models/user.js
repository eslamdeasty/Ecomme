const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'wishlist' }],
    cart :  [{type : Object}]
    



})

UserSchema.plugin(mongooseUniqueValidator);

module.exports = User = mongoose.model('users', UserSchema, "newusers");