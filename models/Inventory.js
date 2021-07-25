const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  category: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  stock: Number,
  image_filename: String,
});

module.exports = Inventory = mongoose.model('inventory', InventorySchema);
