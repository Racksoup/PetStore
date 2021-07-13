const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const Inventory = require('../../models/Inventory');

// @route   POST api/inventory
// @desc    Create Inventory item
// @access  Private
router.post('/', auth, async (req, res) => {
  const { category, price, name, stock } = req.body;

  const postItem = {};
  if (category) postItem.category = category;
  if (price) postItem.price = price;
  if (name) postItem.name = name;
  if (stock) postItem.stock = stock;

  try {
    const item = new Inventory(postItem);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/inventory/item
// @desc    Update Inventory Item by Name
// @access  Private
router.put('/item', auth, async (req, res) => {
  const { category, price, name, stock } = req.body;
  const postItem = { category, price, name, stock };

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
  const { category, price, name, stock } = req.body;
  const postItem = { category, price, name, stock };

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
    res.json({ msg: 'Item Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/inventory/category
// @desc    Get all by category
// @access  Public
router.get('/category', async (req, res) => {
  try {
    const items = await Inventory.find({ category: req.body.category });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/inventory/name
// @desc    Get one by Name
// @access  Public
router.get('/name', async (req, res) => {
  try {
    const items = await Inventory.findOne({ name: req.body.name });
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

module.exports = router;
