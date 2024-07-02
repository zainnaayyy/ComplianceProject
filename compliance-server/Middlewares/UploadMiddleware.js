const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const s3 = new AWS.S3({ region: AWS_REGION });

const storage = multer.memoryStorage(); // Use memory storage for handling files in memory
const upload = multer({ storage });

const uploadMiddleware = upload.array("images", 5);

module.exports = uploadMiddleware;

// Set up Multer storage and file filter
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/'); // Adjust the destination folder as needed
//   },
//   filename: function (req, file, cb) {
//     console.log(file)
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only images are allowed.'), false);
//   }
// };

// // Set up Multer middleware
// const uploadMiddleware = multer({ storage, fileFilter })// Adjust the fieldname and file limit as needed

// module.exports = uploadMiddleware;


//
// const express = require('express');
// const multer = require('multer');
// const AWS = require('aws-sdk');
// const multerS3 = require('multer-s3');
// const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

// AWS.config.update({
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   region: AWS_REGION,
// });

// const s3 = new AWS.S3({ region: AWS_REGION });

// // const upload = multer({
// //   storage: multerS3({
// //     s3: s3,
// //     bucket: 'dronecop',
// //     acl: 'public-read',
// //     key: function (req, file, cb) {
// //       cb(null, Date.now().toString() + '-' + file.originalname);
// //     },
// //   }),
// // });
// const storage = multer.memoryStorage(); // Use memory storage for handling files in memory
// const upload = multer({ storage });

// const uploadMiddleware = upload.single('image')

// module.exports = uploadMiddleware

