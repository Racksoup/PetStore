const mongoose = require('mongoose');

const BlogsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = Blogs = mongoose.model('blogs', BlogsSchema);
