const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

const HeaderImage = require('../../models/HeaderImage');

const multer = require('multer');

const upload = multer({
  dest: 'upload/',
});

router.get('/', (req, res) => {
  HeaderImage.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred', err);
    } else {
      res.render('imagesPage', { items: items });
    }
  });
});

router.post('/', upload.single('productImage'), async (req, res) => {
  console.log(res.file);
  const headerImage = new HeaderImage({
    name: req.body.name,
    price: req.body.price,
  });
  headerImage
    .save()
    .then((result) => console.log(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
