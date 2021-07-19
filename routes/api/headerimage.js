const HeaderImage = require('../../models/HeaderImage');

const express = require('express');
const router = express.Router();
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const config = require('config');
const db = config.get('mongoURI');

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
          bucketName: 'uploads',
          metadata: req.body,
          category: req.body.category,
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

// @route POST /upload
// @desc  Uploads file to DB
router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
  //res.redirect('/');
});

module.exports = router;

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// router.post('/', upload.single('headerimage'), async (req, res) => {
//   const headerImage = new HeaderImage({
//     name: req.body.name,
//     alt: req.body.alt,
//     headerimage: req.file.path,
//   });

//   headerImage
//     .save()
//     .then((result) => {
//       console.log(result);
//       res.status(201).json({
//         message: 'Created HeaderImage successfully',
//         createdHeaderImage: {
//           name: result.name,
//           alt: result.alt,
//           _id: result._id,
//           request: {
//             type: 'GET',
//             url: 'http://localhost:3000/headerimages/' + result._id,
//           },
//         },
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

// router.get('/', (req, res, next) => {
//   HeaderImage.find()
//     .select('name price _id headerimage')
//     .exec()
//     .then((docs) => {
//       const response = {
//         count: docs.length,
//         headerimages: docs.map((doc) => {
//           return {
//             name: doc.name,
//             price: doc.price,
//             headerimage: doc.headerimage,
//             _id: doc._id,
//             request: {
//               type: 'GET',
//               url: 'http://localhost:3000/headerimages/' + doc._id,
//             },
//           };
//         }),
//       };
//       //   if (docs.length >= 0) {
//       res.status(200).json(response);
//       //   } else {
//       //       res.status(404).json({
//       //           message: 'No entries found'
//       //       });
//       //   }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

// module.exports = router;
