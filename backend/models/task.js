const mongoose = require('mongoose'),
    schema = mongoose.Schema;


const wishlistSchema = new schema({
    products: [{ product: Object }],
    user: { type: schema.Types.ObjectId, ref: 'users' }
})

const wishlistModel = mongoose.model('Wishlist', wishlistSchema, 'wishlist');

module.exports = wishlistModel;