const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  cart: {
    type: Array,
  },
  wishlist: {
    type: Array,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
