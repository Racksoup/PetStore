const Blogs = require('../../models/Blogs');
const adminAuth = require('../../middleware/adminAuth');

const express = require('express');
const router = express.Router();
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const mongoose = require('mongoose');

// ========================
// DATABASE STORAGE METHOD
// ========================

const config = require('config');
const db = config.get('mongoURI');

// Create mongo connection
const conn = mongoose.createConnection(db);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('blogImages');
});

// Create storage engine
const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'blogImages',
          //metadata: req.body,
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

// ========================
// DATABASE STORAGE METHOD
// ========================

// @route   POST api/blogs
// @desc    Post blog
// @access  Private
router.post('/', [adminAuth, upload.single('file')], async (req, res) => {
  const { title, tags, text } = req.body;

  const postItem = {};
  if (title) postItem.title = title;
  if (tags) postItem.tags = tags;
  if (text) postItem.text = text;
  postItem.image_filename = req.file.filename;

  try {
    const item = new Blogs(postItem);
    await item.save();
    res.json({
      item: item,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/blogs/:_id
// @desc    Update blog
// @access  Private
router.put('/:_id', adminAuth, async (req, res) => {
  const { title, tags, text, image_filename } = req.body;
  const postItem = {};
  if (title) postItem.title = title;
  if (tags) postItem.tags = tags;
  if (text) postItem.text = text;
  if (image_filename) postItem.image_filename = image_filename;

  try {
    const item = await Blogs.findOneAndUpdate({ _id: req.params._id }, postItem);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/blogs/:_id
// @desc    Delete Blog
// @access  Private
router.delete('/:_id', adminAuth, async (req, res) => {
  try {
    await Blogs.findOneAndRemove({ _id: req.params._id });
    gfs.remove({ _id: req.params._id, root: 'blogImages' }, (err, GridFSBucket) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
    });
    res.json({ msg: 'Blog Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/blogs
// @desc    Get all blogs
// @access  public
router.get('/', async (req, res) => {
  try {
    const items = await Blogs.find();
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/blogs/three
// @desc    Get 3 blogs
// @access  Public
router.get('/three', async (req, res) => {
  try {
    const items = await Blogs.find().limit(3);
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/blog/:_id
// @desc    Get blog
// @access  Public
router.get('/:_id', async (req, res) => {
  try {
    const item = await Blogs.findById(req.params._id);
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ===========================
// IMAGE ROUTES
// ===========================

// @route   GET api/blogs/image/:filename
// @desc    Get blog image
// @access  Public
router.get('/image/:filename', async (req, res) => {
  await gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if files
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No files exist',
      });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image',
      });
    }
  });
});

// @route   DELETE api/blogs/delete-image/:filename
// @desc    Delete image
// @access  Private
router.delete('/deleteimage/:filename', adminAuth, async (req, res) => {
  const x = await gfs.remove(
    { filename: req.params.filename, root: 'blogImages' },
    (err, GridFSBucket) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
    }
  );
  res.json(x);
});

// @route   DELETE api/blogs/id/:files_id
// @desc    Delete image
// @access  Private
router.delete('/deleteimage/id/:files_id', adminAuth, async (req, res) => {
  const x = await gfs.remove(
    { files_id: req.params.files_id, root: 'blogImages' },
    (err, GridFSBucket) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
    }
  );
  res.json(x);
});

// @route   POST api/blogs/uploadimage
// @desc    Upload image
// @access  Private
router.post('/uploadimage', [adminAuth, upload.single('file')], (req, res) => {
  res.json({ file: req.file });
});

module.exports = router;
