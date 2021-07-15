const mongoose = require('mongoose');

const HeaderImageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  productImage: { type: String, required: true },
});

module.exports = HeaderImage = mongoose.model('headerImage', HeaderImageSchema);
