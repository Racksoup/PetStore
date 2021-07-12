const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  category: {
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
  stock: Number,
});

module.exports = Inventory = mongoose.model('inventory', InventorySchema);
