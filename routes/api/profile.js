const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');

// @route   Get api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

// @route   Post api/profile
// @desc    Create and update profile
// @access  Private
router.post('/', auth, async (req, res) => {
  const { name, email, address } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  if (name) profileFields.name = name;
  if (email) profileFields.email = email;
  if (address) profileFields.address = address;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    //update
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    //create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   Get api/profile
// @desc    Get profile by user id
// @access  Private
router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [
      'username',
    ]);
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.put('/user/:_id', auth, async (req, res) => {
  const { name, email, address, cart, wishlist } = req.body;
  const newItem = {};
  if (name) newItem.name = name;
  if (email) newItem.email = email;
  if (address) newItem.address = address;
  if (cart) newItem.cart = cart;
  if (wishlist) newItem.wishlist = wishlist;

  try {
    const profile = await Profile.findOneAndUpdate(
      { _id: req.params._id },
      { $set: newItem },
      { returnOriginal: false }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.put('/add-cart/:_id', auth, async (req, res) => {
  const { name, email, address, cart, wishlist } = req.body;
  const newItem = {};
  if (name) newItem.name = name;
  if (email) newItem.email = email;
  if (address) newItem.address = address;
  if (cart) newItem.cart = cart;
  if (wishlist) newItem.wishlist = wishlist;

  try {
    const profile = await Profile.findOneAndUpdate({ _id: req.params._id }, { $set: newItem });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});
