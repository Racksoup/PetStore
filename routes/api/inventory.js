const Inventory = require('../../models/Inventory');
const auth = require('../../middleware/auth');

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
  gfs.collection('merchandise');
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
          bucketName: 'merchandise',
          // metadata: req.body,
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });
//=================================================================

// @route   POST api/inventory
// @desc    Create Inventory item
// @access  Private
router.post('/', [auth, upload.single('file')], async (req, res) => {
  const { category, price, name, stock } = req.body;

  const postItem = {};
  if (category) postItem.category = category;
  if (price) postItem.price = price;
  if (name) postItem.name = name;
  if (stock) postItem.stock = stock;
  postItem.image_filename = req.file.filename;

  try {
    const item = new Inventory(postItem);
    await item.save();
    res.json({
      item: item,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/inventory/item
// @desc    Update Inventory Item by Name
// @access  Private
router.put('/item', auth, async (req, res) => {
  const { category, price, name, stock, image_filename } = req.body;
  const postItem = {};
  if (category) postItem.category = category;
  if (price) postItem.price = price;
  if (name) postItem.name = name;
  if (stock) postItem.stock = stock;
  if (image_filename) postItem.image_filename = image_filename;

  try {
    const item = await Inventory.findOneAndUpdate({ name: req.body.name }, postItem);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/inventory/:_id
// @desc    Update Inventory Item by _id
// @access  Private
router.put('/:_id', auth, async (req, res) => {
  const { category, price, name, stock, image_filename } = req.body;
  const postItem = {};
  if (category) postItem.category = category;
  if (price) postItem.price = price;
  if (name) postItem.name = name;
  if (stock) postItem.stock = stock;
  if (image_filename) postItem.image_filename = image_filename;

  try {
    const item = await Inventory.findOneAndUpdate({ _id: req.params._id }, postItem);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/inventory/:_id
// @desc    Delete Inventory Item
// @access  Private
router.delete('/:_id', auth, async (req, res) => {
  try {
    await Inventory.findOneAndRemove({ _id: req.params._id });
    gfs.remove({ _id: req.params._id, root: 'merchandise' }, (err, GridFSBucket) => {
      if (err) {
        return res.status(404).json({ err: err });
      }

      res.redirect('/');
    });
    res.json({ msg: 'Item Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/inventory/name
// @desc    Get one by Name
// @access  Public
router.get('/name/:name', async (req, res) => {
  try {
    const items = await Inventory.findOne({ name: req.params.name });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/inventory/:_id
// @desc    Get one by id
// @access  Public
router.get('/:_id', async (req, res) => {
  try {
    const item = await Inventory.findById(req.params._id);
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/inventory/category
// @desc    Get all by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const items = await Inventory.find({ category: req.params.category });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/inventory/list
// @desc    Get list of categories
// @access  Public
router.get('/list', async (req, res) => {
  try {
    const items = await Inventory.find();
    let list = [];
    items.map((item) => {
      list.push(item.category);
    });
    list = [...new Set(list)];
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// IMAGE ROUTES ===============================
// ============================================

// @route GET /image/:filename
// @desc  Get inventory image by filename
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

// @route DELETE /delete-image/:filename
// @desc  Delete image
router.delete('/deleteimage/:filename', async (req, res) => {
  const x = await gfs.remove(
    { filename: req.params.filename, root: 'merchandise' },
    (err, GridFSBucket) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
    }
  );
  res.json(x);
});

// @route POST /upload-image
// @desc  Uploads file to DB
router.post('/uploadimage', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

module.exports = router;
