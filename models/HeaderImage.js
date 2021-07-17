const mongoose = require('mongoose');

const HeaderImageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  alt: { type: String, required: true },
  headerimage: { type: String },
});

module.exports = HeaderImage = mongoose.model('headerImage', HeaderImageSchema);
