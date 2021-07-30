const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  pet: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  image_filename: {
    type: String,
    required: true,
  },
  sale: Boolean,
});

module.exports = Inventory = mongoose.model('inventory', InventorySchema);
