const HeaderImage = require('../../models/HeaderImage');

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
  gfs.collection('uploads');
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
          bucketName: 'uploads',
          metadata: req.body,
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

// @route GET /
// @desc  Get all HeaderImages
router.get('/', (req, res) => {
  gfs.files.find({ metadata: { category: 'headerImage' } }).toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist',
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /image/:filename
// @desc Display Image
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
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

// @route DELETE /files/:filename
// @desc  Delete file
router.delete('/files/:filename', (req, res) => {
  gfs.remove({ filename: req.params.filename, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.json(req.params.filename);
  });
});

module.exports = router;

// ========================
// ON DISK STORAGE METHOD
// ========================

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
