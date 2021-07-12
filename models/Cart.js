const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({});

module.exports = Cart = mongoose.model('cart', CartSchema);
